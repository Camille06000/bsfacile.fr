import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Solde de tout compte 2026 : calcul, mentions obligatoires et modèle — Bulletin Facile',
  description: 'Solde de tout compte : comment le calculer en 2026 ? Indemnités de rupture, congés payés restants, préavis. Obligations légales de l\'employeur lors du départ d\'un salarié.',
  alternates: { canonical: 'https://bulletinfacile.fr/solde-de-tout-compte' },
};

const FAQ = [
  {
    q: 'L\'employeur est-il obligé de verser un solde de tout compte ?',
    a: 'Oui. L\'employeur est légalement tenu d\'établir et de remettre un solde de tout compte à tout salarié quittant l\'entreprise, quelle que soit la cause de la rupture (démission, licenciement, rupture conventionnelle, fin de CDD, départ en retraite, etc.). L\'omission expose l\'employeur à des contentieux prud\'homaux.',
  },
  {
    q: 'Combien de temps l\'employeur a-t-il pour remettre le solde de tout compte ?',
    a: 'Il n\'existe pas de délai légal précis pour la remise du solde de tout compte. En pratique, il doit être établi à la date de fin du contrat ou au plus tard avec le dernier bulletin de salaire. Le versement des sommes dues doit intervenir à la date de fin du contrat ou dans les jours suivants. Tout retard peut donner lieu à des intérêts de retard.',
  },
  {
    q: 'Peut-on contester un solde de tout compte ?',
    a: 'Oui. Le salarié dispose d\'un délai de 6 mois à compter de la signature du reçu pour solde de tout compte pour contester les sommes versées devant le conseil de prud\'hommes. Si le salarié n\'a pas signé le reçu, le délai de contestation est porté à 12 mois. La contestation doit être envoyée par lettre recommandée avec accusé de réception à l\'employeur ou directement au greffe du conseil de prud\'hommes.',
  },
  {
    q: 'L\'indemnité de licenciement est-elle soumise à cotisations ?',
    a: 'L\'indemnité légale de licenciement est exonérée de cotisations sociales et d\'impôt sur le revenu dans la limite de deux fois le plafond annuel de la Sécurité Sociale (PASS), soit 92 736 € en 2026. Au-delà de ce seuil, la fraction excédentaire est soumise aux cotisations sociales et à l\'impôt. L\'indemnité conventionnelle de licenciement bénéficie du même régime fiscal si elle est supérieure à l\'indemnité légale.',
  },
];

