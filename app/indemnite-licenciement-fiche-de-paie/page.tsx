import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Indemnité de licenciement 2026 : calcul, bulletin de paie, imposition — Bulletin Facile',
  description: 'Calcul de l\'indemnité légale de licenciement 2026 : formule 1/4 puis 1/3 de mois, salaire de référence, exonération fiscale et sociale, affichage sur le dernier bulletin.',
  alternates: { canonical: 'https://bulletinfacile.fr/indemnite-licenciement-fiche-de-paie' },
};

const FAQ = [
  {
    q: 'L\'indemnité de licenciement est-elle toujours exonérée d\'impôt ?',
    a: 'L\'indemnité légale ou conventionnelle de licenciement est exonérée d\'impôt sur le revenu dans la limite du plus élevé de ces trois montants : le montant légal ou conventionnel, deux fois la rémunération brute annuelle perçue l\'année civile précédente, ou 50 % de l\'indemnité totale. Cette exonération est plafonnée à 6 fois le PASS (soit environ 263 952 € en 2026). Au-delà, l\'excédent est imposable.',
  },
  {
    q: 'Quel salaire prendre en compte pour le calcul de l\'indemnité ?',
    a: 'Le salaire de référence est la moyenne mensuelle des 12 derniers mois précédant le licenciement, ou la moyenne des 3 derniers mois (en retenant dans ce cas 1/3 des primes et gratifications annuelles). L\'employeur doit appliquer la formule la plus favorable au salarié. Le salaire de référence inclut le salaire de base, les primes, les avantages en nature et toute rémunération incluse dans le brut.',
  },
  {
    q: 'Y a-t-il une différence entre l\'indemnité légale et conventionnelle ?',
    a: 'Oui. L\'indemnité légale est le minimum garanti par le Code du travail. La convention collective peut prévoir une indemnité supérieure (mode de calcul plus favorable, ancienneté prise en compte plus tôt). Si la convention collective prévoit un montant plus élevé, c\'est ce montant qui doit être versé. L\'employeur ne peut pas verser moins que le maximum entre l\'indemnité légale et l\'indemnité conventionnelle.',
  },
  {
    q: 'Qu\'est-ce que le solde de tout compte ?',
    a: 'Le solde de tout compte est le document remis au salarié lors de la rupture du contrat. Il récapitule toutes les sommes versées : dernier salaire, indemnité de licenciement, indemnité compensatrice de préavis (si dispensé), indemnité compensatrice de congés payés non pris. Il doit être signé par le salarié qui dispose de 6 mois pour le contester. Sa signature ne vaut pas renonciation aux droits.',
  },
];

