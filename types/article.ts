/**
 * Kampus Filter - Jake Ward Programmatic SEO (pSEO) Types
 * Schema: Supabase PostgreSQL `articles` table
 * Design: Smashing Magazine style editorial reader
 */

export interface ArticleHeaderComponent {
  h1_title: string;
  byline: string;
  last_updated: string;
  reading_time?: string;
}

export interface DirectAnswerSummaryComponent {
  badge: string;
  paragraph: string;
  key_stat?: string;
}

export interface ArticleSectionComponent {
  h2: string;
  paragraphs: string[];
  bullet_points?: string[];
}

export interface ComparisonTableComponent {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface DecisionStep {
  step: number;
  title: string;
  desc: string;
}

export interface DecisionFrameworkComponent {
  h2: string;
  steps: DecisionStep[];
}

export interface BrandCtaComponent {
  badge: string;
  headline: string;
  description: string;
  button_text: string;
  button_url: string;
}

export interface AuthorBioComponent {
  name: string;
  role: string;
  credentials: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleComponents {
  header?: ArticleHeaderComponent;
  direct_answer_summary?: DirectAnswerSummaryComponent;
  section_1?: ArticleSectionComponent;
  section_2?: ArticleSectionComponent;
  section_3?: ArticleSectionComponent;
  sections?: ArticleSectionComponent[];
  comparison_table?: ComparisonTableComponent;
  decision_framework?: DecisionFrameworkComponent;
  brand_cta?: BrandCtaComponent;
  author_bio?: AuthorBioComponent;
  faq?: FAQItem[];
}

export interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  meta_description: string;
  description?: string;
  canonical_url?: string;
  target_keyword: string;
  category: string;
  target_audience?: string;
  schema_type?: string;

  // Direct Answer for Google AI Overviews & Answer Engine Optimization
  direct_answer: string;

  // Modular Component Blocks (JSONB columns)
  header?: ArticleHeaderComponent;
  direct_answer_summary?: DirectAnswerSummaryComponent;
  sections?: ArticleSectionComponent[];
  comparison_table?: ComparisonTableComponent;
  decision_framework?: DecisionFrameworkComponent;
  brand_cta?: BrandCtaComponent;
  author_bio?: AuthorBioComponent;

  // Rich Snippets
  faq?: FAQItem[];
  json_ld_schema?: Record<string, any>;

  // Root Content JSON & Markdown
  content_json?: {
    title: string;
    meta_description: string;
    direct_answer: string;
    components?: ArticleComponents;
    faq?: FAQItem[];
    json_ld_schema?: Record<string, any>;
    content_markdown?: string;
  };
  content_markdown?: string;

  // Status & Metrics
  is_published: boolean;
  published_at?: string;
  status: string;
  source_file?: string;
  source_row_id?: number;
  word_count?: number;
  reading_time_minutes?: number;

  created_at: string;
  updated_at: string;
}
