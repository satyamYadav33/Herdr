import React, { useState } from 'react';
import { OPUS_CONTENT } from '../data/opusContent';
import { 
  BookOpen, 
  Terminal, 
  Sliders, 
  Copy, 
  Check, 
  AlertTriangle, 
  Layers, 
  Target, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Cpu, 
  Code
} from 'lucide-react';

export default function PromptingGuideSection() {
  const { promptingGuide } = OPUS_CONTENT;
  const [selectedEffort, setSelectedEffort] = useState('medium (Default)');
  const [selectedTemplateId, setSelectedTemplateId] = useState('unattended-migration');
  const [copied, setCopied] = useState(false);

  const activeTemplate = promptingGuide.promptTemplates.find(t => t.id === selectedTemplateId);
  const activeEffortObj = promptingGuide.effortGuide.find(e => e.level.includes(selectedEffort.split(' ')[0]));

  const handleCopy = () => {
    const fullPrompt = `${activeTemplate.systemPrompt}\n\n${activeTemplate.userPrompt}`;
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="prompting-guide" className="py-16 md:py-24 border-b border-[#E6E4DC] dark:border-[#2E2D29] bg-[#FAF6F0] dark:bg-[#121211]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97757]/10 text-[#D97757] text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Developer Strategy</span>
          </div>
          <h2 className="font-serif-anthropic text-3xl sm:text-5xl text-[#141413] dark:text-[#FAF9F5] mb-4">
            Prompting Claude Opus 5.5: Architecture, Goals & Strategies
          </h2>
          <p className="font-serif-anthropic text-lg sm:text-xl text-[#474541] dark:text-[#C5C2BA] leading-relaxed">
            {promptingGuide.overview.description}
          </p>
        </div>

        {/* 1. What Changed from Previous Models */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C8980] uppercase tracking-wider mb-4">
            <Layers className="w-4 h-4 text-[#D97757]" />
            <span>1. What Changed Compared to Previous Models</span>
          </div>
          <h3 className="font-serif-anthropic text-2xl text-[#141413] dark:text-[#FAF9F5] mb-6">
            Key Architectural Shifts & Breaking API Updates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promptingGuide.whatChanged.map((change, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base font-bold text-[#141413] dark:text-[#FAF9F5] mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D97757]"></span>
                    {change.title}
                  </h4>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#FAF9F5] dark:bg-[#181715] border border-[#E6E4DC] dark:border-[#2E2D29]">
                      <span className="text-[#8C8980] font-semibold block mb-0.5">Previous Models (Opus 5):</span>
                      <span className="text-[#686660] dark:text-[#A09E96]">{change.previous}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FBF0EC]/50 dark:bg-[#28211E] border border-[#D97757]/30">
                      <span className="text-[#D97757] font-semibold block mb-0.5">Opus 5.5 Behavior:</span>
                      <span className="text-[#141413] dark:text-[#FAF9F5]">{change.opus55}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E6E4DC] dark:border-[#2E2D29] text-[11px] text-[#6A7862] dark:text-[#8E9F85] font-medium">
                  <strong>Practical Impact:</strong> {change.impact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Anthropic's Goals & Expectations */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D97757] uppercase tracking-wider mb-2">
            <Target className="w-4 h-4" />
            <span>2. Anthropic's Purpose & Vision</span>
          </div>
          <h3 className="font-serif-anthropic text-2xl sm:text-3xl text-[#141413] dark:text-[#FAF9F5] mb-4">
            Anthropic's Goal & Expectations for Opus 5.5
          </h3>
          <p className="font-serif-anthropic text-lg text-[#474541] dark:text-[#C5C2BA] leading-relaxed mb-6">
            "{promptingGuide.anthropicGoalAndExpectation.goal}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {promptingGuide.anthropicGoalAndExpectation.expectations.map((exp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#181715] border border-[#E6E4DC] dark:border-[#2E2D29]">
                <div className="flex items-start gap-2.5 text-xs text-[#141413] dark:text-[#FAF9F5] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#D97757] shrink-0 mt-0.5" />
                  <span>{exp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. The Four Pillars of Prompting */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C8980] uppercase tracking-wider mb-4">
            <Cpu className="w-4 h-4 text-[#D97757]" />
            <span>3. Best Practice Prompt Structure</span>
          </div>
          <h3 className="font-serif-anthropic text-2xl text-[#141413] dark:text-[#FAF9F5] mb-6">
            The Four Pillars of High-Efficacy Prompts
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promptingGuide.fourPillars.map((pillar, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
                <h4 className="text-base font-bold text-[#141413] dark:text-[#FAF9F5] mb-2">
                  {pillar.name}
                </h4>
                <p className="text-xs text-[#686660] dark:text-[#A09E96] leading-relaxed mb-4">
                  {pillar.rule}
                </p>

                <div className="space-y-3 font-mono-anthropic text-[11px]">
                  <div className="p-3 rounded-xl bg-[#10A37F]/5 border border-[#10A37F]/20 text-[#141413] dark:text-[#FAF9F5]">
                    <span className="text-[#10A37F] font-bold block mb-1 font-sans">✓ Recommended Pattern:</span>
                    <pre className="whitespace-pre-wrap">{pillar.goodExample}</pre>
                  </div>
                  <div className="p-3 rounded-xl bg-[#DE8B59]/5 border border-[#DE8B59]/20 text-[#686660] dark:text-[#A09E96]">
                    <span className="text-[#DE8B59] font-bold block mb-1 font-sans">✗ Outdated / Brittle Pattern:</span>
                    <pre className="whitespace-pre-wrap">{pillar.badExample}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Effort Calibration Matrix */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D97757] uppercase tracking-wider mb-2">
            <Sliders className="w-4 h-4" />
            <span>4. The Effort Parameter</span>
          </div>
          <h3 className="font-serif-anthropic text-2xl text-[#141413] dark:text-[#FAF9F5] mb-3">
            Effort Calibration Matrix (Low, Medium, High, Max)
          </h3>
          <p className="text-xs sm:text-sm text-[#686660] dark:text-[#A09E96] mb-6">
            Instead of manual token budgets, adjust the <code className="px-1.5 py-0.5 rounded bg-[#F2EDE4] dark:bg-[#282724] text-[#D97757] font-mono">effort</code> setting to instruct the adaptive thinking engine.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {promptingGuide.effortGuide.map((effort, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedEffort(effort.level)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  selectedEffort === effort.level
                    ? 'border-[#D97757] bg-[#FBF0EC]/30 dark:bg-[#2A201B] shadow-sm'
                    : 'border-[#E6E4DC] dark:border-[#2E2D29] bg-[#FAF9F5] dark:bg-[#181715] hover:border-[#D97757]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-[#141413] dark:text-[#FAF9F5] capitalize">
                    {effort.level}
                  </span>
                  {effort.level.includes('Default') && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#D97757] text-white">
                      Default
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[#D97757] font-mono mb-2">
                  {effort.tokensPerTask}
                </div>
                <p className="text-xs text-[#686660] dark:text-[#A09E96] leading-relaxed mb-3">
                  <strong>Best for:</strong> {effort.bestFor}
                </p>
                <div className="pt-2 border-t border-[#E6E4DC] dark:border-[#2E2D29] text-[10px] text-[#8C8980] italic">
                  {effort.quote}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Interactive Prompt Studio & Template Generator */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D97757] uppercase tracking-wider mb-1">
                <Code className="w-4 h-4" />
                <span>5. Interactive Production Prompt Studio</span>
              </div>
              <h3 className="font-serif-anthropic text-2xl text-[#141413] dark:text-[#FAF9F5]">
                Ready-to-Use Opus 5.5 Templates
              </h3>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#141413] text-[#FAF9F5] dark:bg-[#FAF9F5] dark:text-[#141413] hover:bg-[#2D2B27] dark:hover:bg-[#E5DED3] transition-colors shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10A37F]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Full Prompt'}</span>
            </button>
          </div>

          {/* Template Archetype Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {promptingGuide.promptTemplates.map(tmpl => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplateId(tmpl.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedTemplateId === tmpl.id
                    ? 'bg-[#D97757] text-white shadow-xs'
                    : 'bg-[#F2EDE4] dark:bg-[#22211F] text-[#686660] dark:text-[#A09E96] hover:bg-[#E5DED3] dark:hover:bg-[#282724]'
                }`}
              >
                {tmpl.name}
              </button>
            ))}
          </div>

          {/* Prompt Code Viewers */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-[#8C8980] uppercase tracking-wider block mb-1">
                System Prompt (Action Policies & Role Demarcation):
              </span>
              <pre className="p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#181715] border border-[#E6E4DC] dark:border-[#2E2D29] font-mono-anthropic text-xs text-[#141413] dark:text-[#FAF9F5] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {activeTemplate.systemPrompt}
              </pre>
            </div>

            <div>
              <span className="text-xs font-semibold text-[#8C8980] uppercase tracking-wider block mb-1">
                User Task Payload (XML Containers & Definition of Done):
              </span>
              <pre className="p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#181715] border border-[#E6E4DC] dark:border-[#2E2D29] font-mono-anthropic text-xs text-[#141413] dark:text-[#FAF9F5] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {activeTemplate.userPrompt}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
