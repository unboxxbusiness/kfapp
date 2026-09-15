import { Metadata } from 'next';
import { ArticleNavbar } from '@/components/article/ArticleNavbar';
import { KampusFooter } from '@/components/article/KampusFooter';
import { ContactForm } from '@/components/contact/ContactForm';
import {
  Mail,
  Building2,
  Clock,
  ShieldCheck,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Kampus Filter',
  description:
    'Get in touch with Team Kampus Filter for admissions inquiries, college comparisons, and educational partnerships.',
  alternates: {
    canonical: 'https://kampusfilter.com/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14213d]">
      <ArticleNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-14 sm:py-20 border-b-2 border-[#14213d] bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-black uppercase tracking-widest bg-[#fca311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
              Get In Touch
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-[#000000] leading-[1.08] tracking-tight mb-4">
              We&apos;re here to help you make smarter college decisions.
            </h1>
            <p className="text-base sm:text-xl text-[#14213d]/85 font-medium leading-relaxed max-w-2xl">
              Whether you are a student evaluating colleges, a parent seeking fee transparency, or a university exploring admissions webinars, Team Kampus Filter is just a message away.
            </p>
          </div>
        </section>

        {/* Form and Contact Info Grid */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
            {/* Left Column: Office & Entity Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Corporate Card */}
              <div className="p-6 sm:p-7 rounded-2xl border-2 sm:border-3 border-[#14213d] bg-white shadow-[6px_6px_0_0_#14213d] space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b-2 border-[#14213d]/15">
                  <div className="w-10 h-10 rounded-xl bg-[#14213d] border-2 border-[#000000] flex items-center justify-center text-[#fca311] shadow-[2px_2px_0_0_#000000]">
                    <Building2 className="w-5 h-5 text-[#fca311]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#14213d]/70 block">
                      Advisory &amp; Support Desk
                    </span>
                    <h3 className="font-serif text-lg font-black text-[#14213d]">
                      Team Kampus Filter
                    </h3>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-[#14213d]/85">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#fca311] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[#14213d]">Official Email</span>
                      <a
                        href="mailto:hello@kampusfilter.com"
                        className="text-[#14213d] hover:text-[#fca311] underline font-bold transition-colors"
                      >
                        hello@kampusfilter.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#14213d] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[#14213d]">Headquarters</span>
                      <span>Gurugram, India</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#14213d] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[#14213d]">Operating Hours</span>
                      <span>Mon – Fri: 9:30 AM – 6:30 PM IST</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Privacy Pledge */}
              <div className="p-6 rounded-2xl border-2 border-[#14213d] bg-[#fca311]/15 shadow-[4px_4px_0_0_#14213d] space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#14213d]">
                  <ShieldCheck className="w-4 h-4 text-[#14213d]" />
                  <span>Student Privacy &amp; Data Security</span>
                </div>
                <p className="text-xs text-[#14213d]/80 leading-relaxed font-medium">
                  Your contact details are used strictly to respond to your inquiry or to connect you directly with your chosen university. We maintain strict data security standards and your communications remain confidential.
                </p>
              </div>

              {/* Quick Channels */}
              <div className="p-6 rounded-2xl border-2 border-[#14213d] bg-white shadow-[4px_4px_0_0_#14213d] space-y-3">
                <h4 className="font-serif text-sm font-black text-[#14213d] uppercase tracking-wider">
                  Community &amp; Social
                </h4>
                <p className="text-xs text-[#14213d]/80 leading-relaxed">
                  Connect with our webinars, student interviews, and university deep-dives across social platforms:
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <a
                    href="https://www.linkedin.com/company/kampusfilter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-[#e5e5e5]/50 border-2 border-[#14213d] text-xs font-bold text-[#14213d] hover:bg-[#fca311] hover:text-[#000000] shadow-[2px_2px_0_0_#14213d] transition-all"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/kampus_filter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-[#e5e5e5]/50 border-2 border-[#14213d] text-xs font-bold text-[#14213d] hover:bg-[#fca311] hover:text-[#000000] shadow-[2px_2px_0_0_#14213d] transition-all"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.youtube.com/@kampusfilter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-[#e5e5e5]/50 border-2 border-[#14213d] text-xs font-bold text-[#14213d] hover:bg-[#fca311] hover:text-[#000000] shadow-[2px_2px_0_0_#14213d] transition-all"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <KampusFooter />
    </div>
  );
}
