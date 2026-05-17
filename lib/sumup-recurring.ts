/**
 * lib/sumup-recurring.ts
 *
 * Encapsule les appels à l'API SumUp pour le flux Recurring Payments :
 * 1. Créer un Customer SumUp (1 par user de l'app)
 * 2. Créer un checkout `purpose=SETUP_RECURRING_PAYMENT` qui charge le 1er paiement
 *    ET tokenise la carte
 * 3. Récupérer le card_token (Payment Instrument) après PAID
 * 4. Charger le card_token chaque mois (renouvellement)
 *
 * Doc SumUp : https://developer.sumup.com/docs/api/online-payments/recurring-payments/
 */

const SUMUP_BASE = 'https://api.sumup.com/v0.1';

function authHeader(): Record<string, string> {
  const apiKey = process.env.SUMUP_API_KEY;
  if (!apiKey) throw new Error('SUMUP_API_KEY manquant');
  return { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' };
}

export interface SumupPaymentInstrument {
  token: string;
  active: boolean;
  type: string;
  card?: { last_4_digits?: string; type?: string };
}

// ── Customers ──────────────────────────────────────────────────────────────

export async function ensureSumupCustomer(localUserId: number, email: string): Promise<string> {
  // customer_id côté SumUp = "bf-user-{localUserId}" — déterministe, idempotent
  const customerId = `bf-user-${localUserId}`;
  const res = await fetch(`${SUMUP_BASE}/customers`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      customer_id: customerId,
      personal_details: { email },
    }),
  });
  // SumUp renvoie 201 si créé, 409 si déjà existant — les deux cas sont OK
  if (res.ok || res.status === 409) return customerId;
  const err = await res.text();
  throw new Error(`SumUp ensureCustomer failed (${res.status}): ${err}`);
}

export async function listPaymentInstruments(customerId: string): Promise<SumupPaymentInstrument[]> {
  const res = await fetch(`${SUMUP_BASE}/customers/${customerId}/payment-instruments`, {
    headers: authHeader(),
  });
  if (!res.ok) throw new Error(`listPaymentInstruments failed (${res.status})`);
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data as SumupPaymentInstrument[];
}

// Retourne le token le plus récent ACTIF, ou null
export async function getLatestActiveToken(customerId: string): Promise<string | null> {
  const list = await listPaymentInstruments(customerId);
  const active = list.filter(p => p.active);
  return active.length > 0 ? active[active.length - 1].token : null;
}

// ── Checkout (setup + charge premier mois) ────────────────────────────────

export async function createRecurringSetupCheckout(params: {
  customerId: string;
  amountEur: number;
  description: string;
  returnUrl: string;
}): Promise<{ id: string; payUrl: string }> {
  const merchantCode = process.env.SUMUP_MERCHANT_CODE;
  if (!merchantCode) throw new Error('SUMUP_MERCHANT_CODE manquant');

  const res = await fetch(`${SUMUP_BASE}/checkouts`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      checkout_reference: `bf-rec-${Date.now()}`,
      amount: params.amountEur,
      currency: 'EUR',
      merchant_code: merchantCode,
      description: params.description,
      purpose: 'SETUP_RECURRING_PAYMENT',
      customer_id: params.customerId,
      return_url: params.returnUrl,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`createRecurringSetupCheckout failed (${res.status}): ${err}`);
  }
  const data = await res.json();
  return { id: data.id, payUrl: `https://pay.sumup.com/b2c/CHECKOUT/${data.id}` };
}

// ── Charge récurrente ──────────────────────────────────────────────────────

export interface ChargeResult {
  ok: boolean;
  checkoutId?: string;
  status?: string;
  errorDetail?: string;
}

/**
 * Charge un token Payment Instrument existant.
 * SumUp : POST /v0.1/customers/{cust_id}/payment-instruments/{token}/charge
 * (en réalité : crée un checkout puis le complète automatiquement avec le token)
 */
export async function chargeRecurring(params: {
  customerId: string;
  token: string;
  amountEur: number;
  description: string;
}): Promise<ChargeResult> {
  const merchantCode = process.env.SUMUP_MERCHANT_CODE;
  if (!merchantCode) return { ok: false, errorDetail: 'SUMUP_MERCHANT_CODE manquant' };

  // 1) Créer un checkout référencé au customer
  const checkoutRes = await fetch(`${SUMUP_BASE}/checkouts`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      checkout_reference: `bf-renew-${Date.now()}`,
      amount: params.amountEur,
      currency: 'EUR',
      merchant_code: merchantCode,
      description: params.description,
      customer_id: params.customerId,
      payment_type: 'recurring',
    }),
  });
  if (!checkoutRes.ok) {
    const err = await checkoutRes.text();
    return { ok: false, errorDetail: `create checkout: ${checkoutRes.status} ${err}` };
  }
  const checkout = await checkoutRes.json();

  // 2) Compléter le checkout avec le token
  const completeRes = await fetch(`${SUMUP_BASE}/checkouts/${checkout.id}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify({
      payment_type: 'recurring',
      token: params.token,
    }),
  });
  if (!completeRes.ok) {
    const err = await completeRes.text();
    return { ok: false, checkoutId: checkout.id, errorDetail: `complete: ${completeRes.status} ${err}` };
  }
  const completed = await completeRes.json();
  return { ok: completed.status === 'PAID', checkoutId: checkout.id, status: completed.status };
}
