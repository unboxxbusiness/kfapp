'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Clock, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { formatCategory, slugifyCategory } from '@/lib/supabase';

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  category: string;
  reading_time_minutes?: number;
  direct_answer?: string;
}

const POPULAR_SEARCHES = [
  { label: 'BBA Colleges', query: 'BBA' },
  { label: 'MBA Fee Comparison', query: 'MBA' },
  { label: 'BCA Salary & Placements', query: 'BCA' },
  { label: 'Nursing Salaries', query: 'Nursing' },
  { label: 'Engineering Cutoffs', query: 'Engineering' },
];

export function GlobalSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Listen for Cmd+K / Ctrl+K / '/' and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-global-search', handleOpenEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-global-search', handleOpenEvent);
    };
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
          setSelectedIndex(0);
        }
      } catch (err) {
        console.error('Error fetching search results:', err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelectArticle = (slug: string) => {
    setIsOpen(false);
    router.push(`/articles/${slug}`);
  };

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelectArticle(results[selectedIndex].slug);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global college guides search"
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-[#14213D] shadow-[6px_6px_0_0_#14213D] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyNavigation}
      >
        {/* Search Bar Input */}
        <div className="relative flex items-center px-4 sm:px-6 py-4 border-b-2 border-[#14213D] bg-white">
          <Search className="w-5 h-5 text-[#14213D]/60 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search college guides, fees, cutoffs, salary reports..."
            className="w-full bg-transparent text-sm sm:text-base font-bold text-[#000000] placeholder-[#14213D]/40 outline-none"
            aria-label="Search college guides"
          />

          {isLoading ? (
            <Loader2 className="w-5 h-5 text-[#FCA311] animate-spin shrink-0 ml-2" />
          ) : query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search input"
              className="p-1 rounded-full text-[#14213D]/50 hover:text-[#000000] hover:bg-[#14213D]/10 transition-colors mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}

          {/* Explicit Close Button for Mobile & Desktop */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close search dialog"
            className="ml-1 sm:ml-2 w-8 h-8 rounded-full bg-[#14213D]/10 hover:bg-[#FCA311] text-[#14213D] hover:text-[#000000] border border-[#14213D]/20 flex items-center justify-center transition-all shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Content Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3 sm:p-4 divide-y divide-[#14213D]/10">
          {/* Empty / Initial State with Quick Shortcuts */}
          {!query && (
            <div className="p-4 space-y-4">
              <span className="block text-[11px] font-black uppercase tracking-wider text-[#14213D]/60">
                Popular Student Searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setQuery(item.query)}
                    className="px-3.5 py-1.5 rounded-full bg-white border-2 border-[#14213D] text-[#14213D] hover:bg-[#FCA311] hover:text-[#000000] text-xs font-black shadow-[2px_2px_0_0_#14213D] transition-all active:scale-95 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {results.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <span className="block px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#14213D]/60">
                Found {results.length} Matching Guides:
              </span>
              {results.map((result, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={result.id || result.slug}
                    onClick={() => handleSelectArticle(result.slug)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`group flex items-start justify-between gap-3 p-3.5 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#14213D] text-white shadow-[3px_3px_0_0_#000000]'
                        : 'hover:bg-[#FCA311]/15 text-[#14213D]'
                    }`}
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                            isSelected
                              ? 'bg-[#FCA311] text-[#000000]'
                              : 'bg-[#14213D]/10 text-[#14213D]'
                          }`}
                        >
                          {formatCategory(result.category)}
                        </span>
                        {result.reading_time_minutes && (
                          <span
                            className={`flex items-center gap-1 text-[10px] font-bold ${
                              isSelected ? 'text-white/70' : 'text-[#14213D]/60'
                            }`}
                          >
                            <Clock className="w-3 h-3 text-[#FCA311]" />
                            <span>{result.reading_time_minutes}m</span>
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif font-black text-sm sm:text-base leading-snug line-clamp-2">
                        {result.title}
                      </h4>

                      {result.direct_answer && (
                        <p
                          className={`text-xs line-clamp-1 ${
                            isSelected ? 'text-white/75' : 'text-[#14213D]/70'
                          }`}
                        >
                          {result.direct_answer}
                        </p>
                      )}
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                        isSelected
                          ? 'text-[#FCA311] translate-x-1'
                          : 'text-[#14213D]/40 group-hover:translate-x-1'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* No results message */}
          {query && !isLoading && results.length === 0 && (
            <div className="p-8 text-center space-y-2">
              <BookOpen className="w-8 h-8 text-[#14213D]/40 mx-auto" />
              <p className="font-serif font-black text-base text-[#14213D]">
                No guides matching &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-[#14213D]/70">
                Try searching for degrees like BBA, MBA, BCA, or topics like salary or fees.
              </p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-[#E5E5E5] border-t border-[#14213D]/20 flex items-center justify-between text-[11px] text-[#14213D]/70 font-semibold">
          <span className="hidden sm:inline">Navigation: Use ↑ ↓ to select, Enter to open</span>
          <span className="sm:hidden">Tap any guide to open</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="sm:hidden px-3 py-1 rounded-full bg-[#14213D] text-[#FCA311] font-black text-xs hover:bg-[#000000] transition-colors cursor-pointer"
          >
            Close Search
          </button>
          <span className="hidden sm:inline">Press Esc to dismiss</span>
        </div>
      </div>
    </div>
  );
}
