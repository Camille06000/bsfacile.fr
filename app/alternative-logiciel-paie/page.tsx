import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Alternatives logiciel paie 2026 : comparatif Bulletin Facile, PayFit, Silae, Sage — Bulletin Facile',
  description: 'Quel logiciel de paie choisir en 2026 ? Comparatif complet : Bulletin Facile, PayFit, Silae, Sage, ADP. Tarifs, fonctionnalités, adapté aux TPE et PME françaises.',
  alternates: { canonical: 'https://bulletinfacile.fr/alternative-logiciel-paie' },
};

const FAQ = [
  {
    q: 'Quelle est la meilleure alternative à PayFit pour une TPE ?',
    a: 'Pour une TPE de 1 à 4 salariés, Bulletin Facile est l\'alternative la plus économique à PayFit. À 8,90 € par bulletin sans abonnement, il offre le calcul automatique des cotisations URSSAF, l\'export PDF et le contrat de travail inclus. Pas d\'engagement, pas de frais fixes mensuels.',
  },
  {
    q: 'Silae est-il adapté aux petites structures ?',
    a: 'Silae est principalement utilisé par les cabinets comptables et les experts-comptables gérant plusieurs dizaines de dossiers. Son coût de mise en place et sa courbe d\'apprentissage le rendent peu adapté aux TPE ou aux employeurs gérant moins de 10 bulletins par mois. Pour ces profils, Bulletin Facile est plus adapté.',
  },
  {
    q: 'Sage Paie est-il encore pertinent en 2026 ?',
    a: 'Sage Paie reste une solution solide pour les PME de 20 à 200 salariés avec une équipe RH dédiée. Son coût de licence élevé (plusieurs milliers d\'euros par an) et sa complexité d\'installation le rendent inadapté aux très petites structures. Pour les TPE, des solutions comme Bulletin Facile ou les outils SaaS sont plus accessibles.',
  },
  {
    q: 'Peut-on utiliser Bulletin Facile comme un cabinet comptable ?',
    a: 'Oui. Bulletin Facile permet de générer des bulletins pour différents employeurs et salariés. Les cabinets comptables l\'utilisent pour leurs petits dossiers TPE où un logiciel de paie lourd n\'est pas justifié économiquement. La tarification à l\'acte est particulièrement adaptée à une facturation client au dossier.',
  },
];

const SOLUTIONS = [
  {
    name: 'Bulletin Facile',
    prix: 'Dès 8,90 €/bulletin',
    cotisations: 'Oui, URSSAF 2026',
    taille: 'TPE, 1–5 sal.',
    pdf: 'Oui',
    contrat: 'Oui inclus',
    api: 'Non',
    mobile: 'Oui (web)',
    engagement: 'Aucun',
    highlight: true,
  },
  {
    name: 'PayFit',
    prix: '~80–150 €/mois',
    cotisations: 'Oui',
    taille: '5–200 sal.',
    pdf: 'Oui',
    contrat: 'Module séparé',
    api: 'Oui',
    mobile: 'App native',
    engagement: 'Abonnement mensuel',
    highlight: false,
  },
  {
    name: 'Silae',
    prix: 'Sur devis (cabinets)',
    cotisations: 'Oui',
    taille: 'Cabinets comptables',
    pdf: 'Oui',
    contrat: 'Oui',
    api: 'Oui',
    mobile: 'Partiel',
    engagement: 'Contrat annuel',
    highlight: false,
  },
  {
    name: 'Sage Paie',
    prix: '~2 000–5 000 €/an',
    cotisations: 'Oui',
    taille: 'PME 20–200 sal.',
    pdf: 'Oui',
    contrat: 'Module séparé',
    api: 'Oui (ERP)',
    mobile: 'Limité',
    engagement: 'Licence annuelle',
    highlight: false,
  },
  {
    name: 'ADP',
    prix: 'Sur devis (> 50 sal.)',
    cotisations: 'Oui',
    taille: 'Grandes entreprises',
    pdf: 'Oui',
    contrat: 'Oui',
    api: 'Oui',
    mobile: 'App native',
    engagement: 'Contrat pluriannuel',
    highlight: false,
  },
];

const COLONNES = ['Prix', 'Cotis. auto', 'Taille', 'PDF', 'Contrat', 'API', 'Mobile', 'Engagement'];
const COLS_KEYS: (keyof typeof SOLUTIONS[0])[] = ['prix', 'cotisations', 'taille', 'pdf', 'contrat', 'api', 'mobile', 'engagement'];

