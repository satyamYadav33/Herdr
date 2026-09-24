import React, { useState } from 'react';
import { OPUS_CONTENT } from '../data/opusContent';
import { DollarSign, Calculator, Zap, ArrowDownRight, Sparkles, RefreshCw } from 'lucide-react';

export default function PricingCalculator() {
  // Simulator inputs (in Millions of tokens)
  const [inputMillions, setInputMillions] = useState(25);
  const [outputMillions, setOutputMillions] = useState(5);
  const [cacheHitPercent, setCacheHitPercent] = useState(70);

  // Pricing rates
  const p55 = OPUS_CONTENT.pricing.opus55;
  const p50 = OPUS_CONTENT.pricing.opus50;

  // Effective calculations
  // Cache reads vs regular input:
  const cachedInput = inputMillions * (cacheHitPercent / 100);
  const freshInput = inputMillions * (1 - cacheHitPercent / 100);

  const cost50 = (cachedInput * p50.cacheRead) + (freshInput * p50.input) + (outputMillions * p50.output);
  const cost55 = (cachedInput * p55.cacheRead) + (freshInput * p55.input) + (outputMillions * p55.output);
  const savingsDollars = Math.max(0, cost50 - cost55);
  const savingsPercent = cost50 > 0 ? ((savingsDollars / cost50) * 100).toFixed(1) : 0;

  return (
    <section id="pricing" className="py-16 md:py-24 border-b border-[#E6E4DC] dark:border-[#2E2D29]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold text-[#D97757] uppercase tracking-wider">
            Transparent Economics
          </span>
          <h2 className="font-serif-anthropic text-3xl sm:text-4xl text-[#141413] dark:text-[#FAF9F5] mt-2 mb-4">
            Pricing, Fast Mode & Enterprise Usage
          </h2>
          <p className="font-serif-anthropic text-lg text-[#474541] dark:text-[#C5C2BA]">
            Opus 5.5 requires less compute to serve than Opus 5, and its pricing reflects that. At default settings it will cost 40% less than Opus 5 on typical workloads, driven by a 60% reduction in prompt cache read costs.
          </p>
        </div>

        {/* Pricing Comparison Table (Anthropic Official Format) */}
        <div className="rounded-2xl border border-[#E6E4DC] dark:border-[#2E2D29] bg-white dark:bg-[#1C1B19] shadow-sm overflow-hidden mb-12">
          <div className="p-5 border-b border-[#E6E4DC] dark:border-[#2E2D29] bg-[#FAF9F5] dark:bg-[#181715] flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#141413] dark:text-[#FAF9F5]">
              Standard API Pricing
            </h3>
            <span className="text-xs font-medium text-[#686660] dark:text-[#A09E96]">
              Per 1M tokens (USD)
            </span>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E6E4DC] dark:border-[#2E2D29] text-xs font-semibold text-[#686660] dark:text-[#A09E96] uppercase tracking-wider">
                <th className="py-3 px-6">Token Type</th>
                <th className="py-3 px-6 text-[#D97757] bg-[#D97757]/5 font-bold">Claude Opus 5.5</th>
                <th className="py-3 px-6">Claude Opus 5</th>
                <th className="py-3 px-6 text-right">Cost Reduction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E4DC] dark:divide-[#2E2D29] text-sm">
              <tr className="hover:bg-[#FAF9F5]/70 dark:hover:bg-[#22211F]/70">
                <td className="py-3.5 px-6 font-medium text-[#141413] dark:text-[#FAF9F5]">
                  Cache reads
                </td>
                <td className="py-3.5 px-6 font-bold text-[#D97757] bg-[#D97757]/5">
                  $0.20
                </td>
                <td className="py-3.5 px-6 text-[#686660] dark:text-[#A09E96]">
                  $0.50
                </td>
                <td className="py-3.5 px-6 text-right text-[#10A37F] font-semibold">
                  -60%
                </td>
              </tr>

              <tr className="hover:bg-[#FAF9F5]/70 dark:hover:bg-[#22211F]/70">
                <td className="py-3.5 px-6 font-medium text-[#141413] dark:text-[#FAF9F5]">
                  Input tokens
                </td>
                <td className="py-3.5 px-6 font-bold text-[#D97757] bg-[#D97757]/5">
                  $4.00
                </td>
                <td className="py-3.5 px-6 text-[#686660] dark:text-[#A09E96]">
                  $5.00
                </td>
                <td className="py-3.5 px-6 text-right text-[#10A37F] font-semibold">
                  -20%
                </td>
              </tr>

              <tr className="hover:bg-[#FAF9F5]/70 dark:hover:bg-[#22211F]/70">
                <td className="py-3.5 px-6 font-medium text-[#141413] dark:text-[#FAF9F5]">
                  Output tokens
                </td>
                <td className="py-3.5 px-6 font-bold text-[#D97757] bg-[#D97757]/5">
                  $20.00
                </td>
                <td className="py-3.5 px-6 text-[#686660] dark:text-[#A09E96]">
                  $25.00
                </td>
                <td className="py-3.5 px-6 text-right text-[#10A37F] font-semibold">
                  -20%
                </td>
              </tr>

              <tr className="hover:bg-[#FAF9F5]/70 dark:hover:bg-[#22211F]/70">
                <td className="py-3.5 px-6 font-medium text-[#141413] dark:text-[#FAF9F5]">
                  Cache writes
                </td>
                <td className="py-3.5 px-6 font-bold text-[#D97757] bg-[#D97757]/5">
                  $5.00
                </td>
                <td className="py-3.5 px-6 text-[#686660] dark:text-[#A09E96]">
                  $6.25
                </td>
                <td className="py-3.5 px-6 text-right text-[#10A37F] font-semibold">
                  -20%
                </td>
              </tr>
            </tbody>
          </table>

          {/* Fast Mode & Plan Perqs footer */}
          <div className="p-4 bg-[#F2EDE4]/60 dark:bg-[#181715] border-t border-[#E6E4DC] dark:border-[#2E2D29] text-xs text-[#686660] dark:text-[#A09E96] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#D97757]" />
              <span><strong>Fast Mode:</strong> Available in Claude Code & Platform at up to 2.5x speed ($8/M in, $40/M out).</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-[#6A7862]" />
              <span><strong>Rate Limit Reset:</strong> Saveable reset token included for Pro, Max, Team, & Enterprise.</span>
            </div>
          </div>
        </div>

        {/* Interactive ROI & Token Simulator */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-white to-[#FAF6F0] dark:from-[#1C1B19] dark:to-[#141413] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
          <div className="flex items-center gap-2 text-[#D97757] mb-2 font-medium text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Interactive Workload Cost Calculator</span>
          </div>
          <h3 className="font-serif-anthropic text-2xl text-[#141413] dark:text-[#FAF9F5] mb-2">
            Calculate Your Organization's Monthly Savings
          </h3>
          <p className="text-xs sm:text-sm text-[#686660] dark:text-[#A09E96] mb-8">
            Adjust the sliders below to model your team's API token usage across agents, coding sessions, and continuous integrations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Input Tokens Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-[#141413] dark:text-[#FAF9F5]">Input Tokens:</span>
                <span className="text-[#D97757] font-mono">{inputMillions}M / month</span>
              </div>
              <input
                type="range"
                min="1"
                max="200"
                value={inputMillions}
                onChange={(e) => setInputMillions(Number(e.target.value))}
                className="w-full h-2 bg-[#E6E4DC] dark:bg-[#2E2D29] rounded-lg appearance-none cursor-pointer accent-[#D97757]"
              />
              <span className="text-[10px] text-[#8C8980]">Includes multi-turn history & repository files</span>
            </div>

            {/* Output Tokens Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-[#141413] dark:text-[#FAF9F5]">Output Tokens:</span>
                <span className="text-[#D97757] font-mono">{outputMillions}M / month</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={outputMillions}
                onChange={(e) => setOutputMillions(Number(e.target.value))}
                className="w-full h-2 bg-[#E6E4DC] dark:bg-[#2E2D29] rounded-lg appearance-none cursor-pointer accent-[#D97757]"
              />
              <span className="text-[10px] text-[#8C8980]">Generated code diffs and reasoning answers</span>
            </div>

            {/* Cache Hit Ratio Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-[#141413] dark:text-[#FAF9F5]">Cache Hit Ratio:</span>
                <span className="text-[#D97757] font-mono">{cacheHitPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="95"
                step="5"
                value={cacheHitPercent}
                onChange={(e) => setCacheHitPercent(Number(e.target.value))}
                className="w-full h-2 bg-[#E6E4DC] dark:bg-[#2E2D29] rounded-lg appearance-none cursor-pointer accent-[#D97757]"
              />
              <span className="text-[10px] text-[#8C8980]">Typical agentic loops achieve 70–85% cache hit</span>
            </div>
          </div>

          {/* Results Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#F7F4EE] dark:bg-[#181715] border border-[#E6E4DC] dark:border-[#2E2D29]">
            <div>
              <span className="text-xs text-[#8C8980] block mb-1">Opus 5 Cost</span>
              <span className="font-serif-anthropic text-2xl font-bold text-[#686660] dark:text-[#A09E96]">
                ${cost50.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div>
              <span className="text-xs text-[#8C8980] block mb-1">Opus 5.5 Cost</span>
              <span className="font-serif-anthropic text-2xl font-bold text-[#141413] dark:text-[#FAF9F5]">
                ${cost55.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="sm:border-l sm:border-[#E6E4DC] dark:sm:border-[#2E2D29] sm:pl-4">
              <span className="text-xs text-[#D97757] font-semibold block mb-1">Your Total Savings</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif-anthropic text-2xl font-bold text-[#D97757]">
                  ${savingsDollars.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-semibold text-[#10A37F] bg-[#10A37F]/10 px-2 py-0.5 rounded-full">
                  -{savingsPercent}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
