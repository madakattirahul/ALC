
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CALCULATORS } from '../constants';
import type { CalculatorDef } from '../types';

const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CalculatorDef[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only search if query is not just whitespace and has some length
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

  // Effect to handle clicks outside of the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Clear search and hide results when a result is clicked
  const handleResultClick = () => {
    setQuery('');
    setShowResults(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 self-start md:self-center">
          ⚖️ Accidental Lawyer Calculators
        </Link>
        <div className="relative w-full md:max-w-md" ref={searchContainerRef}>
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
            <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden max-h-96 overflow-y-auto">
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
      </div>
    </header>
  );
};

export default Header;
