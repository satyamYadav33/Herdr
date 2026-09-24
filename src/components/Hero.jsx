import React, { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, Zap, Shield, Cpu } from 'lucide-react';

export default function Hero({ activeSection }) {
  const canvasRef = useRef(null);

  // Anthropic Canvas Fluid Particle Wave Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;
    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle harmonic bezier ribbons in Anthropic terracotta & warm peach
      const isDark = document.documentElement.classList.contains('dark');
      const baseAlpha = isDark ? 0.25 : 0.12;

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const offset = i * 0.8;
        ctx.strokeStyle = i % 2 === 0 
          ? `rgba(217, 119, 87, ${baseAlpha - i * 0.02})` 
          : `rgba(222, 139, 89, ${baseAlpha - i * 0.02})`;
        ctx.lineWidth = 1.5;

        for (let x = 0; x < width; x += 15) {
          const y = height * 0.5 + 
            Math.sin(x * 0.003 + time + offset) * 70 * Math.sin(time * 0.3) +
            Math.cos(x * 0.002 - time * 0.7) * 40;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#E6E4DC] dark:border-[#2E2D29]">
      {/* Background Canvas Interactive Visual */}
      <div className="absolute inset-0 pointer-events-none opacity-80 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Date */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2EDE4] dark:bg-[#22211F] text-[#686660] dark:text-[#A09E96] text-xs sm:text-sm font-medium mb-6 tracking-wide">
          <span>September 22, 2026</span>
          <span className="w-1 h-1 rounded-full bg-[#D97757]"></span>
          <span className="text-[#D97757] font-semibold">Flagship Release</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif-anthropic text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#141413] dark:text-[#FAF9F5] mb-6 font-normal leading-[1.08]">
          Claude Opus 5.5
        </h1>

        {/* Lead Subtitle / Summary */}
        <p className="max-w-3xl mx-auto text-lg sm:text-2xl font-serif-anthropic text-[#474541] dark:text-[#C5C2BA] leading-relaxed mb-10">
          The first model in our new Claude 5.5 family. It performs at the level of Claude Fable 5.1 on most work and costs <span className="text-[#D97757] font-medium underline decoration-[#D97757]/40 underline-offset-4">40% less to run</span> than Opus 5.
        </p>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-12 text-left">
          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-[#1C1B19]/80 backdrop-blur border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
            <div className="flex items-center gap-2 text-[#D97757] mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Speed</span>
            </div>
            <div className="text-xl sm:text-2xl font-serif-anthropic font-medium text-[#141413] dark:text-[#FAF9F5]">
              &gt;30% Faster
            </div>
            <div className="text-xs text-[#686660] dark:text-[#A09E96] mt-0.5">
              Output token generation
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-[#1C1B19]/80 backdrop-blur border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
            <div className="flex items-center gap-2 text-[#D97757] mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Cost</span>
            </div>
            <div className="text-xl sm:text-2xl font-serif-anthropic font-medium text-[#141413] dark:text-[#FAF9F5]">
              -40% Cost
            </div>
            <div className="text-xs text-[#686660] dark:text-[#A09E96] mt-0.5">
              $0.20/M prompt cache
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-[#1C1B19]/80 backdrop-blur border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
            <div className="flex items-center gap-2 text-[#D97757] mb-1">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Reasoning</span>
            </div>
            <div className="text-xl sm:text-2xl font-serif-anthropic font-medium text-[#141413] dark:text-[#FAF9F5]">
              Always-On
            </div>
            <div className="text-xs text-[#686660] dark:text-[#A09E96] mt-0.5">
              Adaptive thinking mode
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-[#1C1B19]/80 backdrop-blur border border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm">
            <div className="flex items-center gap-2 text-[#D97757] mb-1">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Safety</span>
            </div>
            <div className="text-xl sm:text-2xl font-serif-anthropic font-medium text-[#141413] dark:text-[#FAF9F5]">
              -85% Breakout
            </div>
            <div className="text-xs text-[#686660] dark:text-[#A09E96] mt-0.5">
              Sandbox containment
            </div>
          </div>
        </div>

        {/* Table of Contents Pill Nav (Directly mirroring Anthropic's TOC) */}
        <nav aria-label="Table of Contents" className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-[#F2EDE4]/70 dark:bg-[#22211F]/70 backdrop-blur border border-[#E6E4DC] dark:border-[#2E2D29] mb-8">
          <a
            href="#introduction"
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#141413] dark:text-[#FAF9F5] hover:bg-white dark:hover:bg-[#1C1B19] transition-all"
          >
            <span className="text-[#D97757] font-semibold mr-1.5">(1)</span>
            Introduction
          </a>
          <a
            href="#benchmarks"
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#141413] dark:text-[#FAF9F5] hover:bg-white dark:hover:bg-[#1C1B19] transition-all"
          >
            <span className="text-[#D97757] font-semibold mr-1.5">(2)</span>
            Performance & Cost
          </a>
          <a
            href="#coding"
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#141413] dark:text-[#FAF9F5] hover:bg-white dark:hover:bg-[#1C1B19] transition-all"
          >
            <span className="text-[#D97757] font-semibold mr-1.5">(3)</span>
            Agentic Coding
          </a>
          <a
            href="#communication"
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#141413] dark:text-[#FAF9F5] hover:bg-white dark:hover:bg-[#1C1B19] transition-all"
          >
            <span className="text-[#D97757] font-semibold mr-1.5">(4)</span>
            Communication Diff
          </a>
          <a
            href="#safety"
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#141413] dark:text-[#FAF9F5] hover:bg-white dark:hover:bg-[#1C1B19] transition-all"
          >
            <span className="text-[#D97757] font-semibold mr-1.5">(5)</span>
            Safety & Pacing
          </a>
          <a
            href="#prompting-guide"
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#D97757] text-white hover:bg-[#C26547] transition-all shadow-sm"
          >
            <span className="text-white/80 mr-1.5">(6)</span>
            Prompting Strategy
          </a>
        </nav>

        {/* Scroll cue */}
        <div>
          <a 
            href="#introduction" 
            className="inline-flex items-center gap-1.5 text-xs text-[#8C8980] dark:text-[#686660] hover:text-[#141413] dark:hover:text-[#FAF9F5] transition-colors"
          >
            <span>Scroll down to read</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
