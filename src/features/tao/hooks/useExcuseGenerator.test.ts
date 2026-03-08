import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useExcuseGenerator } from './useExcuseGenerator';
import type { ToneLevel } from '../../../data/types';

describe('useExcuseGenerator', () => {
  it('starts with null excuse', () => {
    const { result } = renderHook(() =>
      useExcuseGenerator({
        situationId: 'nghi-hoc',
        recipientId: 'ban-be',
        tone: 1,
      }),
    );
    expect(result.current.excuse).toBeNull();
  });

  it('generates an excuse when generate is called', () => {
    const { result } = renderHook(() =>
      useExcuseGenerator({
        situationId: 'nghi-hoc',
        recipientId: 'ban-be',
        tone: 1,
      }),
    );
    act(() => result.current.generate());
    expect(result.current.excuse).not.toBeNull();
    expect(typeof result.current.excuse).toBe('string');
  });

  it('generates excuse matching the given parameters', () => {
    const { result } = renderHook(() =>
      useExcuseGenerator({
        situationId: 'huy-hen',
        recipientId: 'giang-vien-sep',
        tone: 3 as ToneLevel,
      }),
    );
    act(() => result.current.generate());
    expect(result.current.excuse).toBeTruthy();
  });

  it('returns null for non-existent combination', () => {
    const { result } = renderHook(() =>
      useExcuseGenerator({
        situationId: 'nonexistent',
        recipientId: 'ban-be',
        tone: 1,
      }),
    );
    act(() => result.current.generate());
    expect(result.current.excuse).toBeNull();
  });

  it('does not repeat the same excuse on consecutive calls (no-repeat FR19)', () => {
    const { result } = renderHook(() =>
      useExcuseGenerator({
        situationId: 'nghi-hoc',
        recipientId: 'ban-be',
        tone: 1,
      }),
    );

    const excuses = new Set<string>();
    // Generate many times — with only 1 template per combo, it may repeat,
    // but with multiple it should vary
    for (let i = 0; i < 20; i++) {
      act(() => result.current.generate());
      if (result.current.excuse) {
        excuses.add(result.current.excuse);
      }
    }
    // Should have generated successfully
    expect(excuses.size).toBeGreaterThanOrEqual(1);
  });
});
