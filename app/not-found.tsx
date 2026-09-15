import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Home,
  BookOpen,
  GraduationCap,
  Sparkles,
  LifeBuoy,
} from 'lucide-react';
import { ArticleNavbar } from '@/components/article/ArticleNavbar';
import { KampusFooter } from '@/components/article/KampusFooter';
import { NotFoundSearchBox } from '@/components/search/NotFoundSearchBox';
import { getActiveCategories } from '@/lib/supabase';

export const metadata: Metadata = {
  title: '404: Page Not Found | Kampus Filter',
  description:
    'The requested college decision guide or comparison report could not be found. Explore 2,100+ verified guides on Kampus Filter.',
};

export default async function NotFound() {
  const activeCategories = await getActiveCategories();
  // Filter out the "All Guides" item and grab top 6 active categories
  const featuredCategories = activeCategories
    .filter((cat) => cat.slug && cat.count > 0)
    .slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14213D] transition-colors">
      {/* Responsive Brand Navbar */}
      <ArticleNavbar />

      {/* Main 404 Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden py-12 sm:py-20 px-4 sm:px-6">
        {/* Background Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#14213D 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        {/* Ambient Amber Glow Spot */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-[#FCA311]/12 rounded-full blur-3xl -z-10"
          aria-hidden="true"
        />

        <div className="max-w-3xl w-full mx-auto text-center relative z-10 space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14213D] text-[#FCA311] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] text-xs font-black uppercase tracking-wider animate-in fade-in slide-in-from-top-2 duration-300">
            <Compass className="w-4 h-4 text-[#FCA311] animate-spin" style={{ animationDuration: '10s' }} />
            <span>Campus Radar • Error 404</span>
          </div>

          {/* Big Typography 404 */}
          <div className="space-y-2">
            <h1 className="font-serif text-7xl sm:text-9xl font-black text-[#14213D] tracking-tighter leading-none select-none drop-shadow-[5px_5px_0_#FCA311]">
              404
            </h1>
            <h2 className="font-serif text-2xl sm:text-4xl font-black text-[#000000] tracking-tight leading-tight">
              This College Guide Has Graduated Or Moved
            </h2>
            <p className="text-sm sm:text-base text-[#14213D]/75 font-medium max-w-xl mx-auto leading-relaxed">
              We couldn’t locate the exact college fee breakdown or comparison you were searching for.
              It may have been updated for 2027 admissions, renamed, or relocated.
            </p>
          </div>

          {/* Interactive Global Search Bar */}
          <div className="pt-2">
            <NotFoundSearchBox />
          </div>

          {/* Quick Category Discovery Hub */}
          {featuredCategories.length > 0 && (
            <div className="pt-4 space-y-3 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-[#14213D]/60">
                <BookOpen className="w-3.5 h-3.5 text-[#FCA311]" />
                <span>Explore Popular Decision Hubs:</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                {featuredCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FCA311] text-[#14213D] hover:text-[#000000] border-2 border-[#14213D] shadow-[2px_2px_0_0_#14213D] hover:shadow-[3px_3px_0_0_#000000] text-xs font-bold transition-all transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <span>{cat.label}</span>
                    <span className="inline-flex items-center justify-center px-1.5 py-0.2 rounded-full bg-[#14213D]/10 text-[#14213D] text-[10px] font-black">
                      {cat.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* High-Impact Navigation Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FCA311] text-[#000000] hover:bg-[#14213D] hover:text-white border-2 border-[#000000] shadow-[3px_3px_0_0_#000000] font-black text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5"
            >
              <Home className="w-4 h-4" />
              <span>Back to All Guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#14213D] hover:text-white text-[#14213D] border-2 border-[#14213D] shadow-[3px_3px_0_0_#14213D] font-black text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5"
            >
              <LifeBuoy className="w-4 h-4 text-[#FCA311]" />
              <span>Contact Advisory Desk</span>
            </Link>
          </div>

          {/* Trust Subtext */}
          <p className="text-[11px] font-bold text-[#14213D]/50 uppercase tracking-widest pt-2">
            Verified Fee Structures • Official NIRF Benchmarks • Real Placements
          </p>
        </div>
      </main>

      {/* Brand Footer */}
      <KampusFooter />
    </div>
  );
}
