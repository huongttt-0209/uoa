import { useState, useCallback, useRef, useEffect } from 'react';
import { EXCUSE_TEMPLATES } from '../../../data/excuseTemplates';
import type { ToneLevel } from '../../../data/types';

interface UseExcuseGeneratorParams {
  situationId: string;
  recipientId: string;
  tone: ToneLevel;
}

interface UseExcuseGeneratorResult {
  excuse: string | null;
  generate: () => void;
}

/**
 * Hook that generates excuses from templates, with no-repeat logic (FR19).
 * Filters templates by situation + recipient + tone, picks random,
 * avoids repeating the previous excuse.
 */
export function useExcuseGenerator({
  situationId,
  recipientId,
  tone,
}: UseExcuseGeneratorParams): UseExcuseGeneratorResult {
  const [excuse, setExcuse] = useState<string | null>(null);
  const lastExcuseRef = useRef<string | null>(null);

  // Reset no-repeat ref when parameters change
  useEffect(() => {
    lastExcuseRef.current = null;
  }, [situationId, recipientId, tone]);

  const generate = useCallback(() => {
    const candidates = EXCUSE_TEMPLATES.filter(
      (t) =>
        t.situationId === situationId &&
        t.recipientId === recipientId &&
        t.tone === tone,
    );

    if (candidates.length === 0) {
      setExcuse(null);
      return;
    }

    // Filter out previous excuse to avoid repeat (FR19)
    const filtered = candidates.filter((t) => t.text !== lastExcuseRef.current);

    // If all filtered out (only 1 template), fall back to full list
    const pool = filtered.length > 0 ? filtered : candidates;

    const selected = pool[Math.floor(Math.random() * pool.length)];
    lastExcuseRef.current = selected.text;
    setExcuse(selected.text);
  }, [situationId, recipientId, tone]);

  return { excuse, generate };
}
