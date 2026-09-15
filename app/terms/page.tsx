import { Metadata } from 'next';
import Link from 'next/link';
import { ArticleNavbar } from '@/components/article/ArticleNavbar';
import { KampusFooter } from '@/components/article/KampusFooter';
import { Building2, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Use | Kampus Filter',
  description:
    'Read the Terms of Use governing access to the Kampus Filter higher education discovery and guidance portal.',
  alternates: {
    canonical: 'https://kampusfilter.com/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14213d]">
      <ArticleNavbar />

      <main className="flex-1 py-12 sm:py-16 md:py-20 border-b-2 border-[#14213d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-block px-3 py-1 mb-3 sm:mb-4 rounded-full text-xs font-black uppercase tracking-widest bg-[#14213d] text-[#fca311] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
            Legal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000] mb-2 sm:mb-3">
            Terms of Use
          </h1>
          <p className="text-xs font-bold uppercase tracking-wider text-[#14213d]/60 mb-8 sm:mb-10">
            Last updated: September 14, 2026
          </p>

          <div className="p-6 sm:p-10 rounded-2xl border-2 sm:border-3 border-[#14213d] bg-white shadow-[6px_6px_0_0_#14213d] space-y-8 text-xs sm:text-sm text-[#14213d]/85 leading-relaxed">
            {/* Operator Clause */}
            <div className="p-4 rounded-xl border-2 border-[#14213d] bg-[#fca311]/20 flex items-start gap-3 text-xs text-[#14213d] font-medium">
              <Building2 className="w-5 h-5 shrink-0 mt-0.5 text-[#14213d]" />
              <p>
                The platform <strong>Kampus Filter</strong> (accessible via kampusfilter.com and related web applications) is an independent student decision network governed under the laws of the Republic of India.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing, browsing, or utilizing Kampus Filter, you unconditionally agree to comply with and be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please discontinue your access to the platform immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                2. Eligibility and Student Use
              </h2>
              <p>
                Kampus Filter is designed for students (Class 12 school-leavers and undergraduate/postgraduate candidates), along with parents, counselors, and educators seeking college decision insights. If you are under the age of 18, you represent that you are accessing this website with the consent and supervision of a parent or legal guardian.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                3. The Services We Provide
              </h2>
              <p>
                Kampus Filter operates as an independent higher education discovery, comparison, and webinar portal. We compile, analyze, and publish comparative data regarding college courses, fee structures, cutoff benchmarks, and career placement insights.
              </p>
              <p>
                Kampus Filter is not an official university admissions office and does not guarantee admission to any college or degree program. All official admissions must be confirmed directly through the respective universities.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                4. Intellectual Property Rights
              </h2>
              <p>
                All editorial layouts, software code, graphic tokens, logos, compilation databases, visual branding, and proprietary comparison algorithms are the intellectual property of <strong>Kampus Filter</strong> and are protected by Indian and international copyright and trademark laws.
              </p>
              <p>
                You may not copy, reproduce, scrape, reverse-engineer, mirror, or redistribute any data or content from this platform for commercial exploitation without prior written consent from Team Kampus Filter.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                5. Acceptable Use Policy
              </h2>
              <p>You agree to use Kampus Filter solely for lawful and personal educational purposes. You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1.5 font-normal">
                <li>Deploy automated scrapers, web spiders, bots, or extraction scripts against our services.</li>
                <li>Interfere with or disrupt server integrity, network performance, or application availability.</li>
                <li>Submit misleading, false, or impersonated information through inquiry or contact forms.</li>
                <li>Attempt unauthorized access to our backend databases or administrative infrastructure.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                6. Disclaimers and Limitation of Liability
              </h2>
              <p>
                All data, fee structures, cutoff estimations, and placement figures provided on Kampus Filter are compiled from public institutional filings, mandatory regulatory disclosures, and student survey feedback. While Kampus Filter endeavors to maintain maximum accuracy, college fees, curricula, and intake numbers are subject to unilateral revisions by individual university authorities.
              </p>
              <p>
                The platform is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. Please read our full{' '}
                <Link href="/disclaimer" className="text-[#14213d] hover:text-[#fca311] font-bold underline transition-colors">
                  Editorial Disclaimer
                </Link>
                , which is incorporated into these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                7. Third-Party Links &amp; College Websites
              </h2>
              <p>
                Our articles and comparison tables may contain hyperlinks to external university portals, regulatory bodies (UGC, AICTE), or webinar streaming platforms. Kampus Filter does not endorse, control, or assume liability for the practices or privacy policies of third-party websites.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                8. Governing Law and Dispute Resolution
              </h2>
              <p>
                These Terms shall be interpreted, construed, and enforced in accordance with the laws of the Republic of India. Any legal dispute or claim arising from these Terms or use of the website shall fall under the exclusive jurisdiction of the competent courts in India.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t-2 border-[#14213d]/15">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                9. Contact &amp; Grievance Redressal
              </h2>
              <p>
                For questions regarding these Terms or legal notices, please write to the Kampus Filter Legal &amp; Compliance Desk at:
              </p>
              <div className="p-4 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/25 space-y-1 text-xs">
                <p className="font-bold text-[#14213d]">Kampus Filter</p>
                <p>Legal &amp; Compliance Department</p>
                <p>
                  Email:{' '}
                  <a href="mailto:hello@kampusfilter.com" className="text-[#14213d] hover:text-[#fca311] font-bold underline transition-colors">
                    hello@kampusfilter.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <KampusFooter />
    </div>
  );
}
