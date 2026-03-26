import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

interface KnowledgeEntry {
  id: string;
  topic: string;
  keywords: string;
  q: string;
  a: string;
  url?: string;
}

const CTA = {
  label: '✨ Créer mon bulletin en 2 min →',
  url: 'https://bulletinfacile.fr/generateur',
};

// System prompt — concis pour économiser les tokens
const SYSTEM_PROMPT = `Tu es l'assistant IA de BulletinFacile.fr, spécialiste de la paie française.
Chiffres clés 2026 : SMIC 1801,80€/mois brut (11,88€/h) • PMSS 4005€/mois • Taux brut→net ≈ 78% • Réduction Fillon max 32,34% • Heures supp +25% (50% au-delà de 8h/sem) • Congés 2,5j/mois.
Règles :
- Réponds TOUJOURS en français, sois chaleureux et professionnel
- Maximum 3 phrases courtes et précises
- Salutation → accueille chaleureusement, propose de répondre aux questions paie
- Utilise le CONTEXTE fourni en priorité, sinon tes connaissances
- Ne répète pas la question
- Termine TOUJOURS par : "👉 Créez votre bulletin sur BulletinFacile.fr"`;

let kb: KnowledgeEntry[] | null = null;

function loadKB(): KnowledgeEntry[] {
  if (kb) return kb;
  try {
    const p = path.join(process.cwd(), 'data', 'knowledge.json');
    kb = JSON.parse(readFileSync(p, 'utf-8'));
    return kb!;
  } catch {
    return [];
  }
}

function tokenize(text: string): string[] {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);
}

function scoreEntry(entry: KnowledgeEntry, tokens: string[]): number {
  const haystack = tokenize(`${entry.keywords} ${entry.topic} ${entry.q}`);
  let score = 0;
  for (const t of tokens) {
    if (haystack.some(h => h.includes(t) || t.includes(h))) score += 1;
    if (tokenize(entry.topic).some(h => h.includes(t))) score += 2;
  }
  return score;
}

function buildContext(entries: KnowledgeEntry[], tokens: string[]): string {
  const scored = entries
    .map(e => ({ entry: e, score: scoreEntry(e, tokens) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scored.length === 0) return '';

  return scored.map(({ entry }) =>
    `[${entry.topic}] ${entry.q}\n${entry.a.slice(0, 500)}`
  ).join('\n\n');
}

async function callOpenRouter(question: string, context: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY manquant');

  const userMessage = context
    ? `CONTEXTE:\n${context}\n\nQUESTION: ${question}`
    : question;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://bulletinfacile.fr',
      'X-Title': 'BulletinFacile Assistant',
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-lite-001',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 200,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question manquante' }, { status: 400 });
    }

    const entries = loadKB();
    const tokens = tokenize(question);
    const context = buildContext(entries, tokens);

    // Top related topics for UI chips
    const scored = entries
      .map(e => ({ entry: e, score: scoreEntry(e, tokens) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score);

    const related = scored.slice(1, 4)
      .filter(x => x.score >= 2)
      .map(x => ({ topic: x.entry.topic, url: x.entry.url || null }));

    const source = scored[0]?.entry?.url || null;

    let answer: string;
    try {
      answer = await callOpenRouter(question, context);
    } catch (err) {
      console.error('[Chat] OpenRouter error:', err);
      // Fallback FTS si OpenRouter est down
      if (scored.length > 0 && scored[0].score >= 2) {
        answer = scored[0].entry.a;
      } else {
        answer = "Je n'ai pas trouvé de réponse précise. 👉 Créez votre bulletin sur BulletinFacile.fr";
      }
    }

    return NextResponse.json({
      answer,
      source,
      related,
      cta: CTA,
    });
  } catch (err) {
    console.error('[Chat] Error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
