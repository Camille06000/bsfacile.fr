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
    { url: `${base}/qui-sommes-nous`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/success`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
