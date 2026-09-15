import React from 'react';
import Link from 'next/link';
import { ShortlistButton } from './ShortlistButton';
import { SearchTrigger } from '@/components/search/SearchTrigger';
import { SavedGuidesTrigger } from './SavedGuidesTrigger';
import { Compass, Calculator } from 'lucide-react';

export function ArticleNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b-2 border-[#14213D] transition-colors no-print overflow-x-clip">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Side: Logo & Desktop Navigation Link */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="Kampus Filter Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dhrigocvd/image/upload/w_200,c_limit,e_trim,f_auto,q_auto/v1769401433/logo_Kampus_Filter_gync6j.webp"
              alt="Kampus Filter"
              width={180}
              height={44}
              className="h-7 sm:h-10 md:h-11 w-auto max-w-[130px] sm:max-w-none object-contain object-left group-hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Desktop Categories & ROI Calculator Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <Link
              href="/categories"
              className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-[#14213D] hover:bg-[#FCA311] hover:text-[#000000] border-2 border-transparent hover:border-[#000000] transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-[#FCA311] group-hover:text-[#000000] transition-colors" />
              <span>Categories</span>
            </Link>
            <Link
              href="/tools/roi-calculator"
              className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-[#14213D] hover:bg-[#FCA311] hover:text-[#000000] border-2 border-transparent hover:border-[#000000] transition-all"
            >
              <Calculator className="w-3.5 h-3.5 text-[#FCA311] group-hover:text-[#000000] transition-colors" />
              <span>ROI Calculator</span>
            </Link>
          </nav>
        </div>

        {/* Right Actions: Mobile Categories Pill + Instant Search + Saved Guides + Shortlist */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <Link
            href="/categories"
            className="group md:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white hover:bg-[#FCA311] text-[#14213D] hover:text-[#000000] border-2 border-[#14213D] shadow-[2px_2px_0_0_#14213D] text-[11px] font-black uppercase tracking-wider transition-all"
            aria-label="All Categories"
          >
            <Compass className="w-3.5 h-3.5 text-[#FCA311] group-hover:text-[#000000] transition-colors" />
            <span>Categories</span>
          </Link>

          <SearchTrigger />
          <SavedGuidesTrigger />
          <ShortlistButton />
        </div>
      </div>
    </header>
  );
}
