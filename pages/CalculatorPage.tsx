import React from 'react';
import { Link } from 'react-router-dom';
import type { CalculatorDef } from '../types';
import CalculatorWidget from '../components/CalculatorWidget';
import { CALCULATORS } from '../constants';
import StructuredData from '../components/StructuredData';
import SocialShareButtons from '../components/SocialShareButtons';
import Accordion from '../components/ui/Accordion';
import AdSense from '../components/AdSense';

interface CalculatorPageProps {
  calculator: CalculatorDef;
}

const CalculatorPage: React.FC<CalculatorPageProps> = ({ calculator }) => {
    
  const relatedCalculators = CALCULATORS
    .filter(c => c.id !== calculator.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": calculator.name,
    "description": calculator.seoDescription,
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "Any",
    "url": window.location.href,
    "mainEntity": {
      "@type": "HowTo",
      "name": `How to use the ${calculator.name}`,
      "step": calculator.inputs.map((input, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": `Enter ${input.label}`,
        "text": `Provide a value for ${input.label}.`
      })),
      "result": {
        "@type": "Thing",
        "name": "Calculation Result",
        "description": `The estimated value based on your inputs for the ${calculator.name}.`
      }
    }
  };

  const hasFaqs = calculator.faqs && calculator.faqs.length > 0;
  const faqSchema = hasFaqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": calculator.faqs!.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answerText
      }
    }))
  } : null;

  const shareTitle = `Check out this ${calculator.name} on Accidental Lawyer Calculators!`;

  return (
    <>
      <StructuredData schema={calculatorSchema} />
      {faqSchema && <StructuredData schema={faqSchema} />}
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{calculator.h1}</h1>
        </header>

        {/* --- Ad Slot 1: Top of Page --- */}
        <AdSense adSlot="1070397560" />
        
        <section id="calculator-widget" className="mb-12">
          <CalculatorWidget calculator={calculator} />
        </section>

        {/* --- Ad Slot 2: In-Content --- */}
        <AdSense adSlot="1070397560" />
        
        <section id="educational-content" aria-labelledby="educational-content-heading" className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto prose lg:prose-xl">
           <h2 id="educational-content-heading" className="sr-only">
            About the {calculator.name}
          </h2>
          {calculator.description}
        </section>

        {hasFaqs && (
          <section id="faq" className="mt-12 text-left">
            <div className="bg-gray-50 p-8 rounded-lg max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {calculator.faqs!.map((faq, index) => (
                  <Accordion key={index} title={faq.question}>
                    <div className="prose max-w-none text-gray-700">
                      {faq.answer}
                    </div>
                  </Accordion>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="social-share" className="mt-12 text-center">
          <div className="bg-gray-100 py-8 px-4 rounded-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Found this useful? Share it!</h2>
            <SocialShareButtons 
                shareUrl={window.location.href}
                title={shareTitle}
                description={calculator.seoDescription}
            />
          </div>
        </section>

        {/* --- Ad Slot 3: Bottom of Page --- */}
        <AdSense adSlot="1070397560" />

        <section id="related-calculators" className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {relatedCalculators.map(calc => (
              <Link 
                key={calc.id} 
                to={`/calculator/${calc.id}`}
                className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="font-bold text-xl text-blue-700">{calc.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default CalculatorPage;