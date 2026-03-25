import { NextRequest, NextResponse } from 'next/server';

// Webhook SumUp — reçoit les événements de paiement
// Configurer dans SumUp Dashboard → Developers → Webhooks
// URL : https://bsfacile.fr/api/webhook

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log('[SumUp Webhook]', JSON.stringify(body, null, 2));

  // Événement de paiement réussi
  if (body.event_type === 'CHECKOUT_STATUS_CHANGED' && body.payload?.status === 'PAID') {
    const checkoutId = body.payload?.id;
    const email = body.payload?.customer_id || body.payload?.email;

    console.log(`✅ Paiement confirmé — checkout: ${checkoutId}, email: ${email}`);

    // TODO : enregistrer l'accès en base de données
    // await db.createAccess({ checkoutId, email, plan: 'lifetime' });
  }

  return NextResponse.json({ received: true });
}
