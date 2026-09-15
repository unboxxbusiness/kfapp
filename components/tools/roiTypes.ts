export interface RoiInputs {
  degreeName: string;
  degreeDurationYears: number;
  totalTuitionLakhs: number;
  livingHostelLakhs: number;
  medianCtcLakhs: number;
  loanFinancedPct: number; // 0 to 100
  loanInterestRate: number; // e.g. 9.5%
  loanTenureYears: number; // e.g. 7 years
  postGradMonthlyExpense: number; // e.g. ₹25,000
  annualHikePct: number; // e.g. 10%
}

export interface YearProjection {
  year: number;
  ageOffset: number;
  annualCtc: number;
  annualInHand: number;
  annualSavings: number;
  cumulativeNetWealth: number;
  cumulativeWithoutDegree: number;
}

export interface RoiResults {
  totalDegreeCost: number; // in Rupees
  selfFundedAmount: number;
  loanAmount: number;
  monthlyEmi: number;
  totalLoanRepayment: number;
  firstYearMonthlyInHand: number;
  firstYearMonthlySurplus: number;
  paybackMonths: number;
  paybackYearsFormatted: string;
  verdict: 'elite' | 'healthy' | 'cautious' | 'high_risk';
  verdictTitle: string;
  verdictDescription: string;
  verdictColor: string;
  fiveYearNetWealth: number;
  tenYearNetWealth: number;
  tenYearRoiPercentage: number;
  projections: YearProjection[];
}

export interface RoiPreset {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  emoji: string;
  inputs: RoiInputs;
}

export const ROI_PRESETS: RoiPreset[] = [
  {
    id: 'tier1_btech',
    name: 'Tier-1 IIT / BITS',
    subtitle: 'B.Tech CSE / Core',
    badge: 'Govt / Elite',
    emoji: '🚀',
    inputs: {
      degreeName: 'B.Tech CSE (Tier-1)',
      degreeDurationYears: 4,
      totalTuitionLakhs: 10,
      livingHostelLakhs: 3.5,
      medianCtcLakhs: 21,
      loanFinancedPct: 40,
      loanInterestRate: 8.5,
      loanTenureYears: 5,
      postGradMonthlyExpense: 35000,
      annualHikePct: 12,
    },
  },
  {
    id: 'top_private_btech',
    name: 'Top Private Uni',
    subtitle: 'VIT / Manipal / Thapar',
    badge: 'Popular Choice',
    emoji: '🏛️',
    inputs: {
      degreeName: 'B.Tech CSE (Top Private)',
      degreeDurationYears: 4,
      totalTuitionLakhs: 16,
      livingHostelLakhs: 4.5,
      medianCtcLakhs: 9.5,
      loanFinancedPct: 60,
      loanInterestRate: 9.5,
      loanTenureYears: 7,
      postGradMonthlyExpense: 28000,
      annualHikePct: 10,
    },
  },
  {
    id: 'tier1_mba',
    name: 'Tier-1 MBA',
    subtitle: 'IIM / XLRI / SPJIMR',
    badge: 'Fastest Payback',
    emoji: '💼',
    inputs: {
      degreeName: 'MBA / PGDM (Tier-1)',
      degreeDurationYears: 2,
      totalTuitionLakhs: 24,
      livingHostelLakhs: 4,
      medianCtcLakhs: 28,
      loanFinancedPct: 80,
      loanInterestRate: 8.75,
      loanTenureYears: 7,
      postGradMonthlyExpense: 45000,
      annualHikePct: 12,
    },
  },
  {
    id: 'tier3_private_btech',
    name: 'Tier-3 Engineering',
    subtitle: 'Regional Private College',
    badge: 'Caution Zone',
    emoji: '🏫',
    inputs: {
      degreeName: 'B.Tech (Tier-3 Private)',
      degreeDurationYears: 4,
      totalTuitionLakhs: 9,
      livingHostelLakhs: 3.5,
      medianCtcLakhs: 3.8,
      loanFinancedPct: 50,
      loanInterestRate: 10.5,
      loanTenureYears: 7,
      postGradMonthlyExpense: 22000,
      annualHikePct: 8,
    },
  },
  {
    id: 'private_mbbs',
    name: 'Private Medical',
    subtitle: 'MBBS (Mgmt Quota)',
    badge: 'Longest Payback',
    emoji: '🩺',
    inputs: {
      degreeName: 'MBBS (Private College)',
      degreeDurationYears: 5.5,
      totalTuitionLakhs: 65,
      livingHostelLakhs: 8,
      medianCtcLakhs: 9,
      loanFinancedPct: 50,
      loanInterestRate: 10.0,
      loanTenureYears: 10,
      postGradMonthlyExpense: 30000,
      annualHikePct: 10,
    },
  },
];

