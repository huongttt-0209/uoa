# Story 1.1: Project Scaffolding

Status: done

## Story

As a **developer**,
I want **a working Vite+React+TypeScript project with the correct folder structure**,
so that **I can start building features immediately**.

## Acceptance Criteria

1. **Given** a clean project directory **When** the starter template is initialized with `npm create vite@latest . -- --template react-swc-ts` **Then** the project builds successfully with `npm run dev`
2. **Given** the project is initialized **When** the folder structure is created **Then** feature-based folders exist: `src/features/tao/`, `src/features/soi/`, `src/shared/`, `src/data/`
3. **Given** the project is initialized **When** Vitest + React Testing Library are installed **Then** a sample test passes with `npm test`

## Tasks / Subtasks

- [x] Task 1: Initialize Vite project (AC: #1)
  - [x] 1.1 Run `npm create vite@latest . -- --template react-swc-ts`
  - [x] 1.2 Run `npm install`
  - [x] 1.3 Verify `npm run dev` starts dev server without errors
  - [x] 1.4 Clean up default Vite boilerplate (remove `App.css` counter demo, default logo, etc.)
- [x] Task 2: Create feature-based folder structure (AC: #2)
  - [x] 2.1 Create `src/features/tao/components/` and `src/features/tao/hooks/`
  - [x] 2.2 Create `src/features/tao/index.ts` (barrel export)
  - [x] 2.3 Create `src/features/soi/components/` and `src/features/soi/hooks/`
  - [x] 2.4 Create `src/features/soi/index.ts` (barrel export)
  - [x] 2.5 Create `src/shared/components/`
  - [x] 2.6 Create `src/shared/styles/` (for `globals.css`, `design-tokens.css` in Story 1.2)
  - [x] 2.7 Create `src/shared/utils/`
  - [x] 2.8 Create `src/data/` (for template data constants)
  - [x] 2.9 Add placeholder `index.ts` barrel exports in each feature folder
- [x] Task 3: Install and configure Vitest + RTL (AC: #3)
  - [x] 3.1 Install: `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
  - [x] 3.2 Add Vitest config to `vite.config.ts`
  - [x] 3.3 Create `src/test-setup.ts`
  - [x] 3.4 Add `"test": "vitest run"` and `"test:watch": "vitest"` to `package.json` scripts
  - [x] 3.5 Write sample test `src/App.test.tsx` that renders App and asserts it mounts
  - [x] 3.6 Verify `npm test` passes

## Dev Notes

### Architecture Compliance

> **Source:** [architecture.md](file:///Users/teamai/Downloads/antigravity/uoa/_bmad-output/planning-artifacts/architecture.md)

- **Starter:** `npm create vite@latest . -- --template react-swc-ts` — Vite 7.3.1 + SWC
- **TypeScript:** strict mode enabled
- **Named exports only** — `export function X()`, never `export default`
- **Tests co-located** — `Component.test.tsx` next to `Component.tsx`

### References

- [Architecture: Starter Template](file:///Users/teamai/Downloads/antigravity/uoa/_bmad-output/planning-artifacts/architecture.md#L79-L121)
- [Architecture: Naming Patterns](file:///Users/teamai/Downloads/antigravity/uoa/_bmad-output/planning-artifacts/architecture.md#L196-L208)
- [Epics: Story 1.1](file:///Users/teamai/Downloads/antigravity/uoa/_bmad-output/planning-artifacts/epics.md#L143-L156)

## Dev Agent Record

### Agent Model Used

Google Gemini (Antigravity)

### Debug Log References

- Vite CLI created nested path due to absolute path argument — resolved by copying files to project root
- Reinstalled `node_modules` to fix corrupted symlinks from copy operation

### Completion Notes List

- ✅ Vite 7.3.1 + react-swc-ts scaffolded successfully
- ✅ Package.json: name=uoa, version=0.1.0, test scripts added
- ✅ Feature-based folder structure created per architecture spec
- ✅ Barrel exports in tao/index.ts and soi/index.ts
- ✅ Vitest v4.0.18 + RTL configured with jsdom environment
- ✅ App.tsx uses named export (architecture compliance)
- ✅ Boilerplate cleaned (counter demo, default logos removed)
- ✅ Build: 193KB (gzip 60KB) — well under 200KB budget
- ✅ Test: 1 passed in 546ms

### Senior Developer Review (AI)

**Date:** 2026-03-08 | **Outcome:** Approved (after fixes)

**Findings (7 total: 2 HIGH, 4 MEDIUM, 1 LOW):**

- [x] 🔴 HIGH: `index.html` title was "scaffold" → Fixed to "Ú Òa"
- [x] 🔴 HIGH: `index.html` favicon referenced `vite.svg` boilerplate → Removed
- [x] 🟡 MEDIUM: Empty `src/assets/` dir left behind → Removed
- [x] 🟡 MEDIUM: `public/vite.svg` boilerplate not removed → Removed
- [x] 🟡 MEDIUM: `src/vite-env.d.ts` missing from File List → Added below
- [x] 🟡 MEDIUM: `App.test.tsx` used 4-space indent vs project 2-space → Fixed
- [ ] 🟢 LOW: `README.md` is Vite default boilerplate (deferred to later story)

### Change Log

- 2026-03-08: Story 1.1 implemented — project scaffolding complete
- 2026-03-08: Code review — 6 issues fixed (2 HIGH, 4 MEDIUM)

### File List

- package.json (modified: name, version, test scripts)
- vite.config.ts (modified: added Vitest config)
- src/main.tsx (modified: named import)
- src/App.tsx (modified: named export, clean shell)
- src/App.css (modified: minimal styles)
- src/test-setup.ts (new)
- src/App.test.tsx (new)
- src/features/tao/index.ts (new)
- src/features/tao/components/ (new dir)
- src/features/tao/hooks/ (new dir)
- src/features/soi/index.ts (new)
- src/features/soi/components/ (new dir)
- src/features/soi/hooks/ (new dir)
- src/shared/components/ (new dir)
- src/shared/styles/ (new dir)
- src/shared/utils/ (new dir)
- src/data/ (new dir)
- src/vite-env.d.ts (template-generated)
- src/index.css (deleted)
- src/assets/react.svg (deleted)
- src/assets/ (deleted — empty boilerplate dir)
- public/vite.svg (deleted — boilerplate)
- index.html (modified: title, favicon)
