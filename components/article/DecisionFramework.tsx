import { Compass } from 'lucide-react';
import { DecisionFrameworkComponent } from '@/types/article';

interface DecisionFrameworkProps {
  framework: DecisionFrameworkComponent | null;
}

export function DecisionFramework({ framework }: DecisionFrameworkProps) {
  if (!framework || !Array.isArray(framework.steps) || framework.steps.length === 0) return null;

  return (
    <section id="decision-roadmap" className="mb-14 scroll-mt-28">
      <div className="flex items-center gap-3 mb-6">
        <span className="p-2.5 rounded-xl bg-[#FCA311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
          <Compass className="w-5 h-5" />
        </span>
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#000000]">
            {framework.h2 || 'Step-by-Step Decision Roadmap'}
          </h2>
          <p className="text-xs text-[#14213D]/70 font-medium">
            Actionable steps to evaluate institutions before applying
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {framework.steps.map((st, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white border-2 border-[#14213D] shadow-[4px_4px_0_0_#14213D] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#FCA311] transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-xl bg-[#14213D] text-[#FCA311] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] font-black text-sm flex items-center justify-center">
                  {st.step || i + 1}
                </span>
                <span className="text-[11px] uppercase font-black text-[#14213D]/50 tracking-wider">
                  Step {st.step || i + 1}
                </span>
              </div>
              <h3 className="font-bold text-base text-[#000000] mb-2 leading-snug">
                {st.title}
              </h3>
              <p className="text-sm text-[#14213D]/80 leading-relaxed font-normal">
                {st.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
