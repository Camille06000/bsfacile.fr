'use client';
import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PayButton from '@/components/PayButton';

const PACK_OPTIONS = [
  { label: '3 Fiches',  total: 22.70, perFiche: 7.57 },
  { label: '5 Fiches',  total: 36.95, perFiche: 7.39 },
  { label: '10 Fiches', total: 68.90, perFiche: 6.89 },
  { label: '20 Fiches', total: 127.80, perFiche: 6.39 },
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

const FEATURES_FICHE = ['Logo & couleur modifiables', 'Journal de paie inclus', 'DSN en 3 clics', 'Téléchargement PDF', 'Calculs URSSAF 2025/2026'];
const FEATURES_PACK  = ['Multi-salariés', 'Multi-entreprises', 'Logo & couleur modifiables', 'Journal de paie inclus', 'DSN en 3 clics', 'Téléchargement PDF'];
const FEATURES_SUB   = ['Bulletins illimités', 'Multi-entreprises', 'Logo & couleur modifiables', 'Journal de paie inclus', 'DSN en 3 clics', 'Mises à jour légales incluses', 'Support prioritaire'];

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="#22c55e" style={{ flexShrink: 0, marginTop: 2 }}>
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const btnGreen = { display: 'block', width: '100%', background: '#16a34a', color: 'white', fontWeight: 700, padding: '10px 0', borderRadius: 8, border: 'none', fontSize: 14, cursor: 'pointer' } as React.CSSProperties;
const btnBlue  = { display: 'block', width: '100%', background: '#2563eb', color: 'white', fontWeight: 700, padding: '10px 0', borderRadius: 8, border: 'none', fontSize: 14, cursor: 'pointer' } as React.CSSProperties;

export default function TarifsPage() {
  const [packIdx, setPackIdx]     = useState(0);
  const [mensuelIdx, setMensuelIdx] = useState(0);
  const [annuelIdx, setAnnuelIdx]   = useState(0);

  const pack    = PACK_OPTIONS[packIdx];
  const mensuel = MENSUEL_OPTIONS[mensuelIdx];
  const annuel  = ANNUEL_OPTIONS[annuelIdx];

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#111827', minHeight: '100vh', background: 'linear-gradient(to bottom, #eff6ff, #fff)' }}>
      <Nav />

      {/* HEADER */}
      <div style={{ textAlign: 'center', padding: '56px 24px 40px' }}>
        <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1d4ed8', borderRadius: 50, padding: '4px 16px', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          ⭐ 4,9/5 · +500 bulletins générés · Toujours 1 € moins cher que la concurrence
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, marginBottom: 12 }}>
          Choisissez votre offre
        </h1>
        <p style={{ color: '#6b7280', fontSize: 17, maxWidth: 520, margin: '0 auto 16px' }}>
          Accès immédiat après paiement. Sans abonnement forcé.
        </p>
        <div style={{ display: 'inline-flex', gap: 24, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '10px 24px', fontSize: 13, color: '#15803d', fontWeight: 600 }}>
          <span>✅ Calculs URSSAF 2026 officiels</span>
          <span>✅ PDF immédiat</span>
          <span>✅ Remboursé si insatisfait</span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px 80px' }}>

        {/* GRID 2 colonnes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: 24 }}>

          {/* ── SANS ENGAGEMENT ── */}
          <div style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: 20, padding: 24 }}>
            <h2 style={{ textAlign: 'center', fontWeight: 900, color: '#15803d', fontSize: 18, letterSpacing: 1, marginBottom: 20, textTransform: 'uppercase' }}>
              Sans engagement
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

              {/* 1 Bulletin */}
              <div style={{ background: 'white', borderRadius: 14, border: '1px solid #d1fae5', padding: 20, display: 'flex', flexDirection: 'column' }}>
                <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>1 Bulletin</div>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: '#16a34a' }}>8</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#16a34a', verticalAlign: 'super' }}>,90</span>
                  <span style={{ fontSize: 13, color: '#9ca3af', marginLeft: 4 }}>€ HT</span>
                </div>
                <PayButton amount={8.90} description="Bulletin Facile — 1 bulletin de salaire" label="Acheter maintenant" style={btnGreen} />
                <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0 }}>
                  {FEATURES_FICHE.map(f => (
                    <li key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#4b5563' }}><CheckIcon />{f}</li>
                  ))}
                </ul>
              </div>

              {/* Pack */}
              <div style={{ background: 'white', borderRadius: 14, border: '2px solid #16a34a', padding: 20, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#16a34a', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 12px', borderRadius: 50 }}>
                  Populaire
                </div>
                <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Pack</div>
                <div style={{ position: 'relative', marginBottom: 12 }}>
                  <select value={packIdx} onChange={e => setPackIdx(Number(e.target.value))}
                    style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '8px 28px 8px 10px', fontSize: 13, fontWeight: 600, appearance: 'none', cursor: 'pointer' }}>
                    {PACK_OPTIONS.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
                  </select>
                  <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }}>▾</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: '#16a34a' }}>{Math.floor(pack.total)}</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#16a34a', verticalAlign: 'super' }}>,{(pack.total % 1).toFixed(2).slice(2)}</span>
                  <span style={{ fontSize: 13, color: '#9ca3af', marginLeft: 4 }}>€ HT</span>
                </div>
                <div style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginBottom: 12 }}>
                  soit {pack.perFiche.toFixed(2).replace('.', ',')} € HT / fiche
                </div>
                <PayButton amount={pack.total} description={`Bulletin Facile — Pack ${pack.label}`} label="Acheter ce pack" style={btnGreen} />
                <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0 }}>
                  {FEATURES_PACK.map(f => (
                    <li key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#4b5563' }}><CheckIcon />{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── ABONNEMENT ── */}
          <div style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: 20, padding: 24 }}>
            <h2 style={{ textAlign: 'center', fontWeight: 900, color: '#1d4ed8', fontSize: 18, letterSpacing: 1, marginBottom: 20, textTransform: 'uppercase' }}>
              Abonnement
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

              {/* Mensuel */}
              <div style={{ background: 'white', borderRadius: 14, border: '1px solid #bfdbfe', padding: 20, display: 'flex', flexDirection: 'column' }}>
                <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Mensuel</div>
                <div style={{ position: 'relative', marginBottom: 12 }}>
                  <select value={mensuelIdx} onChange={e => setMensuelIdx(Number(e.target.value))}
                    style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '8px 28px 8px 10px', fontSize: 13, fontWeight: 600, appearance: 'none', cursor: 'pointer' }}>
                    {MENSUEL_OPTIONS.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
                  </select>
                  <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }}>▾</span>
                </div>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: '#2563eb' }}>{Math.floor(mensuel.prix)}</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#2563eb', verticalAlign: 'super' }}>,{(mensuel.prix % 1).toFixed(2).slice(2)}</span>
                  <span style={{ fontSize: 13, color: '#9ca3af', marginLeft: 4 }}>€ HT</span>
                  <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>/mois</div>
                </div>
                <PayButton amount={mensuel.prix} description={`Bulletin Facile — Abonnement mensuel ${mensuel.label}`} label="S'abonner" style={btnBlue} />
                <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0 }}>
                  {FEATURES_SUB.map(f => (
                    <li key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#4b5563' }}><CheckIcon />{f}</li>
                  ))}
                </ul>
              </div>

              {/* Annuel */}
              <div style={{ background: 'white', borderRadius: 14, border: '2px solid #2563eb', padding: 20, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#2563eb', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 12px', borderRadius: 50 }}>
                  Économique
                </div>
                <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Annuel</div>
                <div style={{ position: 'relative', marginBottom: 12 }}>
                  <select value={annuelIdx} onChange={e => setAnnuelIdx(Number(e.target.value))}
                    style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '8px 28px 8px 10px', fontSize: 13, fontWeight: 600, appearance: 'none', cursor: 'pointer' }}>
                    {ANNUEL_OPTIONS.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
                  </select>
                  <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }}>▾</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: '#2563eb' }}>{Math.floor(annuel.prix)}</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#2563eb', verticalAlign: 'super' }}>,{(annuel.prix % 1).toFixed(2).slice(2)}</span>
                  <span style={{ fontSize: 13, color: '#9ca3af', marginLeft: 4 }}>€ HT</span>
                  <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>/an</div>
                </div>
                <div style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginBottom: 12 }}>
                  soit {annuel.parMois.toFixed(2).replace('.', ',')} € HT / mois
                </div>
                <PayButton amount={annuel.prix} description={`Bulletin Facile — Abonnement annuel ${annuel.label}`} label="S'abonner annuel" style={btnBlue} />
                <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0 }}>
                  {FEATURES_SUB.map(f => (
                    <li key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#4b5563' }}><CheckIcon />{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* GARANTIE */}
        <div style={{ marginTop: 32, background: 'white', border: '1px solid #e5e7eb', borderRadius: 16, padding: '24px 32px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, fontSize: 14, color: '#374151' }}>
            <span>🛡️ <strong>Satisfait ou remboursé</strong> 30 jours</span>
            <span>⚡ <strong>Accès immédiat</strong> après paiement</span>
            <span>🔒 <strong>Paiement sécurisé</strong> SumUp</span>
            <span>✓ <strong>Taux légaux</strong> URSSAF 2025/2026</span>
          </div>
        </div>

        {/* FAQ OBJECTIONS */}
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', marginBottom: 20, color: '#111827' }}>Questions fréquentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 720, margin: '0 auto' }}>
            {[
              { q: 'Est-ce que je reçois mon accès immédiatement ?', a: 'Oui. Dès le paiement validé par SumUp, vous recevez un email avec un lien de connexion. Vous pouvez générer votre premier bulletin en moins de 2 minutes.' },
              { q: 'Puis-je utiliser Bulletin Facile pour plusieurs salariés ?', a: 'Oui. Avec un pack ou un abonnement, vous pouvez créer autant de bulletins que vous voulez pour des salariés différents ou plusieurs entreprises.' },
              { q: 'Les taux URSSAF et AGIRC-ARRCO 2026 sont-ils à jour ?', a: 'Oui. Tous les taux officiels 2026 sont intégrés : PMSS 4 005 €, SMIC 1 801,80 €, réduction Fillon, AGIRC-ARRCO T1/T2, CSG/CRDS. Mises à jour incluses.' },
              { q: 'Et si je ne suis pas satisfait ?', a: 'Remboursement intégral sous 30 jours, sans condition, sans question. Contactez-nous par email.' },
            ].map(({ q, a }) => (
              <details key={q} style={{ background: 'white', borderRadius: 10, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <summary style={{ padding: '14px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#111827' }}>
                  {q}
                  <span style={{ color: '#94a3b8', fontSize: 18, fontWeight: 300, flexShrink: 0, marginLeft: 16 }}>+</span>
                </summary>
                <p style={{ padding: '0 20px 16px', margin: 0, color: '#6b7280', fontSize: 14, lineHeight: 1.7 }}>{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA FINAL */}
        <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', borderRadius: 20, padding: '40px 32px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>
            Prêt à générer votre premier bulletin ?
          </h2>
          <p style={{ color: '#93c5fd', marginBottom: 28, fontSize: 15 }}>
            Accès immédiat · Sans engagement · Dès 8,90 € HT
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ background: '#fbbf24', color: '#0f172a', fontWeight: 800, fontSize: 16, padding: '14px 36px', borderRadius: 10, textDecoration: 'none' }}>
              Choisir mon offre ↑
            </a>
            <a href="/dashboard" style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, fontSize: 16, padding: '14px 28px', borderRadius: 10, textDecoration: 'none' }}>
              Déjà client →
            </a>
          </div>
          <p style={{ color: '#475569', fontSize: 12, marginTop: 16 }}>🛡️ Remboursé si non satisfait sous 30 jours</p>
        </div>

      </div>

      <Footer />
    </div>
  );
}
