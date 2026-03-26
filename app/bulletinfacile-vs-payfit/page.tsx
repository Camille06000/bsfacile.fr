import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Bulletin Facile vs PayFit 2026 : comparaison tarifs, fonctionnalités — Bulletin Facile',
  description: 'Bulletin Facile ou PayFit pour vos bulletins de salaire ? Comparaison honnête des tarifs, fonctionnalités, facilité d\'utilisation. Tableau complet 2026.',
  alternates: { canonical: 'https://bulletinfacile.fr/bulletinfacile-vs-payfit' },
};

const FAQ = [
  {
    q: 'Quelles sont les principales différences entre Bulletin Facile et PayFit ?',
    a: 'Bulletin Facile est une solution à l\'acte, sans abonnement, à 8,90 € par bulletin. PayFit est un logiciel RH complet facturé en abonnement mensuel (environ 80 à 150 € pour 1 à 5 salariés). Bulletin Facile est idéal pour les employeurs occasionnels, TPE et indépendants. PayFit convient mieux aux entreprises de plus de 5 salariés avec une gestion RH quotidienne.',
  },
  {
    q: 'Peut-on passer de PayFit à Bulletin Facile facilement ?',
    a: 'Oui. Il vous suffit de créer votre premier bulletin sur Bulletin Facile avec les informations de votre salarié. Aucune importation de données n\'est nécessaire. Vous pouvez commencer un nouveau bulletin à tout moment, sans engagement ni période de transition. Les bulletins générés sont au format PDF conforme URSSAF.',
  },
  {
    q: 'Dans quel cas Bulletin Facile est-il préférable à PayFit ?',
    a: 'Bulletin Facile est préférable si vous êtes un employeur de moins de 5 salariés, un particulier employeur, un indépendant recrutant ponctuellement, ou un comptable gérant quelques dossiers TPE. L\'absence d\'abonnement et la facturation à l\'usage le rendent significativement moins coûteux pour moins de 10 bulletins par mois.',
  },
  {
    q: 'Les tarifs de Bulletin Facile sont-ils définitifs ?',
    a: 'Oui, le tarif public est de 8,90 € par bulletin, sans abonnement, sans frais cachés. Le prix inclut le calcul automatique des cotisations URSSAF 2026, l\'export PDF, et le contrat de travail. Aucun engagement ni renouvellement automatique.',
  },
];

const CRITERES = [
  { label: 'Prix', bf: 'Dès 8,90 €/bulletin', payfit: '~80–150 €/mois (1–5 sal.)', bfOk: true, payfitOk: false },
  { label: 'Cotisations automatiques URSSAF 2026', bf: 'Oui', payfit: 'Oui', bfOk: true, payfitOk: true },
  { label: 'Export PDF conforme', bf: 'Oui', payfit: 'Oui', bfOk: true, payfitOk: true },
  { label: 'Contrat de travail inclus', bf: 'Oui, inclus', payfit: 'Non inclus (module séparé)', bfOk: true, payfitOk: false },
  { label: 'API / intégrations', bf: 'Non', payfit: 'Oui', bfOk: false, payfitOk: true },
  { label: 'Support client', bf: 'Email', payfit: 'Support dédié', bfOk: true, payfitOk: true },
  { label: 'Engagement', bf: 'Aucun — à l\'acte', payfit: 'Abonnement mensuel', bfOk: true, payfitOk: false },
];

const TEMOIGNAGES = [
  {
    text: 'J\'avais PayFit pendant 2 ans pour 2 salariés. À 120 €/mois, ça me coûtait 1 440 €/an. Avec Bulletin Facile, je paye 24 bulletins à 8,90 €, soit 213,60 €. Je me suis économisé plus de 1 200 € en un an.',
    name: 'Sébastien M.',
    role: 'Gérant TPE — Restauration rapide, Lyon',
  },
  {
    text: 'Je suis comptable indépendant et je gère 15 petits dossiers TPE. PayFit était bien trop cher par client. Bulletin Facile me permet de facturer à l\'acte et de ne payer que ce que j\'utilise. Mes clients apprécient la clarté des bulletins.',
    name: 'Isabelle D.',
    role: 'Comptable libérale, Bordeaux',
  },
  {
    text: 'J\'ai embauché mon premier salarié à temps partiel. Pas besoin d\'un SIRH complet. En 10 minutes j\'avais le bulletin et le contrat, sans me prendre la tête avec un abonnement.',
    name: 'Karim B.',
    role: 'Auto-entrepreneur, Prestation de services, Paris',
  },
];

