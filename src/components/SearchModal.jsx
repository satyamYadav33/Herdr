import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, BookOpen, BarChart3, DollarSign, Shield, Code } from 'lucide-react';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  const searchIndex = [
    { title: 'Overview & Key Upgrades', desc: 'Summary of Claude Opus 5.5 release, 40% cost reduction, and 30% faster output generation.', href: '#introduction', icon: BookOpen },
    { title: 'Benchmark Results Grid', desc: 'Terminal-Bench 4.0 (66.4%), FrontierCode (54.4%), CursorBench, GDPval-AA, and HLE.', href: '#benchmarks', icon: BarChart3 },
    { title: 'Cost vs. Accuracy Curves', desc: 'Interactive plots comparing Opus 5.5 vs Fable 5.1 and GPT-6 Astra across effort levels.', href: '#benchmarks', icon: BarChart3 },
    { title: 'API Pricing & Cache Discounts', desc: '$0.20/M cache reads (60% off), $4 input, $20 output, and Fast Mode details.', href: '#pricing', icon: DollarSign },
    { title: 'Interactive ROI Cost Calculator', desc: 'Estimate monthly organization savings based on token usage and cache hit ratio.', href: '#pricing', icon: DollarSign },
    { title: 'Agentic Coding & HAProxy Case Study', desc: 'Translating HAProxy C to Rust in 9.5 hours, 680k-line migration, and 200k-line audits.', href: '#coding', icon: Code },
    { title: 'Communication Side-by-Side Diff', desc: 'Comparison of Opus 5 vs Opus 5.5 on bug explanations, Slack summaries, and code designs.', href: '#communication', icon: Code },
    { title: 'Safety, Alignment & Pacing the Frontier', desc: 'Dario Amodei pacing manifesto, 85% drop in sandbox escapes, and METR audits.', href: '#safety', icon: Shield },
    { title: 'Life Sciences & Cyber Verification', desc: 'Vetted verification programs for Dyno Therapeutics biology research and cyber defense.', href: '#safety', icon: Shield },
    { title: 'Opus 5.5 Prompting Strategy Guide', desc: 'Architectural changes, always-on adaptive thinking, and defining done criteria.', href: '#prompting-guide', icon: BookOpen },
    { title: 'Effort Calibration Matrix (Low to Max)', desc: 'How to use the effort parameter instead of manual token budgets.', href: '#prompting-guide', icon: BookOpen },
    { title: 'Ready-to-Use Production Prompt Templates', desc: 'Copyable XML-formatted prompts for unattended migration, quant analysis, and audits.', href: '#prompting-guide', icon: BookOpen },
  ];

  const results = searchIndex.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose(); else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#1C1B19] rounded-2xl border border-[#E6E4DC] dark:border-[#2E2D29] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E6E4DC] dark:border-[#2E2D29] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#D97757]" />
          <input
            type="text"
            placeholder="Search Claude Opus 5.5 release (e.g. 'prompting', 'pricing', 'HAProxy', 'benchmarks')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-[#141413] dark:text-[#FAF9F5] focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-[#8C8980] hover:text-[#141413] dark:hover:text-[#FAF9F5]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {results.length > 0 ? (
            results.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF9F5] dark:hover:bg-[#22211F] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#D97757]/10 text-[#D97757] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#141413] dark:text-[#FAF9F5] group-hover:text-[#D97757] transition-colors flex items-center justify-between">
                      <span>{item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#D97757]" />
                    </div>
                    <div className="text-xs text-[#686660] dark:text-[#A09E96] mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </a>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-[#8C8980]">
              No matching sections found for "{query}".
            </div>
          )}
        </div>

        <div className="p-3 bg-[#FAF9F5] dark:bg-[#181715] border-t border-[#E6E4DC] dark:border-[#2E2D29] text-[11px] text-[#8C8980] flex justify-between">
          <span>Use <strong>Esc</strong> to close</span>
          <span>Click any topic to navigate directly</span>
        </div>
      </div>
    </div>
  );
}
