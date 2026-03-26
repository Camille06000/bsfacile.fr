import { NextRequest, NextResponse } from 'next/server';

const PRUNA_KEY = process.env.PRUNA_KEY!;
const PRUNA_BASE = 'https://api.pruna.ai';

async function prunaPost(model: string, input: Record<string, unknown>) {
  const res = await fetch(`${PRUNA_BASE}/v1/predictions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': PRUNA_KEY,
    },
    body: JSON.stringify({ model, input }),
  });
  if (!res.ok) throw new Error(`Pruna POST error: ${res.status}`);
  return res.json();
}

async function prunaPoll(
  predictionId: string,
  intervalMs = 4000,
  maxWait = 90000
): Promise<string | null> {
  const deadline = Date.now() + maxWait;
  while (Date.now() < deadline) {
    await new Promise(r => setTimeout(r, intervalMs));
    const res = await fetch(`${PRUNA_BASE}/v1/predictions/${predictionId}`, {
      headers: { 'apikey': PRUNA_KEY },
    });
    if (!res.ok) continue;
    const status = await res.json();
    if (status.status === 'succeeded') return status.output?.[0] ?? null;
    if (status.status === 'failed') return null;
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'prompt requis' }, { status: 400 });
    }
    if (!PRUNA_KEY) {
      return NextResponse.json({ error: 'PRUNA_KEY non configurée' }, { status: 500 });
    }

    const prediction = await prunaPost('p-image', { prompt });
    if (!prediction?.id) {
      return NextResponse.json({ error: 'Échec création prediction' }, { status: 500 });
    }

    const imageUrl = await prunaPoll(prediction.id);
    if (!imageUrl) {
      return NextResponse.json({ error: 'Timeout ou échec génération' }, { status: 500 });
    }

    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    console.error('[generate-image]', err);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
