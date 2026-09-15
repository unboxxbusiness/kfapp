import type { Metadata } from 'next';
import Link from 'next/link';
import { getActiveCategories } from '@/lib/supabase';
import { ArticleNavbar } from '@/components/article/ArticleNavbar';
import { KampusFooter } from '@/components/article/KampusFooter';
import { CategoriesDirectory } from '@/components/category/CategoriesDirectory';
import { ChevronRight, Sparkles, Compass } from 'lucide-react';

export const revalidate = 60; // Incremental Static Regeneration (ISR)

export const metadata: Metadata = {
  title: 'All 94 Topic Clusters & College Guides (2027) | Kampus Filter',
  description:
    'Browse all 94 college guide topic clusters across Indian universities. Compare transparent fee structures, cutoffs, placements, scholarships, and career outcomes.',
  alternates: {
    canonical: 'https://kampusfilter.com/categories',
  },
  openGraph: {
    title: 'All 94 Topic Clusters & College Guides | Kampus Filter',
    description:
      'Browse all 94 college guide topic clusters across Indian universities. Compare transparent fee structures, cutoffs, placements, scholarships, and career outcomes.',
    url: 'https://kampusfilter.com/categories',
    siteName: 'Kampus Filter',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All 94 Topic Clusters & College Guides | Kampus Filter',
    description:
      'Browse all 94 college guide topic clusters across Indian universities. Compare transparent fee structures, cutoffs, placements, scholarships, and career outcomes.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function CategoriesPage() {
  const activeCategories = await getActiveCategories();
  const totalArticles = activeCategories.reduce(
    (sum, c) => (c.value ? sum + (c.count || 0) : sum),
    0
  );

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
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
        item: 'https://kampusfilter.com/categories',
      },
    ],
  };

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All 94 Topic Clusters & College Decision Guides',
    description:
      'Comprehensive index of all 94 college guide topic clusters on Kampus Filter covering Indian universities, fees, cutoffs, and placements.',
    url: 'https://kampusfilter.com/categories',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Kampus Filter',
      url: 'https://kampusfilter.com',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14213D] transition-colors">
      <ArticleNavbar />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-white pt-8 pb-12 sm:pt-14 sm:pb-16 border-b-2 sm:border-b-3 border-[#14213D] overflow-hidden">
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
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-2 text-xs font-bold text-[#14213D]/70"
          >
            <Link
              href="/"
              className="hover:text-[#FCA311] transition-colors hover:underline"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#14213D]/40 shrink-0" />
            <span className="text-[#000000] font-black">Categories</span>
          </nav>

          {/* Badge & Title */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FCA311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Taxonomy Index</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#E5E5E5] text-[#14213D] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
                {totalArticles} Total Guides
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-[#000000] tracking-tight leading-[1.08]">
              All 94 Topic Clusters &amp; College Guides
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#14213D]/85 font-medium leading-relaxed max-w-3xl">
              Explore India&apos;s most comprehensive independent higher-ed decision library. Compare verified fee structures, official cutoffs, median placements, and student roadmaps.
            </p>
          </div>
        </div>
      </section>

      {/* Main Directory Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16">
        <CategoriesDirectory
          categories={activeCategories}
          totalArticles={totalArticles}
        />
      </main>

      <KampusFooter />
    </div>
  );
}
