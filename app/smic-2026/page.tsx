import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SMIC 2026 : montant brut, net et horaire — Bulletin Facile',
  description: 'SMIC 2026 : 1 801,80 € brut mensuel, 11,88 €/heure. Calculez votre salaire net à partir du SMIC, avec cotisations URSSAF et prélèvement à la source.',
  alternates: { canonical: 'https://bulletinfacile.fr/smic-2026' },
};

const FAQ = [
  { q: 'Quel est le montant du SMIC 2026 ?', a: 'Le SMIC mensuel brut 2026 est de 1 801,80 € pour 151,67 heures mensuelles (35h/semaine). Le taux horaire brut est de 11,88 €/h. Le SMIC net est d\'environ 1 426 € après déduction des cotisations salariales.' },
  { q: 'Le SMIC va-t-il augmenter en 2026 ?', a: 'Le SMIC est revalorisé automatiquement lorsque l\'inflation dépasse 2 % sur les 12 derniers mois. Une revalorisation peut intervenir à tout moment en cours d\'année. Bulletin Facile intègre immédiatement tout changement officiel.' },
  { q: 'Quelle est la différence entre SMIC brut et SMIC net ?', a: 'Le SMIC brut (1 801,80 €) est le salaire avant déduction des cotisations salariales. Le SMIC net est obtenu après déduction de la CSG, CRDS, vieillesse, complémentaire santé et autres cotisations — soit environ 20,6 % de charges. Le net approximatif est de 1 426 €.' },
  { q: 'Le SMIC s\'applique-t-il aux apprentis ?', a: 'Non. Les apprentis perçoivent un salaire calculé en pourcentage du SMIC selon leur âge et leur année d\'apprentissage (27 % à 100 % du SMIC). Ce calcul est différent des salariés en CDI ou CDD.' },
  { q: 'Comment vérifier que mon salaire est bien au SMIC ?', a: 'Comparez votre salaire brut mensuel avec 1 801,80 €. Si votre contrat est à temps partiel, calculez le prorata : SMIC × (heures contractuelles / 151,67). Utilisez notre générateur pour vérifier en 30 secondes.' },
];