export default function SoldeDeToutComptePage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>

      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Droit du travail 2026 — Rupture du contrat
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
            Solde de tout compte
          </h1>
          <p style={{ fontSize: 20, opacity: 0.9, marginBottom: 40 }}>
            Calcul, documents obligatoires et indemnités de départ en 2026
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 16, maxWidth: 720, margin: '0 auto' }}>
            {[
              { val: '6 mois', label: 'Délai de contestation', sub: 'Après signature du reçu' },
              { val: '4 documents', label: 'Obligatoires', sub: 'Remis au salarié' },
              { val: '1/4 mois', label: 'Indemnité légale', sub: 'Par année d\'ancienneté' },
              { val: '10 %', label: 'Prime de précarité CDD', sub: 'Du brut total' },
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
          alt="Document contrat signature solde de tout compte"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Définition */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Qu'est-ce que le solde de tout compte ?</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Le <strong>solde de tout compte</strong> est l'ensemble des sommes dues au salarié lors de la rupture de son contrat de travail. Il est établi par l'employeur et remis au salarié à la fin du contrat, <strong>quelle qu'en soit la cause</strong> : licenciement, démission, rupture conventionnelle, fin de CDD, départ à la retraite.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            L'employeur remet également un <strong>reçu pour solde de tout compte</strong> que le salarié est invité à signer. Ce document a une valeur libératoire partielle : une fois signé, le salarié dispose de <strong>6 mois</strong> pour le contester. En l'absence de signature, le délai de contestation est porté à <strong>12 mois</strong>.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#334155', margin: '0 0 8px' }}>Reçu signé</p>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, margin: 0 }}>
                Le salarié dispose de <strong>6 mois</strong> pour contester par lettre recommandée. Passé ce délai, le reçu a valeur libératoire pour les sommes mentionnées.
              </p>
            </div>
            <div style={{ background: '#fefce8', border: '1px solid #fde68a', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#92400e', margin: '0 0 8px' }}>Reçu non signé</p>
              <p style={{ fontSize: 14, color: '#78350f', lineHeight: 1.65, margin: 0 }}>
                Le salarié peut contester dans un délai de <strong>12 mois</strong>. L'absence de signature ne prive pas le salarié de ses droits.
              </p>
            </div>
          </div>
        </section>

        {/* Documents à remettre */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Documents obligatoires à remettre au salarié</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 24 }}>
            La loi impose à l'employeur de remettre au salarié, au moment de la rupture du contrat, les documents suivants :
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { num: 1, title: 'Dernier bulletin de salaire', desc: 'Incluant tous les éléments de rémunération du dernier mois, proratisés si départ en cours de mois.' },
              { num: 2, title: 'Certificat de travail', desc: 'Mentionne les dates d\'entrée et de sortie, les emplois occupés et les qualifications. Document indispensable pour le salarié.' },
              { num: 3, title: 'Attestation France Travail (Pôle Emploi)', desc: 'Permet au salarié de s\'inscrire à France Travail et de faire valoir ses droits aux allocations chômage (ARE).' },
              { num: 4, title: 'Reçu pour solde de tout compte', desc: 'Document listant toutes les sommes versées. Le salarié peut refuser de le signer sans conséquence sur ses droits.' },
            ].map((doc) => (
              <div key={doc.num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'white', border: '1px solid #e5e7eb', borderRadius: 10, padding: '16px 20px' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1e293b', color: 'white', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{doc.num}</div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>{doc.title}</p>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.65, margin: 0 }}>{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tableau des éléments du dernier bulletin */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Ce que contient le dernier bulletin de salaire</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Le dernier bulletin regroupe plusieurs éléments de rémunération dont certains sont propres au départ du salarié :
          </p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#1e293b', color: 'white' }}>
                  {['Élément', 'Méthode de calcul', 'Exemple indicatif'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { el: 'Salaire du mois en cours', calc: 'Proratisé si départ en cours de mois', ex: '1 500 €' },
                  { el: 'Congés payés non pris', calc: 'Méthode 1/10 ou maintien de salaire (la plus favorable)', ex: '500 €' },
                  { el: 'Préavis non effectué', calc: 'Salaire brut × jours de préavis / jours du mois', ex: 'Variable' },
                  { el: 'Indemnité légale de licenciement', calc: '1/4 mois de salaire brut par année d\'ancienneté (≥ 8 mois requis)', ex: 'Variable' },
                  { el: 'Prime de précarité (CDD uniquement)', calc: '10 % de la rémunération brute totale du CDD', ex: 'Variable' },
                  { el: 'Indemnité de rupture conventionnelle', calc: 'Au moins égale à l\'indemnité légale de licenciement', ex: 'Variable' },
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111827' }}>{row.el}</td>
                    <td style={{ padding: '12px 16px', color: '#374151', fontSize: 13 }}>{row.calc}</td>
                    <td style={{ padding: '12px 16px', color: '#64748b', fontFamily: 'monospace' }}>{row.ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Calcul indemnité congés payés */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Calcul de l'indemnité de congés payés restants</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            L'indemnité compensatrice de congés payés est due pour tout congé acquis et non pris au moment du départ. L'employeur doit appliquer la méthode la <strong>plus favorable au salarié</strong> entre :
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '22px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', margin: '0 0 10px' }}>Méthode 1/10e</p>
              <p style={{ fontFamily: 'monospace', fontSize: 13, background: '#e2e8f0', padding: '10px 12px', borderRadius: 6, margin: '0 0 10px', color: '#0f172a' }}>
                10 % × Rémunération brute totale<br/>de la période de référence
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
                Calculée sur toute la période de référence (1er juin au 31 mai de l'année suivante).
              </p>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '22px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', margin: '0 0 10px' }}>Méthode maintien de salaire</p>
              <p style={{ fontFamily: 'monospace', fontSize: 13, background: '#e2e8f0', padding: '10px 12px', borderRadius: 6, margin: '0 0 10px', color: '#0f172a' }}>
                Salaire habituel × jours CP restants<br/>÷ jours ouvrés du mois
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
                Correspond au salaire que le salarié aurait perçu s'il avait pris ses congés normalement.
              </p>
            </div>
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '16px 20px' }}>
            <p style={{ fontSize: 14, color: '#166534', margin: 0 }}>
              <strong>Règle de faveur :</strong> L'employeur doit comparer les deux résultats et retenir le montant le plus élevé. Cette obligation est d'ordre public et ne peut pas être écartée par accord d'entreprise.
            </p>
          </div>
        </section>

        {/* Calcul indemnité légale de licenciement */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Calcul de l'indemnité légale de licenciement</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            L'indemnité légale de licenciement est due à tout salarié licencié (hors faute grave ou lourde) ayant au moins <strong>8 mois d'ancienneté</strong> dans l'entreprise. Son montant minimal est fixé par décret :
          </p>
          <div style={{ background: '#f8fafc', border: '2px solid #334155', borderRadius: 12, padding: '24px 28px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { seuil: 'Jusqu\'à 10 ans d\'ancienneté', calcul: '1/4 de mois de salaire brut × nombre d\'années complètes', color: '#1e293b' },
                { seuil: 'Au-delà de 10 ans d\'ancienneté', calcul: '1/3 de mois de salaire brut × nombre d\'années complètes au-delà de 10 ans', color: '#1e293b' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M9 12l2 2 4-4" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="#334155" strokeWidth="2"/>
                  </svg>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{row.seuil} : </span>
                    <span style={{ fontSize: 14, color: '#475569' }}>{row.calcul}</span>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 16, marginBottom: 0, padding: '12px 0 0', borderTop: '1px solid #e2e8f0' }}>
              Le salaire de référence est le plus favorable entre : 1/12e de la rémunération brute des 12 derniers mois ou 1/3 de la rémunération brute des 3 derniers mois. Les primes doivent être intégrées prorata temporis.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes sur le solde de tout compte</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#1e293b', fontSize: 20, lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <p style={{ padding: '16px 20px', fontSize: 15, lineHeight: 1.8, color: '#4b5563', margin: 0 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

      </div>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a, #334155)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Générez le dernier bulletin de paie de votre salarié</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Bulletin Facile vous aide à établir le dernier bulletin avec tous les éléments du solde de tout compte : CP, préavis, indemnités.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Créer le bulletin de départ →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
