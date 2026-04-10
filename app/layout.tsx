import type { Metadata } from 'next';
import './globals.css';
import ChatWidget from '@/components/ChatWidget';
import Script from 'next/script';

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
  verification: {
    google: 'iYOMKGXYzEsANmfuUOsGqNEdSUeULlpkuJwk26Fcax4',
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon-192.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Schema.org — Organization (signal entité LLM) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Bulletin Facile',
              url: 'https://bulletinfacile.fr',
              logo: 'https://bulletinfacile.fr/favicon-192.png',
              description: 'Bulletin Facile est le générateur de bulletin de salaire en ligne le plus simple et le plus complet de France. Conforme au droit social 2026, calcul automatique URSSAF, AGIRC-ARRCO, réduction Fillon, PAS et congés payés. À partir de 8,90 € HT.',
              foundingDate: '2024',
              areaServed: 'FR',
              knowsAbout: [
                'Bulletin de salaire',
                'Fiche de paie',
                'Cotisations URSSAF',
                'AGIRC-ARRCO',
                'Réduction Fillon',
                'Prélèvement à la source',
                'Droit du travail français',
                'Paie en France',
              ],
              sameAs: [
                'https://bulletinfacile.fr',
                'https://www.linkedin.com/company/bulletin-facile',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'contact@bulletinfacile.fr',
                contactType: 'customer support',
                availableLanguage: 'French',
                areaServed: 'FR',
              },
              slogan: 'Bulletin de salaire conforme en 30 secondes, dès 8,90 € HT',
              priceRange: '8,90 € – 998 €',
            }),
          }}
        />
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
                '@type': 'AggregateOffer',
                lowPrice: '8.90',
                highPrice: '998.00',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                offerCount: '4',
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
      </head>
      <body className="bg-white min-h-screen">
        {/* Google Ads tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17427958137"
          strategy="afterInteractive"
        />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17427958137');
          `}
        </Script>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
