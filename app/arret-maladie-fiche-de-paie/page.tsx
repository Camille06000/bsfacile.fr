import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Arrêt maladie sur la fiche de paie 2026 : IJSS, subrogation, maintien de salaire — Bulletin Facile',
  description: 'Arrêt maladie 2026 : indemnités journalières (IJSS), délai de carence, maintien de salaire, subrogation. Comment traiter l\'absence maladie sur la fiche de paie.',
  alternates: { canonical: 'https://bulletinfacile.fr/arret-maladie-fiche-de-paie' },
};

const FAQ = [
  {
    q: 'L\'employeur est-il obligé de maintenir le salaire pendant un arrêt maladie ?',
    a: 'Non, l\'obligation légale de maintien de salaire s\'applique uniquement aux salariés ayant au moins un an d\'ancienneté (loi de mensualisation de 1978). En dessous d\'un an, seules les IJSS sont versées par la CPAM. Certaines conventions collectives prévoient des dispositions plus favorables dès les premiers mois d\'ancienneté.',
  },
  {
    q: 'Comment calculer les IJSS en cas d\'arrêt maladie ?',
    a: 'Les IJSS sont égales à 50 % du salaire journalier de base (SJB). Le SJB est calculé comme suit : moyenne des 3 derniers salaires bruts perçus avant l\'arrêt, divisée par 91,25. Le montant journalier est plafonné à environ 236 € (1,8 × PMSS / 30,42 par jour en 2026). En cas de 3 enfants à charge, le taux passe à 66,67 % à partir du 31e jour.',
  },
  {
    q: 'Que se passe-t-il après 360 jours d\'arrêt ?',
    a: 'Au-delà de 360 jours d\'indemnités journalières sur 3 ans glissants, le salarié peut basculer en invalidité (pension d\'invalidité versée par la CPAM) ou voir ses droits aux IJSS épuisés. Si la maladie est reconnue comme longue durée (ALD), les droits peuvent être prolongés jusqu\'à 3 ans consécutifs. Le salarié doit contacter la CPAM pour évaluer sa situation.',
  },
  {
    q: 'L\'arrêt maladie est-il traité différemment selon la cause (AT vs maladie ordinaire) ?',
    a: 'Oui, les accidents du travail (AT) et maladies professionnelles (MP) bénéficient d\'un régime plus favorable : pas de délai de carence, IJSS égales à 60 % du SJB pendant les 28 premiers jours puis 80 % au-delà, durée illimitée. Le taux de cotisation AT/MP est à la charge exclusive de l\'employeur et varie selon le secteur d\'activité.',
  },
];

