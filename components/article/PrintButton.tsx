'use client';

import React from 'react';
import { Printer } from 'lucide-react';

export function PrintButton() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={handlePrint}
      aria-label="Print or save college decision guide as PDF"
      className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCA311] text-[#14213D] hover:text-[#000000] border-2 border-[#14213D] shadow-[2px_2px_0_0_#14213D] hover:shadow-[3px_3px_0_0_#000000] text-xs font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer no-print"
      title="Print or export fee audit to PDF"
    >
      <Printer className="w-3.5 h-3.5 text-[#14213D] group-hover:text-[#000000] transition-colors" />
      <span>Print / PDF</span>
    </button>
  );
}
