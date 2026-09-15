import React from 'react';
import Link from 'next/link';
import { ArticleRow } from '@/types/article';
import { formatCategory } from '@/lib/supabase';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';

interface RecentArticlesProps {
  articles: ArticleRow[];
}

export function RecentArticles({ articles }: RecentArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="border-t-2 border-[#14213D] bg-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b-2 border-[#14213D]">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FCA311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Keep Reading</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-black text-[#000000] leading-tight">
              Recent College Decision Guides
            </h3>
            <p className="text-xs sm:text-sm text-[#14213D]/75 font-medium mt-1">
              Explore more admissions insights, fee structures, and college comparisons.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-full bg-white text-[#14213D] hover:bg-[#FCA311] hover:text-[#000000] border-2 border-[#14213D] shadow-[2px_2px_0_0_#14213D] transition-all self-start sm:self-auto shrink-0"
          >
            <span>All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3-Column Recent Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <article
              key={article.id || article.slug}
              className="card-kf flex flex-col justify-between p-6 bg-white"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#E5E5E5] text-[#14213D] border-2 border-[#14213D] shadow-[1px_1px_0_0_#14213D]">
                    {formatCategory(article.category)}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-[#14213D]/70">
                    <Clock className="w-3 h-3 text-[#FCA311]" />
                    <span>{article.reading_time_minutes || 4}m read</span>
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl font-black text-[#000000] hover:text-[#FCA311] transition-colors leading-snug mb-3 line-clamp-2">
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h4>

                <p className="text-xs text-[#14213D]/80 line-clamp-3 leading-relaxed mb-4 font-normal">
                  {article.direct_answer || article.meta_description}
                </p>
              </div>

              <div className="pt-4 border-t-2 border-[#14213D]/15 flex items-center justify-between text-xs font-black">
                <span className="text-[#14213D]/70 font-semibold text-[11px]">
                  Team Kampus Filter
                </span>
                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center gap-1 text-[#14213D] hover:text-[#FCA311] font-black"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
