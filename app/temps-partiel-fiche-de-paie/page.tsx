import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Temps partiel sur fiche de paie 2026 : calcul, droits, heures complémentaires — Bulletin Facile',
  description: 'Bulletin de salaire temps partiel 2026 : calcul du prorata SMIC, heures complémentaires (10% et 1/3), cotisations, congés payés. Guide pratique avec exemples.',
  alternates: { canonical: 'https://bulletinfacile.fr/temps-partiel-fiche-de-paie' },
};

const FAQ = [
  {
    q: 'Le salarié à temps partiel a-t-il les mêmes droits que le temps plein ?',
    a: 'Oui, le principe d\'égalité de traitement s\'applique. Un salarié à temps partiel bénéficie des mêmes droits que le temps plein : accès à la formation professionnelle, mutuelle d\'entreprise, participation, intéressement, congés payés (proratisés), élections professionnelles. La seule différence réside dans le prorata temporis qui s\'applique à certains éléments quantitatifs (salaire, congés, RTT).',
  },
  {
    q: 'Peut-on imposer le temps partiel à un salarié ?',
    a: 'Non. Le passage du temps plein au temps partiel nécessite l\'accord exprès du salarié. C\'est une modification du contrat de travail. Le salarié peut refuser sans que cela constitue une faute. En revanche, l\'employeur peut proposer un temps partiel lors de l\'embauche — le contrat doit alors préciser la durée hebdomadaire ou mensuelle, la répartition des horaires et les conditions de modification.',
  },
  {
    q: 'Quelle est la durée minimale de travail à temps partiel ?',
    a: 'La durée minimale légale est de 24 heures par semaine (ou l\'équivalent mensuel de 104 heures). Des exceptions existent : salarié qui en fait la demande pour convenances personnelles, certains secteurs (particuliers employeurs, associations, etc.) couverts par un accord de branche. En dessous de 24h, le contrat est présumé illégal sauf dérogation écrite et justifiée.',
  },
  {
    q: 'Les heures complémentaires sont-elles obligatoires pour le salarié ?',
    a: 'Le salarié est tenu d\'effectuer les heures complémentaires si elles lui sont demandées dans le respect des délais de prévenance (3 jours ouvrés en principe) et dans la limite prévue au contrat ou par accord collectif. Il peut refuser si elles dépassent le plafond légal (1/10e ou 1/3 du contrat), si la demande ne respecte pas le délai de prévenance, ou si elles portent sa durée totale à plus de 35 heures.',
  },
];

