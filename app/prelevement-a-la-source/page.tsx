import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Prélèvement à la source 2026 : taux, calcul sur fiche de paie — Bulletin Facile',
  description: 'Prélèvement à la source (PAS) 2026 : taux personnalisé, taux neutre, taux individualisé. Comment le PAS apparaît sur le bulletin de salaire. Calcul et exemples.',
  alternates: { canonical: 'https://bulletinfacile.fr/prelevement-a-la-source' },
};

const FAQ = [
  {
    q: 'Où trouver son taux PAS personnalisé ?',
    a: "Le taux personnalisé est consultable directement sur votre espace particulier sur impots.gouv.fr, rubrique « Gérer mon prélèvement à la source ». Il est mis à jour automatiquement après chaque déclaration de revenus et peut être modifié à tout moment en cours d'année si votre situation change (mariage, naissance, perte d'emploi, variation de revenus).",
  },
  {
    q: "Que se passe-t-il si je ne communique pas mon taux à mon employeur ?",
    a: "Si vous ne transmettez pas votre taux personnalisé (ou si vous arrivez d'une première embauche sans taux encore calculé), l'employeur applique le taux neutre correspondant à votre rémunération mensuelle selon le barème légal. Ce taux ne tient pas compte de votre situation familiale. Si le taux neutre est inférieur à votre taux personnalisé, vous devrez régulariser la différence directement auprès du fisc.",
  },
  {
    q: "Le PAS est-il calculé sur le net avant ou après cotisations ?",
    a: "Le prélèvement à la source est calculé sur le net imposable, c'est-à-dire le revenu net après déduction des cotisations salariales, en tenant compte de la déduction de 1,75 % pour frais professionnels. Ce montant est appelé « net avant impôt » (NAI) sur le bulletin de salaire. La formule est : PAS = NAI × taux applicable.",
  },
  {
    q: "Peut-on moduler son taux PAS ?",
    a: "Oui. Via impots.gouv.fr, vous pouvez demander une modulation à la hausse (pour anticiper une augmentation de revenus) ou à la baisse (si vos revenus diminuent de plus de 10 % et 200 € par rapport à l'année précédente). La modulation prend effet dans les 1 à 3 mois suivant la demande. Une erreur de modulation entraîne des intérêts de retard.",
  },
];

const TAUX_NEUTRE = [
  { min: '0 €', max: '1 591 €', taux: '0,0 %' },
  { min: '1 591 €', max: '1 653 €', taux: '0,5 %' },
  { min: '1 653 €', max: '1 759 €', taux: '1,3 %' },
  { min: '1 759 €', max: '1 902 €', taux: '2,1 %' },
  { min: '1 902 €', max: '2 119 €', taux: '2,9 %' },
  { min: '2 119 €', max: '2 581 €', taux: '3,5 %' },
  { min: '2 581 €', max: '3 070 €', taux: '4,1 %' },
  { min: '3 070 €', max: '3 583 €', taux: '5,3 %' },
  { min: '3 583 €', max: '4 270 €', taux: '7,5 %' },
  { min: '4 270 €', max: '5 346 €', taux: '9,9 %' },
  { min: '5 346 €', max: '6 911 €', taux: '11,9 %' },
  { min: '6 911 €', max: '10 086 €', taux: '15,8 %' },
  { min: '10 086 €', max: '14 253 €', taux: '19,0 %' },
  { min: '14 253 €', max: '22 042 €', taux: '24,4 %' },
  { min: '22 042 €', max: '46 150 €', taux: '30,7 %' },
  { min: '46 150 €', max: '—', taux: '43,0 %' },
];

