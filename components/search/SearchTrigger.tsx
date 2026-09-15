'use client';

import React from 'react';
import { Search } from 'lucide-react';

export function SearchTrigger() {
  const openSearch = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-global-search'));
    }
  };

  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={openSearch}
      aria-label="Search all college guides (Press Cmd+K)"
      className="group inline-flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full bg-white hover:bg-[#FCA311] text-[#14213D] hover:text-[#000000] border-2 border-[#14213D] shadow-[2px_2px_0_0_#14213D] hover:shadow-[3px_3px_0_0_#000000] text-xs font-bold transition-all cursor-pointer shrink-0"
    >
      <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#14213D] group-hover:text-[#000000] transition-colors" />
      <span className="hidden md:inline ml-2">Search guides...</span>
      <kbd className="hidden md:inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-[#14213D]/10 text-[#14213D] border border-[#14213D]/20 group-hover:bg-[#000000] group-hover:text-[#FCA311] transition-colors">
        ⌘K
      </kbd>
    </button>
  );
}
