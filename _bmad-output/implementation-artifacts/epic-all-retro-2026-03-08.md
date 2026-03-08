# 🔄 Retrospective Tổng Hợp — Epic 1–4: Ú Òa Full Delivery

**Ngày:** 2026-03-08
**Facilitator:** Bob (Scrum Master)
**Tham dự:** Uoa (Project Lead), Alice (Product Owner), Charlie (Senior Dev), Dana (QA Engineer), Elena (Junior Dev), Winston (Architect)

---

## 📊 Tổng Quan Delivery

| Metric | Kết quả |
|---|---|
| **Tổng Stories** | 17/17 done (100%) |
| **Tổng Tests** | 194 tests passed |
| **Bundle Size** | 63KB gzip (budget: 200KB → **68% dưới budget**) |
| **WCAG AA** | ✅ Tất cả contrast ≥4.5:1 |
| **Code Review Issues** | ~60 issues caught, ~55 fixed |
| **Epics Delivered** | 4/4 (100%) |

### Breakdown Theo Epic

| Epic | Stories | Tests | Ghi chú |
|---|---|---|---|
| **Epic 1:** Visual Identity & Design | 4 | 49 | Design tokens, GlassCard, Toast, responsive |
| **Epic 2:** TẠO — Excuse Generator | 5 | 51 | 105 templates, SituationPicker, ToneSlider, Copy/Regenerate |
| **Epic 3:** SOI — BS Detection | 5 | 57 | BS scoring engine, Gauge SVG, VerdictBadge, Share |
| **Epic 4:** Navigation & Launch | 3 | 37 | TabBar, Analytics, Production deploy |

---

## ✅ Những Gì Làm Tốt (What Went Well)

### 1. 🏗️ Kiến Trúc Vững Chắc Từ Đầu
- Feature-based folder structure (`features/tao/`, `features/soi/`, `shared/`) scale tốt xuyên suốt 4 epics
- CSS Custom Properties design system → không có story nào cần hardcode colors
- Component architecture rõ ràng: mỗi component = `.tsx` + `.css` + `.test.tsx`

### 2. 🧪 Test Coverage Ấn Tượng
- 194 tests cho app client-side nhỏ → test-per-component ratio rất cao
- Mỗi story đều có tests TRƯỚC khi review
- CSS content tests (kiểm tra design tokens tồn tại) — pattern hiếm thấy nhưng rất hữu ích
- Performance test cho BS Scorer (100× repeated text dưới 1s)

### 3. 📦 Bundle Size Xuất Sắc
- **63KB gzip** — chỉ 31% budget (200KB)
- Không dependency ngoài: React + ReactDOM only
- CSS vanilla, không CSS framework

### 4. ♿ Accessibility Nhất Quán
- `aria-selected`, `role="tablist"`, `aria-live="polite"` xuyên suốt
- `prefers-reduced-motion` supported trong mọi animation
- Keyboard navigation: ↑↓←→ Enter Escape
- Touch targets ≥48px verified

### 5. 🔍 Code Review Phát Hiện Issues Sớm
- Tổng ~60 issues được phát hiện qua AI code review
- 2 HIGH bugs nghiêm trọng caught: "porque" (Spanish) trong Vietnamese templates, dvh/vh fallback order reversed
- Review feedback consistent và actionable

### 6. 🇻🇳 Vietnamese Localization Sâu
- 105 excuse templates covering 7×3×5 combos
- 73 BS keywords trong 4 weighted categories
- 5 verdict levels với emoji phù hợp văn hóa VN

---

## ⚠️ Thách Thức & Bài Học (Challenges & Lessons)

### 1. 🔴 4-Space Indent — Lỗi Hệ Thống (#1 Issue)

**Xuất hiện:** 17/17 stories (100%)
**Severity:** HIGH trong mọi code review

**Root Cause:** AI code generation tool (`write_to_file`) mặc định output 4-space indent, nhưng project convention là 2-space.

**Impact:**
- Mỗi story phải fix indent sau code review → tốn công
- `sed` commands chạy hàng loạt sau mỗi review
- Một số fix indent gây mixed indentation mới

**📌 Action Item:** Configure AI tool / EditorConfig / Prettier auto-format trước khi generate code.

---

### 2. 🟡 Tài Liệu Story Ngắn Dần Về Cuối

**So sánh:**
- Story 1.1: 126 dòng, detailed debug log, file list đầy đủ
- Story 3.3: 22 dòng, chỉ "Review (1 HIGH: indent → fixed)"
- Story 3.4: 23 dòng, thiếu Dev Notes, Debug Log

**Root Cause:** Velocity tăng → team viết doc ít hơn. Có thể do fatigue hoặc do confidence tăng.

**Impact:** Nếu cần debug hoặc onboard người mới, stories cuối thiếu context.

**📌 Action Item:** Đặt minimum template cho story records (dù ngắn cũng cần: Findings summary, File List, Change Log).

---

### 3. 🟡 i18n Slip: Spanish "porque" Trong Templates

**Story:** 2.4 — Excuse Generation Engine
**Issue:** Một template dùng từ "porque" (tiếng Tây Ban Nha) thay vì "vì" (VN)
**Caught by:** AI Code Review

**Root Cause:** AI model training data bleeding — likely generated from Spanish corpus.

**📌 Action Item:** Thêm Vietnamese-only language test: assert no non-Vietnamese words in template data.

---

### 4. 🟡 Stacking Context Issue — GlassCard + Dropdown

**Story:** Post-Epic polish (conversation hiện tại)
**Issue:** `backdrop-filter: blur()` tạo stacking context riêng → portal overlay không cover được content bên trong GlassCard
**Fix:** Propagate `isDropdownOpen` state → CSS class-based blur cho siblings

