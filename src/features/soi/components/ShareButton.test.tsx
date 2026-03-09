import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ShareButton } from './ShareButton';
import { formatShareText } from '../utils/formatShareText';
import type { BSResult } from '../hooks/useBSScorer';

const mockResult: BSResult = {
  score: 75,
  factors: [
    {
      id: 'keyword-density',
      label: 'Từ khóa BS',
      value: 80,
      description: 'D1',
    },
    { id: 'vagueness', label: 'Sự mơ hồ', value: 60, description: 'D2' },
    {
      id: 'sentence-length',
      label: 'Độ dài câu',
      value: 20,
      description: 'D3',
    },
    { id: 'emoji-ratio', label: 'Tỉ lệ emoji', value: 10, description: 'D4' },
  ],
  verdict: { min: 61, max: 80, label: 'BS khá rõ', emoji: '🤥' },
};

describe('formatShareText', () => {
  it('includes score and verdict', () => {
    const text = formatShareText(mockResult);
    expect(text).toContain('BS Score: 75%');
    expect(text).toContain('BS khá rõ');
    expect(text).toContain('🤥');
  });

  it('includes factors sorted by value', () => {
    const text = formatShareText(mockResult);
    const lines = text.split('\n');
    const factorLines = lines.filter((l) => l.startsWith('•'));
    expect(factorLines[0]).toContain('Từ khóa BS');
    expect(factorLines[1]).toContain('Sự mơ hồ');
  });

  it('includes app signature', () => {
    const text = formatShareText(mockResult);
    expect(text).toContain('Analyzed by UOa');
  });
});

describe('ShareButton', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('renders share label', () => {
    render(<ShareButton result={mockResult} />);
    expect(screen.getByRole('button')).toHaveTextContent('📤 Chia sẻ');
  });

  it('copies formatted text on click', async () => {
    render(<ShareButton result={mockResult} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('BS Score: 75%'),
      );
    });
  });

  it('shows success state after share', async () => {
    render(<ShareButton result={mockResult} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('✓ Đã copy');
    });
  });

  it('shows toast after share', async () => {
    render(<ShareButton result={mockResult} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('Đã copy kết quả! 📋')).toBeInTheDocument();
    });
  });

  it('has Vietnamese aria-label', () => {
    render(<ShareButton result={mockResult} />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Chia sẻ kết quả',
    );
  });
});
