import React from 'react';
import { Link } from 'react-router-dom';
import type { CalculatorDef } from './types';
import Accordion from './components/ui/Accordion';

const DISCLAIMER = <p className="mt-4 text-sm text-gray-500 italic">This is an estimate, not legal advice. Consult an attorney for a professional evaluation of your case.</p>;

export const STATES_SOL = [
    { value: '', label: 'Select a state...' },
    { value: 2, label: 'Alabama (2 years)' },
    { value: 2, label: 'Alaska (2 years)' },
    { value: 2, label: 'Arizona (2 years)' },
    { value: 3, label: 'Arkansas (3 years)' },
    { value: 2, label: 'California (2 years)' },
    { value: 2, label: 'Colorado (2 years)' },
    { value: 2, label: 'Connecticut (2 years)' },
    { value: 2, label: 'Delaware (2 years)' },
    { value: 4, label: 'Florida (4 years)' },
    { value: 2, label: 'Georgia (2 years)' },
    { value: 2, label: 'Hawaii (2 years)' },
    { value: 2, label: 'Idaho (2 years)' },
    { value: 2, label: 'Illinois (2 years)' },
    { value: 2, label: 'Indiana (2 years)' },
    { value: 2, label: 'Iowa (2 years)' },
    { value: 2, label: 'Kansas (2 years)' },
    { value: 1, label: 'Kentucky (1 year)' },
    { value: 1, label: 'Louisiana (1 year)' },
    { value: 6, label: 'Maine (6 years)' },
    { value: 3, label: 'Maryland (3 years)' },
    { value: 3, label: 'Massachusetts (3 years)' },
    { value: 3, label: 'Michigan (3 years)' },
    { value: 6, label: 'Minnesota (6 years)' },
    { value: 3, label: 'Mississippi (3 years)' },
    { value: 5, label: 'Missouri (5 years)' },
    { value: 3, label: 'Montana (3 years)' },
    { value: 4, label: 'Nebraska (4 years)' },
    { value: 2, label: 'Nevada (2 years)' },
    { value: 3, label: 'New Hampshire (3 years)' },
    { value: 2, label: 'New Jersey (2 years)' },
    { value: 3, label: 'New Mexico (3 years)' },
    { value: 3, label: 'New York (3 years)' },
    { value: 3, label: 'North Carolina (3 years)' },
    { value: 6, label: 'North Dakota (6 years)' },
    { value: 2, label: 'Ohio (2 years)' },
    { value: 2, label: 'Oklahoma (2 years)' },
    { value: 2, label: 'Oregon (2 years)' },
    { value: 2, label: 'Pennsylvania (2 years)' },
    { value: 3, label: 'Rhode Island (3 years)' },
    { value: 3, label: 'South Carolina (3 years)' },
    { value: 3, label: 'South Dakota (3 years)' },
    { value: 1, label: 'Tennessee (1 year)' },
    { value: 2, label: 'Texas (2 years)' },
    { value: 4, label: 'Utah (4 years)' },
    { value: 3, label: 'Vermont (3 years)' },
    { value: 2, label: 'Virginia (2 years)' },
    { value: 3, label: 'Washington (3 years)' },
    { value: 2, label: 'West Virginia (2 years)' },
    { value: 3, label: 'Wisconsin (3 years)' },
    { value: 4, label: 'Wyoming (4 years)' },
];

const NEGLIGENCE_RULES = {
    'AL': { rule: 'contributory', threshold: 0, label: 'Alabama (Contributory)' },
    'AK': { rule: 'pure', threshold: 100, label: 'Alaska (Pure Comparative)' },
    'AZ': { rule: 'pure', threshold: 100, label: 'Arizona (Pure Comparative)' },
    'AR': { rule: 'modified_50', threshold: 50, label: 'Arkansas (Modified 50%)' },
    'CA': { rule: 'pure', threshold: 100, label: 'California (Pure Comparative)' },
    'CO': { rule: 'modified_50', threshold: 50, label: 'Colorado (Modified 50%)' },
    'CT': { rule: 'modified_51', threshold: 51, label: 'Connecticut (Modified 51%)' },
    'DE': { rule: 'modified_51', threshold: 51, label: 'Delaware (Modified 51%)' },
    'DC': { rule: 'contributory', threshold: 0, label: 'District of Columbia (Contributory)' },
    'FL': { rule: 'pure', threshold: 100, label: 'Florida (Pure Comparative)' },
    'GA': { rule: 'modified_50', threshold: 50, label: 'Georgia (Modified 50%)' },
    'HI': { rule: 'modified_51', threshold: 51, label: 'Hawaii (Modified 51%)' },
    'ID': { rule: 'modified_50', threshold: 50, label: 'Idaho (Modified 50%)' },
    'IL': { rule: 'modified_51', threshold: 51, label: 'Illinois (Modified 51%)' },
    'IN': { rule: 'modified_51', threshold: 51, label: 'Indiana (Modified 51%)' },
    'IA': { rule: 'modified_51', threshold: 51, label: 'Iowa (Modified 51%)' },
    'KS': { rule: 'modified_50', threshold: 50, label: 'Kansas (Modified 50%)' },
    'KY': { rule: 'pure', threshold: 100, label: 'Kentucky (Pure Comparative)' },
    'LA': { rule: 'pure', threshold: 100, label: 'Louisiana (Pure Comparative)' },
    'ME': { rule: 'modified_50', threshold: 50, label: 'Maine (Modified 50%)' },
    'MD': { rule: 'contributory', threshold: 0, label: 'Maryland (Contributory)' },
    'MA': { rule: 'modified_51', threshold: 51, label: 'Massachusetts (Modified 51%)' },
    'MI': { rule: 'modified_51', threshold: 51, label: 'Michigan (Modified 51%)' },
    'MN': { rule: 'modified_51', threshold: 51, label: 'Minnesota (Modified 51%)' },
    'MS': { rule: 'pure', threshold: 100, label: 'Mississippi (Pure Comparative)' },
    'MO': { rule: 'pure', threshold: 100, label: 'Missouri (Pure Comparative)' },
    'MT': { rule: 'modified_51', threshold: 51, label: 'Montana (Modified 51%)' },
    'NE': { rule: 'modified_50', threshold: 50, label: 'Nebraska (Modified 50%)' },
    'NV': { rule: 'modified_51', threshold: 51, label: 'Nevada (Modified 51%)' },
    'NH': { rule: 'modified_51', threshold: 51, label: 'New Hampshire (Modified 51%)' },
    'NJ': { rule: 'modified_51', threshold: 51, label: 'New Jersey (Modified 51%)' },
    'NM': { rule: 'pure', threshold: 100, label: 'New Mexico (Pure Comparative)' },
    'NY': { rule: 'pure', threshold: 100, label: 'New York (Pure Comparative)' },
    'NC': { rule: 'contributory', threshold: 0, label: 'North Carolina (Contributory)' },
    'ND': { rule: 'modified_50', threshold: 50, label: 'North Dakota (Modified 50%)' },
    'OH': { rule: 'modified_51', threshold: 51, label: 'Ohio (Modified 51%)' },
    'OK': { rule: 'modified_50', threshold: 50, label: 'Oklahoma (Modified 50%)' },
    'OR': { rule: 'modified_51', threshold: 51, label: 'Oregon (Modified 51%)' },
    'PA': { rule: 'modified_51', threshold: 51, label: 'Pennsylvania (Modified 51%)' },
    'RI': { rule: 'pure', threshold: 100, label: 'Rhode Island (Pure Comparative)' },
    'SC': { rule: 'modified_51', threshold: 51, label: 'South Carolina (Modified 51%)' },
    'SD': { rule: 'pure', threshold: 100, label: 'South Dakota (Pure Comparative)' },
    'TN': { rule: 'modified_50', threshold: 50, label: 'Tennessee (Modified 50%)' },
    'TX': { rule: 'modified_51', threshold: 51, label: 'Texas (Modified 51%)' },
    'UT': { rule: 'modified_50', threshold: 50, label: 'Utah (Modified 50%)' },
    'VT': { rule: 'modified_51', threshold: 51, label: 'Vermont (Modified 51%)' },
    'VA': { rule: 'contributory', threshold: 0, label: 'Virginia (Contributory)' },
    'WA': { rule: 'pure', threshold: 100, label: 'Washington (Pure Comparative)' },
    'WV': { rule: 'modified_50', threshold: 50, label: 'West Virginia (Modified 50%)' },
    'WI': { rule: 'modified_51', threshold: 51, label: 'Wisconsin (Modified 51%)' },
    'WY': { rule: 'modified_51', threshold: 51, label: 'Wyoming (Modified 51%)' },
};

const STATES_NEGLIGENCE = [{ value: '', label: 'Select a state...' }, ...Object.entries(NEGLIGENCE_RULES).map(([key, value]) => ({ value: key, label: value.label }))];

