import React from 'react';
import { OPUS_CONTENT } from '../data/opusContent';
import { ShieldCheck, Lock, Activity, Eye, Globe2, FileLock2, AlertCircle } from 'lucide-react';

export default function SafetySection() {
  const { safety } = OPUS_CONTENT;

  return (
    <section id="safety" className="py-16 md:py-24 border-b border-[#E6E4DC] dark:border-[#2E2D29] bg-[#FAF9F5] dark:bg-[#141413]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold text-[#6A7862] dark:text-[#8E9F85] uppercase tracking-wider">
            (5) Safety & Responsible Scaling
          </span>
          <h2 className="font-serif-anthropic text-3xl sm:text-4xl text-[#141413] dark:text-[#FAF9F5] mt-2 mb-4">
            Pacing the Frontier: Dual Time Horizons
          </h2>
          <p className="font-serif-anthropic text-lg sm:text-xl text-[#474541] dark:text-[#C5C2BA] leading-relaxed">
            AI progress should be paced so that safety practices stay ahead of model capabilities. Pacing is an approach to keeping AI safe, remaining competitive internationally, and realizing AI’s benefits in biology, medicine, and human productivity.
          </p>
        </div>

        {/* Dario Amodei Quote Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F7F4EE] dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D97757] uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Anthropic CEO Dario Amodei on Pacing the Frontier</span>
          </div>
          <blockquote className="font-serif-anthropic text-lg sm:text-xl text-[#141413] dark:text-[#FAF9F5] italic leading-relaxed mb-4">
            "{safety.amodeiQuote}"
          </blockquote>
          <div className="text-xs text-[#8C8980]">
            From <span className="font-medium text-[#141413] dark:text-[#FAF9F5]">"We Must Pace the Frontier"</span> (September 2026)
          </div>
        </div>

        {/* Two Time Horizons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {safety.timeHorizons.map((th, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
              <div className="text-xs font-semibold text-[#D97757] uppercase tracking-wider mb-2">
                Strategic Horizon {idx + 1}
              </div>
              <h3 className="font-serif-anthropic text-xl text-[#141413] dark:text-[#FAF9F5] mb-3">
                {th.horizon}
              </h3>
              <p className="text-sm text-[#686660] dark:text-[#A09E96] leading-relaxed">
                {th.details}
              </p>
            </div>
          ))}
        </div>

        {/* Concrete Safeguards Breakdown */}
        <div className="space-y-4">
          <h3 className="font-serif-anthropic text-2xl text-[#141413] dark:text-[#FAF9F5] mb-6">
            Production Safeguards & Verification Programs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {safety.safeguards.map((sg, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#141413] dark:text-[#FAF9F5]">
                    {sg.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#6A7862]/10 text-[#6A7862] dark:text-[#8E9F85]">
                    {sg.stat}
                  </span>
                </div>
                <p className="text-xs text-[#686660] dark:text-[#A09E96] leading-relaxed">
                  {sg.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
