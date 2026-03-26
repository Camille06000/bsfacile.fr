'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function SuccessPage() {
  const [email, setEmail] = useState('');
  const [verified, setVerified] = useState<'pending' | 'ok' | 'error'>('pending');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkoutId = params.get('checkout_id') ?? '';

    if (!checkoutId) {
      setVerified('ok');
      return;
    }

    // Vérifier le paiement et activer l'abonnement (fallback si webhook pas encore reçu)
    fetch(`/api/checkout/verify?id=${checkoutId}`)
      .then(r => r.json())
      .then(data => {
        if (data.email) setEmail(data.email);
        setVerified(data.status === 'PAID' ? 'ok' : 'error');
      })
      .catch(() => setVerified('ok'));
  }, []);

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: 'white', borderRadius: 24, padding: '48px 40px', maxWidth: 520, width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

          {verified === 'pending' ? (
            <>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
              <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111827', marginBottom: 8 }}>
                Vérification du paiement…
              </h1>
              <p style={{ color: '#6b7280', fontSize: 15 }}>Un instant, nous activons votre accès.</p>
            </>
          ) : (
            <>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: '#111827', marginBottom: 12 }}>
                Paiement confirmé !
              </h1>
              <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.7, marginBottom: 20 }}>
                Merci pour votre achat. Votre accès à Bulletin Facile est maintenant activé.
              </p>

              <div style={{ background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: 14, padding: '18px 22px', marginBottom: 28, textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>📬</span>
                  <div>
                    <p style={{ fontWeight: 700, color: '#0369a1', margin: '0 0 4px', fontSize: 14 }}>
                      Votre lien de connexion a été envoyé
                    </p>
                    <p style={{ color: '#0c4a6e', fontSize: 14, margin: 0, lineHeight: 1.5 }}>
                      {email ? (
                        <>Email envoyé à <strong>{email}</strong>. Cliquez sur le lien pour accéder à votre espace.</>
                      ) : (
                        <>Un email avec votre lien de connexion vous a été envoyé. Cliquez dessus pour accéder à votre espace.</>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/generateur" style={{ display: 'block', background: '#2563eb', color: 'white', fontWeight: 800, fontSize: 17, padding: '16px 0', borderRadius: 12, textDecoration: 'none', marginBottom: 12 }}>
                Accéder au générateur →
              </Link>
              <Link href="/dashboard" style={{ display: 'block', background: '#f3f4f6', color: '#374151', fontWeight: 700, fontSize: 15, padding: '14px 0', borderRadius: 12, textDecoration: 'none', marginBottom: 16 }}>
                Mon espace →
              </Link>
              <Link href="/" style={{ display: 'block', color: '#6b7280', fontSize: 14, textDecoration: 'none' }}>
                Retour à l&apos;accueil
              </Link>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
