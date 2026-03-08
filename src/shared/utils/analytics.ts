/**
 * Analytics tracker — Vercel Analytics integration (FR25-27).
 *
 * Uses `window.va` for Vercel Analytics. Silent-fail if blocked.
 * Architecture pattern: shared/utils/analytics.ts
 */

declare global {
  interface Window {
    va?: (action: string, data?: Record<string, unknown>) => void;
  }
}

/**
 * Track a custom analytics event.
 * Silent-fail if Vercel Analytics is not loaded or blocked.
 */
export function trackEvent(name: string, data?: Record<string, unknown>): void {
  try {
    if (typeof window !== 'undefined' && window.va) {
      window.va('event', { name, ...data });
    }
  } catch {
    // Silent fail — analytics should never break the app
  }
}

// ---- Typed event helpers (FR25-27) ----

/** FR25: Track excuse generation */
export function trackExcuseGenerated(params: {
  situation: string;
  recipient: string;
  tone: number;
}): void {
  trackEvent('excuse_generated', params);
}

/** FR26: Track BS detection */
export function trackBSDetected(params: {
  score: number;
  verdict: string;
}): void {
  trackEvent('bs_detected', params);
}

/** FR27: Track copy action */
export function trackExcuseCopied(): void {
  trackEvent('excuse_copied');
}

/** FR27: Track share action */
export function trackBSShared(): void {
  trackEvent('bs_shared');
}

/** Track tab switch */
export function trackTabSwitch(tab: string): void {
  trackEvent('tab_switch', { tab });
}
