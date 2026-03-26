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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handlePay() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, description }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Erreur de paiement. Réessayez.');
        setLoading(false);
      }
    } catch {
      setError('Erreur réseau. Réessayez.');
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handlePay}
        disabled={loading}
        style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, ...style }}
        className={className}
      >
        {loading ? '⏳ Redirection...' : label}
      </button>
      {error && <p style={{ color: '#dc2626', fontSize: 12, marginTop: 4, textAlign: 'center' }}>{error}</p>}
    </div>
  );
}