export default function ArretMaladieFicheDePayePage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>

      <Nav />

      {/* HERO */}
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #991b1b 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Droit social 2026 — Sécurité Sociale
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>
            Arrêt maladie sur la fiche de paie
          </h1>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8, marginBottom: 16 }}>
            Dernière mise à jour : mars 2026
          </div>
          <p style={{ fontSize: 20, opacity: 0.9, marginBottom: 40 }}>
            IJSS, subrogation, maintien de salaire : tout comprendre en 2026
          </p>
          <div className="hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 16, maxWidth: 720, margin: '0 auto' }}>
            {[
              { val: '3 jours', label: 'Délai de carence', sub: 'Secteur privé' },
              { val: '50 %', label: 'Taux IJSS', sub: 'Du salaire journalier de base' },
              { val: '≈ 236 €', label: 'Plafond journalier', sub: '1,8 × PMSS / 30,42' },
              { val: '360 jours', label: 'Durée maximale', sub: 'Sur 3 ans glissants' },
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
      <div className="hero-img-wrap" style={{ maxWidth: 900, margin: '-32px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=300&fit=crop&q=80"
          alt="Arrêt maladie et fiche de paie"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="content-wrap" style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Délai de carence */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Le délai de carence</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            Dans le secteur privé, un <strong>délai de carence de 3 jours</strong> s'applique à tout arrêt maladie ordinaire. Pendant ces 3 premiers jours, le salarié ne perçoit ni IJSS de la CPAM, ni maintien de salaire de l'employeur (sauf dispositions conventionnelles plus favorables).
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#991b1b', margin: '0 0 8px' }}>Règle légale (droit commun)</p>
              <p style={{ fontSize: 14, color: '#7f1d1d', lineHeight: 1.65, margin: 0 }}>
                3 jours de carence sans indemnisation. S'applique à chaque nouvel arrêt, sauf rechute dans les 48 h.
              </p>
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '18px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#166534', margin: '0 0 8px' }}>Dispositions conventionnelles</p>
              <p style={{ fontSize: 14, color: '#14532d', lineHeight: 1.65, margin: 0 }}>
                Certaines conventions collectives suppriment le délai de carence ou le réduisent à 1 jour. Vérifiez votre CCN.
              </p>
            </div>
          </div>
        </section>

        {/* IJSS */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Les Indemnités Journalières de Sécurité Sociale (IJSS)</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            À partir du 4e jour d'arrêt, la <strong>Caisse Primaire d'Assurance Maladie (CPAM)</strong> verse des indemnités journalières au salarié (ou à l'employeur en cas de subrogation).
          </p>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Calcul des IJSS maladie ordinaire</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { step: '1', label: 'Salaire Journalier de Base (SJB)', val: 'Moyenne des 3 derniers salaires bruts ÷ 91,25' },
                { step: '2', label: 'Taux d\'indemnisation', val: '50 % du SJB (ou 66,67 % si 3 enfants à charge à partir du 31e jour)' },
                { step: '3', label: 'Plafond journalier 2026', val: 'Environ 236 € par jour (1,8 × PMSS ÷ 30,42)' },
                { step: '4', label: 'Durée maximale', val: '360 jours sur une période de 3 ans glissants' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#991b1b', color: 'white', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{row.step}</div>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{row.label} : </span>
                    <span style={{ fontSize: 14, color: '#4b5563' }}>{row.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Maintien de salaire */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Maintien de salaire par l'employeur</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
            En complément des IJSS, l'employeur est tenu de maintenir une partie du salaire selon l'ancienneté du salarié, conformément à la <strong>loi de mensualisation du 19 janvier 1978</strong> et à l'Accord National Interprofessionnel (ANI).
          </p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb', marginBottom: 12 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#991b1b', color: 'white' }}>
                  {['Ancienneté', 'Maintien à 90 % du brut', 'Maintien à 66,67 % du brut', 'Total maintien'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { anc: '1 à 5 ans', p90: '30 jours', p66: '30 jours', total: '60 jours' },
                  { anc: '6 à 10 ans', p90: '40 jours', p66: '40 jours', total: '80 jours' },
                  { anc: '11 à 15 ans', p90: '50 jours', p66: '50 jours', total: '100 jours' },
                  { anc: '+ de 15 ans', p90: '60 jours', p66: '60 jours', total: '120 jours' },
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111827' }}>{row.anc}</td>
                    <td style={{ padding: '12px 16px', color: '#059669', fontWeight: 500 }}>{row.p90}</td>
                    <td style={{ padding: '12px 16px', color: '#d97706', fontWeight: 500 }}>{row.p66}</td>
                    <td style={{ padding: '12px 16px', color: '#374151' }}>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: '#6b7280' }}>Le maintien s'entend comme complément aux IJSS. L'employeur verse la différence entre le salaire habituel et les IJSS. Ces durées s'appliquent par période de 12 mois glissants.</p>
        </section>

        {/* Subrogation */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>La subrogation</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            La <strong>subrogation</strong> est le mécanisme par lequel l'employeur maintient le salaire pendant l'arrêt et perçoit directement les IJSS de la CPAM à la place du salarié. Elle permet au salarié de continuer à recevoir son salaire sans interruption.
          </p>
          <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 10, padding: '18px 20px', marginBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#92400e', margin: '0 0 6px' }}>Comment apparaît-elle sur le bulletin ?</p>
            <p style={{ fontSize: 14, color: '#78350f', lineHeight: 1.7, margin: 0 }}>
              Sur le bulletin de paie, on distingue une <strong>déduction du salaire brut</strong> correspondant aux jours d'absence, et une <strong>ligne IJSS subrogées en positif</strong>. Le net versé correspond au maintien de salaire garanti par l'employeur et la convention collective.
            </p>
          </div>
        </section>

        {/* Exemple chiffré */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Exemple chiffré sur bulletin (2 500 € brut, 10 jours d'absence)</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 24 }}>
            Salarié avec 6 ans d'ancienneté, rémunéré 2 500 € brut/mois, absent 10 jours ouvrés (dont 3 jours de carence) :
          </p>
          <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { label: 'Salaire brut mensuel théorique', val: '2 500,00 €', type: 'base' },
              { label: 'Jours ouvrés dans le mois (hypothèse)', val: '21 jours', type: 'neutral' },
              { label: '— Déduction absence brute (10 j)', val: '− 2 500 / 21 × 10 = − 1 190,48 €', type: 'deduct' },
              { label: 'Brut après déduction absence', val: '1 309,52 €', type: 'neutral' },
              { label: '+ IJSS subrogées (7 jours indemnisés)', val: '+ ~410,00 €', type: 'add' },
              { label: 'Brut de maintien total', val: '1 719,52 €', type: 'highlight' },
              { label: 'Net approximatif versé au salarié', val: '≈ 1 360 €', type: 'result' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderBottom: '1px solid #ffe4e6', background: row.type === 'result' ? '#991b1b' : row.type === 'highlight' ? '#ffe4e6' : row.type === 'base' ? '#fff1f2' : 'white' }}>
                <span style={{ fontSize: 14, color: row.type === 'result' ? 'white' : row.type === 'deduct' ? '#dc2626' : row.type === 'add' ? '#059669' : '#0f172a', fontWeight: row.type === 'result' || row.type === 'highlight' || row.type === 'base' ? 700 : 400 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.type === 'result' ? 'white' : row.type === 'deduct' ? '#dc2626' : row.type === 'add' ? '#059669' : '#991b1b', fontFamily: 'monospace' }}>{row.val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>* Estimation indicative. Les IJSS exactes dépendent du salaire des 3 mois précédents. Le taux de cotisations salariales et le PAS peuvent varier.</p>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes sur l'arrêt maladie</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#991b1b', fontSize: 20, lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>+</span>
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
              { title: 'Heures supplémentaires', href: '/heures-supplementaires-fiche-de-paie', desc: 'Calcul et exonération TEPA' },
              { title: 'Solde de tout compte', href: '/solde-de-tout-compte', desc: 'Documents et indemnités de départ' },
              { title: 'Créer une fiche de paie', href: '/creer-une-fiche-de-paie', desc: 'Mentions obligatoires et étapes' },
              { title: 'Net social', href: '/net-social', desc: 'Définition et calcul 2026' },
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
      <section className="cta-box" style={{ background: 'linear-gradient(135deg, #450a0a, #991b1b)', color: 'white', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Générez un bulletin avec absence maladie</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Bulletin Facile prend en charge la subrogation, les IJSS et le maintien de salaire directement sur le bulletin.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Créer mon bulletin de paie →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
