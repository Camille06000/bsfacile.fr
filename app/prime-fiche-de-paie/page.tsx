import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Prime sur fiche de paie 2026 : imposition, cotisations, affichage — Bulletin Facile',
  description: 'Comment les primes apparaissent-elles sur le bulletin de salaire ? Prime exceptionnelle, 13e mois, performance, ancienneté : imposition, cotisations sociales et affichage légal.',
  alternates: { canonical: 'https://bulletinfacile.fr/prime-fiche-de-paie' },
};

const FAQ = [
  {
    q: 'Une prime est-elle toujours soumise aux cotisations sociales ?',
    a: 'La plupart des primes (13e mois, ancienneté, performance, exceptionnelle) sont soumises aux mêmes cotisations sociales que le salaire ordinaire. Font exception la participation et l\'intéressement (exonérés de cotisations salariales et patronales dans les plafonds légaux, mais soumis à CSG/CRDS) et la Prime de Partage de la Valeur (PPV) sous conditions.',
  },
  {
    q: 'La prime de 13e mois est-elle obligatoire ?',
    a: 'Non, la prime de 13e mois n\'est pas une obligation légale. Elle résulte d\'un usage d\'entreprise, d\'un accord collectif ou d\'une clause contractuelle. Toutefois, dès lors qu\'elle est prévue par l\'un de ces textes ou pratiquée de manière régulière et généralisée, l\'employeur est tenu de la verser. Elle peut être versée en décembre ou fractionnée sur l\'année.',
  },
  {
    q: 'Comment est imposée une prime sur le bulletin ?',
    a: 'Les primes sont soumises au prélèvement à la source (PAS) comme le salaire ordinaire. Le taux PAS appliqué est le taux personnalisé du salarié ou, à défaut, le taux par défaut selon le barème. Si la prime est versée sur un mois distinct, le taux mensuel tient compte du revenu annualisé, ce qui peut créer un décalage temporaire avec une régularisation en fin d\'année lors de la déclaration.',
  },
  {
    q: 'Qu\'est-ce que la PPV (Prime de Partage de la Valeur) en 2026 ?',
    a: 'La Prime de Partage de la Valeur (ex-PEPA) peut être versée à tous les salariés. En 2026, pour les salariés gagnant moins de 3 fois le SMIC, elle reste exonérée d\'impôt sur le revenu et de cotisations sociales (salariales et patronales) dans la limite de 3 000 € (ou 6 000 € si accord de participation/intéressement). Au-delà, la prime est soumise aux charges habituelles. Elle reste soumise à CSG/CRDS dans tous les cas.',
  },
];

