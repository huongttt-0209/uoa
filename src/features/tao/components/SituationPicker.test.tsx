import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SituationPicker } from './SituationPicker';
import type { Situation } from '../../../data/types';

const mockSituations: Situation[] = [
  { id: 'nghi-hoc', label: 'Nghỉ học', emoji: '📚', category: 'education' },
  { id: 'nghi-lam', label: 'Nghỉ làm', emoji: '💼', category: 'work' },
  { id: 'huy-hen', label: 'Hủy hẹn hò', emoji: '💔', category: 'social' },
];

describe('SituationPicker', () => {
  it('renders with label and trigger button', () => {
    render(
      <SituationPicker
        value="nghi-hoc"
        onChange={() => {}}
        situations={mockSituations}
      />,
    );
    expect(screen.getByText('Tình huống')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays selected situation with emoji and label', () => {
    render(
      <SituationPicker
        value="nghi-hoc"
        onChange={() => {}}
        situations={mockSituations}
      />,
    );
    expect(screen.getByText('📚 Nghỉ học')).toBeInTheDocument();
  });

  it('shows placeholder when no value selected', () => {
    render(
      <SituationPicker
        value=""
        onChange={() => {}}
        situations={mockSituations}
      />,
    );
    expect(screen.getByText('Chọn tình huống...')).toBeInTheDocument();
  });

  it('opens dropdown on click with listbox role', () => {
    render(
      <SituationPicker
        value="nghi-hoc"
        onChange={() => {}}
        situations={mockSituations}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('displays all situations in dropdown', () => {
    render(
      <SituationPicker
        value="nghi-hoc"
        onChange={() => {}}
        situations={mockSituations}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
  });

  it('calls onChange when an option is clicked', () => {
    const onChange = vi.fn();
    render(
      <SituationPicker
        value="nghi-hoc"
        onChange={onChange}
        situations={mockSituations}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Nghỉ làm'));
    expect(onChange).toHaveBeenCalledWith('nghi-lam');
  });

  it('closes dropdown after selection', () => {
    render(
      <SituationPicker
        value="nghi-hoc"
        onChange={() => {}}
        situations={mockSituations}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Nghỉ làm'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('navigates options with ArrowDown key', () => {
    const onChange = vi.fn();
    render(
      <SituationPicker
        value="nghi-hoc"
        onChange={onChange}
        situations={mockSituations}
      />,
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('nghi-lam');
  });

  it('closes dropdown on Escape key', () => {
    render(
      <SituationPicker
        value="nghi-hoc"
        onChange={() => {}}
        situations={mockSituations}
      />,
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('marks selected option with aria-selected', () => {
    render(
      <SituationPicker
        value="nghi-hoc"
        onChange={() => {}}
        situations={mockSituations}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
  });
});
