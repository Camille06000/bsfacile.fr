import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const apiKey = process.env.SUMUP_API_KEY;
  const merchantCode = process.env.SUMUP_MERCHANT_CODE;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bulletinfacile.fr';

  if (!apiKey || !merchantCode) {
    return NextResponse.json({ error: 'SumUp non configuré' }, { status: 500 });
  }

  const body = await req.json();
  const amount: number = body.amount ?? 8.90;
  const description: string = body.description ?? 'Bulletin Facile — Bulletin de salaire';

  try {
    const checkoutRes = await fetch('https://api.sumup.com/v0.1/checkouts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checkout_reference: `bf-${Date.now()}`,
        amount,
        currency: 'EUR',
        merchant_code: merchantCode,
        description,
        return_url: `${baseUrl}/success`,
      }),
    });

    if (!checkoutRes.ok) {
      const err = await checkoutRes.json();
      console.error('SumUp error:', err);
      return NextResponse.json({ error: 'Erreur SumUp', detail: err }, { status: 500 });
    }

    const checkout = await checkoutRes.json();
    const paymentUrl = `https://pay.sumup.com/b2c/CHECKOUT/${checkout.id}`;
    return NextResponse.json({ url: paymentUrl, checkoutId: checkout.id });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
