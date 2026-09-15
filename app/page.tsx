import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  getPaginatedArticles,
  formatCategory,
  slugifyCategory,
  getActiveCategories,
} from '@/lib/supabase';
import { ArticleNavbar } from '@/components/article/ArticleNavbar';
import { HomeHero } from '@/components/home/HomeHero';
import { KampusFooter } from '@/components/article/KampusFooter';
import { SmashingPagination } from '@/components/article/SmashingPagination';
import {
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export const metadata: Metadata = {
  title: 'Kampus Filter — India’s Network for Student College Decisions',
  description:
    'Compare top BBA, MBA, Engineering & BCA colleges across India with transparent fee structures, median placements, and student decision roadmaps.',
  alternates: {
    canonical: 'https://kampusfilter.com',
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

  const currentPage = Math.max(1, parseInt(resolvedParams.page || '1', 10) || 1);
  const ARTICLES_PER_PAGE = 20;

  // Fetch paginated articles dynamically from Supabase (always newest first)
  const { articles: paginatedArticles, total: totalArticles } =
    await getPaginatedArticles({
      page: currentPage,
      pageSize: ARTICLES_PER_PAGE,
    });

  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  // On page 1: show top article as featured banner, remaining (up to 19) in grid
  // On subsequent pages: show all 20 in the grid directly
  const isFirstPage = currentPage === 1;
  const featured = isFirstPage ? paginatedArticles[0] : null;
  const gridArticles = isFirstPage ? paginatedArticles.slice(1) : paginatedArticles;

  // Dynamically fetch only categories that have real published articles in Supabase
  const categories = await getActiveCategories();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14213d] transition-colors">
      {/* Live Brand Navbar */}
      <ArticleNavbar />

      {/* Attractive Hero Section with CSS & Integrated Lead Capture */}
      <HomeHero
        selectedCategory=""
        categories={categories}
        totalArticles={totalArticles}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">
        {/* Featured Story Card (Page 1 only) */}
        {featured && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-4 text-xs font-black uppercase tracking-widest text-[#14213d]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fca311] border border-[#000000]" />
              <span>Featured College Decision Guide</span>
            </div>

            <div className="relative p-6 sm:p-10 bg-white rounded-2xl border-2 sm:border-3 border-[#14213d] shadow-[4px_4px_0_0_#14213d] sm:shadow-[8px_8px_0_0_#14213d] hover:border-[#fca311] transition-colors">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <Link
                    href={`/category/${slugifyCategory(featured.category)}`}
                    className="px-3.5 py-1 rounded-full bg-[#fca311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] text-[10px] font-black uppercase tracking-wider hover:bg-[#000000] hover:text-white transition-colors"
                  >
                    {formatCategory(featured.category)}
                  </Link>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl font-black text-[#000000] mb-4 hover:text-[#fca311] transition-colors leading-[1.15]">
                  <Link href={`/articles/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h2>

                <p className="text-[#14213d]/85 text-base sm:text-lg mb-6 leading-relaxed line-clamp-3 font-normal">
                  {featured.direct_answer || featured.meta_description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t-2 border-[#14213d]/15">
                  <div className="flex items-center gap-4 text-xs font-bold text-[#14213d]/80">
                    <span className="font-black text-[#14213d]">
                      By Team Kampus Filter
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#fca311]" />
                      <span>{featured.reading_time_minutes || 4} min read</span>
                    </span>
                  </div>

                  <Link
                    href={`/articles/${featured.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-full bg-[#fca311] text-[#000000] hover:bg-[#14213d] hover:text-white border-2 border-[#000000] shadow-[3px_3px_0_0_#000000] transition-all"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Latest College Guides Grid */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-[#14213d]">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#14213d]">
                All College Guides
              </h3>
              <p className="text-xs text-[#14213d]/70 font-semibold mt-1">
                Page {currentPage} of {Math.max(1, totalPages)} — Showing {paginatedArticles.length} guides
              </p>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-white border-2 border-[#14213d] shadow-[2px_2px_0_0_#14213d] text-xs font-black text-[#14213d]">
              {totalArticles} Total Guides
            </span>
          </div>

          {gridArticles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridArticles.map((article) => (
                <article
                  key={article.id || article.slug}
                  className="card-kf flex flex-col justify-between p-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <Link
                        href={`/category/${slugifyCategory(article.category)}`}
                        className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#fca311] text-[#000000] border-2 border-[#000000] shadow-[1px_1px_0_0_#000000] hover:bg-[#000000] hover:text-white transition-colors"
                      >
                        {formatCategory(article.category)}
                      </Link>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#14213d]/70">
                        <Clock className="w-3 h-3 text-[#fca311]" />
                        <span>{article.reading_time_minutes || 4}m</span>
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-black text-[#000000] hover:text-[#fca311] transition-colors leading-snug mb-3 line-clamp-2">
                      <Link href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h4>

                    <p className="text-xs text-[#14213d]/80 line-clamp-3 leading-relaxed mb-4 font-normal">
                      {article.direct_answer || article.meta_description}
                    </p>
                  </div>

                  <div className="pt-4 border-t-2 border-[#14213d]/15 flex items-center justify-between text-xs font-black">
                    <span className="text-[#14213d]/70 font-semibold text-[11px]">
                      Team Kampus Filter
                    </span>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="inline-flex items-center gap-1 text-[#14213d] hover:text-[#fca311] font-black"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border-2 border-[#14213d] shadow-[4px_4px_0_0_#14213d] space-y-3">
              <p className="font-serif text-xl font-bold text-[#14213d]">
                No guides found for this selection.
              </p>
              <p className="text-xs text-[#14213d]/70">
                Try selecting &ldquo;All Guides&rdquo; or exploring another course category.
              </p>
              <Link
                href="/"
                className="inline-block mt-3 px-5 py-2 rounded-full bg-[#14213d] text-white font-black text-xs uppercase tracking-wider hover:bg-[#000000] border-2 border-[#000000] transition-colors"
              >
                View All Guides
              </Link>
            </div>
          )}

          {/* Smashing Magazine Style Pagination */}
          <SmashingPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalArticles={totalArticles}
            articlesPerPage={ARTICLES_PER_PAGE}
            basePath="/"
          />
        </section>
      </main>

      {/* Premium Kampus Filter Brand Footer */}
      <KampusFooter />
    </div>
  );
}
