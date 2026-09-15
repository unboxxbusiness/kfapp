import { TableProperties, ArrowUpDown } from 'lucide-react';
import { ComparisonTableComponent } from '@/types/article';

interface ComparisonTableProps {
  table: ComparisonTableComponent | null;
}

export function ComparisonTable({ table }: ComparisonTableProps) {
  if (!table || !Array.isArray(table.headers) || table.headers.length === 0) return null;
  const rows = Array.isArray(table.rows) ? table.rows : [];
  if (rows.length === 0) return null;

  return (
    <section id="comparison-matrix" className="mb-14 scroll-mt-28">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#FCA311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
            <TableProperties className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#000000]">
              {table.title || 'College Comparison Matrix'}
            </h3>
            <p className="text-xs text-[#14213D]/70 font-medium">
              Compare tuition fees, program duration, packages, and ROI ratings
            </p>
          </div>
        </div>

        <div className="px-3.5 py-1 rounded-full bg-[#E5E5E5] border-2 border-[#14213D] shadow-[2px_2px_0_0_#14213D] text-[#14213D] text-xs font-black uppercase tracking-wider">
          Quick Comparison
        </div>
      </div>

      {/* Smashing Magazine Style Table Container with Hard Offset Shadow */}
      <div className="overflow-hidden rounded-2xl border-2 border-[#14213D] bg-white shadow-[4px_4px_0_0_#14213D]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#14213D] text-white border-b-2 border-[#000000] font-black text-xs uppercase tracking-wider">
                {table.headers.map((header, idx) => (
                  <th key={idx} className="py-4 px-4 sm:px-5 whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      {header}
                      {idx === 0 && <ArrowUpDown className="w-3.5 h-3.5 text-[#FCA311]" />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#14213D]/15">
              {rows.map((row, rIdx) => {
                if (!Array.isArray(row)) return null;
                return (
                <tr
                  key={rIdx}
                  className="even:bg-[#E5E5E5]/20 hover:bg-[#FCA311]/15 transition-colors"
                >
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`py-4 px-4 sm:px-5 ${
                        cIdx === 0
                          ? 'font-black text-[#000000]'
                          : 'text-[#14213D]/90 font-medium'
                      } ${
                        table.headers[cIdx]?.toLowerCase().includes('package') ||
                        table.headers[cIdx]?.toLowerCase().includes('roi')
                          ? 'font-black text-[#14213D]'
                          : ''
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Step 4: Transparent Benchmark Footnote */}
        <div className="px-4 py-2.5 bg-[#E5E5E5]/25 border-t border-[#14213D]/15 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#14213D]/75 font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span>Verified Fee Benchmarks: Figures reflect audited notifications and semester schedules.</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#14213D]/60">
            Source: Official Circulars &amp; Mandatory Disclosures
          </span>
        </div>
      </div>
    </section>
  );
}
