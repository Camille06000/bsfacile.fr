'use client';
import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PayButton from '@/components/PayButton';

// ── Données pricing ──────────────────────────────────────────────────────────
const PACK_OPTIONS = [
  { label: '3 bulletins',  total: 22.70,  perU: 7.57 },
  { label: '5 bulletins',  total: 36.95,  perU: 7.39 },
  { label: '10 bulletins', total: 68.90,  perU: 6.89 },
  { label: '20 bulletins', total: 127.80, perU: 6.39 },
];

const MENSUEL_OPTIONS = [
  { label: '1 à 3 salariés',   prix: 28.85,  quota: 6  },
  { label: '4 à 9 salariés',   prix: 44.85,  quota: 18 },
  { label: '10 à 24 salariés', prix: 74.85,  quota: 48 },
  { label: '25 à 49 salariés', prix: 134.85, quota: 98 },
];

const ANNUEL_OPTIONS = [
  { label: '1 à 3 salariés',   prix: 198.00, parMois: 16.50, quota: 6  },
  { label: '4 à 9 salariés',   prix: 328.00, parMois: 27.33, quota: 18 },
  { label: '10 à 24 salariés', prix: 598.00, parMois: 49.83, quota: 48 },
  { label: '25 à 49 salariés', prix: 998.00, parMois: 83.17, quota: 98 },
];

// ── Icône check ──────────────────────────────────────────────────────────────
const Check = ({ color = '#16a34a' }: { color?: string }) => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill={color} style={{ flexShrink: 0, marginTop: 1 }}>
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

// ── Styles boutons ───────────────────────────────────────────────────────────
const btnGreen: React.CSSProperties = { display: 'block', width: '100%', background: '#16a34a', color: 'white', fontWeight: 700, padding: '12px 0', borderRadius: 10, border: 'none', fontSize: 14, cursor: 'pointer' };
const btnBlue: React.CSSProperties  = { display: 'block', width: '100%', background: '#2563eb', color: 'white', fontWeight: 700, padding: '12px 0', borderRadius: 10, border: 'none', fontSize: 14, cursor: 'pointer' };
const btnDark: React.CSSProperties  = { display: 'block', width: '100%', background: '#1a3a5c', color: 'white', fontWeight: 700, padding: '12px 0', borderRadius: 10, border: 'none', fontSize: 14, cursor: 'pointer' };

// ── Prix affiché ─────────────────────────────────────────────────────────────
function Prix({ amount, color }: { amount: number; color: string }) {
  const [entier, dec] = amount.toFixed(2).split('.');
  return (
    <div style={{ textAlign: 'center', lineHeight: 1 }}>
      <span style={{ fontSize: 52, fontWeight: 900, color }}>{entier}</span>
      <span style={{ fontSize: 24, fontWeight: 800, color, verticalAlign: 'super', lineHeight: 1 }}>,{dec}</span>
      <span style={{ fontSize: 13, color: '#9ca3af', marginLeft: 4 }}>€ HT</span>
    </div>
  );
}

// ── Badge ────────────────────────────────────────────────────────────────────
function Badge({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: bg, color, fontSize: 11, fontWeight: 700, padding: '3px 14px', borderRadius: 50, whiteSpace: 'nowrap', border: `2px solid ${color === 'white' ? bg : 'transparent'}`, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
      {label}
    </div>
  );
}

