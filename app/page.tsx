import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  getPaginatedArticles,
  slugifyCategory,
  getActiveCategories,
} from '@/lib/supabase';
import { HomeFeed } from '@/components/home/HomeFeed';

export const revalidate = 86400; // Revalidate every 24 hours (ISR CDN Edge Cache)

export const metadata: Metadata = {
  title: 'Kampus Filter — India’s Network for Student College Decisions',
  description:
    'Compare top BBA, MBA, Engineering & BCA colleges across India with transparent fee structures, median placements, and student decision roadmaps.',
  alternates: {
    canonical: 'https://kampusfilter.com',
  },
  openGraph: {
    title: 'Kampus Filter — Student College Discovery & Comparison Guides',
    description:
      'Explore transparent college fee breakdowns, placement metrics, and student decision playbooks across top Indian universities.',
    url: 'https://kampusfilter.com',
    siteName: 'Kampus Filter',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kampus Filter — Student College Discovery & Comparison Guides',
    description:
      'Explore transparent college fee breakdowns, placement metrics, and student decision playbooks across top Indian universities.',
  },
};

interface HomePageProps {
  searchParams?: Promise<{ category?: string; page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = searchParams ? await searchParams : {};

  // Seamless redirect: if anyone visits /?category=..., smoothly forward them to the dedicated /category/[slug] page
  if (resolvedParams.category) {
    redirect(`/category/${slugifyCategory(resolvedParams.category)}`);
  }

  // Seamless SEO redirect: if anyone visits /?page=2, permanently forward to clean path /page/2
  if (resolvedParams.page) {
    const p = parseInt(resolvedParams.page, 10);
    if (!isNaN(p) && p > 1) {
      redirect(`/page/${p}`);
    } else {
      redirect(`/`);
    }
  }

  const currentPage = 1;
  const ARTICLES_PER_PAGE = 20;

  // Fetch paginated articles dynamically from Supabase (always newest first)
  const [{ articles: paginatedArticles, total: totalArticles }, categories] =
    await Promise.all([
      getPaginatedArticles({
        page: currentPage,
        pageSize: ARTICLES_PER_PAGE,
      }),
      getActiveCategories(),
    ]);

  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  return (
    <HomeFeed
      currentPage={currentPage}
      paginatedArticles={paginatedArticles}
      totalArticles={totalArticles}
      totalPages={totalPages}
      categories={categories}
      articlesPerPage={ARTICLES_PER_PAGE}
    />
  );
}
