import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RecipientPicker } from './RecipientPicker';
import type { Recipient } from '../../../data/types';

const mockRecipients: Recipient[] = [
  { id: 'giang-vien-sep', label: 'Giảng viên / Sếp', emoji: '👔' },
  { id: 'ban-be', label: 'Bạn bè', emoji: '🤝' },
  { id: 'nguoi-yeu-gia-dinh', label: 'Người yêu / Gia đình', emoji: '❤️' },
];

describe('RecipientPicker', () => {
  it('renders with label', () => {
    render(
      <RecipientPicker
        value="ban-be"
        onChange={() => {}}
        recipients={mockRecipients}
      />,
    );
    expect(screen.getByText('Nói với')).toBeInTheDocument();
  });

  it('renders all recipient options as pills', () => {
    render(
      <RecipientPicker
        value="ban-be"
        onChange={() => {}}
        recipients={mockRecipients}
      />,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
  });

  it('marks selected recipient with aria-checked', () => {
    render(
      <RecipientPicker
        value="ban-be"
        onChange={() => {}}
        recipients={mockRecipients}
      />,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
    expect(radios[2]).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange when a pill is clicked', () => {
    const onChange = vi.fn();
    render(
      <RecipientPicker
        value="ban-be"
        onChange={onChange}
        recipients={mockRecipients}
      />,
    );
    fireEvent.click(screen.getByText('Giảng viên / Sếp'));
    expect(onChange).toHaveBeenCalledWith('giang-vien-sep');
  });

  it('applies active class to selected pill', () => {
    const { container } = render(
      <RecipientPicker
        value="ban-be"
        onChange={() => {}}
        recipients={mockRecipients}
      />,
    );
    const activePill = container.querySelector(
      '.recipient-picker__pill--active',
    );
    expect(activePill).toBeTruthy();
    expect(activePill?.textContent).toContain('Bạn bè');
  });

  it('has radiogroup role for a11y', () => {
    render(
      <RecipientPicker
        value="ban-be"
        onChange={() => {}}
        recipients={mockRecipients}
      />,
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('displays emoji and label for each recipient', () => {
    render(
      <RecipientPicker
        value="ban-be"
        onChange={() => {}}
        recipients={mockRecipients}
      />,
    );
    expect(screen.getByText('👔')).toBeInTheDocument();
    expect(screen.getByText('Giảng viên / Sếp')).toBeInTheDocument();
    expect(screen.getByText('🤝')).toBeInTheDocument();
    expect(screen.getByText('Bạn bè')).toBeInTheDocument();
  });
});