const getFederalHolidays = (year: number) => {
    const holidays = new Set<string>();
    // New Year's Day
    holidays.add(`${year}-01-01`);
    // Martin Luther King, Jr.'s Birthday (Third Monday in January)
    const mtk = new Date(year, 0, 1);
    mtk.setDate(mtk.getDate() + (1 - mtk.getDay() + 7) % 7 + 14);
    holidays.add(mtk.toISOString().split('T')[0]);
    // Washington's Birthday (Third Monday in February)
    const wash = new Date(year, 1, 1);
    wash.setDate(wash.getDate() + (1 - wash.getDay() + 7) % 7 + 14);
    holidays.add(wash.toISOString().split('T')[0]);
    // Memorial Day (Last Monday in May)
    const mem = new Date(year, 5, 0);
    mem.setDate(mem.getDate() - (mem.getDay() - 1 + 7) % 7);
    holidays.add(mem.toISOString().split('T')[0]);
    // Juneteenth National Independence Day
    holidays.add(`${year}-06-19`);
    // Independence Day
    holidays.add(`${year}-07-04`);
    // Labor Day (First Monday in September)
    const labor = new Date(year, 8, 1);
    labor.setDate(labor.getDate() + (1 - labor.getDay() + 7) % 7);
    holidays.add(labor.toISOString().split('T')[0]);
    // Columbus Day (Second Monday in October)
    const columbus = new Date(year, 9, 1);
    columbus.setDate(columbus.getDate() + (1 - columbus.getDay() + 7) % 7 + 7);
    holidays.add(columbus.toISOString().split('T')[0]);
    // Veterans Day
    holidays.add(`${year}-11-11`);
    // Thanksgiving Day (Fourth Thursday in November)
    const thanks = new Date(year, 10, 1);
    thanks.setDate(thanks.getDate() + (4 - thanks.getDay() + 7) % 7 + 21);
    holidays.add(thanks.toISOString().split('T')[0]);
    // Christmas Day
    holidays.add(`${year}-12-25`);
    return holidays;
};

const formatCurrency = (value: number) => isNaN(value) ? '$0.00' : value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
const formatDate = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });


