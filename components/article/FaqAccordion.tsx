import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQItem } from '@/types/article';

interface FaqAccordionProps {
  faqs: FAQItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) return null;

  return (
    <section id="faqs" className="mb-14 scroll-mt-28">
      <div className="flex items-center gap-3 mb-6">
        <span className="p-2.5 rounded-xl bg-[#FCA311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
          <HelpCircle className="w-5 h-5" />
        </span>
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#000000]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#14213D]/70 font-medium">
            Clear answers to common student admission questions
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group rounded-2xl border-2 border-[#14213D] bg-white shadow-[3px_3px_0_0_#14213D] overflow-hidden transition-all duration-200 open:shadow-[5px_5px_0_0_#14213D]"
          >
            <summary className="cursor-pointer select-none p-5 text-left font-black text-base text-[#14213D] flex items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden hover:bg-[#E5E5E5]/25">
              <span>{faq.question}</span>
              <span className="w-7 h-7 rounded-full bg-[#FCA311] border border-[#000000] flex items-center justify-center text-xs font-black text-[#000000] group-open:rotate-180 group-open:bg-[#14213D] group-open:text-[#FCA311] transition-all flex-shrink-0">
                <ChevronDown className="w-4 h-4" />
              </span>
            </summary>
            <div className="px-5 pb-5 pt-2 text-sm sm:text-base text-[#14213D]/85 leading-relaxed border-t-2 border-[#14213D]/15 font-normal">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
