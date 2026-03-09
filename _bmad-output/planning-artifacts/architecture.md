---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ['planning-artifacts/prd.md', 'planning-artifacts/product-brief-uoa-2026-03-07.md', 'planning-artifacts/ux-design-specification.md']
workflowType: 'architecture'
project_name: 'uoa'
user_name: 'Uoa'
date: '2026-03-08'
lastStep: 8
status: 'complete'
completedAt: '2026-03-08'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**27 Functional Requirements** across 6 categories:

| Category | FRs | Architectural Implication |
|---|---|---|
| **TẠO (Excuse Gen)** | FR1-FR7 | Template Engine module — pattern matching, string interpolation |
| **SOI (BS Detect)** | FR8-FR13 | Rule-based Scorer module — text analysis, keyword scoring |
| **Navigation** | FR14-FR16 | Simple 2-tab SPA router, no deep linking |
| **Content** | FR17-FR20 | Data layer — 50+ templates × 5 situations × 3 recipients |
| **Visual** | FR21-FR24 | CSS animation system, responsive layout, gauge component |
| **Analytics** | FR25-FR27 | Event tracking integration (Vercel Analytics) |

**16 NFRs — Key architecture drivers:**

| NFR | Constraint | Impact |
|---|---|---|
| NFR1-2 | Gen <500ms, Score <1s | Must be client-side computation |
| NFR3 | Slider 60fps | CSS-only animations, no JS animation |
| NFR4-5 | FCP <1.5s, <200KB bundle | Minimal dependencies, no heavy frameworks |
| NFR6 | 60fps on mid-range | `backdrop-filter` fallback needed |
| NFR12 | Offline after load | Service Worker / static bundling |
| NFR13 | No state loss on refresh | `localStorage` persistence |

### Scale & Complexity

- **Complexity:** 🟢 Low — client-side only, no auth, no DB, no API
- **Primary domain:** Web SPA (frontend-only)
- **Estimated components:** ~8 UI + 2 logic modules
- **Cross-cutting concerns:** 3

### Technical Constraints

| Constraint | Source |
|---|---|
| **$0 budget** | Solo dev, Vercel Free Tier |
| **Zero backend** | 100% client-side processing |
| **Bundle <200KB** | Performance NFR |
| **Offline capable** | NFR12 — static content after load |
| **Dark theme only** | UX Design Spec — saves CSS |
| **Mobile-first** | 375px minimum viewport |

### Cross-Cutting Concerns

1. **Content Data Architecture** — 50+ templates structured for query by (situation × recipient × tone). JSON/TS constants. Affects bundle size + extensibility.
2. **Analytics Integration** — FR25-27 require event tracking across all features. Clean event bus or tracker abstraction.
3. **State Management** — Tab state, slider state, generated results. React state + `localStorage` for persistence (NFR13).

### UX → Architecture Implications

| UX Requirement | Architecture Decision Needed |
|---|---|
| SituationPicker dropdown | Custom component, `role="listbox"`, keyboard nav |
| ToneSlider 5 mức + emoji morph | Custom range input + CSS transitions |
| BS Gauge speedometer animation | SVG/CSS gauge + reduced-motion fallback |
| Copy 1-tap | Clipboard API with fallback |
| Share text format | Template-based text formatter |
| `prefers-reduced-motion` | Animation wrapper with fade alternatives |
| `backdrop-filter` fallback | `@supports` progressive enhancement |

## Starter Template Evaluation

### Primary Technology Domain

Web SPA (frontend-only) — based on PRD classification and zero-backend constraint.

### Starter Options Considered

| # | Starter | Bundle Est. | DX | Verdict |
|---|---|---|---|---|
| A | `create-vite react-ts` | ~80-120KB gz | HMR, TSX, Babel | ✅ Viable |
| **B** | **`create-vite react-swc-ts`** | **~80-120KB gz** | **HMR, TSX, SWC (faster)** | **✅ Selected** |
| C | `create-vite vanilla-ts` | ~5-15KB gz | Ultra-light | ❌ Manual DOM mgmt |

### Selected Starter: `create-vite` with `react-swc-ts`

