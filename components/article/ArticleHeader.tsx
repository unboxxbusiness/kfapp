import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatCategory, slugifyCategory } from '@/lib/supabase';
import { BookmarkButton } from './BookmarkButton';
import { PrintButton } from './PrintButton';

interface ArticleHeaderProps {
  title: string;
  category?: string;
  byline?: string;
  lastUpdated: string;
  readingTimeMinutes?: number;
  slug?: string;
}

export function ArticleHeader({
  title,
  category = 'College Guide',
  byline = 'By Team Kampus Filter',
  lastUpdated,
  readingTimeMinutes = 4,
  slug,
}: ArticleHeaderProps) {
  const displayCategory = formatCategory(category);

  return (
    <header className="mb-10 pb-8 border-b-2 border-[#14213D]">
      {/* Breadcrumb & Smashing Style Amber Tag */}
      <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-bold">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#14213D]/70 hover:text-[#FCA311] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Guides</span>
        </Link>
        <span className="text-[#14213D]/30">/</span>
        <Link
          href={`/category/${slugifyCategory(category)}`}
          className="px-3.5 py-1 rounded-full bg-[#FCA311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] uppercase tracking-wider text-[10px] font-black hover:bg-[#000000] hover:text-white transition-colors"
        >
          {displayCategory}
        </Link>
      </div>

      {/* Main Headline in Bold Serif */}
      <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-[#000000] leading-[1.08] tracking-tight mb-6">
        {title}
      </h1>

      {/* Byline & Metadata Card (Smashing Magazine Card Style) */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border-2 border-[#14213D] shadow-[3px_3px_0_0_#14213D]">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#14213D] text-[#FCA311] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] flex items-center justify-center font-black text-sm">
            KF
          </div>
          <div>
            <p className="font-black text-[#000000] text-sm sm:text-base">
              Team Kampus Filter
            </p>
            <p className="text-xs text-[#14213D]/70 font-medium">
              Student College Research Team
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#14213D]/80">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#FCA311]" />
            <span>Updated: {lastUpdated}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#FCA311]" />
            <span>{readingTimeMinutes} min read</span>
          </span>

          {/* Quick Reader Actions (Save & Print) */}
          <div className="flex items-center gap-2 pl-2 sm:border-l border-[#14213D]/20 no-print">
            {slug && (
              <BookmarkButton
                slug={slug}
                title={title}
                category={category}
                readingTimeMinutes={readingTimeMinutes}
              />
            )}
            <PrintButton />
          </div>
        </div>
      </div>
    </header>
  );
}
