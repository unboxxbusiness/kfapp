import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
  getCategoryMetaBySlug,
  getActiveCategories,
  getPaginatedArticles,
} from '@/lib/supabase';
import { CategoryFeed } from '@/components/category/CategoryFeed';

export const dynamicParams = true;
export const revalidate = 86400; // Revalidate every 24 hours (ISR CDN Edge Cache)

interface PaginatedCategoryPageProps {
  params: Promise<{ slug: string; pageNumber: string }>;
}

export async function generateMetadata({
  params,
}: PaginatedCategoryPageProps): Promise<Metadata> {
  const { slug, pageNumber } = await params;
  const page = parseInt(pageNumber, 10);

  if (isNaN(page) || page < 1) {
    return {
      title: 'Page Not Found — Kampus Filter',
    };
  }

  const meta = await getCategoryMetaBySlug(slug);
  if (!meta) {
    return {
      title: 'Category Not Found — Kampus Filter',
    };
  }

  const title = `${meta.headline} (2027) — Page ${page} | Kampus Filter`;
  const url = `https://kampusfilter.com/category/${slug}/page/${page}`;
  const description = `${meta.description} — Page ${page} of ${meta.label} college comparison guides on Kampus Filter.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Kampus Filter',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PaginatedCategoryPage({
  params,
}: PaginatedCategoryPageProps) {
  const { slug, pageNumber } = await params;
  const page = parseInt(pageNumber, 10);

  if (isNaN(page) || page < 1) {
    notFound();
  }

  // Canonical SEO Rule: Page 1 belongs strictly at `/category/${slug}`
  if (page === 1) {
    redirect(`/category/${slug}`);
  }

  const [meta, activeCategories] = await Promise.all([
    getCategoryMetaBySlug(slug),
    getActiveCategories(),
  ]);

  if (!meta) {
    notFound();
  }

  const ARTICLES_PER_PAGE = 20;
  const { articles: paginatedArticles, total: totalArticles } =
    await getPaginatedArticles({
      page,
      pageSize: ARTICLES_PER_PAGE,
      category: meta.dbCategory,
      cityFilter: meta.cityFilter,
      titleFilter: meta.titleFilter,
    });

  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  if (page > totalPages && totalPages > 0) {
    notFound();
  }

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${meta.headline} — Page ${page}`,
    description: meta.description,
    url: `https://kampusfilter.com/category/${slug}/page/${page}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Kampus Filter',
      url: 'https://kampusfilter.com',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://kampusfilter.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Categories',
          item: 'https://kampusfilter.com',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: meta.label,
          item: `https://kampusfilter.com/category/${slug}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: `Page ${page}`,
          item: `https://kampusfilter.com/category/${slug}/page/${page}`,
        },
      ],
    },
  };

  return (
    <CategoryFeed
      slug={slug}
      meta={meta}
      activeCategories={activeCategories}
      currentPage={page}
      paginatedArticles={paginatedArticles}
      totalArticles={totalArticles}
      totalPages={totalPages}
      articlesPerPage={ARTICLES_PER_PAGE}
      collectionJsonLd={collectionJsonLd}
    />
  );
}
