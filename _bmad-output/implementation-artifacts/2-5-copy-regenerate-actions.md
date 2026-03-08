# Story 2.5: Copy & Regenerate Actions

Status: done

## Story

As a **user**,
I want **to copy the excuse with one tap or regenerate a new one**,
so that **I can quickly use the excuse or try another option** (FR5, FR6).

## Acceptance Criteria

1. ✅ CopyButton uses `navigator.clipboard.writeText()` with `document.execCommand('copy')` fallback (FR5)
2. ✅ Toast shows "Đã copy! 📋" with auto-dismiss
3. ✅ RegenerateButton calls `onRegenerate` callback (FR6, FR19)
4. ✅ Buttons ≥48px height, hover lift, pill shape, proper disabled state

## Dev Agent Record

### Senior Developer Review (AI)

**Date:** 2026-03-08 | **Outcome:** Approved (after fixes)

**Findings (4 total: 1 HIGH, 2 MEDIUM, 1 LOW):**

- [x] 🔴 HIGH: 4-space indentation across all new files → Fixed to 2-space
- [x] 🟡 MEDIUM: `setTimeout` in CopyButton not cleaned up on unmount → Added `timerRef` + `useEffect` cleanup
- [x] 🟡 MEDIUM: English `aria-label="Copy excuse"` → Vietnamese `aria-label="Copy lý do"` (FR20)
- [x] 🟢 LOW: RegenerateButton indent → Fixed to 2-space

### Change Log

- 2026-03-08: Story 2.5 implemented — CopyButton, RegenerateButton
- 2026-03-08: Code review — 4 issues fixed (1 HIGH, 2 MEDIUM, 1 LOW)

### File List

- src/features/tao/components/CopyButton.tsx (new: Clipboard API + execCommand fallback + Toast + timer cleanup)
- src/features/tao/components/copy-button.css (new: accent pill, hover lift, success green)
- src/features/tao/components/CopyButton.test.tsx (new: 6 tests)
- src/features/tao/components/RegenerateButton.tsx (new: outline button with disabled state)
- src/features/tao/components/regenerate-button.css (new: outline pill, hover fill)
- src/features/tao/components/RegenerateButton.test.tsx (new: 6 tests)
