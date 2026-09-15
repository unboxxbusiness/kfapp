'use client';

import React from 'react';
import { GraduationCap } from 'lucide-react';

export function ShortlistButton() {
  const openShortlist = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-shortlist-modal'));
    }
  };

  return (
    <button
      suppressHydrationWarning
      onClick={openShortlist}
      type="button"
      aria-label="Get Free College Shortlist"
      className="group relative inline-flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:gap-2 px-0 sm:px-5 py-0 sm:py-2.5 rounded-full bg-[#fca311] text-[#000000] font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] sm:shadow-[3px_3px_0_0_#000000] hover:shadow-[4px_4px_0_0_#14213d] hover:bg-[#14213d] hover:text-white transition-all transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer shrink-0"
    >
      <GraduationCap className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#000000] group-hover:text-[#fca311] transition-colors" />
      <span className="hidden sm:inline">Get Free Shortlist</span>
      <span className="hidden sm:inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#000000] group-hover:bg-[#fca311] animate-pulse" />
    </button>
  );
}
