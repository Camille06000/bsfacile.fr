import type { Metadata } from 'next';
import './globals.css';

const BASE = 'https://bulletinfacile.fr';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Bulletin Facile — Générateur de Bulletin de Salaire France 2025/2026',
    template: '%s | Bulletin Facile',
  },
  description: 'Générez vos bulletins de salaire français en 30 secondes. Cotisations URSSAF, AGIRC-ARRCO, CSG/CRDS calculées automatiquement. Conforme droit social 2025/2026. Dès 8,90€.',
  keywords: [
    'bulletin de salaire', 'fiche de paie', 'générateur bulletin de salaire',
    'cotisations sociales', 'URSSAF 2025', 'AGIRC-ARRCO', 'CSG CRDS',
    'réduction Fillon', 'salaire brut net', 'calcul cotisations patronales',
    'logiciel paie gratuit', 'bulletin de salaire en ligne',
  ],
  authors: [{ name: 'Bulletin Facile', url: BASE }],
  creator: 'Bulletin Facile',
  publisher: 'Bulletin Facile',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE,
    siteName: 'Bulletin Facile',
    title: 'Bulletin Facile — Générateur de Bulletin de Salaire France 2025/2026',
    description: 'Générez vos bulletins de salaire français en 30 secondes. URSSAF, AGIRC-ARRCO, CSG/CRDS. Conforme 2025/2026. Dès 8,90€.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Bulletin Facile — Générateur de bulletin de salaire' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bulletin Facile — Bulletin de Salaire France en 30 secondes',
    description: 'Cotisations URSSAF, AGIRC-ARRCO, CSG/CRDS calculées automatiquement. Conforme 2025/2026.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Schema.org — SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Bulletin Facile',
              url: BASE,
              description: 'Générateur de bulletin de salaire français conforme au droit social 2025/2026. Calcul automatique des cotisations URSSAF, AGIRC-ARRCO, CSG/CRDS et réduction Fillon.',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '49.00',
                priceCurrency: 'EUR',
                priceValidUntil: '2027-12-31',
                availability: 'https://schema.org/InStock',
                name: 'Accès à vie',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '47',
                bestRating: '5',
              },
              featureList: [
                'Calcul cotisations URSSAF 2025/2026',
                'AGIRC-ARRCO tranche 1 et 2',
                'CSG/CRDS déductible et non déductible',
                'Réduction Fillon automatique',
                'Cadre et non-cadre',
                'Effectif < 50 et ≥ 50 salariés',
                'Export PDF',
              ],
            }),
          }}
        />
        {/* Schema.org — FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Les taux de cotisations sont-ils à jour pour 2026 ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Oui. PMSS 4 005 €, taux URSSAF, AGIRC-ARRCO, CSG/CRDS, réduction Fillon — tous intégrés et mis à jour à chaque changement légal.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Bulletin Facile fonctionne-t-il pour les cadres et les non-cadres ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Oui. Cadres : APEC, tranches AGIRC-ARRCO T2, CEG T2. Non-cadres : taux standards. Effectif < 50 ou ≥ 50 salariés également pris en compte.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Comment fonctionne le paiement à vie ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Vous payez 49€ une seule fois et accédez à Bulletin Facile sans limite de durée, y compris toutes les futures mises à jour légales.',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-white min-h-screen">{children}</body>
    </html>
  );
}
