'use client';

import React, { useState } from 'react';
import { RoiResults, formatInr } from './roiTypes';
import { TrendingUp, Sparkles, Clock, ArrowUpRight } from 'lucide-react';

interface RoiBreakevenChartProps {
  results: RoiResults;
  degreeName: string;
}

export function RoiBreakevenChart({ results, degreeName }: RoiBreakevenChartProps) {
  const [selectedMilestoneYear, setSelectedMilestoneYear] = useState<number>(5);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const { projections, paybackMonths, totalDegreeCost } = results;

  // Chart Dimensions
  const width = 720;
  const height = 310;
  const padding = { top: 35, right: 35, bottom: 45, left: 75 };

  // Data points: Year 0 (starts at -totalDegreeCost) followed by Year 1 to 10
  const dataPoints = [
    {
      year: 0,
      label: 'Grad',
      wealth: -Math.round(totalDegreeCost),
      noDegree: 0,
      ctc: 0,
      inHand: 0,
    },
    ...projections.map((p) => ({
      year: p.year,
      label: `Yr ${p.year}`,
      wealth: p.cumulativeNetWealth,
      noDegree: p.cumulativeWithoutDegree,
      ctc: p.annualCtc,
      inHand: p.annualInHand,
    })),
  ];

  // Min and Max values for scale
  const minVal = Math.min(...dataPoints.map((d) => d.wealth), -500000);
  const maxVal = Math.max(...dataPoints.map((d) => d.wealth), 2000000);
  const valRange = maxVal - minVal || 1;

  const getX = (year: number) => {
    return padding.left + (year / 10) * (width - padding.left - padding.right);
  };

  const getY = (val: number) => {
    const norm = (val - minVal) / valRange;
    return height - padding.bottom - norm * (height - padding.top - padding.bottom);
  };

  const zeroY = getY(0);

  // Generate smooth cubic bezier SVG path
  const generateSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const wealthPts = dataPoints.map((pt) => ({ x: getX(pt.year), y: getY(pt.wealth) }));
  const smoothWealthPath = generateSmoothPath(wealthPts);

  // Generate area under curve
  const areaD = `${smoothWealthPath} L ${getX(10)} ${zeroY} L ${getX(0)} ${zeroY} Z`;

  // Breakeven coordinates
  const breakevenYearFraction = Math.min(10, Math.max(0, paybackMonths / 12));
  const breakevenX = getX(breakevenYearFraction);
  const breakevenY = zeroY;

  // Selected milestone projection data
  const selectedProj =
    selectedMilestoneYear === 0
      ? null
      : projections.find((p) => p.year === selectedMilestoneYear) || projections[4];

  return (
    <div className="bg-white border border-[#14213D]/20 rounded-2xl p-4 sm:p-6 shadow-md transition-all">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#14213D]/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#14213D] text-[#FCA311]">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-black text-[#14213D]">
              10-Year Career Wealth &amp; Break-Even Curve
            </h3>
          </div>
          <p className="text-xs text-[#14213D]/70 font-medium">
            Cumulative net surplus after paying college debt, income tax, and living expenses.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-bold shrink-0">
          <div className="flex items-center gap-1.5 text-[#14213D]">
            <span className="w-3 h-1.5 rounded-full bg-[#10B981]" />
            <span>Net Career Wealth</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#14213D]/50">
            <span className="w-3 h-1.5 rounded-full bg-slate-300" />
            <span>₹0 Debt Free Baseline</span>
          </div>
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[560px] select-none font-sans"
        >
          <defs>
            <linearGradient id="wealthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="negativeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + ratio * (height - padding.top - padding.bottom);
            return (
              <line
                key={`grid-${ratio}`}
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Zero Breakeven Horizontal Line */}
          <line
            x1={padding.left}
            y1={zeroY}
            x2={width - padding.right}
            y2={zeroY}
            stroke="#14213D"
            strokeWidth="1.5"
          />
          <text
            x={padding.left - 8}
            y={zeroY + 4}
            textAnchor="end"
            className="text-[10px] font-black fill-[#14213D]"
          >
            ₹0 (Break-Even)
          </text>

          {/* Max Value Label */}
          <text
            x={padding.left - 8}
            y={padding.top + 4}
            textAnchor="end"
            className="text-[10px] font-bold fill-[#10B981]"
          >
            {formatInr(maxVal)}
          </text>

          {/* Min Value Label */}
          <text
            x={padding.left - 8}
            y={height - padding.bottom}
            textAnchor="end"
            className="text-[10px] font-bold fill-[#EF4444]"
          >
            {formatInr(minVal)}
          </text>

          {/* Shaded Area under Curve */}
          <path d={areaD} fill="url(#wealthGradient)" />

          {/* Smooth Net Wealth Trajectory Curve */}
          <path
            d={smoothWealthPath}
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Breakeven Marker & Badge */}
          {paybackMonths <= 120 && (
            <g>
              <line
                x1={breakevenX}
                y1={padding.top}
                x2={breakevenX}
                y2={height - padding.bottom}
                stroke="#10B981"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle
                cx={breakevenX}
                cy={breakevenY}
                r="6.5"
                fill="#10B981"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
              <rect
                x={Math.min(breakevenX - 60, width - padding.right - 125)}
                y={Math.max(breakevenY - 34, padding.top + 5)}
                width="120"
                height="24"
                rx="6"
                fill="#14213D"
                stroke="#FCA311"
                strokeWidth="1.5"
              />
              <text
                x={Math.min(breakevenX, width - padding.right - 65)}
                y={Math.max(breakevenY - 18, padding.top + 21)}
                textAnchor="middle"
                className="text-[10px] font-black fill-white tracking-tight"
              >
                ★ Break-Even @ Mo {paybackMonths}
              </text>
            </g>
          )}

          {/* Interactive Year Dots */}
          {dataPoints.map((pt) => {
            const cx = getX(pt.year);
            const cy = getY(pt.wealth);
            const isHovered = hoveredYear === pt.year;
            const isSelected = selectedMilestoneYear === pt.year;

            return (
              <g
                key={`dot-${pt.year}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredYear(pt.year)}
                onMouseLeave={() => setHoveredYear(null)}
                onClick={() => pt.year > 0 && setSelectedMilestoneYear(pt.year)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered || isSelected ? 7 : 4.5}
                  fill={pt.wealth >= 0 ? '#10B981' : '#EF4444'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all"
                />

                {/* X Axis Labels */}
                <text
                  x={cx}
                  y={height - padding.bottom + 18}
                  textAnchor="middle"
                  className={`text-[11px] font-bold ${
                    isSelected
                      ? 'fill-[#14213D] font-black underline'
                      : isHovered
                      ? 'fill-[#14213D] font-black'
                      : 'fill-[#14213D]/60'
                  }`}
                >
                  {pt.label}
                </text>

                {/* Tooltip on Hover */}
                {isHovered && (
                  <g>
                    <rect
                      x={Math.min(Math.max(cx - 75, padding.left), width - padding.right - 150)}
                      y={Math.max(cy - 52, padding.top)}
                      width="150"
                      height="44"
                      rx="8"
                      fill="#14213D"
                      stroke="#000000"
                      strokeWidth="1.5"
                    />
                    <text
                      x={Math.min(Math.max(cx, padding.left + 75), width - padding.right - 75)}
                      y={Math.max(cy - 33, padding.top + 18)}
                      textAnchor="middle"
                      className="text-[10px] font-bold fill-[#FCA311]"
                    >
                      {pt.year === 0 ? 'Degree Initial Cost' : `Year ${pt.year} Projection`}
                    </text>
                    <text
                      x={Math.min(Math.max(cx, padding.left + 75), width - padding.right - 75)}
                      y={Math.max(cy - 16, padding.top + 35)}
                      textAnchor="middle"
                      className="text-[12px] font-black fill-white"
                    >
                      Net Wealth: {formatInr(pt.wealth)}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Milestone Pills & Selected Year Inspector */}
      <div className="mt-4 pt-4 border-t border-[#14213D]/10 space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-bold text-[#14213D]/70">
            Inspect Milestone Year:
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 3, 5, 10].map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedMilestoneYear(yr)}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  selectedMilestoneYear === yr
                    ? 'bg-[#14213D] text-[#FCA311] shadow-sm'
                    : 'bg-[#F1F5F9] text-[#14213D] hover:bg-[#E2E8F0]'
                }`}
              >
                Year {yr}
              </button>
            ))}
          </div>
        </div>

        {selectedProj && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-[#F8FAFC] border border-[#14213D]/15">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#14213D]/60 block">
                Year {selectedProj.year} CTC
              </span>
              <span className="font-serif text-sm sm:text-base font-black text-[#14213D]">
                {formatInr(selectedProj.annualCtc)}/yr
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#14213D]/60 block">
                Net Take-Home
              </span>
              <span className="font-serif text-sm sm:text-base font-black text-[#10B981]">
                {formatInr(selectedProj.annualInHand)}/yr
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#14213D]/60 block">
                Cumulative Wealth
              </span>
              <span
                className={`font-serif text-sm sm:text-base font-black ${
                  selectedProj.cumulativeNetWealth >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                }`}
              >
                {formatInr(selectedProj.cumulativeNetWealth)}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#14213D]/60 block">
                Net Wealth Multiple
              </span>
              <span className="font-serif text-sm sm:text-base font-black text-[#14213D]">
                {totalDegreeCost > 0
                  ? `${(selectedProj.cumulativeNetWealth / totalDegreeCost).toFixed(1)}x Cost`
                  : 'N/A'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
