import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, MessageSquareCode, Clock, Layers } from 'lucide-react';

export default function IntroductionSection() {
  return (
    <section id="introduction" className="py-16 md:py-24 border-b border-[#E6E4DC] dark:border-[#2E2D29]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-xs font-semibold text-[#D97757] uppercase tracking-wider">
            (1) Introduction & Overview
          </span>
          <h2 className="font-serif-anthropic text-3xl sm:text-4xl text-[#141413] dark:text-[#FAF9F5] mt-2 mb-6">
            A Major Step Up for Long-Horizon Intelligence
          </h2>
          <p className="font-serif-anthropic text-xl sm:text-2xl text-[#474541] dark:text-[#C5C2BA] leading-relaxed">
            We’re introducing Claude Opus 5.5, the first model in our new Claude 5.5 family. It performs at the level of Claude Fable 5.1 on most work and costs 40% less to run than Opus 5.
          </p>
        </div>

        {/* Unabridged Editorial Prose */}
        <div className="space-y-6 text-[#141413] dark:text-[#FAF9F5] font-serif-anthropic text-lg leading-relaxed">
          <p>
            Claude Opus 5.5 is our first release since we called for{' '}
            <span className="text-[#D97757] font-medium underline decoration-[#D97757]/40">
              pacing the frontier
            </span>. It was tested before release by external evaluators, including{' '}
            <span className="font-medium">Frontier Design</span> and{' '}
            <span className="font-medium">METR</span>. On our automated behavioral audit, the most comprehensive alignment test we run, Opus 5.5 is the strongest-performing model we’ve tested to date. It also comes with the safeguards we’ve developed for our most capable models.
          </p>

          <p className="text-xl font-medium text-[#141413] dark:text-[#FAF9F5] pt-2">
            Here are some of the improvements you can expect from Opus 5.5:
          </p>

          {/* Core Feature Deep-Dives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 font-sans-anthropic">
            {/* 1. Performance */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm hover:border-[#D97757]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#D97757]/10 flex items-center justify-center text-[#D97757] mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#141413] dark:text-[#FAF9F5] mb-2">
                1. Performance
              </h3>
              <p className="text-sm text-[#686660] dark:text-[#A09E96] leading-relaxed mb-4">
                Opus 5.5 is a major step up from Opus 5. It’s the new leading model, and early testers saw large jumps in performance on their most complex work:
              </p>
              <ul className="space-y-2 text-xs text-[#474541] dark:text-[#C5C2BA]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D97757] shrink-0 mt-0.5" />
                  <span><strong>680,000-line migration:</strong> Completed in less than a day by an early tester—work that would have taken an engineering team weeks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D97757] shrink-0 mt-0.5" />
                  <span><strong>Web app load time optimization:</strong> Succeeded 39 out of 40 times without altering app behavior, whereas Opus 5 made minor improvements that altered behavior.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D97757] shrink-0 mt-0.5" />
                  <span><strong>Single-prompt game creation:</strong> Scored higher than any other model on visual polish, physics, and gameplay mechanics.</span>
                </li>
              </ul>
            </div>

            {/* 2. Safety & Containment */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm hover:border-[#D97757]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#6A7862]/10 flex items-center justify-center text-[#6A7862] dark:text-[#8E9F85] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#141413] dark:text-[#FAF9F5] mb-2">
                2. Safety & Alignment
              </h3>
              <p className="text-sm text-[#686660] dark:text-[#A09E96] leading-relaxed mb-4">
                Opus 5.5 achieves the highest scores of any model to date on Anthropic’s automated behavioral audit across thousands of simulated scenarios:
              </p>
              <ul className="space-y-2 text-xs text-[#474541] dark:text-[#C5C2BA]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6A7862] shrink-0 mt-0.5" />
                  <span><strong>85% Reduction in boundary violations:</strong> Less likely to take hard-to-reverse actions or attempt sandbox escapes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6A7862] shrink-0 mt-0.5" />
                  <span><strong>Prompt injection resistance:</strong> Ties Fable 5.1 for the lowest injection success rate tested by Gray Swan security.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6A7862] shrink-0 mt-0.5" />
                  <span><strong>Vetted verification programs:</strong> Life Sciences and Cyber Verification programs provide specialized safeguards for biology and cyber defense.</span>
                </li>
              </ul>
            </div>

            {/* 3. Cost & Speed */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm hover:border-[#D97757]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#DE8B59]/10 flex items-center justify-center text-[#DE8B59] mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#141413] dark:text-[#FAF9F5] mb-2">
                3. Cost & Speed
              </h3>
              <p className="text-sm text-[#686660] dark:text-[#A09E96] leading-relaxed mb-4">
                Opus 5.5 requires less compute to serve than Opus 5, resulting in major price reductions across the board:
              </p>
              <ul className="space-y-2 text-xs text-[#474541] dark:text-[#C5C2BA]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DE8B59] shrink-0 mt-0.5" />
                  <span><strong>40% Cost drop:</strong> Reduced per-token prices ($4 in / $20 out) paired with lower token consumption per task.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DE8B59] shrink-0 mt-0.5" />
                  <span><strong>60% Cheaper cache reads:</strong> Now just $0.20 per million tokens (the main driver for agentic coding cost savings).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DE8B59] shrink-0 mt-0.5" />
                  <span><strong>Fast Mode:</strong> Up to 2.5x speed available in Claude Code and Claude Platform ($8 in / $40 out).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DE8B59] shrink-0 mt-0.5" />
                  <span><strong>Rate Limit Reset:</strong> Subscription users receive a rate limit reset token to save and use on demand.</span>
                </li>
              </ul>
            </div>

            {/* 4. Communication */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm hover:border-[#D97757]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#7B61FF]/10 flex items-center justify-center text-[#7B61FF] mb-4">
                <MessageSquareCode className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#141413] dark:text-[#FAF9F5] mb-2">
                4. Communication
              </h3>
              <p className="text-sm text-[#686660] dark:text-[#A09E96] leading-relaxed mb-4">
                Major improvements in writing clarity based on community feedback regarding Opus 5’s verbosity:
              </p>
              <ul className="space-y-2 text-xs text-[#474541] dark:text-[#C5C2BA]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7B61FF] shrink-0 mt-0.5" />
                  <span><strong>Puts key information first:</strong> Bottom-line results, financial deltas, and bug causes appear right at the top.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7B61FF] shrink-0 mt-0.5" />
                  <span><strong>Less jargon & postscripts:</strong> Eliminates boilerplate conversation fillers and unrequested essays.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7B61FF] shrink-0 mt-0.5" />
                  <span><strong>"It writes the way I do":</strong> Easy to follow and check during multi-turn pairings, aiding safety and auditability.</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="italic text-[#686660] dark:text-[#A09E96]">
            Claude Sonnet 5.5 and Claude Haiku 5.5 will follow in the coming weeks, bringing many of the same improvements to performance, efficiency, and safety.
          </p>
        </div>
      </div>
    </section>
  );
}
