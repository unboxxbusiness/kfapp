'use client';

import React, { useEffect, useState, useRef, useCallback, useTransition, Suspense } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';

// MindMarket-style luxury cubic bezier curves
const curtainEase = [0.76, 0, 0.24, 1] as const;
const contentEase = [0.22, 1, 0.36, 1] as const;

/**
 * Inner component wrapped in Suspense to safely listen to both pathname and searchParams (query string)
 * without de-opting static site generation in Next.js App Router.
 */
function UrlTracker({ onUrlChange }: { onUrlChange: (url: string) => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams?.toString();
    const fullUrl = pathname + (search ? `?${search}` : '');
    onUrlChange(fullUrl);
  }, [pathname, searchParams, onUrlChange]);

  return null;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [currentUrlKey, setCurrentUrlKey] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  // When URL changes (route OR query param change), dismiss curtain smoothly
  const handleUrlChange = useCallback((newUrl: string) => {
    setCurrentUrlKey(newUrl);
    setIsNavigating(false);
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
  }, []);

  // Intercept internal link clicks for seamless MindMarket-style pre-navigation curtain sweep
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleLinkClick = (e: MouseEvent) => {
      // Find the nearest <a> tag
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
      const currentPathAndSearch = typeof window !== 'undefined'
        ? window.location.pathname + window.location.search
        : '';

      if (href === currentPathAndSearch) {
        return;
      }

      // Trigger the fluid white curtain lift
      e.preventDefault();
      setIsNavigating(true);

      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
      navTimeoutRef.current = setTimeout(() => {
        startTransition(() => {
          router.push(href);
        });
      }, 100);

      // Bulletproof safety fallback: curtain NEVER stays stuck for more than 450ms
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = setTimeout(() => {
        setIsNavigating(false);
      }, 450);
    };

    document.addEventListener('click', handleLinkClick, true);
    return () => {
      document.removeEventListener('click', handleLinkClick, true);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, [router, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <LazyMotion features={domAnimation}>
      {/* Safe URL & Query Listener */}
      <Suspense fallback={null}>
        <UrlTracker onUrlChange={handleUrlChange} />
      </Suspense>

      {/* 1. MindMarket Fluid White Curtain Overlay */}
      <AnimatePresence mode="wait">
        {isNavigating && (
          <m.div
            key="curtain-enter"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 0.26,
              ease: curtainEase,
            }}
            className="fixed inset-0 z-[9999] pointer-events-none bg-white flex flex-col items-center justify-center border-t-3 border-[#FCA311] shadow-[0_-10px_30px_rgba(20,33,61,0.08)]"
          >
            {/* Minimalist Watermark Insignia in Curtain Center */}
            <m.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center gap-3 select-none px-6"
            >
              {/* Ultra-crisp 2x resolution Cloudinary logo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://res.cloudinary.com/dhrigocvd/image/upload/w_400,c_limit,f_auto,q_auto/v1769401433/logo_Kampus_Filter_gync6j.webp"
                alt="Kampus Filter"
                width={200}
                height={56}
                className="h-11 sm:h-13 w-auto object-contain drop-shadow-sm"
              />
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-2 h-2 rounded-full bg-[#14213D] animate-bounce" />
                <span className="w-8 h-1.5 rounded-full bg-[#FCA311]" />
                <span className="w-2 h-2 rounded-full bg-[#14213D] animate-bounce [animation-delay:150ms]" />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* 2. Page Content Entrance Animation (Keyed by currentUrlKey) */}
      <m.div
        key={currentUrlKey}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: contentEase,
        }}
        className="flex-1 flex flex-col w-full"
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