export const CALCULATORS: CalculatorDef[] = [
    {
        id: 'personal-injury-settlement',
        category: 'Core Value',
        name: 'Personal Injury Settlement Calculator',
        h1: 'The Ultimate Personal Injury Settlement Calculator',
        seoDescription: 'Instantly estimate your personal injury settlement. This advanced tool accounts for medical bills, lost wages, property damage, and out-of-pocket expenses, combined with a pain and suffering multiplier for a comprehensive valuation of your case.',
        description: (
            <div>
                <p>This foundational calculator offers a comprehensive starting point for understanding the potential value of a personal injury claim. By combining tangible financial losses (special damages) with an estimated value for pain and suffering, it provides a data-driven baseline for settlement discussions.</p>
                <Accordion title="What is the Personal Injury Settlement Calculator?">
                    <p>This tool calculates an estimated settlement value by adding your economic damages (medical bills, lost wages, property damage, etc.) and applying a "pain and suffering" multiplier to the injury-related damages. It's based on one of the most common formulas used by attorneys and insurance adjusters to value a claim.</p>
                </Accordion>
                <Accordion title="Why is this Calculation Important?">
                    <p>Knowing a potential settlement range empowers you during negotiations. It helps you set realistic expectations and provides a benchmark to evaluate offers from an insurance company. It ensures you account for all your financial losses and the significant, though less tangible, impact the injury has had on your life.</p>
                </Accordion>
                <Accordion title="How to Use the Calculator: Step-by-Step">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Total Medical Bills:</strong> Enter the complete cost of all medical care related to the injury. This includes everything from emergency room visits and surgery to physical therapy and prescriptions.</li>
                        <li><strong>Future Medical Bills (Optional):</strong> If you will require ongoing medical care, enter the estimated cost of this future treatment.</li>
                        <li><strong>Total Lost Wages:</strong> Input the gross income you lost from being unable to work. You can calculate this using our <Link to="/calculator/lost-wages-earning-capacity" className="text-blue-600 hover:underline">Lost Wages Calculator</Link>.</li>
                        <li><strong>Future Lost Wages (Optional):</strong> If your injury will prevent you from working in the future, estimate those lost earnings here.</li>
                        <li><strong>Out-of-Pocket Expenses (Optional):</strong> Include other costs you paid directly, like for transportation to doctor's appointments, medical equipment, or prescription co-pays.</li>
                        <li><strong>Property Damage (Optional):</strong> Enter the cost to repair or replace any damaged property, such as your vehicle.</li>
                        <li><strong>Pain & Suffering Multiplier:</strong> Select a multiplier between 1.5 (for minor injuries with a quick recovery) and 5 (for severe, permanent injuries). This number is subjective but crucial for valuing your non-economic damages.</li>
                    </ol>
                </Accordion>
                {DISCLAIMER}
            </div>
        ),
        inputs: [
            { name: 'medBills', label: 'Total Medical Bills ($)', type: 'number', placeholder: 'e.g., 10000', min: 0, required: true, tooltip: 'Enter the total amount of all medical bills related to your injury, including hospital stays, doctor visits, physical therapy, and prescriptions.' },
            { name: 'futureMedBills', label: 'Future Medical Bills ($) (Optional)', type: 'number', placeholder: 'e.g., 20000', min: 0, required: false, tooltip: 'Estimate the cost of all future medical care you will need because of the injury.' },
            { name: 'lostWages', label: 'Total Lost Wages ($)', type: 'number', placeholder: 'e.g., 5000', min: 0, required: true, tooltip: 'Enter the total gross income you lost from being unable to work due to your injury.' },
            { name: 'futureLostWages', label: 'Future Lost Wages ($) (Optional)', type: 'number', placeholder: 'e.g., 50000', min: 0, required: false, tooltip: 'Estimate the amount of future income you will lose due to a long-term or permanent inability to work at the same capacity.' },
            { name: 'outOfPocketExpenses', label: 'Out-of-Pocket Expenses ($) (Optional)', type: 'number', placeholder: 'e.g., 1500', min: 0, required: false, tooltip: 'Enter any other direct expenses you incurred, such as travel to medical appointments, prescription co-pays, or medical equipment.' },
            { name: 'propertyDamage', label: 'Property Damage ($) (Optional)', type: 'number', placeholder: 'e.g., 8000', min: 0, required: false, tooltip: 'Enter the value of any property that was damaged, such as your vehicle. Use our Property Damage calculator for help.' },
            { name: 'multiplier', label: 'Pain & Suffering Multiplier (1.5-5)', type: 'number', defaultValue: 1.5, min: 1.5, max: 5, step: 0.1, required: true, tooltip: 'This number (from 1.5 for minor injuries to 5 for severe ones) represents the severity of your pain and suffering. A higher value means a more significant impact on your life.' },
        ],
        calculate: ({ medBills = 0, futureMedBills = 0, lostWages = 0, futureLostWages = 0, outOfPocketExpenses = 0, propertyDamage = 0, multiplier = 1.5 }) => {
            const totalMedical = medBills + futureMedBills;
            const totalWages = lostWages + futureLostWages;
            const specialDamages = totalMedical + totalWages; // Damages the multiplier applies to
            const painAndSuffering = specialDamages * (multiplier - 1);
            const total = specialDamages * multiplier + outOfPocketExpenses + propertyDamage;
    
            const breakdown = [
                { label: 'Medical Bills', value: totalMedical, color: 'bg-blue-500' },
                { label: 'Lost Wages', value: totalWages, color: 'bg-yellow-500' },
                { label: 'Pain & Suffering', value: painAndSuffering, color: 'bg-purple-500' },
                { label: 'Out-of-Pocket', value: outOfPocketExpenses, color: 'bg-green-500' },
                { label: 'Property Damage', value: propertyDamage, color: 'bg-orange-500' },
            ];
            
            const filteredBreakdown = breakdown.filter(item => item.value > 0);
    
            return { 
                value: formatCurrency(total),
                breakdown: filteredBreakdown.length > 1 ? filteredBreakdown : undefined,
            };
        },
        faqs: [
            {
                question: "Why is a multiplier used for pain and suffering?",
                answer: <p>The multiplier method is a common approach used by insurance adjusters and attorneys to assign a monetary value to non-economic damages, which are subjective and hard to quantify. The idea is that the severity of pain and suffering is proportional to the severity of the tangible, economic damages (like medical bills). A higher multiplier reflects a more severe, painful, or life-altering injury.</p>,
                answerText: "The multiplier method is a common approach used by insurance adjusters and attorneys to assign a monetary value to non-economic damages, which are subjective and hard to quantify. The idea is that the severity of pain and suffering is proportional to the severity of the tangible, economic damages (like medical bills). A higher multiplier reflects a more severe, painful, or life-altering injury."
            },
            {
                question: "What are 'out-of-pocket' expenses?",
                answer: <p>Out-of-pocket expenses are any costs you paid directly due to your injury that aren't covered by medical bills or lost wages. Common examples include prescription co-pays, mileage for travel to and from doctor appointments, parking fees at hospitals, and the cost of medical equipment like crutches or braces.</p>,
                answerText: "Out-of-pocket expenses are any costs you paid directly due to your injury that aren't covered by medical bills or lost wages. Common examples include prescription co-pays, mileage for travel to and from doctor appointments, parking fees at hospitals, and the cost of medical equipment like crutches or braces."
            },
            {
                question: "Does this calculation include punitive damages?",
                answer: <p>No, this calculator does not estimate punitive damages. Punitive damages are not intended to compensate the victim for losses but rather to punish the defendant for extremely reckless or intentional misconduct. They are awarded only in rare cases by a court and are not part of a standard settlement calculation.</p>,
                answerText: "No, this calculator does not estimate punitive damages. Punitive damages are not intended to compensate the victim for losses but rather to punish the defendant for extremely reckless or intentional misconduct. They are awarded only in rare cases by a court and are not part of a standard settlement calculation."
            },
            {
                question: "What if I have pre-existing injuries?",
                answer: <p>Having a pre-existing injury can complicate a claim. The defendant is only responsible for the harm they caused. You must be able to prove that the accident aggravated or worsened your pre-existing condition. It is crucial to have clear medical documentation that distinguishes the new injuries or the worsening of the old condition from your baseline health before the incident.</p>,
                answerText: "Having a pre-existing injury can complicate a claim. The defendant is only responsible for the harm they caused. You must be able to prove that the accident aggravated or worsened your pre-existing condition. It is crucial to have clear medical documentation that distinguishes the new injuries or the worsening of the old condition from your baseline health before the incident."
            }
        ]
    },
    {
        id: 'pain-and-suffering-multiplier',
        category: 'Core Value',
        name: 'Pain and Suffering Multiplier Calculator',
        h1: 'Accurate Pain and Suffering Multiplier Calculator',
        seoDescription: 'Suggest a fair pain and suffering multiplier for your injury claim. Our advanced calculator uses a guided questionnaire about your injury\'s severity, recovery time, and long-term impact to determine an appropriate multiplier, providing a more objective valuation of non-economic damages.',
        description: (
             <div>
                <p>Quantifying the human impact of an injury is one of the most challenging aspects of a personal injury claim. This advanced calculator helps you estimate a more objective value for these "non-economic damages" by guiding you through factors that influence the multiplier.</p>
                <Accordion title="What is the Advanced Pain and Suffering Calculator?">
                    <p>Instead of guessing a multiplier, this tool asks you a series of questions about your injury's severity, recovery, and long-term impact. Based on your answers, it suggests a multiplier and calculates a pain and suffering value, providing a stronger justification for your claim.</p>
                </Accordion>
                <Accordion title="How to Use the Calculator: Step-by-Step">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Total Economic Damages:</strong> Enter the sum of all your measurable financial losses (medical bills, lost wages).</li>
                        <li><strong>Answer the Questions:</strong> Respond to the questions about recovery time, permanency of injury, daily pain, and scarring.</li>
                        <li><strong>Review Suggested Multiplier:</strong> The calculator will generate a suggested multiplier based on your inputs and calculate the final pain and suffering estimate.</li>
                    </ol>
                </Accordion>
                 {DISCLAIMER}
            </div>
        ),
        inputs: [
            { name: 'economicDamages', label: 'Total Economic Damages ($)', type: 'number', placeholder: 'e.g., 15000', min: 0, required: true, tooltip: 'This is the sum of your measurable financial losses, such as medical bills and lost wages.' },
            { name: 'recoveryDuration', label: 'Recovery Duration', type: 'select', defaultValue: '0-3', options: [
                { value: '0-3', label: '0-3 Months' },
                { value: '3-6', label: '3-6 Months' },
                { value: '6-12', label: '6-12 Months' },
                { value: '12+', label: 'Over 12 Months' },
            ], required: true, tooltip: 'How long did it take, or is it expected to take, to reach Maximum Medical Improvement?' },
            { name: 'permanency', label: 'Is the injury permanent?', type: 'checkbox', defaultValue: false, tooltip: 'Does the injury have lasting or life-long effects?' },
            { name: 'dailyPain', label: 'Does the injury cause daily pain?', type: 'checkbox', defaultValue: false, tooltip: 'Do you experience pain from the injury on a daily basis?' },
            { name: 'scarring', label: 'Did the injury result in visible scarring?', type: 'checkbox', defaultValue: false, tooltip: 'Is there permanent, visible scarring, particularly on the face, neck, or hands?' },
        ],
        calculate: ({ economicDamages = 0, recoveryDuration, permanency, dailyPain, scarring }) => {
            let multiplier = 1.5;
            let explanation = 'Base Multiplier: 1.5';
            if (recoveryDuration === '3-6') { multiplier += 0.5; explanation += ', +0.5 for 3-6 mo. recovery'; }
            else if (recoveryDuration === '6-12') { multiplier += 1.0; explanation += ', +1.0 for 6-12 mo. recovery'; }
            else if (recoveryDuration === '12+') { multiplier += 1.5; explanation += ', +1.5 for >12 mo. recovery'; }
            if (permanency) { multiplier += 1.0; explanation += ', +1.0 for permanency'; }
            if (dailyPain) { multiplier += 0.5; explanation += ', +0.5 for daily pain'; }
            if (scarring) { multiplier += 0.5; explanation += ', +0.5 for scarring'; }
            
            multiplier = Math.min(multiplier, 5.0); // Cap at 5.0
            const total = economicDamages * multiplier;
            
            const resultExplanation = (
                <div className="mt-2 text-sm text-gray-700">
                    <p><strong>Suggested Multiplier: {multiplier.toFixed(1)}</strong></p>
                    <p className="text-xs">({explanation})</p>
                </div>
            )

            return { value: formatCurrency(total), explanation: resultExplanation };
        },
        faqs: [
            {
                question: "Is the suggested multiplier guaranteed to be accepted by an insurance company?",
                answer: <p>No. The multiplier suggested by this calculator is an educated estimate designed to be a strong starting point for negotiations. An insurance company will have its own methods for valuing a claim and will likely start with a lower number. The final multiplier will be the result of negotiation, backed by evidence you provide.</p>,
                answerText: "No. The multiplier suggested by this calculator is an educated estimate designed to be a strong starting point for negotiations. An insurance company will have its own methods for valuing a claim and will likely start with a lower number. The final multiplier will be the result of negotiation, backed by evidence you provide."
            },
            {
                question: "What evidence is needed to justify a higher multiplier?",
                answer: <p>To justify a higher multiplier, you need strong documentation. This includes all medical records, photos of your injuries over time, a personal journal detailing your daily pain and limitations, and statements from friends, family, or coworkers about how the injury has impacted your life.</p>,
                answerText: "To justify a higher multiplier, you need strong documentation. This includes all medical records, photos of your injuries over time, a personal journal detailing your daily pain and limitations, and statements from friends, family, or coworkers about how the injury has impacted your life."
            },
            {
                question: "Can emotional distress be included in 'pain and suffering'?",
                answer: <p>Yes. The legal concept of "pain and suffering" is broad and covers all non-economic impacts of an injury. This includes physical pain as well as mental and emotional harm, such as anxiety, depression, insomnia, fear, and the loss of enjoyment of life.</p>,
                answerText: "Yes. The legal concept of 'pain and suffering' is broad and covers all non-economic impacts of an injury. This includes physical pain as well as mental and emotional harm, such as anxiety, depression, insomnia, fear, and the loss of enjoyment of life."
            }
        ]
    },
    {
        id: 'per-diem-method',
        category: 'Core Value',
        name: 'Per Diem Method Calculator',
        h1: 'Calculate Pain & Suffering with the Per Diem Method',
        seoDescription: 'Use the Per Diem method to calculate a daily value for your pain and suffering. This tool can automatically suggest a daily rate based on your annual salary or allow a custom rate. It\'s ideal for injuries with a clear recovery timeline.',
        description: (
             <div>
                <p>The "Per Diem" method offers an alternative, more straightforward approach to calculating pain and suffering damages. It assigns a specific dollar amount to each day you suffered from your injuries, from the date of the accident until you reached maximum recovery.</p>
                <Accordion title="How to Use the Calculator: Step-by-Step">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Annual Salary (Optional):</strong> Enter your gross annual salary to have the calculator suggest a daily rate for you.</li>
                        <li><strong>Daily Rate ($):</strong> The suggested rate will appear here, but you can override it with your own value. A common and defensible approach is to use your gross daily wage.</li>
                        <li><strong>Number of Days of Suffering:</strong> Enter the total number of days from the incident until your doctor declared you have reached "Maximum Medical Improvement" (MMI).</li>
                    </ol>
                </Accordion>
                {DISCLAIMER}
            </div>
        ),
        inputs: [
            { name: 'annualSalary', label: 'Your Annual Salary ($) (Optional)', type: 'number', placeholder: 'e.g., 52000', min: 0, tooltip: 'Enter your annual salary to automatically calculate a suggested daily rate (based on 260 work days/year).' },
            { name: 'dailyRate', label: 'Daily Rate ($)', type: 'number', placeholder: 'e.g., 200', min: 0, required: true, tooltip: 'A reasonable daily rate is often based on your daily earnings. This will be auto-filled if you provide a salary, but you can override it.' },
            { name: 'daysSuffering', label: 'Number of Days of Suffering', type: 'number', placeholder: 'e.g., 90', min: 0, required: true, tooltip: "Enter the total number of days from the date of injury until you reached 'maximum medical improvement' (MMI), as determined by a doctor." },
        ],
        calculate: ({ annualSalary = 0, dailyRate = 0, daysSuffering = 0 }) => {
            const suggestedRate = annualSalary > 0 ? annualSalary / 260 : 0;
            const rateToUse = dailyRate > 0 ? dailyRate : suggestedRate;
            const total = rateToUse * daysSuffering;
            const explanation = rateToUse > 0 ? `Calculated using a daily rate of ${formatCurrency(rateToUse)}.` : '';
            return { value: formatCurrency(total), explanation };
        },
        faqs: [
            {
                question: "Is the 'Per Diem' or 'Multiplier' method better for my case?",
                answer: <p>It depends on the nature of your injury. The Per Diem method is often most effective for short-term injuries with a clear and finite recovery period. The multiplier method is typically more suitable for long-term, permanent, or catastrophic injuries where the suffering will continue indefinitely.</p>,
                answerText: "It depends on the nature of your injury. The Per Diem method is often most effective for short-term injuries with a clear and finite recovery period. The multiplier method is typically more suitable for long-term, permanent, or catastrophic injuries where the suffering will continue indefinitely."
            },
            {
                question: "What is 'Maximum Medical Improvement' (MMI)?",
                answer: <p>MMI is a crucial legal and medical term. It signifies the point at which your condition has stabilized, and you are not expected to make any further significant recovery. This date, determined by a doctor, is often used as the end point for calculating per diem damages.</p>,
                answerText: "MMI is a crucial legal and medical term. It signifies the point at which your condition has stabilized, and you are not expected to make any further significant recovery. This date, determined by a doctor, is often used as the end point for calculating per diem damages."
            },
            {
                question: "Why is my daily salary used as a basis for the daily rate?",
                answer: <p>Using your gross daily wage is a common and legally defensible tactic. The argument presented to an insurance company or jury is simple and powerful: if you are paid a certain amount for a day of your labor and effort, then a day where you are forced to endure pain and suffering should be worth at least that same amount.</p>,
                answerText: "Using your gross daily wage is a common and legally defensible tactic. The argument presented to an insurance company or jury is simple and powerful: if you are paid a certain amount for a day of your labor and effort, then a day where you are forced to endure pain and suffering should be worth at least that same amount."
            }
        ]
    },
    {
        id: 'comparative-negligence-fault',
        category: 'Core Value',
        name: 'Comparative Negligence/Fault Calculator',
        h1: 'Adjust for Fault with the Comparative Negligence Calculator',
        seoDescription: 'Was the accident partially your fault? Use our advanced calculator to see how comparative or contributory negligence laws in your specific state affect your settlement. Enter your total damages and fault percentage for an accurate, state-adjusted final compensation.',
        description: (
            <div>
                <p>In the legal world, fault is rarely an all-or-nothing concept. This advanced calculator is essential for understanding how your final compensation is affected by your state's specific negligence laws if you are found to be partially responsible for the accident.</p>
                <Accordion title="How to Use the Calculator: Step-by-Step">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Total Damages ($):</strong> First, determine your total damages without considering fault. You can get a good estimate using our comprehensive <Link to="/calculator/personal-injury-settlement" className="text-blue-600 hover:underline">Personal Injury Settlement Calculator</Link>.</li>
                        <li><strong>Your Percentage of Fault (%):</strong> Enter the percentage of fault that you believe could be reasonably assigned to you.</li>
                        <li><strong>State of Incident:</strong> Select the state where the accident occurred to apply the correct legal rule.</li>
                    </ol>
                </Accordion>
                {DISCLAIMER}
            </div>
        ),
        inputs: [
            { name: 'totalDamages', label: 'Total Damages ($)', type: 'number', placeholder: 'e.g., 100000', min: 0, required: true, tooltip: 'This is the total estimated value of your claim *before* any reduction for your own fault.' },
            { name: 'userFault', label: 'Your Percentage of Fault (%)', type: 'percentage', placeholder: 'e.g., 20', min: 0, max: 100, step: 1, required: true, tooltip: 'Enter the percentage of fault attributed to you for the accident. For example, if you were 20% responsible, enter 20.' },
            { name: 'state', label: 'State of Incident', type: 'select', options: STATES_NEGLIGENCE, required: true, tooltip: 'Select the state to apply its specific negligence law (e.g., comparative, contributory).' },
        ],
        calculate: ({ totalDamages = 0, userFault = 0, state = '' }) => {
            if (!state) return { value: 'Please select a state.' };
            const rule = NEGLIGENCE_RULES[state as keyof typeof NEGLIGENCE_RULES];
            let recovery = 0;
            let explanation = '';

            if (rule.rule === 'contributory' && userFault > 0) {
                recovery = 0;
                explanation = `In a contributory negligence state, you cannot recover any damages if you are found to be even 1% at fault.`;
            } else if (rule.rule === 'modified_50' && userFault >= rule.threshold) {
                recovery = 0;
                explanation = `This state's 50% bar rule prevents recovery if you are 50% or more at fault.`;
            } else if (rule.rule === 'modified_51' && userFault >= rule.threshold) {
                recovery = 0;
                explanation = `This state's 51% bar rule prevents recovery if you are 51% or more at fault.`;
            } else {
                const faultPercent = userFault / 100;
                recovery = totalDamages * (1 - faultPercent);
                explanation = `Your recovery of ${formatCurrency(totalDamages)} is reduced by your ${userFault}% of fault.`;
            }
            return { value: formatCurrency(recovery), explanation };
        },
        faqs: [
            {
                question: "How is my percentage of fault determined?",
                answer: <p>Your percentage of fault is not a fixed number; it's a point of negotiation. It is determined by analyzing evidence such as police reports, witness statements, traffic laws, photos of the scene, and expert testimony. The insurance companies will argue for a higher percentage of fault for you, while your attorney will argue for a lower one. If the case goes to trial, the final percentage is decided by a judge or jury.</p>,
                answerText: "Your percentage of fault is not a fixed number; it's a point of negotiation. It is determined by analyzing evidence such as police reports, witness statements, traffic laws, photos of the scene, and expert testimony. The insurance companies will argue for a higher percentage of fault for you, while your attorney will argue for a lower one. If the case goes to trial, the final percentage is decided by a judge or jury."
            },
            {
                question: "What is the difference between 'contributory' and 'comparative' negligence?",
                answer: <p>Contributory negligence is a very harsh, old rule used by only a few states. If you are found to be even 1% at fault, you are barred from recovering any damages. Comparative negligence is the modern, more common standard. It reduces your recovery by your percentage of fault. For example, if you have $100,000 in damages but are 20% at fault, you can still recover $80,000.</p>,
                answerText: "Contributory negligence is a very harsh, old rule used by only a few states. If you are found to be even 1% at fault, you are barred from recovering any damages. Comparative negligence is the modern, more common standard. It reduces your recovery by your percentage of fault. For example, if you have $100,000 in damages but are 20% at fault, you can still recover $80,000."
            },
            {
                question: "What are the '50% Bar' and '51% Bar' rules?",
                answer: <p>These are types of 'modified' comparative negligence. In a '50% Bar' state (like Georgia), you cannot recover damages if you are 50% or more at fault. In a '51% Bar' state (like Texas), you cannot recover if you are 51% or more at fault. If your fault is below the bar, your recovery is reduced by your fault percentage.</p>,
                answerText: "These are types of 'modified' comparative negligence. In a '50% Bar' state (like Georgia), you cannot recover damages if you are 50% or more at fault. In a '51% Bar' state (like Texas), you cannot recover if you are 51% or more at fault. If your fault is below the bar, your recovery is reduced by your fault percentage."
            }
        ]
    },
    {
        id: 'lost-wages-earning-capacity',
        category: 'Core Value',
        name: 'Lost Wages/Earning Capacity Calculator',
        h1: 'Estimate Your Lost Wages and Earning Capacity',
        seoDescription: 'Determine the full value of your lost income claim, including benefits. This calculator estimates past lost wages and future earning capacity, factoring in salary and the value of lost employment benefits for a complete picture of your economic damages.',
        description: (
            <div>
                <p>An injury doesn't just create medical bills; it can also rob you of your ability to earn a living, both now and in the future. This advanced calculator helps you quantify the total compensation you've lost by calculating past lost wages and the present value of future lost earning capacity.</p>
                <Accordion title="How to Use the Calculator: Step-by-Step">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Your Annual Salary:</strong> Enter your gross annual income before taxes.</li>
                        <li><strong>Annual Value of Benefits ($) (Optional):</strong> Include the yearly value of benefits like 401(k) matching, health insurance premiums, etc.</li>
                        <li><strong>Work Days Missed:</strong> Input the total number of days you were medically required to miss work. This is for past lost wages.</li>
                        <li><strong>Estimated Future Annual Loss (Optional):</strong> If your injury will permanently reduce your earning ability, estimate the annual difference in income.</li>
                        <li><strong>Years of Future Loss (Optional):</strong> Enter the number of years you expect this future loss to continue, often up to retirement age.</li>
                        <li><strong>Discount Rate (%):</strong> This rate (typically 2-4%) is used to calculate the present value of your future losses, which is crucial for a lump-sum settlement.</li>
                    </ol>
                </Accordion>
                {DISCLAIMER}
            </div>
        ),
        inputs: [
            { name: 'currentWages', label: 'Your Annual Salary ($)', type: 'number', placeholder: 'e.g., 60000', min: 0, required: true, tooltip: 'Your gross annual salary before the injury occurred.' },
            { name: 'annualBenefitsValue', label: 'Annual Value of Benefits ($) (Optional)', type: 'number', placeholder: 'e.g., 15000', min: 0, tooltip: 'The annual value of lost benefits like 401(k) matching, health insurance, bonuses, etc.' },
            { name: 'daysMissed', label: 'Work Days Missed', type: 'number', placeholder: 'e.g., 30', min: 0, tooltip: 'The total number of workdays you were unable to work because of the injury.' },
            { name: 'futureLoss', label: 'Estimated Future Annual Loss ($) (Optional)', type: 'number', placeholder: 'e.g., 10000', min: 0, tooltip: 'If your injury will affect your future earnings, estimate the annual amount you expect to lose.' },
            { name: 'yearsFuture', label: 'Years of Future Loss (Optional)', type: 'number', placeholder: 'e.g., 10', min: 0, tooltip: 'For how many years do you expect your future earnings to be affected?' },
            { name: 'discountRate', label: 'Discount Rate (%) (for future loss)', type: 'percentage', defaultValue: 3, min: 0, max: 100, tooltip: 'An interest rate used to determine the present-day value of future money. A common rate is 2-4%.' },
        ],
        calculate: ({ currentWages = 0, annualBenefitsValue = 0, daysMissed = 0, futureLoss = 0, yearsFuture = 0, discountRate = 3 }) => {
            const totalAnnualComp = currentWages + annualBenefitsValue;
            const dailyComp = totalAnnualComp / 260; // Approx. work days in a year
            const pastLostWages = dailyComp * daysMissed;

            const r = discountRate / 100;
            const futureLostWagesPV = r === 0 
                ? futureLoss * yearsFuture 
                : futureLoss * ((1 - Math.pow(1 + r, -yearsFuture)) / r);
            
            const total = pastLostWages + futureLostWagesPV;
            
            const breakdown = [
                { label: 'Past Lost Compensation', value: pastLostWages, color: 'bg-yellow-500' },
                { label: 'Present Value of Future Loss', value: futureLostWagesPV, color: 'bg-red-500' },
            ];

            const filteredBreakdown = breakdown.filter(item => item.value > 0);

            return { 
                value: formatCurrency(total),
                breakdown: filteredBreakdown.length > 0 ? filteredBreakdown : undefined,
            };
        },
        faqs: [
            {
                question: "What is the difference between 'lost wages' and 'lost earning capacity'?",
                answer: <p>Lost wages refer to the actual, specific income you have already missed because of your inability to work. Lost earning capacity is a future-looking concept; it's the reduction in your ability to earn money over the course of your working life due to a permanent or long-term injury. Calculating lost earning capacity is more complex and often requires the help of an economic expert.</p>,
                answerText: "Lost wages refer to the actual, specific income you have already missed because of your inability to work. Lost earning capacity is a future-looking concept; it's the reduction in your ability to earn money over the course of your working life due to a permanent or long-term injury. Calculating lost earning capacity is more complex and often requires the help of an economic expert."
            },
            {
                question: "Why are my future losses 'discounted to present value'?",
                answer: <p>A settlement for future lost earnings is paid as a single lump sum today. However, those earnings would have been received over many years. The law requires that this future stream of income be 'discounted' to its present value. This is because a dollar received today is worth more than a dollar in the future, as it can be invested to earn interest. The discount rate represents this potential for investment growth.</p>,
                answerText: "A settlement for future lost earnings is paid as a single lump sum today. However, those earnings would have been received over many years. The law requires that this future stream of income be 'discounted' to its present value. This is because a dollar received today is worth more than a dollar in the future, as it can be invested to earn interest. The discount rate represents this potential for investment growth."
            },
            {
                question: "How do I prove my lost wages?",
                answer: <p>For employees, proving lost wages is usually straightforward. You will need documents like recent pay stubs, W-2 forms, and a letter from your employer confirming your rate of pay and the dates you were unable to work. It's important to document everything clearly.</p>,
                answerText: "For employees, proving lost wages is usually straightforward. You will need documents like recent pay stubs, W-2 forms, and a letter from your employer confirming your rate of pay and the dates you were unable to work. It's important to document everything clearly."
            },
            {
                question: "What if I am self-employed or work on commission?",
                answer: <p>Proving lost income is more complex if you are self-employed, a freelancer, or a commission-based worker. You will need to provide extensive documentation, such as tax returns, 1099 forms, profit and loss statements, invoices, and evidence of contracts or opportunities you had to turn down due to your injury.</p>,
                answerText: "Proving lost income is more complex if you are self-employed, a freelancer, or a commission-based worker. You will need to provide extensive documentation, such as tax returns, 1099 forms, profit and loss statements, invoices, and evidence of contracts or opportunities you had to turn down due to your injury."
            }
        ]
    },
    {
        id: 'statute-of-limitations-deadline',
        category: 'Time & Fees',
        name: 'Statute of Limitations Deadline Calculator',
        h1: 'Find Your Statute of Limitations Deadline',
        seoDescription: 'Don\'t miss the deadline to file a lawsuit. This critical tool calculates the statute of limitations for any state and accounts for the "discovery rule" if your injury was discovered after the incident date, ensuring you know the last day to take legal action.',
        description: (
             <div>
                <p>The Statute of Limitations is arguably the most important deadline in any personal injury case. This advanced calculator helps you find the correct deadline, even accounting for the "discovery rule" exception.</p>
                <Accordion title="How to Use the Calculator: Step-by-Step">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Date of Injury:</strong> Enter the exact date the incident occurred.</li>
                        <li><strong>Apply Discovery Rule?:</strong> Check this box if you only discovered the injury or its cause at a later date. This is common in cases like medical malpractice.</li>
                        <li><strong>Date of Discovery:</strong> If you checked the box, enter the date you discovered the injury. The clock starts from the later of the two dates.</li>
                        <li><strong>State:</strong> Select the state where the injury took place.</li>
                    </ol>
                </Accordion>
                {DISCLAIMER}
            </div>
        ),
        inputs: [
            { name: 'injuryDate', label: 'Date of Injury', type: 'date', required: true, tooltip: 'The exact date on which the injury occurred.' },
            { name: 'discoveryRule', label: 'Apply "Discovery Rule"?', type: 'checkbox', defaultValue: false, tooltip: 'Check this if you discovered the injury or its cause on a date later than the injury itself. The statute of limitations may start from the discovery date.' },
            { name: 'discoveryDate', label: 'Date of Discovery', type: 'date', required: false, tooltip: 'If the discovery rule applies, enter the date you reasonably discovered the injury.' },
            { name: 'state', label: 'State', type: 'select', options: STATES_SOL, required: true, tooltip: 'The state where the injury occurred, as laws vary by location.' },
        ],
        calculate: ({ injuryDate, state, discoveryRule, discoveryDate }) => {
            if (!injuryDate || !state) return { value: 'Please enter all required fields.' };
            if (discoveryRule && !discoveryDate) return { value: 'Please enter a discovery date.' };

            const iDate = new Date(injuryDate + 'T00:00:00');
            const dDate = discoveryRule && discoveryDate ? new Date(discoveryDate + 'T00:00:00') : null;

            let startDate = iDate;
            let explanation = `Starting from date of injury: ${formatDate(iDate)}.`;

            if (dDate && dDate > iDate) {
                startDate = dDate;
                explanation = `Starting from date of discovery: ${formatDate(dDate)}.`;
            }

            const deadline = new Date(startDate);
            deadline.setFullYear(deadline.getFullYear() + Number(state));
            
            return { value: formatDate(deadline), explanation };
        },
        faqs: [
            {
                question: "What happens if I miss the statute of limitations deadline?",
                answer: <p>If you fail to file a lawsuit before the statute of limitations expires, your case will almost certainly be dismissed by the court. You will permanently lose your right to seek compensation for your injuries from the at-fault party, regardless of how strong your case was. It is an absolute and final deadline.</p>,
                answerText: "If you fail to file a lawsuit before the statute of limitations expires, your case will almost certainly be dismissed by the court. You will permanently lose your right to seek compensation for your injuries from the at-fault party, regardless of how strong your case was. It is an absolute and final deadline."
            },
            {
                question: "Does negotiating with an insurance company pause the deadline?",
                answer: <p>No. This is a critical point that many people misunderstand. Engaging in settlement negotiations, sending demand letters, or talking to an insurance adjuster does NOT stop the statute of limitations clock from running. The only way to officially pause (or "toll") the statute is by formally filing a lawsuit in the correct court.</p>,
                answerText: "No. This is a critical point that many people misunderstand. Engaging in settlement negotiations, sending demand letters, or talking to an insurance adjuster does NOT stop the statute of limitations clock from running. The only way to officially pause (or 'toll') the statute is by formally filing a lawsuit in the correct court."
            },
            {
                question: "Are there other exceptions that can extend the deadline?",
                answer: <p>Yes, besides the 'discovery rule,' some specific circumstances can extend the deadline. For example, if the injured party was a minor at the time of the incident, the statute of limitations clock may not start running until they reach the age of 18. These exceptions are complex and vary significantly by state, making legal consultation essential.</p>,
                answerText: "Yes, besides the 'discovery rule,' some specific circumstances can extend the deadline. For example, if the injured party was a minor at the time of the incident, the statute of limitations clock may not start running until they reach the age of 18. These exceptions are complex and vary significantly by state, making legal consultation essential."
            }
        ]
    },
    {
        id: 'legal-deadline-rollover',
        category: 'Time & Fees',
        name: 'Legal Deadline Rollover Calculator',
        h1: 'Legal Deadline Weekend & Holiday Rollover Calculator',
        seoDescription: 'What happens if your legal deadline falls on a weekend or holiday? This advanced calculator automatically adjusts your filing date to the next business day, accounting for both weekends and official federal holidays to prevent a critical error.',
        description: (
             <div>
                <p>This calculator helps you determine your true filing date by accounting for weekends and federal holidays, preventing a potentially disastrous missed deadline.</p>
                <Accordion title="How to Use the Calculator: Step-by-Step">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Calculated Deadline Date:</strong> Enter the legal deadline you have already determined.</li>
                        <li><strong>Rollover for Weekend/Holiday?:</strong> Keep this box checked to apply the rule that moves a weekend or holiday deadline to the next business day.</li>
                    </ol>
                </Accordion>
                {DISCLAIMER}
            </div>
        ),
        inputs: [
            { name: 'deadlineDate', label: 'Calculated Deadline Date', type: 'date', required: true, tooltip: 'The original calculated deadline for your legal filing.' },
            { name: 'rollover', label: 'Rollover for Weekend/Holiday?', type: 'checkbox', defaultValue: true, tooltip: 'Check this box if court rules allow deadlines falling on a weekend or holiday to be moved to the next business day.' },
        ],
        calculate: ({ deadlineDate, rollover }) => {
            if (!deadlineDate) return { value: 'Please enter a date.' };
            let date = new Date(deadlineDate + 'T00:00:00');
            let explanation = `Original Deadline: ${formatDate(date)}`;
            
            if (rollover) {
                const holidays = getFederalHolidays(date.getFullYear());
                let rolled = false;
                while (true) {
                    const day = date.getDay();
                    const dateString = date.toISOString().split('T')[0];
                    const isHoliday = holidays.has(dateString);
                    
                    if (day === 0) { // Sunday
                        date.setDate(date.getDate() + 1);
                        explanation += `. Rolls over from Sunday`;
                        rolled = true;
                    } else if (day === 6) { // Saturday
                        date.setDate(date.getDate() + 2);
                        explanation += `. Rolls over from Saturday`;
                        rolled = true;
                    } else if (isHoliday) {
                        date.setDate(date.getDate() + 1);
                        explanation += `. Rolls over from holiday (${dateString})`;
                        rolled = true;
                    } else {
                        break;
                    }
                }
                if (!rolled) {
                    explanation += `. Falls on a business day.`;
                }
            }
            return { value: formatDate(date), explanation };
        },
        faqs: [
            {
                question: "Does this rule apply to all legal deadlines?",
                answer: <p>This rollover rule generally applies to deadlines for filing documents with a court, as courts are closed on weekends and holidays. However, it may not apply to all legal deadlines, such as a deadline to respond to an insurance company's offer or a contractual deadline. Always verify the specific rules governing your deadline.</p>,
                answerText: "This rollover rule generally applies to deadlines for filing documents with a court, as courts are closed on weekends and holidays. However, it may not apply to all legal deadlines, such as a deadline to respond to an insurance company's offer or a contractual deadline. Always verify the specific rules governing your deadline."
            },
            {
                question: "What about state or local holidays?",
                answer: <p>This calculator only accounts for official federal holidays. Many state and local courts observe additional holidays (e.g., Patriots' Day in Massachusetts). If your deadline is in a state court, you must manually check for state-specific holidays that could affect your filing date.</p>,
                answerText: "This calculator only accounts for official federal holidays. Many state and local courts observe additional holidays (e.g., Patriots' Day in Massachusetts). If your deadline is in a state court, you must manually check for state-specific holidays that could affect your filing date."
            },
            {
                question: "Is it safe to file on the adjusted deadline?",
                answer: <p>While the rollover rule is standard practice, it is always safest to file documents well in advance of any deadline. Relying on a last-day rollover is risky, as unexpected issues like technical glitches with e-filing systems or office closures can cause you to miss the deadline, which can be catastrophic for your case.</p>,
                answerText: "While the rollover rule is standard practice, it is always safest to file documents well in advance of any deadline. Relying on a last-day rollover is risky, as unexpected issues like technical glitches with e-filing systems or office closures can cause you to miss the deadline, which can be catastrophic for your case."
            }
        ]
    },
    {
        id: 'attorney-fee-client-recovery',
        category: 'Time & Fees',
        name: 'Attorney Fee/Client Recovery Calculator',
        h1: 'Attorney Fee and Net Client Recovery Calculator',
        seoDescription: 'See how much money you\'ll take home from a settlement. This advanced calculator provides a transparent breakdown of your recovery, accounting for different attorney fee structures (gross vs. net), case costs, and medical liens to show your true net payout.',
        description: (
             <div>
                <p>This calculator provides a transparent breakdown of where the settlement money goes, helping you see your final net recovery. This advanced version lets you specify how the attorney's fee is calculated.</p>
                <Accordion title="How to Use the Calculator: Step-by-Step">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Gross Settlement Amount ($):</strong> Enter the total settlement amount.</li>
                        <li><strong>Contingency Fee (%):</strong> Input your attorney's fee percentage.</li>
                        <li><strong>Fee Calculation Method:</strong> Select whether the fee is calculated on the gross amount or after costs are deducted. Check your fee agreement.</li>
                        <li><strong>Case Costs ($):</strong> Enter total expenses your attorney fronted.</li>
                        <li><strong>Medical Liens/Bills ($):</strong> Input the amount to be paid back to insurers/providers.</li>
                    </ol>
                </Accordion>
                {DISCLAIMER}
            </div>
        ),
        inputs: [
            { name: 'grossSettlement', label: 'Gross Settlement Amount ($)', type: 'number', placeholder: 'e.g., 100000', min: 0, required: true, tooltip: 'The total amount the opposing party has agreed to pay to settle the case, before any deductions.' },
            { name: 'contingencyFee', label: 'Contingency Fee (%)', type: 'percentage', defaultValue: 33.33, min: 0, max: 100, required: true, tooltip: 'The percentage of the settlement that your attorney will receive as payment.' },
            { name: 'feeMethod', label: 'Fee Calculation Method', type: 'select', defaultValue: 'gross', options: [{value: 'gross', label:'From Gross Settlement'}, {value: 'net', label:'After Costs'}], required: true, tooltip: 'Is the fee calculated before (gross) or after (net) case costs are deducted? Check your fee agreement.' },
            { name: 'caseCosts', label: 'Case Costs ($)', type: 'number', placeholder: 'e.g., 2500', min: 0, required: true, tooltip: 'Expenses paid by your attorney to pursue your case, such as filing fees, expert witness fees, and deposition costs.' },
            { name: 'lienAmount', label: 'Medical Liens/Bills ($)', type: 'number', placeholder: 'e.g., 10000', min: 0, required: true, tooltip: 'The total amount that must be repaid to insurance companies or medical providers from your settlement.' },
        ],
        calculate: ({ grossSettlement = 0, contingencyFee = 33.33, feeMethod = 'gross', caseCosts = 0, lienAmount = 0 }) => {
            let feeAmount = 0;
            if (feeMethod === 'gross') {
                feeAmount = grossSettlement * (contingencyFee / 100);
            } else {
                feeAmount = (grossSettlement - caseCosts) * (contingencyFee / 100);
            }
            const netRecovery = grossSettlement - feeAmount - caseCosts - lienAmount;
            
            const explanation = (
                <div className="space-y-2 mt-4 text-left">
                    <p><strong>Gross Settlement:</strong> {formatCurrency(grossSettlement)}</p>
                    <p className="text-red-600"><strong>- Case Costs:</strong> {formatCurrency(caseCosts)}</p>
                    <p className="text-red-600"><strong>- Attorney Fee ({contingencyFee}% of {feeMethod === 'gross' ? 'Gross' : 'Net'}):</strong> {formatCurrency(feeAmount)}</p>
                    <p className="text-red-600"><strong>- Medical Liens:</strong> {formatCurrency(lienAmount)}</p>
                    <hr className="my-2"/>
                    <p className="font-bold"><strong>Your Estimated Net Recovery:</strong> {formatCurrency(netRecovery)}</p>
                </div>
            );
            return { value: formatCurrency(netRecovery), explanation };
        },
        faqs: [
            {
                question: "Are 'case costs' the same as 'attorney fees'?",
                answer: <p>No, they are different. The attorney fee is the percentage the lawyer earns for their services. Case costs are the out-of-pocket expenses the law firm pays to advance your case, such as court filing fees, expert witness fees, deposition transcripts, and postage. These costs are typically reimbursed to the law firm from the settlement before you receive your net recovery.</p>,
                answerText: "No, they are different. The attorney fee is the percentage the lawyer earns for their services. Case costs are the out-of-pocket expenses the law firm pays to advance your case, such as court filing fees, expert witness fees, deposition transcripts, and postage. These costs are typically reimbursed to the law firm from the settlement before you receive your net recovery."
            },
            {
                question: "Why is the fee calculation method ('gross' vs. 'after costs') important?",
                answer: <p>This detail, which should be specified in your fee agreement, determines how much the attorney is paid. A fee calculated on the 'gross' amount is based on the total settlement before any deductions. A fee calculated 'after costs' is based on the settlement amount minus case costs. A fee calculated 'after costs' is more favorable to the client, as the attorney's percentage is taken from a slightly smaller number, resulting in a slightly higher net recovery for you.</p>,
                answerText: "This detail, which should be specified in your fee agreement, determines how much the attorney is paid. A fee calculated on the 'gross' amount is based on the total settlement before any deductions. A fee calculated 'after costs' is based on the settlement amount minus case costs. A fee calculated 'after costs' is more favorable to the client, as the attorney's percentage is taken from a slightly smaller number, resulting in a slightly higher net recovery for you."
            },
            {
                question: "Can I negotiate my medical liens?",
                answer: <p>Often, yes. A medical lien is a legal right for an insurer or provider to be repaid from your settlement. However, a skilled attorney can frequently negotiate with these entities to reduce the amount they are owed. Every dollar saved on a lien is a dollar that goes directly into your pocket, so lien negotiation is a crucial part of maximizing a client's final recovery.</p>,
                answerText: "Often, yes. A medical lien is a legal right for an insurer or provider to be repaid from your settlement. However, a skilled attorney can frequently negotiate with these entities to reduce the amount they are owed. Every dollar saved on a lien is a dollar that goes directly into your pocket, so lien negotiation is a crucial part of maximizing a client's final recovery."
            }
        ]
    },
    {
        id: 'wrongful-death-claim',
        category: 'Specialized',
        name: 'Wrongful Death Claim Calculator',
        h1: 'Estimate a Wrongful Death Claim Value',
        seoDescription: 'Estimate the economic damages in a wrongful death lawsuit with our advanced calculator. This tool projects future lost income and the value of lost services, discounts it to present value, and includes funeral expenses to provide a comprehensive baseline for your family\'s claim.',
        description: (
             <div>
                <p>This advanced calculator provides a more detailed estimate of economic damages in a wrongful death case by including lost services, funeral expenses, and discounting future losses to their present value.</p>
                <Accordion title="How to Use the Calculator: Step-by-Step">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Deceased's Annual Income ($):</strong> Enter the gross annual income of the person who passed away.</li>
                        <li><strong>Annual Value of Lost Services ($):</strong> Estimate the yearly value of services the deceased provided (e.g., childcare, home maintenance).</li>
                        <li><strong>Remaining Work Life Expectancy (Years):</strong> Input the number of years the deceased was expected to work until retirement.</li>
                        <li><strong>Funeral Expenses ($):</strong> Enter the total cost of funeral and burial expenses.</li>
                        <li><strong>Discount Rate (%):</strong> Enter a rate (typically 2-4%) to calculate the present value of future losses.</li>
                    </ol>
                </Accordion>
                {DISCLAIMER}
            </div>
        ),
        inputs: [
            { name: 'deceasedIncome', label: 'Deceased\'s Annual Income ($)', type: 'number', placeholder: 'e.g., 75000', min: 0, required: true, tooltip: "The deceased person's gross annual income at the time of their death." },
            { name: 'lostServices', label: 'Annual Value of Lost Services ($)', type: 'number', placeholder: 'e.g., 20000', min: 0, tooltip: 'The yearly financial value of services the deceased provided, such as childcare, cooking, and home repairs.'},
            { name: 'lifeExpectancy', label: 'Remaining Work Life Expectancy (Years)', type: 'number', placeholder: 'e.g., 25', min: 0, required: true, tooltip: 'The number of years the deceased was expected to continue working.' },
            { name: 'funeralExpenses', label: 'Funeral Expenses ($)', type: 'number', placeholder: 'e.g., 15000', min: 0, tooltip: 'The total cost of the funeral, burial, or cremation.' },
            { name: 'discountRate', label: 'Discount Rate (%)', type: 'percentage', defaultValue: 3, min: 0, max: 100, required: true, tooltip: 'An interest rate used to determine the present-day value of future money. A common rate is 2-4%.' },
        ],
        calculate: ({ deceasedIncome = 0, lostServices = 0, lifeExpectancy = 0, funeralExpenses = 0, discountRate = 3 }) => {
            const annualLoss = deceasedIncome + lostServices;
            const r = discountRate / 100;
            const presentValueOfFutureLoss = r === 0 ? annualLoss * lifeExpectancy : annualLoss * ((1 - Math.pow(1 + r, -lifeExpectancy)) / r);
            const total = presentValueOfFutureLoss + funeralExpenses;
            return { value: formatCurrency(total) };
        },
        faqs: [
            {
                question: "Does this calculator cover all damages in a wrongful death case?",
                answer: <p>No. This calculator focuses on *economic* damages—the measurable financial losses like income and services. Wrongful death cases also involve significant *non-economic* damages, which compensate the surviving family for their loss of companionship, guidance, and emotional support. These damages are very subjective and are not calculated here.</p>,
                answerText: "No. This calculator focuses on *economic* damages—the measurable financial losses like income and services. Wrongful death cases also involve significant *non-economic* damages, which compensate the surviving family for their loss of companionship, guidance, and emotional support. These damages are very subjective and are not calculated here."
            },
            {
                question: "What are 'lost services' and how are they valued?",
                answer: <p>Lost services represent the monetary value of the tasks and contributions the deceased person provided to the household. This can include childcare, cooking, cleaning, home repairs, financial management, and more. Economists often calculate this value by determining the market cost to hire someone to perform those same services.</p>,
                answerText: "Lost services represent the monetary value of the tasks and contributions the deceased person provided to the household. This can include childcare, cooking, cleaning, home repairs, financial management, and more. Economists often calculate this value by determining the market cost to hire someone to perform those same services."
            },
            {
                question: "Why are future losses 'discounted to present value'?",
                answer: <p>A wrongful death settlement is paid as a single lump sum today. However, the financial losses it covers would have been earned over many years in the future. The law requires that this future stream of income be 'discounted' to its present value. This is because a dollar today is worth more than a dollar in the future, as it can be invested to earn interest. The discount rate represents this potential investment growth.</p>,
                answerText: "A wrongful death settlement is paid as a single lump sum today. However, the financial losses it covers would have been earned over many years in the future. The law requires that this future stream of income be 'discounted' to its present value. This is because a dollar today is worth more than a dollar in the future, as it can be invested to earn interest. The discount rate represents this potential investment growth."
            }
        ]
    },
    {
        id: 'property-damage-value',
        category: 'Specialized',
        name: 'Property Damage Value Calculator',
        h1: 'Calculate Your Property Damage Value',
        seoDescription: 'Get a fair valuation for your damaged vehicle after an accident. This advanced calculator determines if your vehicle is a total loss based on its Actual Cash Value (ACV) and repair costs. It also allows you to factor in diminished value for repairable vehicles.',
        description: (
             <div>
                <p>This advanced calculator helps you determine if your vehicle is a "total loss" and estimate the value of your claim, including potential "diminished value"—the loss in resale value even after repairs.</p>
                <Accordion title="How to Use the Calculator: Step-by-Step">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Vehicle's Actual Cash Value (ACV) ($):</strong> Enter the market value of your vehicle right before the crash. Use sites like KBB or Edmunds for this.</li>
                        <li><strong>Cost to Repair ($):</strong> Enter the total estimated cost from a reputable repair shop.</li>
                        <li><strong>Total Loss Threshold (%):</strong> The percentage of ACV at which an insurer declares a total loss (usually 70-80%).</li>
                        <li><strong>Estimated Diminished Value ($) (Optional):</strong> If the vehicle is repaired, estimate the loss in its resale value due to the accident history.</li>
                    </ol>
                </Accordion>
                {DISCLAIMER}
            </div>
        ),
        inputs: [
            { name: 'vehicleACV', label: 'Vehicle\'s Actual Cash Value (ACV) ($)', type: 'number', placeholder: 'e.g., 20000', min: 0, required: true, tooltip: 'The fair market value of your vehicle immediately before the accident occurred.' },
            { name: 'repairCost', label: 'Cost to Repair ($)', type: 'number', placeholder: 'e.g., 16000', min: 0, required: true, tooltip: 'The estimated cost to repair the damaged property to its pre-accident condition.' },
            { name: 'totalLossThreshold', label: 'Total Loss Threshold (%)', type: 'percentage', defaultValue: 75, min: 1, max: 100, tooltip: 'The threshold at which an insurance company will declare the vehicle a total loss (typically 70-80% of ACV).'},
            { name: 'diminishedValue', label: 'Estimated Diminished Value ($) (Optional)', type: 'number', placeholder: 'e.g., 2000', min: 0, tooltip: "If repaired, this is the estimated loss in your vehicle's resale value because of its accident history." },
        ],
        calculate: ({ vehicleACV = 0, repairCost = 0, totalLossThreshold = 75, diminishedValue = 0 }) => {
            const threshold = vehicleACV * (totalLossThreshold / 100);
            const isTotalLoss = repairCost >= threshold;
            
            if (isTotalLoss) {
                return { value: formatCurrency(vehicleACV), explanation: `Repair costs exceed the ${totalLossThreshold}% threshold. The claim value is the vehicle's ACV.` };
            } else {
                const total = repairCost + diminishedValue;
                let explanation = `Claim value is the cost of repairs.`;
                if(diminishedValue > 0) {
                    explanation += ` An additional ${formatCurrency(diminishedValue)} for diminished value has been included.`;
                }
                return { value: formatCurrency(total), explanation };
            }
        },
        faqs: [
            {
                question: "How do I determine my car's Actual Cash Value (ACV)?",
                answer: <p>The ACV is the market value of your vehicle right before the accident. To find it, use online resources like Kelley Blue Book (KBB), NADAguides, or Edmunds. Be sure to accurately input your car's mileage, options, and pre-accident condition (e.g., 'Excellent', 'Good', 'Fair'). It's wise to check multiple sources to get a reliable average.</p>,
                answerText: "The ACV is the market value of your vehicle right before the accident. To find it, use online resources like Kelley Blue Book (KBB), NADAguides, or Edmunds. Be sure to accurately input your car's mileage, options, and pre-accident condition (e.g., 'Excellent', 'Good', 'Fair'). It's wise to check multiple sources to get a reliable average."
            },
            {
                question: "What is 'Diminished Value' and can I claim it?",
                answer: <p>Diminished value is the loss in a vehicle's resale value simply because it has been in an accident, even if it has been perfectly repaired. Most buyers will pay less for a car with an accident history. Whether you can successfully claim diminished value depends on your state's laws and the specifics of your case. It is typically easiest to claim from the at-fault driver's insurance ('third-party claim').</p>,
                answerText: "Diminished value is the loss in a vehicle's resale value simply because it has been in an accident, even if it has been perfectly repaired. Most buyers will pay less for a car with an accident history. Whether you can successfully claim diminished value depends on your state's laws and the specifics of your case. It is typically easiest to claim from the at-fault driver's insurance ('third-party claim')."
            },
            {
                question: "What if I disagree with the insurance company's valuation of my car?",
                answer: <p>You do not have to accept the insurance company's first offer. If you believe their ACV for your totaled car is too low, you can present your own evidence. This can include printouts from valuation sites like KBB, as well as advertisements for comparable vehicles for sale in your local area. If they still won't offer a fair value, you can consider hiring an independent appraiser.</p>,
                answerText: "You do not have to accept the insurance company's first offer. If you believe their ACV for your totaled car is too low, you can present your own evidence. This can include printouts from valuation sites like KBB, as well as advertisements for comparable vehicles for sale in your local area. If they still won't offer a fair value, you can consider hiring an independent appraiser."
            }
        ]
    },
    {
        id: 'present-value-future-damages',
        category: 'Specialized',
        name: 'Present Value of Future Damages Calculator',
        h1: 'Present Value of Future Damages Calculator',
        seoDescription: 'Calculate the present value of a future damages award for a lump-sum settlement. This advanced financial tool converts future payments into a single, present-day amount, accounting for both a discount rate and a future growth rate for maximum accuracy.',
        description: (
             <div>
                <p>This advanced financial calculator determines the lump-sum amount needed today to cover future expenses by accounting for both a discount rate (for investment potential) and a growth rate (for inflation).</p>
                <Accordion title="How to Use the Calculator: Step-by-Step">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Future Annual Payout ($):</strong> Enter the amount of money needed for damages for the first year.</li>
                        <li><strong>Number of Payout Years:</strong> Input the total number of years these costs are expected to continue.</li>
                        <li><strong>Discount Rate (%):</strong> Enter the rate used to discount future money to its present value (e.g., a conservative investment return rate).</li>
                        <li><strong>Annual Growth Rate (%):</strong> Enter the rate at which the annual payout is expected to grow (e.g., inflation rate for medical costs).</li>
                    </ol>
                </Accordion>
                {DISCLAIMER}
            </div>
        ),
        inputs: [
            { name: 'futurePayout', label: 'Future Annual Payout ($)', type: 'number', placeholder: 'e.g., 50000', min: 0, required: true, tooltip: 'The total amount of money you expect to need for damages for the first year in the future.' },
            { name: 'payoutYears', label: 'Number of Payout Years', type: 'number', placeholder: 'e.g., 20', min: 0, required: true, tooltip: 'The number of years over which you expect to receive these future payouts.' },
            { name: 'discountRate', label: 'Discount Rate (%)', type: 'percentage', defaultValue: 3, min: 0, max: 100, required: true, tooltip: 'An interest rate used to determine the present-day value of future money, reflecting investment potential. A common rate is 2-4%.' },
            { name: 'growthRate', label: 'Annual Growth Rate (%)', type: 'percentage', defaultValue: 2, min: 0, max: 100, tooltip: 'The rate at which the annual payout is expected to increase each year (e.g., due to inflation).'},
        ],
        calculate: ({ futurePayout = 0, payoutYears = 0, discountRate = 3, growthRate = 2 }) => {
            const r = discountRate / 100;
            const g = growthRate / 100;
            
            if (r === g) {
                return { value: formatCurrency(futurePayout * payoutYears), explanation: 'When discount rate equals growth rate, present value is simply the sum of all payments.' };
            }
            if (r === 0) { // Should not happen with validation but good to have
                 return { value: formatCurrency(futurePayout * payoutYears) };
            }
            // Present Value of a Growing Annuity
            const presentValue = futurePayout * ((1 - Math.pow((1 + g) / (1 + r), payoutYears)) / (r - g));
            return { value: formatCurrency(presentValue) };
        },
        faqs: [
            {
                question: "What is a 'discount rate' and why is it used?",
                answer: <p>A discount rate is an interest rate used to determine the present-day value of money to be received in the future. It's based on the principle of the 'time value of money'—a dollar today is worth more than a dollar tomorrow because it can be invested and earn interest. In legal settlements, a future stream of damages (like 20 years of medical care) must be reduced to a single lump-sum value for today, and the discount rate is how this reduction is calculated.</p>,
                answerText: "A discount rate is an interest rate used to determine the present-day value of money to be received in the future. It's based on the principle of the 'time value of money'—a dollar today is worth more than a dollar tomorrow because it can be invested and earn interest. In legal settlements, a future stream of damages (like 20 years of medical care) must be reduced to a single lump-sum value for today, and the discount rate is how this reduction is calculated."
            },
            {
                question: "Why is there also an 'annual growth rate'?",
                answer: <p>The growth rate accounts for inflation. The costs of future needs, like medical care or living expenses, are expected to rise over time. The growth rate counteracts the discount rate. The 'net discount rate' (discount rate minus growth rate) is often the real point of contention in legal arguments, as it determines the final present value.</p>,
                answerText: "The growth rate accounts for inflation. The costs of future needs, like medical care or living expenses, are expected to rise over time. The growth rate counteracts the discount rate. The 'net discount rate' (discount rate minus growth rate) is often the real point of contention in legal arguments, as it determines the final present value."
            },
            {
                question: "Who decides on the discount and growth rates?",
                answer: <p>These rates are a critical part of a legal case involving future damages and are often fiercely debated. Each side (plaintiff and defendant) will hire its own economic expert to argue for a rate that is favorable to them. A plaintiff's expert will argue for a lower discount rate (which results in a higher present value), while a defendant's expert will argue for a higher discount rate (which results in a lower present value).</p>,
                answerText: "These rates are a critical part of a legal case involving future damages and are often fiercely debated. Each side (plaintiff and defendant) will hire its own economic expert to argue for a rate that is favorable to them. A plaintiff's expert will argue for a lower discount rate (which results in a higher present value), while a defendant's expert will argue for a higher discount rate (which results in a lower present value)."
            }
        ]
    },
    {
        id: 'medical-malpractice-settlement',
        category: 'Specialized',
        name: 'Medical Malpractice Settlement Calculator',
        h1: 'Medical Malpractice Settlement Estimator',
        seoDescription: 'Estimate your potential medical malpractice settlement. This advanced calculator considers economic and non-economic damages and adjusts for state-specific caps, including whether the cap applies to only non-economic damages or the total award.',
        description: (
             <div>
                <p>This advanced calculator provides a framework to estimate a malpractice settlement by factoring in different types of state-mandated caps on damages.</p>
                <Accordion title="How to Use the Calculator: Step-by-Step">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Economic Damages ($):</strong> Enter all financial losses (past/future medical bills, lost income).</li>
                        <li><strong>Estimated Non-Economic Damages ($):</strong> Input the value of your pain and suffering.</li>
                        <li><strong>State Damage Cap ($) (If applicable):</strong> If your state limits damages, enter that cap here.</li>
                        <li><strong>Cap Type:</strong> Specify if the state cap applies only to non-economic damages or to the total award.</li>
                    </ol>
                </Accordion>
                {DISCLAIMER}
            </div>
        ),
        inputs: [
            { name: 'economicDamages', label: 'Economic Damages ($)', type: 'number', placeholder: 'e.g., 250000', min: 0, required: true, tooltip: 'The sum of your measurable financial losses, including medical bills, lost income, and rehabilitation costs.' },
            { name: 'nonEconomicDamages', label: 'Estimated Non-Economic Damages ($)', type: 'number', placeholder: 'e.g., 500000', min: 0, required: true, tooltip: 'The estimated value of your pain, suffering, emotional distress, and loss of enjoyment of life.' },
            { name: 'stateCap', label: 'State Damage Cap ($) (If applicable)', type: 'number', placeholder: 'e.g., 250000', min: 0, tooltip: "Many states limit damages that can be awarded in a malpractice case. Enter your state's cap if you know it." },
            { name: 'capType', label: 'Cap Type (If applicable)', type: 'select', defaultValue: 'non-economic', options: [{value: 'non-economic', label:'Non-Economic Only'}, {value: 'total', label:'Total Damages'}], tooltip: 'Does the state cap apply only to non-economic damages or to the total value of the award?' },
        ],
        calculate: ({ economicDamages = 0, nonEconomicDamages = 0, stateCap = 0, capType = 'non-economic' }) => {
            if (stateCap <= 0) {
                 const total = economicDamages + nonEconomicDamages;
                 return { value: formatCurrency(total), explanation: 'No damage cap applied.' };
            }

            let explanation = '';
            let total = 0;
            if(capType === 'non-economic') {
                const cappedNonEconomic = Math.min(nonEconomicDamages, stateCap);
                total = economicDamages + cappedNonEconomic;
                explanation = `Non-economic damages capped at ${formatCurrency(stateCap)}.`;
            } else { // 'total'
                const preCapTotal = economicDamages + nonEconomicDamages;
                total = Math.min(preCapTotal, stateCap);
                explanation = `Total damages capped at ${formatCurrency(stateCap)}.`;
            }
            return { value: formatCurrency(total), explanation };
        },
        faqs: [
            {
                question: "What is a 'damage cap' and why does it exist?",
                answer: <p>A damage cap is a law passed by a state legislature that limits the amount of money a plaintiff can receive in a medical malpractice case. These laws are a form of 'tort reform,' often enacted with the stated goal of reducing medical liability insurance premiums for doctors. They are highly controversial, as they can prevent a severely injured patient from being fully compensated for their suffering.</p>,
                answerText: "A damage cap is a law passed by a state legislature that limits the amount of money a plaintiff can receive in a medical malpractice case. These laws are a form of 'tort reform,' often enacted with the stated goal of reducing medical liability insurance premiums for doctors. They are highly controversial, as they can prevent a severely injured patient from being fully compensated for their suffering."
            },
            {
                question: "Why do some caps apply only to 'non-economic' damages?",
                answer: <p>This is the most common type of damage cap. It allows a plaintiff to be fully compensated for all of their measurable financial losses (economic damages like medical bills and lost wages) while limiting the amount they can receive for more subjective damages like pain, suffering, and emotional distress. Caps that apply to total damages are much rarer and more restrictive.</p>,
                answerText: "This is the most common type of damage cap. It allows a plaintiff to be fully compensated for all of their measurable financial losses (economic damages like medical bills and lost wages) while limiting the amount they can receive for more subjective damages like pain, suffering, and emotional distress. Caps that apply to total damages are much rarer and more restrictive."
            },
            {
                question: "Does this calculator prove that medical malpractice occurred?",
                answer: <p>Absolutely not. This calculator only provides a potential damage estimate *if* malpractice can be successfully proven. Proving malpractice is extremely difficult. It requires demonstrating, usually through expert testimony from other doctors, that the healthcare provider's actions fell below the accepted 'standard of care' and that this breach directly caused the patient's injury.</p>,
                answerText: "Absolutely not. This calculator only provides a potential damage estimate *if* malpractice can be successfully proven. Proving malpractice is extremely difficult. It requires demonstrating, usually through expert testimony from other doctors, that the healthcare provider's actions fell below the accepted 'standard of care' and that this breach directly caused the patient's injury."
            }
        ]
    },
];