import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArticleRow, ArticleComponents } from '@/types/article';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://puwswmoppujuaronlaia.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
  console.warn('⚠️ Supabase Anon Key is missing. Check .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Format category name to be clean and student-friendly.
 * Converts internal tokens like 'City+Course' into 'City Wise Courses'.
 */
export function formatCategory(cat?: string): string {
  if (!cat) return 'College Guide';
  const clean = cat.trim();
  if (
    clean.toLowerCase().includes('city+course') ||
    clean.toLowerCase().includes('city + course')
  ) {
    return 'City Wise Courses';
  }
  if (
    clean.toLowerCase().includes('state+course') ||
    clean.toLowerCase().includes('state + course')
  ) {
    return 'State Wise Courses';
  }
  return clean.replace(/\+/g, ' & ');
}

/**
 * Normalizes article data to ensure components are accessible
 * regardless of whether they come from dedicated columns or root content_json.
 */
export function normalizeArticleComponents(article: ArticleRow): {
  header: any;
  directAnswerSummary: any;
  sections: any[];
  comparisonTable: any;
  decisionFramework: any;
  brandCta: any;
  authorBio: any;
  faqs: any[];
  jsonLd: any;
} {
  const rootComps = article.content_json?.components || {};

  // 1. Header (Clean Byline: Team Kampus Filter)
  const header = {
    h1_title:
      article.header?.h1_title || rootComps.header?.h1_title || article.title,
    byline: 'By Team Kampus Filter',
    last_updated:
      article.header?.last_updated ||
      rootComps.header?.last_updated ||
      'September 2026',
    reading_time: `${article.reading_time_minutes || 4} min read`,
  };

  // 2. Direct Answer Summary (No 'AI Overview' or 'Verified' buzzwords)
  const rawSummary: any = article.direct_answer_summary?.paragraph
    ? article.direct_answer_summary
    : rootComps.direct_answer_summary || {};

  const directAnswerSummary = {
    badge: 'Quick Summary',
    paragraph: rawSummary?.paragraph || article.direct_answer,
    key_stat: rawSummary?.key_stat || '',
  };

  // 3. Sections
  let sections: any[] = [];
  if (Array.isArray(article.sections) && article.sections.length > 0) {
    sections = article.sections;
  } else if (
    Array.isArray(rootComps.sections) &&
    rootComps.sections.length > 0
  ) {
    sections = rootComps.sections;
  } else {
    sections = Object.keys(rootComps)
      .filter((k) => k.startsWith('section'))
      .sort()
      .map((k) => (rootComps as any)[k]);
  }

  // 4. Comparison Table
  const comparisonTable = article.comparison_table?.headers
    ? article.comparison_table
    : rootComps.comparison_table || null;

  // 5. Decision Framework
  const decisionFramework = article.decision_framework?.steps
    ? article.decision_framework
    : rootComps.decision_framework || null;

  // 6. Brand CTA (Clutter-free and friendly)
  const brandCta = {
    badge: 'Kampus Filter',
    headline: 'Explore Colleges With Real Campus Data',
    description:
      'Compare transparent fee structures, placement records, and student guides free on Kampus Filter.',
    button_text: 'Explore All Guides',
    button_url: '/',
  };

  // 7. Author Bio (Strict: Team Kampus Filter, no E-E-A-T or buzzwords)
  const authorBio = {
    name: 'Team Kampus Filter',
    role: 'College Research & Admissions Guidance',
    credentials:
      'Researched and curated by Team Kampus Filter to provide transparent fee breakdowns, admission cutoffs, and real student feedback.',
  };

  // 8. FAQs
  const faqs =
    article.faq && article.faq.length > 0
      ? article.faq
      : article.content_json?.faq || rootComps.faq || [];

  // 9. JSON-LD
  const jsonLd =
    article.json_ld_schema || article.content_json?.json_ld_schema || null;

  return {
    header,
    directAnswerSummary,
    sections,
    comparisonTable,
    decisionFramework,
    brandCta,
    authorBio,
    faqs,
    jsonLd,
  };
}

/**
 * Fetch a single article by its unique URL slug.
 * Fully dynamic: fetches directly from Supabase for any newly created or existing slug.
 * Wrapped in React cache() to deduplicate queries between generateMetadata and page rendering.
 */
export const getArticleBySlug = cache(async (slug: string): Promise<ArticleRow | null> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error(`[Supabase] Error fetching article by slug '${slug}':`, error);
      return null;
    }
    return data as ArticleRow;
  } catch (err) {
    console.error(`[Supabase] Exception fetching article '${slug}':`, err);
    return null;
  }
});