export default function IndemniteeLicenciementFicheDePayePage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>

      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 55%, #44403c 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Droit social 2026 — Fin de contrat
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
            Indemnité de licenciement sur la fiche de paie
          </h1>
          <p style={{ fontSize: 20, opacity: 0.9, marginBottom: 40 }}>
            Calcul légal, régime fiscal, affichage sur le dernier bulletin 2026
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 16, maxWidth: 720, margin: '0 auto' }}>
            {[
              { val: '8 mois', label: 'Ancienneté minimum', sub: 'Pour y avoir droit' },
              { val: '1/4 mois', label: 'Par année ≤ 10 ans', sub: 'Formule légale tranche 1' },
              { val: '1/3 mois', label: 'Par année > 10 ans', sub: 'Formule légale tranche 2' },
              { val: 'Exonérée IR', label: 'Dans la limite légale', sub: '≈ 87 984 € (2 PASS)' },
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
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&h=300&fit=crop&q=80"
          alt="Indemnité licenciement fiche de paie 2026"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Conditions */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Conditions pour bénéficier de l'indemnité légale</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            L'indemnité légale de licenciement est due uniquement dans les cas suivants :
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#065f46', margin: '0 0 10px' }}>Conditions requises</p>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: '#14532d', lineHeight: 1.8 }}>
                <li>Contrat à durée indéterminée (CDI)</li>
                <li>Ancienneté d'au moins 8 mois consécutifs</li>
                <li>Licenciement non disciplinaire</li>
                <li>Pas de faute grave ni lourde</li>
              </ul>
            </div>
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#991b1b', margin: '0 0 10px' }}>Cas d'exclusion</p>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: '#7f1d1d', lineHeight: 1.8 }}>
                <li>Faute grave (pas d'indemnité légale)</li>
                <li>Faute lourde (pas d'indemnité légale)</li>
                <li>CDD (sauf requalification)</li>
                <li>Démission du salarié</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Formule légale */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>La formule légale de calcul</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            L'indemnité légale de licenciement est calculée en deux tranches selon l'ancienneté du salarié :
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={{ background: '#f8fafc', border: '2px solid #64748b', borderRadius: 12, padding: '20px 24px' }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#1e293b', margin: '0 0 10px' }}>Tranche 1 : jusqu'à 10 ans</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#334155', fontFamily: 'monospace', margin: '0 0 10px' }}>1/4 × salaire × années</p>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Pour chaque année de présence dans les 10 premières années.</p>
            </div>
            <div style={{ background: '#1e293b', border: '2px solid #475569', borderRadius: 12, padding: '20px 24px' }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9', margin: '0 0 10px' }}>Tranche 2 : au-delà de 10 ans</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#cbd5e1', fontFamily: 'monospace', margin: '0 0 10px' }}>1/3 × salaire × années</p>
              <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>Pour chaque année de présence au-delà de la 10e année.</p>
            </div>
          </div>
          <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 10, padding: '16px 20px' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#92400e', margin: '0 0 4px' }}>Salaire de référence</p>
            <p style={{ fontSize: 14, color: '#78350f', lineHeight: 1.7, margin: 0 }}>
              Prendre la moyenne mensuelle la plus favorable : <strong>moyenne des 12 derniers mois</strong> ou <strong>1/3 × moyenne des 3 derniers mois</strong> (ce dernier inclut le tiers des primes annuelles). Les années incomplètes sont prises en compte au prorata des mois entiers.
            </p>
          </div>
        </section>

        {/* Tableau exemple */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Exemple chiffré : salarié à 2 500 €, 7 ans d'ancienneté</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Salarié licencié pour motif économique, rémunéré 2 500 € brut/mois (salaire de référence retenu : 2 500 €), 7 ans d'ancienneté complète, pas de prime annuelle significative :
          </p>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
            {[
              { label: 'Salaire mensuel de référence', val: '2 500,00 €', type: 'base' },
              { label: 'Ancienneté totale', val: '7 ans complets', type: 'neutral' },
              { label: 'Tranche 1 (7 ans ≤ 10 ans)', val: '1/4 × 2 500 € × 7 = 4 375,00 €', type: 'calc' },
              { label: 'Tranche 2 (0 an > 10 ans)', val: '0,00 €', type: 'calc' },
              { label: 'Indemnité légale totale', val: '4 375,00 €', type: 'result' },
              { label: 'Soumis à cotisations ?', val: 'Non (en dessous du plafond)', type: 'info' },
              { label: 'Soumis à IR ?', val: 'Non (en dessous de 2 PASS)', type: 'info' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderBottom: '1px solid #e2e8f0', background: row.type === 'result' ? '#f1f5f9' : row.type === 'base' ? '#f8fafc' : row.type === 'info' ? '#f0fdf4' : 'white' }}>
                <span style={{ fontSize: 14, color: row.type === 'info' ? '#065f46' : '#0f172a', fontWeight: row.type === 'result' || row.type === 'base' ? 700 : 400 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.type === 'result' ? '#1e293b' : row.type === 'info' ? '#059669' : '#374151', fontFamily: row.type === 'calc' || row.type === 'result' ? 'monospace' : 'inherit' }}>{row.val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#6b7280' }}>* Pour 15 ans d'ancienneté : 1/4 × 2 500 × 10 + 1/3 × 2 500 × 5 = 6 250 + 4 167 = 10 417 €.</p>
        </section>

        {/* Régime fiscal et social */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Régime fiscal et social de l'indemnité</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            L'indemnité légale ou conventionnelle de licenciement bénéficie d'un <strong>régime d'exonération favorable</strong>, à condition de ne pas dépasser certains plafonds :
          </p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb', marginBottom: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#44403c', color: 'white' }}>
                  {['Plafond', 'Exonération IR', 'Exonération cotisations', 'Remarques'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: '#f0fdf4', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#065f46' }}>Dans la limite légale/conventionnelle</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#059669' }}>Exonérée</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#059669' }}>Exonérée</td>
                  <td style={{ padding: '12px 16px', color: '#6b7280' }}>Montant légal calculé selon la formule</td>
                </tr>
                <tr style={{ background: '#f0fdf4', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#065f46' }}>Jusqu'à 2 PASS (≈ 87 984 €)</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#059669' }}>Exonérée</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#059669' }}>Exonérée</td>
                  <td style={{ padding: '12px 16px', color: '#6b7280' }}>Plafond de droit commun 2026</td>
                </tr>
                <tr style={{ background: '#fff7ed', borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#92400e' }}>Entre 2 PASS et 6 PASS</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#d97706' }}>Exonérée IR (dans plafond)</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#dc2626' }}>Cotisations dues</td>
                  <td style={{ padding: '12px 16px', color: '#6b7280' }}>La fraction {'>'} 2 PASS est soumise à charges</td>
                </tr>
                <tr style={{ background: '#fef2f2' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#991b1b' }}>Au-delà de 6 PASS (≈ 263 952 €)</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#dc2626' }}>Imposable (IR)</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#dc2626' }}>Cotisations dues</td>
                  <td style={{ padding: '12px 16px', color: '#6b7280' }}>Intégralité soumise au régime de droit commun</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: '#6b7280' }}>PASS 2026 : 43 992 €. 2 PASS ≈ 87 984 €. 6 PASS ≈ 263 952 €. CSG/CRDS restent dues sur la fraction exonérée de cotisations.</p>
        </section>

        {/* Dernier bulletin */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Ce qui apparaît sur le dernier bulletin</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Le dernier bulletin de paie d'un salarié licencié est souvent dense. Voici les éléments qui y figurent :
          </p>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { label: 'Salaire du mois (proratisé si fin de mois)', val: 'Variable', type: 'base' },
              { label: 'Indemnité compensatrice de préavis (si dispensé)', val: 'Brut × durée préavis', type: 'add' },
              { label: 'Indemnité compensatrice de congés payés non pris', val: '10 % ou maintien × jours restants', type: 'add' },
              { label: 'Indemnité légale (ou conventionnelle) de licenciement', val: 'Calculée selon formule', type: 'special' },
              { label: 'Régularisation de charges diverses', val: 'Si applicable', type: 'neutral' },
              { label: 'Solde de tout compte (document annexé)', val: 'Récapitulatif signé', type: 'info' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderBottom: '1px solid #e2e8f0', background: row.type === 'special' ? '#f1f5f9' : row.type === 'base' ? '#f8fafc' : row.type === 'info' ? '#fef9c3' : 'white' }}>
                <span style={{ fontSize: 14, color: row.type === 'add' ? '#059669' : row.type === 'special' ? '#1e293b' : '#0f172a', fontWeight: row.type === 'special' || row.type === 'base' ? 700 : 400 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: row.type === 'add' ? '#059669' : row.type === 'special' ? '#334155' : '#6b7280' }}>{row.val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes sur l'indemnité de licenciement</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#44403c', fontSize: 20, lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <p style={{ padding: '16px 20px', fontSize: 15, lineHeight: 1.8, color: '#4b5563', margin: 0 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

      </div>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0c4a6e, #0369a1)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Générez le dernier bulletin de paie</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Bulletin Facile vous permet de créer un bulletin de solde de tout compte conforme, avec toutes les lignes réglementaires.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Créer mon bulletin de paie →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
