import { useState } from 'react';
import { TONE_LABELS } from '../../../data/toneLabels';
import type { ToneLevel } from '../../../data/types';
import './tone-slider.css';

interface ToneSliderProps {
  value: ToneLevel;
  onChange: (level: ToneLevel) => void;
}

export function ToneSlider({ value, onChange }: ToneSliderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const currentTone =
    TONE_LABELS.find((t) => t.level === value) ?? TONE_LABELS[0];

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const level = Number(e.target.value) as ToneLevel;
    onChange(level);
  }

  return (
    <div className="tone-slider">
      <div
        className={`tone-slider__hero${isDragging ? ' tone-slider__hero--dragging' : ''}`}
      >
        <span className="tone-slider__hero-emoji" key={value}>
          {currentTone.emoji}
        </span>
      </div>

      <div className="tone-slider__track-wrapper">
        <input
          className="tone-slider__input"
          type="range"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={handleChange}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerCancel={() => setIsDragging(false)}
          onBlur={() => setIsDragging(false)}
          role="slider"
          aria-label="Mức độ xạo"
          aria-valuemin={1}
          aria-valuemax={5}
          aria-valuenow={value}
          aria-valuetext={`${currentTone.emoji} ${currentTone.label}`}
          style={
            {
              '--tone-pct': `${((value - 1) / 4) * 100}%`,
            } as React.CSSProperties
          }
        />
        <div className="tone-slider__level-marks">
          {TONE_LABELS.map((t) => (
            <span
              key={t.level}
              className={`tone-slider__mark${t.level === value ? ' tone-slider__mark--active' : ''}`}
            >
              {t.emoji}
            </span>
          ))}
        </div>
      </div>

      <div className="tone-slider__label" aria-live="polite">
        {currentTone.label}
      </div>
    </div>
  );
}
