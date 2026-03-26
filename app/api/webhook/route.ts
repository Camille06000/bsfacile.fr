import { NextRequest, NextResponse } from 'next/server';
import { findOrCreateUser, createSubscription } from '@/lib/db';

// Webhook SumUp — reçoit les événements de paiement
// Configurer dans SumUp Dashboard → Developers → Webhooks
// URL : https://bulletinfacile.fr/api/webhook

// ---------------------------------------------------------------------------
// Détermine le type d'abonnement selon le montant payé (en euros)
// ---------------------------------------------------------------------------

interface SubscriptionMeta {
  type: string;
  bulletinsTotal: number;
  expiresAt?: number;
}

function resolveSubscriptionMeta(amountEuros: number): SubscriptionMeta {
  const now = Math.floor(Date.now() / 1000);

  if (amountEuros <= 9.0) {
    // 8.90 € — bulletin unique
    return { type: 'single', bulletinsTotal: 1 };
  }
  if (amountEuros >= 28 && amountEuros <= 30) {
    // 28.85 €/mois — abonnement mensuel (illimité, expire dans 31 jours)
    return { type: 'monthly', bulletinsTotal: 0, expiresAt: now + 31 * 24 * 3600 };
  }
  if (amountEuros > 9 && amountEuros <= 35) {
    // 29.00 € — pack 5 bulletins
    return { type: 'pack5', bulletinsTotal: 5 };
  }
  if (amountEuros <= 290) {
    // 288.00 €/an — abonnement annuel (illimité, expire dans 366 jours)
    return { type: 'annual', bulletinsTotal: 0, expiresAt: now + 366 * 24 * 3600 };
  }
  // Fallback — traité comme mensuel si montant inconnu
  return { type: 'monthly', bulletinsTotal: 0, expiresAt: now + 31 * 24 * 3600 };
}

// ---------------------------------------------------------------------------
// Détermine précisément le type selon le montant en centimes
// ---------------------------------------------------------------------------

function resolveSubscriptionMetaByCents(amountCents: number): SubscriptionMeta {
  const now = Math.floor(Date.now() / 1000);

  switch (amountCents) {
    case 890:
      return { type: 'single', bulletinsTotal: 1 };
    case 2900:
      return { type: 'pack5', bulletinsTotal: 5 };
    case 2885:
      return { type: 'monthly', bulletinsTotal: 0, expiresAt: now + 31 * 24 * 3600 };
    case 28800:
      return { type: 'annual', bulletinsTotal: 0, expiresAt: now + 366 * 24 * 3600 };
    default:
      // Fallback par tranche
      return resolveSubscriptionMeta(amountCents / 100);
  }
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log('[SumUp Webhook]', JSON.stringify(body, null, 2));

  // Événement de paiement réussi
  if (
    body.event_type === 'CHECKOUT_STATUS_CHANGED' &&
    body.payload?.status === 'PAID'
  ) {
    const checkoutId: string = body.payload?.id ?? `unknown-${Date.now()}`;

    // Récupère l'email depuis les différents champs possibles de SumUp
    const email: string =
      body.payload?.personal_details?.email ||
      body.payload?.customer?.email ||
      body.payload?.customer_id ||
      body.payload?.email ||
      '';

    // Récupère le montant en centimes
    const amountCents: number = Math.round(
      (body.payload?.amount ?? body.payload?.transaction_amount ?? 0) * 100,
    );

    console.log(
      `[Webhook] Paiement confirmé — checkout: ${checkoutId}, email: ${email}, montant: ${amountCents} cts`,
    );

    if (!email) {
      console.warn('[Webhook] Email absent du payload SumUp — abonnement non créé.');
      return NextResponse.json({ received: true, warning: 'email_absent' });
    }

    try {
      // 1. Crée ou retrouve l'utilisateur
      const user = findOrCreateUser(email);

      // 2. Détermine le type d'abonnement selon le montant
      const meta = resolveSubscriptionMetaByCents(amountCents);

      // 3. Crée l'abonnement
      createSubscription({
        userId: user.id,
        type: meta.type,
        checkoutId,
        amountCents,
        bulletinsTotal: meta.bulletinsTotal,
        expiresAt: meta.expiresAt,
      });

      console.log(
        `[Webhook] Abonnement créé — userId: ${user.id}, type: ${meta.type}`,
      );

      // 4. Envoie le lien magique de connexion
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || 'https://bulletinfacile.fr';
      await fetch(`${baseUrl}/api/auth/magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }).catch((err) =>
        console.error('[Webhook] Échec envoi magic link:', err),
      );

    } catch (err) {
      console.error('[Webhook] Erreur lors de la création du compte:', err);
      // On retourne quand même 200 pour éviter que SumUp ne réessaie indéfiniment
    }
  }

  return NextResponse.json({ received: true });
}
