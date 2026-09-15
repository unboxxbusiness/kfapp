import React from 'react';

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Accent Loading Pulse Line */}
      <div className="h-1 bg-gradient-to-r from-[#14213D] via-[#FCA311] to-[#14213D] animate-pulse w-full" />

      {/* Header Placeholder */}
      <div className="border-b-2 border-[#14213D] py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="h-8 w-40 bg-[#e5e5e5] rounded-lg animate-pulse" />
          <div className="h-10 w-36 bg-[#e5e5e5] rounded-full animate-pulse" />
        </div>
      </div>

      {/* Category Hero Skeleton */}
      <section className="bg-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b-2 sm:border-b-3 border-[#14213D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex gap-2 items-center">
            <div className="h-4 w-14 bg-[#e5e5e5] rounded animate-pulse" />
            <div className="h-4 w-4 bg-[#e5e5e5] rounded animate-pulse" />
            <div className="h-4 w-20 bg-[#e5e5e5] rounded animate-pulse" />
            <div className="h-4 w-4 bg-[#e5e5e5] rounded animate-pulse" />
            <div className="h-4 w-28 bg-[#e5e5e5] rounded animate-pulse" />
          </div>

          <div className="flex gap-2 pt-2">
            <div className="h-6 w-28 bg-[#14213D]/20 rounded-full animate-pulse" />
            <div className="h-6 w-36 bg-[#FCA311]/40 rounded-full animate-pulse" />
          </div>

          <div className="h-12 sm:h-16 w-3/4 bg-[#e5e5e5] rounded-xl animate-pulse" />
          <div className="h-5 w-2/3 bg-[#e5e5e5] rounded-lg animate-pulse" />

          {/* Chips skeleton */}
          <div className="flex gap-2 pt-4">
            <div className="h-9 w-24 bg-[#e5e5e5] rounded-full animate-pulse" />
            <div className="h-9 w-32 bg-[#e5e5e5] rounded-full animate-pulse" />
            <div className="h-9 w-28 bg-[#e5e5e5] rounded-full animate-pulse" />
            <div className="h-9 w-28 bg-[#e5e5e5] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Cards Skeleton */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full flex-1 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border-2 border-[#14213D] bg-white shadow-[4px_4px_0_0_#14213D] space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-[#FCA311]/40 rounded-full animate-pulse" />
                <div className="h-3 w-16 bg-[#e5e5e5] rounded animate-pulse" />
              </div>
              <div className="h-6 w-5/6 bg-[#e5e5e5] rounded-lg animate-pulse" />
              <div className="space-y-2 pt-2">
                <div className="h-3.5 w-full bg-[#e5e5e5]/70 rounded animate-pulse" />
                <div className="h-3.5 w-4/5 bg-[#e5e5e5]/70 rounded animate-pulse" />
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-[#14213D]/10">
                <div className="h-4 w-24 bg-[#e5e5e5] rounded animate-pulse" />
                <div className="h-4 w-16 bg-[#FCA311]/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
