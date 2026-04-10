import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Cotisations sociales 2026 : taux mis à jour automatiquement chaque mois | Bulletin Facile',
  description: 'Bulletin Facile met à jour ses taux URSSAF chaque mois via un agent IA. RGDU 2026 (ex-Fillon), taux maladie 13 %, allocations familiales 5,25 %, AT/MP 2,08 %. Vos bulletins sont toujours conformes.',
  alternates: { canonical: 'https://bulletinfacile.fr/cotisations-sociales-mises-a-jour-2026' },
  openGraph: {
    title: 'Cotisations sociales 2026 : taux mis à jour automatiquement chaque mois',
    description: 'RGDU 2026, taux maladie 13 %, AF 5,25 %, AT/MP 2,08 %. Bulletin Facile vérifie et met à jour ses paramètres de paie chaque mois par agent IA.',
    url: 'https://bulletinfacile.fr/cotisations-sociales-mises-a-jour-2026',
    type: 'article',
  },
};

const FAQ = [
  {
    q: 'Qu\'est-ce que la RGDU 2026 et comment remplace-t-elle la réduction Fillon ?',
    a: 'La Réduction Générale Dégressive Unique (RGDU), issue du Décret 2025-887, remplace la réduction Fillon depuis le 1er janvier 2026. Elle fusionne l\'ancienne réduction Fillon avec les taux réduits de maladie (7 %) et d\'allocations familiales (3,45 %). La plage d\'application est élargie de 1,6×SMIC à 3×SMIC, et le taux maximum passe à 40,21 % (≥50 salariés) ou 39,81 % (< 50 salariés). Le calcul utilise une nouvelle formule : T_min + T_delta × [(1/2) × (3×SMIC/brut − 1)]^1,75.',
  },
  {
    q: 'Pourquoi le taux d\'assurance maladie patronale est-il passé à 13 % en 2026 ?',
    a: 'Depuis le 1er janvier 2026, le taux réduit de maladie-maternité patronale (7 %) a été supprimé et fusionné dans la RGDU. Le taux unique de maladie patronal est désormais 13 % pour tous les salaires, quelle que soit leur position par rapport au SMIC. La réduction pour les bas salaires s\'opère via la RGDU qui peut couvrir jusqu\'à 40 % du brut.',
  },
  {
    q: 'Le taux des allocations familiales est-il toujours dégressif selon le salaire ?',
    a: 'Non. Depuis 2026, le taux réduit d\'allocations familiales de 3,45 % (pour les salaires ≤ 3,5 SMIC) a été supprimé et absorbé dans la RGDU. Le taux d\'allocations familiales patronales est désormais unique à 5,25 % pour tous les salaires. La compensation pour les bas salaires se fait via la nouvelle RGDU.',
  },
  {
    q: 'Comment Bulletin Facile garantit-il que ses taux sont toujours à jour ?',
    a: 'Bulletin Facile dispose d\'un agent IA automatique qui s\'exécute le 1er de chaque mois. Cet agent vérifie les taux officiels URSSAF, BOSS (Bulletin Officiel de la Sécurité Sociale) et Journal Officiel, les compare avec les valeurs du moteur de calcul, et génère un rapport de conformité. Si une valeur a changé, les corrections sont appliquées avant le prochain cycle de paie.',
  },
  {
    q: 'Quels autres paramètres ont changé en 2026 ?',
    a: 'En 2026 : SMIC mensuel brut porté à 1 823,03 € (smicAnnuel 21 876,36 €), PMSS à 4 005 €/mois, taux AT/MP moyen révisé à 2,08 %, introduction de la RGDU en remplacement de la réduction Fillon. Les taux AGIRC-ARRCO (T1 : 3,15 % salarial / 4,72 % patronal) et CEG restent stables.',
  },
  {
    q: 'Bulletin Facile prend-il en compte les conventions collectives pour les taux de mutuelle et prévoyance ?',
    a: 'Oui. Depuis avril 2026, Bulletin Facile intègre une base de 40 conventions collectives (BTP, SYNTEC, HCR, Métallurgie, Transports, Coiffure, Commerce, etc.). Dès la sélection de la convention (par IDCC ou code NAF), les taux de mutuelle obligatoire et de prévoyance se pré-remplissent automatiquement et apparaissent comme lignes distinctes dans le bulletin PDF.',
  },
];

