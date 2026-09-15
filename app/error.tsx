'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Application Error Boundary caught error]:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-white">
      <div className="max-w-md w-full p-8 rounded-3xl border-3 border-[#14213D] bg-white shadow-[8px_8px_0_0_#14213D] text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#FCA311] border-2 border-[#14213D] flex items-center justify-center mx-auto shadow-[3px_3px_0_0_#14213D]">
          <AlertCircle className="w-8 h-8 text-[#14213D]" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#14213D]/70 bg-[#e5e5e5] px-3 py-1 rounded-full border border-[#14213D]">
            System Notice
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#14213D]">
            Something Went Wrong
          </h2>
          <p className="text-xs sm:text-sm text-[#14213D]/80 font-medium leading-relaxed">
            We encountered an unexpected error loading this guide. Please try reloading or head back to the directory.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FCA311] text-[#000000] font-black text-xs uppercase tracking-wider border-2 border-[#000000] shadow-[3px_3px_0_0_#000000] hover:bg-[#14213D] hover:text-white transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#14213D] text-white font-black text-xs uppercase tracking-wider border-2 border-[#000000] shadow-[3px_3px_0_0_#000000] hover:bg-[#000000] transition-all"
          >
            <Home className="w-3.5 h-3.5 text-[#FCA311]" />
            <span>Back Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
