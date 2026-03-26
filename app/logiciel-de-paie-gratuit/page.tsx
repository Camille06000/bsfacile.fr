import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Logiciel de paie gratuit 2026 : existe-t-il vraiment ? Comparatif & alternatives — Bulletin Facile',
  description: 'Logiciel de paie gratuit en France 2026 : ce qui existe, les limitations, et pourquoi une solution à faible coût (dès 8,90€) vaut mieux que le "gratuit". Comparatif honnête.',
  alternates: { canonical: 'https://bulletinfacile.fr/logiciel-de-paie-gratuit' },
};

const FAQ = [
  {
    q: 'Existe-t-il un logiciel de paie gratuit et légalement conforme en France ?',
    a: 'Non. Il n\'existe pas de logiciel de paie totalement gratuit et légalement conforme en France. La paie française est complexe (taux URSSAF, AGIRC-ARRCO, PAS, conventions collectives) et nécessite des mises à jour réglementaires fréquentes. Ces mises à jour ont un coût. Toute solution "gratuite" présente soit des limitations fonctionnelles importantes, soit des risques de non-conformité.',
  },
  {
    q: 'Excel est-il suffisant pour établir des bulletins de salaire ?',
    a: 'Excel peut être utilisé pour calculer des bulletins simples, mais il présente des risques élevés d\'erreur sur les taux de cotisations. Les barèmes changent régulièrement (SMIC, PAS, AGIRC-ARRCO...) et doivent être mis à jour manuellement. En cas d\'erreur, vous êtes responsable des cotisations non versées et des pénalités URSSAF. Pour une conformité garantie, un outil dédié est indispensable.',
  },
  {
    q: 'Quels sont les risques d\'un logiciel de paie gratuit non conforme ?',
    a: 'Les risques sont : rappels de cotisations avec majoration de retard (3 % à 10 % par trimestre), redressement URSSAF, litiges prud\'homaux avec le salarié en cas de bulletin incorrect, et problèmes lors du contrôle fiscal. La responsabilité de l\'employeur est pleine et entière, quelle que soit la solution utilisée.',
  },
  {
    q: 'Pourquoi 8,90 € par bulletin est-il moins cher que le "gratuit" ?',
    a: 'Le vrai coût du "gratuit" inclut le temps passé à maintenir les fichiers Excel, à vérifier les taux manuellement, à corriger les erreurs et à gérer les risques. Pour un employeur à 50 €/h, 1 heure de gestion manuelle par bulletin revient à 50 €. À 8,90 €, Bulletin Facile inclut le calcul automatique, la conformité garantie, le PDF professionnel et le contrat de travail.',
  },
];

const COUTS_REELS = [
  {
    solution: 'Excel / tableur maison',
    cout: '0 € + votre temps',
    coutReel: '20–80 €/bulletin',
    conformite: 'Non garantie',
    risque: 'Élevé',
    color: '#dc2626',
  },
  {
    solution: 'Essai gratuit logiciel',
    cout: '0 € (limité)',
    coutReel: '60–150 €/mois après essai',
    conformite: 'Oui (pendant l\'essai)',
    risque: 'Modéré',
    color: '#d97706',
  },
  {
    solution: 'Bulletin Facile',
    cout: '8,90 €/bulletin',
    coutReel: '8,90 €/bulletin (tout inclus)',
    conformite: 'Oui, URSSAF 2026',
    risque: 'Faible',
    color: '#059669',
  },
  {
    solution: 'Expert-comptable',
    cout: '80–150 €/bulletin',
    coutReel: '80–150 €/bulletin',
    conformite: 'Oui',
    risque: 'Très faible',
    color: '#059669',
  },
];

