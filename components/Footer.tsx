import React from 'react';
import { Link } from 'react-router-dom';
import { CALCULATORS } from '../constants';
import type { CalculatorDef } from '../types';

const Footer: React.FC = () => {
  const calculatorsByCategory = CALCULATORS.reduce((acc, calc) => {
    (acc[calc.category] = acc[calc.category] || []).push(calc);
    return acc;
  }, {} as Record<string, CalculatorDef[]>);

  const sortedCategories = Object.keys(calculatorsByCategory).sort();

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Accidental Lawyer</h3>
            <p className="text-gray-400 text-sm">Your go-to resource for preliminary personal injury and civil litigation calculations. All calculators provide estimates and are not a substitute for legal advice.</p>
          </div>
          {sortedCategories.map(category => (
            <div key={category}>
              <h3 className="text-lg font-bold mb-4">{category} Calculators</h3>
              <ul className="space-y-2">
                {calculatorsByCategory[category].map(calc => (
                  <li key={calc.id}>
                    <Link to={`/calculator/${calc.id}`} className="text-gray-300 hover:text-white hover:underline text-sm">
                      {calc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Accidental Lawyer Calculators. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
