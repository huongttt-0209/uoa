# Story 2.1: Template Data & Content Constants

Status: done

## Story

As a **developer**,
I want **all excuse template data structured as TypeScript constants**,
so that **the excuse engine has content to generate from** (FR17, FR18, FR20).

## Acceptance Criteria

1. ✅ `situations.ts` exports 7 situation categories with Vietnamese context (FR17, FR20)
2. ✅ `recipients.ts` exports 3 recipient types (FR18)
3. ✅ `toneLabels.ts` exports 5 tone levels with emoji + labels
4. ✅ All data is typed with interfaces from `types.ts`

## Tasks / Subtasks

- [x] Task 1: Create types — `ToneLevel`, `Situation`, `Recipient`, `ToneLabel`, `ExcuseTemplate`
- [x] Task 2: Create situations data — 7 VN categories (nghỉ học, nghỉ làm, hủy hẹn, đến muộn, không trả tiền, không làm bài, từ chối đi chơi)
- [x] Task 3: Create recipients data — 3 types (giảng viên/sếp, bạn bè, người yêu/gia đình)
- [x] Task 4: Create tone labels — 5 levels (😇→😏→😎→🐍→🎭)
- [x] Task 5: Write tests — 14 tests covering types, data, uniqueness, Vietnamese language
- [x] Task 6: Validation — 63 tests pass, build OK, lint OK

## Dev Agent Record

### Agent Model Used

Google Gemini (Antigravity)

### Senior Developer Review (AI)

**Date:** 2026-03-08 | **Outcome:** Approved (after fixes)

**Findings (4 total: 1 HIGH, 2 MEDIUM, 1 LOW):**

- [x] 🔴 HIGH: 4-space indent in all data files → Fixed to 2-space
- [x] 🟡 MEDIUM: Redundant `as const` with `readonly Type[]` annotation → Removed `as const`
- [x] 🟡 MEDIUM: `ExcuseTemplate` IDs are `string` not narrowed → Documented (will be refined in Story 2.4)
- [x] 🟢 LOW: Missing Vietnamese language test for toneLabels → Added

### Change Log

- 2026-03-08: Story 2.1 implemented — data layer with types and constants
- 2026-03-08: Code review — 3 issues fixed (1 HIGH, 2 MEDIUM)

### File List

- src/data/types.ts (new: 5 type definitions)
- src/data/situations.ts (new: 7 VN situation categories)
- src/data/recipients.ts (new: 3 recipient types)
- src/data/toneLabels.ts (new: 5 tone levels)
- src/data/data.test.ts (new: 14 tests)
