import { ReactNode } from 'react';

export interface CalculatorInput {
  name: string;
  label: string;
  type: 'number' | 'date' | 'select' | 'percentage' | 'checkbox';
  defaultValue?: string | number | boolean;
  options?: { value: string | number; label: string }[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  tooltip?: string;
}

export interface CalculatorDef {
  id: string;
  category: string;
  name: string;
  h1: string;
  description: ReactNode;
  seoDescription: string;
  inputs: CalculatorInput[];
  calculate: (inputs: Record<string, any>) => CalculationResult;
  faqs?: {
    question: string;
    answer: ReactNode;
    answerText: string;
  }[];
}

export interface BreakdownItem {
  label: string;
  value: number;
  color: string;
}

export interface CalculationResult {
  value: string | number;
  explanation?: ReactNode;
  breakdown?: BreakdownItem[];
}