export default function PrimeFicheDePayePage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>

      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #78350f 0%, #92400e 55%, #b45309 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Droit social 2026 — Rémunération variable
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
            Prime sur la fiche de paie
          </h1>
          <p style={{ fontSize: 20, opacity: 0.9, marginBottom: 40 }}>
            Imposition, cotisations, affichage légal : tout comprendre en 2026
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 16, maxWidth: 720, margin: '0 auto' }}>
            {[
              { val: 'Cotisations', label: 'Soumise aux charges', sub: 'Comme le salaire' },
              { val: 'PAS', label: 'Imposable au PAS', sub: 'Taux personnalisé' },
              { val: 'Brut global', label: 'Intégrée au brut', sub: 'Assiette de cotisation' },
              { val: 'Ligne distincte', label: 'Affichage bulletin', sub: 'Code et libellé séparés' },
            ].map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '20px 16px' }}>
                <div style={{ fontSize: 22, fontWeight: 900 }}>{c.val}</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{c.label}</div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE HERO */}
      <div style={{ maxWidth: 900, margin: '-32px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&h=300&fit=crop&q=80"
          alt="Prime sur fiche de paie 2026"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Principes généraux */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Les primes et le salaire brut</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            En règle générale, toute <strong>prime versée par l'employeur est intégrée au salaire brut</strong> et soumise aux mêmes cotisations sociales (salariales et patronales) que le salaire de base. Elle est également imposable à l'impôt sur le revenu via le <strong>prélèvement à la source (PAS)</strong>.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151' }}>
            Cette règle générale comporte des exceptions notables — notamment pour la participation, l'intéressement et la Prime de Partage de la Valeur (PPV) — qui bénéficient de régimes sociaux et fiscaux allégés sous certaines conditions.
          </p>
        </section>

        {/* Tableau des types de primes */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 24, color: '#111827' }}>Types de primes et leur traitement social</h2>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#b45309', color: 'white' }}>
                  {['Type de prime', 'Base', 'Cotisations', 'IR (PAS)', 'Remarques'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { type: '13e mois', base: 'Conventionnelle ou contractuelle', cot: 'Oui', ir: 'Oui', rem: 'Versée en décembre ou fractionnée', current: false },
                  { type: 'Ancienneté', base: 'Légale ou conventionnelle', cot: 'Oui', ir: 'Oui', rem: 'Calculée sur salaire de base', current: false },
                  { type: 'Performance / objectifs', base: 'Contractuelle', cot: 'Oui', ir: 'Oui', rem: 'Montant variable, critères définis', current: false },
                  { type: 'Prime exceptionnelle', base: 'Décision employeur', cot: 'Oui', ir: 'Oui', rem: 'Ponctuelle, doit être justifiée', current: false },
                  { type: 'Participation', base: 'Légale (50+ salariés)', cot: 'Non (dans plafond)', ir: 'Non (si bloquée 5 ans)', rem: 'CSG/CRDS due', current: true },
                  { type: 'Intéressement', base: 'Accord collectif', cot: 'Non (dans plafond)', ir: 'Non (si affecté à PEE)', rem: 'CSG/CRDS due', current: true },
                  { type: 'PPV (ex-PEPA)', base: 'Décision unilatérale', cot: 'Non (sous conditions)', ir: 'Non (< 3 SMIC, dans plafond)', rem: 'Plafond 3 000 ou 6 000 €', current: true },
                ].map((row, i) => (
                  <tr key={i} style={{ background: row.current ? '#fef9c3' : i % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: row.current ? '#92400e' : '#111827' }}>{row.type}</td>
                    <td style={{ padding: '12px 16px', color: '#4b5563' }}>{row.base}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: row.cot === 'Non (dans plafond)' || row.cot === 'Non (sous conditions)' ? '#059669' : '#374151' }}>{row.cot}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: row.ir.startsWith('Non') ? '#059669' : '#374151' }}>{row.ir}</td>
                    <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: 13 }}>{row.rem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>Les lignes en jaune indiquent les dispositifs avec exonération de cotisations.</p>
        </section>

        {/* Focus participation / intéressement */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Focus : participation et intéressement</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            La <strong>participation</strong> et l'<strong>intéressement</strong> bénéficient d'un régime social très favorable : ils sont exonérés de cotisations salariales <em>et</em> patronales dans les plafonds légaux. Néanmoins, la <strong>CSG (9,2 %) et la CRDS (0,5 %)</strong> restent dues sur ces sommes.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#065f46', margin: '0 0 8px' }}>Participation légale</p>
              <p style={{ fontSize: 14, color: '#14532d', lineHeight: 1.65, margin: 0 }}>
                Obligatoire pour les entreprises de 50 salariés et plus. Calculée selon une formule légale. Bloquée 5 ans (sauf cas de déblocage anticipé). Exonération IR si les sommes restent bloquées dans un PEE ou PERCO.
              </p>
            </div>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#1e40af', margin: '0 0 8px' }}>Intéressement</p>
              <p style={{ fontSize: 14, color: '#1e3a8a', lineHeight: 1.65, margin: 0 }}>
                Facultatif, mis en place par accord. Plafonné à 20 % des salaires bruts. Exonéré de cotisations dans la limite de 3/4 du PASS (32 994 € en 2026). Exonéré d'IR si affecté à un PEE ou PERCO.
              </p>
            </div>
          </div>
        </section>

        {/* Affichage sur le bulletin */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Comment une prime s'affiche sur le bulletin</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Chaque prime doit apparaître sur une <strong>ligne distincte</strong> dans la rubrique des rémunérations brutes, avec un libellé clair (ex : "Prime de 13e mois", "Prime sur objectifs 2026") et son montant. Elle s'additionne au salaire de base pour constituer le <strong>brut global soumis aux cotisations</strong>.
          </p>
          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { label: 'Salaire de base', val: '2 500,00 €', type: 'base' },
              { label: '+ Prime de 13e mois (1/12e mensuel)', val: '+ 208,33 €', type: 'add' },
              { label: '+ Prime sur objectifs T4 2025', val: '+ 500,00 €', type: 'add' },
              { label: '= Salaire brut total (assiette cotisations)', val: '3 208,33 €', type: 'result' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderBottom: '1px solid #fed7aa', background: row.type === 'result' ? '#fef3c7' : row.type === 'base' ? '#fff7ed' : 'white' }}>
                <span style={{ fontSize: 14, color: row.type === 'add' ? '#b45309' : '#0f172a', fontWeight: row.type === 'result' || row.type === 'base' ? 700 : 400 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.type === 'add' ? '#b45309' : '#92400e', fontFamily: 'monospace' }}>{row.val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>Chaque ligne de prime possède un code type (ex : 1100 pour le 13e mois) selon la convention collective ou le plan de paie de l'entreprise.</p>
        </section>

        {/* PPV 2026 */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Prime de Partage de la Valeur (PPV) 2026</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            La <strong>Prime de Partage de la Valeur</strong> peut être versée à tous les salariés, sans condition d'ancienneté. En 2026, les conditions d'exonération sont les suivantes :
          </p>
          <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { ico: '✓', label: 'Bénéficiaires', val: 'Tous les salariés liés par un contrat de travail' },
                { ico: '✓', label: 'Plafond d\'exonération', val: '3 000 € (ou 6 000 € avec accord intéressement/participation)' },
                { ico: '✓', label: 'Condition salariale', val: 'Rémunération inférieure à 3 fois le SMIC annuel pour exonération IR' },
                { ico: '✓', label: 'CSG/CRDS', val: 'Toujours dues (9,7 % du montant)' },
                { ico: '✓', label: 'Au-delà du plafond', val: 'Soumis aux cotisations sociales et à l\'IR comme une prime ordinaire' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: '#059669', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{row.ico}</span>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#92400e' }}>{row.label} : </span>
                    <span style={{ fontSize: 14, color: '#78350f' }}>{row.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes sur les primes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#b45309', fontSize: 20, lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <p style={{ padding: '16px 20px', fontSize: 15, lineHeight: 1.8, color: '#4b5563', margin: 0 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

      </div>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0c4a6e, #0369a1)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Générez un bulletin avec prime en 30 secondes</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Ajoutez vos primes directement dans notre générateur : cotisations calculées automatiquement, bulletin conforme.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Créer mon bulletin de paie →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