const PROFILS = [
  {
    title: 'Auto-entrepreneur / micro-entreprise',
    icon: '🧑‍💻',
    color: '#1d4ed8',
    bg: '#eff6ff',
    desc: 'Vous embauchez votre premier salarié ou un extra ponctuel. Vous n\'avez pas besoin d\'un logiciel permanent.',
    solution: 'Bulletin Facile — 8,90 €/bulletin, sans abonnement',
  },
  {
    title: 'TPE 1 à 5 salariés',
    icon: '🏪',
    color: '#059669',
    bg: '#f0fdf4',
    desc: 'Vous gérez de 2 à 10 bulletins par mois. Un abonnement à 100 €/mois est disproportionné.',
    solution: 'Bulletin Facile ou PayFit selon le volume et les besoins RH annexes',
  },
  {
    title: 'PME 10 à 50 salariés',
    icon: '🏢',
    color: '#7c3aed',
    bg: '#f5f3ff',
    desc: 'Vous avez une personne dédiée à la paie, des profils variés et des besoins de reporting.',
    solution: 'PayFit ou Silae (cabinet) selon que vous gérez en interne ou via un expert-comptable',
  },
  {
    title: 'Grand compte > 50 salariés',
    icon: '🏦',
    color: '#b45309',
    bg: '#fffbeb',
    desc: 'Paie complexe, SIRH intégré, intégrations ERP, reporting multi-établissements.',
    solution: 'Sage Paie, ADP ou Cegid selon votre infrastructure IT et vos process',
  },
];

export default function AlternativeLogicielPaiePage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#1a1a2e' }}>

      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 55%, #047857 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Comparatif complet — 5 solutions 2026
          </div>
          <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 56px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>
            Alternatives logiciel de paie 2026
          </h1>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8, marginBottom: 16 }}>
            Dernière mise à jour : mars 2026
          </div>
          <p style={{ fontSize: 19, opacity: 0.9, marginBottom: 40, lineHeight: 1.6 }}>
            Bulletin Facile, PayFit, Silae, Sage, ADP : quel logiciel de paie choisir selon votre profil ?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, maxWidth: 660, margin: '0 auto' }}>
            {[
              { val: '5 solutions', label: 'Comparées', sub: 'Du TPE au grand compte' },
              { val: '8 critères', label: 'Analysés', sub: 'Prix, fonctions, engagement' },
              { val: '4 profils', label: 'Couverts', sub: 'Auto-entrepreneur → grand compte' },
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
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=300&fit=crop&q=80"
          alt="Comparatif logiciels de paie France 2026"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px' }}>

        {/* Grand tableau comparatif */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 8, color: '#111827' }}>Comparatif 5 solutions × 8 critères</h2>
          <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 24 }}>Tableau complet pour choisir le logiciel de paie adapté à votre structure en 2026.</p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#064e3b', color: 'white' }}>
                  <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700, minWidth: 140 }}>Solution</th>
                  {COLONNES.map(col => (
                    <th key={col} style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700, minWidth: 100 }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SOLUTIONS.map((sol, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e5e7eb', background: sol.highlight ? '#f0fdf4' : i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 800, color: sol.highlight ? '#065f46' : '#111827', whiteSpace: 'nowrap' }}>
                      {sol.highlight && <span style={{ background: '#bbf7d0', color: '#065f46', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, marginRight: 6 }}>CE SITE</span>}
                      {sol.name}
                    </td>
                    {COLS_KEYS.map(key => (
                      <td key={key} style={{ padding: '12px 14px', color: '#374151', fontSize: 13 }}>{sol[key] as string}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Critères de choix */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 24, color: '#111827' }}>Critères de choix selon votre profil</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {PROFILS.map((p, i) => (
              <div key={i} style={{ background: p.bg, border: `1px solid ${p.color}30`, borderRadius: 12, padding: '24px' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: p.color, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>{p.desc}</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: p.color, background: 'white', borderRadius: 8, padding: '8px 12px', border: `1px solid ${p.color}30` }}>
                  Solution recommandée : {p.solution}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pourquoi Bulletin Facile pour TPE */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Pourquoi Bulletin Facile est idéal pour les petites structures</h2>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '32px' }}>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#065f46', marginBottom: 20 }}>
              La majorité des logiciels de paie sur le marché ont été conçus pour des entreprises de 20 salariés minimum. Ils imposent des abonnements fixes, des formations et des paramétrages complexes inadaptés aux TPE.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { title: 'Sans abonnement', desc: 'Payez uniquement les bulletins que vous créez. Aucun frais fixe.' },
                { title: 'Prêt en 5 minutes', desc: 'Aucune formation, aucun paramétrage. Renseignez le salaire, téléchargez le PDF.' },
                { title: 'Conforme URSSAF 2026', desc: 'Taux mis à jour automatiquement. Bulletins légalement valides.' },
                { title: 'Contrat inclus', desc: 'Générez le contrat de travail en même temps que le bulletin.' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'white', borderRadius: 10, padding: '16px', border: '1px solid #d1fae5' }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#065f46', marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #064e3b, #065f46)', borderRadius: 16, padding: '48px 40px', textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: 'white', marginBottom: 12 }}>Essayez Bulletin Facile — la meilleure alternative pour les TPE</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 28 }}>8,90 € par bulletin, sans abonnement, contrat de travail inclus</p>
          <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#064e3b', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
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
                  {q} <span style={{ color: '#047857', fontSize: 20, lineHeight: 1 }}>+</span>
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
