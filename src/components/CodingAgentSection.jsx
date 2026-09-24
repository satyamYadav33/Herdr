import React, { useState } from 'react';
import { OPUS_CONTENT } from '../data/opusContent';
import { Terminal, Code2, ShieldAlert, Cpu, GitCommit, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function CodingAgentSection() {
  const codingQuotes = OPUS_CONTENT.testimonials.filter(t => 
    ['Agentic Coding', 'Autonomous Migration', 'Full-Stack Dev', 'Code Review & Git', 'Enterprise Speedup', 'Quantitative Finance', 'Cloud Infrastructure'].includes(t.tag)
  );

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % codingQuotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + codingQuotes.length) % codingQuotes.length);
  };

  const quote = codingQuotes[currentQuoteIndex];

  return (
    <section id="coding" className="py-16 md:py-24 border-b border-[#E6E4DC] dark:border-[#2E2D29]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold text-[#D97757] uppercase tracking-wider">
            (3) Agentic Coding & Autonomous Workflows
          </span>
          <h2 className="font-serif-anthropic text-3xl sm:text-4xl text-[#141413] dark:text-[#FAF9F5] mt-2 mb-4">
            Built for Sprawling, Multi-Repository Engineering
          </h2>
          <p className="font-serif-anthropic text-lg sm:text-xl text-[#474541] dark:text-[#C5C2BA] leading-relaxed">
            Opus 5.5 is particularly good at long and sprawling jobs like codebase-wide migrations and audits. It delivers frontier results on agentic coding at a fraction of the cost and with radically less developer intervention.
          </p>
        </div>

        {/* Real-World Engineering Case Studies Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* HAProxy C to Rust Case Study */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D97757] uppercase tracking-wider mb-2">
              <Code2 className="w-4 h-4" />
              <span>Internal Benchmark Case Study</span>
            </div>
            <h3 className="font-serif-anthropic text-xl text-[#141413] dark:text-[#FAF9F5] mb-3">
              Translating HAProxy from C into Rust
            </h3>
            <p className="text-sm text-[#686660] dark:text-[#A09E96] leading-relaxed mb-4">
              Anthropic tasked Opus 5.5 and Fable 5.1 with translating HAProxy—the ubiquitous, high-performance load balancer—from C into safe Rust. Both rewrites passed nearly all of HAProxy's rigorous regression tests.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E6E4DC] dark:border-[#2E2D29] text-xs">
              <div>
                <span className="text-[#8C8980]">Completion Time:</span>
                <div className="font-serif-anthropic text-lg font-bold text-[#141413] dark:text-[#FAF9F5]">
                  9.5 Hours <span className="text-xs font-sans text-[#10A37F] font-normal">(-21% vs Fable)</span>
                </div>
              </div>
              <div>
                <span className="text-[#8C8980]">Task Cost:</span>
                <div className="font-serif-anthropic text-lg font-bold text-[#D97757]">
                  51% Lower <span className="text-xs font-sans text-[#8C8980] font-normal">than Fable 5.1</span>
                </div>
              </div>
            </div>
          </div>

          {/* 200,000-Line Codebase Audit */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D97757] uppercase tracking-wider mb-2">
              <GitCommit className="w-4 h-4" />
              <span>Early Tester Evaluation</span>
            </div>
            <h3 className="font-serif-anthropic text-xl text-[#141413] dark:text-[#FAF9F5] mb-3">
              200,000-Line Codebase Audit & Fix
            </h3>
            <p className="text-sm text-[#686660] dark:text-[#A09E96] leading-relaxed mb-4">
              An enterprise partner deployed Opus 5.5 to audit, diagnose, and fix an active 200,000-line production repository. Opus 5 had previously taken over 20 hours and used 2.5x as many tokens for partial completion.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E6E4DC] dark:border-[#2E2D29] text-xs">
              <div>
                <span className="text-[#8C8980]">Total Duration:</span>
                <div className="font-serif-anthropic text-lg font-bold text-[#141413] dark:text-[#FAF9F5]">
                  &lt; 3 Hours <span className="text-xs font-sans text-[#10A37F] font-normal">(vs 20h)</span>
                </div>
              </div>
              <div>
                <span className="text-[#8C8980]">Token Consumption:</span>
                <div className="font-serif-anthropic text-lg font-bold text-[#D97757]">
                  60% Fewer <span className="text-xs font-sans text-[#8C8980] font-normal">Tokens</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Most Secure Coding Agent Feature Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F4EE] dark:bg-[#181715] border border-[#E6E4DC] dark:border-[#2E2D29] mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6A7862] dark:text-[#8E9F85] uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Enterprise Security Architecture</span>
          </div>
          <h3 className="font-serif-anthropic text-2xl text-[#141413] dark:text-[#FAF9F5] mb-3">
            The Most Secure Autonomous Coding Agent
          </h3>
          <p className="text-sm text-[#686660] dark:text-[#A09E96] leading-relaxed mb-4">
            Enterprises deploying agents within internal systems need to know that agents operate strictly as intended over hours of unattended execution. Opus 5.5 features a pre-execution classifier that screens every command, an auditable open-source sandbox, and automated code review that blocks security regressions before commits merge.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
            <div className="p-3 bg-white dark:bg-[#1F1E1B] rounded-xl border border-[#E6E4DC] dark:border-[#2E2D29]">
              <span className="text-[#D97757] font-bold block mb-1">Pre-Action Classifier</span>
              <span className="text-[#686660] dark:text-[#A09E96]">Inspects tool arguments, shell commands, and file paths before execution.</span>
            </div>
            <div className="p-3 bg-white dark:bg-[#1F1E1B] rounded-xl border border-[#E6E4DC] dark:border-[#2E2D29]">
              <span className="text-[#D97757] font-bold block mb-1">Prompt Injection Shield</span>
              <span className="text-[#686660] dark:text-[#A09E96]">Ties Fable 5.1 for the lowest injection success rate in Gray Swan security audits.</span>
            </div>
            <div className="p-3 bg-white dark:bg-[#1F1E1B] rounded-xl border border-[#E6E4DC] dark:border-[#2E2D29]">
              <span className="text-[#D97757] font-bold block mb-1">Auditable Sandbox</span>
              <span className="text-[#686660] dark:text-[#A09E96]">Complete isolation of network and filesystem access for long-running workflows.</span>
            </div>
          </div>
        </div>

        {/* Customer Testimonial Carousel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Quote className="w-5 h-5 text-[#D97757]" />
              <span className="text-xs font-semibold text-[#8C8980] uppercase tracking-wider">
                Engineering Leader Experiences ({currentQuoteIndex + 1}/{codingQuotes.length})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevQuote}
                className="p-1.5 rounded-full border border-[#E6E4DC] dark:border-[#2E2D29] hover:bg-[#F2EDE4] dark:hover:bg-[#282724] text-[#141413] dark:text-[#FAF9F5] transition-colors"
                aria-label="Previous quote"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextQuote}
                className="p-1.5 rounded-full border border-[#E6E4DC] dark:border-[#2E2D29] hover:bg-[#F2EDE4] dark:hover:bg-[#282724] text-[#141413] dark:text-[#FAF9F5] transition-colors"
                aria-label="Next quote"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <blockquote className="font-serif-anthropic text-lg sm:text-xl text-[#141413] dark:text-[#FAF9F5] leading-relaxed mb-6 italic">
            "{quote.quote}"
          </blockquote>

          <div className="flex items-center justify-between pt-4 border-t border-[#E6E4DC] dark:border-[#2E2D29]">
            <div>
              <div className="font-semibold text-sm text-[#141413] dark:text-[#FAF9F5]">
                {quote.author}
              </div>
              <div className="text-xs text-[#686660] dark:text-[#A09E96]">
                {quote.role}, <span className="font-medium text-[#141413] dark:text-[#FAF9F5]">{quote.company}</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#D97757]/10 text-[#D97757] border border-[#D97757]/20">
              {quote.tag}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
