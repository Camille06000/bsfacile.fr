'use client';

/**
 * /dashboard — Espace personnel de l'utilisateur
 *
 * - Non connecté : formulaire d'email pour recevoir un lien magique
 * - Connecté     : statut abonnement, bulletins restants, boutons d'action
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Subscription {
  id: number;
  type: string;
  status: string;
  bulletins_total: number;
  bulletins_used: number;
  expires_at: number | null;
  created_at: number;
}

interface User {
  id: number;
  email: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TYPE_LABELS: Record<string, string> = {
  single: 'Bulletin unique',
  pack5: 'Pack 5 bulletins',
  monthly: 'Abonnement mensuel',
  annual: 'Abonnement annuel',
};

function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function remainingLabel(sub: Subscription): string {
  if (sub.bulletins_total === 0) return 'Bulletins illimités';
  const remaining = sub.bulletins_total - sub.bulletins_used;
  return `${remaining} bulletin${remaining > 1 ? 's' : ''} restant${remaining > 1 ? 's' : ''}`;
}

// ---------------------------------------------------------------------------
// Error messages for URL ?error=
// ---------------------------------------------------------------------------

const ERROR_MESSAGES: Record<string, string> = {
  token_invalide: 'Le lien de connexion est invalide.',
  token_expire: 'Le lien de connexion a expiré. Demandez-en un nouveau.',
  token_deja_utilise: 'Ce lien de connexion a déjà été utilisé.',
  token_manquant: 'Lien de connexion manquant.',
  erreur_serveur: 'Une erreur est survenue. Veuillez réessayer.',
};

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  // Magic link form state
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState('');

  // URL error param
  const [urlError, setUrlError] = useState('');

  useEffect(() => {
    // Read ?error= from URL
    const params = new URLSearchParams(window.location.search);
    const errParam = params.get('error') ?? '';
    if (errParam) setUrlError(ERROR_MESSAGES[errParam] ?? 'Une erreur est survenue.');

    // Fetch current session
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setSubscription(data.subscription);
        }
      })
      .catch(() => {/* non connecté */})
      .finally(() => setLoading(false));
  }, []);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

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

  async function handleLogout() {
    await fetch('/api/auth/me', { method: 'DELETE' });
    setUser(null);
    setSubscription(null);
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      <main style={{ flex: 1, background: 'linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 100%)', padding: '48px 16px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: 64 }}>
              Chargement…
            </div>
          )}

          {/* URL error banner */}
          {!loading && urlError && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 12,
              padding: '14px 20px', marginBottom: 24, color: '#b91c1c', fontSize: 14,
            }}>
              {urlError}
            </div>
          )}

          {/* ---- NON CONNECTÉ ---- */}
          {!loading && !user && (
            <div style={{
              background: 'white', borderRadius: 24, padding: '40px 36px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔑</div>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: '#111827', marginBottom: 8 }}>
                  Mon espace
                </h1>
                <p style={{ color: '#6b7280', fontSize: 15 }}>
                  Entrez votre email pour recevoir un lien de connexion instantané.
                </p>
              </div>

              {sent ? (
                <div style={{
                  background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12,
                  padding: '20px 24px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📬</div>
                  <p style={{ color: '#15803d', fontWeight: 700, fontSize: 15, margin: '0 0 6px' }}>
                    Email envoyé !
                  </p>
                  <p style={{ color: '#166534', fontSize: 14, margin: 0 }}>
                    Vérifiez votre boîte mail et cliquez sur le lien (valable 15 minutes).
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMagicLink}>
                  <label style={{ display: 'block', fontWeight: 700, color: '#374151', marginBottom: 8, fontSize: 14 }}>
                    Adresse email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    style={{
                      width: '100%', padding: '14px 16px', fontSize: 16, borderRadius: 12,
                      border: '2px solid #e5e7eb', outline: 'none', boxSizing: 'border-box',
                      marginBottom: 16, transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                    onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                  />
                  {formError && (
                    <p style={{ color: '#dc2626', fontSize: 13, margin: '-8px 0 12px' }}>{formError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      width: '100%', background: sending ? '#93c5fd' : '#2563eb',
                      color: 'white', fontWeight: 800, fontSize: 16,
                      padding: '15px 0', borderRadius: 12, border: 'none',
                      cursor: sending ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
                    }}
                  >
                    {sending ? 'Envoi en cours…' : 'Recevoir mon lien de connexion →'}
                  </button>
                </form>
              )}

              <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 12, marginTop: 24 }}>
                Pas de mot de passe. Connexion sécurisée par email.
              </p>
            </div>
          )}

          {/* ---- CONNECTÉ ---- */}
          {!loading && user && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Header */}
              <div style={{
                background: 'white', borderRadius: 24, padding: '32px 36px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <h1 style={{ fontSize: 22, fontWeight: 900, color: '#111827', margin: '0 0 4px' }}>
                      Mon espace
                    </h1>
                    <p style={{ color: '#6b7280', fontSize: 14, margin: 0 }}>{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: '#f3f4f6', color: '#374151', fontWeight: 600, fontSize: 13,
                      padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    }}
                  >
                    Se déconnecter
                  </button>
                </div>
              </div>

              {/* Subscription status */}
              {subscription ? (
                <div style={{
                  background: 'white', borderRadius: 24, padding: '28px 36px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <span style={{
                      background: '#dcfce7', color: '#15803d', fontWeight: 700,
                      fontSize: 12, padding: '4px 12px', borderRadius: 999,
                    }}>
                      ACTIF
                    </span>
                    <span style={{ fontWeight: 800, color: '#111827', fontSize: 16 }}>
                      {TYPE_LABELS[subscription.type] ?? subscription.type}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <Row
                      label="Bulletins"
                      value={remainingLabel(subscription)}
                    />
                    {subscription.bulletins_total > 0 && (
                      <ProgressBar
                        used={subscription.bulletins_used}
                        total={subscription.bulletins_total}
                      />
                    )}
                    {subscription.expires_at && (
                      <Row
                        label="Expire le"
                        value={formatDate(subscription.expires_at)}
                      />
                    )}
                    <Row
                      label="Activé le"
                      value={formatDate(subscription.created_at)}
                    />
                  </div>
                </div>
              ) : (
                <div style={{
                  background: 'white', borderRadius: 24, padding: '28px 36px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)', textAlign: 'center',
                }}>
                  <p style={{ color: '#6b7280', fontSize: 15, margin: '0 0 20px' }}>
                    Vous n&apos;avez pas d&apos;abonnement actif.
                  </p>
                  <Link
                    href="/tarifs"
                    style={{
                      display: 'inline-block', background: '#2563eb', color: 'white',
                      fontWeight: 800, fontSize: 15, padding: '14px 28px',
                      borderRadius: 12, textDecoration: 'none',
                    }}
                  >
                    Voir les tarifs →
                  </Link>
                </div>
              )}

              {/* CTA */}
              {subscription && (
                <Link
                  href="/generateur"
                  style={{
                    display: 'block', background: '#2563eb', color: 'white', fontWeight: 800,
                    fontSize: 17, padding: '18px 0', borderRadius: 16, textDecoration: 'none',
                    textAlign: 'center', boxShadow: '0 4px 16px rgba(37,99,235,0.3)',
                  }}
                >
                  Créer un nouveau bulletin →
                </Link>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: '#6b7280', fontSize: 14 }}>{label}</span>
      <span style={{ color: '#111827', fontWeight: 600, fontSize: 14 }}>{value}</span>
    </div>
  );
}

function ProgressBar({ used, total }: { used: number; total: number }) {
  const pct = Math.min(100, Math.round((used / total) * 100));
  return (
    <div style={{ background: '#f3f4f6', borderRadius: 999, height: 8, overflow: 'hidden' }}>
      <div style={{
        width: `${pct}%`, height: '100%',
        background: pct >= 80 ? '#f59e0b' : '#2563eb',
        borderRadius: 999, transition: 'width 0.3s',
      }} />
    </div>
  );
}
