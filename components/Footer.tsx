import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#111827', color: '#9ca3af', padding: '48px 24px 32px', fontSize: 13 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ color: 'white', fontWeight: 900, fontSize: 16, marginBottom: 12 }}>Bulletin Facile</div>
            <p style={{ lineHeight: 1.7, fontSize: 13 }}>Générateur de bulletin de salaire français conforme au droit social 2025/2026.</p>
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, marginBottom: 12 }}>Outils</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/generateur" style={{ color: '#9ca3af', textDecoration: 'none' }}>Bulletin de paie</Link>
              <Link href="/contrat" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contrat de travail</Link>
              <Link href="/tarifs" style={{ color: '#9ca3af', textDecoration: 'none' }}>Tarifs</Link>
            </div>
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, marginBottom: 12 }}>Guides</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/smic-2026" style={{ color: '#9ca3af', textDecoration: 'none' }}>SMIC 2026</Link>
              <Link href="/salaire-brut-en-net" style={{ color: '#9ca3af', textDecoration: 'none' }}>Brut en Net</Link>
              <Link href="/comment-lire-fiche-de-paie" style={{ color: '#9ca3af', textDecoration: 'none' }}>Lire une fiche de paie</Link>
            </div>
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, marginBottom: 12 }}>À propos</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/qui-sommes-nous" style={{ color: '#9ca3af', textDecoration: 'none' }}>Qui sommes-nous ?</Link>
              <a href="mailto:contact@bulletinfacile.fr" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1f2937', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
          <p>© {new Date().getFullYear()} <span style={{ color: 'white', fontWeight: 700 }}>Bulletin Facile</span> · Conformité URSSAF 2025/2026</p>
          <p>Paiement sécurisé · Satisfait ou remboursé 30 jours</p>
        </div>
      </div>
    </footer>
  );
}
