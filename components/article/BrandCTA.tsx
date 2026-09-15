'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { BrandCtaComponent } from '@/types/article';

interface BrandCtaProps {
  cta?: BrandCtaComponent | null;
}

export function BrandCTA({ cta }: BrandCtaProps) {
  const headline = cta?.headline || 'Explore Colleges With Real Campus Data';
  const description =
    cta?.description ||
    'Compare transparent fee structures, placement records, and student guides free on Kampus Filter.';
  const buttonText = cta?.button_text || 'Explore All Guides';

  // Sanitize URL to ensure smooth client-side Next.js routing across all environments
  let rawUrl = (cta?.button_url || '/').trim();
  if (rawUrl.startsWith('https://kampusfilter.com')) {
    rawUrl = rawUrl.replace('https://kampusfilter.com', '') || '/';
  } else if (rawUrl.startsWith('http://kampusfilter.com')) {
    rawUrl = rawUrl.replace('http://kampusfilter.com', '') || '/';
  }
  const isExternal = rawUrl.startsWith('http://') || rawUrl.startsWith('https://');

  const openLeadModal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-shortlist-modal'));
    }
  };

  return (
    <section className="my-14 relative overflow-hidden rounded-3xl bg-[#14213D] border-3 border-[#000000] shadow-[6px_6px_0_0_#FCA311] p-8 sm:p-12 text-white">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCA311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] text-xs font-black uppercase tracking-wider mb-5">
          <GraduationCap className="w-4 h-4" />
          <span>Kampus Filter Network</span>
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight text-white">
          {headline}
        </h3>

        <p className="text-base sm:text-lg text-white/85 mb-8 leading-relaxed max-w-xl mx-auto font-medium">
          {description}
        </p>

        {/* Dual High-Impact Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          {isExternal ? (
            <a
              href={rawUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#FCA311] text-[#000000] hover:bg-white hover:text-[#14213D] border-2 border-[#000000] shadow-[4px_4px_0_0_#000000] font-black text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px]"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <Link
              href={rawUrl}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#FCA311] text-[#000000] hover:bg-white hover:text-[#14213D] border-2 border-[#000000] shadow-[4px_4px_0_0_#000000] font-black text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px]"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <button
            suppressHydrationWarning
            onClick={openLeadModal}
            type="button"
            aria-label="Get Free College Shortlist"
            className="inline-flex items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-white/10 hover:bg-white hover:text-[#14213D] text-white border-2 border-white/25 hover:border-[#000000] shadow-[3px_3px_0_0_#000000] font-black text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-[#FCA311]" />
            <span>Get Free Shortlist</span>
          </button>
        </div>

        <p className="mt-5 text-xs font-bold text-[#FCA311] uppercase tracking-wide">
          100% Free Student Access • Unbiased Campus Data
        </p>
      </div>
    </section>
  );
}
