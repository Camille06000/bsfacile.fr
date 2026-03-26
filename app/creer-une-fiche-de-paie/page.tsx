import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Créer une fiche de paie en ligne 2026 : Guide complet — Bulletin Facile',
  description: 'Comment créer une fiche de paie conforme en 2026 ? Guide étape par étape : mentions obligatoires, calcul des cotisations, prélèvement à la source. Générateur en ligne gratuit.',
  alternates: { canonical: 'https://bulletinfacile.fr/creer-une-fiche-de-paie' },
};

const FAQ = [
  {
    q: 'Quelles sont les mentions obligatoires sur une fiche de paie ?',
    a: "L'article L.3243-2 du Code du travail impose notamment : le nom et l'adresse de l'employeur avec son SIRET, la convention collective applicable, le nom et le numéro de Sécurité sociale du salarié, la période et les heures de travail, le salaire brut, le détail de toutes les cotisations, le net avant impôt, le taux et le montant du prélèvement à la source, et le net à payer.",
  },
  {
    q: "Peut-on créer une fiche de paie soi-même ?",
    a: "Oui. Un employeur peut établir lui-même les bulletins de salaire de ses employés, à condition de respecter toutes les mentions légales et d'appliquer les bons taux de cotisations. Des outils comme Bulletin Facile permettent de générer un bulletin conforme en quelques minutes, sans compétence comptable particulière.",
  },
  {
    q: "Combien de temps conserver les bulletins de salaire ?",
    a: "L'employeur doit conserver un double des bulletins de salaire pendant 5 ans (art. L.3243-4 du Code du travail). Le salarié, lui, a tout intérêt à les conserver sans limite de durée : ils peuvent être nécessaires pour le calcul des droits à la retraite, en cas de litige prud'homal ou pour l'obtention d'un crédit immobilier.",
  },
  {
    q: "Quelle est la différence entre bulletin simplifié et bulletin détaillé ?",
    a: "Depuis 2018, la présentation simplifiée est la norme : les cotisations sont regroupées par grandes catégories (santé, retraite, famille…) plutôt que détaillées ligne par ligne. Le salarié peut demander à son employeur le bulletin complet détaillé. Les deux formats ont la même valeur légale.",
  },
  {
    q: "Comment corriger une erreur sur une fiche de paie ?",
    a: "Si une erreur est détectée, l'employeur doit établir un bulletin de salaire rectificatif, sans détruire l'original. La régularisation se fait généralement sur la paie du mois suivant avec un rappel ou une retenue selon le sens de l'erreur. En cas d'erreur de cotisations, une déclaration rectificative peut être nécessaire auprès de l'URSSAF.",
  },
];

const COTISATIONS = [
  { label: 'Assurance maladie', sal: '0,00 %', pat: '7,00 % / 13,00 %', base: 'Brut total' },
  { label: 'Vieillesse plafonnée', sal: '6,90 %', pat: '8,55 %', base: 'Jusqu\'au PMSS' },
  { label: 'Vieillesse déplafonnée', sal: '0,40 %', pat: '1,90 %', base: 'Brut total' },
  { label: 'AGIRC-ARRCO T1', sal: '3,15 %', pat: '4,72 %', base: 'Jusqu\'au PMSS' },
  { label: 'CEG T1', sal: '0,86 %', pat: '1,29 %', base: 'Jusqu\'à 7 × PMSS' },
  { label: 'CSG déductible', sal: '6,80 %', pat: '—', base: '98,25 % du brut' },
  { label: 'CSG/CRDS non déductible', sal: '2,90 %', pat: '—', base: '98,25 % du brut' },
  { label: 'Allocations familiales', sal: '—', pat: '3,45 % / 5,25 %', base: 'Brut total' },
  { label: 'Chômage', sal: '—', pat: '4,05 %', base: 'Jusqu\'à 4 × PMSS' },
];

