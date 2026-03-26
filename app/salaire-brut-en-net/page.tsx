import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Salaire Brut en Net 2026 : Convertisseur & Calcul — Bulletin Facile',
  description: 'Convertissez votre salaire brut en net en 2026. Formule, taux de charges, calcul des cotisations URSSAF. Utilisez notre simulateur gratuit pour obtenir votre net exact.',
  alternates: { canonical: 'https://bulletinfacile.fr/salaire-brut-en-net' },
};

const EXEMPLES = [
  { brut: '1 801,80 €', net: '≈ 1 426 €', label: 'SMIC 2026', coef: '79,1 %' },
  { brut: '2 000 €',    net: '≈ 1 582 €', label: 'Employé débutant', coef: '79,1 %' },
  { brut: '2 500 €',    net: '≈ 1 977 €', label: 'Technicien', coef: '79,1 %' },
  { brut: '3 000 €',    net: '≈ 2 360 €', label: 'Cadre junior', coef: '78,7 %' },
  { brut: '4 000 €',    net: '≈ 3 120 €', label: 'Cadre confirmé', coef: '78,0 %' },
  { brut: '5 000 €',    net: '≈ 3 875 €', label: 'Cadre supérieur', coef: '77,5 %' },
];

export default function SalaireBrutEnNetPage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#1a1a2e' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid #e5e7eb', zIndex: 50, backdropFilter: 'blur(8px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontWeight: 900, fontSize: 20, color: '#1e40af', textDecoration: 'none' }}>Bulletin Facile</Link>
          <Link href="/generateur" style={{ background: '#1d4ed8', color: 'white', fontWeight: 700, fontSize: 13, padding: '8px 18px', borderRadius: 8, textDecoration: 'none' }}>Calculer mon net →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0284c7 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            🧮 Calcul instantané · Taux 2026 officiel
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
            Salaire Brut en Net 2026
          </h1>
          <p style={{ fontSize: 19, opacity: 0.88, lineHeight: 1.7, marginBottom: 8, maxWidth: 600, margin: '0 auto 12px' }}>
            Formule, taux de charges salariales et exemples pour tous les niveaux de salaire.
          </p>
          <p style={{ fontSize: 24, fontWeight: 800, color: '#fde68a', marginBottom: 36 }}>
            Net ≈ Brut × 79 %
          </p>
          <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#1a1a2e', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
            Calculer mon salaire exact →
          </Link>
        </div>
      </section>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* FORMULE */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20 }}>La formule brut → net</h2>
          <div style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: 14, padding: '28px 32px', textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#1d4ed8', fontFamily: 'monospace' }}>
              Net = Brut × (1 − taux de charges salariales)
            </div>
            <div style={{ fontSize: 18, color: '#3b82f6', marginTop: 12, fontWeight: 700 }}>
              En pratique : Net ≈ Brut × 0,79 (non-cadre) ou × 0,78 (cadre)
            </div>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151' }}>
            Cette formule est une approximation utile. Le taux exact varie selon votre statut (cadre / non-cadre), votre convention collective, votre mutuelle et votre taux de prélèvement à la source. Pour un calcul exact, utilisez notre générateur qui applique tous les taux officiels URSSAF 2026.
          </p>
        </section>

        {/* TABLEAU D'EXEMPLES */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 24 }}>Exemples de conversion brut → net en 2026</h2>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#0369a1', color: 'white' }}>
                  {['Profil', 'Salaire BRUT', 'Salaire NET estimé', 'Coefficient net/brut'].map(h => (
                    <th key={h} style={{ padding: '12px 18px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EXEMPLES.map((ex, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f0f9ff', borderBottom: '1px solid #e0f2fe' }}>
                    <td style={{ padding: '12px 18px', fontWeight: 600 }}>{ex.label}</td>
                    <td style={{ padding: '12px 18px', fontWeight: 700, color: '#0369a1' }}>{ex.brut}</td>
                    <td style={{ padding: '12px 18px', fontWeight: 800, color: '#059669' }}>{ex.net}</td>
                    <td style={{ padding: '12px 18px', color: '#6b7280' }}>{ex.coef}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>* Estimations hors PAS. Non-cadres sauf mention cadre. Mutuelle non incluse.</p>
        </section>

        {/* TAUX DE CHARGES */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 24 }}>Détail des cotisations salariales 2026</h2>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
            {[
              { rubrique: 'Vieillesse plafonnée', taux: '6,90 %', base: 'Jusqu\'au PMSS (4 005 €)' },
              { rubrique: 'Vieillesse déplafonnée', taux: '0,40 %', base: 'Totalité du salaire brut' },
              { rubrique: 'AGIRC-ARRCO T1', taux: '3,15 %', base: 'Jusqu\'au PMSS' },
              { rubrique: 'AGIRC-ARRCO T2 (cadres)', taux: '8,64 %', base: 'De 1 à 8× PMSS' },
              { rubrique: 'CEG T1', taux: '0,86 %', base: 'Jusqu\'à 7× PMSS' },
              { rubrique: 'CET (cadres)', taux: '0,14 %', base: 'Totalité du brut' },
              { rubrique: 'CSG déductible', taux: '6,80 %', base: '98,25 % du brut' },
              { rubrique: 'CSG/CRDS non déductible', taux: '2,90 %', base: '98,25 % du brut' },
              { rubrique: 'APEC (cadres)', taux: '0,024 %', base: 'Jusqu\'à 4× PMSS' },
              { rubrique: 'Maladie salariale', taux: '0 %', base: 'Exonération depuis 2018' },
              { rubrique: 'Assurance chômage', taux: '0 %', base: 'Exonération maintenue 2026' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', padding: '12px 20px', borderBottom: '1px solid #f3f4f6', background: i % 2 === 0 ? '#fff' : '#f9fafb', fontSize: 14 }}>
                <span style={{ color: '#374151', fontWeight: 500 }}>{row.rubrique}</span>
                <span style={{ fontWeight: 800, color: '#0369a1' }}>{row.taux}</span>
                <span style={{ color: '#6b7280' }}>{row.base}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA ENCADRÉ */}
        <div style={{ background: 'linear-gradient(135deg, #0c4a6e, #0369a1)', borderRadius: 16, padding: '40px 32px', color: 'white', textAlign: 'center' }}>
          <h3 style={{ fontSize: 26, fontWeight: 900, marginBottom: 12 }}>Calculez votre net exact, pas une estimation</h3>
          <p style={{ opacity: 0.85, marginBottom: 28, fontSize: 16 }}>Notre générateur applique tous les taux URSSAF 2026 à votre situation précise : statut, effectif, convention, PAS.</p>
          <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#1a1a2e', fontWeight: 800, fontSize: 16, padding: '13px 32px', borderRadius: 10, textDecoration: 'none' }}>
            Calculer mon salaire net →
          </Link>
        </div>
      </div>

      <footer style={{ background: '#111827', color: '#9ca3af', padding: '40px 24px', textAlign: 'center', fontSize: 13 }}>
        <p>© {new Date().getFullYear()} <span style={{ color: 'white', fontWeight: 700 }}>Bulletin Facile</span> · Conformité URSSAF 2025/2026</p>
      </footer>
    </div>
  );
}
