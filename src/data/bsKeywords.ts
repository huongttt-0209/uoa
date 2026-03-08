/**
 * BS (Bullshit) keyword categories for SOI scoring engine.
 * Vietnamese keywords used to detect excuse fabrication patterns.
 */

export interface BSKeywordCategory {
  id: string;
  label: string;
  keywords: readonly string[];
  weight: number;
}

/** Vagueness — words that avoid specifics */
const VAGUENESS: BSKeywordCategory = {
  id: 'vagueness',
  label: 'Mơ hồ',
  weight: 1.5,
  keywords: [
    'có lẽ',
    'hình như',
    'chắc là',
    'dường như',
    'có thể',
    'không chắc',
    'ai đó',
    'ở đâu đó',
    'lúc nào đó',
    'một số',
    'vài',
    'khoảng',
    'tầm',
    'gì đó',
    'kiểu như',
    'cũng được',
    'tùy',
    'sao cũng được',
    'không nhớ rõ',
    'quên mất',
  ],
};

/** Exaggeration — over-the-top claims */
const EXAGGERATION: BSKeywordCategory = {
  id: 'exaggeration',
  label: 'Phóng đại',
  weight: 2.0,
  keywords: [
    'cực kỳ',
    'vô cùng',
    'siêu',
    'khủng khiếp',
    'kinh khủng',
    'chưa từng có',
    'lịch sử',
    'tất cả',
    'không ai',
    'ai cũng',
    'luôn luôn',
    'không bao giờ',
    'hoàn toàn',
    'tuyệt đối',
    'chắc chắn 100%',
    'duy nhất',
    'chưa bao giờ',
    'lần đầu tiên',
    'ghê gớm',
    'khủng',
  ],
};

/** Hedging — softening language to avoid commitment */
const HEDGING: BSKeywordCategory = {
  id: 'hedging',
  label: 'Né tránh',
  weight: 1.2,
  keywords: [
    'thực ra',
    'nói thật là',
    'em xin lỗi',
    'xin thông cảm',
    'em không cố ý',
    'ngoài ý muốn',
    'bất khả kháng',
    'do hoàn cảnh',
    'không phải lỗi em',
    'em cũng không muốn',
    'đáng lẽ',
    'lẽ ra',
    'thề luôn',
    'tin em đi',
    'em thề',
    'thật sự mà nói',
    'nói chung là',
  ],
};

/** Deflection — shifting blame or attention */
const DEFLECTION: BSKeywordCategory = {
  id: 'deflection',
  label: 'Đổ lỗi',
  weight: 1.8,
  keywords: [
    'tại vì',
    'bởi vì',
    'nhưng mà',
    'người ta',
    'ai bảo',
    'ai biết',
    'không phải tại',
    'tại anh/chị',
    'bạn em',
    'gia đình em',
    'mẹ em bảo',
    'sếp bắt',
    'thầy/cô kêu',
    'bác sĩ nói',
    'tự nhiên',
  ],
};

export const BS_KEYWORD_CATEGORIES: readonly BSKeywordCategory[] = [
  VAGUENESS,
  EXAGGERATION,
  HEDGING,
  DEFLECTION,
];
