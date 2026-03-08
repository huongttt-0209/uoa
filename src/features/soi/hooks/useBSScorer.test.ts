import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useBSScorer } from './useBSScorer';

describe('useBSScorer', () => {
  it('returns null for empty text', () => {
    const { result } = renderHook(() => useBSScorer(''));
    expect(result.current).toBeNull();
  });

  it('returns null for whitespace-only text', () => {
    const { result } = renderHook(() => useBSScorer('   '));
    expect(result.current).toBeNull();
  });

  it('returns a result with score, factors, and verdict', () => {
    const { result } = renderHook(() =>
      useBSScorer('Em xin lỗi vì em bị ốm không đi học được ạ.'),
    );
    expect(result.current).not.toBeNull();
    expect(result.current!.score).toBeGreaterThanOrEqual(0);
    expect(result.current!.score).toBeLessThanOrEqual(100);
    expect(result.current!.factors).toHaveLength(4);
    expect(result.current!.verdict).toBeTruthy();
    expect(result.current!.verdict.label).toBeTruthy();
  });

  it('returns 4 factors: keyword-density, sentence-length, vagueness, emoji-ratio', () => {
    const { result } = renderHook(() => useBSScorer('Test text'));
    const factorIds = result.current!.factors.map((f) => f.id);
    expect(factorIds).toContain('keyword-density');
    expect(factorIds).toContain('sentence-length');
    expect(factorIds).toContain('vagueness');
    expect(factorIds).toContain('emoji-ratio');
  });

  it('gives higher score to BS-heavy text', () => {
    const { result: honest } = renderHook(() => useBSScorer('Em bị sốt.'));
    const { result: bs } = renderHook(() =>
      useBSScorer(
        'Thực ra em xin lỗi, hình như có lẽ do hoàn cảnh bất khả kháng cực kỳ khủng khiếp, chắc chắn 100% không phải lỗi em, tin em đi, em thề luôn! 😭😭😭',
      ),
    );
    expect(bs.current!.score).toBeGreaterThan(honest.current!.score);
  });

  it('emoji-heavy text has higher emoji-ratio factor', () => {
    const { result: noEmoji } = renderHook(() => useBSScorer('Em bị ốm.'));
    const { result: manyEmoji } = renderHook(() =>
      useBSScorer('Em bị ốm 😭😭😭🥺🥺💔'),
    );
    const noEmojiF = noEmoji.current!.factors.find(
      (f) => f.id === 'emoji-ratio',
    )!;
    const manyEmojiF = manyEmoji.current!.factors.find(
      (f) => f.id === 'emoji-ratio',
    )!;
    expect(manyEmojiF.value).toBeGreaterThan(noEmojiF.value);
  });

  it('completes within 1 second (NFR2)', () => {
    const longText = 'Em xin lỗi thực ra hình như có lẽ do hoàn cảnh. '.repeat(
      100,
    );
    const start = performance.now();
    renderHook(() => useBSScorer(longText));
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(1000);
  });

  it('verdict matches score range', () => {
    const { result } = renderHook(() => useBSScorer('Hello world test text.'));
    const score = result.current!.score;
    const verdict = result.current!.verdict;
    expect(score).toBeGreaterThanOrEqual(verdict.min);
    expect(score).toBeLessThanOrEqual(verdict.max);
  });
});
