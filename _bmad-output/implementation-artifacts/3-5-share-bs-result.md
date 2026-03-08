# Story 3.5: Share BS Result

Status: done

## Acceptance Criteria

1. ✅ ShareButton generates pre-formatted text: "🎯 BS Score: {score}% — {verdict}\n{breakdown}\n— Analyzed by Ú Òa"
2. ✅ Clipboard API + execCommand fallback
3. ✅ Toast "Đã copy kết quả! 📋" on success
4. ✅ Timer cleanup on unmount

## Dev Agent Record

### Review (2 issues fixed)

- 🔴 react-refresh/only-export-components → Extracted `formatShareText` to `utils/formatShareText.ts`
- 🟡 4-space indent → Fixed throughout

### File List

- src/features/soi/components/ShareButton.tsx (new: clipboard copy + Toast)
- src/features/soi/components/share-button.css (new: glass bg, hover lift, success green)
- src/features/soi/utils/formatShareText.ts (new: share text formatter)
- src/features/soi/components/ShareButton.test.tsx (new: 8 tests)
