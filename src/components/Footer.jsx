import React from 'react';
import { ArrowUpRight, ShieldCheck, Terminal, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="availability" className="bg-[#FAF9F5] dark:bg-[#141413] pt-16 pb-12 border-t border-[#E6E4DC] dark:border-[#2E2D29]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Availability Announcement Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#D97757] uppercase tracking-wider block mb-2">
              (6) Global Availability
            </span>
            <h3 className="font-serif-anthropic text-2xl sm:text-3xl text-[#141413] dark:text-[#FAF9F5] mb-2">
              Deploy Claude Opus 5.5 Today
            </h3>
            <p className="text-sm text-[#686660] dark:text-[#A09E96] leading-relaxed">
              Claude Opus 5.5 is now available across the Claude Platform, Amazon Web Services (Amazon Bedrock), Google Cloud (Vertex AI), and Microsoft Foundry under model ID <code className="px-2 py-0.5 rounded bg-[#F2EDE4] dark:bg-[#282724] text-[#D97757] font-mono text-xs font-semibold">claude-opus-5-5</code>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://console.anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#141413] text-[#FAF9F5] dark:bg-[#FAF9F5] dark:text-[#141413] hover:bg-[#2D2B27] dark:hover:bg-[#E5DED3] transition-colors shadow-sm"
            >
              Get API Keys
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#D97757] text-white hover:bg-[#C26547] transition-colors shadow-sm"
            >
              Open in Claude Web
              <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Global Navigation Directory */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16 text-xs">
          {/* Column 1: Products */}
          <div>
            <h4 className="font-semibold text-xs text-[#141413] dark:text-[#FAF9F5] uppercase tracking-wider mb-3">
              Products
            </h4>
            <ul className="space-y-2 text-[#686660] dark:text-[#A09E96]">
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude Code</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude Code Enterprise</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude Cowork</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude Design</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude Science</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude Security</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude in Chrome</a></li>
            </ul>
          </div>

          {/* Column 2: Models */}
          <div>
            <h4 className="font-semibold text-xs text-[#141413] dark:text-[#FAF9F5] uppercase tracking-wider mb-3">
              Models
            </h4>
            <ul className="space-y-2 text-[#686660] dark:text-[#A09E96]">
              <li><a href="#" className="text-[#D97757] font-semibold">Claude Opus 5.5</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude Fable 5.1</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude Mythos 5.1</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude Sonnet 5.5 (Soon)</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude Haiku 5.5 (Soon)</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude Opus 5</a></li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <h4 className="font-semibold text-xs text-[#141413] dark:text-[#FAF9F5] uppercase tracking-wider mb-3">
              Solutions
            </h4>
            <ul className="space-y-2 text-[#686660] dark:text-[#A09E96]">
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">AI Agents</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Code Modernization</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Cybersecurity</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Enterprise Finance</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Life Sciences</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Legal & Compliance</a></li>
            </ul>
          </div>

          {/* Column 4: Platform */}
          <div>
            <h4 className="font-semibold text-xs text-[#141413] dark:text-[#FAF9F5] uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-[#686660] dark:text-[#A09E96]">
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Developer Console</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">API Documentation</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Prompting Guide</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude on AWS</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Google Cloud Vertex AI</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Microsoft Foundry</a></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="font-semibold text-xs text-[#141413] dark:text-[#FAF9F5] uppercase tracking-wider mb-3">
              Company & Safety
            </h4>
            <ul className="space-y-2 text-[#686660] dark:text-[#A09E96]">
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">About Anthropic</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Pacing the Frontier</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Responsible Scaling Policy</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Claude's Constitution</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">System Card: Opus 5.5</a></li>
              <li><a href="#" className="hover:text-[#141413] dark:hover:text-[#FAF9F5]">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-[#E6E4DC] dark:border-[#2E2D29] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C8980] gap-4">
          <div className="flex items-center gap-4">
            <span>© 2026 Anthropic PBC</span>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Responsible Disclosure</a>
          </div>

          <div className="flex items-center gap-1.5 text-[#686660] dark:text-[#A09E96]">
            <span>Rebuilt with fidelity from official Anthropic release communications</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
