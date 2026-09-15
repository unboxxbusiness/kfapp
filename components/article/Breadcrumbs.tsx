import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { formatCategory, slugifyCategory } from '@/lib/supabase';

interface BreadcrumbsProps {
  category?: string;
  title: string;
}

export function Breadcrumbs({ category, title }: BreadcrumbsProps) {
  const categoryLabel = formatCategory(category);
  const categorySlug = category ? slugifyCategory(category) : '';
  const categoryHref = categorySlug ? `/category/${categorySlug}` : '/';
  const categoryFullUrl = categorySlug
    ? `https://kampusfilter.com/category/${categorySlug}`
    : 'https://kampusfilter.com';

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
        name: categoryLabel,
        item: categoryFullUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
      },
    ],
  };

  return (
    <>
      {/* Schema.org BreadcrumbList for Google Search Console & Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Visual Accessible Breadcrumb Bar */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center flex-wrap gap-1.5 text-[11px] sm:text-xs font-bold text-[#14213d]/70"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-[#fca311] transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        <ChevronRight className="w-3 h-3 text-[#14213d]/40" />

        <Link
          href={categoryHref}
          className="hover:text-[#fca311] transition-colors"
        >
          {categoryLabel}
        </Link>

        <ChevronRight className="w-3 h-3 text-[#14213d]/40" />

        <span className="text-[#14213d] font-black truncate max-w-[200px] sm:max-w-[340px]">
          {title}
        </span>
      </nav>
    </>
  );
}