export default function CreerFicheDePayePage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>
      <Nav />

      {/* HERO */}
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Mis à jour — 2026
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>
            Créer une fiche de paie conforme en 2026
          </h1>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8, marginBottom: 16 }}>
            Dernière mise à jour : mars 2026
          </div>
          <p style={{ fontSize: 20, opacity: 0.9, marginBottom: 40, lineHeight: 1.6 }}>
            Mentions obligatoires, calcul des cotisations, prélèvement à la source — tout ce qu'il faut savoir pour établir un bulletin légalement valide.
          </p>
          <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 16, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
            Créer mon bulletin maintenant →
          </Link>
        </div>
      </section>

      {/* IMAGE HERO */}
      <div className="hero-img-wrap" style={{ maxWidth: 900, margin: '-32px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&h=300&fit=crop&q=80"
          alt="Personne créant une fiche de paie sur ordinateur portable"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="content-wrap" style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Mentions légales obligatoires */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 8, color: '#111827' }}>Les mentions légales obligatoires</h2>
          <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 24 }}>Art. L.3243-2 du Code du travail</p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 24 }}>
            Tout bulletin de salaire doit comporter un ensemble de mentions imposées par la loi. Leur absence expose l'employeur à des sanctions et peut faire présumer l'absence de paiement du salaire.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                ),
                titre: 'Informations employeur',
                items: ['Raison sociale et adresse', 'Numéro SIRET', 'Code NAF / APE', 'Convention collective applicable', 'Organisme de retraite complémentaire'],
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                ),
                titre: 'Informations salarié',
                items: ['Nom et prénom', 'Numéro de Sécurité sociale', 'Emploi, qualification, coefficient', 'Date d\'entrée dans l\'entreprise', 'Période de paie'],
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                ),
                titre: 'Éléments de rémunération',
                items: ['Heures travaillées (réelles et contractuelles)', 'Salaire brut de base', 'Éléments variables (primes, HS…)', 'Détail de toutes les cotisations', 'Net avant impôt (NAI)'],
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                ),
                titre: 'Prélèvement et paiement',
                items: ['Taux du prélèvement à la source', 'Montant du PAS retenu', 'Net à payer au salarié', 'Date de paiement', 'Mention de conservation sans limitation de durée'],
              },
            ].map((card, i) => (
              <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  {card.icon}
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#111827' }}>{card.titre}</h3>
                </div>
                <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {card.items.map((item, j) => (
                    <li key={j} style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Étapes */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 24, color: '#111827' }}>Les 5 étapes pour créer un bulletin de salaire</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                num: '01',
                titre: 'Renseigner les informations de l\'entreprise',
                desc: 'Saisissez la raison sociale, le SIRET, le code NAF et la convention collective applicable. Ces éléments déterminent les taux de cotisations spécifiques à votre secteur d\'activité.',
              },
              {
                num: '02',
                titre: 'Renseigner les informations du salarié',
                desc: 'Indiquez le nom, le numéro de Sécurité sociale, la qualification, le coefficient conventionnel et la date d\'entrée. Ces données servent à identifier le salarié et à déterminer son niveau de rémunération contractuel.',
              },
              {
                num: '03',
                titre: 'Saisir le salaire brut et les éléments variables',
                desc: 'Renseignez le salaire brut de base correspondant au nombre d\'heures contractuelles, puis ajoutez les éléments variables : heures supplémentaires majorées, primes exceptionnelles, avantages en nature (véhicule, logement, repas).',
              },
              {
                num: '04',
                titre: 'Calcul automatique des cotisations',
                desc: 'Les cotisations URSSAF (maladie, vieillesse, allocations familiales), AGIRC-ARRCO, CSG/CRDS et la réduction Fillon sont calculées automatiquement selon les taux 2026. Le net avant impôt est déterminé après déduction de toutes les cotisations salariales.',
              },
              {
                num: '05',
                titre: 'Vérification et export PDF',
                desc: 'Contrôlez la cohérence des montants, vérifiez le taux de PAS applicable et exportez le bulletin au format PDF. Le fichier est prêt à être remis au salarié, en version papier ou dématérialisée.',
              },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 24px' }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, background: '#1e40af', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 14 }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px', color: '#111827' }}>{step.titre}</h3>
                  <p style={{ fontSize: 15, color: '#4b5563', margin: 0, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tableau cotisations */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 24, color: '#111827' }}>Principales cotisations 2026</h2>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#1e40af', color: 'white' }}>
                  {['Cotisation', 'Part salariale', 'Part patronale', 'Assiette'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COTISATIONS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111827' }}>{row.label}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{row.sal}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{row.pat}</td>
                    <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: 13 }}>{row.base}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>PMSS 2026 : 3 925 €/mois. Les taux de maladie et allocations familiales dépendent du niveau de salaire par rapport au SMIC.</p>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q} <span style={{ color: '#1e40af', fontSize: 20, lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <p style={{ padding: '16px 20px', fontSize: 15, lineHeight: 1.8, color: '#4b5563', margin: 0 }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

      </div>

      {/* ARTICLES CONNEXES */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 22, fontWeight: 800, marginBottom: 20, color: '#0f172a' }}>Articles connexes</h2>
          <div className="articles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { title: 'Comment lire une fiche de paie', href: '/comment-lire-fiche-de-paie', desc: 'Décryptez chaque ligne du bulletin' },
              { title: 'Salaire brut en net', href: '/salaire-brut-en-net', desc: 'Formule et taux de charges' },
              { title: 'Prélèvement à la source', href: '/prelevement-a-la-source', desc: 'Taux et calcul sur le bulletin' },
              { title: 'Net social', href: '/net-social', desc: 'Mention obligatoire depuis 2024' },
            ].map(a => (
              <a key={a.href} href={a.href} style={{ display: 'block', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 18px', textDecoration: 'none', transition: 'box-shadow 0.2s' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 14, marginBottom: 4 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{a.desc}</div>
              </a>
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

      {/* CTA */}
      <section className="cta-box" style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Créez votre premier bulletin en moins de 5 minutes</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Notre générateur applique automatiquement les règles 2026 : cotisations, PAS, réduction Fillon.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Accéder au générateur →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
