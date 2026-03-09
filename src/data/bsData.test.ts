import { describe, it, expect } from 'vitest';
import { BS_KEYWORD_CATEGORIES } from './bsKeywords';
import { VERDICTS, getVerdict } from './verdicts';

describe('BS_KEYWORD_CATEGORIES', () => {
  it('has 4 categories', () => {
    expect(BS_KEYWORD_CATEGORIES).toHaveLength(4);
  });

  it('each category has required fields', () => {
    for (const cat of BS_KEYWORD_CATEGORIES) {
      expect(cat.id).toBeTruthy();
      expect(cat.label).toBeTruthy();
      expect(cat.weight).toBeGreaterThan(0);
      expect(cat.keywords.length).toBeGreaterThan(0);
    }
  });

  it('includes vagueness, exaggeration, hedging, deflection', () => {
    const ids = BS_KEYWORD_CATEGORIES.map((c) => c.id);
    expect(ids).toContain('vagueness');
    expect(ids).toContain('exaggeration');
    expect(ids).toContain('hedging');
    expect(ids).toContain('deflection');
  });

  it('all keywords can be flattened from categories', () => {
    const allKeywords = BS_KEYWORD_CATEGORIES.flatMap((c) => [...c.keywords]);
    const totalFromCategories = BS_KEYWORD_CATEGORIES.reduce(
      (sum, c) => sum + c.keywords.length,
      0,
    );
    expect(allKeywords.length).toBe(totalFromCategories);
  });

  it('keywords contain Vietnamese text', () => {
    const vnPattern =
      /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i;
    const allKeywords = BS_KEYWORD_CATEGORIES.flatMap((c) => [...c.keywords]);
    const hasVietnamese = allKeywords.some((k) => vnPattern.test(k));
    expect(hasVietnamese).toBe(true);
  });

  it('no keywords contain non-Vietnamese foreign words (i18n guard)', () => {
    const forbiddenWords = [
      'porque',
      'pero',
      'también',
      'the',
      'and',
      'but',
      'because',
      'with',
      'sorry',
      'please',
    ];
    const pattern = new RegExp(`\\b(${forbiddenWords.join('|')})\\b`, 'gi');
    for (const cat of BS_KEYWORD_CATEGORIES) {
      for (const keyword of cat.keywords) {
        const matches = keyword.match(pattern);
        expect(
          matches,
          `Keyword "${keyword}" in "${cat.id}" contains foreign word(s): ${matches}`,
        ).toBeNull();
      }
    }
  });
});

describe('VERDICTS', () => {
  it('has 5 verdict levels', () => {
    expect(VERDICTS).toHaveLength(5);
  });

  it('covers full 0-100 range', () => {
    expect(VERDICTS[0].min).toBe(0);
    expect(VERDICTS[VERDICTS.length - 1].max).toBe(100);
  });

  it('has no gaps in ranges', () => {
    for (let i = 1; i < VERDICTS.length; i++) {
      expect(VERDICTS[i].min).toBe(VERDICTS[i - 1].max + 1);
    }
  });

  it('each verdict has label and emoji', () => {
    for (const v of VERDICTS) {
      expect(v.label).toBeTruthy();
      expect(v.emoji).toBeTruthy();
    }
  });
});

describe('getVerdict', () => {
  it('returns "Thật thà" for score 0-20', () => {
    expect(getVerdict(0).label).toBe('Thật thà');
    expect(getVerdict(20).label).toBe('Thật thà');
  });

  it('returns "Bịa như thật" for score 81-100', () => {
    expect(getVerdict(81).label).toBe('Bịa như thật');
    expect(getVerdict(100).label).toBe('Bịa như thật');
  });

  it('returns correct verdict for mid-range', () => {
    expect(getVerdict(50).label).toBe('Có mùi BS');
  });

  it('clamps scores below 0', () => {
    expect(getVerdict(-5).label).toBe('Thật thà');
  });

  it('clamps scores above 100', () => {
    expect(getVerdict(150).label).toBe('Bịa như thật');
  });
});
