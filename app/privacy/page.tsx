import { Metadata } from 'next';
import Link from 'next/link';
import { ArticleNavbar } from '@/components/article/ArticleNavbar';
import { KampusFooter } from '@/components/article/KampusFooter';
import { ShieldCheck, Lock, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Kampus Filter',
  description:
    'Learn how Kampus Filter collects, protects, and handles student and user information with strict privacy safeguards.',
  alternates: {
    canonical: 'https://kampusfilter.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14213d]">
      <ArticleNavbar />

      <main className="flex-1 py-12 sm:py-16 md:py-20 border-b-2 border-[#14213d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-block px-3 py-1 mb-3 sm:mb-4 rounded-full text-xs font-black uppercase tracking-widest bg-[#fca311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
            Legal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000] mb-2 sm:mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs font-bold uppercase tracking-wider text-[#14213d]/60 mb-8 sm:mb-10">
            Last updated: September 14, 2026
          </p>

          <div className="p-6 sm:p-10 rounded-2xl border-2 sm:border-3 border-[#14213d] bg-white shadow-[6px_6px_0_0_#14213d] space-y-8 text-xs sm:text-sm text-[#14213d]/85 leading-relaxed">
            {/* Operator Notice */}
            <div className="p-4 rounded-xl border-2 border-[#14213d] bg-[#fca311]/20 flex items-start gap-3 text-xs text-[#14213d] font-medium">
              <Building2 className="w-5 h-5 shrink-0 mt-0.5 text-[#14213d]" />
              <p>
                This Privacy Policy describes how <strong>Kampus Filter</strong> collects, uses, and safeguards information gathered through the <strong>Kampus Filter</strong> platform (including kampusfilter.com and affiliated subdomains).
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                1. Our Student-First Privacy Commitment
              </h2>
              <p>
                Student trust and institutional integrity are the foundations of Kampus Filter. When you apply to a university or request campus guidance through Kampus Filter, your information is routed directly to your selected institution to facilitate your admissions process.
              </p>
              <div className="p-4 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/25 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#fca311] shrink-0" />
                <span className="font-bold text-[#14213d] text-xs">
                  Kampus Filter upholds strict data protection standards. Your application details are shared exclusively with the institution you choose to contact.
                </span>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                2. Information We Collect
              </h2>
              <p>We only collect information necessary to provide you with superior educational guidance:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Direct Inquiries:</strong> When you submit a contact or guidance form, we collect your name, email address, contact number (optional), and desired course of study.
                </li>
                <li>
                  <strong>Webinar Registrations:</strong> When participating in admissions masterclasses or speaker sessions, your registration details are utilized solely for event access delivery.
                </li>
                <li>
                  <strong>Usage &amp; Analytics Data:</strong> Non-personally identifiable technical telemetry (browser type, device viewport, pages visited, referral source) to optimize site speed and layout readability.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                3. Purpose of Information Processing
              </h2>
              <p>Kampus Filter processes personal data exclusively for:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Directly answering your queries regarding college fees, cutoffs, and admissions pathways.</li>
                <li>Sending webinar calendar invites and access links requested by you.</li>
                <li>Detecting security vulnerabilities, bots, and maintaining platform uptime.</li>
                <li>Fulfilling statutory compliance obligations under Indian law.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                4. Compliance with Indian DPDP Act &amp; IT Rules
              </h2>
              <p>
                Our privacy protocols comply with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong> of India.
              </p>
              <p>
                Data is stored in secure, encrypted cloud infrastructure located in compliant regions with stringent access-control controls.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                5. Cookies and Web Analytics
              </h2>
              <p>
                We use minimal, privacy-friendly cookies and local storage tokens strictly required for session navigation, font loading, and anonymous pageview counting. We do not employ third-party cross-site advertising trackers that monitor your activity across the internet.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                6. Your Rights Regarding Your Data
              </h2>
              <p>Under applicable Indian data protection laws, you retain full ownership of your personal data:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Right of Access:</strong> Request a summary of the personal information we hold about you.</li>
                <li><strong>Right to Correction:</strong> Ask us to rectify incomplete or inaccurate records.</li>
                <li><strong>Right to Erasure:</strong> Request the deletion of your contact records at any time.</li>
              </ul>
              <p>
                To exercise any of these rights, send an email to{' '}
                <a href="mailto:hello@kampusfilter.com" className="text-[#14213d] hover:text-[#fca311] font-bold underline transition-colors">
                  hello@kampusfilter.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t-2 border-[#14213d]/15">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#000000]">
                7. Data Protection Officer &amp; Contact
              </h2>
              <p>
                If you have inquiries, complaints, or grievance reports regarding our data protection practices, please contact:
              </p>
              <div className="p-4 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/25 space-y-1 text-xs">
                <p className="font-bold text-[#14213d]">Kampus Filter</p>
                <p>Attention: Data Protection &amp; Privacy Desk</p>
                <p>
                  Email:{' '}
                  <a href="mailto:hello@kampusfilter.com" className="text-[#14213d] hover:text-[#fca311] font-bold underline transition-colors">
                    hello@kampusfilter.com
                  </a>
                </p>
                <p>Subject Line: [Privacy Grievance - Kampus Filter]</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <KampusFooter />
    </div>
  );
}