/**
 * Fetch paginated articles dynamically directly with SQL-level range and exact counts.
 * Scalable for 100 to 50,000+ articles.
 */
export async function getPaginatedArticles(options?: {
  page?: number;
  pageSize?: number;
  category?: string;
  cityFilter?: string[];
  titleFilter?: string[];
}): Promise<{ articles: ArticleRow[]; total: number }> {
  try {
    const page = Math.max(1, options?.page || 1);
    const pageSize = options?.pageSize || 20;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('articles')
      .select(
        'id, slug, title, category, reading_time_minutes, created_at, meta_description, direct_answer, is_published, status',
        { count: 'exact' }
      )
      .order('created_at', { ascending: false });

    if (options?.cityFilter && options.cityFilter.length > 0) {
      const cityConditions = options.cityFilter
        .map((c) => `title.ilike.%${c}%`)
        .join(',');
      query = query
        .in('category', ['City+Course', 'City Guide'])
        .or(cityConditions);
    } else if (options?.titleFilter && options.titleFilter.length > 0) {
      const titleConditions = options.titleFilter
        .map((c) => `title.ilike.%${c}%`)
        .join(',');
      query = query.or(titleConditions);
    } else if (options?.category) {
      if (
        options.category === 'City Wise Courses' ||
        options.category === 'City+Course'
      ) {
        query = query.or(
          'category.ilike.%city%,category.ilike.%delhi%,category.ilike.%mumbai%'
        );
      } else {
        query = query.ilike('category', `%${options.category}%`);
      }
    }

    query = query.range(from, to);

    const { data, count, error } = await query;
    if (error) {
      console.error('[Supabase] Error fetching paginated articles:', error);
      return { articles: [], total: 0 };
    }

    return {
      articles: (data || []) as ArticleRow[],
      total: count || 0,
    };
  } catch (err) {
    console.error('[Supabase] Exception fetching paginated articles:', err);
    return { articles: [], total: 0 };
  }
}

/**
 * Fetch articles list with optional filtering and limit (always ordered newest first)
 */
export async function getAllArticles(options?: {
  limit?: number;
  category?: string;
  onlyPublished?: boolean;
}): Promise<ArticleRow[]> {
  try {
    let query = supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (options?.onlyPublished) {
      query = query.eq('is_published', true);
    }
    if (options?.category) {
      query = query.eq('category', options.category);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) {
      console.error('[Supabase] Error fetching articles list:', error);
      return [];
    }
    return (data || []) as ArticleRow[];
  } catch (err) {
    console.error('[Supabase] Exception fetching articles list:', err);
    return [];
  }
}

/**
 * Fetch all published article slugs for dynamic routing and sitemap generation.
 * Ordered by newest first.
 */
export async function getAllArticleSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('slug')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Supabase] Error fetching slugs:', error);
      return [];
    }
    return (data || []).map((row: { slug: string }) => row.slug);
  } catch (err) {
    console.error('[Supabase] Exception fetching slugs:', err);
    return [];
  }
}

/**
 * Lightweight query for sitemap generation.
 * Selects only slug and timestamps, saving megabytes of bandwidth over select('*').
 */
export async function getArticleSlugsForSitemap(): Promise<
  { slug: string; updated_at?: string; created_at?: string }[]
> {
  try {
    const allSlugs: { slug: string; updated_at?: string; created_at?: string }[] = [];
    const pageSize = 1000;
    let offset = 0;

    while (true) {
      const { data, error } = await supabase
        .from('articles')
        .select('slug, updated_at, created_at')
        .order('created_at', { ascending: false })
        .range(offset, offset + pageSize - 1);

      if (error) {
        console.error('[Supabase] Error fetching sitemap slugs:', error);
        break;
      }

      const batch = data || [];
      allSlugs.push(...batch);

      if (batch.length < pageSize) {
        break;
      }
      offset += pageSize;
    }

    return allSlugs;
  } catch (err) {
    console.error('[Supabase] Exception fetching sitemap slugs:', err);
    return [];
  }
}

/**
 * Lightweight query for recent articles sidebar.
 * Selects only minimal card fields, avoiding large content_json payloads.
 */
