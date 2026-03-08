import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VerdictBadge } from './VerdictBadge';
import { BSBreakdown } from './BSBreakdown';
import type { Verdict } from '../../../data/verdicts';
import type { BSFactor } from '../hooks/useBSScorer';

describe('VerdictBadge', () => {
  const verdict: Verdict = { min: 0, max: 20, label: 'Thật thà', emoji: '😇' };

  it('renders verdict label and emoji', () => {
    render(<VerdictBadge verdict={verdict} />);
    expect(screen.getByText(/😇/)).toBeInTheDocument();
    expect(screen.getByText(/Thật thà/)).toBeInTheDocument();
  });

  it('has role status', () => {
    render(<VerdictBadge verdict={verdict} />);
    expect(screen.getByRole('status')).toBeTruthy();
  });

  it('has aria-label with verdict', () => {
    render(<VerdictBadge verdict={verdict} />);
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Kết quả: Thật thà',
    );
  });

  it('applies green class for low score', () => {
    const { container } = render(<VerdictBadge verdict={verdict} />);
    expect(container.querySelector('.verdict-badge--green')).toBeTruthy();
  });

  it('applies red class for high score', () => {
    const highVerdict: Verdict = {
      min: 81,
      max: 100,
      label: 'Bịa như thật',
      emoji: '🎭',
    };
    const { container } = render(<VerdictBadge verdict={highVerdict} />);
    expect(container.querySelector('.verdict-badge--red')).toBeTruthy();
  });
});

describe('BSBreakdown', () => {
  const factors: BSFactor[] = [
    { id: 'a', label: 'Factor A', value: 30, description: 'Desc A' },
    { id: 'b', label: 'Factor B', value: 80, description: 'Desc B' },
    { id: 'c', label: 'Factor C', value: 50, description: 'Desc C' },
  ];

  it('renders all factors', () => {
    render(<BSBreakdown factors={factors} />);
    expect(screen.getByText('Factor A')).toBeInTheDocument();
    expect(screen.getByText('Factor B')).toBeInTheDocument();
    expect(screen.getByText('Factor C')).toBeInTheDocument();
  });

  it('sorts factors by value descending', () => {
    const { container } = render(<BSBreakdown factors={factors} />);
    const labels = container.querySelectorAll('.bs-breakdown__label');
    expect(labels[0].textContent).toBe('Factor B');
    expect(labels[1].textContent).toBe('Factor C');
    expect(labels[2].textContent).toBe('Factor A');
  });

  it('shows factor values as percentages', () => {
    render(<BSBreakdown factors={factors} />);
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
  });

  it('shows factor descriptions', () => {
    render(<BSBreakdown factors={factors} />);
    expect(screen.getByText('Desc B')).toBeInTheDocument();
  });

  it('has list role', () => {
    render(<BSBreakdown factors={factors} />);
    expect(screen.getByRole('list')).toHaveAttribute(
      'aria-label',
      'Phân tích chi tiết',
    );
  });
});
