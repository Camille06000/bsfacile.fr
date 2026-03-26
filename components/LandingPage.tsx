'use client';
import { useState } from 'react';
import PayButton from '@/components/PayButton';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const PACK_OPTIONS = [
  { label: '3 bulletins',  total: 22.70, perFiche: 7.57 },
  { label: '5 bulletins',  total: 36.95, perFiche: 7.39 },
  { label: '10 bulletins', total: 68.90, perFiche: 6.89 },
  { label: '20 bulletins', total: 127.80, perFiche: 6.39 },
];

const MENSUEL_OPTIONS = [
  { label: '1 à 3 salariés',   prix: 28.85 },
  { label: '4 à 9 salariés',   prix: 44.85 },
  { label: '10 à 24 salariés', prix: 74.85 },
  { label: '25 à 49 salariés', prix: 134.85 },
];

const ANNUEL_OPTIONS = [
  { label: '1 à 3 salariés',   prix: 198.00, parMois: 16.50 },
  { label: '4 à 9 salariés',   prix: 328.00, parMois: 27.33 },
  { label: '10 à 24 salariés', prix: 598.00, parMois: 49.83 },
  { label: '25 à 49 salariés', prix: 998.00, parMois: 83.17 },
];

function IconCheck({ color = '#16a34a' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="8" cy="8" r="8" fill={color} opacity="0.12" />
      <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="8" cy="8" r="8" fill="#dc2626" opacity="0.1" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const FEATURES = [
  {
    title: 'Cotisations calculées automatiquement',
    desc: 'Vieillesse, maladie, AGIRC-ARRCO T1/T2, CEG, CET, CSG/CRDS, AT/MP, allocations familiales, chômage, AGS, FNAL.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="18" rx="3"/><path d="M8 8h8M8 12h5M8 16h6"/>
      </svg>
    ),
  },
  {
    title: 'Paramètres légaux 2025 et 2026',
    desc: 'PMSS 3 925 € (2025) / 4 005 € (2026), SMIC 1 801,80 €, réduction Fillon — tout bascule automatiquement.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    title: 'Bulletin print-ready & PDF',
    desc: 'Bulletin structuré en sections : brut, cotisations salariales, patronales, net avant/après PAS. Conforme L.3243-2.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M9 13h6M9 17h4"/>
      </svg>
    ),
  },
  {
    title: 'Cadre & Non-cadre',
    desc: 'Cadres : APEC (0,024%/0,036%), tranche 2 AGIRC-ARRCO. Non-cadres : taux standards. Sélection en 1 clic.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Absences & Heures supplémentaires',
    desc: 'Maladie, AT, CP, RTT, sans solde avec calcul IJSS. Heures supplémentaires 25%/50% exonérées IR (Loi TEPA).',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    title: 'DSN & Contrats de travail',
    desc: 'Export DSN Phase 3 pour Net-Entreprises. Générateur de contrats CDI, CDD, apprentissage, stage et intérim.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
  },
];

