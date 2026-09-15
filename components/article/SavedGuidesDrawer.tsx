'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, X, ArrowRight, Trash2, Clock, BookOpen } from 'lucide-react';
import { formatCategory } from '@/lib/supabase';
import { getSavedGuides, SavedGuideItem } from './BookmarkButton';

export function SavedGuidesDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [savedGuides, setSavedGuides] = useState<SavedGuideItem[]>([]);

  const reloadGuides = () => {
    setSavedGuides(getSavedGuides());
  };

  useEffect(() => {
    reloadGuides();

    const handleOpen = () => {
      reloadGuides();
      setIsOpen(true);
    };

    const handleUpdate = () => {
      reloadGuides();
    };

    window.addEventListener('open-saved-guides', handleOpen);
    window.addEventListener('kampus-bookmarks-updated', handleUpdate);

    return () => {
      window.removeEventListener('open-saved-guides', handleOpen);
      window.removeEventListener('kampus-bookmarks-updated', handleUpdate);
    };
  }, []);

  const handleRemove = (slug: string) => {
    const updated = savedGuides.filter((item) => item.slug !== slug);
    localStorage.setItem('kf_saved_guides', JSON.stringify(updated));
    setSavedGuides(updated);
    window.dispatchEvent(new CustomEvent('kampus-bookmarks-updated'));
  };

  const handleClearAll = () => {
    if (confirm('Clear all saved college guides?')) {
      localStorage.removeItem('kf_saved_guides');
      setSavedGuides([]);
      window.dispatchEvent(new CustomEvent('kampus-bookmarks-updated'));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Saved college guides"
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-md h-full bg-white border-l-2 sm:border-l-3 border-[#14213D] shadow-[-8px_0_0_0_#14213D] flex flex-col animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b-2 border-[#14213D] bg-[#14213D] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-[#FCA311] fill-current" />
            <h3 className="font-serif font-black text-lg text-white">
              My Saved Guides ({savedGuides.length})
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close saved guides drawer"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FCA311] hover:text-[#000000] flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Guides List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {savedGuides.length > 0 ? (
            savedGuides.map((guide) => (
              <div
                key={guide.slug}
                className="p-4 rounded-2xl bg-white border-2 border-[#14213D] shadow-[3px_3px_0_0_#14213D] hover:border-[#FCA311] transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#FCA311] text-[#000000] border border-[#000000]">
                    {formatCategory(guide.category)}
                  </span>
                  {guide.readingTimeMinutes && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#14213D]/70">
                      <Clock className="w-3 h-3 text-[#FCA311]" />
                      <span>{guide.readingTimeMinutes}m read</span>
                    </span>
                  )}
                </div>

                <h4 className="font-serif font-bold text-sm sm:text-base leading-snug text-[#000000]">
                  <Link
                    href={`/articles/${guide.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#FCA311] transition-colors"
                  >
                    {guide.title}
                  </Link>
                </h4>

                <div className="flex items-center justify-between pt-2 border-t border-[#14213D]/10">
                  <button
                    type="button"
                    onClick={() => handleRemove(guide.slug)}
                    aria-label={`Remove ${guide.title}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#14213D]/50 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>

                  <Link
                    href={`/articles/${guide.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#14213D] hover:text-[#FCA311] transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center space-y-3 my-auto">
              <BookOpen className="w-10 h-10 text-[#14213D]/30 mx-auto" />
              <p className="font-serif font-black text-lg text-[#14213D]">
                No Saved College Guides
              </p>
              <p className="text-xs text-[#14213D]/70 max-w-xs mx-auto leading-relaxed">
                Click the &ldquo;Save Guide&rdquo; ribbon on any college article to keep track of fee audits and cutoff comparisons.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {savedGuides.length > 0 && (
          <div className="p-4 border-t-2 border-[#14213D] bg-[#E5E5E5]/60 flex items-center justify-between">
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
            >
              Clear All Saved
            </button>
            <span className="text-[11px] text-[#14213D]/60 font-semibold">
              Saved in browser storage
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
