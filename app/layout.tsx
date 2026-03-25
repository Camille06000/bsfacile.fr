import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BS Facile — Générateur de Bulletin de Salaire France',
  description: 'Générez des bulletins de salaire français conformes 2025/2026 en quelques secondes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