**Rationale:**
- SWC (Rust-based) ~20x faster HMR than Babel → better DX for solo dev
- React component model fits 8 custom components (SituationPicker, ToneSlider, BSGauge, etc.)
- TypeScript for type-safe template data structures and scorer logic
- Bundle ~80-120KB gz → well under 200KB limit
- Vanilla TS rejected: 8 custom components + state = building mini-framework, high tech debt risk

**Initialization Command:**

```bash
npm create vite@latest . -- --template react-swc-ts
```

**Architectural Decisions Provided by Starter:**

| Category | Decision |
|---|---|
| **Language & Runtime** | TypeScript ~5.8, strict mode, `.tsx` files |
| **Compiler** | SWC (Rust-based, faster than Babel) |
| **Build Tooling** | Vite 7, esbuild bundling, tree-shaking |
| **Styling** | Vanilla CSS + CSS Custom Properties (per UX spec) |
| **Dev Server** | Vite dev server + instant HMR |
| **Code Organization** | `src/` folder, `App.tsx` entry point |
| **Testing** | Not included — add Vitest separately |
| **Linting** | ESLint config included |

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical (Block Implementation):**
- State management → `useState` only
- Component structure → Feature-based
- Template data format → TypeScript constants
- Animation approach → CSS-only

**Important (Shape Architecture):**
- Testing framework → Vitest + React Testing Library
- Deployment → Vercel auto-deploy from GitHub
- Analytics → Vercel Analytics

**Deferred (Post-MVP):**
- Gemini API integration (v0.2)
- PWA / Service Worker (v0.2)
- User profiles + localStorage history (v0.3)
- Social Feed real-time (v1.0)

### N/A Categories (Zero-Backend Architecture)

- ~~Data Architecture~~ — no DB, no backend
- ~~Authentication & Security~~ — no auth, no user accounts
- ~~API & Communication~~ — no API, 100% client-side

### Frontend Architecture

| Decision | Choice | Rationale |
|---|---|---|
| **State management** | `useState` only | 2 tabs, ~5 state vars. No state library needed |
| **Routing** | No router (conditional render) | 2 tabs = simple toggle. No URL routing v0.1 |
| **Component structure** | Feature-based: `features/tao/`, `features/soi/`, `shared/` | Clear separation, scales to v0.2+ |
| **Template data** | TypeScript constants in `data/` | Type-safe, tree-shakeable, IDE autocomplete |
| **Animation** | CSS-only (transitions + keyframes) | NFR <200KB. Framer Motion ~30KB unnecessary |
| **Testing** | Vitest + React Testing Library | Fast, Vite-native, component + logic testing |
| **Clipboard** | Clipboard API + `document.execCommand` fallback | Browser compat |
| **Reduced motion** | CSS `prefers-reduced-motion` + fade alternatives | A11y per UX spec |

### Infrastructure & Deployment

| Decision | Choice | Rationale |
|---|---|---|
| **Hosting** | Vercel Free Tier | $0, auto-SSL, global CDN |
| **Deploy** | GitHub auto-deploy (push = deploy) | Zero config CI/CD |
| **Analytics** | Vercel Analytics (free tier) | Privacy-friendly, zero setup |
| **PWA/Offline** | None v0.1 (defer to v0.2) | MVP focus |
| **OG Image** | Static image asset | 1 image, no dynamic generation needed |
| **Environment** | Vite env vars (`VITE_*`) | Standard Vite convention |

### Decision Impact Analysis

**Implementation Sequence:**
1. Project init (`create-vite react-swc-ts`)
2. Design system CSS (Custom Properties, dark theme)
3. Shared components (TabBar, GlassCard, Toast)
4. Feature: TẠO (SituationPicker, ToneSlider, TemplateEngine, CopyButton)
5. Feature: SOI (Textarea, BSScorer, BSGauge, VerdictBadge, ShareText)
6. Analytics integration
7. Deploy to Vercel

**Cross-Component Dependencies:**
- Template data format → consumed by both TemplateEngine and SituationPicker
- CSS Custom Properties → consumed by all components
- Analytics tracker → called from CopyButton, ShareText, TabBar

## Implementation Patterns & Consistency Rules

### N/A (Zero-Backend)

