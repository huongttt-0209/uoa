import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import type { Situation } from '../../../data/types';
import './situation-picker.css';

interface SituationPickerProps {
  value: string;
  onChange: (situationId: string) => void;
  situations: readonly Situation[];
  onOpenChange?: (open: boolean) => void;
}

interface DropdownPos {
  top: number;
  left: number;
  width: number;
}

export function SituationPicker({
  value,
  onChange,
  situations,
  onOpenChange,
}: SituationPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [dropdownPos, setDropdownPos] = useState<DropdownPos | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerId = useId();

  const selected = situations.find((s) => s.id === value);

  const close = useCallback(() => {
    setIsOpen(false);
    setFocusIndex(-1);
    setDropdownPos(null);
    onOpenChange?.(false);
  }, [onOpenChange]);

  // Calculate dropdown position from trigger button
  const updateDropdownPos = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        listRef.current &&
        !listRef.current.contains(target)
      ) {
        close();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  // Reposition on scroll/resize while open
  useEffect(() => {
    if (!isOpen) return;
    function handleReposition() {
      updateDropdownPos();
    }
    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);
    return () => {
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
    };
  }, [isOpen, updateDropdownPos]);

  useEffect(() => {
    if (isOpen && focusIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      (items[focusIndex] as HTMLElement)?.focus();
    }
  }, [isOpen, focusIndex]);

  function handleToggle() {
    if (isOpen) {
      close();
    } else {
      updateDropdownPos();
      setIsOpen(true);
      onOpenChange?.(true);
      const idx = situations.findIndex((s) => s.id === value);
      setFocusIndex(idx >= 0 ? idx : 0);
    }
  }

  function handleSelect(situationId: string) {
    onChange(situationId);
    close();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusIndex((prev) => Math.min(prev + 1, situations.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusIndex >= 0 && focusIndex < situations.length) {
          handleSelect(situations[focusIndex].id);
        }
        break;
      case 'Escape':
        e.preventDefault();
        close();
        break;
    }
  }

  const dropdownStyle = dropdownPos
    ? {
        top: `${dropdownPos.top}px`,
        left: `${dropdownPos.left}px`,
        width: `${dropdownPos.width}px`,
      }
    : undefined;

  const dropdown = isOpen
    ? createPortal(
        <ul
          className="situation-picker__dropdown"
          role="listbox"
          ref={listRef}
          aria-label="Tình huống"
          style={dropdownStyle}
        >
          {situations.map((s, i) => (
            <li
              key={s.id}
              role="option"
              aria-selected={s.id === value}
              className={`situation-picker__option${s.id === value ? ' situation-picker__option--selected' : ''}${i === focusIndex ? ' situation-picker__option--focused' : ''}`}
              onClick={() => handleSelect(s.id)}
              onKeyDown={handleKeyDown}
              tabIndex={i === focusIndex ? 0 : -1}
            >
              <span className="situation-picker__option-emoji">{s.emoji}</span>
              <span className="situation-picker__option-label">{s.label}</span>
            </li>
          ))}
        </ul>,
        document.body,
      )
    : null;

  return (
    <div className="situation-picker" ref={containerRef}>
      <label className="situation-picker__label" htmlFor={triggerId}>
        Tình huống
      </label>
      <button
        id={triggerId}
        ref={triggerRef}
        className={`situation-picker__trigger${isOpen ? ' situation-picker__trigger--open' : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        type="button"
      >
        <span className="situation-picker__selected">
          {selected
            ? `${selected.emoji} ${selected.label}`
            : 'Chọn tình huống...'}
        </span>
        <span className="situation-picker__chevron" aria-hidden="true">
          {isOpen ? '▴' : '▾'}
        </span>
      </button>
      {dropdown}
    </div>
  );
}
