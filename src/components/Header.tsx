import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CALCULATORS } from '../constants';
import type { CalculatorDef } from '../types';

const Header: React.FC = () => {
  // Search state
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CalculatorDef[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Group calculators by category for the menu
  const calculatorsByCategory = CALCULATORS.reduce((acc, calc) => {
    (acc[calc.category] = acc[calc.category] || []).push(calc);
    return acc;
  }, {} as Record<string, CalculatorDef[]>);
  const sortedCategories = Object.keys(calculatorsByCategory).sort();

  // Search logic
  useEffect(() => {
    if (query.trim().length > 1) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = CALCULATORS.filter(calc =>
        calc.name.toLowerCase().includes(lowerCaseQuery) ||
        calc.h1.toLowerCase().includes(lowerCaseQuery) ||
        calc.category.toLowerCase().includes(lowerCaseQuery) ||
        calc.seoDescription.toLowerCase().includes(lowerCaseQuery)
      );
      setResults(filtered);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  // Effect to handle clicks outside of active components
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Effect to disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleResultClick = () => {
    setQuery('');
    setShowResults(false);
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const SearchBar = ({ inMobileMenu = false }: { inMobileMenu?: boolean }) => (
    <div className={`relative w-full ${inMobileMenu ? '' : 'md:max-w-md'}`} ref={inMobileMenu ? null : searchContainerRef}>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Find a calculator..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 1 && setShowResults(true)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          aria-label="Search for a calculator"
          aria-controls="search-results-list"
          aria-haspopup="listbox"
          aria-expanded={showResults && results.length > 0}
        />
      </div>
      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden max-h-96 overflow-y-auto z-20">
          {results.length > 0 ? (
            <ul id="search-results-list" role="listbox">
              {results.map(calc => (
                <li key={calc.id} role="option" aria-selected="false">
                  <Link 
                    to={`/calculator/${calc.id}`}
                    onClick={handleResultClick}
                    className="block px-4 py-3 hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
                  >
                    <span className="font-semibold text-gray-800">{calc.name}</span>
                    <p className="text-sm text-gray-500 truncate">{calc.seoDescription}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
             <div className="p-4 text-center text-gray-500">
              No results found for "{query}".
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-4">
          <Link to="/" onClick={handleResultClick} className="text-xl lg:text-2xl font-bold text-gray-800 hover:text-blue-600 self-center shrink-0">
            ⚖️ Accidental Lawyer Calculators
          </Link>
          
          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex items-center gap-6">
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
              >
                <span>Calculators</span>
                <svg className={`w-5 h-5 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute top-full mt-2 w-[50vw] max-w-4xl bg-white border border-gray-200 rounded-lg shadow-xl p-6 -translate-x-1/2 left-1/2">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    {sortedCategories.map(category => (
                      <div key={category}>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{category}</h3>
                        <ul className="space-y-2">
                          {calculatorsByCategory[category].map(calc => (
                            <li key={calc.id}>
                              <Link to={`/calculator/${calc.id}`} onClick={handleResultClick} className="text-gray-700 hover:text-blue-600 hover:underline text-base">
                                {calc.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isMobileMenuOpen}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-6 pb-6 h-[calc(100%-64px)] overflow-y-auto">
            <div ref={searchContainerRef}>
              <SearchBar inMobileMenu={true} />
            </div>
            <nav className="mt-8 space-y-6">
              {sortedCategories.map(category => (
                <div key={category}>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{category}</h3>
                  <ul className="space-y-3">
                    {calculatorsByCategory[category].map(calc => (
                      <li key={calc.id}>
                        <Link
                          to={`/calculator/${calc.id}`}
                          onClick={handleResultClick}
                          className="block text-gray-700 hover:text-blue-600"
                        >
                          {calc.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
