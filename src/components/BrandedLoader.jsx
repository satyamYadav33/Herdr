import React, { useState, useEffect } from 'react';

export default function BrandedLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('Initializing Claude Opus 5.5...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const stages = [
      { at: 15, text: 'Calibrating adaptive thinking engine...' },
      { at: 40, text: 'Allocating 1,000,000 token context buffer...' },
      { at: 65, text: 'Verifying METR & Frontier Design alignment suites...' },
      { at: 85, text: 'Loading Terminal-Bench 4.0 & FrontierCode benchmarks...' },
      { at: 98, text: 'Claude Opus 5.5 initialized.' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const currentStage = stages.filter(s => next >= s.at).pop();
        if (currentStage) {
          setStageText(currentStage.text);
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF9F5] dark:bg-[#141413] transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#D97757]/10 dark:bg-[#D97757]/15 blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto px-6 text-center">
        {/* Animated Brand Wordmark Logo */}
        <div className="relative mb-8">
          <svg 
            className="w-40 sm:w-48 h-10 text-[#141413] dark:text-[#FAF9F5] transition-transform duration-500 hover:scale-105" 
            viewBox="0 0 570 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Anthropic"
          >
            <path d="M139.492 12.9945H160.265V62.9392H173.525V12.9945H194.298V1.06077H139.492V12.9945Z" fill="currentColor"/>
            <path d="M116.066 44.3757L88.221 1.06077H73.1934V62.9392H86.011V19.6243L113.856 62.9392H128.884V1.06077H116.066V44.3757Z" fill="currentColor"/>
            <path d="M247.337 25.7238H218.166V1.06077H204.906V62.9392H218.166V37.6575H247.337V62.9392H260.597V1.06077H247.337V25.7238Z" fill="currentColor"/>
            <path d="M24.663 1.06077L0 62.9392H13.7901L18.834 49.9447H44.6365L49.6796 62.9392H63.4696L38.8066 1.06077H24.663ZM23.2946 38.453L31.7348 16.7072L40.175 38.453H23.2946Z" fill="currentColor"/>
            <path d="M370.475 0C352.619 0 339.978 13.2597 339.978 32.0884C339.978 50.7403 352.619 64 370.475 64C388.243 64 400.796 50.7403 400.796 32.0884C400.796 13.2597 388.243 0 370.475 0ZM370.475 51.6243C360.044 51.6243 353.68 44.1989 353.68 32.0884C353.68 19.8011 360.044 12.3757 370.475 12.3757C380.818 12.3757 387.094 19.8011 387.094 32.0884C387.094 44.1989 380.818 51.6243 370.475 51.6243Z" fill="currentColor"/>
            <path d="M555.845 42.1657C553.547 48.1768 548.95 51.6243 542.674 51.6243C532.243 51.6243 525.878 44.1989 525.878 32.0884C525.878 19.8011 532.243 12.3757 542.674 12.3757C548.95 12.3757 553.547 15.8232 555.845 21.8343H569.901C566.453 8.57459 556.11 0 542.674 0C524.818 0 512.177 13.2597 512.177 32.0884C512.177 50.7403 524.818 64 542.674 64C556.199 64 566.541 55.337 569.989 42.1657H555.845Z" fill="currentColor"/>
            <path d="M471.337 1.06077L496 62.9392H509.525L484.862 1.06077H471.337Z" fill="currentColor"/>
            <path d="M443.403 1.06077H413.171V62.9392H426.431V40.4862H443.403C457.459 40.4862 466.033 33.0608 466.033 20.7735C466.033 8.48619 457.459 1.06077 443.403 1.06077ZM442.784 28.5525H426.431V12.9945H442.784C449.326 12.9945 452.773 15.6464 452.773 20.7735C452.773 25.9006 449.326 28.5525 442.784 28.5525Z" fill="currentColor"/>
            <path d="M329.812 19.8895C329.812 8.22099 321.238 1.06077 307.182 1.06077H276.95V62.9392H290.21V38.7182H304.971L318.232 62.9392H332.906L318.223 36.8734C325.593 34.0402 329.812 28.0743 329.812 19.8895ZM290.21 12.9945H306.564C313.105 12.9945 316.552 15.3812 316.552 19.8895C316.552 24.3978 313.105 26.7845 306.564 26.7845H290.21V12.9945Z" fill="currentColor"/>
          </svg>
        </div>

        {/* Website Name & Version Sub-brand with Shimmer */}
        <div className="flex items-center gap-2 mb-6">
          <span className="font-serif-anthropic text-3xl sm:text-4xl font-normal text-[#141413] dark:text-[#FAF9F5] tracking-tight">
            Claude Opus
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-sm font-bold bg-[#D97757] text-white shadow-sm">
            5.5
          </span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-64 sm:w-80 h-1.5 bg-[#E6E4DC] dark:bg-[#2E2D29] rounded-full overflow-hidden mb-4 p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-[#D97757] via-[#E08264] to-[#D97757] rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Live Diagnostics & Percentage */}
        <div className="flex items-center justify-between w-64 sm:w-80 text-xs font-mono text-[#8C8980] mb-2">
          <span>{progress}%</span>
          <span className="text-[#D97757] font-semibold">September 22, 2026</span>
        </div>

        {/* Contextual Status Subtitle */}
        <p className="text-xs text-[#686660] dark:text-[#A09E96] font-medium h-6 animate-pulse">
          {stageText}
        </p>
      </div>
    </div>
  );
}
