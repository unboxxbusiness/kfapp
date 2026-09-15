import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCategoryMetaBySlug,
  getAllCategorySlugs,
  getActiveCategories,
  getPaginatedArticles,
  formatCategory,
} from '@/lib/supabase';
import { ArticleNavbar } from '@/components/article/ArticleNavbar';
import { KampusFooter } from '@/components/article/KampusFooter';
import { SmashingPagination } from '@/components/article/SmashingPagination';
import {
  Clock,
  ArrowRight,
  ChevronRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

export const dynamicParams = true; // Enables on-demand rendering for any newly added category in DB
export const revalidate = 60; // Incremental Static Regeneration (ISR) every 60 seconds

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
}

/**
 * Pre-generate static HTML for all current active categories at build time
 */
export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Dynamic SEO & OpenGraph metadata generation
 */
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
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const currentPage = Math.max(
    1,
    parseInt(resolvedSearchParams.page || '1', 10) || 1
  );

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
    });

  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
  const isFirstPage = currentPage === 1;
  const featured = isFirstPage ? paginatedArticles[0] : null;
  const gridArticles = isFirstPage ? paginatedArticles.slice(1) : paginatedArticles;

  // High-Impact Schema.org CollectionPage + BreadcrumbList JSON-LD
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
    <div className="min-h-screen flex flex-col bg-white text-[#14213d] transition-colors">
      <ArticleNavbar />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Category Hero Section */}
      <section className="relative bg-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b-2 sm:border-b-3 border-[#14213D] overflow-hidden">
        {/* Decorative Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#14213D 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        {/* Ambient Color Spot */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-[#FCA311]/15 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          {/* Breadcrumb Bar */}
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
            <span>Categories</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#14213d]/40 shrink-0" />
            <span className="text-[#000000] font-black">{meta.label}</span>
          </nav>

          {/* Header Title & Badges */}
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#14213D] text-white border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] text-[11px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#FCA311]" />
                <span>{meta.badge}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FCA311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] text-[11px] font-black uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#000000]" />
                <span>{totalArticles} Guides Published</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-[#14213D] tracking-tight leading-[1.12]">
              {meta.headline}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#14213D]/85 font-medium leading-relaxed max-w-3xl">
              {meta.description}
            </p>
          </div>

          {/* Topic Clusters Switcher Tabs */}
          <div className="pt-4 border-t-2 border-[#14213d]/15">
            <span className="block text-[11px] font-black uppercase tracking-wider text-[#14213D]/70 mb-2.5">
              Switch Topic Cluster:
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {activeCategories.map((cat) => {
                const isActive = cat.slug === slug || (!cat.slug && !slug);
                const targetHref = cat.slug ? `/category/${cat.slug}` : '/';
                return (
                  <Link
                    key={cat.label}
                    href={targetHref}
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all border-2 border-[#000000] ${
                      isActive
                        ? 'bg-[#FCA311] text-[#000000] shadow-[3px_3px_0_0_#000000] translate-y-[-1px]'
                        : 'bg-white text-[#14213D] shadow-[2px_2px_0_0_#14213D] hover:bg-[#FCA311] hover:text-[#000000] hover:shadow-[3px_3px_0_0_#000000]'
                    }`}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">
        {/* Featured Story Card in this Category (Page 1 only) */}
        {featured && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-4 text-xs font-black uppercase tracking-widest text-[#14213d]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fca311] border border-[#000000]" />
              <span>Featured {meta.label} Guide</span>
            </div>

            <div className="relative p-6 sm:p-10 bg-white rounded-2xl border-2 sm:border-3 border-[#14213d] shadow-[4px_4px_0_0_#14213d] sm:shadow-[8px_8px_0_0_#14213d] hover:border-[#fca311] transition-colors">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#fca311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] text-[10px] font-black uppercase tracking-wider">
                    {formatCategory(featured.category)}
                  </span>
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

        {/* Guides Matrix */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-[#14213d]">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#14213d]">
                {meta.label} Directory
              </h3>
              <p className="text-xs text-[#14213d]/70 font-semibold mt-1">
                Page {currentPage} of {Math.max(1, totalPages)} — Showing{' '}
                {paginatedArticles.length} guides
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
                      <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#fca311] text-[#000000] border-2 border-[#000000] shadow-[1px_1px_0_0_#000000]">
                        {formatCategory(article.category)}
                      </span>
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
                      className="inline-flex items-center gap-1 text-[#14213d] hover:text-[#fca311] transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-[#14213d]/30 bg-white">
              <BookOpen className="w-10 h-10 text-[#fca311] mx-auto mb-3" />
              <h4 className="font-serif text-xl font-black text-[#14213d] mb-1">
                No articles found in this category
              </h4>
              <p className="text-xs text-[#14213d]/70 max-w-sm mx-auto mb-5">
                We are actively curating new guides for this topic cluster.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#14213D] text-white text-xs font-black uppercase tracking-wider hover:bg-[#000000] transition-colors"
              >
                <span>Browse All Guides</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FCA311]" />
              </Link>
            </div>
          )}

          {/* Dedicated Category Pagination */}
          <SmashingPagination
            basePath={`/category/${slug}`}
            currentPage={currentPage}
            totalPages={totalPages}
            totalArticles={totalArticles}
            articlesPerPage={ARTICLES_PER_PAGE}
          />
        </section>
      </main>

      <KampusFooter />
    </div>
  );
}
