# Story 3.1: BS Scoring Data & Engine

Status: done

## Story

As a **developer**,
I want **a BS scoring algorithm with keyword data and verdict thresholds**,
so that **the SOI tab can analyze text accurately** (FR9, FR10, FR11).

## Acceptance Criteria

1. ✅ `bsKeywords.ts` — 73 Vietnamese keywords in 4 weighted categories (vagueness, exaggeration, hedging, deflection)
2. ✅ `verdicts.ts` — 5 verdict levels from "Thật thà" (0-20) to "Bịa như thật" (81-100) with emoji
3. ✅ `useBSScorer` returns score 0-100, 4 factors, verdict string
4. ✅ Calculation completes within 1 second (NFR2) — tested with 100× repeated text
5. ✅ Factors: keyword density (0.35), sentence length (0.2), vagueness (0.25), emoji ratio (0.2)
6. ✅ Verdict thresholds: 0-20 "Thật thà" 😇, 21-40 "Hơi đáng ngờ" 🤔, 41-60 "Có mùi BS" 🧐, 61-80 "BS khá rõ" 🤥, 81-100 "Bịa như thật" 🎭

## Dev Agent Record

### Senior Developer Review (AI)

**Date:** 2026-03-08 | **Outcome:** Approved (after fixes)

**Findings (3 total: 1 HIGH, 1 MEDIUM, 1 LOW):**

- [x] 🔴 HIGH: 4-space indentation in all files → Fixed to 2-space
- [x] 🟡 MEDIUM: Emoji regex `no-misleading-character-class` lint error → Replaced with `\p{Extended_Pictographic}` Unicode property escape
- [x] 🟢 LOW: Unused eslint-disable directive → Removed

### Change Log

- 2026-03-08: Story 3.1 implemented — BS keywords, verdicts, useBSScorer hook
- 2026-03-08: Code review — 3 issues fixed

### File List

- src/data/bsKeywords.ts (new: 4 categories, 73 Vietnamese BS keywords with weights)
- src/data/verdicts.ts (new: 5 verdict levels with emoji, getVerdict function)
- src/data/bsData.test.ts (new: 14 tests — categories, ranges, getVerdict)
- src/features/soi/hooks/useBSScorer.ts (new: 4-factor weighted scoring engine)
- src/features/soi/hooks/useBSScorer.test.ts (new: 8 tests — null, scoring, perf)
