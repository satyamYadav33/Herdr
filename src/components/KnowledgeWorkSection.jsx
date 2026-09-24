import React, { useState } from 'react';
import { OPUS_CONTENT } from '../data/opusContent';
import { Briefcase, TrendingUp, Search, FileSpreadsheet, Award, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function KnowledgeWorkSection() {
  const knowledgeQuotes = OPUS_CONTENT.testimonials.filter(t => 
    ['Quant Research', 'Code Audit & Consulting', 'Enterprise Content', 'Cloud Infrastructure'].includes(t.tag) ||
    ['Walleye Capital', 'Deloitte Consulting LLP', 'Rogo', 'LexisNexis Legal & Professional', 'Hex', 'Thomson Reuters Labs', 'Hebbia', 'Viktor'].some(c => t.company.includes(c))
  );

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % knowledgeQuotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + knowledgeQuotes.length) % knowledgeQuotes.length);
  };

  const activeQuote = knowledgeQuotes[currentQuoteIndex];

  return (
    <section className="py-16 md:py-24 border-b border-[#E6E4DC] dark:border-[#2E2D29] bg-[#FAF9F5] dark:bg-[#141413]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold text-[#D97757] uppercase tracking-wider">
            High-Stakes Reasoning
          </span>
          <h2 className="font-serif-anthropic text-3xl sm:text-4xl text-[#141413] dark:text-[#FAF9F5] mt-2 mb-4">
            Knowledge Work, Finance & Professional Analysis
          </h2>
          <p className="font-serif-anthropic text-lg sm:text-xl text-[#474541] dark:text-[#C5C2BA] leading-relaxed">
            Opus 5.5 is a reliable and adept researcher. In rigorous evaluations measuring citation accuracy, quantitative modeling, and legal statutory analysis, it digs past the first plausible answer without hallucinating figures.
          </p>
        </div>

        {/* Highlighted Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Research & Anti-Hallucination Audit */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D97757] uppercase tracking-wider mb-2">
              <Search className="w-4 h-4" />
              <span>Earnings Research & Factuality</span>
            </div>
            <h3 className="font-serif-anthropic text-xl text-[#141413] dark:text-[#FAF9F5] mb-2">
              16 of 18 Reports Cleared 0-Hallucination Bar
            </h3>
            <p className="text-sm text-[#686660] dark:text-[#A09E96] leading-relaxed mb-4">
              Anthropic tested Opus 5.5, Fable 5.1, and Opus 5 on extracting obscure corporate quarterly performance where the release was buried. Automated graders verified every figure and citation. Any single hallucinated quote or number meant instant failure.
            </p>
            <div className="p-3 rounded-xl bg-[#FAF9F5] dark:bg-[#1F1E1B] text-xs space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-[#D97757]">Opus 5.5:</span>
                <span>16 / 18 Cleared (88.9%)</span>
              </div>
              <div className="flex justify-between text-[#8C8980]">
                <span>Fable 5.1 & Opus 5:</span>
                <span>0 / 18 Cleared (0%)</span>
              </div>
            </div>
          </div>

          {/* M&A Financial Modeling (Excel + Deck) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D97757] uppercase tracking-wider mb-2">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Financial Modeling & Analysis</span>
            </div>
            <h3 className="font-serif-anthropic text-xl text-[#141413] dark:text-[#FAF9F5] mb-2">
              Complex M&A Valuation & Executive Deck
            </h3>
            <p className="text-sm text-[#686660] dark:text-[#A09E96] leading-relaxed mb-4">
              Tasked with evaluating a multi-billion dollar merger between two HR software providers, Opus 5.5 built a comprehensive financial model in Excel and drafted an executive presentation on deal terms.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-[#E6E4DC] dark:border-[#2E2D29]">
              <div>
                <span className="text-[#8C8980]">Time to Complete:</span>
                <div className="font-serif-anthropic text-lg font-bold text-[#141413] dark:text-[#FAF9F5]">
                  63 Minutes <span className="text-xs font-sans text-[#10A37F] font-normal">(-32% vs Opus 5)</span>
                </div>
              </div>
              <div>
                <span className="text-[#8C8980]">Cost to Produce:</span>
                <div className="font-serif-anthropic text-lg font-bold text-[#D97757]">
                  50% Less <span className="text-xs font-sans text-[#8C8980] font-normal">Cost</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge Work Testimonial Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Quote className="w-5 h-5 text-[#D97757]" />
              <span className="text-xs font-semibold text-[#8C8980] uppercase tracking-wider">
                Industry Partner Feedback ({currentQuoteIndex + 1}/{knowledgeQuotes.length})
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
            "{activeQuote.quote}"
          </blockquote>

          <div className="flex items-center justify-between pt-4 border-t border-[#E6E4DC] dark:border-[#2E2D29]">
            <div>
              <div className="font-semibold text-sm text-[#141413] dark:text-[#FAF9F5]">
                {activeQuote.author}
              </div>
              <div className="text-xs text-[#686660] dark:text-[#A09E96]">
                {activeQuote.role}, <span className="font-medium text-[#141413] dark:text-[#FAF9F5]">{activeQuote.company}</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#6A7862]/10 text-[#6A7862] dark:text-[#8E9F85] border border-[#6A7862]/20">
              {activeQuote.tag}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
