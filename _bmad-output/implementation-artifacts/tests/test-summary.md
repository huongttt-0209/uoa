# Tóm tắt Kiểm thử Tự động

## Khung kiểm thử

| Loại | Framework | Số test | Kết quả |
|------|-----------|---------|---------|
| Unit + Component | Vitest + @testing-library/react | 200 | ✅ Đạt |
| E2E | Playwright (Chromium) | 21 | ✅ Đạt |
| **Tổng** | | **221** | **✅ Tất cả đạt** |

## E2E Tests — Chi tiết

### TẠO Tab (8 tests)
- [x] Page load — title hiển thị, tab TẠO mặc định active
- [x] SituationPicker — mở dropdown, chọn option
- [x] RecipientPicker — chuyển giữa các pill options
- [x] RecipientPicker — **keyboard arrow navigation** (ArrowRight/Left + focus)
- [x] ToneSlider — thay đổi mức độ xạo
- [x] Generate — tạo excuse text
- [x] Copy — copy text + hiển thị toast
- [x] Regenerate — tạo excuse khác (FR19 no-repeat)

### SOI Tab (8 tests)
- [x] Empty state — textarea trống + character count
- [x] Validation — dưới 10 ký tự hiển thị hint
- [x] Auto-analysis — 10+ ký tự tự động phân tích
- [x] BSGauge — hiển thị score %
- [x] VerdictBadge — verdict label + emoji
- [x] BSBreakdown — 4 factors sorted by impact
- [x] ShareButton — copy kết quả vào clipboard
- [x] High-BS text — text nhiều keyword cho score cao

### Navigation (5 tests)
- [x] Tab switching — click chuyển tabs
- [x] Content reset — nội dung reset khi switch
- [x] Keyboard navigation — ArrowRight/Left giữa tabs
- [x] ARIA attributes — tablist, tab, aria-selected

## Coverage

| Feature | E2E Tests |
|---------|-----------|
| TẠO — Excuse Generator | 8/8 flows |
| SOI — BS Detector | 8/8 flows |
| Navigation + A11y | 5/5 flows |

## Lệnh chạy

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e
```
