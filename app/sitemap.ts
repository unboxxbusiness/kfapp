import { MetadataRoute } from 'next';
import { getArticleSlugsForSitemap, getAllCategorySlugs } from '@/lib/supabase';

export const revalidate = 86400; // Refresh sitemap cache every 24 hours (CDN edge cached)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kampusfilter.com';
  // Canonical static release date for static platform pages
  const staticContentDate = new Date('2026-09-15T12:00:00.000Z');

  try {
    // Dynamic article routes from Supabase using lightweight slug-only query (ordered newest first)
    const articles = await getArticleSlugsForSitemap();

    // The platform's latest content publication date
    const newestContentDate =
      articles.length > 0 && (articles[0].updated_at || articles[0].created_at)
        ? new Date(articles[0].updated_at || articles[0].created_at!)
        : staticContentDate;

    // Static core routes with realistic, accurate lastmod timestamps
    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: newestContentDate,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/categories`,
        lastModified: newestContentDate,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/tools/roi-calculator`,
        lastModified: newestContentDate,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: staticContentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: staticContentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: staticContentDate,
        changeFrequency: 'yearly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: staticContentDate,
        changeFrequency: 'yearly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/disclaimer`,
        lastModified: staticContentDate,
        changeFrequency: 'yearly',
        priority: 0.5,
      },
    ];

    // Dynamic category routes (high-priority topic clusters)
    const categorySlugs = await getAllCategorySlugs();
    const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
      url: `${baseUrl}/category/${slug}`,
      lastModified: newestContentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    }));

    const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.updated_at
        ? new Date(article.updated_at)
        : article.created_at
        ? new Date(article.created_at)
        : staticContentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
  } catch (error) {
    console.error('[Sitemap] Error fetching dynamic routes for sitemap:', error);
    return [
      {
        url: baseUrl,
        lastModified: staticContentDate,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: staticContentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ];
  }
}
