import type { BSResult } from '../hooks/useBSScorer';

/**
 * Format BS result for sharing.
 */
export function formatShareText(result: BSResult): string {
  const factorsSummary = [...result.factors]
    .sort((a, b) => b.value - a.value)
    .map((f) => `• ${f.label}: ${f.value}%`)
    .join('\n');

  return [
    `🎯 BS Score: ${result.score}% — ${result.verdict.emoji} ${result.verdict.label}`,
    '',
    factorsSummary,
    '',
    '— Analyzed by Ú Òa',
  ].join('\n');
}