export default function PrelevementAlaSourcePage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>
      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 55%, #4f46e5 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Barème officiel — 2026
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
            Prélèvement à la source sur la fiche de paie
          </h1>
          <p style={{ fontSize: 20, opacity: 0.9, marginBottom: 40, lineHeight: 1.6 }}>
            Taux personnalisé, taux neutre, taux individualisé : tout comprendre sur le PAS 2026 et son calcul sur le bulletin de salaire.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, maxWidth: 640, margin: '0 auto' }}>
            {[
              { val: '2019', label: 'Entrée en vigueur', sub: 'Collecté par l\'employeur' },
              { val: '3 types', label: 'de taux possibles', sub: 'Personnalisé, neutre, individualisé' },
              { val: '0 % → 43 %', label: 'Barème 2026', sub: 'Taux neutre' },
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
          src="https://images.unsplash.com/photo-1554224154-26032ffc0d8b?w=900&h=300&fit=crop&q=80"
          alt="Calculatrice et documents fiscaux prélèvement à la source"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Qu'est-ce que le PAS */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Qu'est-ce que le prélèvement à la source ?</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Entré en vigueur le 1er janvier 2019, le <strong>prélèvement à la source (PAS)</strong> est le mode de collecte de l'impôt sur le revenu en temps réel. L'impôt est déduit directement du salaire au moment de son versement, sans décalage d'un an.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            C'est <strong>l'employeur qui collecte le PAS</strong> et le reverse à la Direction générale des Finances publiques (DGFiP) via la Déclaration sociale nominative (DSN). L'employeur ne connaît pas la situation fiscale complète du salarié : il ne reçoit qu'un taux de prélèvement de la part de l'administration fiscale.
          </p>
          <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 12, padding: '20px 24px' }}>
            <p style={{ margin: 0, fontSize: 15, color: '#3730a3', lineHeight: 1.7 }}>
              <strong>A retenir :</strong> le PAS n'est pas une cotisation sociale. Il n'est pas déductible des cotisations et n'apparaît pas dans le calcul du brut vers le net imposable. Il est prélevé sur le net imposable et figure sur une ligne distincte du bulletin.
            </p>
          </div>
        </section>

        {/* Les 3 types de taux */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 24, color: '#111827' }}>Les 3 types de taux PAS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                ),
                titre: 'Taux personnalisé',
                badge: 'Par défaut',
                badgeColor: '#4f46e5',
                desc: 'Calculé par la DGFiP à partir de votre dernière déclaration de revenus. Tient compte de votre foyer fiscal complet (revenus des deux conjoints, charges de famille). Communiqué automatiquement à votre employeur.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6M12 9v6"/></svg>
                ),
                titre: 'Taux neutre',
                badge: 'Par défaut si pas de taux',
                badgeColor: '#059669',
                desc: "Appliqué par l'employeur lorsque l'administration n'a pas communiqué de taux (nouveaux arrivants, premier emploi) ou lorsque le salarié refuse de communiquer son taux. Basé sur un barème légal, sans prise en compte de la situation familiale.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                ),
                titre: 'Taux individualisé',
                badge: 'Pour les couples',
                badgeColor: '#d97706',
                desc: "Option pour les couples dont les revenus sont très inégaux. Permet d'appliquer un taux différent à chaque conjoint, correspondant à sa propre part de revenu. Évite que le conjoint aux revenus faibles soit prélevé au taux commun (plus élevé).",
              },
            ].map((card, i) => (
              <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  {card.icon}
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#111827' }}>{card.titre}</h3>
                </div>
                <div style={{ display: 'inline-block', background: card.badgeColor, color: 'white', fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 20, marginBottom: 12 }}>{card.badge}</div>
                <p style={{ fontSize: 14, color: '#4b5563', margin: 0, lineHeight: 1.7 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Barème taux neutre */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 8, color: '#111827' }}>Barème du taux neutre 2026</h2>
          <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 24 }}>Applicable aux salariés n'ayant pas communiqué de taux personnalisé — base mensuelle nette imposable</p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#3730a3', color: 'white' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Base mensuelle (net imposable)</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700 }}>Taux applicable</th>
                </tr>
              </thead>
              <tbody>
                {TAUX_NEUTRE.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f5f3ff', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '11px 16px', color: '#374151' }}>
                      {row.max === '—' ? `Plus de ${row.min}` : `De ${row.min} à ${row.max}`}
                    </td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', fontWeight: 700, color: row.taux === '0,0 %' ? '#059669' : row.taux >= '30' ? '#dc2626' : '#111827' }}>
                      {row.taux}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>Source : DGFiP — Barème applicable aux revenus perçus à compter du 1er janvier 2026.</p>
        </section>

        {/* Calcul du PAS */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Comment le PAS est calculé sur le bulletin</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 24 }}>
            Le prélèvement à la source est toujours calculé sur le <strong>net imposable</strong>, c'est-à-dire après déduction de toutes les cotisations salariales et de l'abattement de 1,75 % pour frais professionnels (plafonné à 12 829 €/an).
          </p>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
            {[
              { label: 'Salaire brut', val: '2 500,00 €', type: 'base' },
              { label: '— Cotisations salariales', val: '− 515,00 €', type: 'deduct' },
              { label: '= Net imposable (avant PAS)', val: '= 1 985,00 €', type: 'mid' },
              { label: '— PAS (ex. : taux 8,5 %)', val: '− 168,73 €', type: 'deduct' },
              { label: '= Net à payer', val: '= 1 816,27 €', type: 'result' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', borderBottom: i < 4 ? '1px solid #d1fae5' : 'none', background: row.type === 'result' ? '#dcfce7' : row.type === 'base' ? '#bbf7d0' : row.type === 'mid' ? '#f0fdf4' : 'transparent' }}>
                <span style={{ fontSize: 14, color: row.type === 'deduct' ? '#dc2626' : '#065f46', fontWeight: row.type === 'result' || row.type === 'base' ? 700 : 400 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.type === 'deduct' ? '#dc2626' : '#065f46' }}>{row.val}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 10, padding: '14px 20px' }}>
            <p style={{ margin: 0, fontSize: 14, color: '#3730a3' }}>
              <strong>Formule :</strong> PAS = Net imposable × Taux PAS applicable. Le taux est arrondi au dixième de pourcent par la DGFiP.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes sur le PAS</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q} <span style={{ color: '#3730a3', fontSize: 20, lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <p style={{ padding: '16px 20px', fontSize: 15, lineHeight: 1.8, color: '#4b5563', margin: 0 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

      </div>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #1e1b4b, #3730a3)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Simulez votre fiche de paie avec le bon taux PAS</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Notre générateur applique automatiquement le taux que vous renseignez et calcule le net à payer en temps réel.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Générer mon bulletin →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
