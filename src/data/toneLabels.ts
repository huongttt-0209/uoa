import type { ToneLabel } from './types';

/**
 * 5 tone levels with emoji indicators.
 * Level 1 = most sincere, Level 5 = most elaborate/creative.
 */
export const TONE_LABELS: readonly ToneLabel[] = [
  { level: 1, label: 'Thật thà', emoji: '😇' },
  { level: 2, label: 'Hơi xạo', emoji: '😏' },
  { level: 3, label: 'Xạo vừa', emoji: '😎' },
  { level: 4, label: 'Xạo lắm', emoji: '🐍' },
  { level: 5, label: 'Bậc thầy', emoji: '🎭' },
];
