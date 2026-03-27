import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

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
  const email: string = (body.email ?? '').trim().toLowerCase();

  const checkoutRef = `bf-${Date.now()}`;

  try {
    const payload: Record<string, unknown> = {
      checkout_reference: checkoutRef,
      amount,
      currency: 'EUR',
      merchant_code: merchantCode,
      description,
      // return_url = endpoint webhook SumUp (reçoit le POST de SumUp + redirige vers /success)
      return_url: `${baseUrl}/api/webhook`,
    };

    // Inclure l'email dans personal_details pour que le webhook le reçoive
    if (email) {
      payload.personal_details = { email };
    }

    const checkoutRes = await fetch('https://api.sumup.com/v0.1/checkouts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!checkoutRes.ok) {
      const err = await checkoutRes.json();
      console.error('SumUp error:', err);
      return NextResponse.json({ error: 'Erreur SumUp', detail: err }, { status: 500 });
    }

    const checkout = await checkoutRes.json();

    // Mettre à jour return_url avec le vrai checkout_id
    if (checkout.id) {
      try {
        await fetch(`https://api.sumup.com/v0.1/checkouts/${checkout.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            return_url: `${baseUrl}/api/webhook`,
          }),
        });
      } catch { /* non bloquant */ }
    }

    // Stocker l'email en DB (table pending_checkouts) pour fiabiliser le webhook
    if (email && checkout.id) {
      try {
        const db = getDb();
        db.exec(`CREATE TABLE IF NOT EXISTS pending_checkouts (
          checkout_id TEXT PRIMARY KEY,
          email TEXT NOT NULL,
          amount_cents INTEGER NOT NULL,
          created_at INTEGER NOT NULL DEFAULT (unixepoch())
        )`);
        db.prepare('INSERT OR REPLACE INTO pending_checkouts (checkout_id, email, amount_cents) VALUES (?, ?, ?)')
          .run(checkout.id, email, Math.round(amount * 100));
      } catch (dbErr) {
        console.error('pending_checkouts insert error:', dbErr);
      }
    }

    const paymentUrl = `https://pay.sumup.com/b2c/CHECKOUT/${checkout.id}`;
    return NextResponse.json({ url: paymentUrl, checkoutId: checkout.id });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
