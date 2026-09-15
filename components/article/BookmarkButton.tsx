'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, Check } from 'lucide-react';

export interface SavedGuideItem {
  slug: string;
  title: string;
  category?: string;
  readingTimeMinutes?: number;
  savedAt: string;
}

const STORAGE_KEY = 'kf_saved_guides';

export function getSavedGuides(): SavedGuideItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read saved guides:', err);
    return [];
  }
}

interface BookmarkButtonProps {
  slug: string;
  title: string;
  category?: string;
  readingTimeMinutes?: number;
}

export function BookmarkButton({
  slug,
  title,
  category,
  readingTimeMinutes,
}: BookmarkButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSaved = () => {
      const list = getSavedGuides();
      setIsSaved(list.some((item) => item.slug === slug));
    };

    checkSaved();

    const handleUpdate = () => checkSaved();
    window.addEventListener('kampus-bookmarks-updated', handleUpdate);
    return () => window.removeEventListener('kampus-bookmarks-updated', handleUpdate);
  }, [slug]);

  const toggleBookmark = () => {
    try {
      const list = getSavedGuides();
      const existingIdx = list.findIndex((item) => item.slug === slug);

      if (existingIdx >= 0) {
        list.splice(existingIdx, 1);
        setIsSaved(false);
      } else {
        list.unshift({
          slug,
          title,
          category,
          readingTimeMinutes,
          savedAt: new Date().toISOString(),
        });
        setIsSaved(true);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('kampus-bookmarks-updated'));
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  };

  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={toggleBookmark}
      aria-label={isSaved ? 'Remove guide from saved list' : 'Save guide to read later'}
      className={`group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 text-xs font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer ${
        isSaved
          ? 'bg-[#14213D] text-[#FCA311] border-[#000000] shadow-[2px_2px_0_0_#000000]'
          : 'bg-white hover:bg-[#FCA311] text-[#14213D] hover:text-[#000000] border-[#14213D] shadow-[2px_2px_0_0_#14213D]'
      }`}
    >
      <Bookmark
        className={`w-3.5 h-3.5 ${
          isSaved ? 'fill-current text-[#FCA311]' : 'group-hover:fill-current'
        }`}
      />
      <span>{isSaved ? 'Saved' : 'Save Guide'}</span>
    </button>
  );
}
