import { NextRequest, NextResponse } from 'next/server';
import { findOrCreateUser, createSubscription, attachRecurringToSubscription, getDb } from '@/lib/db';
import { resolveSubscription } from '@/lib/subscription-tiers';
import { getLatestActiveToken } from '@/lib/sumup-recurring';

// ---------------------------------------------------------------------------
// SumUp webhook — CHECKOUT_STATUS_CHANGED
//
// ⚠️  Le payload SumUp est MINIMAL : { event_type, id }
//     Il N'Y A PAS de payload.status ni payload.email dans le body.
//     On doit appeler l'API SumUp pour vérifier le statut réel.
// ---------------------------------------------------------------------------

async function verifyCheckoutWithSumUp(checkoutId: string) {
  const apiKey = process.env.SUMUP_API_KEY;
  const res = await fetch(`https://api.sumup.com/v0.1/checkouts/${checkoutId}`, {
    headers: { 'Authorization': `Bearer ${apiKey}` },
  });
  if (!res.ok) return null;
  return res.json();
}

// Date du 1er du mois prochain (timestamp Unix sec) — pour next_renewal_at
function firstOfNextMonth(): number {
  const now = new Date();
  return Math.floor(new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0).getTime() / 1000);
}

async function activateSubscription(
  checkoutId: string,
  email: string,
  amountCents: number,
  pending?: { recurring: number; sumup_customer_id: string | null } | null,
) {
  const user = findOrCreateUser(email);
  const meta = resolveSubscription(amountCents);

  const subId = createSubscription({
    userId: user.id,
    type: meta.type,
    checkoutId,
    amountCents,
    bulletinsTotal: meta.bulletinsTotal,
    expiresAt: meta.expiresAt,
  });

  console.log(`[Webhook] Abonnement créé #${subId} — userId: ${user.id}, type: ${meta.type}, email: ${email}`);

  // Si c'était un setup recurring : on récupère le token de carte et on l'attache
  if (pending?.recurring === 1 && pending.sumup_customer_id) {
    try {
      const token = await getLatestActiveToken(pending.sumup_customer_id);
      if (token) {
        attachRecurringToSubscription(subId, pending.sumup_customer_id, token, firstOfNextMonth());
        console.log(`[Webhook] Recurring activé sub #${subId} → next_renewal_at = 1er du mois prochain`);
      } else {
        console.warn(`[Webhook] Aucun token actif trouvé pour customer ${pending.sumup_customer_id} (recurring sub #${subId} non activé)`);
      }
    } catch (err) {
      console.error('[Webhook] Erreur récup token recurring:', err);
    }
  }

  // Nettoie pending_checkouts
  try { getDb().prepare('DELETE FROM pending_checkouts WHERE checkout_id = ?').run(checkoutId); } catch { /* ok */ }

  // Envoie le magic link de connexion
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bulletinfacile.fr';
  await fetch(`${baseUrl}/api/auth/magic-link`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  }).catch(err => console.error('[Webhook] Magic link error:', err));
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('[SumUp Webhook]', JSON.stringify(body));

  // SumUp envoie : { event_type: "CHECKOUT_STATUS_CHANGED", id: "uuid" }
  if (body.event_type === 'CHECKOUT_STATUS_CHANGED') {
    const checkoutId: string = body.id ?? '';

    if (!checkoutId) {
      console.warn('[Webhook] Pas de checkout id dans le body');
      return NextResponse.json({ received: true });
    }

    // 1. Vérifier le statut réel via l'API SumUp
    const checkout = await verifyCheckoutWithSumUp(checkoutId);
    if (!checkout) {
      console.error('[Webhook] Impossible de vérifier le checkout:', checkoutId);
      return NextResponse.json({ received: true });
    }

    console.log(`[Webhook] Statut checkout: ${checkout.status}, montant: ${checkout.amount}`);

    if (checkout.status !== 'PAID') {
      return NextResponse.json({ received: true, status: checkout.status });
    }

    // 2. Récupérer l'email + flag recurring depuis pending_checkouts (source de vérité côté app)
    let email: string = checkout.personal_details?.email || '';
    const amountCents = Math.round((checkout.amount ?? 0) * 100);
    let pending: { email: string; amount_cents: number; recurring?: number; sumup_customer_id?: string | null } | undefined;

    try {
      pending = getDb()
        .prepare('SELECT email, amount_cents, recurring, sumup_customer_id FROM pending_checkouts WHERE checkout_id = ?')
        .get(checkoutId) as typeof pending;
      if (pending && !email) {
        email = pending.email;
        console.log(`[Webhook] Email récupéré depuis pending_checkouts: ${email}`);
      }
    } catch (dbErr) {
      console.error('[Webhook] pending_checkouts lookup error:', dbErr);
    }

    if (!email) {
      console.warn('[Webhook] Email introuvable pour checkout:', checkoutId);
      return NextResponse.json({ received: true, warning: 'email_absent' });
    }

    // 3. Créer l'abonnement + (si recurring) attacher le token + envoyer le magic link
    try {
      await activateSubscription(checkoutId, email, amountCents, pending ? {
        recurring: pending.recurring ?? 0,
        sumup_customer_id: pending.sumup_customer_id ?? null,
      } : null);
    } catch (err) {
      console.error('[Webhook] Erreur activation abonnement:', err);
    }
  }

  return NextResponse.json({ received: true });
}

// GET — quand SumUp redirige le navigateur vers return_url après paiement
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const checkoutId = searchParams.get('checkout_id') || searchParams.get('id') || '';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bulletinfacile.fr';

  // Déclenche la vérification en arrière-plan et redirige vers /success
  if (checkoutId) {
    // Fire-and-forget la vérification (le webhook POST aura déjà traité, ou /success/verify le fera)
    fetch(`${baseUrl}/api/checkout/verify?id=${checkoutId}`).catch(() => {});
    return NextResponse.redirect(`${baseUrl}/success?checkout_id=${checkoutId}`);
  }

  return NextResponse.redirect(`${baseUrl}/success`);
}
