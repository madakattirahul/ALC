
import React from 'react';
import { Link } from 'react-router-dom';
import { CALCULATORS } from '../constants';
import StructuredData from '../components/StructuredData';
import Accordion from '../components/ui/Accordion';
import type { CalculatorDef } from '../types';

const HomePage: React.FC = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Accidental Lawyer Calculators",
    "url": window.location.origin,
    "description": "A comprehensive suite of free online calculators for personal injury and civil litigation cases. Instantly estimate your settlement value, find legal deadlines, and understand attorney fees.",
    "publisher": {
      "@type": "Organization",
      "name": "Accidental Lawyer Calculators",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/vite.svg`
      }
    }
  };

  const faqs = [
    {
      question: "What is a personal injury claim?",
      answer: <p>A personal injury claim is a legal process to seek compensation from the person or entity responsible for your injury. It typically covers medical expenses, lost income, and pain and suffering. This process can be resolved through a settlement or a formal lawsuit.</p>,
      answerText: "A personal injury claim is a legal process to seek compensation from the person or entity responsible for your injury. It typically covers medical expenses, lost income, and pain and suffering. This process can be resolved through a settlement or a formal lawsuit."
    },
    {
      question: "How much is my personal injury case worth?",
      answer: <p>The value of a case depends on many factors, including the severity of your injuries, total medical bills, lost wages, and the impact on your life. Our <Link to='/calculator/personal-injury-settlement' className="text-blue-600 hover:underline">Personal Injury Settlement Calculator</Link> provides a general estimate based on a common formula used in the legal field.</p>,
      answerText: "The value of a case depends on many factors, including the severity of your injuries, total medical bills, lost wages, and the impact on your life. Our Personal Injury Settlement Calculator provides a general estimate based on a common formula used in the legal field."
    },
    {
      question: "Should I accept the first settlement offer?",
      answer: <p>It's often not advisable to accept the first offer from an insurance company. Initial offers are typically lower than what your claim may actually be worth. It's wise to understand the full extent of your damages before settling. Consulting with an attorney is highly recommended.</p>,
      answerText: "It's often not advisable to accept the first offer from an insurance company. Initial offers are typically lower than what your claim may actually be worth. It's wise to understand the full extent of your damages before settling. Consulting with an attorney is highly recommended."
    },
    {
      question: "Do I need a lawyer for a personal injury claim?",
      answer: <p>While you can handle a minor claim on your own, an experienced attorney can be invaluable, especially for serious injuries. They can navigate complex legal procedures, negotiate with insurance companies, and help maximize your compensation. Our <Link to='/calculator/attorney-fee-client-recovery' className="text-blue-600 hover:underline">Attorney Fee Calculator</Link> can help you understand how legal fees might affect your final recovery.</p>,
      answerText: "While you can handle a minor claim on your own, an experienced attorney can be invaluable, especially for serious injuries. They can navigate complex legal procedures, negotiate with insurance companies, and help maximize your compensation. Our Attorney Fee Calculator can help you understand how legal fees might affect your final recovery."
    },
    {
      question: "How long does a personal injury settlement take?",
      answer: <p>The timeline varies greatly. Simple cases might settle in a few months, while complex ones can take years, especially if they go to trial. Factors include the severity of injuries, the clarity of fault, and the insurance company's willingness to negotiate fairly.</p>,
      answerText: "The timeline varies greatly. Simple cases might settle in a few months, while complex ones can take years, especially if they go to trial. Factors include the severity of injuries, the clarity of fault, and the insurance company's willingness to negotiate fairly."
    },
    {
      question: "Are the calculator results a guarantee of my settlement amount?",
      answer: <p>No. The results from our calculators are for informational and educational purposes only. They are estimates based on standard formulas and do not constitute legal advice or a promise of a specific outcome. Every case is unique, and final settlement amounts are determined through negotiation or court proceedings.</p>,
      answerText: "No. The results from our calculators are for informational and educational purposes only. They are estimates based on standard formulas and do not constitute legal advice or a promise of a specific outcome. Every case is unique, and final settlement amounts are determined through negotiation or court proceedings."
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answerText
      }
    }))
  };

  const calculatorsByCategory = CALCULATORS.reduce((acc, calc) => {
    (acc[calc.category] = acc[calc.category] || []).push(calc);
    return acc;
  }, {} as Record<string, CalculatorDef[]>);

  const sortedCategories = Object.keys(calculatorsByCategory).sort();
  
  return (
    <>
      <StructuredData schema={websiteSchema} />
      <StructuredData schema={faqSchema} />
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          The Ultimate Personal Injury Claim Calculator Suite
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Get instant, data-driven estimates for your personal injury or civil litigation case. Our suite of free, specialized calculators helps you understand potential settlement values, legal deadlines, attorney fees, and more, empowering you with information for your claim.
        </p>
        
        <div className="space-y-16">
          {sortedCategories.map(category => (
            <section key={category} aria-labelledby={`${category}-heading`}>
              <h2 
                id={`${category}-heading`} 
                className="text-3xl font-bold text-gray-800 mb-8 text-left border-b-2 border-gray-200 pb-2"
              >
                {category} Calculators
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {calculatorsByCategory[category].map(calc => (
                  <Link 
                    key={calc.id} 
                    to={`/calculator/${calc.id}`}
                    className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
                  >
                    <h3 className="font-bold text-xl text-blue-700 mb-2">{calc.name}</h3>
                    <p className="text-gray-600 text-sm">{calc.h1}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 bg-gray-100 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Why Use Our Calculators?</h2>
          <p className="text-gray-700 max-w-4xl mx-auto">
            Navigating a legal claim can be overwhelming. While our tools do not provide legal advice, they offer a transparent, educational first step. Understand the factors that influence your case's value, from <Link to="/calculator/pain-and-suffering-multiplier" className="text-blue-600 font-semibold hover:underline">Pain and Suffering</Link> to <Link to="/calculator/lost-wages-earning-capacity" className="text-blue-600 font-semibold hover:underline">Lost Wages</Link>. Each calculation is based on standard legal formulas to give you a clearer picture of what to expect.
          </p>
          <p className="mt-4 text-sm text-gray-500 italic">
            Disclaimer: These calculators are for informational purposes only and are not a substitute for professional legal advice.
          </p>
        </div>

        <section id="faq" className="mt-16 text-left">
          <div className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-2">
              {faqs.map((faq, index) => (
                <Accordion key={index} title={faq.question}>
                  <div className="prose max-w-none">
                    {faq.answer}
                  </div>
                </Accordion>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;
