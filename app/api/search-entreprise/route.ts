import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || '';
  if (q.length < 2) return NextResponse.json({ results: [] });

  try {
    const url = `https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(q)}&page=1&per_page=8&etat_administratif=A`;
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 60 },
    });

    if (!res.ok) return NextResponse.json({ results: [] });

    const data = await res.json();

    // Normaliser la réponse pour le client
    const results = (data.results || []).map((e: Record<string, unknown>) => {
      const siege = (e.siege || {}) as Record<string, string | null>;
      // adresse déjà complète dans siege.adresse — on utilise geo_adresse si disponible (plus lisible)
      const adresse = (siege.geo_adresse as string) || (siege.adresse as string) || '';

      return {
        nom_complet:       e.nom_complet || '',
        siren:             e.siren || '',
        siege: {
          siret:               siege.siret || '',
          adresse,
          activite_principale: siege.activite_principale || (e.activite_principale as string) || '',
          libelle_commune:     siege.libelle_commune || '',
          code_postal:         siege.code_postal || '',
        },
      };
    });

    return NextResponse.json({ results });
  } catch (err) {
    console.error('[search-entreprise]', err);
    return NextResponse.json({ results: [] });
  }
}
