import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Toast } from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the message text', () => {
    render(<Toast message="Copied!" visible={true} onDismiss={() => {}} />);
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });

  it('has role="status" for accessibility', () => {
    render(<Toast message="Copied!" visible={true} onDismiss={() => {}} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has aria-live="polite" for screen readers', () => {
    render(<Toast message="Copied!" visible={true} onDismiss={() => {}} />);
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
  });

  it('applies toast--visible class when visible', () => {
    render(<Toast message="Copied!" visible={true} onDismiss={() => {}} />);
    const toast = screen.getByRole('status');
    expect(toast).toHaveClass('toast--visible');
  });

  it('applies toast--hidden class when not visible', () => {
    render(<Toast message="Copied!" visible={false} onDismiss={() => {}} />);
    const toast = screen.getByRole('status');
    expect(toast).toHaveClass('toast--hidden');
  });

  it('calls onDismiss after 3 seconds when visible', () => {
    const onDismiss = vi.fn();
    render(<Toast message="Copied!" visible={true} onDismiss={onDismiss} />);

    expect(onDismiss).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not call onDismiss when not visible', () => {
    const onDismiss = vi.fn();
    render(<Toast message="Copied!" visible={false} onDismiss={onDismiss} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('cleans up timer on unmount', () => {
    const onDismiss = vi.fn();
    const { unmount } = render(
      <Toast message="Copied!" visible={true} onDismiss={onDismiss} />,
    );

    unmount();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onDismiss).not.toHaveBeenCalled();
  });
});
