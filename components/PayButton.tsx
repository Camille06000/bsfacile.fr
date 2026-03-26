'use client';
import { useState } from 'react';

interface PayButtonProps {
  amount: number;
  description: string;
  label: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function PayButton({ amount, description, label, style, className }: PayButtonProps) {
  const [step, setStep] = useState<'button' | 'email' | 'loading'>('button');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

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
      if (data.url) {
        window.location.href = data.url;
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
      <div>
        <button
          onClick={() => setStep('email')}
          style={{ cursor: 'pointer', ...style }}
          className={className}
        >
          {label}
        </button>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <span style={{ fontSize: 14, color: '#6b7280' }}>⏳ Redirection vers le paiement…</span>
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
        <button
          onClick={handlePay}
          style={{ ...style, flex: '0 0 auto', cursor: 'pointer' }}
          className={className}
        >
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
