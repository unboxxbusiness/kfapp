'use client';

import React from 'react';
import { Search, Sparkles } from 'lucide-react';

export function NotFoundSearchBox() {
  const handleOpenSearch = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-global-search'));
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <button
        type="button"
        onClick={handleOpenSearch}
        aria-label="Search all college guides"
        className="w-full flex items-center justify-between gap-3 px-5 py-3.5 sm:py-4 rounded-2xl bg-white border-2 sm:border-3 border-[#14213D] shadow-[4px_4px_0_0_#14213D] hover:shadow-[6px_6px_0_0_#FCA311] hover:border-[#000000] text-left transition-all duration-200 cursor-pointer group transform hover:-translate-y-0.5"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-xl bg-[#FCA311] text-[#000000] border-2 border-[#000000] shadow-[1px_1px_0_0_#000000] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Search className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#14213D]/70 group-hover:text-[#14213D] truncate">
            Search 2,100+ college guides, fees, cutoffs...
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded-md text-[10px] font-black uppercase bg-[#14213D]/10 text-[#14213D] border border-[#14213D]/20 group-hover:bg-[#14213D] group-hover:text-[#FCA311] transition-colors">
            ⌘K
          </kbd>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#14213D] text-[#FCA311] text-[10px] font-black uppercase tracking-wider group-hover:bg-[#FCA311] group-hover:text-[#000000] transition-colors">
            <Sparkles className="w-2.5 h-2.5" />
            <span className="hidden xs:inline">Search</span>
          </span>
        </div>
      </button>
    </div>
  );
}
