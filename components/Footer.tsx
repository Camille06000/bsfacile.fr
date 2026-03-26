'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('ok');
        setMessage(data.message || 'Inscrit !');
        setPrenom('');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Erreur.');
      }
    } catch {
      setStatus('error');
      setMessage('Erreur réseau.');
    }
  }

  return (
    <footer style={{ background: '#0f172a', color: '#9ca3af', fontSize: 13 }}>

      {/* NEWSLETTER BAND */}
      <div style={{ background: 'linear-gradient(135deg,#1a3a8f 0%,#2563eb 60%,#1d4ed8 100%)', padding: '48px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', borderRadius: 50, padding: '4px 16px', fontSize: 12, color: 'white', fontWeight: 700, marginBottom: 16 }}>
            📬 NEWSLETTER GRATUITE
          </div>
          <h3 style={{ margin: '0 0 10px', fontSize: 'clamp(20px,4vw,28px)', fontWeight: 900, color: 'white', lineHeight: 1.2 }}>
            Recevez nos astuces paie<br />chaque semaine ✉️
          </h3>
          <p style={{ margin: '0 0 28px', color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.6 }}>
            Réduction Fillon, SMIC, congés payés… Les actus sociales qui vous font gagner du temps et de l&apos;argent.
          </p>
          {status === 'ok' ? (
            <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 14, padding: '20px 28px', color: 'white', fontSize: 16, fontWeight: 600 }}>
              🎉 {message}
            </div>
          ) : (
            <form onSubmit={handleSubscribe}>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 }}>
                <input
                  type="text"
                  placeholder="Votre prénom"
                  value={prenom}
                  onChange={e => setPrenom(e.target.value)}
                  required
                  minLength={2}
                  style={{ flex: '1 1 140px', maxWidth: 180, padding: '14px 18px', borderRadius: 10, border: 'none', fontSize: 15, outline: 'none', fontFamily: 'inherit' }}
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{ flex: '2 1 220px', maxWidth: 280, padding: '14px 18px', borderRadius: 10, border: 'none', fontSize: 15, outline: 'none', fontFamily: 'inherit' }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{ flex: '0 0 auto', background: '#dc2626', color: 'white', border: 'none', borderRadius: 10, padding: '14px 24px', fontSize: 15, fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  {status === 'loading' ? '…' : "Je m'inscris →"}
                </button>
              </div>
              {status === 'error' && <p style={{ color: '#fca5a5', fontSize: 13, margin: 0 }}>{message}</p>}
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
                Pas de spam · Désinscription en 1 clic · RGPD conforme
              </p>
            </form>
          )}
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div style={{ padding: '48px 24px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, marginBottom: 40 }}>

            {/* BRAND */}
            <div>
              <div style={{ marginBottom: 16 }}>
                <Image
                  src="/logo.svg"
                  alt="Bulletin Facile"
                  width={160}
                  height={40}
                  style={{ height: 40, width: 'auto', filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <p style={{ lineHeight: 1.7, fontSize: 13, margin: 0 }}>
                Générateur de bulletin de salaire français conforme au droit social 2025/2026.
              </p>
              <p style={{ marginTop: 10, color: '#4b5563', fontSize: 12 }}>3 bulletins gratuits · Sans carte bancaire</p>
            </div>

            {/* OUTILS */}
            <div>
              <div style={{ color: 'white', fontWeight: 700, marginBottom: 12 }}>Outils</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link href="/generateur" style={{ color: '#9ca3af', textDecoration: 'none' }}>Bulletin de paie</Link>
                <Link href="/contrat" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contrat de travail</Link>
                <Link href="/tarifs" style={{ color: '#9ca3af', textDecoration: 'none' }}>Tarifs</Link>
                <Link href="/dashboard" style={{ color: '#9ca3af', textDecoration: 'none' }}>Mon espace</Link>
              </div>
            </div>

            {/* GUIDES SALAIRE */}
            <div>
              <div style={{ color: 'white', fontWeight: 700, marginBottom: 12 }}>Guides salaire</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link href="/smic-2026" style={{ color: '#9ca3af', textDecoration: 'none' }}>SMIC 2026</Link>
                <Link href="/salaire-brut-en-net" style={{ color: '#9ca3af', textDecoration: 'none' }}>Brut en Net</Link>
                <Link href="/comment-lire-fiche-de-paie" style={{ color: '#9ca3af', textDecoration: 'none' }}>Lire une fiche de paie</Link>
                <Link href="/creer-une-fiche-de-paie" style={{ color: '#9ca3af', textDecoration: 'none' }}>Créer une fiche de paie</Link>
                <Link href="/prelevement-a-la-source" style={{ color: '#9ca3af', textDecoration: 'none' }}>Prélèvement à la source</Link>
              </div>
            </div>

            {/* GUIDES DROIT */}
            <div>
              <div style={{ color: 'white', fontWeight: 700, marginBottom: 12 }}>Guides droit social</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link href="/reduction-fillon" style={{ color: '#9ca3af', textDecoration: 'none' }}>Réduction Fillon</Link>
                <Link href="/arret-maladie-fiche-de-paie" style={{ color: '#9ca3af', textDecoration: 'none' }}>Arrêt maladie</Link>
                <Link href="/heures-supplementaires-fiche-de-paie" style={{ color: '#9ca3af', textDecoration: 'none' }}>Heures supplémentaires</Link>
                <Link href="/combien-coute-un-salarie" style={{ color: '#9ca3af', textDecoration: 'none' }}>Coût d&apos;un salarié</Link>
                <Link href="/net-social" style={{ color: '#9ca3af', textDecoration: 'none' }}>Net social</Link>
                <Link href="/solde-de-tout-compte" style={{ color: '#9ca3af', textDecoration: 'none' }}>Solde de tout compte</Link>
              </div>
            </div>

            {/* À PROPOS */}
            <div>
              <div style={{ color: 'white', fontWeight: 700, marginBottom: 12 }}>À propos</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link href="/qui-sommes-nous" style={{ color: '#9ca3af', textDecoration: 'none' }}>Qui sommes-nous ?</Link>
                <a href="mailto:contact@bulletinfacile.fr" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</a>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div style={{ borderTop: '1px solid #1f2937', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} <span style={{ color: 'white', fontWeight: 700 }}>Bulletin Facile</span> · Conformité URSSAF 2025/2026</p>
            <p style={{ margin: 0 }}>Paiement sécurisé · Satisfait ou remboursé 30 jours</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
