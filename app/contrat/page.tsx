import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ContratForm from '@/components/ContratForm';

export const metadata = {
  title: 'Générateur de contrat de travail gratuit — CDI, CDD, Apprentissage | Bulletin Facile',
  description: 'Créez votre contrat de travail (CDI, CDD, apprentissage, stage) en quelques minutes. Conforme au Code du travail 2025/2026. Gratuit et sans inscription.',
};

export default function ContratPage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <ContratForm />
      </main>
      <Footer />
    </div>
  );
}
