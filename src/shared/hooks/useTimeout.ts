import { useCallback, useEffect, useRef } from 'react';

/**
 * useTimeout — centralized timer management with automatic cleanup on unmount.
 *
 * Solves the pattern where setTimeout must be manually cleaned up via
 * useRef + useEffect to prevent memory leaks when a component unmounts.
 *
 * @returns `set(callback, delay)` to start a timer, `clear()` to cancel it.
 */
export function useTimeout() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const set = useCallback(
    (callback: () => void, delay: number) => {
      clear();
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        callback();
      }, delay);
    },
    [clear],
  );

  // Auto-cleanup on unmount
  useEffect(() => {
    return clear;
  }, [clear]);

  return { set, clear };
}
