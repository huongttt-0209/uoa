import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RegenerateButton } from './RegenerateButton';

describe('RegenerateButton', () => {
  it('renders with regenerate label', () => {
    render(<RegenerateButton onRegenerate={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('🔄 Tạo lại');
  });

  it('calls onRegenerate when clicked', () => {
    const onRegenerate = vi.fn();
    render(<RegenerateButton onRegenerate={onRegenerate} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onRegenerate).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<RegenerateButton onRegenerate={() => {}} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is not disabled by default', () => {
    render(<RegenerateButton onRegenerate={() => {}} />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('has aria-label for accessibility', () => {
    render(<RegenerateButton onRegenerate={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Tạo lại excuse',
    );
  });

  it('does not call onRegenerate when disabled', () => {
    const onRegenerate = vi.fn();
    render(<RegenerateButton onRegenerate={onRegenerate} disabled />);
    fireEvent.click(screen.getByRole('button'));
    expect(onRegenerate).not.toHaveBeenCalled();
  });
});
