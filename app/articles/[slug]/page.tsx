import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticlesByCategory,
  normalizeArticleComponents,
  formatCategory,
} from '@/lib/supabase';
import { ReadingProgressBar } from '@/components/article/ReadingProgressBar';
import { ArticleNavbar } from '@/components/article/ArticleNavbar';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { ArticleHeader } from '@/components/article/ArticleHeader';
import { DirectAnswerCard } from '@/components/article/DirectAnswerCard';
import { TableOfContents, TocEntry } from '@/components/article/TableOfContents';
import { ArticleSections } from '@/components/article/ArticleSections';
import { ComparisonTable } from '@/components/article/ComparisonTable';
import { DecisionFramework } from '@/components/article/DecisionFramework';
import { BrandCTA } from '@/components/article/BrandCTA';
import { FaqAccordion } from '@/components/article/FaqAccordion';
import { AuthorBio } from '@/components/article/AuthorBio';
import { DataDisclaimer } from '@/components/article/DataDisclaimer';
import { RecentArticles } from '@/components/article/RecentArticles';
import { KampusFooter } from '@/components/article/KampusFooter';
import { slugifyHeading } from '@/lib/toc';

export const dynamicParams = true; // Enables on-demand rendering for any newly added articles
export const revalidate = 60; // Incremental Static Regeneration (ISR) every 60 seconds

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Dynamic SEO & OpenGraph metadata generation
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Kampus Filter',
    };
  }

  const title = `${article.title} | Kampus Filter`;
  const description =
    article.meta_description ||
    article.description ||
    article.direct_answer?.slice(0, 160) ||
    'Read transparent, student-friendly college guides on Kampus Filter.';
  const canonical =
    article.canonical_url || `https://kampusfilter.com/articles/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      siteName: 'Kampus Filter',
      locale: 'en_IN',
      publishedTime: article.published_at || article.created_at,
      modifiedTime: article.updated_at || article.created_at,
      authors: ['Team Kampus Filter'],
      images: [
        {
          url: 'https://res.cloudinary.com/dhrigocvd/image/upload/v1769401433/logo_Kampus_Filter_gync6j.webp',
          width: 1200,
          height: 630,
          alt: `${article.title} — Kampus Filter College Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@kampusfilter',
      creator: '@kampusfilter',
      title,
      description,
      images: [
        'https://res.cloudinary.com/dhrigocvd/image/upload/v1769401433/logo_Kampus_Filter_gync6j.webp',
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Pre-render static pages for all available article slugs
 */
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Main Article Page Component (Server Component)
 */
export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Fetch contextual related articles from the same category for search engine crawl depth
  const recentArticles = await getRelatedArticlesByCategory(
    article.category,
    slug,
    3
  );

  const {
    header,
    directAnswerSummary,
    sections,
    comparisonTable,
    decisionFramework,
    brandCta,
    authorBio,
    faqs,
    jsonLd,
  } = normalizeArticleComponents(article);

  // High-Impact Schema.org Article Schema with Speakable for Google AI Overviews & Voice Search
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://kampusfilter.com/articles/${slug}#article`,
    headline: header?.h1_title || article.title,
    description: article.meta_description || article.direct_answer,
    image: [
      'https://res.cloudinary.com/dhrigocvd/image/upload/v1769401433/logo_Kampus_Filter_gync6j.webp',
    ],
    datePublished: article.published_at || article.created_at || '2026-01-01T00:00:00Z',
    dateModified: article.updated_at || article.created_at || '2026-09-14T00:00:00Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://kampusfilter.com/articles/${slug}`,
    },
    author: {
      '@type': 'Organization',
      name: 'Team Kampus Filter',
      url: 'https://kampusfilter.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kampus Filter',
      logo: {
        '@type': 'ImageObject',
        url: 'https://res.cloudinary.com/dhrigocvd/image/upload/v1769401433/logo_Kampus_Filter_gync6j.webp',
      },
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#direct-answer-summary', 'h1'],
    },
  };

  // High-Impact Schema.org FAQPage Schema for Google SERP Accordions
  const faqSchema =
    faqs && faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `https://kampusfilter.com/articles/${slug}#faq`,
          mainEntity: faqs.map((f: { question: string; answer: string }) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14213d] transition-colors">
      {/* Live Brand Reading Progress Line */}
      <ReadingProgressBar />

      {/* Live Brand Navbar */}
      <ArticleNavbar />

      {/* Structured Data (Schema.org JSON-LD for Google Search Console & AI Bots) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Main Content Article Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Semantic Breadcrumbs (UI + Schema.org BreadcrumbList) */}
        <Breadcrumbs
          category={article.category}
          title={header?.h1_title || article.title}
        />

        <article>
          {/* 1. Article Hero Header */}
          <ArticleHeader
            title={header?.h1_title || article.title}
            category={article.category}
            byline="By Team Kampus Filter"
            lastUpdated={header?.last_updated || 'September 2026'}
            readingTimeMinutes={article.reading_time_minutes || 4}
            slug={slug}
          />

          {/* 2. Direct Answer Summary (Google AI Overview & Answer Engine Optimized) */}
          <DirectAnswerCard
            badge="Quick Summary"
            paragraph={directAnswerSummary?.paragraph || article.direct_answer}
            keyStat={directAnswerSummary?.key_stat}
          />

          {/* 2.5 Interactive Table of Contents (Smashing Magazine Roadmap & Deep Anchors) */}
          {(() => {
            const tocItems: TocEntry[] = [];
            if (directAnswerSummary?.paragraph || article.direct_answer) {
              tocItems.push({ id: 'direct-answer-summary', title: 'Quick Summary' });
            }
            sections.forEach((sec, idx) => {
              if (sec?.h2) {
                tocItems.push({
                  id: slugifyHeading(sec.h2) || `section-${idx + 1}`,
                  title: sec.h2,
                });
              }
            });
            if (comparisonTable && comparisonTable.rows && comparisonTable.rows.length > 0) {
              tocItems.push({ id: 'comparison-matrix', title: comparisonTable.title || 'Comparison Matrix' });
            }
            if (decisionFramework && decisionFramework.steps && decisionFramework.steps.length > 0) {
              tocItems.push({ id: 'decision-roadmap', title: decisionFramework.h2 || 'Decision Roadmap' });
            }
            if (faqs && faqs.length > 0) {
              tocItems.push({ id: 'faqs', title: 'Frequently Asked Questions' });
            }

            return <TableOfContents items={tocItems} />;
          })()}

          {/* 3. Narrative Sections (Dropcap, Fraunces H2s, Student Points) */}
          <ArticleSections sections={sections} />

          {/* 4. Comparison Table (Fees vs. Packages in Hard Offset Shadows) */}
          <ComparisonTable table={comparisonTable} />

          {/* 5. Step-by-Step Practical Decision Roadmap */}
          <DecisionFramework framework={decisionFramework} />

          {/* 6. Live Style Yellow Brand CTA */}
          <BrandCTA cta={brandCta} />

          {/* 7. Student FAQ Accordion (Rich SERP Snippet Optimized) */}
          <FaqAccordion faqs={faqs} />

          {/* 8. Author Bio (Only Team Kampus Filter) */}
          <AuthorBio author={authorBio} />

          {/* 9. Institutional Data & Fee Disclaimer */}
          <DataDisclaimer />
        </article>
      </main>

      {/* 9. Recent College Guides Section (Smashing Magazine Style) */}
      <RecentArticles articles={recentArticles} />

      {/* Premium Kampus Filter Brand Footer */}
      <KampusFooter />
    </div>
  );
}
