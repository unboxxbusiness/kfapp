import React from 'react';
import {
  ShieldCheck,
  Building2,
  Award,
  CheckCircle2,
  TrendingUp,
  Landmark,
  Briefcase,
  Sparkles,
} from 'lucide-react';

const regulatoryItems = [
  {
    code: 'NIRF',
    name: 'Ministry of Education',
    label: 'Official NIRF Rankings & Scoring Benchmarks',
    badge: 'Govt. Benchmark',
    icon: Landmark,
  },
  {
    code: 'UGC',
    name: 'University Grants Commission',
    label: 'Mandatory Institutional Public Filings',
    badge: 'Statutory Body',
    icon: ShieldCheck,
  },
  {
    code: 'NAAC A++',
    name: 'Accreditation Council',
    label: 'Highest Grade Quality & Infrastructure Rating',
    badge: 'A++ Standard',
    icon: Award,
  },
  {
    code: 'AICTE',
    name: 'Technical Education Council',
    label: 'Approved Intake & Fee Structure Disclosures',
    badge: 'Regulatory Approval',
    icon: CheckCircle2,
  },
  {
    code: 'AISHE',
    name: 'Higher Ed Survey',
    label: 'Central Ministry Enrollment & Faculty Ratios',
    badge: 'Public Records',
    icon: Building2,
  },
  {
    code: 'NBA',
    name: 'Board of Accreditation',
    label: 'Tier-1 Engineering & Management Accreditations',
    badge: 'Outcome Based',
    icon: Award,
  },
];

const recruiterItems = [
  {
    company: 'Google',
    role: 'Software & Cloud Engineering',
    packageRange: '₹32L – ₹55L CTC',
    icon: Briefcase,
  },
  {
    company: 'Microsoft',
    role: 'Product, Cloud & Azure Systems',
    packageRange: '₹28L – ₹51L CTC',
    icon: Briefcase,
  },
  {
    company: 'Deloitte',
    role: 'Strategy, Risk & Financial Advisory',
    packageRange: '₹9L – ₹18L CTC',
    icon: Briefcase,
  },
  {
    company: 'Amazon',
    role: 'SDE, Operations & AWS Systems',
    packageRange: '₹24L – ₹45L CTC',
    icon: Briefcase,
  },
  {
    company: 'McKinsey & Co.',
    role: 'Management Consulting & Analytics',
    packageRange: '₹22L – ₹38L CTC',
    icon: Briefcase,
  },
  {
    company: 'Goldman Sachs',
    role: 'Investment Banking & Quantitative Tech',
    packageRange: '₹26L – ₹42L CTC',
    icon: Briefcase,
  },
  {
    company: 'TCS Digital',
    role: 'Advanced Enterprise Tech Roles',
    packageRange: '₹7.5L – ₹12L CTC',
    icon: Briefcase,
  },
  {
    company: 'Zomato',
    role: 'Product Strategy & Engineering',
    packageRange: '₹18L – ₹34L CTC',
    icon: Briefcase,
  },
  {
    company: 'HDFC Bank',
    role: 'Corporate Banking & Fintech Leadership',
    packageRange: '₹12L – ₹22L CTC',
    icon: Briefcase,
  },
];

export function TrustMarquee() {
  return (
    <section className="relative bg-white border-b-2 sm:border-b-3 border-[#14213D] py-10 sm:py-14 overflow-hidden">
      {/* Decorative Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#14213D 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center space-y-2 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-[#FCA311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Accredited Standards &amp; Career Pathways</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl font-black text-[#000000] tracking-tight">
          Benchmarked Against Regulatory Standards &amp; Top Industry Recruiters
        </h2>
        <p className="text-xs sm:text-sm text-[#14213D]/80 font-medium max-w-2xl mx-auto">
          Structured campus profiles, accredited academic frameworks, and verified placement metrics across India&apos;s leading higher education institutions.
        </p>
      </div>

      {/* Marquee Wrapper with Left and Right Fade Gradients */}
      <div className="relative w-full overflow-hidden pause-on-hover space-y-4">
        {/* Left Fade Mask */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-20 bg-gradient-to-r from-white to-transparent" />
        {/* Right Fade Mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-20 bg-gradient-to-l from-white to-transparent" />

        {/* Row 1: Regulatory & Statutory Standards (Flows Left) */}
        <div className="flex overflow-hidden select-none">
          <div className="animate-kf-marquee flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
            {[...regulatoryItems, ...regulatoryItems].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`reg-${idx}`}
                  className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border-2 border-[#000000] shadow-[3px_3px_0_0_#000000] hover:bg-[#FCA311] transition-colors shrink-0 cursor-default"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#14213D] text-[#FCA311] flex items-center justify-center border border-[#000000] shrink-0">
                    <Icon className="w-4 h-4 text-[#FCA311]" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-xs sm:text-sm text-[#000000] tracking-tight">
                        {item.code}
                      </span>
                      <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-[#E5E5E5] text-[#14213D] border border-[#14213D]/40">
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-[#14213D]/80 line-clamp-1">
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2: Placements & Top Recruiters (Flows Right) */}
        <div className="flex overflow-hidden select-none">
          <div className="animate-kf-marquee-reverse flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
            {[...recruiterItems, ...recruiterItems].map((item, idx) => (
              <div
                key={`rec-${idx}`}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#14213D] text-white border-2 border-[#000000] shadow-[3px_3px_0_0_#000000] hover:bg-[#FCA311] hover:text-[#000000] transition-colors group shrink-0 cursor-default"
              >
                <div className="w-8 h-8 rounded-xl bg-white text-[#14213D] group-hover:bg-[#14213D] group-hover:text-[#FCA311] flex items-center justify-center border border-[#000000] shrink-0 transition-colors">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xs sm:text-sm tracking-tight text-[#FCA311] group-hover:text-[#000000] transition-colors">
                      {item.company}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white/10 group-hover:bg-black/10 text-white group-hover:text-black transition-colors">
                      {item.packageRange}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-white/80 group-hover:text-[#000000]/90 transition-colors line-clamp-1">
                    Campus Recruiter for {item.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