export default function Smic2026Page() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#1a1a2e' }}>

      <Nav />

      {/* HERO */}
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            📅 Mis à jour — 2026
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>
            SMIC 2026
          </h1>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8, marginBottom: 16 }}>
            Dernière mise à jour : mars 2026
          </div>
          <p style={{ fontSize: 22, opacity: 0.9, marginBottom: 40 }}>
            Montant, calcul du net, horaire et tout ce qu'il faut savoir
          </p>

          {/* GRANDS CHIFFRES SMIC */}
          <div className="hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, maxWidth: 700, margin: '0 auto' }}>
            {[
              { val: '1 801,80 €', label: 'Brut mensuel', sub: '151,67 h / mois' },
              { val: '11,88 €', label: 'Taux horaire brut', sub: '35h/semaine' },
              { val: '≈ 1 426 €', label: 'Net mensuel estimé', sub: 'Hors PAS' },
              { val: '21 621,60 €', label: 'Brut annuel', sub: '12 mois' },
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
      <div className="hero-img-wrap" style={{ maxWidth: 900, margin: '-32px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=300&fit=crop&q=80"
          alt="SMIC 2026 salaire minimum France"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="content-wrap" style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Qu'est-ce que le SMIC */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Qu'est-ce que le SMIC ?</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Le <strong>Salaire Minimum Interprofessionnel de Croissance (SMIC)</strong> est le salaire minimum légal en France, en-dessous duquel aucun employeur ne peut rémunérer un salarié. Il est fixé par décret et révisé au minimum une fois par an, le 1er janvier.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151' }}>
            En 2026, le SMIC brut mensuel est de <strong>1 801,80 €</strong> pour un temps plein (35h/semaine soit 151,67 heures mensuelles). Ce montant correspond à un taux horaire brut de <strong>11,88 €</strong>.
          </p>
        </section>

        {/* Tableau évolution */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 24, color: '#111827' }}>Évolution du SMIC ces dernières années</h2>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#1d4ed8', color: 'white' }}>
                  {['Année', 'Taux horaire brut', 'Mensuel brut (151,67h)', 'Évolution'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { year: '2026', h: '11,88 €', m: '1 801,80 €', e: '—', current: true },
                  { year: '2025', h: '11,88 €', m: '1 801,80 €', e: '+2,2 %', current: false },
                  { year: '2024', h: '11,65 €', m: '1 766,92 €', e: '+1,1 %', current: false },
                  { year: '2023', h: '11,52 €', m: '1 747,20 €', e: '+1,7 %', current: false },
                  { year: '2022', h: '11,07 €', m: '1 678,95 €', e: '+8,0 %', current: false },
                ].map((row, i) => (
                  <tr key={row.year} style={{ background: row.current ? '#eff6ff' : i % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', fontWeight: row.current ? 800 : 500, color: row.current ? '#1d4ed8' : '#111827' }}>{row.year} {row.current && '✓'}</td>
                    <td style={{ padding: '12px 16px', fontWeight: row.current ? 700 : 400 }}>{row.h}</td>
                    <td style={{ padding: '12px 16px', fontWeight: row.current ? 700 : 400 }}>{row.m}</td>
                    <td style={{ padding: '12px 16px', color: '#6b7280' }}>{row.e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SMIC brut → net */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20 }}>SMIC brut → net : comment ça se calcule ?</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 24 }}>
            Pour obtenir le <strong>SMIC net</strong>, il faut déduire du brut l'ensemble des cotisations salariales. En 2026, pour un non-cadre à temps plein, le passage du brut au net s'effectue ainsi :
          </p>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { label: 'SMIC brut mensuel', val: '1 801,80 €', type: 'base' },
              { label: '— Vieillesse plafonnée (6,90 %)', val: '− 124,32 €', type: 'deduct' },
              { label: '— Complémentaire santé salarié', val: '− ~20,00 €', type: 'deduct' },
              { label: '— AGIRC-ARRCO T1 (3,15 %)', val: '− 56,76 €', type: 'deduct' },
              { label: '— CEG T1 (0,86 %)', val: '− 15,50 €', type: 'deduct' },
              { label: '— CSG/CRDS déductible (6,80 %)', val: '− 119,75 €', type: 'deduct' },
              { label: '— CSG/CRDS non déductible (2,90 %)', val: '− 51,08 €', type: 'deduct' },
              { label: '= NET AVANT PAS (estimé)', val: '≈ 1 426 €', type: 'result' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid #d1fae5', background: row.type === 'result' ? '#dcfce7' : row.type === 'base' ? '#bbf7d0' : 'transparent' }}>
                <span style={{ fontSize: 14, color: row.type === 'deduct' ? '#dc2626' : '#065f46', fontWeight: row.type === 'result' || row.type === 'base' ? 700 : 400 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.type === 'deduct' ? '#dc2626' : '#065f46' }}>{row.val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 12 }}>* Estimation indicative. Le montant exact dépend du taux PAS, de la mutuelle et de la convention collective.</p>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center' }}>Questions fréquentes sur le SMIC 2026</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: '0', overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#1d4ed8', fontSize: 20, lineHeight: 1 }}>+</span>
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
              { title: 'Créer une fiche de paie', href: '/creer-une-fiche-de-paie', desc: 'Mentions obligatoires et étapes' },
              { title: 'Réduction Fillon', href: '/reduction-fillon', desc: 'Allègement général au SMIC' },
              { title: 'Combien coûte un salarié', href: '/combien-coute-un-salarie', desc: 'Charges patronales 2026' },
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
      <section className="cta-box" style={{ background: 'linear-gradient(135deg, #064e3b, #065f46)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Calculez votre salaire net au SMIC en 30 secondes</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Saisissez 1 801,80 € dans notre générateur et obtenez immédiatement le bulletin complet.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#1a1a2e', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Générer le bulletin au SMIC →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
