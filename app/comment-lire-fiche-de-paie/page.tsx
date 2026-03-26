import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Comment lire une fiche de paie ? Guide complet 2026 — Bulletin Facile',
  description: 'Comprendre sa fiche de paie en 2026 : salaire brut, cotisations salariales et patronales, CSG, CRDS, prélèvement à la source, net à payer. Guide illustré et complet.',
  alternates: { canonical: 'https://bulletinfacile.fr/comment-lire-fiche-de-paie' },
};

const SECTIONS = [
  {
    num: '01',
    titre: 'L\'en-tête : les informations légales obligatoires',
    color: '#1d4ed8',
    bg: '#eff6ff',
    items: [
      { label: 'Employeur', desc: 'Raison sociale, adresse, SIRET, code NAF/APE, convention collective applicable.' },
      { label: 'Salarié', desc: 'Nom, prénom, numéro de sécurité sociale, date d\'entrée, qualification, coefficient.' },
      { label: 'Période de paie', desc: 'Mois concerné, date de paiement. Obligatoirement mentionné sur chaque bulletin.' },
    ],
  },
  {
    num: '02',
    titre: 'Le salaire brut : votre rémunération totale',
    color: '#059669',
    bg: '#f0fdf4',
    items: [
      { label: 'Salaire de base', desc: 'Taux horaire × heures mensuelles contractuelles (151,67h pour un temps plein).' },
      { label: 'Éléments variables', desc: 'Heures supplémentaires (25%/50%), primes, avantages en nature, indemnités.' },
      { label: 'SALAIRE BRUT', desc: 'Total de tous les éléments de rémunération avant toute déduction.' },
    ],
  },
  {
    num: '03',
    titre: 'Les cotisations salariales : ce que vous payez',
    color: '#dc2626',
    bg: '#fef2f2',
    items: [
      { label: 'Sécurité sociale', desc: 'Maladie-maternité (0 % salarial depuis 2018), vieillesse plafonnée 6,90 %, vieillesse déplafonnée 0,40 %.' },
      { label: 'Retraite complémentaire', desc: 'AGIRC-ARRCO T1 : 3,15 % jusqu\'au PMSS. T2 : 8,64 % de 1 à 8× PMSS (cadres uniquement).' },
      { label: 'CSG / CRDS', desc: 'CSG déductible 6,80 % + CSG/CRDS non déductible 2,90 % — base 98,25 % du brut.' },
      { label: 'Chômage', desc: 'Aucune cotisation salariale chômage depuis octobre 2018 (exonération maintenue en 2026).' },
    ],
  },
  {
    num: '04',
    titre: 'Les cotisations patronales : ce que paye l\'employeur',
    color: '#7c3aed',
    bg: '#f5f3ff',
    items: [
      { label: 'Charges patronales', desc: 'Représentent environ 42-45 % du salaire brut. Invisibles sur votre bulletin mais réelles.' },
      { label: 'Réduction Fillon', desc: 'Allègement général applicable si salaire < 1,6× SMIC. Réduit les charges patronales jusqu\'à zéro au niveau du SMIC.' },
      { label: 'Coût employeur total', desc: 'Brut + charges patronales − réduction Fillon = coût réel pour l\'entreprise.' },
    ],
  },
  {
    num: '05',
    titre: 'Le net et l\'impôt sur le revenu',
    color: '#b45309',
    bg: '#fffbeb',
    items: [
      { label: 'Net avant impôt (net social)', desc: 'Brut − cotisations salariales. C\'est la base pour calculer le prélèvement à la source.' },
      { label: 'Prélèvement à la source (PAS)', desc: 'Impôt sur le revenu prélevé directement. Taux personnalisé communiqué par la DGFiP via votre espace impots.gouv.fr.' },
      { label: 'NET À PAYER', desc: 'Montant viré sur votre compte bancaire = net avant impôt − PAS. Votre vrai salaire perçu.' },
    ],
  },
];

