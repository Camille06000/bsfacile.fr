'use client';

/**
 * /success — Page de confirmation de paiement
 *
 * SumUp redirige ici après le paiement. On lit un éventuel ?email= dans l'URL
 * (passé par la logique de checkout) pour personnaliser le message.
 * En parallèle, le webhook SumUp a déjà créé le compte et envoyé le lien magique.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function SuccessPage() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email') ?? '';
    if (emailParam) setEmail(emailParam);
  }, []);

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: 'white', borderRadius: 24, padding: '48px 40px', maxWidth: 520, width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#111827', marginBottom: 12 }}>
            Paiement confirmé !
          </h1>
          <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.7, marginBottom: 20 }}>
            Merci pour votre achat. Votre accès à Bulletin Facile est maintenant activé.
          </p>

          {/* Magic link confirmation */}
          <div style={{
            background: '#f0f9ff',
            border: '1.5px solid #bae6fd',
            borderRadius: 14,
            padding: '18px 22px',
            marginBottom: 28,
            textAlign: 'left',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>📬</span>
              <div>
                <p style={{ fontWeight: 700, color: '#0369a1', margin: '0 0 4px', fontSize: 14 }}>
                  Votre lien de connexion a été envoyé
                </p>
                <p style={{ color: '#0c4a6e', fontSize: 14, margin: 0, lineHeight: 1.5 }}>
                  {email ? (
                    <>
                      Un email avec votre lien de connexion a été envoyé à{' '}
                      <strong>{email}</strong>. Cliquez dessus pour accéder à votre espace.
                    </>
                  ) : (
                    <>
                      Un email avec votre lien de connexion vous a été envoyé à l&apos;adresse
                      utilisée lors du paiement. Cliquez dessus pour accéder à votre espace.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/generateur"
            style={{
              display: 'block', background: '#2563eb', color: 'white',
              fontWeight: 800, fontSize: 17, padding: '16px 0',
              borderRadius: 12, textDecoration: 'none', marginBottom: 12,
            }}
          >
            Accéder au générateur →
          </Link>

          <Link
            href="/dashboard"
            style={{
              display: 'block', background: '#f3f4f6', color: '#374151',
              fontWeight: 700, fontSize: 15, padding: '14px 0',
              borderRadius: 12, textDecoration: 'none', marginBottom: 16,
            }}
          >
            Mon espace →
          </Link>

          <Link href="/" style={{ display: 'block', color: '#6b7280', fontSize: 14, textDecoration: 'none' }}>
            Retour à l'accueil
          </Link>

          <p style={{ fontSize: 12, color: '#d1d5db', marginTop: 20 }}>
            Un email de confirmation a également été envoyé par SumUp.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
