import { NextRequest, NextResponse } from 'next/server';

// SumUp Checkout API
// Clés à définir dans .env.local :
// SUMUP_API_KEY=your_sumup_api_key
// SUMUP_MERCHANT_CODE=your_merchant_code
// NEXT_PUBLIC_BASE_URL=https://bsfacile.fr

const PRICE = 49.00; // € TTC

export async function POST(req: NextRequest) {
  const apiKey = process.env.SUMUP_API_KEY;
  const merchantCode = process.env.SUMUP_MERCHANT_CODE;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  if (!apiKey || !merchantCode) {
    return NextResponse.json({ error: 'SumUp non configuré' }, { status: 500 });
  }

  try {
    // Créer un checkout SumUp
    const checkoutRes = await fetch('https://api.sumup.com/v0.1/checkouts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checkout_reference: `bsfacile-${Date.now()}`,
        amount: PRICE,
        currency: 'EUR',
        merchant_code: merchantCode,
        description: 'BS Facile — Accès à vie',
        return_url: `${baseUrl}/success`,
      }),
    });

    if (!checkoutRes.ok) {
      const err = await checkoutRes.json();
      console.error('SumUp error:', err);
      return NextResponse.json({ error: 'Erreur SumUp' }, { status: 500 });
    }

    const checkout = await checkoutRes.json();

    // URL de paiement SumUp
    const paymentUrl = `https://pay.sumup.com/b2c/CHECKOUT/${checkout.id}`;

    return NextResponse.json({ url: paymentUrl, checkoutId: checkout.id });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
