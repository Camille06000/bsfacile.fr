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
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);
}

function scoreEntry(entry: KnowledgeEntry, tokens: string[]): number {
  const haystack = tokenize(`${entry.keywords} ${entry.topic} ${entry.q}`);
  let score = 0;
  for (const t of tokens) {
    if (haystack.some(h => h.includes(t) || t.includes(h))) score += 1;
    if (tokenize(entry.topic).some(h => h.includes(t))) score += 2; // topic bonus
  }
  return score;
}

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question manquante' }, { status: 400 });
    }

    const entries = loadKB();
    const tokens = tokenize(question);

    // Score all entries
    const scored = entries
      .map(e => ({ entry: e, score: scoreEntry(e, tokens) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length === 0 || scored[0].score < 2) {
      return NextResponse.json({
        answer: "Je ne trouve pas de réponse précise à cette question dans ma base de connaissances. Vous pouvez consulter nos guides sur le site, ou utiliser notre générateur de bulletin de salaire.",
        source: null,
        confidence: 'low',
        cta: CTA,
      });
    }

    const best = scored[0].entry;

    // Include top-3 related topics if multiple good matches
    const related = scored.slice(1, 4)
      .filter(x => x.score >= 2)
      .map(x => ({ topic: x.entry.topic, url: x.entry.url || null }));

    return NextResponse.json({
      answer: best.a,
      source: best.url || null,
      sourceTopic: best.topic,
      related,
      confidence: scored[0].score >= 4 ? 'high' : 'medium',
      cta: CTA,
    });
  } catch (err) {
    console.error('[Chat] Error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
