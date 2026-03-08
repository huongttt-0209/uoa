# Story 2.4: Excuse Generation Engine

Status: done

## Story

As a **user**,
I want **an excuse generated when I've selected situation + recipient + tone**,
so that **I can see a ready-to-use excuse** (FR4, FR19).

## Acceptance Criteria

1. ✅ Excuse generated within 500ms via client-side template filtering (NFR1)
2. ✅ Uses Vietnamese context — 105 templates covering 7×3×5 combos (FR20)
3. ✅ No exact repeat of previous excuse via useRef tracking (FR19)
4. ✅ ExcuseResult card with glassmorphism + neon accent gradient bar

## Dev Agent Record

### Senior Developer Review (AI)

**Date:** 2026-03-08 | **Outcome:** Approved (after fixes)

**Findings (5 total: 2 HIGH, 2 MEDIUM, 1 LOW):**

- [x] 🔴 HIGH: Spanish word "porque" in Vietnamese template → Fixed to "vì"
- [x] 🔴 HIGH: 4-space indentation across all new files → Fixed to 2-space
- [x] 🟡 MEDIUM: `lastExcuseRef` persisted across param changes → Added `useEffect` reset
- [x] 🟡 MEDIUM: ExcuseResult/test indent → Fixed to 2-space
- [ ] 🟢 LOW: CSS uses glass tokens — verified they exist in design system

### Change Log

- 2026-03-08: Story 2.4 implemented — templates, hook, ExcuseResult
- 2026-03-08: Code review — 4 issues fixed (2 HIGH, 2 MEDIUM)

### File List

- src/data/excuseTemplates.ts (new: 105 templates, 7 situations × 3 recipients × 5 tones)
- src/data/excuseTemplates.test.ts (new: 9 tests — structure, coverage, Vietnamese)
- src/features/tao/hooks/useExcuseGenerator.ts (new: filter + random + no-repeat hook)
- src/features/tao/hooks/useExcuseGenerator.test.ts (new: 5 tests)
- src/features/tao/components/ExcuseResult.tsx (new: glass card, neon accent, empty state)
- src/features/tao/components/excuse-result.css (new: glassmorphism + gradient bar)
- src/features/tao/components/ExcuseResult.test.tsx (new: 5 tests)