export default function LandingPage() {
  const [packIdx, setPackIdx]       = useState(1);
  const [mensuelIdx, setMensuelIdx] = useState(0);
  const [annuelIdx, setAnnuelIdx]   = useState(0);

  const pack    = PACK_OPTIONS[packIdx];
  const mensuel = MENSUEL_OPTIONS[mensuelIdx];
  const annuel  = ANNUEL_OPTIONS[annuelIdx];

  return (
    <div style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif', color: '#0f172a' }}>

      <Nav />

      {/* HERO */}
      <section style={{ paddingTop: 80, paddingBottom: 96, paddingLeft: 24, paddingRight: 24, background: 'linear-gradient(160deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%)', color: 'white' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          {/* Social proof + badge */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100, padding: '6px 16px', fontSize: 13, fontWeight: 600, color: '#bfdbfe' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              Conforme URSSAF · AGIRC-ARRCO · Droit social 2026
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 100, padding: '6px 16px', fontSize: 13, fontWeight: 700, color: '#fde68a' }}>
              ⭐ 4,9/5 · +500 bulletins générés
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-1.5px' }}>
            Bulletins de salaire<br />
            <span style={{ color: '#fde68a' }}>conformes en 30 secondes</span>
          </h1>
          <p style={{ fontSize: 19, color: '#93c5fd', lineHeight: 1.7, maxWidth: 580, margin: '0 auto 12px' }}>
            Fini les erreurs de taux URSSAF. Entrez le brut — le bulletin est calculé, mis en forme et prêt à imprimer.
          </p>
          <p style={{ fontSize: 14, color: '#64748b', marginBottom: 40 }}>
            Pour les RH, TPE/PME et cabinets comptables · <span style={{ color: '#93c5fd' }}>10× moins cher que Silae ou Sage Paie</span>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
            <a href="/tarifs" style={{ background: '#fbbf24', color: '#0f172a', fontWeight: 800, fontSize: 16, padding: '16px 40px', borderRadius: 10, textDecoration: 'none', boxShadow: '0 4px 20px rgba(251,191,36,0.4)' }}>
              Créer mon bulletin — dès 8,90 €
            </a>
            <a href="/dashboard" style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, fontSize: 16, padding: '16px 32px', borderRadius: 10, textDecoration: 'none' }}>
              Déjà client →
            </a>
          </div>
          <p style={{ fontSize: 12, color: '#475569' }}>🔒 Paiement sécurisé SumUp · Accès immédiat · Remboursé si non satisfait</p>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '18px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }}>
          {[
            { val: '+500',        label: 'Bulletins générés' },
            { val: '8,90 €',     label: 'Tarif de départ' },
            { val: '< 30 s',     label: 'Bulletin prêt' },
            { val: '30 jours',   label: 'Garantie remboursement' },
          ].map(s => (
            <div key={s.val}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#1e40af' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLÈME / SOLUTION */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>
            La paie manuelle, c'est terminé
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 16, padding: 28 }}>
              <div style={{ fontWeight: 700, color: '#dc2626', marginBottom: 16, fontSize: 13, borderBottom: '1px solid #fecaca', paddingBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Sans Bulletin Facile
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Formules Excel à maintenir', 'Taux URSSAF à chercher manuellement', 'Réduction Fillon difficile à calculer', 'Bulletin peu présentable', 'Risque d\'erreur sur les montants'].map(i => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#374151', alignItems: 'flex-start' }}><IconX />{i}</li>
                ))}
              </ul>
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: 28 }}>
              <div style={{ fontWeight: 700, color: '#16a34a', marginBottom: 16, fontSize: 13, borderBottom: '1px solid #bbf7d0', paddingBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Avec Bulletin Facile
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Saisir le brut — tout est calculé', 'Tous les taux 2025/2026 intégrés', 'Fillon calculé automatiquement', 'Bulletin structuré, prêt à imprimer', 'Conformité légale garantie'].map(i => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#374151', alignItems: 'flex-start' }}><IconCheck />{i}</li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <a href="/tarifs" style={{ display: 'inline-block', background: '#2563eb', color: 'white', fontWeight: 800, fontSize: 15, padding: '14px 36px', borderRadius: 10, textDecoration: 'none' }}>
              Voir les offres — dès 8,90 € →
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: 'center', marginBottom: 12 }}>
            Un générateur complet et conforme
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 52, fontSize: 16, maxWidth: 540, margin: '0 auto 52px' }}>
            Toutes les cotisations du Code du travail, calculées selon les paramètres officiels URSSAF 2026.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {FEATURES.map(f => (
              <article key={f.title} style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid #e2e8f0' }}>
                <div style={{ width: 48, height: 48, background: '#eff6ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{f.title}</h3>
                <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 12 }}>3 étapes, 30 secondes</h2>
          <p style={{ color: '#64748b', marginBottom: 56, fontSize: 16 }}>Aucune formation. Aucun logiciel à installer.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { n: '01', title: 'Saisissez le salaire brut', desc: 'Entrez le brut mensuel, le statut cadre/non-cadre, l\'effectif et le taux PAS.' },
              { n: '02', title: 'Calcul instantané', desc: 'Toutes les cotisations 2025/2026 apparaissent — salariales et patronales — en temps réel.' },
              { n: '03', title: 'Imprimez ou exportez PDF', desc: 'Un clic suffit. Bulletin conforme à l\'article L.3243-2 du Code du travail, prêt à envoyer.' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#1e40af', color: 'white', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 4px 14px rgba(30,64,175,0.25)' }}>
                  {s.n}
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{s.title}</h3>
                <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <a href="/tarifs" style={{ display: 'inline-block', marginTop: 48, background: '#2563eb', color: 'white', fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 10, textDecoration: 'none' }}>
            Choisir mon offre →
          </a>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ display: 'inline-flex', gap: 2, marginBottom: 8 }}>
              {[0,1,2,3,4].map(i => (
                <svg key={i} width="18" height="18" viewBox="0 0 14 14" fill="#fbbf24">
                  <path d="M7 1l1.8 3.6 3.9.6-2.8 2.8.7 3.9L7 9.8l-3.6 2.1.7-3.9-2.8-2.8 3.9-.6L7 1z"/>
                </svg>
              ))}
            </div>
            <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>4,9/5 · Ils gagnent du temps chaque mois</h2>
            <p style={{ color: '#64748b', fontSize: 15 }}>Rejoignez +500 RH, gérants et comptables qui ont simplifié leur paie</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 40 }}>
            {[
              { name: 'Marie L.',     role: 'Responsable RH · PME 12 salariés', text: '2 heures économisées par mois dès le premier bulletin. Les taux sont toujours à jour — je ne vérifie plus rien manuellement.', badge: '2h/mois économisées', initial: 'M' },
              { name: 'Thomas R.',   role: 'Gérant SARL · Secteur BTP',        text: 'La réduction Fillon est calculée automatiquement. À 8,90 € le bulletin, c\'est 10× moins cher que ce que me proposait mon logiciel de paie.', badge: '10× moins cher', initial: 'T' },
              { name: 'Sandrine M.', role: 'Expert-comptable indépendante',    text: 'Je l\'utilise pour mes petits clients sans logiciel de paie. En 3 mois, j\'ai généré 28 bulletins sans aucune erreur de cotisation.', badge: '28 bulletins, 0 erreur', initial: 'S' },
            ].map(t => (
              <figure key={t.name} style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid #e2e8f0', margin: 0, position: 'relative' }}>
                <div style={{ display: 'inline-block', background: '#eff6ff', color: '#1d4ed8', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 6, marginBottom: 14 }}>
                  ✓ {t.badge}
                </div>
                <blockquote style={{ color: '#374151', fontSize: 14, lineHeight: 1.7, marginBottom: 20, margin: '0 0 20px' }}>
                  « {t.text} »
                </blockquote>
                <figcaption style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#1e40af', color: 'white', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {t.initial}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARAISON CONCURRENTS */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: 'center', marginBottom: 12 }}>
            Pourquoi pas un logiciel de paie classique ?
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: 15, marginBottom: 40 }}>
            Les grands logiciels sont conçus pour les DRH de 50+ salariés. Pas pour vous.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 700, color: '#374151', border: '1px solid #e2e8f0' }}>Logiciel</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 700, color: '#374151', border: '1px solid #e2e8f0' }}>Prix / mois</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 700, color: '#374151', border: '1px solid #e2e8f0' }}>Formation requise</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 700, color: '#374151', border: '1px solid #e2e8f0' }}>Engagement</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 700, color: '#374151', border: '1px solid #e2e8f0' }}>Idéal pour</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'PayFit',          prix: '~79 €/mois', formation: '⚠️ Oui', engagement: '⚠️ Annuel', pour: 'Startups 10+ salariés' },
                  { name: 'Silae / Sage Paie', prix: '~40-120 €/mois', formation: '⚠️ Oui', engagement: '⚠️ Annuel', pour: 'Cabinets comptables' },
                  { name: 'EBP Paye',        prix: '~35 €/mois', formation: '⚠️ Oui', engagement: '⚠️ Annuel', pour: 'PME 5-50 salariés' },
                ].map(r => (
                  <tr key={r.name} style={{ background: 'white' }}>
                    <td style={{ padding: '12px 20px', border: '1px solid #e2e8f0', fontWeight: 600, color: '#374151' }}>{r.name}</td>
                    <td style={{ padding: '12px 20px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#dc2626', fontWeight: 700 }}>{r.prix}</td>
                    <td style={{ padding: '12px 20px', border: '1px solid #e2e8f0', textAlign: 'center' }}>{r.formation}</td>
                    <td style={{ padding: '12px 20px', border: '1px solid #e2e8f0', textAlign: 'center' }}>{r.engagement}</td>
                    <td style={{ padding: '12px 20px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#6b7280' }}>{r.pour}</td>
                  </tr>
                ))}
                <tr style={{ background: '#eff6ff', fontWeight: 700 }}>
                  <td style={{ padding: '14px 20px', border: '2px solid #2563eb', color: '#1d4ed8', fontWeight: 900, borderRadius: '0' }}>
                    ⭐ Bulletin Facile
                  </td>
                  <td style={{ padding: '14px 20px', border: '2px solid #2563eb', textAlign: 'center', color: '#16a34a', fontWeight: 900 }}>dès 8,90 €</td>
                  <td style={{ padding: '14px 20px', border: '2px solid #2563eb', textAlign: 'center', color: '#16a34a' }}>✅ Aucune</td>
                  <td style={{ padding: '14px 20px', border: '2px solid #2563eb', textAlign: 'center', color: '#16a34a' }}>✅ Sans engagement</td>
                  <td style={{ padding: '14px 20px', border: '2px solid #2563eb', textAlign: 'center', color: '#1d4ed8', fontWeight: 700 }}>TPE, RH, Comptables</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <a href="/tarifs" style={{ display: 'inline-block', background: '#fbbf24', color: '#0f172a', fontWeight: 800, fontSize: 15, padding: '14px 36px', borderRadius: 10, textDecoration: 'none' }}>
              Commencer sans engagement →
            </a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>Tarifs transparents</h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 4, fontSize: 17 }}>
            Toujours <strong style={{ color: '#1e40af' }}>1 € moins cher</strong> que la concurrence.
          </p>
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13, marginBottom: 52 }}>
            Accès immédiat après paiement · Paiement sécurisé · Satisfait ou remboursé 30 jours
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* SANS ENGAGEMENT */}
            <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 20, padding: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sans engagement</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #bbf7d0', padding: 18, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, textAlign: 'center', marginBottom: 14 }}>1 Bulletin</div>
                  <div style={{ textAlign: 'center', marginBottom: 18 }}>
                    <span style={{ fontSize: 42, fontWeight: 900, color: '#16a34a', letterSpacing: '-1px' }}>8</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#16a34a', verticalAlign: 'super' }}>,90</span>
                    <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 4 }}>€ HT</span>
                  </div>
                  <PayButton amount={8.90} description="Bulletin Facile — 1 bulletin de salaire" label="Acheter"
                    style={{ width: '100%', background: '#16a34a', color: 'white', fontWeight: 700, padding: '10px 0', borderRadius: 8, border: 'none', fontSize: 13, cursor: 'pointer', marginBottom: 14 }} />
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {['PDF immédiat', 'Calculs URSSAF 2026', 'Journal de paie', 'DSN incluse'].map(f => (
                      <li key={f} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#374151', alignItems: 'center' }}><IconCheck color="#16a34a" />{f}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: 'white', borderRadius: 14, border: '2px solid #16a34a', padding: 18, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: '#16a34a', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 12px', borderRadius: 100, whiteSpace: 'nowrap' }}>Populaire</div>
                  <div style={{ fontSize: 14, fontWeight: 700, textAlign: 'center', marginBottom: 10 }}>Pack</div>
                  <select value={packIdx} onChange={e => setPackIdx(Number(e.target.value))}
                    style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '7px 10px', fontSize: 12, fontWeight: 600, marginBottom: 10, cursor: 'pointer', background: 'white' }}>
                    {PACK_OPTIONS.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
                  </select>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: 42, fontWeight: 900, color: '#16a34a', letterSpacing: '-1px' }}>{Math.floor(pack.total)}</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#16a34a', verticalAlign: 'super' }}>,{(pack.total % 1).toFixed(2).slice(2)}</span>
                    <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 4 }}>€ HT</span>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginBottom: 10 }}>{pack.perFiche.toFixed(2).replace('.', ',')} €/fiche</div>
                  <PayButton amount={pack.total} description={`Bulletin Facile — Pack ${pack.label}`} label="Acheter ce pack"
                    style={{ width: '100%', background: '#16a34a', color: 'white', fontWeight: 700, padding: '10px 0', borderRadius: 8, border: 'none', fontSize: 13, cursor: 'pointer', marginBottom: 14 }} />
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {['Multi-salariés', 'Multi-entreprises', 'PDF immédiat', 'DSN incluse'].map(f => (
                      <li key={f} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#374151', alignItems: 'center' }}><IconCheck color="#16a34a" />{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* ABONNEMENT */}
            <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: 20, padding: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Abonnement</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #bfdbfe', padding: 18, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, textAlign: 'center', marginBottom: 10 }}>Mensuel</div>
                  <select value={mensuelIdx} onChange={e => setMensuelIdx(Number(e.target.value))}
                    style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '7px 10px', fontSize: 12, fontWeight: 600, marginBottom: 10, cursor: 'pointer', background: 'white' }}>
                    {MENSUEL_OPTIONS.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
                  </select>
                  <div style={{ textAlign: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 42, fontWeight: 900, color: '#2563eb', letterSpacing: '-1px' }}>{Math.floor(mensuel.prix)}</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#2563eb', verticalAlign: 'super' }}>,{(mensuel.prix % 1).toFixed(2).slice(2)}</span>
                    <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 4 }}>€ HT</span>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 14 }}>/mois</div>
                  <PayButton amount={mensuel.prix} description={`Bulletin Facile — Abonnement mensuel ${mensuel.label}`} label="S'abonner"
                    style={{ width: '100%', background: '#2563eb', color: 'white', fontWeight: 700, padding: '10px 0', borderRadius: 8, border: 'none', fontSize: 13, cursor: 'pointer', marginBottom: 14 }} />
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {['Bulletins illimités', 'Mises à jour légales', 'Support prioritaire'].map(f => (
                      <li key={f} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#374151', alignItems: 'center' }}><IconCheck color="#2563eb" />{f}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: 'white', borderRadius: 14, border: '2px solid #2563eb', padding: 18, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: '#2563eb', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 12px', borderRadius: 100, whiteSpace: 'nowrap' }}>Meilleur tarif</div>
                  <div style={{ fontSize: 14, fontWeight: 700, textAlign: 'center', marginBottom: 10 }}>Annuel</div>
                  <select value={annuelIdx} onChange={e => setAnnuelIdx(Number(e.target.value))}
                    style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '7px 10px', fontSize: 12, fontWeight: 600, marginBottom: 10, cursor: 'pointer', background: 'white' }}>
                    {ANNUEL_OPTIONS.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
                  </select>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: 42, fontWeight: 900, color: '#2563eb', letterSpacing: '-1px' }}>{Math.floor(annuel.prix)}</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#2563eb', verticalAlign: 'super' }}>,{(annuel.prix % 1).toFixed(2).slice(2)}</span>
                    <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 4 }}>€ HT</span>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>/an</div>
                  <div style={{ textAlign: 'center', fontSize: 12, color: '#16a34a', fontWeight: 700, marginBottom: 14 }}>
                    soit {annuel.parMois.toFixed(2).replace('.', ',')} €/mois
                  </div>
                  <PayButton amount={annuel.prix} description={`Bulletin Facile — Abonnement annuel ${annuel.label}`} label="S'abonner annuel"
                    style={{ width: '100%', background: '#2563eb', color: 'white', fontWeight: 700, padding: '10px 0', borderRadius: 8, border: 'none', fontSize: 13, cursor: 'pointer', marginBottom: 14 }} />
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {['Bulletins illimités', 'Mises à jour légales', 'Support prioritaire'].map(f => (
                      <li key={f} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#374151', alignItems: 'center' }}><IconCheck color="#2563eb" />{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 24, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '18px 32px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 28 }}>
            {[
              { t: 'Satisfait ou remboursé', s: '30 jours sans conditions' },
              { t: 'Accès immédiat', s: 'Dès le paiement validé' },
              { t: 'Paiement sécurisé', s: 'Via SumUp' },
              { t: 'Taux légaux 2026', s: 'URSSAF officiels' },
            ].map(g => (
              <div key={g.t} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{g.t}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{g.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>Questions fréquentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { q: 'Comment calculer le salaire net à partir du brut en 2026 ?', a: 'Saisissez le brut dans Bulletin Facile. Le net est calculé après déduction des cotisations salariales (vieillesse, AGIRC-ARRCO, CSG/CRDS…) et du prélèvement à la source. Pour 2026 : PMSS 4 005 €, SMIC 1 801,80 €.' },
              { q: 'Les taux URSSAF et AGIRC-ARRCO 2026 sont-ils intégrés ?', a: 'Oui. Tous les taux officiels 2025 et 2026 sont intégrés : vieillesse plafonnée (6,90%), AGIRC-ARRCO T1 (3,15%), T2 (8,64%), CEG, CET (0,14%), CSG déductible (6,80%), CSG/CRDS non déductible (2,90%), allocations familiales, AT/MP, chômage, AGS.' },
              { q: 'La réduction Fillon est-elle calculée automatiquement ?', a: 'Oui. Le coefficient et le montant apparaissent dans le tableau des cotisations patronales dès que le salaire est inférieur à 1,6 × SMIC annuel.' },
              { q: 'Bulletin Facile gère-t-il les absences et heures supplémentaires ?', a: 'Oui. Les absences (maladie, AT, CP, RTT, sans solde) sont déduites avec calcul IJSS. Les heures supplémentaires 25%/50% sont calculées avec exonération IR (Loi TEPA).' },
              { q: 'Quelle est la différence entre sans engagement et abonnement ?', a: 'Sans engagement : vous achetez à l\'unité ou en pack — idéal jusqu\'à 20 bulletins/mois. Abonnement mensuel ou annuel : bulletins illimités — idéal pour employeurs avec plusieurs salariés.' },
            ].map(({ q, a }) => (
              <details key={q} style={{ background: 'white', borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q}
                  <span style={{ color: '#94a3b8', fontSize: 18, fontWeight: 300, flexShrink: 0, marginLeft: 16 }}>+</span>
                </summary>
                <p style={{ padding: '0 20px 16px', margin: 0, color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: 'linear-gradient(160deg, #0f172a, #1e3a8a)', padding: '80px 24px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 16, letterSpacing: '-0.5px' }}>
            Prêt à générer votre premier bulletin ?
          </h2>
          <p style={{ color: '#93c5fd', marginBottom: 40, fontSize: 17, lineHeight: 1.7 }}>
            Rejoignez les RH, gérants de TPE/PME et comptables qui gagnent du temps chaque mois.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="/tarifs" style={{ background: '#fbbf24', color: '#0f172a', fontWeight: 800, fontSize: 17, padding: '15px 40px', borderRadius: 12, textDecoration: 'none' }}>
              Créer mon premier bulletin →
            </a>
            <a href="/dashboard" style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'white', fontWeight: 600, fontSize: 17, padding: '15px 32px', borderRadius: 12, textDecoration: 'none' }}>
              Déjà client ? Se connecter
            </a>
          </div>
          <p style={{ color: '#475569', fontSize: 12, marginTop: 20 }}>Dès 8,90 € · Accès immédiat · Conforme droit social 2026</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
