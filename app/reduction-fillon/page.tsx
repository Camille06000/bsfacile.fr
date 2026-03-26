import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Réduction Fillon 2026 : calcul, coefficient et montant — Bulletin Facile',
  description: 'Réduction Fillon 2026 (allègement général de cotisations patronales) : formule de calcul, coefficient, PMSS et SMIC. Exemple chiffré pour un salaire au SMIC.',
  alternates: { canonical: 'https://bulletinfacile.fr/reduction-fillon' },
};

const FAQ = [
  {
    q: 'La réduction Fillon est-elle cumulable avec d\'autres aides ?',
    a: 'La réduction Fillon est cumulable avec certaines exonérations spécifiques (zones franches urbaines, aide à domicile, etc.) sous réserve que le total des exonérations ne dépasse pas le montant des cotisations dues. En revanche, elle ne se cumule pas avec la déduction forfaitaire de cotisations patronales pour les heures supplémentaires sur la part concernée.',
  },
  {
    q: 'La réduction Fillon s\'applique-t-elle aux apprentis ?',
    a: 'Non. Les apprentis bénéficient d\'un régime d\'exonération spécifique plus favorable. La réduction Fillon ne s\'applique pas aux contrats d\'apprentissage. De même, elle ne s\'applique pas aux salariés dont la rémunération dépasse 1,6 × SMIC annuel (soit plus de 28 829 € en 2026).',
  },
  {
    q: 'Comment déclarer la réduction Fillon en DSN ?',
    a: 'La réduction Fillon doit être déclarée en DSN mensuelle via le bloc S21.G00.81 (cotisation agrégée) avec le code type de cotisation correspondant à l\'allègement général. La réduction est calculée mois par mois et régularisée en fin d\'année. Bulletin Facile génère automatiquement les données nécessaires à la DSN.',
  },
  {
    q: 'Est-elle calculée automatiquement dans Bulletin Facile ?',
    a: 'Oui. Bulletin Facile calcule automatiquement la réduction Fillon dès lors que le salaire brut saisi est inférieur à 1,6 × SMIC (28 829 € annuels). Le coefficient est appliqué selon que l\'entreprise compte moins ou plus de 50 salariés. Le montant de la réduction apparaît clairement sur le bulletin généré.',
  },
];

