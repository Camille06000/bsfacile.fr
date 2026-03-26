'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BulletinForm from '@/components/BulletinForm';

interface Subscription {
  id: number;
  type: string;
  bulletins_total: number;
  bulletins_used: number;
  expires_at: number | null;
}

interface User {
  id: number;
  email: string;
}

const TYPE_LABELS: Record<string, string> = {
  single: 'Bulletin unique',
  pack5: 'Pack 5 bulletins',
  monthly: 'Abonnement mensuel',
  annual: 'Abonnement annuel',
};

const FREE_LIMIT = 3;

export default function GenerateurPage() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [freeBulletinsUsed, setFreeBulletinsUsed] = useState(0);
  const [loading, setLoading] = useState(true);

  // Magic link form state (for non-logged-in users)
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setSubscription(data.subscription ?? null);
          setFreeBulletinsUsed(data.freeBulletinsUsed ?? 0);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');
    setSending(true);
    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Erreur lors de l'envoi.");
      } else {
        setSent(true);
      }
    } catch {
      setFormError('Erreur réseau. Veuillez réessayer.');
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div style={{ fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#6b7280' }}>Chargement…</p>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Cas 1 : Non connecté ──────────────────────────────────────────────────
  if (!user) {
    return (
      <div style={{ fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <main style={{ flex: 1, background: 'linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
          <div style={{ background: 'white', borderRadius: 24, padding: '48px 40px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', maxWidth: 480, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎁</div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111827', marginBottom: 12 }}>
              3 bulletins gratuits
            </h1>
            <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 8, lineHeight: 1.6 }}>
              Créez un compte <strong>gratuitement</strong> — sans carte bancaire.
            </p>
            <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
              Vos 3 premiers bulletins sont gratuits (avec filigrane DÉMO). Payez uniquement si vous avez besoin de plus.
            </p>

            {sent ? (
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: '20px 24px' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📬</div>
                <p style={{ color: '#15803d', fontWeight: 700, fontSize: 15, margin: '0 0 6px' }}>Email envoyé !</p>
                <p style={{ color: '#166534', fontSize: 14, margin: 0 }}>
                  Vérifiez votre boîte mail et cliquez sur le lien (valable 15 minutes).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMagicLink}>
                <label style={{ display: 'block', fontWeight: 700, color: '#374151', marginBottom: 8, fontSize: 14, textAlign: 'left' }}>
                  Adresse email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  style={{ width: '100%', padding: '14px 16px', fontSize: 16, borderRadius: 12, border: '2px solid #e5e7eb', outline: 'none', boxSizing: 'border-box', marginBottom: 16 }}
                  onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                  onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                />
                {formError && (
                  <p style={{ color: '#dc2626', fontSize: 13, margin: '-8px 0 12px' }}>{formError}</p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  style={{ width: '100%', background: sending ? '#93c5fd' : '#2563eb', color: 'white', fontWeight: 800, fontSize: 16, padding: '15px 0', borderRadius: 12, border: 'none', cursor: sending ? 'not-allowed' : 'pointer' }}
                >
                  {sending ? 'Envoi en cours…' : 'Créer mon compte gratuit →'}
                </button>
              </form>
            )}

            <p style={{ marginTop: 20, color: '#9ca3af', fontSize: 12 }}>
              Pas de mot de passe. Connexion sécurisée par email.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Cas 2 : Connecté SANS abonnement + quota épuisé ───────────────────────
  if (!subscription && freeBulletinsUsed >= FREE_LIMIT) {
    return (
      <div style={{ fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <main style={{ flex: 1, background: 'linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
          <div style={{ background: 'white', borderRadius: 24, padding: '48px 40px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', maxWidth: 480, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎫</div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111827', marginBottom: 12 }}>
              Bulletins gratuits épuisés
            </h1>
            <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 8, lineHeight: 1.6 }}>
              Bonjour <strong>{user.email}</strong>
            </p>
            <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
              Vous avez utilisé vos <strong>3 bulletins gratuits</strong>. Choisissez une offre pour continuer à générer des bulletins sans filigrane.
            </p>
            <Link
              href="/tarifs"
              style={{ display: 'inline-block', background: '#2563eb', color: 'white', fontWeight: 800, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none' }}
            >
              Voir les offres →
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Cas 3 : Connecté SANS abonnement + quota disponible ──────────────────
  if (!subscription) {
    const remaining = FREE_LIMIT - freeBulletinsUsed;
    return (
      <div style={{ fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        {/* Free bulletin banner */}
        <div style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ background: '#fef3c7', color: '#92400e', fontWeight: 700, fontSize: 12, padding: '3px 10px', borderRadius: 999 }}>
            GRATUIT
          </span>
          <span style={{ color: '#78350f', fontSize: 14, fontWeight: 600 }}>
            Bulletin gratuit ({freeBulletinsUsed}/{FREE_LIMIT} utilisés) — Ce bulletin comportera un filigrane DÉMO
          </span>
          <span style={{ color: '#92400e', fontSize: 13 }}>
            · {remaining} bulletin{remaining > 1 ? 's' : ''} gratuit{remaining > 1 ? 's' : ''} restant{remaining > 1 ? 's' : ''}
          </span>
          <Link
            href="/tarifs"
            style={{ color: '#2563eb', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}
          >
            Passer à une offre payante →
          </Link>
        </div>
        <main style={{ flex: 1 }}>
          <BulletinForm />
        </main>
        <Footer />
      </div>
    );
  }

  // ── Cas 4 : Connecté AVEC abonnement actif ────────────────────────────────
  const remaining = subscription.bulletins_total > 0 ? subscription.bulletins_total - subscription.bulletins_used : null;

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      {/* Subscription badge */}
      <div style={{ background: '#f0fdf4', borderBottom: '1px solid #bbf7d0', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ background: '#dcfce7', color: '#15803d', fontWeight: 700, fontSize: 12, padding: '3px 10px', borderRadius: 999 }}>
          ACTIF
        </span>
        <span style={{ color: '#166534', fontSize: 14, fontWeight: 600 }}>
          {TYPE_LABELS[subscription.type] ?? subscription.type}
        </span>
        {remaining !== null && (
          <span style={{ color: '#166534', fontSize: 13 }}>
            · {remaining} bulletin{remaining > 1 ? 's' : ''} restant{remaining > 1 ? 's' : ''}
          </span>
        )}
        {remaining === null && (
          <span style={{ color: '#166534', fontSize: 13 }}>· Bulletins illimités</span>
        )}
      </div>
      <main style={{ flex: 1 }}>
        <BulletinForm />
      </main>
      <Footer />
    </div>
  );
}
