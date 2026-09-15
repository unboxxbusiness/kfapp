'use client';

import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export function ServiceWorkerRegister() {
  const [isOffline, setIsOffline] = useState(false);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker on window load
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      const handleLoad = () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            // Check for worker updates periodically
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.info('[PWA] New version of Kampus Filter is available.');
                  }
                });
              }
            });
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration skipped:', err);
          });
      };

      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // 2. Track Online/Offline Status
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3000);
      return () => clearTimeout(timer);
    };

    setIsOffline(!navigator.onLine);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <>
      {/* Offline Toast Banner */}
      {isOffline && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#14213D] text-white border-2 border-[#FCA311] shadow-[4px_4px_0_0_#000000] text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-4 duration-300"
        >
          <WifiOff className="w-3.5 h-3.5 text-[#FCA311]" />
          <span>Offline Reading Mode Active — Cached Guides Available</span>
        </div>
      )}

      {/* Reconnected Toast Banner */}
      {showReconnected && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#14213D] text-[#FCA311] border-2 border-[#000000] shadow-[4px_4px_0_0_#000000] text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-4 duration-300"
        >
          <Wifi className="w-3.5 h-3.5 text-[#FCA311]" />
          <span>Connection Restored</span>
        </div>
      )}
    </>
  );
}
