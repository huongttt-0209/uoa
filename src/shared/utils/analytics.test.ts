import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  trackEvent,
  trackExcuseGenerated,
  trackBSDetected,
  trackExcuseCopied,
  trackBSShared,
  trackTabSwitch,
} from './analytics';

describe('analytics', () => {
  let vaMock: ReturnType<typeof vi.fn>;
  const originalVa = window.va;

  beforeEach(() => {
    vaMock = vi.fn();
    window.va = vaMock;
  });

  afterEach(() => {
    window.va = originalVa;
  });

  describe('trackEvent', () => {
    it('calls window.va with event name and data', () => {
      trackEvent('test_event', { key: 'value' });
      expect(vaMock).toHaveBeenCalledWith('event', {
        name: 'test_event',
        key: 'value',
      });
    });

    it('calls window.va with event name only', () => {
      trackEvent('simple_event');
      expect(vaMock).toHaveBeenCalledWith('event', { name: 'simple_event' });
    });

    it('does not throw when window.va is undefined', () => {
      delete window.va;
      expect(() => trackEvent('test')).not.toThrow();
    });

    it('does not throw when window.va throws', () => {
      window.va = () => {
        throw new Error('blocked');
      };
      expect(() => trackEvent('test')).not.toThrow();
    });
  });

  describe('trackExcuseGenerated (FR25)', () => {
    it('tracks excuse_generated with params', () => {
      trackExcuseGenerated({
        situation: 'nghi-hoc',
        recipient: 'formal',
        tone: 3,
      });
      expect(vaMock).toHaveBeenCalledWith('event', {
        name: 'excuse_generated',
        situation: 'nghi-hoc',
        recipient: 'formal',
        tone: 3,
      });
    });
  });

  describe('trackBSDetected (FR26)', () => {
    it('tracks bs_detected with score and verdict', () => {
      trackBSDetected({ score: 75, verdict: 'BS khá rõ' });
      expect(vaMock).toHaveBeenCalledWith('event', {
        name: 'bs_detected',
        score: 75,
        verdict: 'BS khá rõ',
      });
    });
  });

  describe('trackExcuseCopied (FR27)', () => {
    it('tracks excuse_copied', () => {
      trackExcuseCopied();
      expect(vaMock).toHaveBeenCalledWith('event', { name: 'excuse_copied' });
    });
  });

  describe('trackBSShared (FR27)', () => {
    it('tracks bs_shared', () => {
      trackBSShared();
      expect(vaMock).toHaveBeenCalledWith('event', { name: 'bs_shared' });
    });
  });

  describe('trackTabSwitch', () => {
    it('tracks tab_switch with tab name', () => {
      trackTabSwitch('soi');
      expect(vaMock).toHaveBeenCalledWith('event', {
        name: 'tab_switch',
        tab: 'soi',
      });
    });
  });
});
