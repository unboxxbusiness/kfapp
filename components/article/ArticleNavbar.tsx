import React from 'react';
import Link from 'next/link';
import { ShortlistButton } from './ShortlistButton';
import { SearchTrigger } from '@/components/search/SearchTrigger';
import { SavedGuidesTrigger } from './SavedGuidesTrigger';

export function ArticleNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b-2 border-[#14213D] transition-colors no-print overflow-x-clip">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Official Kampus Filter Logo */}
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

        {/* Right Actions: Instant Search + Saved Guides + Shortlist */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <SearchTrigger />
          <SavedGuidesTrigger />
          <ShortlistButton />
        </div>
      </div>
    </header>
  );
}
