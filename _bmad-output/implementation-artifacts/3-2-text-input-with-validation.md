# Story 3.2: Text Input with Validation

Status: done

## Story

As a **user**,
I want **to paste or type text to analyze for BS**,
so that **I can check if someone's excuse is believable** (FR8, FR13).

## Acceptance Criteria

1. ✅ Textarea accepts input with Vietnamese placeholder
2. ✅ Character count displayed (N/1000)
3. ✅ Min-length hint "Cần ít nhất 10 ký tự" with `role="alert"` (FR13)
4. ✅ Label associated via `htmlFor`/`id`, `aria-describedby` for hint + count
5. ✅ Glass bg, accent border on focus, warning state for too-short

## Dev Agent Record

### Senior Developer Review (AI)

**Date:** 2026-03-08 | **Outcome:** Approved (after fixes)

**Findings (2 total: 1 HIGH, 1 LOW):**

- [x] 🔴 HIGH: 4-space indent → Fixed to 2-space
- [ ] 🟢 LOW: `role="alert"` on hint — appropriate for validation message

### Change Log

- 2026-03-08: Story 3.2 implemented — TextInput component
- 2026-03-08: Code review — 1 issue fixed

### File List

- src/features/soi/components/TextInput.tsx (new: textarea, char count, hint, label, a11y)
- src/features/soi/components/text-input.css (new: glass bg, accent focus, warning)
- src/features/soi/components/TextInput.test.tsx (new: 9 tests)
