'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { getSavedGuides } from './BookmarkButton';

export function SavedGuidesTrigger() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const list = getSavedGuides();
      setCount(list.length);
    };

    updateCount();

    window.addEventListener('kampus-bookmarks-updated', updateCount);
    return () => window.removeEventListener('kampus-bookmarks-updated', updateCount);
  }, []);

  const openDrawer = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-saved-guides'));
    }
  };

  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={openDrawer}
      aria-label={`Open saved college guides (${count} saved)`}
      className="group relative inline-flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-3.5 sm:py-2 sm:gap-1.5 rounded-full bg-white hover:bg-[#FCA311] text-[#14213D] hover:text-[#000000] border-2 border-[#14213D] shadow-[2px_2px_0_0_#14213D] hover:shadow-[3px_3px_0_0_#000000] text-xs font-bold transition-all cursor-pointer shrink-0"
    >
      <Bookmark className="w-4 h-4 sm:w-3.5 sm:h-3.5 group-hover:fill-current transition-all" />
      <span className="hidden sm:inline">Saved</span>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 sm:static inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#14213D] text-[#FCA311] group-hover:bg-[#000000] group-hover:text-[#FCA311] text-[10px] font-black border sm:border-0 border-white shadow-sm">
          {count}
        </span>
      )}
    </button>
  );
}