~~DB Naming~~ · ~~API Naming~~ · ~~API Response Format~~ · ~~Event System~~ · ~~Auth Patterns~~

### Naming Patterns

| Category | Convention | Example |
|---|---|---|
| **Components** | PascalCase `.tsx` | `ToneSlider.tsx`, `BSGauge.tsx` |
| **Files (non-component)** | camelCase `.ts` | `templateEngine.ts`, `bsScorer.ts` |
| **CSS** | kebab-case `.css` | `tone-slider.css`, `glass-card.css` |
| **CSS Custom Props** | `--{category}-{name}` | `--color-accent`, `--space-md`, `--radius-pill` |
| **Functions** | camelCase | `generateExcuse()`, `calculateBSScore()` |
| **Constants** | UPPER_SNAKE | `SITUATIONS`, `TONE_LEVELS`, `BS_KEYWORDS` |
| **Types/Interfaces** | PascalCase, no `I` prefix | `Situation`, `ToneLevel`, `BSResult` |
| **Hooks** | `use` prefix | `useToneSlider()`, `useClipboard()` |
| **Test files** | `*.test.tsx` co-located | `ToneSlider.test.tsx` next to `ToneSlider.tsx` |

### Structure Patterns

```
src/
├── features/
│   ├── tao/           # TẠO tab feature
│   │   ├── components/   # SituationPicker, ToneSlider, ExcuseResult
│   │   ├── hooks/        # useToneSlider, useExcuseGenerator
│   │   └── index.ts      # barrel export
│   └── soi/           # SOI tab feature
│       ├── components/   # BSGauge, VerdictBadge, BSBreakdown
│       ├── hooks/        # useBSScorer
│       └── index.ts
├── shared/
│   ├── components/    # TabBar, GlassCard, CopyButton, Toast
│   ├── styles/        # globals.css, design-tokens.css
│   └── utils/         # clipboard.ts, analytics.ts
├── data/
│   ├── situations.ts  # Template data constants
│   ├── recipients.ts
│   ├── bsKeywords.ts
│   └── verdicts.ts
├── App.tsx
└── main.tsx
```

**Rules:**
- Feature folder = self-contained. Import `shared/` only, never cross-import features
- `index.ts` barrel exports per feature
- Tests co-located: `Component.test.tsx` next to `Component.tsx`
- No circular imports

### Component Pattern

```tsx
// ✅ Good — named export, typed props, CSS import
import './ToneSlider.css';

interface ToneSliderProps {
  value: ToneLevel;
  onChange: (level: ToneLevel) => void;
}

export function ToneSlider({ value, onChange }: ToneSliderProps) {
  return <div className="tone-slider">...</div>;
}
```

**Anti-patterns:**
- ❌ `export default` — always use named exports
- ❌ Inline styles — always use CSS files
- ❌ `any` type — always type props explicitly

### State Pattern

```tsx
// App-level: simple useState
const [activeTab, setActiveTab] = useState<'tao' | 'soi'>('tao');
const [toneLevel, setToneLevel] = useState<ToneLevel>(3);
```

- No state library. No context. No reducers.
- Props drill max 2 levels (App → Feature → Component)

### Error Handling

- No error modals — prevent errors via defaults and validation
- `try/catch` only for Clipboard API fallback
- All inputs have defaults → no empty state errors

### Analytics Pattern

```ts
// shared/utils/analytics.ts
export function trackEvent(name: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.va) {
    window.va('event', { name, ...data });
  }
}
// Usage: trackEvent('excuse_copied', { situation: 'nghi-hoc', tone: 3 })
```

### Enforcement Guidelines

**All AI Agents MUST:**
- Use named exports only (no `export default`)
- Co-locate tests with source files
- Follow feature-based folder structure
- Type all props — no `any`
- Import from `shared/` only, never cross-feature
- Use CSS Custom Properties from `design-tokens.css`

### Known Gotchas

#### GlassCard Stacking Context (`backdrop-filter` + Portals)

**Problem:** `backdrop-filter: blur()` on `GlassCard` creates a new CSS stacking context. This means any portal-based overlay (dropdown, modal, popover) rendered inside a GlassCard cannot visually escape the GlassCard's stacking context, causing z-index conflicts.