export default function ReductionFillonPage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>

      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Mise à jour 2026 — Allègement général
          </div>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 60px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
            Réduction Fillon 2026
          </h1>
          <p style={{ fontSize: 21, opacity: 0.9, marginBottom: 40 }}>
            Calcul du coefficient, formule officielle et exemples chiffrés
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, maxWidth: 720, margin: '0 auto' }}>
            {[
              { val: '0,3205', label: 'Coefficient max', sub: '< 50 salariés' },
              { val: '0,3245', label: 'Coefficient max', sub: '>= 50 salariés' },
              { val: '577,68 €', label: 'Réduction au SMIC', sub: 'Par mois' },
              { val: '28 829 €', label: 'Seuil d\'éligibilité', sub: 'Brut annuel 2026' },
            ].map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '20px 16px' }}>
                <div style={{ fontSize: 24, fontWeight: 900 }}>{c.val}</div>
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
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&h=300&fit=crop&q=80"
          alt="Documents de paie et réduction Fillon"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Qu'est-ce que la réduction Fillon */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Qu'est-ce que la réduction Fillon ?</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            La <strong>réduction Fillon</strong>, officiellement appelée <strong>allègement général de cotisations patronales</strong>, est un mécanisme permettant aux employeurs de réduire significativement les charges sociales patronales sur les bas salaires. Elle a été instaurée en 2003 et renforcée depuis.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Elle s'applique à <strong>tous les employeurs du secteur privé</strong> assujettis à l'assurance chômage, dès lors que le salaire brut annuel du salarié est inférieur à <strong>1,6 fois le SMIC annuel</strong>, soit moins de <strong>28 829 € en 2026</strong>.
          </p>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="12" cy="12" r="10" stroke="#1e40af" strokeWidth="2"/>
                <path d="M12 8v4m0 4h.01" stroke="#1e40af" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div>
                <p style={{ fontSize: 15, color: '#1e40af', fontWeight: 700, margin: '0 0 6px' }}>Qui est concerné ?</p>
                <p style={{ fontSize: 14, color: '#1e3a8a', lineHeight: 1.7, margin: 0 }}>
                  Tous les employeurs privés peuvent bénéficier de cet allègement. Sont exclus : les particuliers employeurs, les employeurs relevant de régimes spéciaux, et les salariés dont la rémunération dépasse 1,6 × SMIC.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Formule de calcul */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Formule de calcul officielle 2026</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 24 }}>
            La réduction Fillon se calcule en deux étapes : d'abord on détermine le <strong>coefficient</strong>, puis on l'applique à la rémunération brute mensuelle.
          </p>

          <div style={{ background: '#f8fafc', border: '2px solid #1e40af', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1e40af', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Formule du coefficient</p>
            <p style={{ fontFamily: 'monospace', fontSize: 16, color: '#0f172a', background: '#e0e7ff', padding: '12px 16px', borderRadius: 8, margin: '0 0 16px' }}>
              Coefficient = (T / 0,6) × [1,6 × (SMIC annuel / Rémunération annuelle brute) − 1]
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: '14px 16px' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#374151', margin: '0 0 4px' }}>Entreprise &lt; 50 salariés</p>
                <p style={{ fontSize: 20, fontWeight: 900, color: '#1e40af', margin: 0 }}>T = 0,3205</p>
              </div>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: '14px 16px' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#374151', margin: '0 0 4px' }}>Entreprise &gt;= 50 salariés</p>
                <p style={{ fontSize: 20, fontWeight: 900, color: '#1e40af', margin: 0 }}>T = 0,3245</p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 12, marginBottom: 0 }}>
              Le coefficient est plafonné à T (valeur max) et ne peut être négatif (min = 0). La réduction mensuelle = Rémunération brute mensuelle × Coefficient.
            </p>
          </div>
        </section>

        {/* Exemple au SMIC */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Exemple de calcul au SMIC (1 801,80 €/mois)</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 24 }}>
            Pour un salarié rémunéré au SMIC dans une entreprise de moins de 50 salariés, le calcul est le suivant :
          </p>
          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { label: 'Rémunération annuelle brute', val: '1 801,80 × 12 = 21 621,60 €', type: 'base' },
              { label: 'SMIC annuel 2026', val: '21 621,60 €', type: 'neutral' },
              { label: 'Ratio SMIC / Rémunération', val: '21 621,60 / 21 621,60 = 1,0000', type: 'neutral' },
              { label: 'Calcul du coefficient', val: '(0,3205 / 0,6) × [1,6 × 1,0 − 1] = 0,3205', type: 'neutral' },
              { label: 'Coefficient retenu (= maximum T)', val: '0,3205', type: 'highlight' },
              { label: 'Réduction mensuelle', val: '1 801,80 × 0,3205 = 577,68 €', type: 'result' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderBottom: '1px solid #e0f2fe', background: row.type === 'result' ? '#0369a1' : row.type === 'highlight' ? '#e0f2fe' : row.type === 'base' ? '#f0f9ff' : 'white' }}>
                <span style={{ fontSize: 14, color: row.type === 'result' ? 'white' : '#0f172a', fontWeight: row.type === 'result' || row.type === 'highlight' ? 700 : 400 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.type === 'result' ? 'white' : '#0369a1', fontFamily: 'monospace' }}>{row.val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tableau par niveau de salaire */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 24, color: '#111827' }}>Tableau : réduction selon le salaire brut</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Plus le salaire s'éloigne du SMIC, plus le coefficient diminue. La réduction devient nulle au-delà de 1,6 × SMIC (environ 3 612 € brut/mois en 2026).
          </p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#1e40af', color: 'white' }}>
                  {['Salaire brut mensuel', 'Coefficient', 'Réduction mensuelle', 'Économie annuelle'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { sal: '1 801,80 € (SMIC)', coef: '0,3205', red: '577,68 €', ann: '6 932 €', current: true },
                  { sal: '2 000 €', coef: '0,2780', red: '556,00 €', ann: '6 672 €', current: false },
                  { sal: '2 500 €', coef: '0,1990', red: '497,50 €', ann: '5 970 €', current: false },
                  { sal: '3 000 €', coef: '0,1200', red: '360,00 €', ann: '4 320 €', current: false },
                  { sal: '3 500 €', coef: '0,0410', red: '143,50 €', ann: '1 722 €', current: false },
                  { sal: '> 3 612 €', coef: '0,0000', red: '0 €', ann: '0 €', current: false },
                ].map((row, i) => (
                  <tr key={i} style={{ background: row.current ? '#eff6ff' : i % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', fontWeight: row.current ? 800 : 500, color: row.current ? '#1e40af' : '#111827' }}>{row.sal}</td>
                    <td style={{ padding: '12px 16px', fontWeight: row.current ? 700 : 400, color: row.coef === '0,0000' ? '#9ca3af' : '#111827' }}>{row.coef}</td>
                    <td style={{ padding: '12px 16px', fontWeight: row.current ? 700 : 400, color: row.red === '0 €' ? '#9ca3af' : '#059669' }}>{row.red}</td>
                    <td style={{ padding: '12px 16px', color: row.ann === '0 €' ? '#9ca3af' : '#374151' }}>{row.ann}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>Calculs réalisés pour une entreprise de moins de 50 salariés (T = 0,3205). Pour ≥ 50 salariés, multiplier par 0,3245.</p>
        </section>

        {/* Impact concret */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Impact concret pour l'employeur</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 24 }}>
            La réduction Fillon réduit directement le <strong>coût employeur</strong> d'un salarié au bas de l'échelle salariale. Pour un salarié au SMIC, l'économie annuelle est d'environ <strong>6 932 €</strong>, ce qui représente une réduction de l'ordre de 32 % des cotisations patronales.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              {
                icon: (
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="#1e40af"/>
                  </svg>
                ),
                title: 'Embauche facilitée au SMIC',
                desc: 'Le coût total employeur d\'un salarié au SMIC passe d\'environ 2 197 € à 1 619 € grâce à la réduction, soit un gain de 26 % sur le coût total.',
              },
              {
                icon: (
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#1e40af" strokeWidth="2"/>
                    <path d="M8 12h8M8 8h8M8 16h4" stroke="#1e40af" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Dégressive selon le salaire',
                desc: 'Plus le salaire augmente, plus la réduction diminue. Elle incite à maintenir les rémunérations proches du SMIC, ce qui peut freiner les augmentations ("trappe à bas salaires").',
              },
              {
                icon: (
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: 'Application automatique',
                desc: 'L\'employeur applique lui-même la réduction sur chaque bulletin de paie, sans demande préalable auprès de l\'URSSAF. La déclaration se fait en DSN mensuelle.',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, padding: '24px 20px' }}>
                <div style={{ marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6b7280', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes sur la réduction Fillon</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#1e40af', fontSize: 20, lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <p style={{ padding: '16px 20px', fontSize: 15, lineHeight: 1.8, color: '#4b5563', margin: 0 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

      </div>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0c4a6e, #0369a1)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Calculez la réduction Fillon sur votre bulletin</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Bulletin Facile applique automatiquement l'allègement général et génère le bulletin complet conforme.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Générer mon bulletin de paie →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
