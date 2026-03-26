import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function SuccessPage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: 'white', borderRadius: 24, padding: '48px 40px', maxWidth: 480, width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#111827', marginBottom: 12 }}>
            Paiement confirmé !
          </h1>
          <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            Merci pour votre achat. Votre accès à Bulletin Facile est maintenant activé. Vous pouvez générer vos bulletins de salaire immédiatement.
          </p>
          <Link href="/generateur" style={{ display: 'block', background: '#2563eb', color: 'white', fontWeight: 800, fontSize: 17, padding: '16px 0', borderRadius: 12, textDecoration: 'none', marginBottom: 16 }}>
            Accéder au générateur →
          </Link>
          <Link href="/" style={{ display: 'block', color: '#6b7280', fontSize: 14, textDecoration: 'none' }}>
            Retour à l'accueil
          </Link>
          <p style={{ fontSize: 12, color: '#d1d5db', marginTop: 20 }}>
            Un email de confirmation a été envoyé par SumUp.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
