# Story 3.4: Verdict Badge & Factor Breakdown

Status: done

## Acceptance Criteria

1. ✅ VerdictBadge shows verdict text with colored badge (5 colors: green→red)
2. ✅ BSBreakdown lists factors sorted by impact (highest first)
3. ✅ Each factor shows label, value (%), visual bar, description
4. ✅ ARIA: status role for badge, list role for breakdown

## Dev Agent Record

### Review (1 HIGH: indent → fixed)

### File List

- src/features/soi/components/VerdictBadge.tsx (new: 5 color classes, ARIA status)
- src/features/soi/components/verdict-badge.css (new: semi-transparent colored badges)
- src/features/soi/components/BSBreakdown.tsx (new: sorted factors, visual bars)
- src/features/soi/components/bs-breakdown.css (new: accent gradient bars)
- src/features/soi/components/VerdictBadgeBreakdown.test.tsx (new: 10 tests)
