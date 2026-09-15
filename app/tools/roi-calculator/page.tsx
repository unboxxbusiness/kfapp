import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleNavbar } from '@/components/article/ArticleNavbar';
import { KampusFooter } from '@/components/article/KampusFooter';
import { RoiCalculator } from '@/components/tools/RoiCalculator';
import {
  Calculator,
  ChevronRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

export const revalidate = 60; // Incremental Static Regeneration (ISR)

export const metadata: Metadata = {
  title: 'College Degree ROI & Payback Calculator (2026-27) | Kampus Filter',
  description:
    'Calculate the exact payback period in months, 10-year career wealth trajectory, and check if your college degree is financially worth its tuition fees. Free interactive Indian college ROI calculator.',
  alternates: {
    canonical: 'https://kampusfilter.com/tools/roi-calculator',
  },
  openGraph: {
    title: 'College Degree ROI & Payback Calculator | Kampus Filter',
    description:
      'Evaluate whether your target university degree is worth the investment. Calculate break-even months, take-home salary, and 10-year net career wealth.',
    url: 'https://kampusfilter.com/tools/roi-calculator',
    siteName: 'Kampus Filter',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'College Degree ROI & Payback Calculator | Kampus Filter',
    description:
      'Evaluate whether your target university degree is worth the investment. Calculate break-even months, take-home salary, and 10-year net career wealth.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RoiCalculatorPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://kampusfilter.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://kampusfilter.com/tools/roi-calculator',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Degree ROI & Payback Calculator',
        item: 'https://kampusfilter.com/tools/roi-calculator',
      },
    ],
  };

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Kampus Filter Degree ROI & Payback Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    url: 'https://kampusfilter.com/tools/roi-calculator',
    description:
      'Interactive financial tool for Indian students and parents to calculate degree payback timelines, monthly in-hand take-home salary, and 10-year career net wealth.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is considered a good ROI for a college degree in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An exceptional or elite ROI degree recovers its total education investment (tuition plus living costs) within 18 to 30 months of graduation. A healthy degree payback is between 2.5 to 3.5 years. If an undergraduate degree takes more than 5 years to break even, the fee structure is excessively high relative to the median placement outcome.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is the degree payback period calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The payback period is computed month-by-month by subtracting realistic post-college living expenses, taxes under Section 115BAC, PF contributions, and loan EMIs from your starting in-hand salary, then calculating how many months of cumulative net savings are required to offset total tuition and hostel costs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it safe to take an education loan for private universities?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'As a golden financial rule, your total education loan debt should never exceed your expected first-year starting CTC. For instance, taking a ₹16 Lakh loan for an institution where the median starting CTC is ₹5 Lakhs creates a dangerous 3:1 debt-to-income ratio that will consume over 40% of your take-home pay in EMIs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is monthly in-hand salary significantly lower than the stated placement CTC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In India, CTC (Cost to Company) includes non-cash components like employer Provident Fund (PF), gratuity, insurance, performance bonuses, and retention bonds. After deducting employee PF, professional tax, and income tax, the actual monthly take-home salary is typically 25% to 32% lower than the annual CTC divided by 12.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14213D] transition-colors">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Brand Header */}
      <ArticleNavbar />

      <main className="flex-1 w-full pb-16">
        {/* Breadcrumb Navigation */}
        <div className="bg-[#E5E5E5]/30 border-b border-[#14213D]/10 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs font-bold text-[#14213D]/70">
              <Link href="/" className="hover:text-[#14213D] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#14213D]/40" />
              <span className="text-[#14213D]/60">Tools</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#14213D]/40" />
              <span className="text-[#14213D] font-black">ROI &amp; Payback Calculator</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-white pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-[#14213D]/15 overflow-hidden">
          {/* Subtle Grid Accent */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#14213D 1.5px, transparent 1.5px)`,
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FCA311] text-[#14213D] border border-black/20 shadow-xs">
              <Calculator className="w-3.5 h-3.5" />
              <span>Higher Education Financial Intelligence • 2026–2027</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#14213D] tracking-tight">
              Degree ROI &amp; Payback Calculator
            </h1>

            <p className="text-sm sm:text-base text-[#14213D]/80 font-normal max-w-2xl mx-auto leading-relaxed">
              Most college marketing hides the real financial picture. Calculate whether a ₹15L–₹25L
              degree is worth the investment based on audited in-hand salary, monthly loan EMIs, and
              exact payback months.
            </p>
          </div>
        </section>

        {/* Calculator Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
          <RoiCalculator />
        </div>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16">
          <div className="bg-white border border-[#14213D]/20 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-[#14213D]/10">
              <span className="p-1.5 rounded-lg bg-[#14213D] text-[#FCA311]">
                <HelpCircle className="w-4 h-4" />
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-black text-[#14213D]">
                Frequently Asked Questions on College Degree ROI
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#14213D]/15 space-y-1.5">
                <h3 className="font-bold text-sm sm:text-base text-[#14213D]">
                  What is considered a good ROI for a college degree in India?
                </h3>
                <p className="text-xs sm:text-sm text-[#14213D]/80 leading-relaxed">
                  An elite ROI degree recovers its total education investment (tuition plus living costs)
                  within 18 to 30 months of graduation. A healthy degree payback is between 2.5 to 3.5
                  years. If an undergraduate degree takes more than 5 years to break even, the fee
                  structure is excessively high relative to the median placement outcome.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#14213D]/15 space-y-1.5">
                <h3 className="font-bold text-sm sm:text-base text-[#14213D]">
                  How is the degree payback period calculated?
                </h3>
                <p className="text-xs sm:text-sm text-[#14213D]/80 leading-relaxed">
                  The payback period is computed month-by-month by subtracting realistic post-college
                  living expenses, taxes under Section 115BAC, PF contributions, and loan EMIs from your
                  starting in-hand salary, then calculating how many months of cumulative net savings
                  are required to offset total tuition and hostel costs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#14213D]/15 space-y-1.5">
                <h3 className="font-bold text-sm sm:text-base text-[#14213D]">
                  Is it safe to take an education loan for private universities?
                </h3>
                <p className="text-xs sm:text-sm text-[#14213D]/80 leading-relaxed">
                  As a golden financial rule, your total education loan debt should never exceed your
                  expected first-year starting CTC. For instance, taking a ₹16 Lakh loan for an
                  institution where the median starting CTC is ₹5 Lakhs creates a dangerous 3:1
                  debt-to-income ratio that will consume over 40% of your take-home pay in EMIs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#14213D]/15 space-y-1.5">
                <h3 className="font-bold text-sm sm:text-base text-[#14213D]">
                  Why is monthly in-hand salary significantly lower than the stated placement CTC?
                </h3>
                <p className="text-xs sm:text-sm text-[#14213D]/80 leading-relaxed">
                  In India, CTC (Cost to Company) includes non-cash components like employer Provident
                  Fund (PF), gratuity, insurance, performance bonuses, and retention bonds. After
                  deducting employee PF, professional tax, and income tax, the actual monthly take-home
                  salary is typically 25% to 32% lower than the annual CTC divided by 12.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <KampusFooter />
    </div>
  );
}
