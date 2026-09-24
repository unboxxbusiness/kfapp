import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
  getPaginatedArticles,
  getActiveCategories,
} from '@/lib/supabase';
import { HomeFeed } from '@/components/home/HomeFeed';

export const dynamicParams = true;
export const revalidate = 86400; // Revalidate every 24 hours (ISR CDN Edge Cache)

interface PageProps {
  params: Promise<{ pageNumber: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { pageNumber } = await params;
  const page = parseInt(pageNumber, 10);

  if (isNaN(page) || page < 1) {
    return {
      title: 'Page Not Found | Kampus Filter',
    };
  }

  const canonical = `https://kampusfilter.com/page/${page}`;
  const title = `College Decision Guides — Page ${page} | Kampus Filter`;
  const description = `Explore page ${page} of transparent college fee structures, median placement metrics, and student decision roadmaps on Kampus Filter.`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
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

export default async function PaginatedHomePage({ params }: PageProps) {
  const { pageNumber } = await params;
  const page = parseInt(pageNumber, 10);

  if (isNaN(page) || page < 1) {
    notFound();
  }

  // Canonical SEO Rule: Page 1 belongs strictly at '/'
  if (page === 1) {
    redirect('/');
  }

  const ARTICLES_PER_PAGE = 20;

  const [{ articles: paginatedArticles, total: totalArticles }, categories] =
    await Promise.all([
      getPaginatedArticles({
        page,
        pageSize: ARTICLES_PER_PAGE,
      }),
      getActiveCategories(),
    ]);

  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  if (page > totalPages && totalPages > 0) {
    notFound();
  }

  return (
    <HomeFeed
      currentPage={page}
      paginatedArticles={paginatedArticles}
      totalArticles={totalArticles}
      totalPages={totalPages}
      categories={categories}
      articlesPerPage={ARTICLES_PER_PAGE}
    />
  );
}
