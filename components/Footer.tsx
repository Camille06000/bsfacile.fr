import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{ background: '#111827', color: '#9ca3af', padding: '48px 24px 32px', fontSize: 13 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, marginBottom: 40 }}>
          <div>
            <Image src="/logo.svg" alt="Bulletin Facile" width={140} height={38} style={{ height: 38, width: 'auto', marginBottom: 12, filter: 'brightness(0) invert(1)' }} />
            <p style={{ lineHeight: 1.7, fontSize: 13, marginTop: 8 }}>Générateur de bulletin de salaire français conforme au droit social 2025/2026.</p>
            <p style={{ marginTop: 10, color: '#4b5563', fontSize: 12 }}>3 bulletins gratuits · Sans carte bancaire</p>
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, marginBottom: 12 }}>Outils</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/generateur" style={{ color: '#9ca3af', textDecoration: 'none' }}>Bulletin de paie</Link>
              <Link href="/contrat" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contrat de travail</Link>
              <Link href="/tarifs" style={{ color: '#9ca3af', textDecoration: 'none' }}>Tarifs</Link>
              <Link href="/dashboard" style={{ color: '#9ca3af', textDecoration: 'none' }}>Mon espace</Link>
            </div>
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, marginBottom: 12 }}>Guides salaire</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/smic-2026" style={{ color: '#9ca3af', textDecoration: 'none' }}>SMIC 2026</Link>
              <Link href="/salaire-brut-en-net" style={{ color: '#9ca3af', textDecoration: 'none' }}>Brut en Net</Link>
              <Link href="/comment-lire-fiche-de-paie" style={{ color: '#9ca3af', textDecoration: 'none' }}>Lire une fiche de paie</Link>
              <Link href="/creer-une-fiche-de-paie" style={{ color: '#9ca3af', textDecoration: 'none' }}>Créer une fiche de paie</Link>
              <Link href="/prelevement-a-la-source" style={{ color: '#9ca3af', textDecoration: 'none' }}>Prélèvement à la source</Link>
            </div>
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, marginBottom: 12 }}>Guides droit social</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/reduction-fillon" style={{ color: '#9ca3af', textDecoration: 'none' }}>Réduction Fillon</Link>
              <Link href="/arret-maladie-fiche-de-paie" style={{ color: '#9ca3af', textDecoration: 'none' }}>Arrêt maladie</Link>
              <Link href="/heures-supplementaires-fiche-de-paie" style={{ color: '#9ca3af', textDecoration: 'none' }}>Heures supplémentaires</Link>
              <Link href="/combien-coute-un-salarie" style={{ color: '#9ca3af', textDecoration: 'none' }}>Coût d&apos;un salarié</Link>
              <Link href="/net-social" style={{ color: '#9ca3af', textDecoration: 'none' }}>Net social</Link>
              <Link href="/solde-de-tout-compte" style={{ color: '#9ca3af', textDecoration: 'none' }}>Solde de tout compte</Link>
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