**Symptom:** Dropdowns from `SituationPicker` / `RecipientPicker` inside a `GlassCard` are clipped or appear behind sibling GlassCards.

**Solution:** Propagate `isDropdownOpen` state from picker components to the parent, which applies a CSS class to sibling GlassCards to temporarily disable or adjust their `backdrop-filter`:

```tsx
// Parent propagates state
<GlassCard className={isDropdownOpen ? 'glass-card--dropdown-peer' : ''}>
  ...
</GlassCard>
```

```css
.glass-card--dropdown-peer {
  backdrop-filter: none; /* or reduced blur */
}
```

**Prevention:** When combining glassmorphism (`backdrop-filter`) with portals or overlays, always test overlay stacking behavior early. Consider rendering overlays outside the GlassCard's DOM tree using React portals to `document.body`.

## Project Structure & Boundaries

### Complete Project Directory

```
uoa/
├── README.md
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── eslint.config.js
├── index.html                    # SPA entry
├── .env.example                  # VITE_* vars
├── .gitignore
├── public/
│   ├── favicon.svg
│   ├── og-image.png              # Social share preview
│   └── manifest.json             # PWA manifest (v0.2)
└── src/
    ├── main.tsx                   # React root
    ├── App.tsx                    # Tab router + state
    ├── App.css
    ├── vite-env.d.ts
    ├── data/                      # Content constants (FR17-20)
    │   ├── types.ts               # Situation, Recipient, ToneLevel, BSResult
    │   ├── situations.ts          # 50+ excuse templates (FR17)
    │   ├── recipients.ts          # 3+ recipient types (FR18)
    │   ├── toneLabels.ts          # 5 tone level emoji+labels
    │   ├── bsKeywords.ts          # BS scoring dictionary
    │   └── verdicts.ts            # Verdict badges + thresholds
    ├── features/
    │   ├── tao/                   # TẠO feature (FR1-FR7)
    │   │   ├── index.ts
    │   │   ├── components/
    │   │   │   ├── TaoTab.tsx            # Feature container
    │   │   │   ├── TaoTab.css
    │   │   │   ├── SituationPicker.tsx   # FR1
    │   │   │   ├── SituationPicker.css
    │   │   │   ├── RecipientPicker.tsx   # FR2
    │   │   │   ├── RecipientPicker.css
    │   │   │   ├── ToneSlider.tsx        # FR3, FR7
    │   │   │   ├── ToneSlider.css
    │   │   │   ├── ExcuseResult.tsx      # FR4
    │   │   │   └── ExcuseResult.css
    │   │   └── hooks/
    │   │       └── useExcuseGenerator.ts # FR4, FR6
    │   └── soi/                   # SOI feature (FR8-FR13)
    │       ├── index.ts
    │       ├── components/
    │       │   ├── SoiTab.tsx            # Feature container
    │       │   ├── SoiTab.css
    │       │   ├── TextInput.tsx         # FR8
    │       │   ├── TextInput.css
    │       │   ├── BSGauge.tsx           # FR9
    │       │   ├── BSGauge.css
    │       │   ├── BSBreakdown.tsx       # FR10
    │       │   ├── BSBreakdown.css
    │       │   ├── VerdictBadge.tsx      # FR11
    │       │   └── VerdictBadge.css
    │       └── hooks/
    │           └── useBSScorer.ts        # FR9-11
    ├── shared/
    │   ├── components/
    │   │   ├── TabBar.tsx            # FR14-15
    │   │   ├── TabBar.css
    │   │   ├── GlassCard.tsx         # FR21
    │   │   ├── GlassCard.css
    │   │   ├── CopyButton.tsx        # FR5
    │   │   ├── CopyButton.css
    │   │   ├── ShareButton.tsx       # FR12
    │   │   ├── ShareButton.css
    │   │   ├── Toast.tsx
    │   │   └── Toast.css
    │   ├── styles/
    │   │   ├── design-tokens.css     # CSS Custom Properties
    │   │   ├── globals.css           # Reset + base
    │   │   └── animations.css        # Shared keyframes (FR22)
    │   └── utils/
    │       ├── clipboard.ts          # Clipboard API wrapper
    │       └── analytics.ts          # Vercel Analytics (FR25-27)
    └── __tests__/
        └── setup.ts               # Vitest global setup
```