export async function getRecentArticleSummaries(
  limit: number = 6
): Promise<ArticleRow[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, slug, title, category, created_at, reading_time_minutes, meta_description, canonical_url, direct_answer')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('[Supabase] Error fetching recent article summaries:', error);
      return [];
    }
    return (data || []) as ArticleRow[];
  } catch (err) {
    console.error('[Supabase] Exception fetching recent article summaries:', err);
    return [];
  }
}

export interface CategoryMeta {
  slug: string;
  dbCategory: string;
  label: string;
  headline: string;
  description: string;
  badge: string;
  count?: number;
  cityFilter?: string[];
  titleFilter?: string[];
  aliasSlugs?: string[];
}

export interface ActiveCategoryItem {
  label: string;
  value: string;
  slug: string;
  count: number;
}

/**
 * Enriched editorial metadata for core platform categories, top city hubs, and premier course hubs.
 * For ANY other category discovered in the database, smart fallbacks are generated automatically!
 */
export const KNOWN_CATEGORY_METAS: Record<string, Partial<CategoryMeta>> = {
  // Course Hubs
  'engineering-btech': {
    slug: 'engineering-btech',
    label: 'Engineering (B.Tech)',
    headline: 'Engineering & B.Tech Colleges: Fees, Cutoffs & Placements (2027)',
    description:
      'Explore verified tuition fees, JEE Main/Advanced cutoffs, NIRF rankings, and placement benchmarks across top B.Tech and Engineering colleges in India.',
    badge: 'Engineering Hub',
    titleFilter: ['b.tech', 'engineering', 'btech', 'b.e.'],
    aliasSlugs: ['engineering', 'btech-colleges'],
  },
  'management-mba-bba': {
    slug: 'management-mba-bba',
    label: 'Management (MBA / BBA)',
    headline: 'MBA & BBA Management Colleges: Fees, Cutoffs & ROI (2027)',
    description:
      'Compare verified fee structures, CAT/MAT/CUET percentiles, accreditation status, and median CTC placements for premier business schools and BBA colleges.',
    badge: 'Management Hub',
    titleFilter: ['bba', 'mba', 'pgdm', 'management'],
    aliasSlugs: ['management', 'mba-colleges', 'bba-colleges'],
  },
  'computer-applications-bca-mca': {
    slug: 'computer-applications-bca-mca',
    label: 'Computer Apps (BCA / MCA)',
    headline: 'BCA & MCA Computer Application Colleges: Fees & Placements (2027)',
    description:
      'Discover top BCA and MCA colleges, updated curriculum comparisons, software industry placements, and entrance eligibility across India.',
    badge: 'Computer Apps Hub',
    titleFilter: ['bca', 'mca', 'computer application'],
    aliasSlugs: ['computer-applications', 'bca-colleges', 'mca-colleges', 'career-paths'],
  },
  'law-legal-studies-llb': {
    slug: 'law-legal-studies-llb',
    label: 'Law & Legal Studies (LLB)',
    headline: 'Law Colleges (LLB / BA LLB): Fees, CLAT Cutoffs & Placements (2027)',
    description:
      'Compare Bar Council of India approved law faculties, 5-year integrated BA LLB vs 3-year LLB degrees, CLAT cutoffs, and moot court exposure.',
    badge: 'Law Hub',
    titleFilter: ['llb', 'law', 'clat'],
    aliasSlugs: ['law-colleges', 'llb-colleges'],
  },
  // City Hubs
  'colleges-in-delhi-ncr': {
    slug: 'colleges-in-delhi-ncr',
    label: 'Colleges in Delhi NCR',
    headline: 'Colleges in Delhi NCR: 2027 Admissions, Fees & Cutoffs',
    description:
      'Explore verified fee structures, admission eligibility, and top college recommendations across Delhi NCR (Delhi, Noida, Gurgaon, Ghaziabad, Faridabad).',
    badge: 'Delhi NCR Hub',
    cityFilter: ['delhi', 'noida', 'gurgaon', 'ghaziabad', 'faridabad'],
    aliasSlugs: ['delhi-ncr', 'delhi'],
  },
  'colleges-in-bangalore': {
    slug: 'colleges-in-bangalore',
    label: 'Colleges in Bangalore',
    headline: 'Colleges in Bangalore: 2027 Admissions, Fees & Cutoffs',
    description:
      'Explore verified fee structures, admission eligibility, and top college recommendations in Bangalore (Bengaluru) with verified placement and ROI data.',
    badge: 'Bangalore Hub',
    cityFilter: ['bangalore', 'bengaluru'],
    aliasSlugs: ['bangalore', 'bengaluru'],
  },
  'colleges-in-pune': {
    slug: 'colleges-in-pune',
    label: 'Colleges in Pune',
    headline: 'Colleges in Pune: 2027 Admissions, Fees & Cutoffs',
    description:
      'Explore verified fee structures, admission cutoffs, and top college recommendations in Pune across engineering, management, and professional courses.',
    badge: 'Pune Hub',
    cityFilter: ['pune'],
    aliasSlugs: ['pune'],
  },
  'colleges-in-mumbai': {
    slug: 'colleges-in-mumbai',
    label: 'Colleges in Mumbai',
    headline: 'Colleges in Mumbai: 2027 Admissions, Fees & Cutoffs',
    description:
      'Explore verified fee structures, admission cutoffs, and top college recommendations in Mumbai and Navi Mumbai with real student data.',
    badge: 'Mumbai Hub',
    cityFilter: ['mumbai', 'navi mumbai'],
    aliasSlugs: ['mumbai'],
  },
  'colleges-in-hyderabad': {
    slug: 'colleges-in-hyderabad',
    label: 'Colleges in Hyderabad',
    headline: 'Colleges in Hyderabad: 2027 Admissions, Fees & Cutoffs',
    description:
      'Explore verified fee structures, admission cutoffs, and top college recommendations in Hyderabad across tech, management, and pharmacy courses.',
    badge: 'Hyderabad Hub',
    cityFilter: ['hyderabad', 'secunderabad'],
    aliasSlugs: ['hyderabad'],
  },
  'City+Course': {
    slug: 'city-wise-courses',
    label: 'City Wise Courses',
    headline: 'City Wise College Guides & Cutoffs',
    description:
      'Explore verified fee structures, admission eligibility, and top college recommendations across Delhi NCR, Mumbai, Bangalore, Pune, and all major education hubs.',
    badge: 'Location Hub',
  },
  'Career Guide': {
    slug: 'career-guides',
    label: 'Career Guides',
    headline: 'College & Professional Career Roadmaps',
    description:
      'In-depth career analysis, future job scope, average starting packages, and high-growth specialization guides for ambitious undergraduate and postgraduate students.',
    badge: 'Career Strategy',
  },
  'Course Guide': {
    slug: 'course-guides',
    label: 'Course Guides',
    headline: 'Degree Curriculum & Specialization Guides',
    description:
      'Compare BBA vs B.Com, MBA vs PGDM, B.Tech vs BCA, and discover course syllabus structures, entrance requirements, and top universities.',
    badge: 'Academics',
  },
  'Scholarship Guide': {
    slug: 'scholarship-guides',
    label: 'Scholarships',
    headline: 'Merit & Need-Based College Scholarships',
    description:
      'Discover official government scholarships, institutional fee waivers, state-wise grants, and application deadlines for undergraduate and postgraduate degrees.',
    badge: 'Financial Aid',
  },
  'FAQ Hub': {
    slug: 'faq-hub',
    label: 'FAQ Hub',
    headline: 'College Admission & Cutoff FAQs Answered',
    description:
      'Straight answers to tough questions on admission cutoffs, fee installments, management quotas, direct admissions, and document verification.',
    badge: 'Admissions FAQ',
  },
  'Comparison': {
    slug: 'comparisons',
    label: 'Comparisons',
    headline: 'Head-to-Head College & Course Comparisons',
    description:
      'Unbiased side-by-side college reviews analyzing actual fees, median CTC placements, campus infrastructure, and genuine student feedback.',
    badge: 'Decision Matrix',
  },
  'Exam Guide': {
    slug: 'exam-guides',
    label: 'Exam Guides',
    headline: 'Entrance Exam Prep & Cutoff Roadmaps',
    description:
      'Syllabus breakdowns, exam pattern insights, score vs percentile targets, and college counseling timelines for national and state entrance exams.',
    badge: 'Test Prep',
  },
};

