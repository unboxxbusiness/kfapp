import { GraduationCap } from 'lucide-react';
import { AuthorBioComponent } from '@/types/article';

interface AuthorBioProps {
  author?: AuthorBioComponent | null;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <footer className="mt-14 pt-8 border-t-2 border-[#14213d]">
      <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#14213d] shadow-[4px_4px_0_0_#14213d]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#14213d] text-[#fca311] border-2 border-[#000000] shadow-[3px_3px_0_0_#fca311] flex items-center justify-center font-black text-xl flex-shrink-0">
            <GraduationCap className="w-7 h-7" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-serif text-xl font-black text-[#14213d]">
                Team Kampus Filter
              </h4>
            </div>

            <p className="text-sm text-[#14213d]/80 leading-relaxed font-normal">
              Researched and compiled by Team Kampus Filter to help students and parents make informed, confident college decisions with transparent data.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
