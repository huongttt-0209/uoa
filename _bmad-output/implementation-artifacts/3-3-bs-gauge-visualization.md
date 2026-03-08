# Story 3.3: BS Gauge Visualization

Status: done

## Acceptance Criteria

1. ✅ BSGauge renders SVG semicircle speedometer arc
2. ✅ Needle sweeps via CSS transition 1.5s
3. ✅ Green→amber→red linear gradient track
4. ✅ Score percentage centered below arc
5. ✅ `prefers-reduced-motion`: no transitions, fade-in fallback

## Dev Agent Record

### Review (1 HIGH: indent → fixed)

### File List

- src/features/soi/components/BSGauge.tsx (new: SVG arc, needle, ARIA meter)
- src/features/soi/components/bs-gauge.css (new: 1.5s animation, reduced-motion)
- src/features/soi/components/BSGauge.test.tsx (new: 8 tests)
