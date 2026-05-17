/**
 * GET /api/cron/recurring
 *
 * Cron de renouvellement des abonnements mensuels avec carte tokenisée.
 *
 * Auth : header `X-Cron-Secret` doit matcher `process.env.CRON_SECRET`.
 *
 * Logique :
 *  1. SELECT subs où recurring_status='active' AND next_renewal_at <= now
 *     (et qui n'ont pas déjà été renouvelées — pas d'enfant)
 *  2. Pour chaque sub : POST charge vers SumUp avec card_token
 *  3. Sur succès : créer nouvelle sub (chainée via parent_subscription_id) + bump next_renewal_at de +1 mois
 *  4. Sur échec : marquer recurring_status='failed' (alerting/retry à implémenter plus tard)
 *
 * Idempotent : exécutable plusieurs fois par jour sans risque de double charge
 * (le filtre "pas d'enfant" empêche les doublons).
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getDueRenewals, createSubscription, attachRecurringToSubscription, markRecurringFailed, getDb,
} from '@/lib/db';
import { resolveSubscription } from '@/lib/subscription-tiers';
import { chargeRecurring } from '@/lib/sumup-recurring';

function firstOfMonthAfter(timestamp: number): number {
  const d = new Date(timestamp * 1000);
  return Math.floor(new Date(d.getFullYear(), d.getMonth() + 1, 1, 0, 0, 0, 0).getTime() / 1000);
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: 'CRON_SECRET non configuré' }, { status: 500 });

  const provided = req.headers.get('x-cron-secret');
  if (provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = Math.floor(Date.now() / 1000);
  const due = getDueRenewals(now);

  const results: Array<{ subId: number; ok: boolean; detail?: string; newSubId?: number }> = [];

  for (const sub of due) {
    if (!sub.sumup_customer_id || !sub.card_token) {
      markRecurringFailed(sub.id);
      results.push({ subId: sub.id, ok: false, detail: 'missing customer_id or token' });
      continue;
    }
    const amountEur = sub.amount_cents / 100;
    const charge = await chargeRecurring({
      customerId: sub.sumup_customer_id,
      token: sub.card_token,
      amountEur,
      description: `Bulletin Facile — Renouvellement abonnement (${sub.type})`,
    });

    if (!charge.ok) {
      markRecurringFailed(sub.id);
      results.push({ subId: sub.id, ok: false, detail: charge.errorDetail ?? `status=${charge.status}` });
      console.error(`[Cron Recurring] Charge KO sub #${sub.id}:`, charge);
      continue;
    }

    // Charge OK → créer une nouvelle sub chaînée, avec un expires_at recalculé
    const meta = resolveSubscription(sub.amount_cents);
    try {
      const newSubId = createSubscription({
        userId: sub.user_id,
        type: meta.type,
        checkoutId: charge.checkoutId ?? `auto-renew-${Date.now()}`,
        amountCents: sub.amount_cents,
        bulletinsTotal: meta.bulletinsTotal,
        expiresAt: meta.expiresAt,
        parentSubscriptionId: sub.id,
      });
      // Transfère le token sur la nouvelle sub (pour que le cron du mois prochain le retrouve)
      attachRecurringToSubscription(
        newSubId,
        sub.sumup_customer_id,
        sub.card_token,
        firstOfMonthAfter(now),
      );
      // Désactive le recurring sur l'ancienne sub (elle est "consommée")
      getDb().prepare(`UPDATE subscriptions SET recurring_status = NULL WHERE id = ?`).run(sub.id);
      results.push({ subId: sub.id, ok: true, newSubId });
      console.log(`[Cron Recurring] Sub #${sub.id} renouvelée → nouvelle sub #${newSubId}`);
    } catch (err) {
      console.error(`[Cron Recurring] Erreur création nouvelle sub après charge OK pour #${sub.id}:`, err);
      results.push({ subId: sub.id, ok: false, detail: `charge OK mais création sub KO: ${err}` });
    }
  }

  return NextResponse.json({
    ran_at: new Date().toISOString(),
    due_count: due.length,
    results,
  });
}
