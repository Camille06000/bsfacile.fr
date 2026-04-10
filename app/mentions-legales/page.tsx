import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de Bulletin Facile — éditeur, hébergeur, propriété intellectuelle, données personnelles.',
  alternates: { canonical: 'https://bulletinfacile.fr/mentions-legales' },
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#1a1a2e' }}>
      <Nav />
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '56px 24px 80px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Mentions légales</h1>
        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 48 }}>Dernière mise à jour : avril 2026</p>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>1. Éditeur du site</h2>
          <p style={{ lineHeight: 1.8, color: '#374151' }}>
            Le site <strong>bulletinfacile.fr</strong> est édité par <strong>Hub Center</strong>, société immatriculée en France.<br />
            SIRET : 953 893 161 00018<br />
            Adresse : 18 rue de la Buffa, 06000 Nice, France.<br />
            Email de contact : <a href="mailto:contact@bulletinfacile.fr" style={{ color: '#1a3a8f' }}>contact@bulletinfacile.fr</a>
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>2. Hébergeur</h2>
          <p style={{ lineHeight: 1.8, color: '#374151' }}>
            Le site est hébergé par <strong>Hostinger International Limited</strong>, société de droit lituanien (Union européenne), enregistrée sous le numéro 302854279.<br />
            Adresse : Švitrigailos str. 34, Vilnius, Lituanie — conforme au Règlement Général sur la Protection des Données (RGPD / UE 2016/679).
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>3. Propriété intellectuelle</h2>
          <p style={{ lineHeight: 1.8, color: '#374151' }}>
            L'ensemble des contenus du site bulletinfacile.fr (textes, graphiques, logotypes, logiciels, algorithmes de calcul) est protégé par le droit d'auteur. Toute reproduction, même partielle, sans autorisation écrite préalable est interdite.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>4. Données personnelles (RGPD)</h2>
          <p style={{ lineHeight: 1.8, color: '#374151' }}>
            Les données collectées (email, informations saisies dans le générateur) sont utilisées uniquement pour la fourniture du service. Elles ne sont pas revendues à des tiers. Conformément au RGPD (Règlement UE 2016/679), vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant : <a href="mailto:contact@bulletinfacile.fr" style={{ color: '#1a3a8f' }}>contact@bulletinfacile.fr</a>
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>5. Cookies</h2>
          <p style={{ lineHeight: 1.8, color: '#374151' }}>
            Le site utilise des cookies techniques nécessaires au fonctionnement du service (authentification, session). Aucun cookie publicitaire ou de tracking tiers n'est utilisé.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>6. Responsabilité</h2>
          <p style={{ lineHeight: 1.8, color: '#374151' }}>
            Les bulletins de salaire générés par Bulletin Facile s'appuient sur les taux officiels publiés par l'<strong>URSSAF</strong>, le <strong>BOSS (Bulletin Officiel de la Sécurité Sociale)</strong> et le <strong>Journal Officiel de la République Française</strong>. À l'instar de tous les logiciels de paie professionnels (PayFit, Silae, Sage Paie, Cegid), l'éditeur ne saurait être tenu responsable d'erreurs liées à des conventions collectives spécifiques non intégrées, à des modifications réglementaires non encore publiées au moment de la génération, ou à une saisie incorrecte des données par l'utilisateur. L'utilisateur demeure responsable de la vérification finale de ses bulletins, comme avec tout outil de paie.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
