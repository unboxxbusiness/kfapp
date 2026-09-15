'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Compass, ArrowRight } from 'lucide-react';
import { GlobalLeadCapture } from '@/components/lead/GlobalLeadCapture';

interface HomeHeroProps {
  selectedCategory?: string;
  categories: { label: string; value: string; slug?: string }[];
  totalArticles: number;
}

export function HomeHero({
  selectedCategory,
  categories,
  totalArticles,
}: HomeHeroProps) {
  return (
    <section className="relative bg-white pt-8 pb-14 sm:pt-14 sm:pb-20 border-b-2 sm:border-b-3 border-[#14213D] overflow-hidden">
      {/* Decorative CSS Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#14213D 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Decorative Ambient Color Spots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FCA311]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-28 w-80 h-80 bg-[#14213D]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Content & Positioning */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Eyebrow Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14213D] text-white border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] text-[11px] font-black uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FCA311] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FCA311]" />
                </span>
                <span>Admissions 2026–2027</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E5E5E5] text-[#14213D] border-2 border-[#14213D] shadow-[2px_2px_0_0_#14213D] text-[11px] font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FCA311]" />
                <span>Official NIRF Benchmarks</span>
              </span>
            </div>

            {/* Display Headline with Brutalist Rotated Badge */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.25rem] font-black text-[#000000] tracking-tight leading-[1.04]">
              Get Into The{' '}
              <span className="relative inline-block my-1 text-[#000000] bg-[#FCA311] px-3.5 py-1 rounded-2xl border-2 sm:border-3 border-[#000000] rotate-[-2deg] shadow-[4px_4px_0_0_#000000] hover:rotate-0 transition-transform cursor-default">
                University
              </span>{' '}
              You Actually Want.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[#14213D]/85 max-w-2xl font-medium leading-relaxed">
              India’s student-first decision network. Compare verified fee breakdowns, official cutoffs, and connect directly with accredited university admissions desks.
            </p>

            {/* Category Filter Chips: Top Power Hubs + Browse All 94 Topics Modal */}
            <div className="pt-2">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="block text-[11px] font-black uppercase tracking-wider text-[#14213D]/70">
                  Popular Topic Clusters:
                </span>
                <span className="text-[11px] font-bold text-[#14213D]/50 hidden sm:inline">
                  {totalArticles || 4347} Guides Across 94 Categories
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {categories.slice(0, 8).map((cat) => {
                  const isActive = !selectedCategory
                    ? !cat.value || !cat.slug
                    : selectedCategory === cat.value || selectedCategory === cat.slug;
                  const href = cat.slug
                    ? `/category/${cat.slug}`
                    : cat.value
                    ? `/category/${encodeURIComponent(cat.value)}`
                    : '/';
                  return (
                    <Link
                      key={cat.label}
                      href={href}
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

                {/* View All 94 Topics Dedicated Page Link */}
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider bg-[#14213D] text-[#FCA311] border-2 border-[#000000] shadow-[3px_3px_0_0_#000000] hover:bg-[#FCA311] hover:text-[#000000] hover:shadow-[4px_4px_0_0_#000000] hover:translate-y-[-1px] transition-all cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>View All 94 Topics</span>
                  <ArrowRight className="w-3 h-3 text-current" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Hero Lead Capture Form */}
          <div className="lg:col-span-5 relative">
            {/* Top Floating Badge */}
            <div className="hidden sm:flex absolute -top-4 -right-3 z-20 items-center gap-1.5 px-3 py-1 rounded-full bg-[#14213D] text-[#FCA311] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] text-[10px] font-black uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#FCA311]" />
              <span>100% Free Guidance</span>
            </div>

            {/* Embedded Lead Capture Card */}
            <GlobalLeadCapture
              variant="hero"
              title="Find Your Best-Fit College"
              subtitle="Get transparent cutoffs, fee audits, and shortlist recommendations delivered straight to your WhatsApp."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
