import { useId } from 'react';
import './bs-gauge.css';

interface BSGaugeProps {
  score: number; // 0-100
}

/**
 * BSGauge — speedometer-style semicircle gauge (FR9, FR23).
 * SVG arc with needle animation, green-to-red gradient.
 */
export function BSGauge({ score }: BSGaugeProps) {
  const gradientId = useId();
  const clamped = Math.max(0, Math.min(100, score));
  // Needle rotation: 0 = -90deg (left), 100 = 90deg (right)
  const needleAngle = -90 + (clamped / 100) * 180;

  return (
    <div
      className="bs-gauge"
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`BS Score: ${clamped}%`}
    >
      <svg viewBox="0 0 200 120" className="bs-gauge__svg">
        {/* Track arc — gradient from green to red */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        {/* Semicircle arc track */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="var(--glass-border)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Colored arc overlay */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="251"
          strokeDashoffset={251 - (clamped / 100) * 251}
          className="bs-gauge__arc"
        />
        {/* Needle */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
          className="bs-gauge__needle"
          style={{
            transform: `rotate(${needleAngle}deg)`,
            transformOrigin: '100px 100px',
          }}
        />
        {/* Center dot */}
        <circle cx="100" cy="100" r="6" fill="var(--color-accent)" />
      </svg>
      {/* Score text */}
      <div className="bs-gauge__score">{clamped}%</div>
    </div>
  );
}
