import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Combien coûte un salarié ? Charges patronales 2026 — Bulletin Facile',
  description: 'Calculez le coût réel d\'un salarié en 2026 : charges patronales, cotisations employeur, réduction Fillon. Tableau détaillé du coût employeur brut vs net.',
  alternates: { canonical: 'https://bulletinfacile.fr/combien-coute-un-salarie' },
};

const FAQ = [
  {
    q: 'Quelle est la différence entre salaire brut et coût employeur ?',
    a: "Le salaire brut est la rémunération brute du salarié avant déduction de ses cotisations salariales. Le coût employeur est le montant total que l'entreprise débourse : salaire brut + cotisations patronales, soit en moyenne 1,4 à 1,6 fois le brut selon le niveau de rémunération et l'application de la réduction Fillon.",
  },
  {
    q: 'Comment calculer la réduction Fillon ?',
    a: "La réduction Fillon (ou réduction générale de cotisations) est calculée selon la formule : Réduction = T × (1,6 × SMIC annuel / rémunération annuelle brute − 1), où T représente la somme des taux de cotisations éligibles (environ 0,3198 pour une entreprise de moins de 50 salariés). Elle est maximale au niveau du SMIC et devient nulle à 1,6 fois le SMIC.",
  },
  {
    q: "Y a-t-il des aides à l'embauche en 2026 ?",
    a: "Plusieurs dispositifs existent en 2026 : l'aide à l'embauche d'apprentis (réduction de cotisations spécifique), les exonérations ZFU/ZRR pour les entreprises en zones géographiques prioritaires, les aides pour l'embauche de travailleurs handicapés via l'Agefiph, et d'éventuels dispositifs temporaires selon les lois de finances. Les TPE/PME peuvent aussi bénéficier du FNAL réduit (0,10 % vs 0,50 %).",
  },
  {
    q: "Le coût employeur est-il déductible du bénéfice ?",
    a: "Oui. L'ensemble des rémunérations versées aux salariés, y compris les cotisations patronales obligatoires, constitue une charge déductible du résultat imposable de l'entreprise. En revanche, certaines participations aux résultats ou avantages en nature peuvent avoir un traitement fiscal spécifique.",
  },
];

const COTISATIONS_PAT = [
  { label: 'Maladie-maternité (sal. ≤ 2,5 SMIC)', taux: '7,00 %', base: 'Brut total' },
  { label: 'Maladie-maternité (sal. > 2,5 SMIC)', taux: '13,00 %', base: 'Brut total' },
  { label: 'Vieillesse plafonnée', taux: '8,55 %', base: 'Jusqu\'au PMSS (3 925 €)' },
  { label: 'Vieillesse déplafonnée', taux: '1,90 %', base: 'Brut total' },
  { label: 'AT/MP (taux moyen)', taux: '≈ 1,50 %', base: 'Brut total' },
  { label: 'Allocations familiales (sal. ≤ 3,5 SMIC)', taux: '3,45 %', base: 'Brut total' },
  { label: 'Allocations familiales (sal. > 3,5 SMIC)', taux: '5,25 %', base: 'Brut total' },
  { label: 'AGIRC-ARRCO T1 patronal', taux: '4,72 %', base: 'Jusqu\'au PMSS' },
  { label: 'CEG T1 patronal', taux: '1,29 %', base: 'Jusqu\'à 7 × PMSS' },
  { label: 'Chômage', taux: '4,05 %', base: 'Jusqu\'à 4 × PMSS' },
  { label: 'AGS (garantie salaires)', taux: '0,25 %', base: 'Jusqu\'à 4 × PMSS' },
  { label: 'FNAL (< 50 salariés)', taux: '0,10 %', base: 'Brut total' },
  { label: 'FNAL (≥ 50 salariés)', taux: '0,50 %', base: 'Brut total' },
];

