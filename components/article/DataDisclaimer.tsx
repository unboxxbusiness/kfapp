import React from 'react';
import { Info, ShieldAlert } from 'lucide-react';

export function DataDisclaimer() {
  return (
    <section className="my-10 p-5 sm:p-6 rounded-2xl bg-[#e5e5e5]/25 border-2 border-[#14213d] shadow-[3px_3px_0_0_#14213d] text-xs text-[#14213d]/80 space-y-2">
      <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-[#14213d]">
        <Info className="w-4 h-4 text-[#fca311]" />
        <span>Institutional Data &amp; Fee Transparency Disclaimer</span>
      </div>

      <p className="leading-relaxed font-normal">
        Fee structures, cutoff percentiles, and placement statistics published on{' '}
        <strong className="text-[#14213d]">Kampus Filter</strong> are compiled
        from official university prospectuses, NIRF statutory filings,
        UGC/AICTE public notifications, and institutional disclosures. All
        figures represent comparative historical benchmarks and are subject to
        periodic revisions by respective university governing bodies.
      </p>

      <p className="leading-relaxed font-normal">
        Prospective students and guardians are advised to verify current academic
        session fees, seat matrices, and admission deadlines directly with the
        official university admissions office prior to financial commitments.
        Kampus Filter is an independent higher education research directory and
        does not solicit donations or represent university administration.
      </p>
    </section>
  );
}
