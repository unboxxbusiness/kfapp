'use client';

import React, { useState, useEffect } from 'react';
import { ListFilter, ChevronRight, X, Compass } from 'lucide-react';

export interface TocEntry {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TocEntry[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showFloatingButton, setShowFloatingButton] = useState<boolean>(false);

  useEffect(() => {
    if (items.length === 0) return;

    // Track active section via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    // Track scroll to show floating button
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  if (!items || items.length === 0) return null;

  const handleJump = (id: string) => {
    setIsDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <>
      {/* 1. Inline Overview Card (Smashing Magazine Style: "In This Guide") */}
      <nav
        aria-label="Table of Contents"
        className="my-8 p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#14213D] shadow-[4px_4px_0_0_#14213D]"
      >
        <div className="flex items-center gap-2.5 pb-4 mb-4 border-b-2 border-[#14213D]/10">
          <span className="p-1.5 rounded-lg bg-[#FCA311] border border-[#000000] text-[#000000]">
            <Compass className="w-4 h-4" />
          </span>
          <h2 className="font-serif text-lg font-black text-[#000000] uppercase tracking-wide">
            In This College Decision Guide
          </h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {items.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleJump(item.id);
                  }}
                  className={`group flex items-center justify-between gap-3 p-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#14213D] text-white font-black shadow-[2px_2px_0_0_#000000]'
                      : 'text-[#14213D] hover:bg-[#FCA311]/20 hover:text-[#000000] font-bold'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                        isActive
                          ? 'bg-[#FCA311] text-[#000000]'
                          : 'bg-[#14213D]/10 text-[#14213D] group-hover:bg-[#FCA311] group-hover:text-[#000000]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isActive
                        ? 'text-[#FCA311] translate-x-0.5'
                        : 'text-[#14213D]/40 group-hover:translate-x-0.5'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* 2. Floating Quick-Jump Trigger (Visible on scroll) */}
      <div
        className={`fixed bottom-4 left-3.5 sm:bottom-5 sm:left-5 z-30 transition-all duration-300 ${
          showFloatingButton
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open Table of Contents (Roadmap)"
          className="inline-flex items-center justify-center w-11 h-11 sm:w-auto sm:h-auto sm:gap-2 sm:px-4 sm:py-2.5 rounded-full bg-[#14213D] text-white font-black text-xs uppercase tracking-wider border-2 border-[#000000] shadow-[3px_3px_0_0_#000000] hover:bg-[#FCA311] hover:text-[#000000] transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <ListFilter className="w-5 h-5 sm:w-4 sm:h-4 text-[#FCA311]" />
          <span className="hidden sm:inline">Guide Roadmap</span>
        </button>
      </div>

      {/* 3. Slide-over Table of Contents Modal/Drawer */}
      {isDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl border-2 border-[#14213D] shadow-[6px_6px_0_0_#14213D] overflow-hidden max-h-[85vh] flex flex-col animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b-2 border-[#14213D] bg-[#14213D] text-white">
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-[#FCA311]" />
                <h3 className="font-serif font-black text-base text-white">
                  Guide Sections
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close Roadmap"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FCA311] hover:text-[#000000] flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sections List */}
            <div className="p-4 overflow-y-auto space-y-1.5">
              {items.map((item, idx) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleJump(item.id)}
                    className={`w-full text-left flex items-center justify-between gap-3 p-3 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#14213D] text-white font-black shadow-[2px_2px_0_0_#000000]'
                        : 'text-[#14213D] hover:bg-[#FCA311]/20 font-bold'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                          isActive
                            ? 'bg-[#FCA311] text-[#000000]'
                            : 'bg-[#14213D]/10 text-[#14213D]'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="truncate">{item.title}</span>
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isActive ? 'text-[#FCA311]' : 'text-[#14213D]/40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
