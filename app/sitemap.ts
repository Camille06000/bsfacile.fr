import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bulletinfacile.fr';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/generateur`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/tarifs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/smic-2026`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/salaire-brut-en-net`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/comment-lire-fiche-de-paie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/creer-une-fiche-de-paie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/prelevement-a-la-source`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/combien-coute-un-salarie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/heures-supplementaires-fiche-de-paie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/reduction-fillon`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/arret-maladie-fiche-de-paie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/net-social`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/solde-de-tout-compte`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/qui-sommes-nous`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/success`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
