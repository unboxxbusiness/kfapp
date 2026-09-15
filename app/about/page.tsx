import { Metadata } from 'next';
import Link from 'next/link';
import { ArticleNavbar } from '@/components/article/ArticleNavbar';
import { KampusFooter } from '@/components/article/KampusFooter';
import {
  Building2,
  Compass,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Kampus Filter | Higher Education Discovery & Guidance',
  description:
    'Kampus Filter is an independent higher education discovery and guidance network, helping students make confident, data-backed college decisions.',
  alternates: {
    canonical: 'https://kampusfilter.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14213d]">
      <ArticleNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-14 sm:py-20 border-b-2 border-[#14213d] bg-white overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-black uppercase tracking-widest bg-[#14213d] text-[#fca311] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
              About Kampus Filter
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-[#000000] leading-[1.08] tracking-tight mb-6">
              India&apos;s network for students building toward the best universities.
            </h1>
            <p className="text-base sm:text-xl text-[#14213d]/85 font-medium leading-relaxed max-w-3xl">
              Kampus Filter connects Class 12 and college students with admissions insights, fee breakdowns, and universities worth knowing — a transparent educational network built on real value, not sponsored hype.
            </p>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-14">
            {/* Brand Standard & Philosophy Banner */}
            <div className="p-6 sm:p-8 rounded-2xl border-2 sm:border-3 border-[#14213d] bg-[#fca311] shadow-[6px_6px_0_0_#14213d]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#14213d] text-[#fca311] flex items-center justify-center shrink-0 border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
                  <ShieldCheck className="w-6 h-6 text-[#fca311]" />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#14213d]/90">
                    Independent &amp; Objective
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-black text-[#000000]">
                    The Kampus Filter Standard
                  </h2>
                  <p className="text-xs sm:text-sm text-[#000000]/90 leading-relaxed font-semibold">
                    Kampus Filter is an independent higher education decision and research platform. Designed with a student-first philosophy, we bring transparency, verified fee breakdowns, and objective comparative benchmarks to educational discovery across India.
                  </p>
                </div>
              </div>
            </div>

            {/* What Is Kampus Filter */}
            <div className="p-6 sm:p-10 rounded-2xl border-2 sm:border-3 border-[#14213d] bg-white shadow-[6px_6px_0_0_#14213d] space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
                What Is Kampus Filter?
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#14213d]/85 leading-relaxed">
                <p>
                  Kampus Filter is built for Indian students — from Class 12 school-leavers through college undergraduates — working toward getting into top BBA, MBA, Engineering, and BCA programs across India and abroad.
                </p>
                <p>
                  Admissions choices define the trajectory of your next four years and your early career. Yet, most college portals present cluttered banner advertisements, obscure fee structures, and misleading placement marketing. Kampus Filter cuts through the noise with structured data matrices, genuine campus insights, and curated guidance.
                </p>
                <p>
                  For students who want to go further, we combine academic decision frameworks with AI literacy and entrepreneurial thinking — equipping you to build leverage alongside your degree, not just after it.
                </p>
              </div>
            </div>

            {/* Our Mission */}
            <div className="p-6 sm:p-10 rounded-2xl border-2 sm:border-3 border-[#14213d] bg-white shadow-[6px_6px_0_0_#14213d] space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
                Our Mission
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#14213d]/85 leading-relaxed">
                <p>
                  To create India&apos;s most objective and student-trusted decision ecosystem. We believe that every student, regardless of family background or geography, deserves transparent access to verified fee structures, realistic placement benchmarks, and honest college comparisons.
                </p>
                <p>
                  At <strong>Kampus Filter</strong>, our engineering philosophy is simple: empower the student first. The right college match at the right time unlocks immense human potential.
                </p>
              </div>
            </div>

            {/* Who We're Built For */}
            <div className="p-6 sm:p-10 rounded-2xl border-2 sm:border-3 border-[#14213d] bg-white shadow-[6px_6px_0_0_#14213d] space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
                Who We&apos;re Built For
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/25 shadow-[3px_3px_0_0_#14213d] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#14213d] text-[#fca311] flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#000000] mb-1">
                      Class 12 Aspirants
                    </h4>
                    <p className="text-xs text-[#14213d]/75 leading-relaxed">
                      Preparing for CUET, IPMAT, SET, NPAT, and undergraduate BBA/BCA admissions.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/25 shadow-[3px_3px_0_0_#14213d] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#14213d] text-[#fca311] flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#000000] mb-1">
                      MBA Candidates
                    </h4>
                    <p className="text-xs text-[#14213d]/75 leading-relaxed">
                      Evaluating CAT, XAT, and MAT scores to select business schools with optimal ROI.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/25 shadow-[3px_3px_0_0_#14213d] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#14213d] text-[#fca311] flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#000000] mb-1">
                      Parents &amp; Counselors
                    </h4>
                    <p className="text-xs text-[#14213d]/75 leading-relaxed">
                      Seeking unbiased fee tables, hostel costs, and real career outcome metrics.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/25 shadow-[3px_3px_0_0_#14213d] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#14213d] text-[#fca311] flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#000000] mb-1">
                      Student Founders
                    </h4>
                    <p className="text-xs text-[#14213d]/75 leading-relaxed">
                      Looking to build technical skills, AI fluency, and venture networks on campus.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What We Cover: 4 Tracks */}
            <div className="p-6 sm:p-10 rounded-2xl border-2 sm:border-3 border-[#14213d] bg-white shadow-[6px_6px_0_0_#14213d] space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
                What We Cover
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/25 shadow-[3px_3px_0_0_#14213d]">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#14213d] text-[#fca311] text-[10px] font-black uppercase tracking-wider mb-3">
                    Track 01
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#000000] mb-2">
                    City-Wise College Guides
                  </h3>
                  <p className="text-xs text-[#14213d]/80 leading-relaxed">
                    Granular comparisons of universities across Delhi NCR, Bangalore, Mumbai, Pune, and Chennai with total investment calculations.
                  </p>
                </div>

                <div className="p-5 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/25 shadow-[3px_3px_0_0_#14213d]">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#fca311] text-[#000000] border border-[#000000] text-[10px] font-black uppercase tracking-wider mb-3">
                    Track 02
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#000000] mb-2">
                    Placement &amp; Fee Realities
                  </h3>
                  <p className="text-xs text-[#14213d]/80 leading-relaxed">
                    Detailed analysis of median salary vs. tuition expense, recruitment percentages, and top hiring firms.
                  </p>
                </div>

                <div className="p-5 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/25 shadow-[3px_3px_0_0_#14213d]">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#000000] text-white text-[10px] font-black uppercase tracking-wider mb-3">
                    Track 03
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#000000] mb-2">
                    Admissions Playbooks
                  </h3>
                  <p className="text-xs text-[#14213d]/80 leading-relaxed">
                    Step-by-step guidance on entrance exam percentiles, quota allocations, counseling rounds, and direct admissions.
                  </p>
                </div>

                <div className="p-5 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/25 shadow-[3px_3px_0_0_#14213d]">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#14213d] text-white text-[10px] font-black uppercase tracking-wider mb-3">
                    Track 04
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#000000] mb-2">
                    Student Career Leverage
                  </h3>
                  <p className="text-xs text-[#14213d]/80 leading-relaxed">
                    Masterclasses, webinars with university founders, and AI skills designed to accelerate student career growth.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Kampus Filter */}
            <div className="p-6 sm:p-10 rounded-2xl border-2 sm:border-3 border-[#14213d] bg-white shadow-[6px_6px_0_0_#14213d] space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
                Why Kampus Filter
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#14213d]/85 leading-relaxed">
                <p>
                  Most college search engines exist to sell student leads to the highest bidder. When portals monetize by selling your contact info to university sales reps, students lose the clarity they need.
                </p>
                <p>
                  At Kampus Filter, we do not bombard students with unwanted phone calls or aggressive sales pitches. Our research team benchmarks programs using publicly submitted audited accounts, mandatory NIRF disclosure data, and on-ground student experiences.
                </p>
                <p className="font-bold text-[#14213d] italic">
                  This is a filter, not a firehose — and a decision engine, not an advertising brochure.
                </p>
              </div>
            </div>

            {/* Live CTA Banner */}
            <div className="p-8 sm:p-12 rounded-2xl border-2 sm:border-3 border-[#000000] bg-[#14213d] text-white text-center space-y-4 shadow-[6px_6px_0_0_#fca311]">
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
                Ready to find your ideal college?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto font-normal">
                Explore our comprehensive library of college comparison guides, fee structures, and career roadmaps.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fca311] text-[#000000] hover:bg-white font-extrabold uppercase text-xs tracking-wider border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] transition-all"
                >
                  <span>Explore Guides</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#14213d] hover:bg-[#e5e5e5] font-extrabold uppercase text-xs tracking-wider border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] transition-all"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <KampusFooter />
    </div>
  );
}
