import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Montant net social sur la fiche de paie : définition et calcul 2026 — Bulletin Facile',
  description: 'Le montant net social est une mention obligatoire sur les bulletins de salaire depuis 2024. Découvrez sa définition, son calcul et son rôle pour les aides sociales (RSA, APL).',
  alternates: { canonical: 'https://bulletinfacile.fr/net-social' },
};

const FAQ = [
  {
    q: 'Depuis quand le net social est-il obligatoire ?',
    a: 'Le montant net social est obligatoire sur tous les bulletins de paie depuis le 1er juillet 2023 (à titre expérimental), puis rendu définitivement obligatoire à partir du 1er janvier 2024 par l\'arrêté du 31 janvier 2023. Son absence constitue une irrégularité susceptible d\'entraîner des sanctions pour l\'employeur.',
  },
  {
    q: 'Pourquoi le net social diffère-t-il du net à payer ?',
    a: 'Le net à payer correspond au salaire effectivement versé sur le compte bancaire du salarié, après toutes les déductions y compris le prélèvement à la source (PAS). Le net social, lui, exclut le PAS et réintègre la CSG non déductible et la CRDS. C\'est une base de calcul spécifique pour les organismes sociaux (CAF, France Travail), qui ne tient pas compte de la fiscalisation du revenu.',
  },
  {
    q: 'Le net social sert-il à calculer les droits au RSA ?',
    a: 'Oui. Le montant net social est la référence utilisée par la CAF pour calculer les droits au RSA, à la prime d\'activité et aux APL. Il remplace l\'ancienne déclaration manuelle des revenus par une transmission automatique via la DSN. Cela vise à simplifier les démarches et à réduire les erreurs de déclaration de ressources.',
  },
  {
    q: 'Comment Bulletin Facile calcule-t-il le net social ?',
    a: 'Bulletin Facile calcule automatiquement le net social à partir du salaire brut saisi et des taux de cotisations en vigueur. La formule appliquée est : brut − toutes cotisations salariales obligatoires + CSG non déductible + CRDS. Le montant apparaît sur le bulletin généré dans la zone réglementaire prévue à cet effet.',
  },
];

