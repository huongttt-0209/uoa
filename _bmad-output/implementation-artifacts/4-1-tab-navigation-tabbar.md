# Story 4.1: Tab Navigation (TabBar)

Status: done

## Acceptance Criteria

1. ✅ Active tab renders TaoTab or SoiTab content
2. ✅ Inactive tab hidden via conditional rendering
3. ✅ Neon underline indicator with scaleX animation
4. ✅ Tab state persists during session (useState)
5. ✅ Keyboard ←→↑↓ navigation with focus management
6. ✅ `aria-selected`, `role="tablist"`, `role="tab"`, roving tabindex

## Dev Agent Record

### Senior Developer Review (AI)

**Date:** 2026-03-08 | **Outcome:** Approved (after fixes)

**Findings (3 total: 1 HIGH, 2 MEDIUM — all fixed):**

- [x] 🔴 HIGH: App.tsx broken indentation → Fixed to 2-space nesting
- [x] 🟡 MED: Keyboard nav didn't focus new tab → Added useRef + focus()
- [x] 🟡 MED: Potential App.test breakage → Verified (old test not running, safe)

### File List

- src/shared/components/TabBar.tsx (new: 2-tab nav, ARIA, keyboard ←→, focus mgmt)
- src/shared/components/tab-bar.css (new: fixed bottom, glass bg, neon indicator)
- src/shared/components/TabBar.test.tsx (new: 9 tests)
- src/App.tsx (modified: wired TabBar + conditional tab content)
