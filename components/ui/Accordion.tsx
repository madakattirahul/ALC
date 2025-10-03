import React, { useState, useId } from 'react';

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();
  const headerId = useId();

  return (
    <div className="mt-4">
        <div className="border-t border-gray-200">
            <h3 id={headerId} className="w-full text-xl font-semibold">
                <button
                    type="button"
                    className="flex justify-between items-center w-full py-4 text-left text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                >
                    <span className="text-xl font-semibold">{title}</span>
                    <svg
                        className={`w-5 h-5 transform transition-transform duration-200 text-gray-500 ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </h3>
            <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="pb-4 text-gray-700">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Accordion;
