'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { GraduationCap } from 'lucide-react';

const GlobalLeadCapture = dynamic(
  () => import('./GlobalLeadCapture').then((mod) => mod.GlobalLeadCapture),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 rounded-2xl border-2 border-[#14213d] bg-white text-center animate-pulse">
        <div className="h-6 w-48 bg-[#e5e5e5] rounded mx-auto mb-4" />
        <div className="h-4 w-64 bg-[#e5e5e5] rounded mx-auto" />
      </div>
    ),
  }
);

export function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-shortlist-modal', handleOpen);
    return () => window.removeEventListener('open-shortlist-modal', handleOpen);
  }, []);

  return (
    <>
      {/* Floating Action Trigger Button (Bottom Right) */}
      <div className="fixed bottom-4 right-3.5 sm:bottom-5 sm:right-5 z-40">
        <button
          suppressHydrationWarning
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-3 rounded-full bg-[#fca311] text-[#000000] font-black text-xs sm:text-sm uppercase tracking-wider border-2 sm:border-3 border-[#000000] shadow-[3px_3px_0_0_#000000] sm:shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#14213d] hover:bg-[#14213d] hover:text-white transition-all transform hover:-translate-y-0.5 cursor-pointer shrink-0"
          aria-label="Open College Shortlist Counselor"
        >
          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#000000] group-hover:text-[#fca311] transition-colors" />
          <span className="sm:hidden">Shortlist</span>
          <span className="hidden sm:inline">Get Free Shortlist</span>
          <span className="hidden sm:inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#000000] group-hover:bg-[#fca311] animate-pulse" />
        </button>
      </div>

      {/* Modal Backdrop & Popup */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <GlobalLeadCapture
              variant="card"
              title="2027 College Shortlist & Fee Audit"
              subtitle="Direct from Team Kampus Filter. Tell us your target degree and location to get transparent insights."
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
