import React from 'react';

export default function SectionSkeleton({ title, count = 2, height = "h-48" }) {
  return (
    <div className="py-16 md:py-24 border-b border-[#E6E4DC] dark:border-[#2E2D29] bg-[#FAF9F5] dark:bg-[#141413] animate-pulse">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skeleton Section Header */}
        <div className="max-w-2xl mb-10 space-y-3">
          <div className="h-3 w-28 bg-[#E6E4DC] dark:bg-[#2E2D29] rounded-full"></div>
          <div className="h-8 w-3/4 bg-[#E6E4DC] dark:bg-[#2E2D29] rounded-xl"></div>
          <div className="h-4 w-full bg-[#E6E4DC] dark:bg-[#2E2D29] rounded-lg"></div>
          <div className="h-4 w-2/3 bg-[#E6E4DC] dark:bg-[#2E2D29] rounded-lg"></div>
        </div>

        {/* Skeleton Cards / Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-${count} gap-6`}>
          {Array.from({ length: count }).map((_, idx) => (
            <div 
              key={idx} 
              className={`p-6 rounded-2xl bg-white/60 dark:bg-[#1C1B19]/60 border border-[#E6E4DC] dark:border-[#2E2D29] ${height} flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="h-4 w-1/3 bg-[#E6E4DC] dark:bg-[#2E2D29] rounded"></div>
                <div className="h-3 w-5/6 bg-[#E6E4DC] dark:bg-[#2E2D29] rounded"></div>
                <div className="h-3 w-4/6 bg-[#E6E4DC] dark:bg-[#2E2D29] rounded"></div>
              </div>
              <div className="h-3 w-1/4 bg-[#E6E4DC] dark:bg-[#2E2D29] rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