export default function CombienCouteUnSalariePage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>
      <Nav />

      {/* HERO */}
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 55%, #047857 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Charges patronales — 2026
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>
            Combien coûte réellement un salarié ?
          </h1>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8, marginBottom: 16 }}>
            Dernière mise à jour : mars 2026
          </div>
          <p style={{ fontSize: 20, opacity: 0.9, marginBottom: 40, lineHeight: 1.6 }}>
            Charges patronales, réduction Fillon, exemple chiffré : calculez le coût employeur réel d'un recrutement en 2026.
          </p>
          <div className="hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, maxWidth: 600, margin: '0 auto' }}>
            {[
              { val: '× 1,4 à 1,6', label: 'Rapport coût / brut', sub: 'Selon le niveau de salaire' },
              { val: '~270 €', label: 'Réduction Fillon', sub: 'Pour 2 000 € brut au SMIC' },
              { val: '~2 550 €', label: 'Coût employeur', sub: 'Pour 2 000 € brut (< 50 sal.)' },
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
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=900&h=300&fit=crop&q=80"
          alt="Analyse du coût employeur et charges patronales"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="content-wrap" style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* La règle des 1,5 */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>La règle du "fois 1,5"</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            En pratique, le <strong>coût employeur d'un salarié est environ 1,4 à 1,6 fois son salaire brut</strong>. Pour un salarié payé 2 000 € brut mensuel, l'entreprise débourse entre 2 500 € et 3 000 € selon le secteur, la taille de l'entreprise et l'application des exonérations.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 24 }}>
            Ce ratio diminue pour les bas salaires grâce à la <strong>réduction générale de cotisations patronales (réduction Fillon)</strong>, qui peut réduire significativement le coût pour les postes proches du SMIC. Il augmente pour les hauts salaires, notamment au-dessus de 1,6 fois le SMIC où la réduction devient nulle.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { salaire: 'SMIC (1 802 €)', ratio: '× 1,35 env.', cout: '≈ 2 430 €', note: 'Avec réduction Fillon maximale' },
              { salaire: '2 000 € brut', ratio: '× 1,28 env.', cout: '≈ 2 550 €', note: 'Avec réduction Fillon partielle' },
              { salaire: '3 000 € brut', ratio: '× 1,45 env.', cout: '≈ 4 350 €', note: 'Sans réduction Fillon' },
              { salaire: '5 000 € brut', ratio: '× 1,52 env.', cout: '≈ 7 600 €', note: 'Cadre, tranches supérieures' },
            ].map((row, i) => (
              <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '16px' }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#065f46', marginBottom: 4 }}>{row.salaire}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#047857', marginBottom: 4 }}>{row.cout}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{row.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tableau cotisations patronales */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 8, color: '#111827' }}>Cotisations patronales 2026</h2>
          <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 24 }}>Taux applicables pour les salariés du secteur privé non agricole</p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#047857', color: 'white' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Cotisation</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700 }}>Taux patronal</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Assiette</th>
                </tr>
              </thead>
              <tbody>
                {COTISATIONS_PAT.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f0fdf4', borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '11px 16px', fontWeight: 500, color: '#111827' }}>{row.label}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'right', fontWeight: 700, color: '#047857' }}>{row.taux}</td>
                    <td style={{ padding: '11px 16px', color: '#6b7280', fontSize: 13 }}>{row.base}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>PMSS 2026 : 3 925 €/mois. AT/MP : taux variable selon l'activité et l'historique de sinistralité de l'entreprise.</p>
        </section>

        {/* Réduction Fillon */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>La réduction générale Fillon</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 16 }}>
            La <strong>réduction générale de cotisations patronales</strong> (dite réduction Fillon) permet aux employeurs de réduire leurs charges pour les salaires jusqu'à 1,6 fois le SMIC. C'est le principal dispositif d'allègement du coût du travail en France.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[
              { titre: 'Principe', desc: 'La réduction est maximale au SMIC (environ 33 % du brut) et diminue progressivement jusqu\'à s\'annuler à 1,6 SMIC mensuel.' },
              { titre: 'Cotisations concernées', desc: 'La réduction s\'applique sur les cotisations maladie, vieillesse, allocations familiales, FNAL et, depuis 2019, sur les cotisations de retraite complémentaire.' },
              { titre: 'Calcul mensuel', desc: 'La réduction est calculée mensuellement et imputée en priorité sur les cotisations dues à l\'URSSAF, puis sur les cotisations de retraite complémentaire.' },
            ].map((card, i) => (
              <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '18px' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#065f46', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.titre}</h3>
                <p style={{ fontSize: 14, color: '#4b5563', margin: 0, lineHeight: 1.7 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Exemple chiffré */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Exemple chiffré : 2 000 € brut</h2>
          <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 20 }}>Salarié non-cadre, entreprise de moins de 50 salariés, secteur privé</p>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { label: 'Salaire brut mensuel', val: '2 000,00 €', type: 'base' },
              { label: '+ Cotisations patronales brutes estimées', val: '+ 820,00 €', type: 'add' },
              { label: '= Coût employeur avant allègements', val: '= 2 820,00 €', type: 'mid' },
              { label: '— Réduction Fillon estimée', val: '− 270,00 €', type: 'deduct' },
              { label: '= Coût employeur net total', val: '≈ 2 550,00 €', type: 'result' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 20px', borderBottom: i < 4 ? '1px solid #d1fae5' : 'none', background: row.type === 'result' ? '#dcfce7' : row.type === 'base' ? '#bbf7d0' : row.type === 'mid' ? '#f0fdf4' : 'transparent' }}>
                <span style={{ fontSize: 14, color: row.type === 'deduct' ? '#dc2626' : row.type === 'add' ? '#1d4ed8' : '#065f46', fontWeight: row.type === 'result' || row.type === 'base' ? 700 : 400 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: row.type === 'deduct' ? '#dc2626' : row.type === 'add' ? '#1d4ed8' : '#065f46' }}>{row.val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>* Estimation indicative. Les montants exacts dépendent du taux AT/MP, de la convention collective et du nombre exact de salariés.</p>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="section-title" style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q} <span style={{ color: '#047857', fontSize: 20, lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>+</span>
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
              { title: 'Réduction Fillon', href: '/reduction-fillon', desc: 'Calcul et coefficient 2026' },
              { title: 'SMIC 2026', href: '/smic-2026', desc: 'Montant brut, net et horaire' },
              { title: 'Heures supplémentaires', href: '/heures-supplementaires-fiche-de-paie', desc: 'Déductions patronales TEPA' },
              { title: 'Salaire brut en net', href: '/salaire-brut-en-net', desc: 'Formule et taux de charges' },
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
        <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>Calculez le coût exact de votre recrutement</h2>
        <p style={{ opacity: 0.85, fontSize: 17, marginBottom: 32 }}>Notre générateur calcule automatiquement les cotisations patronales et la réduction Fillon selon le profil exact de votre salarié.</p>
        <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
          Simuler le coût employeur →
        </Link>
      </section>

      <Footer />
    </div>
  );
}
