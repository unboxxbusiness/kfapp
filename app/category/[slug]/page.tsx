import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
  getCategoryMetaBySlug,
  getAllCategorySlugs,
  getActiveCategories,
  getPaginatedArticles,
} from '@/lib/supabase';
import { CategoryFeed } from '@/components/category/CategoryFeed';

export const dynamicParams = true;
export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getCategoryMetaBySlug(slug);

  if (!meta) {
    return {
      title: 'Category Not Found — Kampus Filter',
      description: 'The requested college category could not be found.',
    };
  }

  const title = `${meta.headline} (2027) — Fees, Cutoffs & Colleges | Kampus Filter`;
  const url = `https://kampusfilter.com/category/${slug}`;

  return {
    title,
    description: meta.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: meta.description,
      url,
      siteName: 'Kampus Filter',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  // Seamless SEO redirect: forward /category/[slug]?page=2 to clean /category/[slug]/page/2
  if (resolvedSearchParams.page) {
    const p = parseInt(resolvedSearchParams.page, 10);
    if (!isNaN(p) && p > 1) {
      redirect(`/category/${slug}/page/${p}`);
    } else {
      redirect(`/category/${slug}`);
    }
  }

  const currentPage = 1;

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
      page: currentPage,
      pageSize: ARTICLES_PER_PAGE,
      category: meta.dbCategory,
      cityFilter: meta.cityFilter,
      titleFilter: meta.titleFilter,
    });

  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.headline,
    description: meta.description,
    url: `https://kampusfilter.com/category/${slug}`,
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
      ],
    },
  };

  return (
    <CategoryFeed
      slug={slug}
      meta={meta}
      activeCategories={activeCategories}
      currentPage={currentPage}
      paginatedArticles={paginatedArticles}
      totalArticles={totalArticles}
      totalPages={totalPages}
      articlesPerPage={ARTICLES_PER_PAGE}
      collectionJsonLd={collectionJsonLd}
    />
  );
}
