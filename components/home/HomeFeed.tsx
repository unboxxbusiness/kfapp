import React from 'react';
import Link from 'next/link';
import {
  formatCategory,
  slugifyCategory,
} from '@/lib/supabase';
import { ArticleNavbar } from '@/components/article/ArticleNavbar';
import { HomeHero } from '@/components/home/HomeHero';
import { TrustMarquee } from '@/components/home/TrustMarquee';
import { KampusFooter } from '@/components/article/KampusFooter';
import { SmashingPagination } from '@/components/article/SmashingPagination';
import {
  ArrowRight,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { ArticleRow } from '@/types/article';

interface HomeFeedProps {
  currentPage: number;
  paginatedArticles: ArticleRow[];
  totalArticles: number;
  totalPages: number;
  categories: { label: string; value: string; slug?: string }[];
  articlesPerPage: number;
}

export function HomeFeed({
  currentPage,
  paginatedArticles,
  totalArticles,
  totalPages,
  categories,
  articlesPerPage,
}: HomeFeedProps) {
  const isFirstPage = currentPage === 1;
  const featured = isFirstPage ? paginatedArticles[0] : null;
  const gridArticles = isFirstPage ? paginatedArticles.slice(1) : paginatedArticles;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14213d] transition-colors">
      {/* Live Brand Navbar */}
      <ArticleNavbar />

      {/* Hero Section: Full Hero + Trust Marquee on Page 1, Focused Clean Banner on Page 2+ */}
      {isFirstPage ? (
        <>
          <HomeHero
            selectedCategory=""
            categories={categories}
            totalArticles={totalArticles}
          />
          <TrustMarquee />
        </>
      ) : (
        <section className="relative bg-white pt-8 pb-10 sm:pt-10 sm:pb-12 border-b-2 sm:border-b-3 border-[#14213D] overflow-hidden">
          {/* Decorative Background Grid */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#14213D 1.5px, transparent 1.5px)`,
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
            {/* Breadcrumbs for SEO & UX */}
            <nav
              aria-label="Breadcrumbs"
              className="flex items-center gap-2 text-xs font-bold text-[#14213d]/70 flex-wrap"
            >
              <Link
                href="/"
                className="hover:text-[#fca311] transition-colors hover:underline"
              >
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#14213d]/40 shrink-0" />
              <span className="text-[#000000] font-black">Page {currentPage}</span>
            </nav>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#000000] tracking-tight">
                  College Decision Guides
                </h1>
                <p className="text-xs sm:text-sm text-[#14213d]/80 font-medium mt-1">
                  Page {currentPage} of {totalPages} — Showing verified college fee benchmarks and placement reports.
                </p>
              </div>

              {/* Quick Category Jump Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.slice(0, 5).map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.slug ? `/category/${cat.slug}` : '/'}
                    className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white text-[#14213d] border-2 border-[#14213d] shadow-[2px_2px_0_0_#14213d] hover:bg-[#fca311] hover:text-black transition-all"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
                {isFirstPage ? 'All College Guides' : `College Guides — Page ${currentPage}`}
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
                No guides found on this page.
              </p>
              <p className="text-xs text-[#14213d]/70">
                You have reached beyond the latest published pages.
              </p>
              <Link
                href="/"
                className="inline-block mt-3 px-5 py-2 rounded-full bg-[#14213d] text-white font-black text-xs uppercase tracking-wider hover:bg-[#000000] border-2 border-[#000000] transition-colors"
              >
                Return to Page 1
              </Link>
            </div>
          )}

          {/* Clean Path-Based Pagination */}
          <SmashingPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalArticles={totalArticles}
            articlesPerPage={articlesPerPage}
            basePath="/"
          />
        </section>
      </main>

      {/* Premium Kampus Filter Brand Footer */}
      <KampusFooter />
    </div>
  );
}
