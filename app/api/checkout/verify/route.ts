// GET /api/checkout/verify?id={checkoutId}
// Vérifie le statut d'un paiement SumUp et active l'abonnement si PAID.
// Appelé par la page /success comme fallback si le webhook n'a pas encore été traité.

import { NextRequest, NextResponse } from 'next/server';
import { findOrCreateUser, createSubscription, getActiveSubscription, getDb } from '@/lib/db';

function resolveSubscription(amountCents: number) {
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

export async function GET(req: NextRequest) {
  const checkoutId = req.nextUrl.searchParams.get('id') ?? '';
  if (!checkoutId) {
    return NextResponse.json({ error: 'checkout id manquant' }, { status: 400 });
  }

  const apiKey = process.env.SUMUP_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'SumUp non configuré' }, { status: 500 });
  }

  // 1. Vérifier le statut via l'API SumUp
  const sumupRes = await fetch(`https://api.sumup.com/v0.1/checkouts/${checkoutId}`, {
    headers: { 'Authorization': `Bearer ${apiKey}` },
  });

  if (!sumupRes.ok) {
    return NextResponse.json({ error: 'Checkout introuvable' }, { status: 404 });
  }

  const checkout = await sumupRes.json();

  if (checkout.status !== 'PAID') {
    return NextResponse.json({ status: checkout.status });
  }

  // 2. Récupérer l'email
  let email: string = checkout.personal_details?.email || '';
  const amountCents = Math.round((checkout.amount ?? 0) * 100);

  if (!email) {
    try {
      const row = getDb()
        .prepare('SELECT email FROM pending_checkouts WHERE checkout_id = ?')
        .get(checkoutId) as { email: string } | undefined;
      if (row) email = row.email;
    } catch { /* ok */ }
  }

  if (!email) {
    return NextResponse.json({ status: 'PAID', warning: 'email_absent' });
  }

  // 3. Vérifier si l'abonnement existe déjà (webhook déjà traité)
  const user = findOrCreateUser(email);
  const existing = getActiveSubscription(user.id);
  if (!existing) {
    // Créer l'abonnement
    const meta = resolveSubscription(amountCents);
    try {
      createSubscription({
        userId: user.id,
        type: meta.type,
        checkoutId,
        amountCents,
        bulletinsTotal: meta.bulletinsTotal,
        expiresAt: meta.expiresAt,
      });
      // Nettoie
      try { getDb().prepare('DELETE FROM pending_checkouts WHERE checkout_id = ?').run(checkoutId); } catch { /* ok */ }
      // Envoie magic link
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bulletinfacile.fr';
      fetch(`${baseUrl}/api/auth/magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }).catch(() => {});
    } catch (err) {
      console.error('[Verify] Erreur création abonnement:', err);
    }
  }

  return NextResponse.json({ status: 'PAID', email, activated: true });
}
