import type { Recipient } from './types';

/**
 * Target recipient types for excuse generation (FR18).
 * Determines formality level and language register.
 */
export const RECIPIENTS: readonly Recipient[] = [
  {
    id: 'giang-vien-sep',
    label: 'Giảng viên / Sếp',
    emoji: '👔',
  },
  {
    id: 'ban-be',
    label: 'Bạn bè',
    emoji: '🤝',
  },
  {
    id: 'nguoi-yeu-gia-dinh',
    label: 'Người yêu / Gia đình',
    emoji: '❤️',
  },
];
