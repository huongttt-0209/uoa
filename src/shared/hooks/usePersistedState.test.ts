import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { usePersistedState } from './usePersistedState';

describe('usePersistedState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default value when localStorage is empty', () => {
    const { result } = renderHook(() =>
      usePersistedState('test:key', 'default'),
    );
    expect(result.current[0]).toBe('default');
  });

  it('reads stored value from localStorage', () => {
    localStorage.setItem('test:key', JSON.stringify('stored'));
    const { result } = renderHook(() =>
      usePersistedState('test:key', 'default'),
    );
    expect(result.current[0]).toBe('stored');
  });

  it('writes to localStorage on state change', () => {
    const { result } = renderHook(() =>
      usePersistedState('test:key', 'initial'),
    );

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(localStorage.getItem('test:key')!)).toBe('updated');
  });

  it('handles invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('test:key', '{invalid json!!!');
    const { result } = renderHook(() =>
      usePersistedState('test:key', 'fallback'),
    );
    expect(result.current[0]).toBe('fallback');
  });

  it('works with number values', () => {
    const { result } = renderHook(() => usePersistedState('test:num', 3));

    act(() => {
      result.current[1](5);
    });

    expect(result.current[0]).toBe(5);
    expect(JSON.parse(localStorage.getItem('test:num')!)).toBe(5);
  });

  it('works with object values', () => {
    const defaultObj = { a: 1, b: 'hello' };
    const { result } = renderHook(() =>
      usePersistedState('test:obj', defaultObj),
    );

    const newObj = { a: 2, b: 'world' };
    act(() => {
      result.current[1](newObj);
    });

    expect(result.current[0]).toEqual(newObj);
    expect(JSON.parse(localStorage.getItem('test:obj')!)).toEqual(newObj);
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => usePersistedState('test:fn', 10));

    act(() => {
      result.current[1]((prev) => prev + 5);
    });

    expect(result.current[0]).toBe(15);
  });

  it('persists initial default to localStorage', () => {
    renderHook(() => usePersistedState('test:init', 'hello'));
    expect(JSON.parse(localStorage.getItem('test:init')!)).toBe('hello');
  });
});
