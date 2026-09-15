'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTopButton() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      suppressHydrationWarning
      onClick={scrollToTop}
      type="button"
      aria-label="Back to top of page"
      className="group inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#FCA311] text-[#000000] font-black text-xs uppercase tracking-wider border-2 border-[#000000] shadow-[3px_3px_0_0_#000000] hover:bg-white hover:text-[#14213D] hover:shadow-[4px_4px_0_0_#FCA311] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
    >
      <span>Back to Top</span>
      <span className="w-5 h-5 rounded-full bg-[#000000] text-[#FCA311] group-hover:bg-[#14213D] group-hover:text-white flex items-center justify-center transition-colors">
        <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
      </span>
    </button>
  );
}
