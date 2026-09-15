'use client';

import React from 'react';
import { RoiResults, formatInr } from './roiTypes';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Wallet,
  Building,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

interface RoiMetricCardsProps {
  results: RoiResults;
  totalTuitionLakhs: number;
  livingHostelLakhs: number;
  medianCtcLakhs: number;
}

export function RoiMetricCards({
  results,
  totalTuitionLakhs,
  livingHostelLakhs,
  medianCtcLakhs,
}: RoiMetricCardsProps) {
  const {
    paybackMonths,
    verdict,
    verdictTitle,
    verdictDescription,
    firstYearMonthlyInHand,
    firstYearMonthlySurplus,
    monthlyEmi,
    loanAmount,
    totalDegreeCost,
    fiveYearNetWealth,
  } = results;

  const getVerdictBadge = () => {
    switch (verdict) {
      case 'elite':
        return {
          pillBg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
          dot: 'bg-emerald-500',
          icon: Sparkles,
        };
      case 'healthy':
        return {
          pillBg: 'bg-blue-50 text-blue-700 border-blue-300',
          dot: 'bg-blue-500',
          icon: CheckCircle2,
        };
      case 'cautious':
        return {
          pillBg: 'bg-amber-50 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          icon: AlertTriangle,
        };
      case 'high_risk':
      default:
        return {
          pillBg: 'bg-rose-50 text-rose-700 border-rose-300',
          dot: 'bg-rose-500',
          icon: AlertTriangle,
        };
    }
  };

  const badge = getVerdictBadge();
  const BadgeIcon = badge.icon;

  return (
    <div className="space-y-4">
      {/* Executive Summary Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#14213D] text-white p-6 sm:p-7 shadow-lg border border-[#14213D]">
        {/* Subtle Background Glow */}
        <div
          className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#FCA311]/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${badge.pillBg}`}
            >
              <span className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`} />
              <BadgeIcon className="w-3.5 h-3.5" />
              <span>{verdictTitle}</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {paybackMonths <= 120 ? `${paybackMonths} Months` : '10+ Years'}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#FCA311]">
                ({(paybackMonths / 12).toFixed(1)} Yrs to Break-Even)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed font-normal">
              {verdictDescription}
            </p>
          </div>

          {/* Key Quick Stat Pill */}
          <div className="shrink-0 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center min-w-[170px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/70 block mb-1">
              5-Year Net Surplus
            </span>
            <span
              className={`font-serif text-2xl sm:text-3xl font-black block ${
                fiveYearNetWealth >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
              }`}
            >
              {formatInr(fiveYearNetWealth)}
            </span>
            <span className="text-[11px] font-medium text-white/80 block mt-1">
              {fiveYearNetWealth >= 0 ? 'Wealth accumulated' : 'Remaining deficit'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Financial Pillar Metric Cards in 2x2 Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Cost Outlay */}
        <div className="bg-white border border-[#14213D]/15 rounded-xl p-3.5 sm:p-4 shadow-sm hover:border-[#14213D]/40 transition-colors">
          <div className="flex items-center justify-between text-[#14213D]/70 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Degree Outlay</span>
            <Building className="w-4 h-4 text-[#FCA311]" />
          </div>
          <div className="font-serif text-xl sm:text-2xl font-black text-[#14213D]">
            {formatInr(totalDegreeCost)}
          </div>
          <p className="text-[11px] text-[#14213D]/60 mt-1">
            ₹{totalTuitionLakhs}L Tuition + ₹{livingHostelLakhs}L Living
          </p>
        </div>

        {/* In-Hand Monthly Take-Home */}
        <div className="bg-white border border-[#14213D]/15 rounded-xl p-3.5 sm:p-4 shadow-sm hover:border-[#14213D]/40 transition-colors">
          <div className="flex items-center justify-between text-[#14213D]/70 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Estimated Take-Home</span>
            <Wallet className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="font-serif text-xl sm:text-2xl font-black text-[#10B981]">
            {formatInr(firstYearMonthlyInHand)}
            <span className="text-xs font-normal text-[#14213D]/60 font-sans">/mo</span>
          </div>
          <p className="text-[11px] text-[#14213D]/60 mt-1">
            Net in-hand from ₹{medianCtcLakhs}L CTC (New Tax)
          </p>
        </div>

        {/* Monthly Education Loan EMI */}
        <div className="bg-white border border-[#14213D]/15 rounded-xl p-3.5 sm:p-4 shadow-sm hover:border-[#14213D]/40 transition-colors">
          <div className="flex items-center justify-between text-[#14213D]/70 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Monthly Loan EMI</span>
            <CreditCard className="w-4 h-4 text-[#FCA311]" />
          </div>
          <div className="font-serif text-xl sm:text-2xl font-black text-[#14213D]">
            {monthlyEmi > 0 ? (
              <>
                {formatInr(monthlyEmi)}
                <span className="text-xs font-normal text-[#14213D]/60 font-sans">/mo</span>
              </>
            ) : (
              <span className="text-[#10B981] text-lg font-black">₹0 (Self-Funded)</span>
            )}
          </div>
          <p className="text-[11px] text-[#14213D]/60 mt-1">
            {loanAmount > 0 ? `${formatInr(loanAmount)} financed` : 'Zero education debt'}
          </p>
        </div>

        {/* Monthly Free Cashflow Surplus */}
        <div className="bg-white border border-[#14213D]/15 rounded-xl p-3.5 sm:p-4 shadow-sm hover:border-[#14213D]/40 transition-colors">
          <div className="flex items-center justify-between text-[#14213D]/70 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Free Monthly Surplus</span>
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          </div>
          <div
            className={`font-serif text-xl sm:text-2xl font-black ${
              firstYearMonthlySurplus > 0 ? 'text-[#14213D]' : 'text-[#EF4444]'
            }`}
          >
            {formatInr(firstYearMonthlySurplus)}
            <span className="text-xs font-normal text-[#14213D]/60 font-sans">/mo</span>
          </div>
          <p className="text-[11px] text-[#14213D]/60 mt-1">
            {firstYearMonthlySurplus > 0 ? 'Surplus for investments' : 'Deficit! High debt burden'}
          </p>
        </div>
      </div>
    </div>
  );
}
