
// FIX: Add imports for Jest globals
import { describe, it, expect } from '@jest/globals';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HashRouter } from 'react-router-dom';
import Header from '../../src/components/Header';
import userEvent from '@testing-library/user-event';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: HashRouter });
};

describe('Header Component', () => {
  it('renders the header with title and search bar', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Accidental Lawyer Calculators')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Find a calculator...')).toBeInTheDocument();
  });

  it('shows search results when typing a valid query', async () => {
    renderWithRouter(<Header />);
    const searchInput = screen.getByPlaceholderText('Find a calculator...');
    
    await userEvent.type(searchInput, 'settlement');

    // Should find the "Personal Injury Settlement Calculator"
    expect(await screen.findByText(/Personal Injury Settlement Calculator/i)).toBeInTheDocument();
    // Should also find the "Medical Malpractice Settlement Calculator"
    expect(await screen.findByText(/Medical Malpractice Settlement Calculator/i)).toBeInTheDocument();
  });

  it('shows "No results found" for a query that matches nothing', async () => {
    renderWithRouter(<Header />);
    const searchInput = screen.getByPlaceholderText('Find a calculator...');
    
    await userEvent.type(searchInput, 'xyzidonotexist');

    expect(await screen.findByText(/No results found for "xyzidonotexist"./i)).toBeInTheDocument();
  });

  it('hides search results when clicking outside', async () => {
    renderWithRouter(
      <div>
        <Header />
        <main>Outside Content</main>
      </div>
    );
    const searchInput = screen.getByPlaceholderText('Find a calculator...');
    await userEvent.type(searchInput, 'pain');

    const searchResult = await screen.findByText(/Pain and Suffering Multiplier Calculator/i);
    expect(searchResult).toBeVisible();

    await userEvent.click(screen.getByText('Outside Content'));

    await waitFor(() => {
      expect(searchResult).not.toBeVisible();
    });
  });

  it('clears search and hides results when a result is clicked', async () => {
    renderWithRouter(<Header />);
    const searchInput = screen.getByPlaceholderText('Find a calculator...');
    await userEvent.type(searchInput, 'fee');

    const resultLink = await screen.findByText(/Attorney Fee\/Client Recovery Calculator/i);
    expect(resultLink).toBeVisible();

    await userEvent.click(resultLink);

    await waitFor(() => {
      expect(resultLink).not.toBeVisible();
    });
    expect(searchInput).toHaveValue('');
  });
});