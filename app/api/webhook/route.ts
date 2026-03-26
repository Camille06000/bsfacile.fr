import { NextRequest, NextResponse } from 'next/server';
import { findOrCreateUser, createSubscription, getDb } from '@/lib/db';

// ---------------------------------------------------------------------------
// SumUp webhook — CHECKOUT_STATUS_CHANGED
//
// ⚠️  Le payload SumUp est MINIMAL : { event_type, id }
//     Il N'Y A PAS de payload.status ni payload.email dans le body.
//     On doit appeler l'API SumUp pour vérifier le statut réel.
// ---------------------------------------------------------------------------

interface SubscriptionMeta {
  type: string;
  bulletinsTotal: number;
  expiresAt?: number;
}

function resolveSubscription(amountCents: number): SubscriptionMeta {
  const now = Math.floor(Date.now() / 1000);
  switch (amountCents) {
    case 890:   return { type: 'single',  bulletinsTotal: 1 };
    case 2900:  return { type: 'pack5',   bulletinsTotal: 5 };
    case 2885:  return { type: 'monthly', bulletinsTotal: 0, expiresAt: now + 31 * 24 * 3600 };
    case 28800: return { type: 'annual',  bulletinsTotal: 0, expiresAt: now + 366 * 24 * 3600 };
    default: {
      const euros = amountCents / 100;
      if (euros <= 9)               return { type: 'single',  bulletinsTotal: 1 };
      if (euros >= 28 && euros <= 30) return { type: 'monthly', bulletinsTotal: 0, expiresAt: now + 31 * 24 * 3600 };
      if (euros > 9 && euros <= 35)  return { type: 'pack5',   bulletinsTotal: 5 };
      return { type: 'annual', bulletinsTotal: 0, expiresAt: now + 366 * 24 * 3600 };
    }
  }
}

async function verifyCheckoutWithSumUp(checkoutId: string) {
  const apiKey = process.env.SUMUP_API_KEY;
  const res = await fetch(`https://api.sumup.com/v0.1/checkouts/${checkoutId}`, {
    headers: { 'Authorization': `Bearer ${apiKey}` },
  });
  if (!res.ok) return null;
  return res.json();
}

async function activateSubscription(checkoutId: string, email: string, amountCents: number) {
  const user = findOrCreateUser(email);
  const meta = resolveSubscription(amountCents);

  createSubscription({
    userId: user.id,
    type: meta.type,
    checkoutId,
    amountCents,
    bulletinsTotal: meta.bulletinsTotal,
    expiresAt: meta.expiresAt,
  });

  console.log(`[Webhook] Abonnement créé — userId: ${user.id}, type: ${meta.type}, email: ${email}`);

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

    // 2. Récupérer l'email : depuis l'API ou depuis pending_checkouts
    let email: string = checkout.personal_details?.email || '';
    const amountCents = Math.round((checkout.amount ?? 0) * 100);

    if (!email) {
      try {
        const row = getDb()
          .prepare('SELECT email, amount_cents FROM pending_checkouts WHERE checkout_id = ?')
          .get(checkoutId) as { email: string; amount_cents: number } | undefined;
        if (row) {
          email = row.email;
          console.log(`[Webhook] Email récupéré depuis pending_checkouts: ${email}`);
        }
      } catch (dbErr) {
        console.error('[Webhook] pending_checkouts lookup error:', dbErr);
      }
    }

    if (!email) {
      console.warn('[Webhook] Email introuvable pour checkout:', checkoutId);
      return NextResponse.json({ received: true, warning: 'email_absent' });
    }

    // 3. Créer l'abonnement + envoyer le magic link
    try {
      await activateSubscription(checkoutId, email, amountCents);
    } catch (err) {
      console.error('[Webhook] Erreur activation abonnement:', err);
    }
  }

  return NextResponse.json({ received: true });
}
