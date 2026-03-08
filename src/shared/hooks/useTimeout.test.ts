import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTimeout } from './useTimeout';

describe('useTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls callback after specified delay', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeout());

    act(() => {
      result.current.set(callback, 1000);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call callback before delay expires', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeout());

    act(() => {
      result.current.set(callback, 1000);
    });

    act(() => {
      vi.advanceTimersByTime(999);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('clears timer when clear() is called', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeout());

    act(() => {
      result.current.set(callback, 1000);
    });

    act(() => {
      result.current.clear();
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('cancels previous timer when set() is called again', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const { result } = renderHook(() => useTimeout());

    act(() => {
      result.current.set(callback1, 1000);
    });

    act(() => {
      result.current.set(callback2, 500);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('cleans up timer on unmount', () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() => useTimeout());

    act(() => {
      result.current.set(callback, 1000);
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('returns stable set and clear references', () => {
    const { result, rerender } = renderHook(() => useTimeout());

    const firstSet = result.current.set;
    const firstClear = result.current.clear;

    rerender();

    expect(result.current.set).toBe(firstSet);
    expect(result.current.clear).toBe(firstClear);
  });
});
