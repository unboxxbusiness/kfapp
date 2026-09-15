import { Bookmark, Hash } from 'lucide-react';
import { ArticleSectionComponent } from '@/types/article';
import { slugifyHeading } from '@/lib/toc';

interface ArticleSectionsProps {
  sections: ArticleSectionComponent[];
}

export function ArticleSections({ sections }: ArticleSectionsProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="space-y-12 mb-12">
      {sections.map((section, idx) => {
        if (!section || !section.h2) return null;
        const sectionId = slugifyHeading(section.h2) || `section-${idx + 1}`;

        const paragraphs = Array.isArray(section.paragraphs)
          ? section.paragraphs
          : typeof section.paragraphs === 'string'
            ? [section.paragraphs]
            : [];

        const bulletPoints = Array.isArray(section.bullet_points)
          ? section.bullet_points
          : typeof section.bullet_points === 'string'
            ? [section.bullet_points]
            : [];

        return (
          <section key={idx} id={sectionId} className="scroll-mt-28 group/sec">
            {/* Smashing Magazine Style Section Heading with Deep Anchor */}
            <div className="flex items-center justify-between gap-3 mb-5 pb-2 border-b border-[#14213D]/10">
              <div className="flex items-center gap-3">
                <span className="w-3 h-8 rounded-full bg-[#FCA311] border border-[#000000]" />
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight">
                  {section.h2}
                </h2>
              </div>

              <a
                href={`#${sectionId}`}
                aria-label={`Direct link to ${section.h2}`}
                className="opacity-0 group-hover/sec:opacity-100 p-1.5 rounded-lg text-[#14213D]/40 hover:text-[#FCA311] hover:bg-[#14213D]/5 transition-all"
                title="Copy link to this section"
              >
                <Hash className="w-4 h-4" />
              </a>
            </div>

            {/* Paragraphs with editorial font and line height */}
            <div className="space-y-5 text-[#14213D]/90 text-base sm:text-lg leading-[1.8] font-normal">
              {paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className={
                    idx === 0 && pIdx === 0
                      ? 'editorial-dropcap text-[#14213D]'
                      : ''
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Key Points Callout in Smashing Magazine Card Style */}
            {bulletPoints.length > 0 && (
              <div className="mt-7 p-6 rounded-2xl bg-white border-2 border-[#14213D] shadow-[3px_3px_0_0_#14213D]">
                <div className="flex items-center gap-2 mb-4 text-xs font-black uppercase tracking-wider text-[#14213D]">
                  <span className="p-1 rounded-md bg-[#FCA311] border border-[#000000]">
                    <Bookmark className="w-3.5 h-3.5 text-[#000000]" />
                  </span>
                  <span>Key Points for Students</span>
                </div>
                <ul className="space-y-3">
                  {bulletPoints.map((pt, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-3 text-sm sm:text-base text-[#14213D] font-medium">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#14213D] text-[#FCA311] border border-[#000000] flex items-center justify-center text-xs font-black">
                        ✓
                      </span>
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
