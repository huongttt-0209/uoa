import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToneSlider } from './ToneSlider';
import type { ToneLevel } from '../../../data/types';

describe('ToneSlider', () => {
  it('renders with hero emoji and label for initial value', () => {
    const { container } = render(<ToneSlider value={1} onChange={() => {}} />);
    const heroEmoji = container.querySelector('.tone-slider__hero-emoji');
    expect(heroEmoji?.textContent).toBe('😇');
    expect(screen.getByText('Thật thà')).toBeInTheDocument();
  });

  it('renders slider with correct aria attributes', () => {
    render(<ToneSlider value={3} onChange={() => {}} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '1');
    expect(slider).toHaveAttribute('aria-valuemax', '5');
    expect(slider).toHaveAttribute('aria-valuenow', '3');
    expect(slider).toHaveAttribute('aria-label', 'Mức độ xạo');
  });

  it('calls onChange when slider value changes', () => {
    const onChange = vi.fn();
    render(<ToneSlider value={1} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '4' } });
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('displays correct emoji for each tone level', () => {
    const emojis: Record<ToneLevel, string> = {
      1: '😇',
      2: '😏',
      3: '😎',
      4: '🐍',
      5: '🎭',
    };

    for (const [level, emoji] of Object.entries(emojis)) {
      const { unmount } = render(
        <ToneSlider value={Number(level) as ToneLevel} onChange={() => {}} />,
      );
      // Hero emoji should match - find within the hero container
      const heroEmoji = document.querySelector('.tone-slider__hero-emoji');
      expect(heroEmoji?.textContent).toBe(emoji);
      unmount();
    }
  });

  it('displays all 5 level marks', () => {
    render(<ToneSlider value={3} onChange={() => {}} />);
    const marks = document.querySelectorAll('.tone-slider__mark');
    expect(marks).toHaveLength(5);
  });

  it('highlights active level mark', () => {
    render(<ToneSlider value={3} onChange={() => {}} />);
    const activeMark = document.querySelector('.tone-slider__mark--active');
    expect(activeMark).toBeTruthy();
    expect(activeMark?.textContent).toBe('😎');
  });

  it('has aria-valuetext for screen readers', () => {
    render(<ToneSlider value={5} onChange={() => {}} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuetext', '🎭 Bậc thầy');
  });

  it('has aria-live label for real-time updates', () => {
    const { container } = render(<ToneSlider value={1} onChange={() => {}} />);
    const label = container.querySelector('.tone-slider__label');
    expect(label).toHaveAttribute('aria-live', 'polite');
  });
});
