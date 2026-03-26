import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CDD et fiche de paie 2026 : indemnité de précarité, droits, calcul — Bulletin Facile',
  description: 'Bulletin de salaire CDD 2026 : indemnité de fin de contrat (10%), congés payés, droits identiques au CDI. Calcul, affichage sur le dernier bulletin, cas d\'exonération.',
  alternates: { canonical: 'https://bulletinfacile.fr/cdd-fiche-de-paie' },
};

const FAQ = [
  {
    q: 'L\'indemnité de fin de CDD est-elle soumise aux cotisations et à l\'impôt ?',
    a: 'Oui, l\'indemnité de fin de contrat CDD (indemnité de précarité) est soumise aux cotisations sociales (salariales et patronales) comme une rémunération ordinaire. Elle est également soumise au prélèvement à la source (PAS) et figure donc dans le revenu imposable du salarié. Elle ne bénéficie d\'aucune exonération particulière, contrairement à l\'indemnité légale de licenciement.',
  },
  {
    q: 'Que se passe-t-il si le CDD est transformé en CDI à son terme ?',
    a: 'Si l\'employeur propose un CDI au salarié à l\'issue du CDD et que le salarié accepte, l\'indemnité de fin de contrat n\'est pas due. Si le salarié refuse sans motif légitime le CDI proposé dans les mêmes conditions d\'emploi, il perd également le droit à l\'indemnité et potentiellement à l\'allocation chômage. En revanche, si les conditions du CDI sont moins favorables, le salarié peut refuser et percevoir l\'indemnité.',
  },
  {
    q: 'Un CDD peut-il être renouvelé indéfiniment ?',
    a: 'Non. Le CDD ne peut être renouvelé que 2 fois au maximum. La durée totale (contrat initial + renouvellements) ne peut en principe pas dépasser 18 mois. Des durées différentes s\'appliquent selon les motifs : 9 mois pour les travaux urgents, 24 mois pour certains marchés à l\'exportation. Tout dépassement expose l\'employeur à une requalification du CDD en CDI par le conseil de prud\'hommes.',
  },
  {
    q: 'Comment calculer l\'indemnité de fin de CDD si le salarié n\'a pas pris tous ses congés ?',
    a: 'Si le salarié n\'a pas pris ses congés en cours de CDD (ce qui est fréquent pour les contrats courts), il perçoit une indemnité compensatrice de congés payés égale à 10 % du total des rémunérations brutes perçues pendant le contrat. Cette indemnité est distincte de l\'indemnité de précarité et s\'y ajoute. Elle apparaît sur une ligne séparée du dernier bulletin.',
  },
];