export default function BulletinFacileVsPayFitPage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#1a1a2e' }}>

      <Nav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%)', color: 'white', padding: '72px 24px 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Comparaison honnête — 2026
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>
            Bulletin Facile vs PayFit
          </h1>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8, marginBottom: 16 }}>
            Dernière mise à jour : mars 2026
          </div>
          <p style={{ fontSize: 20, opacity: 0.9, marginBottom: 40, lineHeight: 1.6 }}>
            Quelle solution choisir pour vos bulletins de salaire en 2026 ? Comparaison complète des tarifs, fonctionnalités et cas d'usage.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, maxWidth: 640, margin: '0 auto' }}>
            {[
              { val: '8,90 €', label: 'Bulletin Facile', sub: 'Par bulletin, sans abonnement' },
              { val: '~120 €', label: 'PayFit', sub: 'Par mois (1–5 salariés)' },
              { val: '−93 %', label: 'Économie possible', sub: 'Pour moins de 10 bulletins/mois' },
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
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=300&fit=crop&q=80"
          alt="Comparaison logiciels de paie Bulletin Facile vs PayFit 2026"
          style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>

        {/* Tableau comparatif */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 8, color: '#111827' }}>Tableau comparatif — 7 critères clés</h2>
          <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 24 }}>Comparaison directe pour vous aider à choisir la solution adaptée à votre situation.</p>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#0f172a', color: 'white' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 700 }}>Critère</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 700, color: '#facc15' }}>Bulletin Facile</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 700 }}>PayFit</th>
                </tr>
              </thead>
              <tbody>
                {CRITERES.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#374151' }}>{row.label}</td>
                    <td style={{ padding: '14px 16px', color: row.bfOk ? '#059669' : '#dc2626', fontWeight: 500 }}>
                      {row.bfOk ? '✓ ' : '✗ '}{row.bf}
                    </td>
                    <td style={{ padding: '14px 16px', color: row.payfitOk ? '#059669' : '#dc2626', fontWeight: 500 }}>
                      {row.payfitOk ? '✓ ' : '✗ '}{row.payfit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pour qui est Bulletin Facile */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Pour qui est Bulletin Facile ?</h2>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '28px 32px' }}>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#1e3a8a', marginBottom: 20 }}>
              Bulletin Facile est conçu pour les employeurs qui n'ont <strong>pas besoin d'un logiciel RH permanent</strong> et qui veulent payer uniquement ce qu'ils utilisent.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { icon: '🏪', label: 'TPE et microentreprises', desc: '1 à 4 salariés' },
                { icon: '💼', label: 'Indépendants', desc: 'Premier recrutement ponctuel' },
                { icon: '🏠', label: 'Employeurs occasionnels', desc: 'Saisonnier, extra, CDD court' },
                { icon: '📊', label: 'Comptables libéraux', desc: 'Petits dossiers clients TPE' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'white', borderRadius: 10, padding: '16px', border: '1px solid #dbeafe' }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#1e3a8a', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pour qui est PayFit */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 20, color: '#111827' }}>Pour qui est PayFit ?</h2>
          <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: '28px 32px' }}>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#374151', marginBottom: 20 }}>
              PayFit est une solution RH complète (SIRH) adaptée aux entreprises en croissance avec des <strong>besoins réguliers et complexes</strong> de gestion des ressources humaines.
            </p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, margin: 0 }}>
              {[
                'Entreprises de plus de 5 salariés avec une gestion RH quotidienne',
                'Équipes RH dédiées nécessitant un SIRH complet (congés, onboarding...)',
                'Structures avec des besoins d\'intégration API (ERP, outils comptables)',
                'PME ayant des profils de rémunération variés et complexes',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: 15, color: '#374151', lineHeight: 1.6 }}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Témoignages */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 24, color: '#111827' }}>Ce que disent les utilisateurs Bulletin Facile</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {TEMOIGNAGES.map((t, i) => (
              <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '24px 28px' }}>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: '#065f46', fontStyle: 'italic', marginBottom: 12 }}>"{t.text}"</p>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#064e3b' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', borderRadius: 16, padding: '48px 40px', textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: 'white', marginBottom: 12 }}>Essayez Bulletin Facile gratuitement</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 28 }}>8,90 € par bulletin sans abonnement — contrat de travail inclus</p>
          <Link href="/generateur" style={{ display: 'inline-block', background: '#facc15', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '14px 36px', borderRadius: 12, textDecoration: 'none' }}>
            Créer mon premier bulletin →
          </Link>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#111827' }}>Questions fréquentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, a }, i) => (
              <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 15, color: '#111827', background: '#f9fafb', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {q} <span style={{ color: '#1d4ed8', fontSize: 20, lineHeight: 1 }}>+</span>
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
