# Story 2.2: SituationPicker & RecipientPicker Components

Status: done

## Story

As a **user**,
I want **to choose a situation and recipient for my excuse**,
so that **I get a relevant excuse for my specific case** (FR1, FR2).

## Acceptance Criteria

1. ✅ Pill-style dropdown reveals all situation categories with emoji icons
2. ✅ Selected situation displays with label + emoji + chevron ▾
3. ✅ Keyboard navigation: ↑↓ Enter Escape (NFR7)
4. ✅ Recipient options shown as selectable pills
5. ✅ Single-select behavior for recipients

## Dev Agent Record

### Senior Developer Review (AI)

**Date:** 2026-03-08 | **Outcome:** Approved (after fixes)

**Findings (4 total: 1 HIGH, 2 MEDIUM, 1 LOW):**

- [x] 🔴 HIGH: Label not associated with trigger button → Fixed with `htmlFor`/`id` via `useId()`
- [x] 🟡 MEDIUM: 4-space indentation → Fixed to 2-space
- [ ] 🟡 MEDIUM: RecipientPicker pills missing ArrowLeft/Right keyboard nav → Deferred (pills are focusable via Tab)
- [ ] 🟢 LOW: CSS uses hardcoded `12px 16px` instead of tokens → Cosmetic, deferred

### Change Log

- 2026-03-08: Story 2.2 implemented — SituationPicker + RecipientPicker
- 2026-03-08: Code review — 2 issues fixed (1 HIGH, 1 MEDIUM)

### File List

- src/features/tao/components/SituationPicker.tsx (new: pill dropdown, keyboard nav, a11y)
- src/features/tao/components/situation-picker.css (new: glassmorphism styles)
- src/features/tao/components/RecipientPicker.tsx (new: pill radio group, single-select)
- src/features/tao/components/recipient-picker.css (new: pill styles)
- src/features/tao/components/SituationPicker.test.tsx (new: 10 tests)
- src/features/tao/components/RecipientPicker.test.tsx (new: 7 tests)
