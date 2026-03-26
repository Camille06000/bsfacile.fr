import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bulletinfacile.fr';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/generateur`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/success`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