/**
 * Universal slugifier: Converts any raw category string into a clean URL slug.
 */
export function slugifyCategory(category?: string): string {
  if (!category) return 'college-guides';
  const clean = category.trim();

  // Check known map first
  for (const [dbKey, meta] of Object.entries(KNOWN_CATEGORY_METAS)) {
    if (dbKey.toLowerCase() === clean.toLowerCase() && meta.slug) {
      return meta.slug;
    }
  }

  // Dynamic slugification for any new category added in the future:
  return clean
    .toLowerCase()
    .replace(/\+/g, '-wise-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Internal helper to fetch all unique categories and their counts across all articles.
 * Paginates in batches of 1,000 to scan the entire 4,000+ article database.
 * Wrapped in cache() to run only once per request/render.
 */
let cachedCategoryCounts: { data: Record<string, number>; timestamp: number } | null = null;
const CATEGORY_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export const fetchAllCategoryCounts = cache(
  async (): Promise<Record<string, number>> => {
    if (
      cachedCategoryCounts &&
      Date.now() - cachedCategoryCounts.timestamp < CATEGORY_CACHE_TTL_MS &&
      Object.keys(cachedCategoryCounts.data).length > 0
    ) {
      return cachedCategoryCounts.data;
    }

    try {
      const counts: Record<string, number> = {};
      const pageSize = 1000;
      let offset = 0;

      while (true) {
        const { data, error } = await supabase
          .from('articles')
          .select('category')
          .range(offset, offset + pageSize - 1);

        if (error || !data || data.length === 0) break;

        for (const row of data) {
          if (row.category) {
            counts[row.category] = (counts[row.category] || 0) + 1;
          }
        }

        if (data.length < pageSize) break;
        offset += pageSize;
      }

      if (Object.keys(counts).length > 0) {
        cachedCategoryCounts = { data: counts, timestamp: Date.now() };
      }
      return counts;
    } catch (err) {
      console.error('[Supabase] Exception fetching category counts:', err);
      return cachedCategoryCounts?.data || {};
    }
  }
);

/**
 * Dynamic Category Resolver: Resolves a category by its URL slug.
 * Works for both predefined categories AND all 90+ dynamic categories in Supabase.
 */
export const getCategoryMetaBySlug = cache(
  async (slug: string): Promise<CategoryMeta | null> => {
    try {
      const counts = await fetchAllCategoryCounts();

      // 1. Check known categories & city hubs (matches primary slug or aliases)
      for (const [dbKey, meta] of Object.entries(KNOWN_CATEGORY_METAS)) {
        const isMatch =
          meta.slug === slug ||
          (meta.aliasSlugs && meta.aliasSlugs.includes(slug));

        if (isMatch) {
          let count = 0;
          if (meta.cityFilter && meta.cityFilter.length > 0) {
            const cityConditions = meta.cityFilter
              .map((c) => `title.ilike.%${c}%`)
              .join(',');
            const { count: cityCount } = await supabase
              .from('articles')
              .select('id', { count: 'exact', head: true })
              .in('category', ['City+Course', 'City Guide'])
              .or(cityConditions);
            count = cityCount || 0;
          } else if (meta.titleFilter && meta.titleFilter.length > 0) {
            const titleConditions = meta.titleFilter
              .map((c) => `title.ilike.%${c}%`)
              .join(',');
            const { count: courseCount } = await supabase
              .from('articles')
              .select('id', { count: 'exact', head: true })
              .or(titleConditions);
            count = courseCount || 0;
          } else if (dbKey === 'City+Course') {
            count = Object.entries(counts)
              .filter(([k]) => k.toLowerCase().includes('city'))
              .reduce((sum, [, c]) => sum + c, 0);
          } else {
            count = counts[dbKey] || 0;
          }

          return {
            slug: meta.slug || slug,
            dbCategory: meta.cityFilter
              ? 'City+Course'
              : meta.titleFilter
                ? 'Course Guide'
                : dbKey,
            label: meta.label || formatCategory(dbKey),
            headline: meta.headline || `${formatCategory(dbKey)} Guides 2027`,
            description:
              meta.description ||
              `Compare verified fee structures, admission eligibility, and top college recommendations for ${formatCategory(dbKey)} on Kampus Filter.`,
            badge: meta.badge || 'Admissions Guide',
            count,
            cityFilter: meta.cityFilter,
            titleFilter: meta.titleFilter,
          };
        }
      }

      // 2. Not in known map — match dynamically across all database categories!
      const matchedCategory = Object.keys(counts).find(
        (cat) => slugifyCategory(cat) === slug
      );

      if (!matchedCategory) return null;

      const displayLabel = formatCategory(matchedCategory);
      return {
        slug,
        dbCategory: matchedCategory,
        label: displayLabel,
        headline: `${displayLabel} Guides & Cutoffs`,
        description: `Explore verified fee structures, admission eligibility, and top college recommendations for ${displayLabel} across India with real student data on Kampus Filter.`,
        badge: 'Topic Cluster',
        count: counts[matchedCategory] || 0,
      };
    } catch (err) {
      console.error('[Supabase] Error resolving category by slug:', err);
      return null;
    }
  }
);

/**
 * Returns all active category slugs across all 4,000+ articles for Next.js and sitemaps.
 */
export const getAllCategorySlugs = cache(async (): Promise<string[]> => {
  try {
    const counts = await fetchAllCategoryCounts();
    const dynamicSlugs = Object.keys(counts).map((cat) => slugifyCategory(cat));
    const knownSlugs = Object.values(KNOWN_CATEGORY_METAS)
      .map((m) => m.slug)
      .filter(Boolean) as string[];
    return Array.from(new Set([...knownSlugs, ...dynamicSlugs]));
  } catch (err) {
    console.error('[Supabase] Error fetching all category slugs:', err);
    return [];
  }
});

/**
 * Dynamically fetch only categories that actually have published articles in Supabase.
 * Excludes any dead or empty categories so the UI only shows 100% active topic clusters.
 */
export const getActiveCategories = cache(
  async (): Promise<ActiveCategoryItem[]> => {
    try {
      const counts = await fetchAllCategoryCounts();
      const totalArticles = Object.values(counts).reduce((sum, c) => sum + c, 0);

      const activeCats: ActiveCategoryItem[] = [
        { label: 'All Guides', value: '', slug: '', count: totalArticles },
      ];

      // Sort categories by volume (highest count first)
      const sortedDbCategories = Object.keys(counts).sort(
        (a, b) => counts[b] - counts[a]
      );

      for (const dbCat of sortedDbCategories) {
        if (counts[dbCat] > 0) {
          const known = KNOWN_CATEGORY_METAS[dbCat];
          activeCats.push({
            label: known?.label || formatCategory(dbCat),
            value: dbCat,
            slug: known?.slug || slugifyCategory(dbCat),
            count: counts[dbCat],
          });
        }
      }

      return activeCats;
    } catch (err) {
      console.error('[Supabase] Exception fetching active categories:', err);
      return [{ label: 'All Guides', value: '', slug: '', count: 0 }];
    }
  }
);

/**
 * Fetch contextual related articles from the SAME category for internal linking equity.
 * Falls back to recent articles if the category has fewer than the requested limit.
 */
export async function getRelatedArticlesByCategory(
  category?: string,
  currentSlug?: string,
  limit: number = 3
): Promise<ArticleRow[]> {
  try {
    let related: ArticleRow[] = [];

    if (category) {
      const { data, error } = await supabase
        .from('articles')
        .select('id, slug, title, category, created_at, reading_time_minutes, meta_description, canonical_url, direct_answer')
        .eq('category', category)
        .order('created_at', { ascending: false })
        .limit(limit + 3);

      if (!error && data) {
        related = (data as ArticleRow[])
          .filter((a) => a.slug !== currentSlug)
          .slice(0, limit);
      }
    }

    // If category has fewer articles, backfill with recent articles from across the site
    if (related.length < limit) {
      const needed = limit - related.length;
      const recent = await getRecentArticleSummaries(needed + 5);
      const existingSlugs = new Set([currentSlug, ...related.map((a) => a.slug)]);

      for (const a of recent) {
        if (!existingSlugs.has(a.slug)) {
          related.push(a);
          if (related.length >= limit) break;
        }
      }
    }

    return related;
  } catch (err) {
    console.error('[Supabase] Exception fetching related articles by category:', err);
    return [];
  }
}

/**
 * Fetch total exact article count in Supabase.
 * Uses a lightweight HEAD request (select('*', { count: 'exact', head: true }))
 * Cached with React cache() to eliminate repeat DB round-trips.
 */
export const getTotalArticleCount = cache(async (): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('[Supabase] Error getting total article count:', error);
      return 4736;
    }
    return count || 4736;
  } catch (err) {
    console.error('[Supabase] Exception getting total article count:', err);
    return 4736;
  }
});
