import { useCallback, useRef } from 'react';
import type { Recipient } from '../../../data/types';
import './recipient-picker.css';

interface RecipientPickerProps {
  value: string;
  onChange: (recipientId: string) => void;
  recipients: readonly Recipient[];
}

export function RecipientPicker({
  value,
  onChange,
  recipients,
}: RecipientPickerProps) {
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = recipients.findIndex((r) => r.id === value);
      let newIndex = currentIndex;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (currentIndex + 1) % recipients.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (currentIndex - 1 + recipients.length) % recipients.length;
      }

      if (newIndex !== currentIndex) {
        onChange(recipients[newIndex].id);
        pillRefs.current[newIndex]?.focus();
      }
    },
    [value, onChange, recipients],
  );

  return (
    <div className="recipient-picker">
      <label className="recipient-picker__label">Nói với</label>
      <div
        className="recipient-picker__options"
        role="radiogroup"
        aria-label="Đối tượng"
      >
        {recipients.map((r, i) => (
          <button
            key={r.id}
            ref={(el) => {
              pillRefs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={r.id === value}
            tabIndex={r.id === value ? 0 : -1}
            className={`recipient-picker__pill${r.id === value ? ' recipient-picker__pill--active' : ''}`}
            onClick={() => onChange(r.id)}
            onKeyDown={handleKeyDown}
          >
            <span className="recipient-picker__emoji">{r.emoji}</span>
            <span className="recipient-picker__text">{r.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
