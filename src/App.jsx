import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import IntroductionSection from './components/IntroductionSection';
import SectionSkeleton from './components/SectionSkeleton';
import BrandedLoader from './components/BrandedLoader';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import { ArrowUp, BookOpen, RotateCcw } from 'lucide-react';

// Lazy-loaded heavy interactive sections for optimized bundle splitting & Core Web Vitals
const BenchmarkGrid = lazy(() => import('./components/BenchmarkGrid'));
const CostAccuracyCharts = lazy(() => import('./components/CostAccuracyCharts'));
const PricingCalculator = lazy(() => import('./components/PricingCalculator'));
const CodingAgentSection = lazy(() => import('./components/CodingAgentSection'));
const KnowledgeWorkSection = lazy(() => import('./components/KnowledgeWorkSection'));
const CommunicationDiff = lazy(() => import('./components/CommunicationDiff'));
const SafetySection = lazy(() => import('./components/SafetySection'));
const PromptingGuideSection = lazy(() => import('./components/PromptingGuideSection'));

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('introduction');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync dark mode class with root html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll listener for reading progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (totalScroll / windowHeight) * 100;
      setReadingProgress(progress);
      setShowScrollTop(totalScroll > 600);

      // Detect current section in view
      const sectionIds = [
        'introduction',
        'benchmarks',
        'pricing',
        'coding',
        'communication',
        'safety',
        'prompting-guide',
        'availability'
      ];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#141413] text-[#141413] dark:text-[#FAF9F5] transition-colors duration-200">
      {/* Branded Loading Animation (Claude Opus 5.5 \ Anthropic) */}
      {isLoading && (
        <BrandedLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* Top Release Banner with Replay Animation Action */}
      <div className="bg-[#141413] text-[#FAF9F5] dark:bg-[#252420] text-xs py-2 px-4 text-center font-medium border-b border-[#2E2D29] flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#D97757] animate-pulse"></span>
        <span>Anthropic Flagship Announcement: Claude Opus 5.5 is now generally available across all cloud platforms.</span>
        <button 
          onClick={() => setIsLoading(true)}
          className="inline-flex items-center gap-1 text-[#D97757] hover:text-[#E08264] underline ml-2 transition-colors"
          title="Replay website brand loading animation"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Replay Intro</span>
        </button>
      </div>

      {/* Main Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenSearch={() => setIsSearchOpen(true)}
        readingProgress={readingProgress}
      />

      {/* Main Content Area */}
      <main id="main-content" className="relative">
        <Hero activeSection={activeSection} />
        
        {/* Core Introductory Overview */}
        <IntroductionSection />

        {/* Lazy Loaded Interactive Sections with Shimmer Fallbacks */}
        <Suspense fallback={<SectionSkeleton title="Loading Benchmarks..." count={2} height="h-64" />}>
          <BenchmarkGrid />
        </Suspense>

        <Suspense fallback={<SectionSkeleton title="Loading Cost vs Accuracy Models..." count={1} height="h-80" />}>
          <CostAccuracyCharts />
        </Suspense>

        <Suspense fallback={<SectionSkeleton title="Loading Pricing Simulator..." count={2} height="h-64" />}>
          <PricingCalculator />
        </Suspense>

        <Suspense fallback={<SectionSkeleton title="Loading Agentic Case Studies..." count={2} height="h-64" />}>
          <CodingAgentSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton title="Loading Knowledge Work Evaluations..." count={2} height="h-64" />}>
          <KnowledgeWorkSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton title="Loading Communication Diff Comparator..." count={2} height="h-72" />}>
          <CommunicationDiff />
        </Suspense>

        <Suspense fallback={<SectionSkeleton title="Loading Safety & Containment Policies..." count={3} height="h-48" />}>
          <SafetySection />
        </Suspense>
        
        {/* In-Depth Dedicated Prompting Strategy Guide */}
        <Suspense fallback={<SectionSkeleton title="Loading Prompting Strategy Guide..." count={2} height="h-80" />}>
          <PromptingGuideSection />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Floating Prompting Guide Quick Action, Replay Loader & Back to Top */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <button
          onClick={() => setIsLoading(true)}
          className="p-3 rounded-full bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] text-[#686660] dark:text-[#A09E96] hover:text-[#D97757] dark:hover:text-[#D97757] hover:bg-[#F2EDE4] dark:hover:bg-[#282724] transition-all shadow-md group"
          title="Replay Claude Opus 5.5 Loading Animation"
          aria-label="Replay intro animation"
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
        </button>

        <a
          href="#prompting-guide"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#D97757] text-white hover:bg-[#C26547] transition-all shadow-lg hover:shadow-xl group"
        >
          <BookOpen className="w-4 h-4" />
          <span>Prompting Guide</span>
        </a>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white dark:bg-[#1C1B19] border border-[#E6E4DC] dark:border-[#2E2D29] text-[#141413] dark:text-[#FAF9F5] hover:bg-[#F2EDE4] dark:hover:bg-[#282724] transition-all shadow-md"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
