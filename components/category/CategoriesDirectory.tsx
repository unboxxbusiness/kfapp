'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  FileCheck2,
  Coins,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Compass,
} from 'lucide-react';

export interface TopicCategoryItem {
  label: string;
  value: string;
  slug?: string;
  count?: number;
}

interface CategoriesDirectoryProps {
  categories: TopicCategoryItem[];
  totalArticles: number;
}

interface ClusterGroup {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  items: TopicCategoryItem[];
}

function assignCluster(catName: string): string {
  const c = catName.toLowerCase();
  if (
    c.includes('city') ||
    c.includes('state') ||
    c.includes('location') ||
    c.includes('abroad')
  ) {
    return 'location';
  }
  if (
    c.includes('exam') ||
    c.includes('cutoff') ||
    c.includes('result') ||
    c.includes('strategy') ||
    c.includes('study plan')
  ) {
    return 'exams';
  }
  if (
    c.includes('scholarship') ||
    c.includes('cost') ||
    c.includes('budget') ||
    c.includes('fee')
  ) {
    return 'fees';
  }
  if (
    c.includes('career') ||
    c.includes('salary') ||
    c.includes('job') ||
    c.includes('placement') ||
    c.includes('industry') ||
    c.includes('resume') ||
    c.includes('interview') ||
    c.includes('freelanc') ||
    c.includes('work') ||
    c.includes('skill')
  ) {
    return 'careers';
  }
  if (
    c.includes('course') ||
    c.includes('stream') ||
    c.includes('specialization') ||
    c.includes('distance') ||
    c.includes('degree') ||
    c.includes('women')
  ) {
    return 'degrees';
  }
  return 'decisions';
}