/**
 * Calculates Indian New Tax Regime Annual Income Tax
 */
export function calculateAnnualIncomeTax(grossAnnual: number): number {
  // Standard deduction under Sec 115BAC
  const standardDeduction = 75000;
  const taxable = Math.max(0, grossAnnual - standardDeduction);

  // If taxable income <= 7,00,000, rebate under 87A makes tax zero
  if (taxable <= 700000) {
    return 0;
  }

  let tax = 0;
  // 0 - 3L: 0%
  // 3L - 7L: 5% (400,000 * 0.05 = 20,000)
  if (taxable > 300000) {
    tax += Math.min(taxable - 300000, 400000) * 0.05;
  }
  // 7L - 10L: 10% (300,000 * 0.10 = 30,000)
  if (taxable > 700000) {
    tax += Math.min(taxable - 700000, 300000) * 0.10;
  }
  // 10L - 12L: 15% (200,000 * 0.15 = 30,000)
  if (taxable > 1000000) {
    tax += Math.min(taxable - 1000000, 200000) * 0.15;
  }
  // 12L - 15L: 20% (300,000 * 0.20 = 60,000)
  if (taxable > 1200000) {
    tax += Math.min(taxable - 1200000, 300000) * 0.20;
  }
  // Above 15L: 30%
  if (taxable > 1500000) {
    tax += (taxable - 1500000) * 0.30;
  }

  // 4% Health & Education Cess
  return Math.round(tax * 1.04);
}

/**
 * Calculates realistic annual in-hand take-home salary from CTC
 * CTC typically includes ~10% for employer/employee PF, gratuity, insurance
 */
export function calculateAnnualInHand(ctcRupees: number): number {
  if (ctcRupees <= 0) return 0;
  // Estimate Gross taxable components (~90% of CTC)
  const grossSalary = ctcRupees * 0.90;
  const tax = calculateAnnualIncomeTax(grossSalary);
  // In-hand after tax and employee deductions
  return Math.max(0, grossSalary - tax);
}

/**
 * Monthly EMI calculation
 */
export function calculateMonthlyEmi(
  principal: number,
  annualInterestRate: number,
  tenureYears: number
): number {
  if (principal <= 0 || tenureYears <= 0) return 0;
  if (annualInterestRate <= 0) return principal / (tenureYears * 12);

  const r = annualInterestRate / (12 * 100);
  const n = tenureYears * 12;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
}

/**
 * Comprehensive ROI & Payback Calculation Engine
 */
