import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { CalculatorDef, CalculationResult } from '../types';
import Card from './ui/Card';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import Tooltip from './ui/Tooltip';

interface CalculatorWidgetProps {
  calculator: CalculatorDef;
}

const CalculatorWidget: React.FC<CalculatorWidgetProps> = ({ calculator }) => {
  const initialInputs = useMemo(() => {
    return calculator.inputs.reduce((acc, input) => {
      acc[input.name] = input.defaultValue ?? '';
      return acc;
    }, {} as Record<string, any>);
  }, [calculator.inputs]);
  
  const location = useLocation();

  const [inputs, setInputs] = useState<Record<string, any>>(initialInputs);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const baseInputs = { ...initialInputs };

    calculator.inputs.forEach(input => {
      if (params.has(input.name)) {
        const paramValue = params.get(input.name);
        if (paramValue !== null) {
          if (input.type === 'checkbox') {
            baseInputs[input.name] = paramValue === 'true';
          } else {
            baseInputs[input.name] = paramValue;
          }
        }
      }
    });

    setInputs(baseInputs);
    setResult(null);
    setErrors({});
  }, [calculator, initialInputs, location.search]);

  const validateInput = (name: string, value: any): string => {
    const inputDef = calculator.inputs.find(i => i.name === name);
    if (!inputDef) return '';

    if (inputDef.required && (value === null || value === undefined || value === '')) {
      return `This field is required.`;
    }

    if (!inputDef.required && (value === null || value === undefined || value === '')) {
      return '';
    }

    if (inputDef.type === 'number' || inputDef.type === 'percentage') {
      if (value === '') return '';

      const numericValue = Number(value);
      if (isNaN(numericValue)) {
        return 'Please enter a valid number.';
      }
      if (inputDef.min !== undefined && numericValue < inputDef.min) {
        return `Value cannot be less than ${inputDef.min}.`;
      }
      if (inputDef.max !== undefined && numericValue > inputDef.max) {
        return `Value cannot be greater than ${inputDef.max}.`;
      }
    }

    if (inputDef.type === 'date' && value) {
      if (isNaN(new Date(value).getTime())) {
        return 'Please enter a valid date.';
      }
    }

    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checkedValue = (e.target as HTMLInputElement).checked;
    const finalValue = isCheckbox ? checkedValue : value;

    setInputs(prev => ({
      ...prev,
      [name]: finalValue,
    }));

    const error = validateInput(name, finalValue);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleCalculate = () => {
    let hasErrors = false;
    const newErrors: Record<string, string> = {};

    calculator.inputs.forEach(inputDef => {
        const value = inputs[inputDef.name];
        const error = validateInput(inputDef.name, value);
        if (error) {
            newErrors[inputDef.name] = error;
            hasErrors = true;
        }
    });

    setErrors(newErrors);

    if (hasErrors) {
        setResult(null);
        return;
    }
    
    const numericInputs: Record<string, any> = {};
    for (const key in inputs) {
      const inputDef = calculator.inputs.find(i => i.name === key);
      if (inputDef?.type === 'number' || inputDef?.type === 'percentage') {
        numericInputs[key] = parseFloat(inputs[key] || 0);
      } else {
        numericInputs[key] = inputs[key];
      }
    }
    const calculationResult = calculator.calculate(numericInputs);
    setResult(calculationResult);
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        params.set(key, String(value));
      }
    });
  
    const url = new URL(window.location.href);
    url.search = params.toString();
    
    navigator.clipboard.writeText(url.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const hasActiveErrors = Object.values(errors).some(error => error !== '');

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {calculator.inputs.map(input => {
            if (input.type === 'select') {
              return (
                <Select
                  key={input.name}
                  id={input.name}
                  name={input.name}
                  label={input.label}
                  options={input.options || []}
                  value={inputs[input.name]}
                  onChange={handleInputChange}
                  error={errors[input.name]}
                  required={input.required}
                  tooltip={input.tooltip}
                />
              );
            }
            if (input.type === 'checkbox') {
              return (
                 <div key={input.name} className="flex items-center pt-6">
                    <input
                      type="checkbox"
                      id={input.name}
                      name={input.name}
                      checked={!!inputs[input.name]}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={input.name} className="ml-2 block text-sm text-gray-900">
                      {input.label}
                    </label>
                    {input.tooltip && <Tooltip text={input.tooltip} />}
                 </div>
              )
            }
            return (
              <Input
                key={input.name}
                id={input.name}
                name={input.name}
                label={input.label}
                type={input.type}
                placeholder={input.placeholder}
                value={inputs[input.name]}
                onChange={handleInputChange}
                min={input.min}
                step={input.step}
                error={errors[input.name]}
                required={input.required}
                tooltip={input.tooltip}
              />
            );
          })}
        </div>
        
        <div className="flex flex-col justify-between space-y-4">
            <div className="flex-grow" role="status" aria-live="polite">
                {result && (
                  <div className="bg-blue-50 p-6 rounded-lg text-center flex flex-col justify-center">
                    <h3 className="text-lg text-gray-600 font-semibold">Estimated Result</h3>
                    <p className="text-4xl font-bold text-blue-800 break-words my-2">{result.value}</p>
                    
                    {/* START: Breakdown Visualization */}
                    {result.breakdown && result.breakdown.length > 0 && (() => {
                      const totalBreakdownValue = result.breakdown.reduce((sum, item) => sum + item.value, 0);
                      if (totalBreakdownValue <= 0) return null;

                      return (
                        <div className="mt-4 text-left w-full">
                          <h4 className="font-semibold text-gray-700 mb-2 text-center text-base">Settlement Breakdown</h4>
                          <div className="w-full bg-gray-200 rounded-full h-6 flex overflow-hidden my-2" role="progressbar" aria-label="Settlement breakdown bar">
                            {result.breakdown.map((item, index) => (
                              <div
                                key={index}
                                className={`${item.color} h-6 transition-all duration-500 ease-out`}
                                style={{ width: `${(item.value / totalBreakdownValue) * 100}%` }}
                                title={`${item.label}: ${item.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} (${((item.value / totalBreakdownValue) * 100).toFixed(1)}%)`}
                              ></div>
                            ))}
                          </div>
                          <ul className="mt-3 space-y-1 text-sm text-gray-600">
                            {result.breakdown.map((item, index) => (
                              <li key={index} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <span className={`w-3 h-3 rounded-full mr-2 ${item.color}`}></span>
                                  <span>{item.label}</span>
                                </div>
                                <span className="font-medium text-gray-800">
                                  {item.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })()}
                    {/* END: Breakdown Visualization */}

                    {result.explanation && <div className="mt-4 text-sm text-gray-700">{result.explanation}</div>}
                  </div>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleCalculate} disabled={hasActiveErrors}>Calculate</Button>
                <button
                    type="button"
                    onClick={handleShare}
                    className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-300 flex items-center justify-center gap-2"
                    aria-label="Copy shareable link"
                >
                    {copied ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Copied!</span>
                    </>
                    ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        <span>Share</span>
                    </>
                    )}
                </button>
            </div>
        </div>
      </div>
    </Card>
  );
};

export default CalculatorWidget;
