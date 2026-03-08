import { describe, it, expect } from 'vitest';
import { EXCUSE_TEMPLATES } from './excuseTemplates';
import { SITUATIONS } from './situations';
import { RECIPIENTS } from './recipients';
import type { ToneLevel } from './types';

describe('EXCUSE_TEMPLATES', () => {
  it('has at least 50 templates', () => {
    expect(EXCUSE_TEMPLATES.length).toBeGreaterThanOrEqual(50);
  });

  it('every template has required fields', () => {
    for (const t of EXCUSE_TEMPLATES) {
      expect(t.id).toBeTruthy();
      expect(t.situationId).toBeTruthy();
      expect(t.recipientId).toBeTruthy();
      expect(t.tone).toBeGreaterThanOrEqual(1);
      expect(t.tone).toBeLessThanOrEqual(5);
      expect(t.text).toBeTruthy();
    }
  });

  it('has unique IDs', () => {
    const ids = EXCUSE_TEMPLATES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all situationIds reference existing situations', () => {
    const situationIds = new Set(SITUATIONS.map((s) => s.id));
    for (const t of EXCUSE_TEMPLATES) {
      expect(situationIds.has(t.situationId)).toBe(true);
    }
  });

  it('all recipientIds reference existing recipients', () => {
    const recipientIds = new Set(RECIPIENTS.map((r) => r.id));
    for (const t of EXCUSE_TEMPLATES) {
      expect(recipientIds.has(t.recipientId)).toBe(true);
    }
  });

  it('covers all 7 situations', () => {
    const coveredSituations = new Set(
      EXCUSE_TEMPLATES.map((t) => t.situationId),
    );
    expect(coveredSituations.size).toBe(7);
  });

  it('covers all 3 recipients per situation', () => {
    const recipientIds = RECIPIENTS.map((r) => r.id);
    const situations = [...new Set(EXCUSE_TEMPLATES.map((t) => t.situationId))];
    for (const sit of situations) {
      const covered = new Set(
        EXCUSE_TEMPLATES.filter((t) => t.situationId === sit).map(
          (t) => t.recipientId,
        ),
      );
      for (const rid of recipientIds) {
        expect(covered.has(rid)).toBe(true);
      }
    }
  });

  it('covers all 5 tones per situation+recipient combo', () => {
    const tones: ToneLevel[] = [1, 2, 3, 4, 5];
    const combos = new Set(
      EXCUSE_TEMPLATES.map((t) => `${t.situationId}|${t.recipientId}`),
    );
    for (const combo of combos) {
      const [sit, rec] = combo.split('|');
      const covered = new Set(
        EXCUSE_TEMPLATES.filter(
          (t) => t.situationId === sit && t.recipientId === rec,
        ).map((t) => t.tone),
      );
      for (const tone of tones) {
        expect(covered.has(tone)).toBe(true);
      }
    }
  });

  it('all texts are in Vietnamese', () => {
    const vnPattern =
      /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i;
    for (const t of EXCUSE_TEMPLATES) {
      expect(vnPattern.test(t.text)).toBe(true);
    }
  });
});
