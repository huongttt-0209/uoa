import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ExcuseResult } from './ExcuseResult';

describe('ExcuseResult', () => {
  it('shows placeholder when excuse is null', () => {
    render(<ExcuseResult excuse={null} />);
    expect(screen.getByText(/Chọn tình huống/)).toBeInTheDocument();
  });

  it('has empty state styling when null', () => {
    const { container } = render(<ExcuseResult excuse={null} />);
    const el = container.querySelector('.excuse-result--empty');
    expect(el).toBeTruthy();
  });

  it('displays excuse text when provided', () => {
    const text = 'Em xin phép nghỉ học hôm nay vì em bị sốt ạ.';
    render(<ExcuseResult excuse={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('uses blockquote for the excuse text', () => {
    const text = 'Tao kẹt xe, tí nữa tới.';
    const { container } = render(<ExcuseResult excuse={text} />);
    const blockquote = container.querySelector(
      'blockquote.excuse-result__text',
    );
    expect(blockquote).toBeTruthy();
    expect(blockquote?.textContent).toBe(text);
  });

  it('does not have empty state class when excuse exists', () => {
    const { container } = render(<ExcuseResult excuse="Test excuse" />);
    const el = container.querySelector('.excuse-result--empty');
    expect(el).toBeNull();
  });
});
