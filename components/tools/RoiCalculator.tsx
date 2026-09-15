'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  RoiInputs,
  ROI_PRESETS,
  calculateRoi,
  formatInr,
} from './roiTypes';
import { RoiMetricCards } from './RoiMetricCards';
import { RoiBreakevenChart } from './RoiBreakevenChart';
import { RoiDecisionBreakdown } from './RoiDecisionBreakdown';
import {
  Sliders,
  Sparkles,
  RotateCcw,
  IndianRupee,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Building,
  TrendingUp,
  Info,
} from 'lucide-react';

export function RoiCalculator() {
  const defaultPreset = ROI_PRESETS[1]; // Top Private Uni (VIT / Manipal / Thapar)

  const [inputs, setInputs] = useState<RoiInputs>(defaultPreset.inputs);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(defaultPreset.id);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const confettiTriggeredRef = useRef(false);

  // Sync inputs from URL on initial mount only
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const tuition = params.get('tuition');
      const ctc = params.get('ctc');
      const living = params.get('living');
      const years = params.get('years');
      const loan = params.get('loan');

      if (tuition || ctc) {
        setInputs((prev) => ({
          ...prev,
          totalTuitionLakhs: tuition ? Math.max(1, parseFloat(tuition)) : prev.totalTuitionLakhs,
          medianCtcLakhs: ctc ? Math.max(1, parseFloat(ctc)) : prev.medianCtcLakhs,
          livingHostelLakhs: living ? Math.max(0, parseFloat(living)) : prev.livingHostelLakhs,
          degreeDurationYears: years ? parseInt(years, 10) : prev.degreeDurationYears,
          loanFinancedPct: loan ? parseFloat(loan) : prev.loanFinancedPct,
        }));
        setSelectedPresetId('custom');
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  // Calculate ROI Results
  const results = useMemo(() => calculateRoi(inputs), [inputs]);

  // Subtle Celebratory Confetti on Elite ROI
  useEffect(() => {
    if (results.verdict === 'elite' && results.paybackMonths <= 20 && !confettiTriggeredRef.current) {
      confettiTriggeredRef.current = true;
      try {
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.8 },
          colors: ['#FCA311', '#10B981', '#14213D'],
        });
      } catch {
        // Safe fallback if confetti fails
      }
    }
    if (results.verdict !== 'elite') {
      confettiTriggeredRef.current = false;
    }
  }, [results.verdict, results.paybackMonths]);

  const handlePresetSelect = (preset: typeof ROI_PRESETS[0]) => {
    setInputs(preset.inputs);
    setSelectedPresetId(preset.id);
  };

  const handleInputChange = <K extends keyof RoiInputs>(key: K, val: RoiInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
    setSelectedPresetId('custom');
  };

  const handleReset = () => {
    setInputs(defaultPreset.inputs);
    setSelectedPresetId(defaultPreset.id);
  };

  const totalInvestmentLakhs = (inputs.totalTuitionLakhs + inputs.livingHostelLakhs).toFixed(1);

  return (
    <div className="space-y-8">
      {/* 1. Sleek Preset Benchmarks Segmented Bar */}
      <div className="bg-white border border-[#14213D]/15 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-[#14213D] text-[#FCA311]">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-[#14213D]">
              1-Click Verified Campus Benchmarks
            </span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-bold text-[#14213D]/60 hover:text-[#14213D] inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {ROI_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className={`flex flex-col text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#14213D] text-white border-[#14213D] shadow-md ring-2 ring-[#FCA311]/50'
                    : 'bg-[#F8FAFC] text-[#14213D] border-[#14213D]/15 hover:border-[#14213D]/40 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-base">{preset.emoji}</span>
                  <span
                    className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                      isSelected
                        ? 'bg-[#FCA311] text-[#14213D]'
                        : 'bg-white text-[#14213D]/70 border border-[#14213D]/20'
                    }`}
                  >
                    {preset.badge}
                  </span>
                </div>
                <span className="font-bold text-xs tracking-tight truncate">
                  {preset.name}
                </span>
                <span
                  className={`text-[10px] truncate ${
                    isSelected ? 'text-white/70' : 'text-[#14213D]/60'
                  }`}
                >
                  {preset.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Two-Column Professional Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Financial Assumptions & Interactive Sliders (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-[#14213D]/20 rounded-2xl p-5 sm:p-6 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#14213D]/10">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#14213D] text-[#FCA311]">
                <Sliders className="w-4 h-4" />
              </span>
              <h3 className="font-serif text-lg font-black text-[#14213D]">
                Financial Assumptions
              </h3>
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#047857] border border-[#10B981]/30">
              Live Calculator
            </span>
          </div>

          {/* A. Degree Duration Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#14213D]/80 flex items-center justify-between">
              <span>Degree Duration</span>
              <span className="text-[#14213D] font-black">{inputs.degreeDurationYears} Years</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-[#F1F5F9] border border-[#14213D]/10">
              {[
                { yr: 2, label: '2Y MBA' },
                { yr: 3, label: '3Y BBA/BSc' },
                { yr: 4, label: '4Y B.Tech' },
                { yr: 5, label: '5Y Law/Med' },
              ].map((item) => (
                <button
                  key={item.yr}
                  type="button"
                  onClick={() => handleInputChange('degreeDurationYears', item.yr)}
                  className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                    inputs.degreeDurationYears === item.yr
                      ? 'bg-white text-[#14213D] shadow-sm font-black'
                      : 'text-[#14213D]/60 hover:text-[#14213D]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* B. Total Tuition Fee */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#14213D]">
              <span className="uppercase tracking-wider text-[#14213D]/80">
                Total Tuition Fees (Full Degree)
              </span>
              <div className="flex items-center gap-1 bg-[#F8FAFC] px-2 py-1 rounded-lg border border-[#14213D]/20">
                <span className="font-serif font-black text-sm text-[#14213D]">
                  ₹{inputs.totalTuitionLakhs}
                </span>
                <span className="text-[10px] text-[#14213D]/60 font-semibold">Lakhs</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="0.5"
              value={inputs.totalTuitionLakhs}
              onChange={(e) =>
                handleInputChange('totalTuitionLakhs', parseFloat(e.target.value))
              }
              className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#14213D]"
            />
            <div className="flex justify-between text-[10px] text-[#14213D]/50 font-medium">
              <span>₹1 Lakh (Govt/IIT)</span>
              <span>₹20 Lakhs</span>
              <span>₹50 Lakhs (Private)</span>
            </div>
          </div>

          {/* C. Hostel & Living Outlay */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#14213D]">
              <span className="uppercase tracking-wider text-[#14213D]/80">
                Hostel &amp; Living Expenses
              </span>
              <div className="flex items-center gap-1 bg-[#F8FAFC] px-2 py-1 rounded-lg border border-[#14213D]/20">
                <span className="font-serif font-black text-sm text-[#14213D]">
                  ₹{inputs.livingHostelLakhs}
                </span>
                <span className="text-[10px] text-[#14213D]/60 font-semibold">Lakhs</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={inputs.livingHostelLakhs}
              onChange={(e) =>
                handleInputChange('livingHostelLakhs', parseFloat(e.target.value))
              }
              className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#14213D]"
            />
            <div className="flex justify-between text-[10px] text-[#14213D]/50 font-medium">
              <span>₹0 (Day Scholar)</span>
              <span>₹5 Lakhs</span>
              <span>₹15 Lakhs (Metro)</span>
            </div>
          </div>

          {/* Total Outlay Sum Pill */}
          <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F1F5F9] border border-[#14213D]/10">
            <span className="text-xs font-bold text-[#14213D]/70">
              Total Degree Investment Outlay:
            </span>
            <span className="font-serif text-sm font-black text-[#14213D]">
              ₹{totalInvestmentLakhs} Lakhs
            </span>
          </div>

          {/* D. Audited Median Starting Placement CTC */}
          <div className="space-y-2 p-3.5 rounded-xl bg-[#FCA311]/10 border border-[#FCA311]/50">
            <div className="flex items-center justify-between text-xs font-bold text-[#14213D]">
              <span className="uppercase tracking-wider flex items-center gap-1">
                <span>Audited Median Starting CTC</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FCA311] text-[#14213D] font-black">
                  Annual
                </span>
              </span>
              <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-[#14213D]/30 shadow-xs">
                <span className="font-serif font-black text-base text-[#14213D]">
                  ₹{inputs.medianCtcLakhs}
                </span>
                <span className="text-[10px] text-[#14213D]/70 font-bold">LPA</span>
              </div>
            </div>
            <input
              type="range"
              min="2"
              max="45"
              step="0.5"
              value={inputs.medianCtcLakhs}
              onChange={(e) =>
                handleInputChange('medianCtcLakhs', parseFloat(e.target.value))
              }
              className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-[#14213D]"
            />
            <div className="flex justify-between text-[10px] text-[#14213D]/70 font-medium">
              <span>₹2 LPA</span>
              <span>₹15 LPA</span>
              <span>₹45 LPA (Tier-1 Core)</span>
            </div>
            <div className="text-[11px] text-[#14213D]/80 font-medium pt-1">
              💡 Estimated in-hand take-home: <strong className="text-[#10B981]">{formatInr(results.firstYearMonthlyInHand)}/mo</strong> after Indian income tax &amp; PF.
            </div>
          </div>

          {/* E. Education Loan Strategy */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#14213D]">
              <span className="uppercase tracking-wider text-[#14213D]/80">
                Education Loan Financed
              </span>
              <div className="flex items-center gap-1 bg-[#F8FAFC] px-2 py-1 rounded-lg border border-[#14213D]/20">
                <span className="font-serif font-black text-sm text-[#14213D]">
                  {inputs.loanFinancedPct}%
                </span>
                <span className="text-[10px] text-[#14213D]/60 font-semibold">
                  ({formatInr(results.loanAmount)})
                </span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={inputs.loanFinancedPct}
              onChange={(e) =>
                handleInputChange('loanFinancedPct', parseFloat(e.target.value))
              }
              className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#14213D]"
            />
            <div className="flex justify-between text-[10px] text-[#14213D]/50 font-medium">
              <span>0% (Self-Funded)</span>
              <span>50%</span>
              <span>100% (Full Loan)</span>
            </div>
          </div>

          {/* F. Advanced Loan & Living Assumptions (Collapsible) */}
          <div className="pt-2 border-t border-[#14213D]/10">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full py-2 px-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#14213D] text-xs font-bold uppercase tracking-wider border border-[#14213D]/15 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>{showAdvanced ? 'Hide Advanced Options' : 'Configure Interest Rate & Hike %'}</span>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4 text-[#14213D]/60" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#14213D]/60" />
              )}
            </button>

            {showAdvanced && (
              <div className="mt-3 space-y-3 p-3.5 bg-[#F8FAFC] rounded-xl border border-[#14213D]/15 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1 text-[#14213D]">
                    <span>Education Loan Interest Rate (% p.a.)</span>
                    <span className="font-black">{inputs.loanInterestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="7.5"
                    max="14.0"
                    step="0.25"
                    value={inputs.loanInterestRate}
                    onChange={(e) =>
                      handleInputChange('loanInterestRate', parseFloat(e.target.value))
                    }
                    className="w-full h-1.5 bg-[#CBD5E1] rounded appearance-none cursor-pointer accent-[#14213D]"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1 text-[#14213D]">
                    <span>Expected Annual CTC Hike (%)</span>
                    <span className="font-black">{inputs.annualHikePct}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="1"
                    value={inputs.annualHikePct}
                    onChange={(e) =>
                      handleInputChange('annualHikePct', parseFloat(e.target.value))
                    }
                    className="w-full h-1.5 bg-[#CBD5E1] rounded appearance-none cursor-pointer accent-[#14213D]"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1 text-[#14213D]">
                    <span>Post-Grad Monthly Living Expense</span>
                    <span className="font-black">
                      ₹{inputs.postGradMonthlyExpense.toLocaleString('en-IN')}/mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="12000"
                    max="60000"
                    step="1000"
                    value={inputs.postGradMonthlyExpense}
                    onChange={(e) =>
                      handleInputChange('postGradMonthlyExpense', parseInt(e.target.value, 10))
                    }
                    className="w-full h-1.5 bg-[#CBD5E1] rounded appearance-none cursor-pointer accent-[#14213D]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Key Metric Scorecard & 10-Year Interactive Wealth Graph (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <RoiMetricCards
            results={results}
            totalTuitionLakhs={inputs.totalTuitionLakhs}
            livingHostelLakhs={inputs.livingHostelLakhs}
            medianCtcLakhs={inputs.medianCtcLakhs}
          />

          <RoiBreakevenChart
            results={results}
            degreeName={inputs.degreeName}
          />
        </div>
      </div>

      {/* 3. Decision Guidance, Rules of Thumb, and Sharing */}
      <RoiDecisionBreakdown
        results={results}
        inputs={inputs}
      />
    </div>
  );
}