**Root Cause:** CSS stacking context là gotcha ít được nhắc đến khi kết hợp glassmorphism + portals.

**📌 Action Item:** Document GlassCard stacking context behavior trong architecture docs. Test overlay interactions sớm.

---

### 5. 🟡 Timer/Cleanup Issues (3+ Stories)

**Affected:** CopyButton, ShareButton, Toast
**Issue:** `setTimeout` không cleanup khi component unmount → potential memory leak
**Caught by:** Code review (Stories 2.5, 3.5)

**Root Cause:** Pattern phổ biến nhưng dễ quên: `useEffect` cleanup cho timers.

**📌 Action Item:** Tạo custom hook `useTimeout()` để centralize timer cleanup.

---

### 6. 🟢 Deferred Items Tích Lũy

Các items marked "deferred" hoặc "LOW — deferred" xuyên stories:

| Item | Story | Risk |
|---|---|---|
| No barrel export for shared components | 1.3 | Low — imports work fine |
| RecipientPicker missing ArrowLeft/Right key nav | 2.2 | Medium — a11y gap |
| CSS hardcoded `12px 16px` not tokenized | 2.2 | Low — cosmetic |
| No E2E viewport tests | 1.4 | Medium — needs browser testing |
| README still Vite default | 1.1 | Low — doc only |

**📌 Action Item:** Tạo "polish backlog" từ deferred items cho sprint tiếp.

---

## 📈 Velocity & Quality Patterns

### Story Completion Flow
```
Epic 1: 4 stories → 49 tests → Foundation ready ✅
Epic 2: 5 stories → +51 tests → TẠO feature complete ✅
Epic 3: 5 stories → +57 tests → SOI feature complete ✅
Epic 4: 3 stories → +37 tests → App deployed ✅
```

### Code Review Pattern
```
Avg findings per story: ~3.5
HIGH per story: ~1.0 (almost always 4-space indent)
Actual bugs caught: 2 (porque, dvh order)
Process issues caught: ~15 (indent, naming, cleanup)
Deferred items: ~8
```

### Quality Gate
- ✅ `npm test` → 194/194 passed
- ✅ `npm run build` → 63KB gzip
- ✅ `npm run lint` → 0 errors
- ✅ WCAG AA contrast → all pass

---

## 🧠 Key Insights (Bài Học Chính)

1. **AI Code Generation cần formatter pipeline** — Nếu có Prettier auto-format trên save/commit, 50%+ code review issues sẽ biến mất tự động.

2. **Test-first approach pays off** — 194 tests cho confidence refactor. GlassCard stacking context fix không break gì nhờ test coverage.

3. **CSS Custom Properties scale tuyệt vời** — Từ Epic 1 đến 4, không story nào cần đổi design system approach. Tokens defined once, used everywhere.

4. **Vietnamese localization cần explicit guards** — AI models có thể mix languages. Cần test assertions cho language consistency.

5. **Glassmorphism + Portals có gotcha** — Document stacking context behavior early. Test composite UI patterns (overlay + backdrop-filter) in isolation.

6. **Story doc laziness tăng theo velocity** — Khi ship nhanh, docs bị cắt. Cần minimum template enforcement.

---

## 📝 Action Items Tổng Hợp

| # | Action | Owner | Priority | Deadline |
|---|---|---|---|---|
| 1 | Configure Prettier/EditorConfig auto-format 2-space | Charlie (Dev) | 🔴 HIGH | Before next epic |
| 2 | Create `useTimeout()` custom hook | Amelia (Dev) | 🟡 MED | Next sprint |
| 3 | Add Vietnamese-only language test guard | Dana (QA) | 🟡 MED | Next sprint |
| 4 | Document GlassCard stacking context in arch docs | Winston (Architect) | 🟡 MED | Next sprint |
| 5 | Create story record minimum template | Bob (SM) | 🟡 MED | Before next epic |
| 6 | Create polish backlog from deferred items | Alice (PO) | 🟢 LOW | Planning |
| 7 | Add E2E browser viewport tests | Dana (QA) | 🟢 LOW | When E2E setup |
| 8 | Update README from Vite default | Paige (Tech Writer) | 🟢 LOW | Anytime |

---

## ✅ Readiness Assessment

| Area | Status |
|---|---|
| **Testing & Quality** | ✅ 194 tests, lint clean, build clean |
| **Deployment** | ✅ Vercel config ready, 63KB bundle |
| **Stakeholder Acceptance** | ⏳ Pending — cần user review UI trực tiếp |
| **Technical Health** | ✅ Stable — no known critical bugs |
| **Technical Debt** | 🟡 8 deferred items (mostly LOW) |

---

## 🎯 Kết Luận

Bob (Scrum Master): "Tổng kết: 17 stories delivered, 194 tests, 63KB bundle, 4 epics hoàn thành. Đây là dự án MVP thành công. Bài học lớn nhất: **invest vào tooling (formatter, linter auto-fix) từ đầu sẽ tiết kiệm rất nhiều effort ở code review.**"

Alice (Product Owner): "Sản phẩm Ú Òa đã sẵn sàng deploy. Cảm ơn team!"

Charlie (Senior Dev): "63KB gzip cho một app React full-featured — tôi tự hào về con số đó."

Dana (QA): "194 tests cho confidence. Nhưng chúng ta cần E2E tests trước khi scale."

Winston (Architect): "Kiến trúc feature-based đã scale đúng như thiết kế. Zero architectural pivots cần thiết."

---

*Retrospective hoàn thành. Sprint status updated.*
