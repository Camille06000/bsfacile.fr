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

export default function GenerateurPage() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setSubscription(data.subscription);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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

  // Not logged in
  if (!user) {
    return (
      <div style={{ fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <main style={{ flex: 1, background: 'linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
          <div style={{ background: 'white', borderRadius: 24, padding: '48px 40px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', maxWidth: 480, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🔑</div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111827', marginBottom: 12 }}>
              Connexion requise
            </h1>
            <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
              Connectez-vous à votre espace personnel pour accéder au générateur de bulletins de paie.
            </p>
            <Link
              href="/dashboard"
              style={{ display: 'inline-block', background: '#2563eb', color: 'white', fontWeight: 800, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none' }}
            >
              Se connecter →
            </Link>
            <p style={{ marginTop: 24, color: '#9ca3af', fontSize: 13 }}>
              Pas encore de compte ?{' '}
              <Link href="/tarifs" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>
                Voir les offres
              </Link>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Logged in but no subscription
  if (!subscription) {
    return (
      <div style={{ fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <main style={{ flex: 1, background: 'linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
          <div style={{ background: 'white', borderRadius: 24, padding: '48px 40px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', maxWidth: 480, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎫</div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111827', marginBottom: 12 }}>
              Abonnement requis
            </h1>
            <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 8, lineHeight: 1.6 }}>
              Bonjour <strong>{user.email}</strong>
            </p>
            <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
              Vous n&apos;avez pas d&apos;abonnement actif. Choisissez une offre pour générer vos bulletins de paie.
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

  // Logged in with active subscription — show the form
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
