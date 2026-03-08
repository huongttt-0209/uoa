import type { Verdict } from '../../../data/verdicts';
import './verdict-badge.css';

interface VerdictBadgeProps {
  verdict: Verdict;
}

/**
 * VerdictBadge — displays BS verdict with colored badge and emoji (FR10).
 */
export function VerdictBadge({ verdict }: VerdictBadgeProps) {
  // Map score range to color class
  const colorClass =
    verdict.max <= 20
      ? 'verdict-badge--green'
      : verdict.max <= 40
        ? 'verdict-badge--lime'
        : verdict.max <= 60
          ? 'verdict-badge--amber'
          : verdict.max <= 80
            ? 'verdict-badge--orange'
            : 'verdict-badge--red';

  return (
    <span
      className={`verdict-badge ${colorClass}`}
      role="status"
      aria-label={`Kết quả: ${verdict.label}`}
    >
      {verdict.emoji} {verdict.label}
    </span>
  );
}
