import { useMemo } from 'react';
import { BS_KEYWORD_CATEGORIES } from '../../../data/bsKeywords';
import { getVerdict, type Verdict } from '../../../data/verdicts';

export interface BSFactor {
  id: string;
  label: string;
  value: number; // 0-100 contribution
  description: string;
}

export interface BSResult {
  score: number; // 0-100
  factors: BSFactor[];
  verdict: Verdict;
}

/**
 * Pre-compiled regex patterns for keyword density counting.
 * Created once at module level to avoid re-creating ~73 RegExp objects per keystroke.
 */
const KEYWORD_REGEXES = BS_KEYWORD_CATEGORIES.map((category) => ({
  weight: category.weight,
  patterns: category.keywords.map((kw) => ({
    regex: new RegExp(kw.toLowerCase(), 'g'),
  })),
}));

/**
 * Calculate keyword density factor.
 * Counts weighted keyword matches relative to word count.
 */
function calcKeywordDensity(textLower: string, wordCount: number): number {
  if (wordCount === 0) return 0;

  let weightedHits = 0;
  for (const category of KEYWORD_REGEXES) {
    for (const { regex } of category.patterns) {
      regex.lastIndex = 0; // Reset stateful regex
      const matches = textLower.match(regex);
      if (matches) {
        weightedHits += matches.length * category.weight;
      }
    }
  }

  // Normalize: 1 weighted hit per 5 words = 100%
  const density = Math.min(100, (weightedHits / wordCount) * 5 * 100);
  return Math.round(density);
}

/**
 * Calculate sentence length factor.
 * Longer sentences = more elaborate excuses = higher BS.
 */
function calcSentenceLength(text: string): number {
  const sentences = text.split(/[.!?。]+/).filter((s) => s.trim().length > 0);

  if (sentences.length === 0) return 0;

  const avgLength =
    sentences.reduce((sum, s) => sum + s.trim().split(/\s+/).length, 0) /
    sentences.length;

  // 5 words avg = 0, 25+ words avg = 100
  const score = Math.min(100, Math.max(0, ((avgLength - 5) / 20) * 100));
  return Math.round(score);
}

/**
 * Calculate vagueness factor.
 * Checks for hedging/uncertain language patterns.
 */
function calcVagueness(textLower: string, wordCount: number): number {
  if (wordCount === 0) return 0;

  const vagueCategory = BS_KEYWORD_CATEGORIES.find((c) => c.id === 'vagueness');
  const hedgingCategory = BS_KEYWORD_CATEGORIES.find((c) => c.id === 'hedging');

  let hits = 0;
  for (const cat of [vagueCategory, hedgingCategory]) {
    if (!cat) continue;
    for (const keyword of cat.keywords) {
      if (textLower.includes(keyword.toLowerCase())) {
        hits++;
      }
    }
  }

  // 3+ vague/hedging phrases in short text = very vague
  const score = Math.min(100, (hits / Math.max(3, wordCount / 10)) * 100);
  return Math.round(score);
}

/**
 * Calculate emoji ratio factor.
 * More emoji = trying harder to sell the excuse.
 */
function calcEmojiRatio(text: string, wordCount: number): number {
  if (wordCount === 0) return 0;

  // Match emoji using Unicode property escape (ES2018+)
  const emojiRegex = /\p{Extended_Pictographic}/gu;
  const emojiCount = (text.match(emojiRegex) || []).length;

  // 1 emoji per 10 words = 50, 1 per 5 = 100
  const ratio = emojiCount / wordCount;
  const score = Math.min(100, ratio * 500);
  return Math.round(score);
}

/**
 * useBSScorer — analyzes text and returns BS score with factors breakdown.
 * Pure computation via useMemo (FR9, FR10, FR11, NFR2).
 */
export function useBSScorer(text: string): BSResult | null {
  return useMemo(() => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return null;

    const textLower = trimmed.toLowerCase();
    const words = trimmed.split(/\s+/);
    const wordCount = words.length;

    const factors: BSFactor[] = [
      {
        id: 'keyword-density',
        label: 'Từ khóa BS',
        value: calcKeywordDensity(textLower, wordCount),
        description: 'Mật độ từ khóa hay dùng khi bịa chuyện',
      },
      {
        id: 'sentence-length',
        label: 'Độ dài câu',
        value: calcSentenceLength(trimmed),
        description: 'Câu dài = giải thích nhiều = đáng ngờ',
      },
      {
        id: 'vagueness',
        label: 'Sự mơ hồ',
        value: calcVagueness(textLower, wordCount),
        description: 'Dùng nhiều từ né tránh, không rõ ràng',
      },
      {
        id: 'emoji-ratio',
        label: 'Tỉ lệ emoji',
        value: calcEmojiRatio(trimmed, wordCount),
        description: 'Nhiều emoji = cố thuyết phục quá mức',
      },
    ];

    // Weighted average (keyword density has most weight)
    const weights = [0.35, 0.2, 0.25, 0.2];
    const totalScore = factors.reduce(
      (sum, f, i) => sum + f.value * weights[i],
      0,
    );

    const finalScore = Math.round(Math.min(100, Math.max(0, totalScore)));
    const verdict = getVerdict(finalScore);

    return { score: finalScore, factors, verdict };
  }, [text]);
}
