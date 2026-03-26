import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // All crawlers — full access to content pages
      { userAgent: '*', allow: '/', disallow: ['/api/', '/success'] },
      // AI search bots — explicitly allowed for citation
      { userAgent: 'GPTBot',         allow: '/' },
      { userAgent: 'ChatGPT-User',   allow: '/' },
      { userAgent: 'PerplexityBot',  allow: '/' },
      { userAgent: 'ClaudeBot',      allow: '/' },
      { userAgent: 'anthropic-ai',   allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Bingbot',        allow: '/' },
      // Block AI training scrapers (but not search citation bots)
      { userAgent: 'CCBot',          disallow: '/' },
      { userAgent: 'omgili',         disallow: '/' },
      { userAgent: 'omgilibot',      disallow: '/' },
    ],
    sitemap: 'https://bulletinfacile.fr/sitemap.xml',
  };
}
