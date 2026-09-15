import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { ScrollToTopButton } from './ScrollToTopButton';

export function KampusFooter() {
  return (
    <footer className="border-t-2 border-black bg-[#14213D] text-white pt-12 sm:pt-16 pb-36 sm:pb-28 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Brand & Status Top Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/15">
          <div className="space-y-3 max-w-xl">
            <Link
              href="/"
              className="inline-block group"
              aria-label="Kampus Filter Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://res.cloudinary.com/dhrigocvd/image/upload/w_200,c_limit,e_trim,f_auto,q_auto/v1769402686/Logo_voqhtq.png"
                alt="Kampus Filter"
                width={190}
                height={48}
                className="h-9 sm:h-10 md:h-12 w-auto max-h-14 object-contain object-left group-hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-normal">
              Kampus Filter connects Class 12 and college students with admissions insights, verified fee breakdowns, and universities worth knowing — a transparent educational network built on verified campus data and direct admissions guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-white">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FCA311] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FCA311]" />
              </span>
              <span className="font-bold uppercase tracking-wider text-[11px] text-[#FCA311]">
                Admissions 2026–2027
              </span>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/kampusfilter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kampus Filter on LinkedIn"
                className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:text-[#FCA311] hover:bg-white/20 hover:border-[#FCA311]/50 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/kampus_filter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kampus Filter on Instagram"
                className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:text-[#FCA311] hover:bg-white/20 hover:border-[#FCA311]/50 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@kampusfilter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kampus Filter on YouTube"
                className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:text-[#FCA311] hover:bg-white/20 hover:border-[#FCA311]/50 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <ScrollToTopButton />
          </div>
        </div>

        {/* 4 Clear Semantic Columns: Top Courses, Top Cities, Tools & Guidance, Company */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Column 1: Top Courses */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest text-[#FCA311] text-xs">
              Top Courses
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/category/engineering-btech"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Engineering (B.Tech)
                </Link>
              </li>
              <li>
                <Link
                  href="/category/management-mba-bba"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Management (MBA / BBA)
                </Link>
              </li>
              <li>
                <Link
                  href="/category/computer-applications-bca-mca"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Computer Apps (BCA / MCA)
                </Link>
              </li>
              <li>
                <Link
                  href="/category/law-legal-studies-llb"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Law &amp; Legal Studies (LLB)
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-[#FCA311] hover:text-white font-bold transition-colors inline-flex items-center gap-1 pt-1"
                >
                  <span>Explore All 94 Courses</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Top Cities */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest text-[#FCA311] text-xs">
              Top Cities
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/category/colleges-in-delhi-ncr"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Colleges in Delhi NCR
                </Link>
              </li>
              <li>
                <Link
                  href="/category/colleges-in-bangalore"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Colleges in Bangalore
                </Link>
              </li>
              <li>
                <Link
                  href="/category/colleges-in-pune"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Colleges in Pune
                </Link>
              </li>
              <li>
                <Link
                  href="/category/colleges-in-mumbai"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Colleges in Mumbai
                </Link>
              </li>
              <li>
                <Link
                  href="/category/colleges-in-hyderabad"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Colleges in Hyderabad
                </Link>
              </li>
              <li>
                <Link
                  href="/category/city-wise-courses"
                  className="text-[#FCA311] hover:text-white font-bold transition-colors inline-flex items-center gap-1 pt-1"
                >
                  <span>Explore All Cities</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools & Guidance */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest text-[#FCA311] text-xs">
              Tools &amp; Guidance
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/tools/roi-calculator"
                  className="text-[#FCA311] hover:text-white font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FCA311] shrink-0" />
                  <span>Degree ROI Calculator</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/category/career-guides"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Career Decision Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/category/budget-guide"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  College Fee Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/category/admission-guide"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Admission Cutoff Roadmaps
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Latest Campus Research
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest text-[#FCA311] text-xs">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="mailto:ads@kampusfilter.com"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Advertising
                </a>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-white/80 hover:text-[#FCA311] font-medium transition-colors inline-block"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Editorial */}
        <div className="pt-8 border-t border-white/15 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-xs sm:text-sm text-white/70">
          <div className="space-y-1 text-left max-w-2xl">
            <p>
              © {new Date().getFullYear()} <span className="font-bold text-white">Kampus Filter</span>. All rights reserved.
            </p>
            <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed">
              For factual updates, fee corrections, or institutional inquiries, contact{' '}
              <a
                href="mailto:editor@kampusfilter.com?subject=Editorial%20Correction%20Request"
                className="text-[#FCA311] hover:text-white underline underline-offset-2 font-bold transition-colors"
              >
                editor@kampusfilter.com
              </a>
            </p>
          </div>

          {/* Reserved Safe Zone for Floating Mobile/Desktop Shortlist Drawer */}
          <div className="hidden lg:block w-64 shrink-0 pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