export default function LogicielDePaieGratuitPage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#1a1a2e' }}>

      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #78350f 0%, #92400e 55%, #b45309 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Comparatif honnête — 2026
          </div>
          <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>
            Logiciel de paie gratuit : mythe ou réalité ?
          </h1>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8, marginBottom: 16 }}>
            Dernière mise à jour : mars 2026
          </div>
          <p style={{ fontSize: 19, opacity: 0.9, marginBottom: 40, lineHeight: 1.6 }}>
            Ce qui existe, les limitations légales, et pourquoi dès 8,90 € vous êtes mieux protégé que le "gratuit".
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16, maxWidth: 660, margin: '0 auto' }}>
            {[
              { val: '0', label: 'Logiciel 100 % gratuit conforme', sub: 'Aucun sur le marché français' },
              { val: '8,90 €', label: 'Solution la plus accessible', sub: 'Bulletin Facile, à l\'acte' },
              { val: '−94 %', label: 'vs expert-comptable', sub: 'Qui facture 80–150 €/bulletin' },
            ].map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '20px 16px' }}>
                <div style={{ fontSize: 26, fontWeight: 900 }}>{c.val}</div>
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
          src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=900&h=300&fit=crop&q=80"
          alt="Calcul coût logiciel de paie gratuit vs payant 2026"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Réponse directe */}
        <section style={{ marginBottom: 64 }}>
          <div style={{ background: '#fef2f2', border: '2px solid #fecaca', borderRadius: 12, padding: '28px 32px', marginBottom: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#991b1b', marginBottom: 12 }}>La réponse directe</h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#7f1d1d', margin: 0, fontWeight: 500 }}>
              Il n'existe pas de logiciel de paie légalement conforme et totalement gratuit en France. La paie française requiert des mises à jour réglementaires permanentes (taux URSSAF, barème PAS, SMIC, conventions collectives) dont la maintenance a un coût incompressible.
            </p>
          </div>

          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Pourquoi le "gratuit" n'existe pas vraiment</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                title: 'Les taux changent constamment',
                desc: 'URSSAF, AGIRC-ARRCO, taux AT/MP, barème PAS, SMIC... Chaque année, des dizaines de paramètres sont modifiés. Un logiciel conforme doit intégrer ces mises à jour en temps réel. C\'est une charge de travail permanente qui ne peut pas être assurée gratuitement.',
                icon: '📅',
              },
              {
                title: 'La conformité légale engage votre responsabilité',
                desc: 'L\'employeur est légalement responsable de l\'exactitude des bulletins de salaire. Une erreur de calcul peut entraîner un redressement URSSAF avec majorations (3 % à 10 % par trimestre de retard), indépendamment du logiciel utilisé.',
                icon: '⚖️',
              },
              {
                title: 'La maintenance informatique a un coût',
                desc: 'Hébergement, sécurité des données, support utilisateur, développement : tout service en ligne coûte. Un service réellement "gratuit" se monétise généralement par la revente de données, des publicités ou des fonctions premium masquées.',
                icon: '💻',
              },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, background: '#f9fafb', borderRadius: 12, padding: '20px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 15, color: '#374151', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ce qui "existe" */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Ce qui "existe" comme solutions gratuites</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                title: 'Excel / tableur maison',
                badge: 'Risqué',
                badgeColor: '#dc2626',
                desc: 'Possible techniquement, mais vous devez mettre à jour manuellement tous les taux à chaque changement réglementaire. Risque d\'erreur élevé, aucune vérification automatique. En cas de contrôle URSSAF, vous devrez justifier chaque calcul.',
              },
              {
                title: 'Essais gratuits des logiciels SaaS (PayFit, etc.)',
                badge: 'Temporaire',
                badgeColor: '#d97706',
                desc: 'Les essais gratuits durent généralement 14 à 30 jours. Ils sont utiles pour tester, mais ne constituent pas une solution pérenne. À l\'issue de l\'essai, l\'abonnement mensuel commence.',
              },
              {
                title: 'Logiciels open-source de paie',
                badge: 'Complexe',
                badgeColor: '#7c3aed',
                desc: 'Certains logiciels open-source existent (comme OpenERP/Odoo en version communautaire), mais leur configuration requiert des compétences techniques élevées et des mises à jour manuelles fréquentes. Non adapté aux non-techniciens.',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#111827' }}>{item.title}</div>
                  <span style={{ background: item.badgeColor, color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, flexShrink: 0 }}>{item.badge}</span>
                </div>
                <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Le vrai calcul */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 8, color: '#111827' }}>Le vrai calcul : coût réel par bulletin</h2>
          <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 24 }}>Comparaison du coût total incluant votre temps et les risques potentiels.</p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#78350f', color: 'white' }}>
                  {['Solution', 'Coût affiché', 'Coût réel estimé', 'Conformité', 'Niveau de risque'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COUTS_REELS.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e5e7eb', background: i === 2 ? '#f0fdf4' : i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                    <td style={{ padding: '12px 16px', fontWeight: i === 2 ? 800 : 500, color: i === 2 ? '#065f46' : '#111827' }}>
                      {i === 2 && <span style={{ background: '#bbf7d0', color: '#065f46', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, marginRight: 6 }}>CE SITE</span>}
                      {row.solution}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{row.cout}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: row.color }}>{row.coutReel}</td>
                    <td style={{ padding: '12px 16px', color: row.color }}>{row.conformite}</td>
                    <td style={{ padding: '12px 16px', color: row.color, fontWeight: 600 }}>{row.risque}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: '#6b7280', marginTop: 12 }}>* Le coût réel de l'Excel intègre 1 à 2h de gestion manuelle par bulletin (vérification taux, saisie, correction, archivage). Estimé à 40 €/h de temps employeur.</p>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #78350f, #92400e)', borderRadius: 16, padding: '48px 40px', textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: 'white', marginBottom: 12 }}>Essayez sans risque — 8,90 € le premier bulletin</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 28 }}>Conformité URSSAF garantie, PDF professionnel, contrat de travail inclus. Aucun abonnement.</p>
          <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#78350f', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
            Créer mon bulletin maintenant →
          </Link>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#b45309', fontSize: 20, lineHeight: 1 }}>+</span>
                </summary>
                <p style={{ padding: '16px 20px', fontSize: 15, lineHeight: 1.8, color: '#4b5563', margin: 0 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })}}
      />

      <Footer />
    </div>
  );
}
