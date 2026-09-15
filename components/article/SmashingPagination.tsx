import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SmashingPaginationProps {
  currentPage: number;
  totalPages: number;
  totalArticles: number;
  articlesPerPage: number;
  category?: string;
  basePath?: string;
}

export function SmashingPagination({
  currentPage,
  totalPages,
  totalArticles,
  articlesPerPage,
  category,
  basePath = '/',
}: SmashingPaginationProps) {
  if (totalPages <= 1) return null;

  const startArticle = (currentPage - 1) * articlesPerPage + 1;
  const endArticle = Math.min(currentPage * articlesPerPage, totalArticles);

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (category && basePath === '/') {
      params.set('category', category);
    }
    if (page > 1) {
      params.set('page', page.toString());
    }
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  // Generate page numbers to show
  const pageNumbers: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i);
    } else if (
      pageNumbers[pageNumbers.length - 1] !== '...' &&
      (i < currentPage - 1 || i > currentPage + 1)
    ) {
      pageNumbers.push('...');
    }
  }

  return (
    <nav
      aria-label="Article Pagination"
      className="mt-14 pt-8 border-t-2 border-[#14213D] flex flex-col sm:flex-row items-center justify-between gap-5"
    >
      {/* Editorial Counter (Smashing Magazine Inspired) */}
      <div className="text-xs font-black uppercase tracking-wider text-[#14213D]/75">
        Showing{' '}
        <span className="text-[#FCA311] font-black">
          {startArticle}–{endArticle}
        </span>{' '}
        of <span className="text-[#14213D] font-black">{totalArticles}</span>{' '}
        Guides
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={getPageUrl(currentPage - 1)}
            aria-label="Go to previous page"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full border-2 border-[#14213D] bg-white text-[#14213D] hover:bg-[#FCA311] hover:text-[#000000] shadow-[2px_2px_0_0_#14213D] text-xs font-black uppercase tracking-wider transition-all active:translate-x-[1px] active:translate-y-[1px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full border-2 border-[#14213D]/30 bg-white/50 text-[#14213D]/30 text-xs font-black uppercase tracking-wider cursor-not-allowed">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </span>
        )}

        {/* Numbered Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {pageNumbers.map((p, idx) => {
            if (p === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-xs font-black text-[#14213D]/50"
                >
                  …
                </span>
              );
            }

            const pageNum = p as number;
            const isActive = pageNum === currentPage;

            return (
              <Link
                key={pageNum}
                href={getPageUrl(pageNum)}
                aria-label={`Go to page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all ${
                  isActive
                    ? 'bg-[#FCA311] text-[#000000] border-[#000000] shadow-[3px_3px_0_0_#000000] scale-105'
                    : 'bg-white text-[#14213D] border-[#E5E5E5] shadow-[2px_2px_0_0_#14213D] hover:bg-[#FCA311] hover:text-[#000000] hover:border-[#000000]'
                }`}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>

        {/* Next Button */}
        {currentPage < totalPages ? (
          <Link
            href={getPageUrl(currentPage + 1)}
            aria-label="Go to next page"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full border-2 border-[#000000] bg-[#14213D] text-white hover:bg-[#FCA311] hover:text-[#000000] shadow-[2px_2px_0_0_#000000] text-xs font-black uppercase tracking-wider transition-all active:translate-x-[1px] active:translate-y-[1px]"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full border-2 border-[#14213D]/30 bg-white/50 text-[#14213D]/30 text-xs font-black uppercase tracking-wider cursor-not-allowed">
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </nav>
  );
}