export default function CommentLireFicheDePaiePage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#1a1a2e' }}>

      <Nav />

      {/* HERO */}
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #312e81 0%, #4338ca 60%, #6366f1 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, left: '50%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', transform: 'translateX(-50%)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            📋 Guide complet · Mise à jour 2026
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 8 }}>
            Comment lire<br />une fiche de paie ?
          </h1>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8, marginBottom: 16 }}>
            Dernière mise à jour : mars 2026
          </div>
          <p style={{ fontSize: 19, opacity: 0.88, lineHeight: 1.7, maxWidth: 600, margin: '0 auto 36px' }}>
            Salaire brut, cotisations, CSG, CRDS, prélèvement à la source... Comprendre chaque ligne de votre bulletin en 5 minutes.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#guide" style={{ background: '#facc15', color: '#1a1a2e', fontWeight: 800, fontSize: 16, padding: '12px 28px', borderRadius: 10, textDecoration: 'none' }}>Lire le guide →</a>
            <Link href="/generateur" style={{ border: '2px solid rgba(255,255,255,0.5)', color: 'white', fontWeight: 700, fontSize: 16, padding: '12px 28px', borderRadius: 10, textDecoration: 'none' }}>Créer mon bulletin</Link>
          </div>
        </div>
      </section>

      {/* IMAGE HERO */}
      <div className="hero-img-wrap" style={{ maxWidth: 900, margin: '-32px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <img
          src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&h=300&fit=crop&q=80"
          alt="Lecture et compréhension d'une fiche de paie"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* INTRO */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px 0' }}>
        <p style={{ fontSize: 17, lineHeight: 1.85, color: '#374151' }}>
          La fiche de paie est un document légalement obligatoire remis par l'employeur à chaque versement de salaire (Art. L.3243-2 du Code du travail). Elle doit contenir un certain nombre de mentions obligatoires et détailler l'ensemble des éléments qui composent votre rémunération. Voici comment décrypter chacune de ses parties.
        </p>
      </section>

      {/* GUIDE EN 5 SECTIONS */}
      <div id="guide" className="content-wrap" style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 72px' }}>
        {SECTIONS.map((section, idx) => (
          <section key={idx} style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: section.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, flexShrink: 0 }}>
                {section.num}
              </div>
              <h2 className="section-title" style={{ fontSize: 24, fontWeight: 900, color: '#111827', margin: 0 }}>{section.titre}</h2>
            </div>
            <div style={{ background: section.bg, borderRadius: 14, border: `1px solid ${section.color}30`, overflow: 'hidden' }}>
              {section.items.map((item, i) => (
                <div key={i} style={{ padding: '18px 24px', borderBottom: i < section.items.length - 1 ? `1px solid ${section.color}20` : 'none', display: 'flex', gap: 16 }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: section.color, marginTop: 6 }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: section.color, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.7 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* ENCADRÉ : Brut ≠ Net ≠ Coût employeur */}
        <section style={{ marginBottom: 56 }}>
          <h2 className="section-title" style={{ fontSize: 28, fontWeight: 900, marginBottom: 24 }}>Brut ≠ Net ≠ Coût employeur : les 3 salaires à connaître</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { titre: 'Salaire BRUT', emoji: '📊', color: '#1d4ed8', desc: 'La base contractuelle. C\'est le montant inscrit dans votre contrat de travail. Il inclut les cotisations sociales salariales et patronales.', ex: 'Ex : 2 500 €' },
              { titre: 'Salaire NET', emoji: '💳', color: '#059669', desc: 'Ce que vous recevez sur votre compte. Brut moins les cotisations salariales et le prélèvement à la source.', ex: '≈ 1 930 €' },
              { titre: 'Coût EMPLOYEUR', emoji: '🏢', color: '#7c3aed', desc: 'Ce que l\'entreprise dépense réellement pour vous salarier. Net + toutes les cotisations patronales.', ex: '≈ 3 250 €' },
            ].map((c, i) => (
              <div key={i} style={{ background: 'white', border: `2px solid ${c.color}30`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{c.emoji}</div>
                <div style={{ fontWeight: 900, fontSize: 17, color: c.color, marginBottom: 8 }}>{c.titre}</div>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: 10 }}>{c.desc}</p>
                <div style={{ fontWeight: 800, fontSize: 15, color: c.color }}>{c.ex}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mentions obligatoires */}
        <section>
          <h2 className="section-title" style={{ fontSize: 28, fontWeight: 900, marginBottom: 20 }}>Les mentions obligatoires sur une fiche de paie</h2>
          <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.75, marginBottom: 20 }}>Depuis la loi Rebsamen de 2015 et ses décrets d'application, le bulletin de paie dit « simplifié » doit comporter :</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {[
              'Nom et adresse de l\'employeur + SIRET',
              'Code APE/NAF de l\'établissement',
              'Numéro de la convention collective',
              'Nom, emploi et classification du salarié',
              'Numéro de sécurité sociale',
              'Période et nombre d\'heures de travail',
              'Nature et montant des cotisations',
              'Montant de la CSG et de la CRDS',
              'Salaire brut et net avant impôt',
              'Taux et montant du prélèvement à la source',
              'Net à payer au salarié',
              'Date de versement du salaire',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', background: '#f9fafb', borderRadius: 8, fontSize: 14, color: '#374151' }}>
                <span style={{ color: '#6366f1', fontWeight: 700, flexShrink: 0 }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ARTICLES CONNEXES */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 64px' }}>
        <section>
          <h2 className="section-title" style={{ fontSize: 22, fontWeight: 800, marginBottom: 20, color: '#0f172a' }}>Articles connexes</h2>
          <div className="articles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { title: 'Salaire brut en net', href: '/salaire-brut-en-net', desc: 'Formule et taux de charges' },
              { title: 'Créer une fiche de paie', href: '/creer-une-fiche-de-paie', desc: 'Mentions obligatoires et étapes' },
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
          "@type": "Article",
          "headline": "Comment lire une fiche de paie ? Guide complet 2026",
          "description": "Comprendre sa fiche de paie en 2026 : salaire brut, cotisations salariales et patronales, CSG, CRDS, prélèvement à la source, net à payer.",
          "publisher": { "@type": "Organization", "name": "Bulletin Facile", "url": "https://bulletinfacile.fr" }
        })}}
      />

      {/* CTA */}
      <section className="cta-box" style={{ background: 'linear-gradient(135deg, #312e81, #4338ca)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Générez maintenant un bulletin conforme et lisible</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Toutes les mentions obligatoires, tous les calculs vérifiés — en 30 secondes.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#1a1a2e', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Créer ma fiche de paie →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
