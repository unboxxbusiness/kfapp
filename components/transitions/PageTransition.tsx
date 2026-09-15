'use client';

import React, { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { LazyMotion, domAnimation, m } from 'framer-motion';

// Premium smooth cubic bezier curve for seamless content entrance
const contentEase = [0.22, 1, 0.36, 1] as const;

/**
 * Inner component wrapped in Suspense to safely listen to pathname changes
 * without de-opting static site generation in Next.js App Router.
 * Query string updates (e.g. calculator sliders or search filters) will NOT
 * trigger full-page remounting or jumping to the top of the window.
 */
function UrlTracker({ onUrlChange }: { onUrlChange: (url: string) => void }) {
  const pathname = usePathname();

  useEffect(() => {
    onUrlChange(pathname);
  }, [pathname, onUrlChange]);

  return null;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [currentUrlKey, setCurrentUrlKey] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect accessibility motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // When URL changes, dismiss loading state and animate new page content in
  const handleUrlChange = useCallback((newUrl: string) => {
    setCurrentUrlKey(newUrl);
    setIsNavigating(false);
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
    }
    // Scroll window smoothly to top on route change
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Detect internal link clicks to trigger the subtle top loading indicator
  // WITHOUT blocking native Next.js prefetching or delaying navigation
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');
      const download = target.getAttribute('download');

      // Ignore external, download, new tab, modified clicks (Ctrl, Meta, Shift), or hash-only links
      if (
        !href ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        targetAttr === '_blank' ||
        download !== null ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      // Ignore self-navigation to identical full path & search query
      const currentPathAndSearch =
        typeof window !== 'undefined'
          ? window.location.pathname + window.location.search
          : '';

      if (href === currentPathAndSearch) {
        return;
      }

      // Start non-blocking top progress bar
      setIsNavigating(true);

      // Safety fallback: ensure loading indicator clears even if navigation is aborted
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = setTimeout(() => {
        setIsNavigating(false);
      }, 5000);
    };

    document.addEventListener('click', handleLinkClick, true);
    return () => {
      document.removeEventListener('click', handleLinkClick, true);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <LazyMotion features={domAnimation}>
      {/* Safe URL & Query Listener */}
      <Suspense fallback={null}>
        <UrlTracker onUrlChange={handleUrlChange} />
      </Suspense>

      {/* 1. Sleek, Non-Blocking Brand Top Loading Line (Stripe / GitHub / Linear style) */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 z-[99999] h-[3px] bg-transparent pointer-events-none overflow-hidden">
          <m.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{
              duration: 0.6,
              ease: [0.65, 0, 0.35, 1],
              repeat: Infinity,
            }}
            className="h-full w-full bg-gradient-to-r from-[#14213D] via-[#FCA311] to-[#FCA311] shadow-[0_0_12px_#FCA311]"
          />
        </div>
      )}

      {/* 2. Seamless Page Content Entrance (Fires smoothly AFTER new page content loads) */}
      <m.div
        key={currentUrlKey || 'initial'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.22,
          ease: contentEase,
        }}
        className="flex-1 flex flex-col w-full"
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

