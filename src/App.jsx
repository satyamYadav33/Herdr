import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import IntroductionSection from './components/IntroductionSection';
import BenchmarkGrid from './components/BenchmarkGrid';
import CostAccuracyCharts from './components/CostAccuracyCharts';
import PricingCalculator from './components/PricingCalculator';
import CodingAgentSection from './components/CodingAgentSection';
import KnowledgeWorkSection from './components/KnowledgeWorkSection';
import CommunicationDiff from './components/CommunicationDiff';
import SafetySection from './components/SafetySection';
import PromptingGuideSection from './components/PromptingGuideSection';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import { Sparkles, ArrowUp, BookOpen } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('introduction');
  const [showScrollTop, setShowScrollTop] = useState(false);

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
      const sectionIds = ['introduction', 'benchmarks', 'pricing', 'coding', 'communication', 'safety', 'prompting-guide', 'availability'];
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
      {/* Top Release Banner */}
      <div className="bg-[#141413] text-[#FAF9F5] dark:bg-[#252420] text-xs py-2 px-4 text-center font-medium border-b border-[#2E2D29] flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#D97757] animate-pulse"></span>
        <span>Anthropic Flagship Announcement: Claude Opus 5.5 is now generally available across all cloud platforms.</span>
        <a 
          href="#prompting-guide" 
          className="text-[#D97757] underline ml-2 hover:text-[#E08264] transition-colors"
        >
          Read Prompting Strategy →
        </a>
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
        
        {/* Full Unabridged Sections */}
        <IntroductionSection />
        <BenchmarkGrid />
        <CostAccuracyCharts />
        <PricingCalculator />
        <CodingAgentSection />
        <KnowledgeWorkSection />
        <CommunicationDiff />
        <SafetySection />
        
        {/* In-Depth Dedicated Prompting Strategy Guide */}
        <PromptingGuideSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Floating Prompting Guide Quick Action & Back to Top */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
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
