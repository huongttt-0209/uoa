/**
 * Verdict thresholds for BS score → label mapping.
 * Score ranges map to Vietnamese verdict labels and emoji.
 */

export interface Verdict {
  min: number;
  max: number;
  label: string;
  emoji: string;
}

export const VERDICTS: readonly Verdict[] = [
  { min: 0, max: 20, label: 'Thật thà', emoji: '😇' },
  { min: 21, max: 40, label: 'Hơi đáng ngờ', emoji: '🤔' },
  { min: 41, max: 60, label: 'Có mùi BS', emoji: '🧐' },
  { min: 61, max: 80, label: 'BS khá rõ', emoji: '🤥' },
  { min: 81, max: 100, label: 'Bịa như thật', emoji: '🎭' },
];

/**
 * Get verdict for a given score.
 */
export function getVerdict(score: number): Verdict {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  return (
    VERDICTS.find((v) => clamped >= v.min && clamped <= v.max) ?? VERDICTS[0]
  );
}
