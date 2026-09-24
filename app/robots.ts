import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://kampusfilter.com';

  const disallowList = [
    '/api/',
    '/private/',
    '/apply',
    '/search',
    '/*?*sort=*',
    '/*?*type=*',
    '/*?*college=*',
    '/*?*course=*',
    '/*?*q=*',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowList,
      },
      // Explicitly allow leading AI search engines and chatbot indexers while protecting crawl budget
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'CCBot',
        ],
        allow: '/',
        disallow: disallowList,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
