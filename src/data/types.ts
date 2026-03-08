/**
 * Core type definitions for UOA data layer.
 * Used by situations, recipients, toneLabels, and template engine.
 */

/** Tone level from 1 (sincere) to 5 (elaborate) */
export type ToneLevel = 1 | 2 | 3 | 4 | 5;

/** Excuse situation category */
export interface Situation {
  id: string;
  label: string;
  emoji: string;
  category: string;
}

/** Target recipient for excuse */
export interface Recipient {
  id: string;
  label: string;
  emoji: string;
}

/** Tone label with emoji indicator */
export interface ToneLabel {
  level: ToneLevel;
  label: string;
  emoji: string;
}

/** Excuse template for generation engine */
export interface ExcuseTemplate {
  id: string;
  situationId: string;
  recipientId: string;
  tone: ToneLevel;
  text: string;
}