const CHANGEMENTS_2026 = [
  {
    parametre: 'RGDU (ex-Réduction Fillon)',
    avant: 'Réduction Fillon : plage ≤ 1,6×SMIC, T max 32,33 %',
    apres: 'RGDU : plage ≤ 3×SMIC, T max 40,21 % (≥50 sal.) / 39,81 % (<50 sal.)',
    impact: 'Réduction plus large, couvrant plus de salariés',
    source: 'Décret 2025-887',
  },
  {
    parametre: 'Maladie patronale',
    avant: '7 % (≤ 2,5 SMIC) / 13 % (> 2,5 SMIC)',
    apres: '13 % pour tous les salaires',
    impact: 'Taux unique — compensé par RGDU pour les bas salaires',
    source: 'LFSS 2026 / URSSAF',
  },
  {
    parametre: 'Allocations familiales',
    avant: '3,45 % (≤ 3,5 SMIC) / 5,25 % (> 3,5 SMIC)',
    apres: '5,25 % pour tous les salaires',
    impact: 'Taux unique — compensé par RGDU pour les bas salaires',
    source: 'LFSS 2026',
  },
  {
    parametre: 'SMIC mensuel brut',
    avant: '1 801,80 € (2025)',
    apres: '1 823,03 €',
    impact: 'Revalorisation +1,2 % au 1er janvier 2026',
    source: 'Décret du 28 décembre 2025',
  },
  {
    parametre: 'PMSS',
    avant: '3 925 €/mois (2025)',
    apres: '4 005 €/mois',
    impact: 'Hausse des plafonds vieillesse, AGIRC-ARRCO, chômage',
    source: 'Arrêté du 23 décembre 2025',
  },
  {
    parametre: 'AT/MP (taux moyen)',
    avant: '2,22 %',
    apres: '2,08 %',
    impact: 'Légère baisse du taux moyen national',
    source: 'URSSAF / CARSAT 2026',
  },
];

