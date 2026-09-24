import React, { useState } from 'react';
import { OPUS_CONTENT } from '../data/opusContent';
import { Trophy, Filter, Info, CheckCircle2 } from 'lucide-react';

export default function BenchmarkGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Agentic coding', 'Knowledge work', 'Business workflows', 'Multidisciplinary reasoning', 'Computer use'];

  const filteredBenchmarks = selectedCategory === 'All' 
    ? OPUS_CONTENT.benchmarks 
    : OPUS_CONTENT.benchmarks.filter(b => b.category === selectedCategory);

  return (
    <section id="benchmarks" className="py-16 md:py-24 border-b border-[#E6E4DC] dark:border-[#2E2D29]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold text-[#D97757] uppercase tracking-wider">
            (2) Performance and Cost-Effectiveness
          </span>
          <h2 className="font-serif-anthropic text-3xl sm:text-4xl text-[#141413] dark:text-[#FAF9F5] mt-2 mb-4">
            Benchmark Evaluations Across Frontier Workloads
          </h2>
          <p className="font-serif-anthropic text-lg sm:text-xl text-[#474541] dark:text-[#C5C2BA] leading-relaxed">
            On our benchmarks, Claude Opus 5.5 leads in agentic coding, computer use, and knowledge work. That said, at these levels of capability we’ve found that benchmark margins have become a less reliable guide to real-world differences. In our own use, the gap between Opus 5.5 and Claude Fable 5.1 is narrower than these scores suggest.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-medium text-[#686660] dark:text-[#A09E96] flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#141413] text-[#FAF9F5] dark:bg-[#FAF9F5] dark:text-[#141413]'
                  : 'bg-[#F2EDE4] dark:bg-[#22211F] text-[#686660] dark:text-[#A09E96] hover:bg-[#E5DED3] dark:hover:bg-[#2D2B27]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Benchmark Table with Anthropic Peach Header Accent */}
        <div className="rounded-2xl border border-[#E6E4DC] dark:border-[#2E2D29] bg-white dark:bg-[#1C1B19] shadow-sm overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E6E4DC] dark:border-[#2E2D29] bg-[#FAF9F5] dark:bg-[#181715]">
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#686660] dark:text-[#A09E96]">
                    Benchmark & Category
                  </th>
                  <th className="py-4 px-5 text-sm font-bold text-[#D97757] bg-[#D97757]/5 border-x border-[#D97757]/20">
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-[#D97757]" />
                      <span>Opus 5.5</span>
                    </div>
                  </th>
                  <th className="py-4 px-5 text-xs font-semibold text-[#474541] dark:text-[#C5C2BA]">
                    Fable 5.1
                  </th>
                  <th className="py-4 px-5 text-xs font-semibold text-[#474541] dark:text-[#C5C2BA]">
                    Opus 5
                  </th>
                  <th className="py-4 px-5 text-xs font-semibold text-[#474541] dark:text-[#C5C2BA]">
                    GPT-6 Astra
                  </th>
                  <th className="py-4 px-5 text-xs font-semibold text-[#474541] dark:text-[#C5C2BA]">
                    GPT-5.6 Sol
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E4DC] dark:divide-[#2E2D29]">
                {filteredBenchmarks.map((item, index) => {
                  const isOpusWin = item.winner === 'opus55';
                  return (
                    <tr 
                      key={index}
                      className="hover:bg-[#FAF9F5]/70 dark:hover:bg-[#22211F]/70 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="text-xs text-[#8C8980] uppercase tracking-wider font-semibold">
                          {item.category}
                        </div>
                        <div className="text-sm font-medium text-[#141413] dark:text-[#FAF9F5] mt-0.5">
                          {item.benchmark}
                        </div>
                        {item.qualifier && (
                          <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] bg-[#F2EDE4] dark:bg-[#282724] text-[#686660] dark:text-[#A09E96]">
                            {item.qualifier}
                          </span>
                        )}
                      </td>

                      {/* Opus 5.5 (Highlighted Column) */}
                      <td className="py-4 px-5 bg-[#D97757]/5 border-x border-[#D97757]/20">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-base font-bold ${isOpusWin ? 'text-[#D97757]' : 'text-[#141413] dark:text-[#FAF9F5]'}`}>
                            {item.opus55}
                          </span>
                          {isOpusWin && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                          )}
                        </div>
                      </td>

                      {/* Fable 5.1 */}
                      <td className="py-4 px-5 text-sm font-medium text-[#686660] dark:text-[#A09E96]">
                        {item.fable51}
                      </td>

                      {/* Opus 5 */}
                      <td className="py-4 px-5 text-sm font-medium text-[#686660] dark:text-[#A09E96]">
                        {item.opus5}
                      </td>

                      {/* GPT-6 Astra */}
                      <td className={`py-4 px-5 text-sm font-medium ${item.winner === 'gpt6Astra' ? 'text-[#10A37F] font-bold' : 'text-[#686660] dark:text-[#A09E96]'}`}>
                        {item.gpt6Astra}
                      </td>

                      {/* GPT-5.6 Sol */}
                      <td className="py-4 px-5 text-sm font-medium text-[#686660] dark:text-[#A09E96]">
                        {item.gpt56Sol}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Official Benchmark Methodology Footnotes */}
        <div className="p-6 rounded-2xl bg-[#F7F4EE] dark:bg-[#181715] border border-[#E6E4DC] dark:border-[#2E2D29] text-xs text-[#686660] dark:text-[#A09E96] space-y-3 leading-relaxed">
          <div className="flex items-center gap-1.5 font-semibold text-[#141413] dark:text-[#FAF9F5] text-xs">
            <Info className="w-4 h-4 text-[#D97757]" />
            <span>Benchmark Evaluation Protocol & Guardrails Context</span>
          </div>
          <p>
            Unless otherwise noted, all Claude Opus 5.5 results use adaptive thinking at max effort. Terminal-Bench 4.0 results are reported for Claude Opus 5.5 at xhigh effort and GPT-6 Astra at high effort, as reported by OpenAI; these represent each model’s highest score. Claude Opus 5.5 was evaluated with its production safeguards enabled. When they intervened, cybersecurity tasks were completed by Claude Opus 4.8, and biology and frontier LLM development tasks were completed by Claude Opus 5. This likely reduces Claude Opus 5.5’s performance on these benchmarks.
          </p>
          <div className="pt-2 border-t border-[#E6E4DC] dark:border-[#2E2D29] space-y-1.5">
            <p>
              <strong>¹ Terminal-Bench 4.0:</strong> The standard error is ±2.6 pts for Claude Opus 5.5 and ±1.6–2 pts for the other Claude models. The public leaderboard (5 trials/task, Claude Code harness) reports Claude Opus 5 at 51.8%; our setup reproduces it at 52.3%, within noise. GPT-6 Astra and GPT-5.6 Sol figures are as reported by OpenAI.
            </p>
            <p>
              <strong>² AutomationBench:</strong> AutomationBench results were run and reported by Zapier. These runs were performed without fallback models, so safeguard interventions were considered failures—this resulted in a lower score than Claude Opus 5.5 would achieve in practice.
            </p>
            <p>
              <strong>³ Terminal-Bench-Science 0.1:</strong> The standard error is ±3.5–5 pts per model. The public leaderboard (3 trials/task, Claude Code harness) reports Claude Opus 5 at 30.0%; our setup reproduces it at 29.0%, within noise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