### FR → Structure Mapping

| FR Group | Directory | Key Files |
|---|---|---|
| FR1-7 (TẠO) | `features/tao/` | SituationPicker, ToneSlider, ExcuseResult, useExcuseGenerator |
| FR8-13 (SOI) | `features/soi/` | TextInput, BSGauge, VerdictBadge, useBSScorer |
| FR14-16 (Nav) | `shared/components/` | TabBar, App.tsx |
| FR17-20 (Content) | `data/` | situations.ts, recipients.ts, toneLabels.ts |
| FR21-24 (Visual) | `shared/styles/` | design-tokens.css, animations.css |
| FR25-27 (Analytics) | `shared/utils/` | analytics.ts |

### Component Boundaries

```
App.tsx (state owner)
├── TabBar ← activeTab, onTabChange
├── TaoTab ← all tao state
│   ├── SituationPicker ← situation, onSelect
│   ├── RecipientPicker ← recipient, onSelect
│   ├── ToneSlider ← toneLevel, onChange
│   ├── ExcuseResult ← generatedExcuse
│   └── CopyButton ← text to copy
└── SoiTab ← all soi state
    ├── TextInput ← text, onChange
    ├── BSGauge ← score (0-100)
    ├── BSBreakdown ← factors array
    ├── VerdictBadge ← verdict string
    └── ShareButton ← formatted text
```

### Data Flow

```
User Input → useState (App.tsx)
     ↓
State props → Feature Tab
     ↓
Hook (useExcuseGenerator / useBSScorer)
     ↓
data/ constants → Generate result
     ↓
Result → Display component
     ↓
CopyButton/ShareButton → Clipboard API → trackEvent()
```

## Architecture Validation Results

### Coherence Validation ✅

| Check | Result |
|---|---|
| Decision compatibility | ✅ Vite 7 + React 19 + SWC + TS 5.8 — all compatible |
| Pattern consistency | ✅ PascalCase components, camelCase functions, kebab-case CSS |
| Structure alignment | ✅ Feature-based supports all decisions |
| Contradictions | ✅ None found |

### Requirements Coverage ✅

| FR Group | Coverage | Files |
|---|---|---|
| FR1-7 (TẠO) | ✅ 7/7 | `features/tao/` |
| FR8-13 (SOI) | ✅ 6/6 | `features/soi/` |
| FR14-16 (Nav) | ✅ 3/3 | `shared/components/` |
| FR17-20 (Content) | ✅ 4/4 | `data/` |
| FR21-24 (Visual) | ✅ 4/4 | `shared/styles/` |
| FR25-27 (Analytics) | ✅ 3/3 | `shared/utils/analytics.ts` |
| **Total** | **✅ 27/27** | |

| NFR Group | Coverage | How |
|---|---|---|
| NFR1-6 (Performance) | ✅ | Client-side, CSS animations, Vite tree-shaking |
| NFR7-11 (Accessibility) | ✅ | Keyboard, ARIA, contrast, touch targets, reduced-motion |
| NFR12-13 (Offline) | ⚠️ Deferred v0.2 | Documented in decisions |
| NFR14-16 (Compat) | ✅ | Chrome/Safari P0, 375-2560px |
| **Total** | **14/16 (2 deferred)** | |

### Gap Analysis

- ✅ **No critical gaps**
- ⚠️ Nice-to-have: FR19 shuffle logic, FR13 min text — implementation details, not architecture gaps

### Completeness Checklist

- [x] Project context analyzed
- [x] Starter template selected with verified versions
- [x] Critical decisions documented
- [x] Implementation patterns comprehensive
- [x] Complete project directory defined
- [x] FR → structure mapping complete
- [x] Component boundaries defined
- [x] Data flow documented

### Readiness Assessment

**Status:** 🟢 READY FOR IMPLEMENTATION

**Confidence:** High — low-complexity frontend-only SPA

**First implementation step:**
```bash
npm create vite@latest . -- --template react-swc-ts
```
