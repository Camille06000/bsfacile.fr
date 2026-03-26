'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Nav({ currentPath }: { currentPath?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ position: 'sticky', top: 0, background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid #e5e7eb', zIndex: 50, backdropFilter: 'blur(8px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.svg" alt="Bulletin Facile" width={160} height={42} priority style={{ height: 42, width: 'auto' }} />
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 14 }}>
          <Link href="/generateur" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>Générateur</Link>
          <Link href="/contrat" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>Contrat de travail</Link>
          <Link href="/tarifs" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>Tarifs</Link>
          <Link href="/dashboard" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>Mon espace</Link>
          <Link href="/tarifs" style={{ background: '#1d4ed8', color: 'white', fontWeight: 700, fontSize: 13, padding: '8px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Commencer →
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', flexDirection: 'column', gap: 5 }}
          aria-label="Menu"
        >
          <span style={{ display: 'block', width: 22, height: 2, background: '#374151', transition: '0.2s', transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: 22, height: 2, background: '#374151', transition: '0.2s', opacity: open ? 0 : 1 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: '#374151', transition: '0.2s', transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'white', borderTop: '1px solid #f3f4f6', padding: '16px 20px 20px' }}>
          {[
            { href: '/generateur', label: '📄 Générateur de bulletin' },
            { href: '/contrat', label: '📝 Contrat de travail' },
            { href: '/tarifs', label: '💰 Tarifs' },
            { href: '/dashboard', label: '👤 Mon espace' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '13px 0', borderBottom: '1px solid #f3f4f6', color: '#374151', textDecoration: 'none', fontWeight: 500, fontSize: 15 }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/tarifs"
            onClick={() => setOpen(false)}
            style={{ display: 'block', marginTop: 16, background: '#1d4ed8', color: 'white', fontWeight: 700, fontSize: 15, padding: '14px 20px', borderRadius: 10, textDecoration: 'none', textAlign: 'center' }}
          >
            Commencer — dès 8,90 € →
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            style={{ display: 'block', marginTop: 10, background: '#f3f4f6', color: '#374151', fontWeight: 600, fontSize: 14, padding: '12px 20px', borderRadius: 10, textDecoration: 'none', textAlign: 'center' }}
          >
            3 bulletins gratuits →
          </Link>
        </div>
      )}
    </nav>
  );
}