export function CategoriesDirectory({
  categories,
  totalArticles,
}: CategoriesDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Filter out the generic root placeholder
  const pureCategories = useMemo(() => {
    return categories.filter(
      (c) => c.value && c.slug && c.label.toLowerCase() !== 'all guides'
    );
  }, [categories]);

  // Group all categories into 6 thematic clusters
  const clusters: ClusterGroup[] = useMemo(() => {
    const map: Record<string, TopicCategoryItem[]> = {
      location: [],
      careers: [],
      degrees: [],
      exams: [],
      fees: [],
      decisions: [],
    };

    for (const cat of pureCategories) {
      const clusterId = assignCluster(cat.value || cat.label);
      map[clusterId].push(cat);
    }

    Object.keys(map).forEach((key) => {
      map[key].sort((a, b) => (b.count || 0) - (a.count || 0));
    });

    return [
      {
        id: 'location',
        name: 'Location & Education Hubs',
        icon: MapPin,
        color: 'bg-[#FCA311]',
        description: 'City & state-wise college fee structures, cutoffs, median placements and local recommendations.',
        items: map.location,
      },
      {
        id: 'careers',
        name: 'Careers, Salaries & Placements',
        icon: Briefcase,
        color: 'bg-[#E5E5E5]',
        description: 'Verified median CTC packages, high-growth specializations, career roadmaps and industry hiring verdicts.',
        items: map.careers,
      },
      {
        id: 'degrees',
        name: 'Degrees, Courses & Specializations',
        icon: GraduationCap,
        color: 'bg-[#FCA311]',
        description: 'Degree curriculum comparisons, BBA vs MBA, B.Tech specializations, BCA and distance education guides.',
        items: map.degrees,
      },
      {
        id: 'exams',
        name: 'Entrance Exams & Cutoffs',
        icon: FileCheck2,
        color: 'bg-[#E5E5E5]',
        description: 'Official entrance exam roadmaps, percentile vs marks targets, counseling dates and prep strategies.',
        items: map.exams,
      },
      {
        id: 'fees',
        name: 'Fees, ROI & Scholarships',
        icon: Coins,
        color: 'bg-[#FCA311]',
        description: 'Transparent 4-year fee breakdowns, institutional fee waivers, government scholarships and ROI rankings.',
        items: map.fees,
      },
      {
        id: 'decisions',
        name: 'Student Decision Roadmaps & FAQs',
        icon: HelpCircle,
        color: 'bg-[#E5E5E5]',
        description: 'Drop year analyses, student FAQs, head-to-head comparisons, decision frameworks and parental guides.',
        items: map.decisions,
      },
    ];
  }, [pureCategories]);

  // Filtered categories based on live search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return pureCategories.filter((cat) => {
      const matchLabel = cat.label.toLowerCase().includes(q);
      const matchValue = cat.value.toLowerCase().includes(q);
      const matchSlug = (cat.slug || '').toLowerCase().includes(q);
      return matchLabel || matchValue || matchSlug;
    });
  }, [searchQuery, pureCategories]);

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Search & Theme Filter Control Center */}
      <div className="card-kf p-6 sm:p-8 bg-white space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#14213D]/50 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all 94 topics... e.g. City Wise, Pune, BCA, Drop Year, Scholarships, Cutoffs"
            className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white border-2 border-[#000000] text-sm sm:text-base font-bold text-[#14213D] placeholder:text-[#14213D]/40 shadow-[3px_3px_0_0_#000000] focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black p-1 hover:text-[#FCA311]"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Thematic Tabs */}
        {!searchQuery && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-black uppercase tracking-wider scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full border-2 border-[#000000] transition-all shrink-0 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#14213D] text-[#FFFFFF] shadow-[3px_3px_0_0_#000000] translate-y-[-1px]'
                  : 'bg-white text-[#14213D] hover:bg-[#FCA311] hover:text-[#000000]'
              }`}
            >
              All Themes (94)
            </button>
            {clusters.map((cl) => (
              <button
                key={cl.id}
                type="button"
                onClick={() => setActiveTab(cl.id)}
                className={`px-4 py-2 rounded-full border-2 border-[#000000] transition-all shrink-0 cursor-pointer ${
                  activeTab === cl.id
                    ? 'bg-[#FCA311] text-[#000000] shadow-[3px_3px_0_0_#000000] translate-y-[-1px]'
                    : 'bg-white text-[#14213D] hover:bg-[#E5E5E5]'
                }`}
              >
                {cl.name} ({cl.items.length})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Sections */}
      {searchQuery.trim() ? (
        /* Live Search Results View */
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#000000]">
            <h3 className="font-serif text-xl sm:text-2xl font-black text-[#000000]">
              Search Results ({searchResults.length})
            </h3>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-[#14213D] hover:underline"
            >
              Clear Search
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="py-16 text-center card-kf p-8 bg-white">
              <Compass className="w-12 h-12 mx-auto text-[#14213D]/40 mb-3" />
              <h4 className="font-serif text-xl font-black text-[#000000]">
                No categories matched &ldquo;{searchQuery}&rdquo;
              </h4>
              <p className="text-xs sm:text-sm text-[#14213D]/70 mt-1 max-w-md mx-auto">
                Try searching for broader keywords like &ldquo;City&rdquo;, &ldquo;Exam&rdquo;, &ldquo;BBA&rdquo;, &ldquo;Salary&rdquo;, or &ldquo;Scholarship&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-5 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#14213D] text-[#FCA311] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] hover:bg-[#FCA311] hover:text-[#000000] transition-all"
              >
                Reset Search Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((cat) => (
                <Link
                  key={cat.label}
                  href={`/category/${cat.slug}`}
                  className="card-kf p-4 sm:p-5 bg-white flex items-center justify-between group hover:border-[#FCA311] transition-all"
                >
                  <div className="space-y-1 pr-2">
                    <h4 className="font-serif text-base sm:text-lg font-black text-[#000000] group-hover:text-[#FCA311] transition-colors leading-snug">
                      {cat.label}
                    </h4>
                    <span className="text-[11px] font-bold text-[#14213D]/60 uppercase tracking-wider">
                      {cat.count || 0} Guides Available
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#E5E5E5] group-hover:bg-[#FCA311] text-[#000000] border-2 border-[#000000] shadow-[1px_1px_0_0_#000000] flex items-center justify-center shrink-0 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Thematic Clusters Cards View */
        <div className="space-y-12 sm:space-y-16">
          {clusters
            .filter((cl) => activeTab === 'all' || activeTab === cl.id)
            .map((cluster) => {
              const Icon = cluster.icon;
              const clusterTotal = cluster.items.reduce(
                (acc, i) => acc + (i.count || 0),
                0
              );

              return (
                <section
                  key={cluster.id}
                  id={cluster.id}
                  className="space-y-6"
                >
                  {/* Cluster Header Card */}
                  <div className="p-6 sm:p-8 rounded-2xl border-2 sm:border-3 border-[#000000] bg-white shadow-[4px_4px_0_0_#000000] sm:shadow-[6px_6px_0_0_#000000]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#000000]">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#14213D] text-[#FCA311] flex items-center justify-center border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
                          <Icon className="w-6 h-6 text-[#FCA311]" />
                        </div>
                        <div>
                          <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
                            {cluster.name}
                          </h3>
                          <span className="text-xs font-bold text-[#14213D]/70">
                            {cluster.items.length} Topic Clusters &bull; {clusterTotal} College Decision Guides
                          </span>
                        </div>
                      </div>

                      <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#FCA311] text-[#000000] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000]">
                        {clusterTotal} Guides
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#14213D]/80 font-medium mt-3 leading-relaxed">
                      {cluster.description}
                    </p>

                    {/* Pills Grid */}
                    <div className="flex flex-wrap gap-2.5 pt-6">
                      {cluster.items.map((cat) => (
                        <Link
                          key={cat.label}
                          href={`/category/${cat.slug}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider bg-white text-[#14213D] border-2 border-[#000000] shadow-[2px_2px_0_0_#000000] hover:bg-[#FCA311] hover:text-[#000000] hover:shadow-[3px_3px_0_0_#000000] hover:translate-y-[-1px] transition-all"
                        >
                          <span>{cat.label}</span>
                          <span className="px-2 py-0.5 rounded-md text-[11px] bg-[#14213D] text-[#FFFFFF] font-bold">
                            {cat.count || 0}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
        </div>
      )}
    </div>
  );
}
