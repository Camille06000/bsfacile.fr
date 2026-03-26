import ContratForm from '@/components/ContratForm';

export const metadata = {
  title: 'Générateur de contrat de travail — Bulletin Facile',
  description: 'Créez votre contrat de travail (CDI, CDD, apprentissage, stage) en quelques minutes.',
};

export default function ContratPage() {
  return <ContratForm />;
}
