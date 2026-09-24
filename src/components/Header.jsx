import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, ArrowUpRight, BookOpen, Menu, X } from 'lucide-react';

export default function Header({ darkMode, setDarkMode, onOpenSearch, readingProgress }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      scrolled 
        ? 'bg-[#FAF9F5]/90 dark:bg-[#141413]/90 backdrop-blur-md border-b border-[#E6E4DC] dark:border-[#2E2D29] shadow-sm' 
        : 'bg-[#FAF9F5] dark:bg-[#141413] border-b border-transparent'
    }`}>
      {/* Reading Progress Indicator */}
      <div 
        className="h-[2.5px] bg-[#D97757] transition-all duration-150 fixed top-0 left-0 z-50"
        style={{ width: `${readingProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-3 group">
              <svg 
                className="w-28 sm:w-32 h-6 text-[#141413] dark:text-[#FAF9F5] transition-colors" 
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
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#D97757]/10 text-[#D97757] border border-[#D97757]/20">
                Opus 5.5
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#686660] dark:text-[#A09E96]">
              <a href="#introduction" className="hover:text-[#141413] dark:hover:text-[#FAF9F5] transition-colors">
                Overview
              </a>
              <a href="#benchmarks" className="hover:text-[#141413] dark:hover:text-[#FAF9F5] transition-colors">
                Benchmarks
              </a>
              <a href="#pricing" className="hover:text-[#141413] dark:hover:text-[#FAF9F5] transition-colors">
                Pricing & ROI
              </a>
              <a href="#communication" className="hover:text-[#141413] dark:hover:text-[#FAF9F5] transition-colors">
                Communication Diff
              </a>
              <a href="#safety" className="hover:text-[#141413] dark:hover:text-[#FAF9F5] transition-colors">
                Safety & Alignment
              </a>
              <a 
                href="#prompting-guide" 
                className="flex items-center gap-1.5 text-[#D97757] font-semibold hover:text-[#C26547] transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Prompting Guide
              </a>
            </nav>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Quick Search trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#686660] dark:text-[#A09E96] bg-[#F2EDE4] dark:bg-[#22211F] rounded-full hover:bg-[#E6E0D4] dark:hover:bg-[#2D2B27] transition-colors"
              title="Search release notes (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search release</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 bg-[#FAF9F5] dark:bg-[#141413] rounded text-[10px] border border-[#D1CEC4] dark:border-[#3E3D38]">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-[#686660] dark:text-[#A09E96] hover:text-[#141413] dark:hover:text-[#FAF9F5] rounded-full hover:bg-[#F2EDE4] dark:hover:bg-[#22211F] transition-colors"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Try Claude CTA */}
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-[#141413] text-[#FAF9F5] dark:bg-[#FAF9F5] dark:text-[#141413] hover:bg-[#2D2B27] dark:hover:bg-[#E6E4DC] transition-colors shadow-sm"
            >
              Try Claude
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#686660] dark:text-[#A09E96] hover:text-[#141413] dark:hover:text-[#FAF9F5]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F5] dark:bg-[#141413] border-b border-[#E6E4DC] dark:border-[#2E2D29] px-4 pt-2 pb-6 space-y-3">
          <a 
            href="#introduction" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#141413] dark:text-[#FAF9F5]"
          >
            Overview
          </a>
          <a 
            href="#benchmarks" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#686660] dark:text-[#A09E96]"
          >
            Benchmarks
          </a>
          <a 
            href="#pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#686660] dark:text-[#A09E96]"
          >
            Pricing & ROI
          </a>
          <a 
            href="#communication" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#686660] dark:text-[#A09E96]"
          >
            Communication Diff
          </a>
          <a 
            href="#safety" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#686660] dark:text-[#A09E96]"
          >
            Safety & Alignment
          </a>
          <a 
            href="#prompting-guide" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-[#D97757]"
          >
            Prompting Strategy Guide
          </a>
          <div className="pt-3">
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium bg-[#141413] text-[#FAF9F5] dark:bg-[#FAF9F5] dark:text-[#141413]"
            >
              Try Claude
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