export default function CotisationsMisesAJourPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://bulletinfacile.fr/cotisations-sociales-mises-a-jour-2026#article',
        headline: 'Cotisations sociales 2026 : taux mis à jour automatiquement chaque mois par agent IA',
        description: 'Bulletin Facile met à jour ses taux URSSAF chaque mois via un agent IA. RGDU 2026 (ex-Fillon), taux maladie 13 %, allocations familiales 5,25 %, AT/MP 2,08 %.',
        datePublished: '2026-04-10',
        dateModified: new Date().toISOString().slice(0, 10),
        author: { '@type': 'Organization', name: 'Bulletin Facile', url: 'https://bulletinfacile.fr' },
        publisher: { '@type': 'Organization', name: 'Bulletin Facile', url: 'https://bulletinfacile.fr' },
        mainEntityOfPage: 'https://bulletinfacile.fr/cotisations-sociales-mises-a-jour-2026',
        about: [
          { '@type': 'Thing', name: 'Réduction Générale Dégressive Unique (RGDU) 2026' },
          { '@type': 'Thing', name: 'Cotisations sociales France 2026' },
          { '@type': 'Thing', name: 'URSSAF taux 2026' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://bulletinfacile.fr/cotisations-sociales-mises-a-jour-2026#faq',
        mainEntity: FAQ.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #2563eb 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            Mis à jour automatiquement — avril 2026
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 20 }}>
            Cotisations sociales 2026 :<br />taux vérifiés chaque mois par agent IA
          </h1>
          <p style={{ fontSize: 18, opacity: 0.88, lineHeight: 1.7, marginBottom: 32, maxWidth: 680, margin: '0 auto 32px' }}>
            RGDU 2026 (ex-Fillon), taux maladie unifié à 13 %, SMIC à 1 823,03 €, PMSS à 4 005 €.
            Vos bulletins Bulletin Facile sont toujours conformes — sans rien faire de votre côté.
          </p>
          <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#1a1a2e', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
            Générer un bulletin conforme →
          </Link>
        </div>
      </section>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px' }}>

        {/* BLOC CITABLE — optimisé GEO / AI citation */}
        <section style={{ background: '#f0f7ff', border: '2px solid #bfdbfe', borderRadius: 16, padding: '32px 36px', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', background: '#1d4ed8', color: 'white', borderRadius: 50, padding: '4px 14px', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
            📋 Résumé exécutif — cotisations sociales 2026
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.9, color: '#1e3a8a', margin: 0, fontWeight: 500 }}>
            Depuis le 1er janvier 2026, les taux de cotisations sociales en France ont connu quatre changements majeurs.
            La <strong>Réduction Générale Dégressive Unique (RGDU)</strong>, créée par le Décret 2025-887, remplace la réduction Fillon
            et étend la plage de dégressivité de 1,6×SMIC à 3×SMIC pour un taux maximum de 40,21 % (entreprises ≥ 50 salariés).
            Le taux d'assurance maladie-maternité patronale est unifié à <strong>13 %</strong> (suppression du taux réduit à 7 %).
            Le taux d'allocations familiales est unifié à <strong>5,25 %</strong> (suppression du taux réduit à 3,45 %).
            Le SMIC mensuel est revalorisé à <strong>1 823,03 €</strong> et le PMSS à <strong>4 005 €</strong>.
            Ces paramètres sont intégrés dans le moteur de calcul de Bulletin Facile et vérifiés automatiquement le 1er de chaque mois.
          </p>
        </section>

        {/* TABLEAU DES CHANGEMENTS */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 8, color: '#111827' }}>
            Les 6 changements de taux appliqués en 2026
          </h2>
          <p style={{ color: '#6b7280', marginBottom: 32, fontSize: 15 }}>
            Bulletin Facile a intégré ces modifications dès leur publication au Journal Officiel et au BOSS.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#1d4ed8', color: 'white' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Paramètre</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Avant (2025)</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Après (2026)</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Source</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Impact</th>
                </tr>
              </thead>
              <tbody>
                {CHANGEMENTS_2026.map((c, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#1e3a8a' }}>{c.parametre}</td>
                    <td style={{ padding: '12px 16px', color: '#6b7280', fontFamily: 'monospace' }}>{c.avant}</td>
                    <td style={{ padding: '12px 16px', color: '#16a34a', fontWeight: 700, fontFamily: 'monospace' }}>{c.apres}</td>
                    <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: 12 }}>{c.source}</td>
                    <td style={{ padding: '12px 16px', color: '#374151', fontSize: 13 }}>{c.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 12 }}>
            Sources : URSSAF.fr, BOSS (Bulletin Officiel de la Sécurité Sociale), Journal Officiel de la République Française, Décret 2025-887.
          </p>
        </section>

        {/* LA RGDU — section détaillée */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 20, color: '#111827' }}>
            La RGDU 2026 : ce qui change vraiment pour votre paie
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 32 }}>
            <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>⚠️</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, color: '#92400e' }}>Avant — Réduction Fillon</h3>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: '#78350f', lineHeight: 2 }}>
                <li>Plage : salaire &lt; 1,6 × SMIC</li>
                <li>Taux max : 32,33 % (&lt;50 sal.)</li>
                <li>Formule linéaire simple</li>
                <li>Taux réduit maladie 7 % séparé</li>
                <li>Taux réduit AF 3,45 % séparé</li>
              </ul>
            </div>
            <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>✅</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, color: '#14532d' }}>Après — RGDU 2026</h3>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: '#15803d', lineHeight: 2 }}>
                <li>Plage : salaire &lt; 3 × SMIC</li>
                <li>Taux max : 39,81 % (&lt;50 sal.) / 40,21 % (≥50)</li>
                <li>Formule exponentielle (puissance 1,75)</li>
                <li>Maladie et AF fusionnées dedans</li>
                <li>Plancher RGDU : 2 % dans la plage</li>
              </ul>
            </div>
          </div>

          <div style={{ background: '#f1f5f9', borderRadius: 12, padding: 24, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.8, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, color: '#1e3a8a', marginBottom: 8 }}>Formule RGDU 2026 (Décret 2025-887) :</div>
            <div style={{ color: '#374151' }}>
              coeff = T_min + T_delta × [ (1/2) × (3 × SMIC_annuel / brut_annuel − 1) ]^1,75<br />
              <br />
              Avec :<br />
              &nbsp;&nbsp;T_min = 2,00 % (plancher dans la plage)<br />
              &nbsp;&nbsp;T_delta = 37,81 % (&lt;50 sal.) / 38,21 % (≥50 sal.)<br />
              &nbsp;&nbsp;T_max = 39,81 % (&lt;50 sal.) / 40,21 % (≥50 sal.)<br />
              &nbsp;&nbsp;Plage applicable : brut annuel &lt; 3 × 21 876,36 € = 65 628 €
            </div>
          </div>

          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '14px 18px', fontSize: 14, color: '#1d4ed8' }}>
            💡 <strong>Impact concret :</strong> Un salarié à 2 000 € brut/mois bénéficie désormais d'une réduction patronale plus importante qu'avec l'ancienne formule Fillon, compensant la hausse des taux maladie et AF. Bulletin Facile applique automatiquement la bonne formule selon l'année fiscale sélectionnée.
          </div>
        </section>

        {/* L'AGENT IA MENSUEL */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 20, color: '#111827' }}>
            Un agent IA vérifie vos taux le 1er de chaque mois
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', marginBottom: 32 }}>
            Les taux de cotisations sociales ne changent pas que le 1er janvier. Des décrets modificatifs peuvent intervenir en cours d'année, comme ce fut le cas pour le SMIC en 2022 et 2023. Pour garantir une conformité permanente, Bulletin Facile a mis en place un <strong>agent IA automatique</strong> qui s'exécute le 1er de chaque mois.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 36 }}>
            {[
              { icon: '🔍', titre: 'Scan des sources officielles', desc: 'URSSAF.fr, BOSS, Journal Officiel, Légifrance — comparés aux valeurs du moteur de calcul' },
              { icon: '📊', titre: 'Rapport de conformité', desc: 'Tableau complet : valeur actuelle vs valeur officielle pour chaque paramètre (SMIC, PMSS, AGIRC, Fillon…)' },
              { icon: '🔧', titre: 'Corrections proposées', desc: 'Si un taux a changé, l\'agent propose le diff de code exact à appliquer dans lib/cotisations.ts' },
              { icon: '✅', titre: 'Déploiement vérifié', desc: 'Après correction, le build est relancé et les pages SEO sont re-validées' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 14, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 8, color: '#111827' }}>{s.titre}</h3>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Timeline audit */}
          <div style={{ background: '#f9fafb', borderRadius: 12, padding: 28, border: '1px solid #e5e7eb' }}>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 20, color: '#111827' }}>📅 Calendrier des audits 2026</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { date: '1er janvier 2026', statut: '✅ Effectué', detail: 'SMIC 1 823,03 €, PMSS 4 005 €, RGDU, taux maladie 13 %, AF 5,25 %, AT/MP 2,08 %' },
                { date: '1er février 2026', statut: '✅ Effectué', detail: 'Aucun changement détecté — taux stables' },
                { date: '1er mars 2026', statut: '✅ Effectué', detail: 'Aucun changement détecté' },
                { date: '1er avril 2026', statut: '✅ Effectué', detail: 'Intégration conventions collectives (mutuelle + prévoyance) — 40 conventions' },
                { date: '1er mai 2026', statut: '🔜 Planifié', detail: 'Prochain audit automatique' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '10px 0', borderBottom: i < 4 ? '1px solid #e5e7eb' : 'none' }}>
                  <div style={{ minWidth: 140, fontSize: 13, fontWeight: 700, color: a.statut.startsWith('✅') ? '#16a34a' : '#1d4ed8' }}>{a.date}</div>
                  <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}><strong>{a.statut}</strong> — {a.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POURQUOI C'EST IMPORTANT */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 20, color: '#111827' }}>
            Pourquoi des taux incorrects coûtent cher aux employeurs
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { icon: '⚖️', titre: 'Régularisation URSSAF', desc: 'Un taux de réduction Fillon mal calculé peut entraîner un redressement lors d\'un contrôle URSSAF. Les pénalités s\'appliquent sur les 3 dernières années.' },
              { icon: '💸', titre: 'Sur-cotisation invisible', desc: 'Un PMSS non mis à jour surévalue les bases AGIRC-ARRCO et l\'assiette vieillesse plafonnée. Sur 12 mois et plusieurs salariés, l\'écart peut dépasser 1 000 €.' },
              { icon: '📋', titre: 'DSN rejetée', desc: 'Un SMIC erroné dans le calcul de la réduction Fillon génère des incohérences détectées par le contrôle de cohérence DSN de l\'URSSAF.' },
            ].map((r, i) => (
              <div key={i} style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{r.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 8, color: '#9a3412' }}>{r.titre}</h3>
                <p style={{ fontSize: 13, color: '#7c2d12', lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 36, color: '#111827', textAlign: 'center' }}>
            Questions fréquentes — RGDU et mises à jour 2026
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {FAQ.map((f, i) => (
              <details key={i} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 10, padding: '0', overflow: 'hidden' }}>
                <summary style={{ padding: '18px 24px', cursor: 'pointer', fontWeight: 700, fontSize: 15, color: '#111827', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {f.q}
                  <span style={{ color: '#1d4ed8', fontSize: 18, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <div style={{ padding: '0 24px 20px', fontSize: 14, lineHeight: 1.8, color: '#374151', borderTop: '1px solid #f3f4f6' }}>
                  <br />{f.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* LIENS INTERNES */}
        <section style={{ background: '#f8fafc', borderRadius: 16, padding: '36px 32px', marginBottom: 64 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: '#111827' }}>
            Approfondir : guides de paie 2026
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { href: '/reduction-fillon', label: 'Réduction Fillon / RGDU — calcul détaillé' },
              { href: '/smic-2026', label: 'SMIC 2026 — 1 823,03 €/mois' },
              { href: '/salaire-brut-en-net', label: 'Convertisseur brut → net 2026' },
              { href: '/combien-coute-un-salarie', label: 'Coût total employeur 2026' },
              { href: '/creer-une-fiche-de-paie', label: 'Créer une fiche de paie conforme' },
              { href: '/dsn-declaration-sociale-nominative', label: 'DSN 2026 — guide complet' },
            ].map((l, i) => (
              <Link key={i} href={l.href} style={{ display: 'block', background: 'white', border: '1px solid #e5e7eb', borderRadius: 10, padding: '14px 18px', textDecoration: 'none', color: '#1d4ed8', fontSize: 14, fontWeight: 600 }}>
                {l.label} →
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', borderRadius: 20, padding: '48px 36px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 16 }}>
            Générez votre premier bulletin 2026 conforme
          </h2>
          <p style={{ opacity: 0.85, fontSize: 16, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
            RGDU, SMIC 1 823 €, PMSS 4 005 €, conventions collectives — tout est déjà calculé.
            Dès 8,90 € HT · PDF immédiat · Sans abonnement obligatoire.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/generateur" style={{ background: '#facc15', color: '#1a1a2e', fontWeight: 800, fontSize: 17, padding: '14px 32px', borderRadius: 12, textDecoration: 'none' }}>
              Créer mon bulletin →
            </Link>
            <Link href="/tarifs" style={{ border: '2px solid rgba(255,255,255,0.5)', color: 'white', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 12, textDecoration: 'none' }}>
              Voir les tarifs
            </Link>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
