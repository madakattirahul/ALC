
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CALCULATORS } from '../constants';
import CalculatorPage from './CalculatorPage';

const CalculatorPageWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const calculator = CALCULATORS.find(calc => calc.id === id);

  if (!calculator) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Calculator Not Found</h1>
        <p className="text-gray-600 mb-8">Sorry, we couldn't find the calculator you were looking for.</p>
        <Link to="/" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  return <CalculatorPage calculator={calculator} />;
};

export default CalculatorPageWrapper;