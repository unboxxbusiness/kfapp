import React from 'react';

export default function Loading() {
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

      {/* Hero / Content Skeleton */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1 space-y-8">
        {/* Hero Banner Skeleton */}
        <div className="p-8 sm:p-12 rounded-3xl border-2 border-[#14213D] bg-white shadow-[6px_6px_0_0_#14213D] space-y-4">
          <div className="h-5 w-32 bg-[#FCA311]/30 rounded-full animate-pulse" />
          <div className="h-10 sm:h-14 w-3/4 bg-[#e5e5e5] rounded-xl animate-pulse" />
          <div className="h-5 w-1/2 bg-[#e5e5e5] rounded-lg animate-pulse" />
          <div className="flex gap-3 pt-4">
            <div className="h-10 w-28 bg-[#e5e5e5] rounded-full animate-pulse" />
            <div className="h-10 w-28 bg-[#e5e5e5] rounded-full animate-pulse" />
            <div className="h-10 w-28 bg-[#e5e5e5] rounded-full animate-pulse" />
          </div>
        </div>

        {/* Card Grid Skeletons */}
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
              <div className="pt-4 flex items-center justify-between">
                <div className="h-4 w-24 bg-[#e5e5e5] rounded animate-pulse" />
                <div className="h-7 w-20 bg-[#14213D]/20 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
