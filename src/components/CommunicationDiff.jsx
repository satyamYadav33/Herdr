import React, { useState } from 'react';
import { OPUS_CONTENT } from '../data/opusContent';
import { Columns, SplitSquareVertical, Sparkles, Check, Clock, FileText, ChevronRight } from 'lucide-react';

export default function CommunicationDiff() {
  const [selectedExampleId, setSelectedExampleId] = useState('bug-explanation');
  const [viewMode, setViewMode] = useState('split'); // 'split' or 'tabs'
  const [activeTabModel, setActiveTabModel] = useState('opus55');

  const diffData = OPUS_CONTENT.communicationDiffs.find(d => d.id === selectedExampleId);

  const commQuotes = OPUS_CONTENT.testimonials.filter(t => 
    ['Ramp', 'Stripe', 'Box', 'Chicago Trading Company', 'Factory'].includes(t.company)
  );

  return (
    <section id="communication" className="py-16 md:py-24 border-b border-[#E6E4DC] dark:border-[#2E2D29]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold text-[#D97757] uppercase tracking-wider">
            (4) Natural & Direct Communication
          </span>
          <h2 className="font-serif-anthropic text-3xl sm:text-4xl text-[#141413] dark:text-[#FAF9F5] mt-2 mb-4">
            Side-by-Side Output Comparison: Opus 5 vs Opus 5.5
          </h2>
          <p className="font-serif-anthropic text-lg sm:text-xl text-[#474541] dark:text-[#C5C2BA] leading-relaxed">
            We’ve made major improvements to the way Opus 5.5 writes and communicates—one of the most common areas of feedback we heard about Opus 5. It puts the most important information up front, avoids jargon, and rigorously respects formatting rules.
          </p>
        </div>

        {/* Example Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {OPUS_CONTENT.communicationDiffs.map(example => (
              <button
                key={example.id}
                onClick={() => setSelectedExampleId(example.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedExampleId === example.id
                    ? 'bg-[#141413] text-[#FAF9F5] dark:bg-[#FAF9F5] dark:text-[#141413] shadow-sm'
                    : 'bg-[#F2EDE4] dark:bg-[#22211F] text-[#686660] dark:text-[#A09E96] hover:bg-[#E5DED3] dark:hover:bg-[#2D2B27]'
                }`}
              >
                {example.title}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-[#F2EDE4] dark:bg-[#22211F] rounded-xl text-xs font-medium">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'split' 
                  ? 'bg-white dark:bg-[#1C1B19] text-[#141413] dark:text-[#FAF9F5] shadow-xs' 
                  : 'text-[#686660] dark:text-[#A09E96]'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Side-by-Side</span>
            </button>
            <button
              onClick={() => setViewMode('tabs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'tabs' 
                  ? 'bg-white dark:bg-[#1C1B19] text-[#141413] dark:text-[#FAF9F5] shadow-xs' 
                  : 'text-[#686660] dark:text-[#A09E96]'
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tabs</span>
            </button>
          </div>
        </div>

        {/* Prompt Header Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F4EE] dark:bg-[#181715] border border-[#E6E4DC] dark:border-[#2E2D29] mb-6">
          <div className="text-[11px] font-bold text-[#8C8980] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#D97757]" />
            <span>Evaluation Prompt Given to Models:</span>
          </div>
          <div className="font-mono-anthropic text-xs text-[#141413] dark:text-[#FAF9F5] whitespace-pre-wrap bg-white/60 dark:bg-[#1F1E1B]/60 p-3 rounded-xl border border-[#E6E4DC]/60 dark:border-[#2E2D29]/60">
            {diffData.prompt}
          </div>
        </div>

        {/* Side-by-Side Split View */}
        {viewMode === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Claude Opus 5 Output Card */}
            <div className="rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E6E4DC] dark:border-[#2E2D29]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9E9A90]"></span>
                    <h3 className="font-serif-anthropic text-lg font-bold text-[#141413] dark:text-[#FAF9F5]">
                      Claude Opus 5
                    </h3>
                  </div>
                  <span className="text-xs text-[#8C8980] font-mono">
                    {diffData.opus5.stats.tokens} tokens
                  </span>
                </div>

                <div className="font-mono-anthropic text-xs leading-relaxed text-[#474541] dark:text-[#C5C2BA] whitespace-pre-wrap">
                  {diffData.opus5.text}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E6E4DC] dark:border-[#2E2D29] text-xs">
                <span className="text-[#8C8980] block mb-0.5">Communication Quality:</span>
                <span className="text-[#686660] dark:text-[#A09E96]">
                  {diffData.opus5.stats.clarity}
                </span>
              </div>
            </div>

            {/* Claude Opus 5.5 Output Card (Terracotta Accent) */}
            <div className="rounded-2xl bg-[#FBF0EC]/30 dark:bg-[#251E1A] border-2 border-[#D97757]/40 p-6 shadow-sm flex flex-col justify-between relative">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#D97757] text-white">
                  <Sparkles className="w-3 h-3" /> Opus 5.5 Advantage
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#D97757]/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D97757]"></span>
                  <h3 className="font-serif-anthropic text-lg font-bold text-[#D97757]">
                    Claude Opus 5.5
                  </h3>
                  <span className="text-xs text-[#8C8980] font-mono ml-auto mr-32 sm:mr-36">
                    {diffData.opus55.stats.tokens} tokens (-36%)
                  </span>
                </div>

                <div className="font-mono-anthropic text-xs leading-relaxed text-[#141413] dark:text-[#FAF9F5] whitespace-pre-wrap">
                  {diffData.opus55.text}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D97757]/20 text-xs">
                <span className="text-[#D97757] font-semibold block mb-0.5">Communication Quality:</span>
                <span className="text-[#141413] dark:text-[#FAF9F5] font-medium">
                  {diffData.opus55.stats.clarity}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Single Tab View */
          <div className="mb-12">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTabModel('opus55')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                  activeTabModel === 'opus55'
                    ? 'bg-[#D97757] text-white'
                    : 'bg-[#F2EDE4] dark:bg-[#22211F] text-[#686660]'
                }`}
              >
                Claude Opus 5.5 (Recommended)
              </button>
              <button
                onClick={() => setActiveTabModel('opus5')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                  activeTabModel === 'opus5'
                    ? 'bg-[#141413] text-white dark:bg-[#FAF9F5] dark:text-[#141413]'
                    : 'bg-[#F2EDE4] dark:bg-[#22211F] text-[#686660]'
                }`}
              >
                Claude Opus 5
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29]">
              <div className="font-mono-anthropic text-xs leading-relaxed whitespace-pre-wrap mb-4">
                {activeTabModel === 'opus55' ? diffData.opus55.text : diffData.opus5.text}
              </div>
              <div className="text-xs text-[#8C8980] pt-3 border-t border-[#E6E4DC] dark:border-[#2E2D29]">
                Token count: {activeTabModel === 'opus55' ? diffData.opus55.stats.tokens : diffData.opus5.stats.tokens}
              </div>
            </div>
          </div>
        )}

        {/* Customer Feedback on Communication */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {commQuotes.slice(0, 3).map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] text-xs">
              <p className="font-serif-anthropic text-sm text-[#141413] dark:text-[#FAF9F5] mb-3 italic">
                "{item.quote.slice(0, 160)}..."
              </p>
              <div className="font-semibold text-[#141413] dark:text-[#FAF9F5]">
                {item.author}
              </div>
              <div className="text-[#8C8980]">
                {item.role}, {item.company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