export default function NetSocialPage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>

      <Nav />

      {/* HERO */}
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Obligatoire depuis janvier 2024 — Arrêté du 31 janvier 2023
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>
            Le montant net social
          </h1>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8, marginBottom: 16 }}>
            Dernière mise à jour : mars 2026
          </div>
          <p style={{ fontSize: 20, opacity: 0.9, marginBottom: 40 }}>
            Définition, calcul et différence avec le net à payer en 2026
          </p>
          <div className="hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, maxWidth: 720, margin: '0 auto' }}>
            {[
              { val: 'Jan. 2024', label: 'Obligation légale', sub: 'Sur tous les bulletins' },
              { val: 'RSA / APL', label: 'Sert à calculer', sub: 'Les aides CAF' },
              { val: '≈ 1 643 €', label: 'Net social pour 2 000 € brut', sub: 'Estimation 2026' },
              { val: 'DSN', label: 'Transmission automatique', sub: 'Vers la CAF' },
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
      <div className="hero-img-wrap" style={{ maxWidth: 900, margin: '-32px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <img
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&h=300&fit=crop&q=80"
          alt="Net social sur bulletin de salaire, calcul droits sociaux"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="content-wrap" style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Définition */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Qu'est-ce que le montant net social ?</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Le <strong>montant net social</strong> est une nouvelle mention obligatoire introduite sur les bulletins de paie depuis le <strong>1er janvier 2024</strong> (arrêté du 31 janvier 2023). Il représente le revenu net du salarié après déduction de l'ensemble des cotisations salariales obligatoires, à l'exception de la CSG non déductible et de la CRDS.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Son objectif est de fournir aux organismes de protection sociale (CAF, France Travail) une <strong>base de calcul standardisée et automatique</strong> pour déterminer les droits aux aides sociales : RSA, prime d'activité, APL, allocations chômage, etc.
          </p>
          <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" stroke="#3730a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p style={{ fontSize: 15, color: '#3730a3', fontWeight: 700, margin: '0 0 6px' }}>Remplacement de l'ancienne déclaration manuelle</p>
                <p style={{ fontSize: 14, color: '#312e81', lineHeight: 1.7, margin: 0 }}>
                  Avant 2024, les bénéficiaires d'aides devaient déclarer manuellement leurs revenus à la CAF. Avec le net social transmis via la DSN, la déclaration devient automatique et fiable, réduisant les erreurs et les indus.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tableau comparatif Net à payer / Net social / Net fiscal */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Net à payer, net social, net fiscal : quelles différences ?</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            Ces trois notions figurent sur le bulletin de paie mais ne correspondent pas aux mêmes réalités. Il est important de ne pas les confondre.
          </p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#3730a3', color: 'white' }}>
                  {['Notion', 'Définition', 'Déductions incluses', 'Usage principal'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    notion: 'Net à payer',
                    def: 'Salaire effectivement versé sur compte bancaire',
                    ded: 'Toutes cotisations + PAS',
                    usage: 'Salaire réellement perçu',
                    highlight: false,
                  },
                  {
                    notion: 'Net social',
                    def: 'Salaire net après cotisations obligatoires (hors CSG non déductible et CRDS)',
                    ded: 'Cotisations salariales obligatoires sauf CSG non déd. et CRDS',
                    usage: 'Base CAF, RSA, APL, chômage',
                    highlight: true,
                  },
                  {
                    notion: 'Net fiscal',
                    def: 'Base de calcul de l\'impôt sur le revenu',
                    ded: 'Cotisations salariales + abattement 10 %',
                    usage: 'Déclaration fiscale (IR)',
                    highlight: false,
                  },
                ].map((row, i) => (
                  <tr key={i} style={{ background: row.highlight ? '#eef2ff' : i % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', fontWeight: row.highlight ? 800 : 600, color: row.highlight ? '#3730a3' : '#111827' }}>{row.notion}</td>
                    <td style={{ padding: '12px 16px', color: '#374151', fontSize: 13 }}>{row.def}</td>
                    <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: 13 }}>{row.ded}</td>
                    <td style={{ padding: '12px 16px', color: row.highlight ? '#3730a3' : '#374151', fontWeight: row.highlight ? 600 : 400, fontSize: 13 }}>{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Formule de calcul */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Formule de calcul du net social</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            La formule officielle du montant net social est la suivante :
          </p>
          <div style={{ background: '#f8fafc', border: '2px solid #3730a3', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
            <p style={{ fontFamily: 'monospace', fontSize: 15, color: '#0f172a', background: '#e0e7ff', padding: '14px 18px', borderRadius: 8, margin: '0 0 16px', lineHeight: 1.6 }}>
              Net social = Rémunération brute<br/>
              − Cotisations salariales obligatoires<br/>
              + CSG non déductible (2,40 %)<br/>
              + CRDS (0,50 %)
            </p>
            <p style={{ fontSize: 14, color: '#475569', margin: 0, lineHeight: 1.65 }}>
              En pratique, le net social est supérieur au net à payer car il ne tient pas compte du prélèvement à la source (PAS), et réintègre la part non déductible de la CSG et la CRDS.
            </p>
          </div>
        </section>

        {/* Exemple chiffré */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Exemple chiffré pour 2 000 € brut</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 24 }}>
            Voici comment se décompose le passage du brut au net social, puis au net à payer, pour un salarié non-cadre au secteur privé :
          </p>
          <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { label: 'Salaire brut mensuel', val: '2 000,00 €', type: 'base' },
              { label: '— Cotisations salariales totales (environ 20,75 %)', val: '− 415,00 €', type: 'deduct' },
              { label: 'dont CSG non déductible (2,40 %)', val: '(soit ~46 €)', type: 'sub' },
              { label: 'dont CRDS (0,50 %)', val: '(soit ~12 €)', type: 'sub' },
              { label: '+ Réintégration CSG non déd. + CRDS', val: '+ 58,00 €', type: 'add' },
              { label: '= NET SOCIAL', val: '≈ 1 643 €', type: 'result2' },
              { label: '— Prélèvement à la source (hypothèse 8 %)', val: '− ~131 €', type: 'deduct' },
              { label: '= NET À PAYER', val: '≈ 1 512 €', type: 'result' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: row.type === 'sub' ? '8px 20px 8px 40px' : '13px 20px', borderBottom: '1px solid #ede9fe', background: row.type === 'result' ? '#3730a3' : row.type === 'result2' ? '#e0e7ff' : row.type === 'base' ? '#f5f3ff' : 'white' }}>
                <span style={{ fontSize: row.type === 'sub' ? 13 : 14, color: row.type === 'result' ? 'white' : row.type === 'deduct' ? '#dc2626' : row.type === 'add' ? '#059669' : row.type === 'sub' ? '#6b7280' : '#0f172a', fontWeight: row.type === 'result' || row.type === 'result2' || row.type === 'base' ? 700 : row.type === 'sub' ? 400 : 400, fontStyle: row.type === 'sub' ? 'italic' : 'normal' }}>{row.label}</span>
                <span style={{ fontSize: row.type === 'sub' ? 13 : 14, fontWeight: 700, color: row.type === 'result' ? 'white' : row.type === 'result2' ? '#3730a3' : row.type === 'deduct' ? '#dc2626' : row.type === 'add' ? '#059669' : '#3730a3', fontFamily: 'monospace' }}>{row.val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>* Estimation indicative. Le taux de PAS et les cotisations exactes dépendent de la situation individuelle du salarié.</p>
        </section>

        {/* Où trouver */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Où trouver le net social sur le bulletin ?</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Depuis le 1er janvier 2024, le montant net social doit figurer obligatoirement sur le bulletin de paie, dans une zone clairement identifiée. Il apparaît généralement <strong>en bas du bulletin, avant le montant net à payer</strong>.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
            {[
              {
                icon: (
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <rect x="4" y="2" width="16" height="20" rx="2" stroke="#3730a3" strokeWidth="2"/>
                    <path d="M8 7h8M8 11h8M8 15h5" stroke="#3730a3" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Zone réglementaire obligatoire',
                desc: 'Libellé exact : "Montant net social" suivi du montant en euros, sur une ligne dédiée et mise en évidence.',
              },
              {
                icon: (
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3730a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: 'Transmission automatique à la CAF',
                desc: 'Ce montant est transmis mensuellement à la CAF via la DSN, sans démarche supplémentaire du salarié.',
              },
              {
                icon: (
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="#3730a3" strokeWidth="2"/>
                    <path d="M12 8v4m0 4h.01" stroke="#3730a3" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Mention bien distincte',
                desc: 'Le net social doit être visuellement distingué du net à payer pour éviter toute confusion. Bulletin Facile respecte cette présentation.',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, padding: '22px 18px' }}>
                <div style={{ marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6b7280', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes sur le net social</h2>
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

      {/* ARTICLES CONNEXES */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 22, fontWeight: 800, marginBottom: 20, color: '#0f172a' }}>Articles connexes</h2>
          <div className="articles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { title: 'Salaire brut en net', href: '/salaire-brut-en-net', desc: 'Formule et taux de charges' },
              { title: 'Prélèvement à la source', href: '/prelevement-a-la-source', desc: 'Taux et calcul sur le bulletin' },
              { title: 'Comment lire une fiche de paie', href: '/comment-lire-fiche-de-paie', desc: 'Décryptez chaque ligne du bulletin' },
              { title: 'Créer une fiche de paie', href: '/creer-une-fiche-de-paie', desc: 'Mentions obligatoires et étapes' },
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
      <section className="cta-box" style={{ background: 'linear-gradient(135deg, #1e1b4b, #3730a3)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Générez un bulletin avec net social conforme</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Bulletin Facile affiche le montant net social obligatoire sur chaque bulletin généré, conforme à la réglementation 2026.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Générer mon bulletin de paie →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