export default function TempsPartielFicheDePayePage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>

      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 55%, #3730a3 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Droit social 2026 — Temps partiel
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
            Temps partiel sur la fiche de paie
          </h1>
          <p style={{ fontSize: 20, opacity: 0.9, marginBottom: 40 }}>
            Calcul du salaire, heures complémentaires, droits identiques : guide 2026
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 16, maxWidth: 720, margin: '0 auto' }}>
            {[
              { val: 'Prorata SMIC', label: 'Salaire minimum', sub: 'Calculé au prorata des heures' },
              { val: '≤ 24h/sem', label: 'Durée minimale légale', sub: 'Sauf dérogation' },
              { val: '+10 %', label: 'Majoration h. compl.', sub: 'Dès la 1re heure' },
              { val: 'Mêmes droits', label: 'Droits sociaux', sub: 'CP, mutuelle, retraite' },
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
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&h=300&fit=crop&q=80"
          alt="Temps partiel fiche de paie 2026"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Calcul du salaire minimum */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Calcul du salaire minimum à temps partiel</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Le salarié à temps partiel doit percevoir au minimum un salaire proportionnel au SMIC, calculé en fonction de ses heures contractuelles. La formule est simple :
          </p>
          <div style={{ background: '#ede9fe', border: '2px solid #7c3aed', borderRadius: 12, padding: '24px 28px', marginBottom: 20, textAlign: 'center' }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#4c1d95', marginBottom: 8 }}>Salaire minimum mensuel temps partiel</p>
            <p style={{ fontSize: 22, fontWeight: 900, color: '#3730a3', margin: 0, fontFamily: 'monospace' }}>
              SMIC × (heures contractuelles ÷ 151,67)
            </p>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            <strong>Exemple concret :</strong> un salarié dont le contrat prévoit 24 heures par semaine (104,33 heures/mois) :
          </p>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { label: 'SMIC brut mensuel 2026 (151,67h)', val: '1 801,80 €', type: 'base' },
              { label: 'Heures contractuelles / mois', val: '24h × 52 sem ÷ 12 = 104,33 h', type: 'neutral' },
              { label: 'Calcul du prorata', val: '1 801,80 × (104,33 ÷ 151,67)', type: 'neutral' },
              { label: 'Salaire minimum brut mensuel', val: '1 239,26 €', type: 'result' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderBottom: '1px solid #e2e8f0', background: row.type === 'result' ? '#ede9fe' : row.type === 'base' ? '#f5f3ff' : 'white' }}>
                <span style={{ fontSize: 14, color: '#0f172a', fontWeight: row.type === 'result' || row.type === 'base' ? 700 : 400 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.type === 'result' ? '#3730a3' : '#374151', fontFamily: 'monospace' }}>{row.val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>* Le taux horaire minimum est le même qu'à temps plein : 11,88 €/h brut.</p>
        </section>

        {/* Heures complémentaires */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Les heures complémentaires</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Les <strong>heures complémentaires</strong> sont les heures effectuées au-delà de la durée contractuelle, sans dépasser la durée légale de 35 heures hebdomadaires. Elles sont encadrées par des plafonds et majorées obligatoirement.
          </p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb', marginBottom: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#3730a3', color: 'white' }}>
                  {['Tranche d\'heures complémentaires', 'Plafond', 'Majoration', 'Conditions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: '#f5f3ff', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#3730a3' }}>Jusqu'au 1/10e du contrat</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>Limite légale de base</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#059669' }}>+ 10 %</td>
                  <td style={{ padding: '12px 16px', color: '#6b7280' }}>Obligatoire, dès la 1re heure</td>
                </tr>
                <tr style={{ background: '#ede9fe', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#3730a3' }}>Au-delà du 1/10e (jusqu'au 1/3)</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>Si accord de branche ou d'entreprise</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#d97706' }}>+ 25 %</td>
                  <td style={{ padding: '12px 16px', color: '#6b7280' }}>Accord collectif requis</td>
                </tr>
                <tr style={{ background: '#fff' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#dc2626' }}>Au-delà du 1/3 du contrat</td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>Interdit</td>
                  <td style={{ padding: '12px 16px', color: '#dc2626' }}>—</td>
                  <td style={{ padding: '12px 16px', color: '#6b7280' }}>Requalification possible en temps plein</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 10, padding: '16px 20px' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#92400e', margin: '0 0 4px' }}>Exemple pour un contrat de 24h/sem (104,33h/mois)</p>
            <p style={{ fontSize: 14, color: '#78350f', lineHeight: 1.7, margin: 0 }}>
              Plafond 1/10e : 104,33 × 10 % = 10,43 h/mois majorées à 10 %. Si accord collectif : jusqu'à 104,33 ÷ 3 = 34,78 h/mois supplémentaires, majorées à 25 %.
            </p>
          </div>
        </section>

        {/* Cotisations patronales */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Cotisations patronales : la majoration maladie</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Pour les salariés à temps partiel dont la rémunération est inférieure à 1,6 fois le SMIC mensuel proratisé, l'employeur bénéficie de la <strong>réduction générale des cotisations patronales (Fillon)</strong>, calculée sur la base des heures réelles. Le calcul du coefficient tient compte des heures contractuelles et non de 151,67 heures.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151' }}>
            La cotisation patronale d'assurance maladie (7 %) est réduite à <strong>13 % pour les rémunérations inférieures à 2,5 fois le SMIC</strong> (règle générale applicable aussi au temps partiel). La réduction Fillon s'applique proportionnellement aux heures réelles travaillées.
          </p>
        </section>

        {/* Droits identiques */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Congés payés et droits sociaux au prorata</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Le salarié à temps partiel acquiert les mêmes droits que le temps plein, calculés au <strong>prorata temporis</strong> lorsque c'est applicable :
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { title: 'Congés payés', desc: '2,5 jours ouvrables par mois travaillé, comme le temps plein. Pas de prorata sur le nombre de jours, mais sur l\'indemnité (calculée sur le salaire réel).' },
              { title: 'RTT', desc: 'Proratisés en fonction du temps de travail. Un salarié à 80 % aura 80 % des RTT d\'un temps plein soumis aux mêmes règles.' },
              { title: 'Mutuelle entreprise', desc: 'Obligatoire avec la même participation employeur qu\'au temps plein. Pas de prorata sur la cotisation patronale.' },
              { title: 'Retraite et prévoyance', desc: 'Cotisations calculées sur le salaire réel. Les droits à la retraite sont proportionnels aux cotisations versées.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 10, padding: '18px 20px' }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#3730a3', margin: '0 0 8px' }}>{item.title}</p>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes sur le temps partiel</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#3730a3', fontSize: 20, lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <p style={{ padding: '16px 20px', fontSize: 15, lineHeight: 1.8, color: '#4b5563', margin: 0 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

      </div>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0c4a6e, #0369a1)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Générez un bulletin temps partiel conforme</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Saisissez les heures contractuelles dans notre générateur : salaire, prorata et heures complémentaires calculés automatiquement.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Créer mon bulletin de paie →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
