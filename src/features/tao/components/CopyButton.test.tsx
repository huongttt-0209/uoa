import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CopyButton } from './CopyButton';

describe('CopyButton', () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('renders with copy label', () => {
    render(<CopyButton text="Test excuse" />);
    expect(screen.getByRole('button')).toHaveTextContent('📋 Copy');
  });

  it('calls clipboard.writeText on click', async () => {
    const text = 'Em xin phép nghỉ học ạ.';
    render(<CopyButton text={text} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
    });
  });

  it('shows success state after copy', async () => {
    render(<CopyButton text="Test" />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('✓ Đã copy');
    });
  });

  it('shows toast after copy', async () => {
    render(<CopyButton text="Test" />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('Đã copy! 📋')).toBeInTheDocument();
    });
  });

  it('is disabled when text is empty', () => {
    render(<CopyButton text="" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('has aria-label for accessibility', () => {
    render(<CopyButton text="Test" />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Copy lý do',
    );
  });
});