export function calculateRoi(inputs: RoiInputs): RoiResults {
  const totalCostRupees =
    (inputs.totalTuitionLakhs + inputs.livingHostelLakhs) * 100000;
  const loanAmount = Math.round(
    totalCostRupees * (inputs.loanFinancedPct / 100)
  );
  const selfFundedAmount = totalCostRupees - loanAmount;

  const monthlyEmi = calculateMonthlyEmi(
    loanAmount,
    inputs.loanInterestRate,
    inputs.loanTenureYears
  );
  const totalLoanRepayment = monthlyEmi * inputs.loanTenureYears * 12;

  const initialCtc = inputs.medianCtcLakhs * 100000;
  const firstYearInHand = calculateAnnualInHand(initialCtc);
  const firstYearMonthlyInHand = Math.round(firstYearInHand / 12);
  const firstYearMonthlySurplus = Math.round(
    firstYearMonthlyInHand - inputs.postGradMonthlyExpense - monthlyEmi
  );

  // Month-by-month simulation up to 120 months (10 years)
  let cumulativeSavings = 0;
  let paybackMonthFound = -1;
  const hikeRate = inputs.annualHikePct / 100;
  const livingCostHike = 0.05; // 5% inflation on living costs

  const projections: YearProjection[] = [];
  let runningCtc = initialCtc;
  let runningMonthlyExpense = inputs.postGradMonthlyExpense;

  // Baseline without degree: assumed average entry-level wage (e.g. ₹2.2L CTC growing at 5%)
  let cumulativeNoDegree = 0;
  let noDegreeCtc = 220000;

  for (let year = 1; year <= 10; year++) {
    const yearInHand = calculateAnnualInHand(runningCtc);
    const monthlyInHand = yearInHand / 12;

    let yearSavings = 0;
    for (let m = 1; m <= 12; m++) {
      const currentMonthIndex = (year - 1) * 12 + m;
      // EMI is paid only during loan tenure
      const activeEmi =
        currentMonthIndex <= inputs.loanTenureYears * 12 ? monthlyEmi : 0;
      const monthSurplus = monthlyInHand - runningMonthlyExpense - activeEmi;

      yearSavings += monthSurplus;
      cumulativeSavings += monthSurplus;

      // Breakeven check: cumulative surplus offsets self-funded initial investment + any initial capital
      if (paybackMonthFound === -1 && cumulativeSavings >= selfFundedAmount) {
        paybackMonthFound = currentMonthIndex;
      }
    }

    // Baseline calculation without degree
    const noDegreeInHand = calculateAnnualInHand(noDegreeCtc);
    const noDegreeSavings = Math.max(0, noDegreeInHand - (runningMonthlyExpense * 0.7 * 12));
    cumulativeNoDegree += noDegreeSavings;

    // Cumulative net wealth = Cumulative savings minus initial investment
    const netWealthAtYear = cumulativeSavings - selfFundedAmount;

    projections.push({
      year,
      ageOffset: Math.round((inputs.degreeDurationYears || 4) + year),
      annualCtc: Math.round(runningCtc),
      annualInHand: Math.round(yearInHand),
      annualSavings: Math.round(yearSavings),
      cumulativeNetWealth: Math.round(netWealthAtYear),
      cumulativeWithoutDegree: Math.round(cumulativeNoDegree),
    });

    runningCtc = runningCtc * (1 + hikeRate);
    runningMonthlyExpense = runningMonthlyExpense * (1 + livingCostHike);
    noDegreeCtc = noDegreeCtc * 1.05;
  }

  const paybackMonths =
    paybackMonthFound > 0 ? paybackMonthFound : 120; // Capped at 10+ years
  const paybackYears = (paybackMonths / 12).toFixed(1);
  const paybackYearsFormatted =
    paybackMonthFound > 0
      ? `${paybackMonths} Months (${paybackYears} Years)`
      : '> 10 Years (Negative / High Risk)';

  // Determine Verdict
  let verdict: 'elite' | 'healthy' | 'cautious' | 'high_risk' = 'healthy';
  let verdictTitle = 'Healthy & Balanced ROI';
  let verdictDescription =
    'This degree recovers its investment within reasonable corporate timelines. Strong financial justification.';
  let verdictColor = '#2563EB'; // Blue

  if (firstYearMonthlySurplus <= 0 || paybackMonths > 60) {
    verdict = 'high_risk';
    verdictTitle = 'High Financial Risk / Overpriced';
    verdictDescription =
      'High fee-to-placement ratio. Debt service and living costs consume most of the starting in-hand salary.';
    verdictColor = '#EF4444'; // Red
  } else if (paybackMonths <= 24) {
    verdict = 'elite';
    verdictTitle = 'Elite High ROI Degree';
    verdictDescription =
      'Exceptional outcome! Degree investment is recouped in under 2 years, yielding rapid compounding wealth.';
    verdictColor = '#10B981'; // Emerald Green
  } else if (paybackMonths <= 42) {
    verdict = 'healthy';
    verdictTitle = 'Healthy & Balanced ROI';
    verdictDescription =
      'Solid investment. Education costs are comfortably cleared within 2.5 to 3.5 years of professional work.';
    verdictColor = '#0EA5E9'; // Sky / Blue
  } else {
    verdict = 'cautious';
    verdictTitle = 'Moderate / Exercise Caution';
    verdictDescription =
      'Payback exceeds 3.5 years. Requires disciplined budgeting and strong salary progression to avoid financial stress.';
    verdictColor = '#FCA311'; // Amber / Orange
  }

  const fiveYearNetWealth = projections[4]?.cumulativeNetWealth || 0;
  const tenYearNetWealth = projections[9]?.cumulativeNetWealth || 0;
  const tenYearRoiPercentage =
    totalCostRupees > 0
      ? Math.round((tenYearNetWealth / totalCostRupees) * 100)
      : 0;

  return {
    totalDegreeCost: totalCostRupees,
    selfFundedAmount,
    loanAmount,
    monthlyEmi,
    totalLoanRepayment,
    firstYearMonthlyInHand,
    firstYearMonthlySurplus,
    paybackMonths,
    paybackYearsFormatted,
    verdict,
    verdictTitle,
    verdictDescription,
    verdictColor,
    fiveYearNetWealth,
    tenYearNetWealth,
    tenYearRoiPercentage,
    projections,
  };
}

/**
 * Format Indian Currency in Lakhs or Crores
 */
export function formatInr(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  if (abs >= 10000000) {
    return `${sign}₹${(abs / 10000000).toFixed(2)} Cr`;
  }
  if (abs >= 100000) {
    return `${sign}₹${(abs / 100000).toFixed(1)} Lakh`;
  }
  return `${sign}₹${abs.toLocaleString('en-IN')}`;
}
