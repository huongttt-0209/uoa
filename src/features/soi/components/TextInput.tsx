import { useId } from 'react';
import './text-input.css';

const MIN_LENGTH = 10;
const MAX_LENGTH = 1000;

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * TextInput — textarea for SOI BS analysis (FR8, FR13).
 * Shows character count, min-length hint, clear button, and placeholder.
 */
export function TextInput({ value, onChange }: TextInputProps) {
  const id = useId();
  const charCount = value.length;
  const isTooShort = charCount > 0 && charCount < MIN_LENGTH;

  return (
    <div className="text-input">
      <label htmlFor={id} className="text-input__label">
        Dán lý do vào đây 👇
      </label>
      <div className="text-input__wrapper">
        <textarea
          id={id}
          className={`text-input__textarea${isTooShort ? ' text-input__textarea--warning' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
          placeholder="Paste hoặc gõ lý do bạn muốn kiểm tra..."
          rows={4}
          maxLength={MAX_LENGTH}
          aria-describedby={`${id}-hint ${id}-count`}
        />
        {charCount > 0 && (
          <button
            className="text-input__clear"
            onClick={() => onChange('')}
            type="button"
            aria-label="Xoá nội dung"
          >
            ✕
          </button>
        )}
      </div>
      <div className="text-input__footer">
        {isTooShort && (
          <span id={`${id}-hint`} className="text-input__hint" role="alert">
            Cần ít nhất {MIN_LENGTH} ký tự để phân tích
          </span>
        )}
        <span id={`${id}-count`} className="text-input__count">
          {charCount}/{MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
