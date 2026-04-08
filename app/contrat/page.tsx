import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ContratForm from '@/components/ContratForm';

export const metadata = {
  title: 'Contrat de travail en ligne — CDI, CDD, Apprentissage | Bulletin Facile',
  description: 'Générez votre contrat de travail (CDI, CDD, apprentissage) conforme au Code du travail 2026. Document professionnel prêt à signer. 10 € HT — accès immédiat.',
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
