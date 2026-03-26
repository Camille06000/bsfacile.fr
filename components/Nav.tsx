import Link from 'next/link';

export default function Nav({ currentPath }: { currentPath?: string }) {
  return (
    <nav style={{ position: 'sticky', top: 0, background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid #e5e7eb', zIndex: 50, backdropFilter: 'blur(8px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontWeight: 900, fontSize: 20, color: '#1e40af', textDecoration: 'none', letterSpacing: '-0.5px' }}>
          Bulletin Facile
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 14 }}>
          <Link href="/generateur" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>Bulletin de paie</Link>
          <Link href="/contrat" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>Contrat de travail</Link>
          <Link href="/tarifs" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>Tarifs</Link>
          <Link href="/tarifs" style={{ background: '#1d4ed8', color: 'white', fontWeight: 700, fontSize: 13, padding: '8px 18px', borderRadius: 8, textDecoration: 'none' }}>
            Commencer →
          </Link>
        </div>
      </div>
    </nav>
  );
}
