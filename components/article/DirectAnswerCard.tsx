import { Lightbulb, TrendingUp } from 'lucide-react';

interface DirectAnswerCardProps {
  badge?: string;
  paragraph: string;
  keyStat?: string;
}

export function DirectAnswerCard({
  badge = 'Quick Summary',
  paragraph,
  keyStat,
}: DirectAnswerCardProps) {
  if (!paragraph) return null;

  return (
    <section
      id="direct-answer-summary"
      aria-label="Article Summary"
      itemScope
      itemType="https://schema.org/Answer"
      className="mb-12 relative overflow-hidden rounded-2xl border-2 border-[#14213D] bg-white p-6 sm:p-8 shadow-[4px_4px_0_0_#14213D] border-l-8 border-l-[#FCA311]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#14213D] text-white border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] text-xs font-black uppercase tracking-wider">
          <Lightbulb className="w-3.5 h-3.5 text-[#FCA311]" />
          <span>{badge}</span>
        </div>

        {keyStat && (
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#000000] px-3.5 py-1 rounded-full bg-[#FCA311] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
            <TrendingUp className="w-3.5 h-3.5 text-[#000000]" />
            <span>{keyStat}</span>
          </div>
        )}
      </div>

      <p
        itemProp="text"
        className="text-base sm:text-lg font-medium text-[#14213D] leading-relaxed"
      >
        {paragraph}
      </p>
    </section>
  );
}
