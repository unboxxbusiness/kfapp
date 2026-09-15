import { Metadata } from 'next';
import Link from 'next/link';
import { ArticleNavbar } from '@/components/article/ArticleNavbar';
import { KampusFooter } from '@/components/article/KampusFooter';
import { AlertCircle, Building2, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer | Kampus Filter',
  description:
    'Important editorial and educational disclaimers regarding college fee structures, placement statistics, and admissions guidance.',
  alternates: {
    canonical: 'https://kampusfilter.com/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14213d]">
      <ArticleNavbar />

      <main className="flex-1 py-12 sm:py-16 md:py-20 border-b-2 border-[#14213d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-block px-3 py-1 mb-3 sm:mb-4 rounded-full text-xs font-black uppercase tracking-widest bg-[#14213d] text-[#fca311] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
            Legal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000] mb-2 sm:mb-3">
            Editorial Disclaimer
          </h1>
          <p className="text-xs font-bold uppercase tracking-wider text-[#14213d]/60 mb-8 sm:mb-10">
            Last updated: September 14, 2026
          </p>

          <div className="p-6 sm:p-10 rounded-2xl border-2 sm:border-3 border-[#14213d] bg-white shadow-[6px_6px_0_0_#14213d] space-y-8 text-xs sm:text-sm text-[#14213d]/85 leading-relaxed">
            {/* Operator Clause */}
            <div className="p-4 rounded-xl border-2 border-[#14213d] bg-[#fca311]/20 flex items-start gap-3 text-xs text-[#14213d] font-medium">
              <Building2 className="w-5 h-5 shrink-0 mt-0.5 text-[#14213d]" />
              <p>
                <strong>Kampus Filter</strong> is an independent educational research and student decision platform. The information provided across this platform is synthesized solely for independent academic research, public interest, and comparative benchmark guidance.
              </p>
            </div>

            {/* 1. Multi-Source Public Data & Statutory Synthesis */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                1. Multi-Source Public Data &amp; Statutory Synthesis
              </h2>
              <p>
                Institutional profiles, course matrices, fee breakdowns, entrance cutoff percentiles, and placement statistics published on Kampus Filter are synthesized in good faith from multiple public and statutory sources:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#14213d]/80">
                <li>Official university prospectuses, published fee schedules, and campus admission portals.</li>
                <li>Statutory institutional filings under <strong>NIRF (National Institutional Ranking Framework, Ministry of Education, Government of India)</strong>.</li>
                <li>Regulatory notifications from the <strong>University Grants Commission (UGC)</strong>, <strong>All India Council for Technical Education (AICTE)</strong>, and <strong>NAAC</strong> accreditation disclosures.</li>
                <li>Central and state entrance examination authority circulars (e.g., NTA, State CET Cell).</li>
                <li>Empirical student survey samples, accredited academic directories, and established national news publications.</li>
              </ul>
            </section>

            {/* 2. Statutory Safe-Harbor, Intermediary Immunity & Non-Liability */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                2. Statutory Safe-Harbor, Intermediary Status &amp; Non-Liability
              </h2>
              <p>
                All data, metrics, fee approximations, salary ranges, and institutional details are presented strictly on an <strong>&quot;AS-IS&quot;</strong> and <strong>&quot;AS-AVAILABLE&quot;</strong> reference basis without warranty of any kind, express or implied.
              </p>
              <p>
                College tuition structures, scholarship eligibility, seat matrices, and entrance cutoff percentiles are determined unilaterally and autonomously by respective university governing bodies and are subject to periodic revisions without prior notification to public directories.
              </p>
              <p>
                Kampus Filter and its editorial advisory desk function as an independent public search and informational intermediary under Section 79 of the Information Technology Act, 2000, and expressly disclaim all legal liability for inadvertent factual omissions, typographical inaccuracies, or third-party academic decisions.
              </p>
            </section>

            {/* 3. No Official University Affiliation & Fair Use */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                3. No Official University Affiliation &amp; Fair Use
              </h2>
              <p>
                Unless explicitly demarcated with an official &quot;Verified Partner University&quot; badge, Kampus Filter is entirely autonomous and is not affiliated with, endorsed by, sponsored by, or acting as an administrative representative for any university or college mentioned on this portal.
              </p>
              <p>
                All registered logos, institutional crests, and trademarks referenced on this platform belong to their respective university authorities and are utilized strictly under Fair Dealing / Fair Use doctrine for educational criticism, comparison, and student awareness.
              </p>
            </section>

            {/* 4. Placement & Salary Benchmarks */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                4. Placement &amp; Salary Statistics Are Benchmarks
              </h2>
              <p>
                All salary statistics, highest domestic/international CTCs, and median packages referenced in articles are comparative historical benchmarks based on recent graduating cohorts.
              </p>
              <div className="p-4 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/25 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#fca311] shrink-0 mt-0.5" />
                <p className="text-xs text-[#14213d]/85">
                  <strong>Important Notice:</strong> Recruitment compensation packages fluctuate based on macroeconomic market cycles, industry hiring demands, and individual candidate merit. Historical placement records do not constitute a guarantee of future employment, compensation, or job offers.
                </p>
              </div>
            </section>

            {/* 5. Mandatory Student Due Diligence */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                5. Mandatory Student Due Diligence (Caveat Emptor)
              </h2>
              <p>
                Before remitting seat booking fees, obtaining education loans, or finalizing academic enrollment, candidates and guardians are strictly obligated to independently verify fee structures, university affiliation status, and admission criteria directly with the target institution&apos;s official admissions office.
              </p>
              <p>
                Neither Kampus Filter nor its editorial board shall be held liable for any financial commitments, admission forfeitures, or career choices made on the basis of information accessed through this website.
              </p>
            </section>

            {/* 6. Official Registrar Redressal Desk */}
            <section className="space-y-3 pt-2">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                6. Institutional Liaison &amp; Official Registrar Redressal Desk
              </h2>
              <div className="p-4 rounded-xl border-2 border-[#14213d] bg-[#fca311]/15 space-y-2">
                <p className="font-bold text-[#14213d] text-sm">
                  Notice for Universities, Colleges &amp; Institutional Authorities:
                </p>
                <p className="text-xs text-[#14213d]/85 leading-relaxed">
                  We maintain strict dedication to factual accuracy and statutory compliance. If an authorized university chancellor, dean, registrar, or admissions director identifies an outdated figure or wishes to submit official fee circulars, accredited revisions, or placement audits, please contact our editorial compliance board directly:
                </p>
                <p className="text-xs font-bold">
                  Official Institutional Corrections:{' '}
                  <a href="mailto:editor@kampusfilter.com" className="text-[#14213d] hover:text-[#fca311] underline transition-colors">
                    editor@kampusfilter.com
                  </a>
                  {' '}| General Student Inquiries:{' '}
                  <a href="mailto:hello@kampusfilter.com" className="text-[#14213d] hover:text-[#fca311] underline transition-colors">
                    hello@kampusfilter.com
                  </a>
                </p>
                <p className="text-[11px] text-[#14213d]/70 italic">
                  Verified institutional submissions are audited and updated expeditiously within 24–48 business hours.
                </p>
              </div>
            </section>

            {/* 7. Corporate Legal Inquiries */}
            <section className="space-y-3 pt-4 border-t-2 border-[#14213d]/15">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                7. Editorial &amp; Advisory Desk
              </h2>
              <div className="p-4 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/25 space-y-1 text-xs">
                <p className="font-bold text-[#14213d]">Kampus Filter</p>
                <p>Editorial, Research &amp; Advisory Desk</p>
                <p>
                  Direct Email:{' '}
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
