'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RoiResults, RoiInputs, formatInr } from './roiTypes';
import {
  Share2,
  Copy,
  Check,
  Compass,
  ArrowRight,
  Lightbulb,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

interface RoiDecisionBreakdownProps {
  results: RoiResults;
  inputs: RoiInputs;
}

export function RoiDecisionBreakdown({ results, inputs }: RoiDecisionBreakdownProps) {
  const [copied, setCopied] = useState(false);

  const { paybackYearsFormatted, totalDegreeCost } = results;

  const buildShareUrl = () => {
    if (typeof window === 'undefined') return 'https://kampusfilter.com/tools/roi-calculator';
    const baseUrl = `${window.location.origin}/tools/roi-calculator`;
    const params = new URLSearchParams({
      tuition: inputs.totalTuitionLakhs.toString(),
      living: inputs.livingHostelLakhs.toString(),
      ctc: inputs.medianCtcLakhs.toString(),
      years: inputs.degreeDurationYears.toString(),
      loan: inputs.loanFinancedPct.toString(),
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const handleCopyLink = () => {
    const url = buildShareUrl();
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const url = buildShareUrl();
    const text = encodeURIComponent(
      `📊 College Degree ROI Analysis for ${inputs.degreeName}:\n` +
        `• Total Outlay: ${formatInr(totalDegreeCost)}\n` +
        `• Median CTC: ₹${inputs.medianCtcLakhs} LPA\n` +
        `• Break-Even Payback: ${paybackYearsFormatted}\n` +
        `• Verdict: ${results.verdictTitle}\n\n` +
        `View the full 10-year wealth forecast here: ${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* 3 Golden Rules of Higher Ed ROI in India */}
      <div className="bg-white border border-[#14213D]/20 rounded-2xl p-5 sm:p-7 shadow-md">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#14213D]/10">
          <span className="p-1.5 rounded-lg bg-[#FCA311] text-[#14213D]">
            <Lightbulb className="w-4 h-4" />
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-black text-[#14213D]">
            3 Golden Rules of College Degree ROI in India
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#14213D]/15 space-y-2">
            <span className="text-[10px] font-black text-[#FCA311] bg-[#14213D] px-2 py-0.5 rounded uppercase tracking-wider inline-block">
              Rule 1: The 1:1 Debt Ratio
            </span>
            <h4 className="font-bold text-sm text-[#14213D]">
              Total Loan Must Not Exceed Starting CTC
            </h4>
            <p className="text-xs text-[#14213D]/80 leading-relaxed font-normal">
              If an institution requires ₹18 Lakhs in loan debt but offers an average starting CTC of
              ₹6 Lakhs (a 3:1 debt-to-income ratio), loan EMI will consume over 45% of your net
              in-hand pay, causing severe financial distress.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#14213D]/15 space-y-2">
            <span className="text-[10px] font-black text-[#FCA311] bg-[#14213D] px-2 py-0.5 rounded uppercase tracking-wider inline-block">
              Rule 2: CTC vs Take-Home Reality
            </span>
            <h4 className="font-bold text-sm text-[#14213D]">
              In-Hand Is ~25% to 30% Lower Than CTC
            </h4>
            <p className="text-xs text-[#14213D]/80 leading-relaxed font-normal">
              A ₹10 LPA CTC does NOT mean ₹83,000/mo. After employer PF, employee PF, professional
              tax, and income tax under Section 115BAC, real monthly in-hand is ~₹64,000–₹68,000.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#14213D]/15 space-y-2">
            <span className="text-[10px] font-black text-[#FCA311] bg-[#14213D] px-2 py-0.5 rounded uppercase tracking-wider inline-block">
              Rule 3: 36-Month Sweet Spot
            </span>
            <h4 className="font-bold text-sm text-[#14213D]">
              Aim to Clear Degree Debt Within 3 Years
            </h4>
            <p className="text-xs text-[#14213D]/80 leading-relaxed font-normal">
              Premier institutions (BITS, IITs, top private universities, top IIMs) break even
              within 12 to 36 months. Degrees requiring over 5 years to break even often suffer from
              inflated fee structures or weak placement pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Share Calculation & Better ROI Discovery CTA Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Share Analysis Card */}
        <div className="bg-[#14213D] text-white border border-[#14213D] rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#FCA311]">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Your Decision Analysis</span>
            </div>
            <h4 className="font-serif text-lg font-black text-white">
              Discuss This ROI with Parents or Mentors
            </h4>
            <p className="text-xs text-white/80 font-normal leading-relaxed">
              Share the exact financial parameters you calculated with 1 click on WhatsApp or copy
              the direct link.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] text-black font-black text-xs uppercase tracking-wider hover:bg-[#20ba59] transition-all cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Analysis Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Discovery & Better ROI Colleges Card */}
        <div className="bg-[#FCA311] text-[#14213D] border border-[#FCA311] rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#14213D] bg-white px-2 py-0.5 rounded border border-black/20">
              <Compass className="w-3.5 h-3.5 text-[#14213D]" />
              <span>Explore High-ROI Colleges</span>
            </div>
            <h4 className="font-serif text-lg font-black text-[#14213D]">
              Looking for Higher Placements in This Fee Range?
            </h4>
            <p className="text-xs text-[#14213D]/85 font-medium leading-relaxed">
              Browse all 94 topic clusters and verified campus guides to compare actual placement
              records, transparent fee structures, and scholarship criteria.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#14213D] text-white font-black text-xs uppercase tracking-wider hover:bg-black transition-all shadow-sm"
            >
              <span>Explore All Category Clusters</span>
              <ArrowRight className="w-4 h-4 text-[#FCA311]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
