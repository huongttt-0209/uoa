import type { Situation } from './types';

/**
 * Excuse situation categories — Vietnamese context (FR17, FR20).
 * Each situation represents a common excuse scenario for Gen Z VN.
 */
export const SITUATIONS: readonly Situation[] = [
  {
    id: 'nghi-hoc',
    label: 'Nghỉ học',
    emoji: '📚',
    category: 'education',
  },
  {
    id: 'nghi-lam',
    label: 'Nghỉ làm',
    emoji: '💼',
    category: 'work',
  },
  {
    id: 'huy-hen',
    label: 'Hủy hẹn hò',
    emoji: '💔',
    category: 'social',
  },
  {
    id: 'den-muon',
    label: 'Đến muộn',
    emoji: '⏰',
    category: 'punctuality',
  },
  {
    id: 'khong-tra-tien',
    label: 'Không trả tiền',
    emoji: '💸',
    category: 'financial',
  },
  {
    id: 'khong-lam-bai',
    label: 'Không làm bài',
    emoji: '📝',
    category: 'education',
  },
  {
    id: 'tu-choi-di-choi',
    label: 'Từ chối đi chơi',
    emoji: '🏠',
    category: 'social',
  },
];
