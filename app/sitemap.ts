import { MetadataRoute } from 'next';
import { getArticleSlugsForSitemap, getAllCategorySlugs } from '@/lib/supabase';

export const revalidate = 60; // Refresh sitemap cache every 60 seconds (dynamic)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kampusfilter.com';
  const currentDate = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  try {
    // Dynamic category routes (high-priority topic clusters)
    const categorySlugs = await getAllCategorySlugs();
    const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
      url: `${baseUrl}/category/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    }));

    // Dynamic article routes from Supabase using lightweight slug-only query
    const articles = await getArticleSlugsForSitemap();

    const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.updated_at
        ? new Date(article.updated_at)
        : article.created_at
        ? new Date(article.created_at)
        : currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
  } catch (error) {
    console.error('[Sitemap] Error fetching dynamic routes for sitemap:', error);
    return staticRoutes;
  }
}