// ── Sélecteur dropdown ───────────────────────────────────────────────────────
function Select({ value, onChange, options }: { value: number; onChange: (n: number) => void; options: { label: string }[] }) {
  return (
    <div style={{ position: 'relative', marginBottom: 12 }}>
      <select value={value} onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '9px 32px 9px 12px', fontSize: 13, fontWeight: 600, appearance: 'none', cursor: 'pointer', background: 'white' }}>
        {options.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
      </select>
      <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280', fontSize: 12 }}>▾</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
export default function TarifsPage() {
  const [packIdx,    setPackIdx]    = useState(1); // Pack 5 par défaut
  const [mensuelIdx, setMensuelIdx] = useState(0);
  const [annuelIdx,  setAnnuelIdx]  = useState(0);

  const pack    = PACK_OPTIONS[packIdx];
  const mensuel = MENSUEL_OPTIONS[mensuelIdx];
  const annuel  = ANNUEL_OPTIONS[annuelIdx];

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#111827', minHeight: '100vh', background: '#f8fafc' }}>
      <Nav />

      {/* ══ HERO ══ */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', color: 'white', padding: '60px 24px 48px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 50, padding: '5px 18px', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
          <span>⭐ 4,9/5</span><span style={{ opacity: 0.4 }}>·</span>
          <span>+500 bulletins générés</span><span style={{ opacity: 0.4 }}>·</span>
          <span>Accès immédiat</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,46px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.15 }}>
          Des tarifs simples,<br />sans surprise
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, maxWidth: 480, margin: '0 auto 28px' }}>
          Bulletin de salaire ou contrat de travail — payez uniquement ce dont vous avez besoin.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          {[
            { icon: '✅', txt: 'Calculs URSSAF 2026 officiels' },
            { icon: '⚡', txt: 'PDF immédiat' },
            { icon: '🛡️', txt: 'Remboursé 30 jours' },
            { icon: '🔒', txt: 'Paiement sécurisé SumUp' },
          ].map(({ icon, txt }) => (
            <span key={txt} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '7px 16px', fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>
              {icon} {txt}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 16px 80px' }}>

        {/* ══ SECTION 1 — BULLETINS SANS ENGAGEMENT ══ */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ display: 'inline-block', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 50, padding: '4px 16px', fontSize: 12, fontWeight: 700, color: '#15803d', marginBottom: 10 }}>
              📄 BULLETINS DE SALAIRE
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 8px' }}>Sans engagement</h2>
            <p style={{ color: '#6b7280', fontSize: 15, margin: 0 }}>Achetez uniquement ce dont vous avez besoin, quand vous en avez besoin</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>

            {/* 1 bulletin */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e5e7eb', padding: 24, display: 'flex', flexDirection: 'column', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 4 }}>1 Bulletin</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 20 }}>Pour un besoin ponctuel</div>
              <Prix amount={8.90} color="#16a34a" />
              <div style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', marginBottom: 20, marginTop: 4 }}>par bulletin</div>
              <PayButton amount={8.90} description="Bulletin Facile — 1 bulletin de salaire" label="Acheter maintenant" style={btnGreen} />
              <ul style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 9, listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
                {['Calculs URSSAF 2026', 'Réduction Fillon auto', 'Téléchargement PDF', '3 thèmes visuels', 'Logo entreprise inclus'].map(f => (
                  <li key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#4b5563' }}><Check />{f}</li>
                ))}
              </ul>
            </div>

            {/* Pack */}
            <div style={{ background: 'white', borderRadius: 16, border: '2px solid #16a34a', padding: 24, display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 4px 16px rgba(22,163,74,0.12)' }}>
              <Badge label="⭐ Populaire" bg="#16a34a" color="white" />
              <div style={{ fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Pack bulletins</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>Économisez jusqu'à 28%</div>
              <Select value={packIdx} onChange={setPackIdx} options={PACK_OPTIONS} />
              <Prix amount={pack.total} color="#16a34a" />
              <div style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginBottom: 20, marginTop: 4 }}>
                soit <strong style={{ color: '#16a34a' }}>{pack.perU.toFixed(2).replace('.', ',')} €</strong> HT / bulletin
              </div>
              <PayButton amount={pack.total} description={`Bulletin Facile — Pack ${pack.label}`} label={`Acheter le pack ${pack.label}`} style={btnGreen} />
              <ul style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 9, listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
                {['Multi-salariés', 'Multi-entreprises', 'Calculs URSSAF 2026', 'Réduction Fillon auto', 'Téléchargement PDF', '3 thèmes visuels'].map(f => (
                  <li key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#4b5563' }}><Check />{f}</li>
                ))}
              </ul>
            </div>

            {/* Contrat de travail — ici dans la grille bulletins */}
            <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1e40af 100%)', borderRadius: 16, border: '2px solid #1a3a5c', padding: 24, display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 4px 20px rgba(26,58,92,0.25)', color: 'white' }}>
              <Badge label="📋 DOCUMENT LÉGAL" bg="rgba(255,255,255,0.15)" color="white" />
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, marginTop: 8 }}>Contrat de travail</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>CDI · CDD · Apprentissage · Stage</div>
              <Prix amount={10.00} color="white" />
              <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 20, marginTop: 4 }}>par contrat généré</div>
              <Link href="/contrat"
                style={{ display: 'block', width: '100%', background: 'white', color: '#1a3a5c', fontWeight: 700, padding: '12px 0', borderRadius: 10, border: 'none', fontSize: 14, cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>
                Créer mon contrat →
              </Link>
              <ul style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 9, listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
                {['Conforme Code du travail 2026', 'CDI, CDD, Apprentissage, Stage', 'Clauses personnalisables', 'Recherche SIRET intégrée', 'Document PDF neutre et pro'].map(f => (
                  <li key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
                    <Check color="rgba(255,255,255,0.9)" />{f}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ══ SECTION 2 — ABONNEMENTS ══ */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ display: 'inline-block', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 50, padding: '4px 16px', fontSize: 12, fontWeight: 700, color: '#1d4ed8', marginBottom: 10 }}>
              📅 ABONNEMENTS MENSUELS
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 8px' }}>Abonnements</h2>
            <p style={{ color: '#6b7280', fontSize: 15, margin: 0 }}>Quota mensuel adapté à votre effectif · Taux mis à jour automatiquement · Annulation à tout moment</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, maxWidth: 800, margin: '0 auto' }}>

            {/* Mensuel */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e5e7eb', padding: 28, display: 'flex', flexDirection: 'column', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Mensuel</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>Résiliable à tout moment</div>
              <Select value={mensuelIdx} onChange={setMensuelIdx} options={MENSUEL_OPTIONS} />
              <Prix amount={mensuel.prix} color="#2563eb" />
              <div style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginBottom: 24, marginTop: 4 }}>/mois · sans engagement</div>
              <PayButton amount={mensuel.prix} description={`Bulletin Facile — Abonnement mensuel ${mensuel.label}`} label="S'abonner au mois" style={btnBlue} />
              <ul style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 9, listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
                {[`${mensuel.quota} bulletins / mois en cours`, 'Contrats de travail illimités inclus', 'Multi-salariés & multi-entreprises', 'Taux URSSAF mis à jour auto', 'Réduction Fillon calculée', 'PDF immédiat · 3 thèmes', 'Support par email'].map(f => (
                  <li key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#4b5563' }}><Check color="#2563eb" />{f}</li>
                ))}
              </ul>
            </div>

            {/* Annuel */}
            <div style={{ background: 'white', borderRadius: 16, border: '2px solid #2563eb', padding: 28, display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 4px 20px rgba(37,99,235,0.15)' }}>
              <Badge label="🏆 Recommandé · 2 mois offerts" bg="#2563eb" color="white" />
              <div style={{ fontSize: 15, fontWeight: 700, color: '#374151', marginBottom: 4, marginTop: 8 }}>Annuel</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>La meilleure valeur</div>
              <Select value={annuelIdx} onChange={setAnnuelIdx} options={ANNUEL_OPTIONS} />
              <Prix amount={annuel.prix} color="#2563eb" />
              <div style={{ textAlign: 'center', fontSize: 12, marginBottom: 4, marginTop: 4 }}>
                <span style={{ color: '#9ca3af' }}>/an · soit </span>
                <strong style={{ color: '#2563eb' }}>{annuel.parMois.toFixed(2).replace('.', ',')} €</strong>
                <span style={{ color: '#9ca3af' }}> HT/mois</span>
              </div>
              <div style={{ textAlign: 'center', background: '#dbeafe', borderRadius: 8, padding: '6px 12px', fontSize: 12, color: '#1d4ed8', fontWeight: 600, marginBottom: 20 }}>
                Économie de {(mensuel.prix * 12 - annuel.prix).toFixed(0)} € vs mensuel
              </div>
              <PayButton amount={annuel.prix} description={`Bulletin Facile — Abonnement annuel ${annuel.label}`} label="S'abonner à l'année" style={btnBlue} />
              <ul style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 9, listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
                {[`${annuel.quota} bulletins / mois (renouvelé chaque 1er du mois)`, 'Contrats de travail illimités inclus', 'Multi-salariés & multi-entreprises', 'Taux URSSAF mis à jour auto', 'Réduction Fillon calculée', 'PDF immédiat · 3 thèmes', 'Support prioritaire', 'Mises à jour légales incluses'].map(f => (
                  <li key={f} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#4b5563' }}><Check color="#2563eb" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ══ TABLEAU COMPARATIF ══ */}
        <div style={{ marginBottom: 56, background: 'white', borderRadius: 20, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb', padding: '20px 32px' }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Comparatif des offres</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 700, color: '#374151' }}>Fonctionnalité</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: '#16a34a' }}>Unitaire</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: '#16a34a' }}>Pack</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: '#2563eb', background: '#eff6ff' }}>Abonnement</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: '#1a3a5c' }}>Contrat</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Bulletins de salaire', '1', 'Selon pack', '6 à 98 / mois', '—'],
                  ['Calculs URSSAF 2026', '✅', '✅', '✅', '—'],
                  ['Réduction Fillon auto', '✅', '✅', '✅', '—'],
                  ['Téléchargement PDF', '✅', '✅', '✅', '✅'],
                  ['Multi-salariés', '—', '✅', '✅', '—'],
                  ['Multi-entreprises', '—', '✅', '✅', '—'],
                  ['Logo & thèmes visuels', '✅', '✅', '✅', '—'],
                  ['Taux mis à jour auto', '—', '—', '✅', '—'],
                  ['Support prioritaire', '—', '—', '✅', '—'],
                  ['Contrat CDI/CDD/App.', '—', '—', '✅ illimités', '✅'],
                  ['Conforme Code travail', '—', '—', '—', '✅'],
                  ['Clauses personnalisées', '—', '—', '—', '✅'],
                ].map(([feat, ...vals], i) => (
                  <tr key={feat} style={{ background: i % 2 === 0 ? 'white' : '#fafafa', borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '11px 20px', color: '#374151', fontWeight: 500 }}>{feat}</td>
                    {vals.map((v, j) => (
                      <td key={j} style={{ padding: '11px 16px', textAlign: 'center', color: v === '—' ? '#d1d5db' : v === '✅' ? '#16a34a' : '#374151', fontWeight: v === '✅' ? 700 : 400, background: j === 2 ? '#f8faff' : undefined }}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr style={{ background: '#f8fafc', borderTop: '2px solid #e5e7eb' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700 }}>Prix HT</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 800, color: '#16a34a' }}>8,90 €</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 800, color: '#16a34a' }}>dès 6,39 €/u</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 800, color: '#2563eb', background: '#eff6ff' }}>dès 16,50 €/mois</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 800, color: '#1a3a5c' }}>10,00 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ══ GARANTIES ══ */}
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 16, padding: '28px 32px', marginBottom: 48, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
            {[
              { icon: '🛡️', titre: 'Satisfait ou remboursé', desc: '30 jours sans condition' },
              { icon: '⚡', titre: 'Accès immédiat', desc: 'Dès le paiement confirmé' },
              { icon: '🔒', titre: 'Paiement sécurisé', desc: 'SumUp · Conforme PCI DSS' },
              { icon: '📋', titre: 'Taux officiels 2026', desc: 'URSSAF · SMIC · PMSS' },
              { icon: '♻️', titre: 'Sans abonnement forcé', desc: 'Payez ce que vous utilisez' },
            ].map(({ icon, titre, desc }) => (
              <div key={titre} style={{ textAlign: 'center', minWidth: 140 }}>
                <div style={{ fontSize: 26, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#111827', marginBottom: 2 }}>{titre}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ FAQ ══ */}
        <div style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', marginBottom: 24 }}>Questions fréquentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 740, margin: '0 auto' }}>
            {[
              { q: 'Quelle différence entre le bulletin unitaire et l\'abonnement ?', a: 'Le bulletin unitaire (8,90 €) est idéal pour un besoin ponctuel ou pour tester. L\'abonnement donne accès à un quota mensuel adapté à votre effectif : 6 bulletins/mois (1-3 salariés), 18/mois (4-9), 48/mois (10-24) ou 98/mois (25-49). Pour l\'annuel, le quota se renouvelle chaque 1er du mois. Les contrats de travail (CDI, CDD, apprentissage) sont également inclus en illimité dans tous les abonnements.' },
              { q: 'Puis-je générer des bulletins pour plusieurs entreprises ?', a: 'Oui, avec un pack ou un abonnement. Vous pouvez saisir des informations d\'entreprise différentes pour chaque bulletin, sans surcoût.' },
              { q: 'Le contrat de travail est-il juridiquement valable ?', a: 'Oui. Les modèles respectent le Code du travail (articles L1221-1 et suivants) pour les CDI, CDD, contrats d\'apprentissage et conventions de stage. Nous vous recommandons de le faire relire par un professionnel pour les situations complexes.' },
              { q: 'Les taux URSSAF 2026 sont-ils bien à jour ?', a: 'Oui. Tous les taux officiels 2026 sont intégrés : PMSS 4 005 €, SMIC 1 801,80 €, réduction Fillon, AGIRC-ARRCO T1/T2, CSG/CRDS 2,90 %. Les abonnés bénéficient des mises à jour automatiques.' },
              { q: 'Comment fonctionne le remboursement ?', a: 'Remboursement intégral sous 30 jours, sans condition, sans question. Contactez-nous par email et nous remboursons sous 48h.' },
              { q: 'Puis-je annuler mon abonnement ?', a: 'Oui, à tout moment depuis votre espace client ou par email. Aucune période de préavis. Vous conservez l\'accès jusqu\'à la fin de la période payée.' },
            ].map(({ q, a }) => (
              <details key={q} style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#111827' }}>
                  {q}
                  <span style={{ color: '#94a3b8', fontSize: 20, fontWeight: 300, flexShrink: 0, marginLeft: 16 }}>+</span>
                </summary>
                <p style={{ padding: '0 20px 16px', margin: 0, color: '#6b7280', fontSize: 14, lineHeight: 1.7 }}>{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* ══ CTA FINAL ══ */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', borderRadius: 20, padding: '48px 32px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 12 }}>Prêt à commencer ?</h2>
          <p style={{ color: '#93c5fd', marginBottom: 32, fontSize: 15, maxWidth: 440, margin: '0 auto 32px' }}>
            Bulletin de salaire en 2 minutes · Contrat de travail professionnel · Accès immédiat
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <Link href="/generateur"
              style={{ background: '#22c55e', color: 'white', fontWeight: 800, fontSize: 15, padding: '14px 32px', borderRadius: 12, textDecoration: 'none' }}>
              Créer un bulletin →
            </Link>
            <Link href="/contrat"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 12, textDecoration: 'none' }}>
              Créer un contrat →
            </Link>
          </div>
          <p style={{ color: '#475569', fontSize: 12, marginTop: 20 }}>🛡️ Satisfait ou remboursé sous 30 jours · Sans engagement</p>
        </div>

      </div>

      <Footer />
    </div>
  );
}