export default function CddFicheDePayePage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>

      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 55%, #0369a1 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Droit social 2026 — Contrat à durée déterminée
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
            CDD et fiche de paie
          </h1>
          <p style={{ fontSize: 20, opacity: 0.9, marginBottom: 40 }}>
            Indemnité de précarité, droits, congés : tout comprendre en 2026
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 16, maxWidth: 720, margin: '0 auto' }}>
            {[
              { val: '+10 %', label: 'Indemnité de précarité', sub: 'Du brut total versé' },
              { val: 'SMIC minimum', label: 'Même salaire que CDI', sub: 'Pas de différence légale' },
              { val: '2,5 j/mois', label: 'Congés payés identiques', sub: 'Comme le CDI' },
              { val: '2 fois', label: 'Renouvellement max', sub: 'Durée totale ≤ 18 mois' },
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
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&h=300&fit=crop&q=80"
          alt="CDD fiche de paie 2026"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Indemnité de précarité */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>L'indemnité de fin de contrat (précarité)</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            À l'issue d'un CDD, le salarié a droit à une <strong>indemnité de fin de contrat</strong> (communément appelée "prime de précarité"), égale à <strong>10 % de la rémunération brute totale</strong> perçue pendant le contrat. Elle est versée sur le dernier bulletin de paie.
          </p>
          <div style={{ background: '#eff6ff', border: '2px solid #3b82f6', borderRadius: 12, padding: '24px 28px', textAlign: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#1e40af', marginBottom: 8 }}>Formule de calcul</p>
            <p style={{ fontSize: 22, fontWeight: 900, color: '#1d4ed8', fontFamily: 'monospace', margin: '0 0 8px' }}>
              Indemnité = Total brut perçu × 10 %
            </p>
            <p style={{ fontSize: 13, color: '#3b82f6', margin: 0 }}>Exemple : 3 mois à 2 000 € brut = 6 000 € × 10 % = 600 € d'indemnité</p>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151' }}>
            Le "total brut perçu" inclut le salaire de base, les primes, les heures supplémentaires et toute rémunération brute versée pendant la durée du CDD.
          </p>
        </section>

        {/* Exceptions */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Cas où l'indemnité de précarité n'est pas due</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            La loi prévoit plusieurs exceptions où l'employeur n'est pas tenu de verser l'indemnité de fin de contrat :
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { title: 'CDD saisonnier', desc: 'Les contrats conclus pour une activité saisonnière (agriculture, tourisme, etc.) ne donnent pas droit à l\'indemnité.' },
              { title: "CDD d'usage (extra)", desc: 'Dans les secteurs où il est d\'usage constant de ne pas recourir au CDI (restauration, événementiel, audiovisuel), l\'indemnité n\'est pas due.' },
              { title: 'Rupture à l\'initiative du salarié', desc: 'Si le salarié rompt le contrat avant son terme (sauf pour CDI ou cas de force majeure), l\'indemnité n\'est pas versée.' },
              { title: 'Faute grave du salarié', desc: 'En cas de rupture anticipée pour faute grave ou lourde du salarié, l\'indemnité de précarité n\'est pas due.' },
              { title: 'Poursuite en CDI', desc: 'Si l\'employeur propose un CDI à l\'issue du CDD et que le salarié l\'accepte dans des conditions équivalentes, l\'indemnité n\'est pas versée.' },
              { title: 'Stage', desc: 'Les conventions de stage ne sont pas des CDD. Aucune indemnité de fin de contrat n\'est due à l\'issue d\'un stage.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '16px 18px' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#991b1b', margin: '0 0 6px' }}>{item.title}</p>
                <p style={{ fontSize: 13, color: '#7f1d1d', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Affichage sur le dernier bulletin */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Affichage sur le dernier bulletin de paie</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Le dernier bulletin d'un CDD fait apparaître plusieurs lignes spécifiques. Voici un exemple pour un CDD de 3 mois à 2 000 € brut/mois, sans congés pris :
          </p>
          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { label: 'Salaire brut du dernier mois', val: '2 000,00 €', type: 'base' },
              { label: 'Indemnité compensatrice de congés payés (10 % × 6 000 €)', val: '+ 600,00 €', type: 'add' },
              { label: 'Indemnité de fin de contrat CDD (10 % × 6 000 €)', val: '+ 600,00 €', type: 'add' },
              { label: 'Total brut versé ce mois', val: '3 200,00 €', type: 'result' },
              { label: 'Cotisations salariales (≈ 22 %)', val: '− ~704 €', type: 'deduct' },
              { label: 'Net à payer estimé (avant PAS)', val: '≈ 2 496 €', type: 'final' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderBottom: '1px solid #bae6fd', background: row.type === 'final' ? '#0369a1' : row.type === 'result' ? '#e0f2fe' : row.type === 'base' ? '#f0f9ff' : 'white' }}>
                <span style={{ fontSize: 14, color: row.type === 'final' ? 'white' : row.type === 'add' ? '#0369a1' : row.type === 'deduct' ? '#dc2626' : '#0f172a', fontWeight: row.type === 'final' || row.type === 'result' || row.type === 'base' ? 700 : 400 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.type === 'final' ? 'white' : row.type === 'add' ? '#0369a1' : row.type === 'deduct' ? '#dc2626' : '#0c4a6e', fontFamily: 'monospace' }}>{row.val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>* L'indemnité de précarité et l'indemnité compensatrice de CP sont deux montants distincts, soumis tous deux aux cotisations et au PAS.</p>
        </section>

        {/* Congés payés en CDD */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Congés payés en CDD</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Le salarié en CDD acquiert les mêmes droits à congés que le salarié en CDI : <strong>2,5 jours ouvrables par mois travaillé</strong>. Dans la pratique, les congés sont rarement pris pendant un CDD court.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#065f46', margin: '0 0 8px' }}>CP pris pendant le contrat</p>
              <p style={{ fontSize: 14, color: '#14532d', lineHeight: 1.65, margin: 0 }}>
                Si les congés sont pris en cours de contrat, ils sont rémunérés comme pour un CDI (1/10e ou maintien de salaire, la méthode la plus favorable).
              </p>
            </div>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#1e40af', margin: '0 0 8px' }}>CP non pris → indemnité compensatrice</p>
              <p style={{ fontSize: 14, color: '#1e3a8a', lineHeight: 1.65, margin: 0 }}>
                Si les congés ne sont pas pris, le salarié reçoit une indemnité compensatrice de congés payés sur le dernier bulletin, égale à 10 % du total brut du contrat.
              </p>
            </div>
          </div>
        </section>

        {/* Droits identiques CDI */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Droits identiques au salarié en CDI</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Le principe d'égalité de traitement s'applique pleinement au CDD. Sur la fiche de paie, les cotisations sont les mêmes que pour un CDI :
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'URSSAF (maladie, famille, accident du travail)', desc: 'Cotisations patronales et salariales identiques au CDI.' },
              { label: 'Retraite complémentaire AGIRC-ARRCO', desc: 'Mêmes taux et mêmes droits à la retraite que le CDI.' },
              { label: 'Mutuelle entreprise', desc: 'Bénéfice de la mutuelle collective obligatoire dès le premier jour (sauf si CDD < 3 mois avec dispense possible).' },
              { label: 'Assurance chômage (France Travail)', desc: 'Droits à l\'assurance chômage ouverts selon durée et conditions habituelles.' },
              { label: 'Formation professionnelle', desc: 'Droits au CPF acquis dans les mêmes conditions qu\'un CDI.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', background: '#f0f9ff', borderRadius: 10, border: '1px solid #bae6fd' }}>
                <span style={{ color: '#0369a1', fontWeight: 700, fontSize: 18, flexShrink: 0, lineHeight: 1.2 }}>✓</span>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0c4a6e' }}>{item.label} : </span>
                  <span style={{ fontSize: 14, color: '#374151' }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Renouvellement CDD */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Renouvellement du CDD : règles 2026</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Un CDD peut être renouvelé dans un cadre légal strict pour éviter les abus :
          </p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#0369a1', color: 'white' }}>
                  {['Règle', 'Détail', 'Conséquence si dépassement'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { regle: 'Nombre de renouvellements', detail: '2 fois maximum (contrat initial + 2 renouvellements = 3 périodes)', cons: 'Requalification en CDI' },
                  { regle: 'Durée totale maximale', detail: '18 mois en règle générale', cons: 'Requalification en CDI' },
                  { regle: 'Délai de carence', detail: 'Entre deux CDD sur le même poste : 1/3 de la durée totale du contrat précédent', cons: 'CDD requalifié en CDI' },
                  { regle: 'Motif valable', detail: 'Remplacement, accroissement temporaire, saisonnier, usage', cons: 'Requalification en CDI + dommages-intérêts' },
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f0f9ff', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0c4a6e' }}>{row.regle}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{row.detail}</td>
                    <td style={{ padding: '12px 16px', color: '#dc2626', fontWeight: 500 }}>{row.cons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes sur le CDD</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#0369a1', fontSize: 20, lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <p style={{ padding: '16px 20px', fontSize: 15, lineHeight: 1.8, color: '#4b5563', margin: 0 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

      </div>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0c4a6e, #0369a1)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Générez un bulletin de paie CDD conforme</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Bulletin Facile calcule automatiquement l'indemnité de précarité et les congés payés sur votre bulletin CDD.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Créer mon bulletin de paie →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
