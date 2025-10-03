// FIX: Add imports for Jest globals
import { describe, it, expect, jest } from '@jest/globals';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HashRouter } from 'react-router-dom';
import CalculatorWidget from '../../src/components/CalculatorWidget';
import { CALCULATORS } from '../../src/constants';
import userEvent from '@testing-library/user-event';

// Mock clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
  configurable: true,
});

const personalInjuryCalc = CALCULATORS.find(c => c.id === 'personal-injury-settlement')!;
const comparativeNegligenceCalc = CALCULATORS.find(c => c.id === 'comparative-negligence-fault')!;

// Wrapper to provide Router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: HashRouter });
}

describe('CalculatorWidget Component', () => {

  it('renders inputs correctly for a given calculator', () => {
    renderWithRouter(<CalculatorWidget calculator={personalInjuryCalc} />);
    expect(screen.getByLabelText(/Total Medical Bills/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Total Lost Wages/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pain & Suffering Multiplier/i)).toBeInTheDocument();
  });

  it('validates required fields and shows an error', async () => {
    renderWithRouter(<CalculatorWidget calculator={personalInjuryCalc} />);
    const calculateButton = screen.getByRole('button', { name: /Calculate/i });
    
    // Clear default value from multiplier input
    const multiplierInput = screen.getByLabelText(/Pain & Suffering Multiplier/i);
    await userEvent.clear(multiplierInput);

    await userEvent.click(calculateButton);

    // Expect multiple errors because medical bills, lost wages, and multiplier are required
    const errorMessages = await screen.findAllByText('This field is required.');
    expect(errorMessages.length).toBeGreaterThanOrEqual(2);
  });

  it('validates min/max values and shows an error', async () => {
    renderWithRouter(<CalculatorWidget calculator={personalInjuryCalc} />);
    const multiplierInput = screen.getByLabelText(/Pain & Suffering Multiplier/i);
    await userEvent.type(multiplierInput, '{backspace}{backspace}{backspace}6'); // Try to enter 6, max is 5

    expect(await screen.findByText('Value cannot be greater than 5.')).toBeInTheDocument();
  });

  it('disables calculate button when there are active errors', async () => {
    renderWithRouter(<CalculatorWidget calculator={personalInjuryCalc} />);
    const multiplierInput = screen.getByLabelText(/Pain & Suffering Multiplier/i);
    const calculateButton = screen.getByRole('button', { name: /Calculate/i });
    
    await userEvent.clear(multiplierInput);
    await userEvent.type(multiplierInput, '6'); // Invalid value

    expect(await screen.findByText('Value cannot be greater than 5.')).toBeInTheDocument();
    expect(calculateButton).toBeDisabled();
  });

  it('performs a calculation and displays the result', async () => {
    renderWithRouter(<CalculatorWidget calculator={personalInjuryCalc} />);
    
    await userEvent.type(screen.getByLabelText(/Total Medical Bills/i), '10000');
    await userEvent.type(screen.getByLabelText(/Total Lost Wages/i), '5000');
    
    const multiplierInput = screen.getByLabelText(/Pain & Suffering Multiplier/i);
    await userEvent.clear(multiplierInput);
    await userEvent.type(multiplierInput, '2');
    
    await userEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(await screen.findByText('$30,000.00')).toBeInTheDocument();
    expect(screen.getByText('Estimated Result')).toBeInTheDocument();
  });

  it('displays the explanation when one is provided', async () => {
    renderWithRouter(<CalculatorWidget calculator={comparativeNegligenceCalc} />);
    
    await userEvent.type(screen.getByLabelText(/Total Damages/i), '100000');
    await userEvent.type(screen.getByLabelText(/Your Percentage of Fault/i), '10');
    await userEvent.selectOptions(screen.getByLabelText(/State of Incident/i), 'VA'); // Contributory state

    await userEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(await screen.findByText('$0.00')).toBeInTheDocument();
    expect(await screen.findByText(/In a contributory negligence state/i)).toBeInTheDocument();
  });

  it('handles checkbox inputs correctly', async () => {
      const calc = CALCULATORS.find(c => c.id === 'pain-and-suffering-multiplier')!;
      renderWithRouter(<CalculatorWidget calculator={calc} />);

      await userEvent.type(screen.getByLabelText(/Total Economic Damages/i), '10000');
      const permanencyCheckbox = screen.getByLabelText(/Is the injury permanent?/i);

      // Check the box
      await userEvent.click(permanencyCheckbox);
      expect(permanencyCheckbox).toBeChecked();

      await userEvent.click(screen.getByRole('button', { name: /Calculate/i }));
      
      // Base (1.5) + Perm (1.0) = 2.5 multiplier. 10000 * 2.5 = 25000
      expect(await screen.findByText('$25,000.00')).toBeInTheDocument();

      // Uncheck the box
      await userEvent.click(permanencyCheckbox);
      expect(permanencyCheckbox).not.toBeChecked();

      await userEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      // Base (1.5) = 1.5 multiplier. 10000 * 1.5 = 15000
      expect(await screen.findByText('$15,000.00')).toBeInTheDocument();
  });

  it('copies a shareable link to the clipboard', async () => {
      renderWithRouter(<CalculatorWidget calculator={personalInjuryCalc} />);
      const shareButton = screen.getByRole('button', { name: /Share/i });

      await userEvent.type(screen.getByLabelText(/Total Medical Bills/i), '12345');
      await userEvent.click(shareButton);

      await waitFor(() => {
          expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('medBills=12345'));
      });
      
      expect(await screen.findByText('Copied!')).toBeInTheDocument();
  });
});