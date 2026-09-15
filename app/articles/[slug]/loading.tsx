import React from 'react';

export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Accent Loading Pulse Line */}
      <div className="h-1 bg-gradient-to-r from-[#14213D] via-[#FCA311] to-[#14213D] animate-pulse w-full" />

      {/* Navbar Placeholder */}
      <div className="border-b-2 border-[#14213D] py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="h-8 w-40 bg-[#e5e5e5] rounded-lg animate-pulse" />
          <div className="h-10 w-36 bg-[#e5e5e5] rounded-full animate-pulse" />
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8 flex-1">
        {/* Breadcrumb skeleton */}
        <div className="flex gap-2 items-center">
          <div className="h-4 w-16 bg-[#e5e5e5] rounded animate-pulse" />
          <div className="h-4 w-4 bg-[#e5e5e5] rounded animate-pulse" />
          <div className="h-4 w-28 bg-[#e5e5e5] rounded animate-pulse" />
        </div>

        {/* Title and Meta Skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-28 bg-[#FCA311]/40 rounded-full animate-pulse" />
          <div className="h-10 sm:h-14 w-full bg-[#e5e5e5] rounded-xl animate-pulse" />
          <div className="h-10 w-4/5 bg-[#e5e5e5] rounded-xl animate-pulse" />
          <div className="flex gap-4 pt-2">
            <div className="h-4 w-32 bg-[#e5e5e5] rounded animate-pulse" />
            <div className="h-4 w-24 bg-[#e5e5e5] rounded animate-pulse" />
          </div>
        </div>

        {/* Direct Answer Box Skeleton */}
        <div className="p-6 rounded-2xl border-2 border-[#14213D] bg-[#FCA311]/10 space-y-3">
          <div className="h-5 w-36 bg-[#FCA311]/50 rounded-full animate-pulse" />
          <div className="h-4 w-full bg-[#14213D]/20 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-[#14213D]/20 rounded animate-pulse" />
        </div>

        {/* Content Paragraph Skeletons */}
        <div className="space-y-4 pt-4">
          <div className="h-4 w-full bg-[#e5e5e5] rounded animate-pulse" />
          <div className="h-4 w-11/12 bg-[#e5e5e5] rounded animate-pulse" />
          <div className="h-4 w-full bg-[#e5e5e5] rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-[#e5e5e5] rounded animate-pulse" />
        </div>

        {/* Section Heading Skeleton */}
        <div className="pt-6 space-y-4">
          <div className="h-8 w-64 bg-[#e5e5e5] rounded-lg animate-pulse" />
          <div className="h-4 w-full bg-[#e5e5e5] rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-[#e5e5e5] rounded animate-pulse" />
        </div>
      </article>
    </div>
  );
}
