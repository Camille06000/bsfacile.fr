'use client';
import { useState, useEffect, useRef } from 'react';

interface PayButtonProps {
  amount: number;
  description: string;
  label: string;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    SumUpCard: {
      mount: (options: {
        id: string;
        checkoutId: string;
        showEmail?: boolean;
        email?: string;
        amount?: number;
        currency?: string;
        locale?: string;
        onResponse: (type: string, body: unknown) => void;
        onLoad?: () => void;
      }) => void;
      unmount: () => void;
    };
  }
}

export default function PayButton({ amount, description, label, style, className }: PayButtonProps) {
  const [step, setStep] = useState<'button' | 'email' | 'loading' | 'widget' | 'success' | 'error'>('button');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [checkoutId, setCheckoutId] = useState('');
  const scriptLoaded = useRef(false);

  // Charger le SDK SumUp une seule fois
  useEffect(() => {
    if (scriptLoaded.current) return;
    const script = document.createElement('script');
    script.src = 'https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js';
    script.async = true;
    document.head.appendChild(script);
    scriptLoaded.current = true;
  }, []);

  // Monter le widget quand checkoutId est prêt
  useEffect(() => {
    if (step !== 'widget' || !checkoutId) return;

    const tryMount = () => {
      if (!window.SumUpCard) {
        setTimeout(tryMount, 200);
        return;
      }
      window.SumUpCard.mount({
        id: 'sumup-card-widget',
        checkoutId,
        email,
        showEmail: false,
        amount,
        currency: 'EUR',
        locale: 'fr-FR',
        country: 'FR',
        // Google Pay
        googlePay: {
          merchantId: process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID || 'BCR2DN4TXLQJJ44A',
          merchantName: 'Bulletin Facile',
        },
        // Apple Pay — activé automatiquement sur Safari/iOS
        onResponse: async (type, body) => {
          console.log('[SumUp]', type, body);
          if (type === 'success') {
            // Vérifier côté serveur et activer l'abonnement
            try {
              await fetch(`/api/checkout/verify?id=${checkoutId}`);
            } catch { /* ok */ }
            setStep('success');
            window.SumUpCard.unmount();
          } else if (type === 'fail' || type === 'error') {
            setError('Paiement refusé ou annulé. Veuillez réessayer.');
            setStep('email');
            window.SumUpCard.unmount();
          }
        },
      });
    };
    tryMount();

    return () => {
      if (window.SumUpCard) {
        try { window.SumUpCard.unmount(); } catch { /* ok */ }
      }
    };
  }, [step, checkoutId, email, amount]);

  async function handlePay() {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Entrez une adresse email valide.');
      return;
    }
    setStep('loading');
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, description, email }),
      });
      const data = await res.json();
      if (data.checkoutId) {
        setCheckoutId(data.checkoutId);
        setStep('widget');
      } else {
        setError('Erreur de paiement. Réessayez.');
        setStep('email');
      }
    } catch {
      setError('Erreur réseau. Réessayez.');
      setStep('email');
    }
  }

  if (step === 'button') {
    return (
      <button onClick={() => setStep('email')} style={{ cursor: 'pointer', ...style }} className={className}>
        {label}
      </button>
    );
  }

  if (step === 'success') {
    return (
      <div style={{ border: '2px solid #16a34a', borderRadius: 12, padding: '20px', background: '#f0fdf4', textAlign: 'center' }}>
        <p style={{ fontSize: 24, margin: '0 0 8px' }}>✅</p>
        <p style={{ fontWeight: 700, color: '#15803d', margin: '0 0 6px' }}>Paiement confirmé !</p>
        <p style={{ fontSize: 13, color: '#166534', margin: 0 }}>
          Un lien de connexion a été envoyé à <strong>{email}</strong>
        </p>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <span style={{ fontSize: 14, color: '#6b7280' }}>⏳ Chargement du paiement…</span>
      </div>
    );
  }

  if (step === 'widget') {
    return (
      <div style={{ border: '2px solid #1a3a8f', borderRadius: 12, padding: '20px', background: '#eff6ff' }}>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: '#1e40af', fontWeight: 600 }}>
          💳 Paiement sécurisé — {amount.toFixed(2).replace('.', ',')} € HT
        </p>
        <div id="sumup-card-widget" />
        <p style={{ margin: '12px 0 0', fontSize: 11, color: '#6b7280', textAlign: 'center' }}>
          🔒 Carte · Apple Pay · Google Pay · Conforme PCI DSS
        </p>
      </div>
    );
  }

  // step === 'email'
  return (
    <div style={{ border: '2px solid #1a3a8f', borderRadius: 12, padding: '16px 20px', background: '#eff6ff' }}>
      <p style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: '#1a3a8f' }}>
        📧 Votre email pour recevoir l&apos;accès :
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          type="email"
          placeholder="prenom@email.fr"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handlePay()}
          autoFocus
          style={{ flex: '1 1 180px', padding: '10px 14px', borderRadius: 8, border: '1px solid #93c5fd', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
        />
        <button onClick={handlePay} style={{ ...style, flex: '0 0 auto', cursor: 'pointer' }} className={className}>
          Payer →
        </button>
      </div>
      {error && <p style={{ color: '#dc2626', fontSize: 12, marginTop: 6, margin: '6px 0 0' }}>{error}</p>}
      <p style={{ margin: '8px 0 0', fontSize: 11, color: '#6b7280' }}>
        Un lien de connexion vous sera envoyé après le paiement.
      </p>
    </div>
  );
}
