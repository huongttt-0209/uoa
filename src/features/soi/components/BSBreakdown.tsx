import type { BSFactor } from '../hooks/useBSScorer';
import './bs-breakdown.css';

interface BSBreakdownProps {
  factors: BSFactor[];
}

/**
 * BSBreakdown — displays factor breakdown sorted by impact (FR11).
 */
export function BSBreakdown({ factors }: BSBreakdownProps) {
  const sorted = [...factors].sort((a, b) => b.value - a.value);

  return (
    <div className="bs-breakdown" role="list" aria-label="Phân tích chi tiết">
      {sorted.map((factor) => (
        <div key={factor.id} className="bs-breakdown__item" role="listitem">
          <div className="bs-breakdown__header">
            <span className="bs-breakdown__label">{factor.label}</span>
            <span className="bs-breakdown__value">{factor.value}%</span>
          </div>
          <div className="bs-breakdown__bar-track">
            <div
              className="bs-breakdown__bar-fill"
              style={{ width: `${factor.value}%` }}
              aria-hidden="true"
            />
          </div>
          <p className="bs-breakdown__desc">{factor.description}</p>
        </div>
      ))}
    </div>
  );
}
