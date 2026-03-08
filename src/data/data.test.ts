import { describe, it, expect } from 'vitest';
import { SITUATIONS } from './situations';
import { RECIPIENTS } from './recipients';
import { TONE_LABELS } from './toneLabels';
import type {
  Situation,
  Recipient,
  ToneLabel,
  ToneLevel,
  ExcuseTemplate,
} from './types';

describe('Types', () => {
  it('ToneLevel accepts valid values 1-5', () => {
    const levels: ToneLevel[] = [1, 2, 3, 4, 5];
    expect(levels).toHaveLength(5);
    levels.forEach((level) => {
      expect(level).toBeGreaterThanOrEqual(1);
      expect(level).toBeLessThanOrEqual(5);
    });
  });

  it('ExcuseTemplate interface is structurally valid', () => {
    const template: ExcuseTemplate = {
      id: 'test-1',
      situationId: 'nghi-hoc',
      recipientId: 'ban-be',
      tone: 3,
      text: 'Test excuse text',
    };
    expect(template.id).toBe('test-1');
    expect(template.situationId).toBe('nghi-hoc');
    expect(template.recipientId).toBe('ban-be');
    expect(template.tone).toBe(3);
    expect(template.text).toBe('Test excuse text');
  });
});

describe('Situations (FR17, FR20)', () => {
  it('exports at least 5 situation categories', () => {
    expect(SITUATIONS.length).toBeGreaterThanOrEqual(5);
  });

  it('each situation has id, label, emoji, and category', () => {
    SITUATIONS.forEach((s: Situation) => {
      expect(s.id).toBeTruthy();
      expect(s.label).toBeTruthy();
      expect(s.emoji).toBeTruthy();
      expect(s.category).toBeTruthy();
    });
  });

  it('has unique IDs', () => {
    const ids = SITUATIONS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('labels are in Vietnamese', () => {
    // Verify at least one situation contains Vietnamese characters
    const hasVietnamese = SITUATIONS.some((s) =>
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(
        s.label,
      ),
    );
    expect(hasVietnamese).toBe(true);
  });
});

describe('Recipients (FR18)', () => {
  it('exports at least 3 recipient types', () => {
    expect(RECIPIENTS.length).toBeGreaterThanOrEqual(3);
  });

  it('each recipient has id, label, and emoji', () => {
    RECIPIENTS.forEach((r: Recipient) => {
      expect(r.id).toBeTruthy();
      expect(r.label).toBeTruthy();
      expect(r.emoji).toBeTruthy();
    });
  });

  it('has unique IDs', () => {
    const ids = RECIPIENTS.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Tone Labels', () => {
  it('exports exactly 5 tone levels', () => {
    expect(TONE_LABELS).toHaveLength(5);
  });

  it('covers levels 1 through 5', () => {
    const levels = TONE_LABELS.map((t) => t.level);
    expect(levels).toEqual([1, 2, 3, 4, 5]);
  });

  it('each tone has level, label, and emoji', () => {
    TONE_LABELS.forEach((t: ToneLabel) => {
      expect(t.level).toBeGreaterThanOrEqual(1);
      expect(t.level).toBeLessThanOrEqual(5);
      expect(t.label).toBeTruthy();
      expect(t.emoji).toBeTruthy();
    });
  });

  it('level 1 is sincere (😇) and level 5 is elaborate (🎭)', () => {
    expect(TONE_LABELS[0].emoji).toBe('😇');
    expect(TONE_LABELS[4].emoji).toBe('🎭');
  });

  it('labels are in Vietnamese', () => {
    const hasVietnamese = TONE_LABELS.some((t) =>
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(
        t.label,
      ),
    );
    expect(hasVietnamese).toBe(true);
  });
});
