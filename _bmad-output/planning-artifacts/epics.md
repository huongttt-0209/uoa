---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: ['planning-artifacts/prd.md', 'planning-artifacts/architecture.md', 'planning-artifacts/ux-design-specification.md']
status: 'complete'
completedAt: '2026-03-08'
---

# UOA - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for UOA, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: User can select an excuse situation from predefined categories
- FR2: User can select the target recipient for the excuse
- FR3: User can adjust the excuse tone level across a spectrum from sincere to elaborate (5 levels)
- FR4: System generates contextually appropriate excuses based on situation, recipient, and tone
- FR5: User can copy generated excuse text to clipboard with a single action
- FR6: User can regenerate a different excuse with the same parameters
- FR7: System provides visual feedback of current tone level with emotional indicators (emoji morph)
- FR8: User can paste or type text to analyze for BS detection
- FR9: System calculates and displays a BS probability score (0-100%)
- FR10: System provides a breakdown of factors contributing to the BS score
- FR11: System assigns a verdict badge based on the BS score threshold
- FR12: User can copy the BS analysis result as pre-formatted shareable text
- FR13: System enforces minimum text length for meaningful analysis
- FR14: User can switch between TẠO and SOI modes via tab navigation
- FR15: System maintains current mode state during a session
- FR16: System displays the product brand identity consistently
- FR17: System provides excuse templates covering at least 5 distinct situation categories
- FR18: System provides templates targeting at least 3 distinct recipient types
- FR19: System generates varied excuse outputs (no exact repeats in sequence)
- FR20: System uses culturally appropriate Vietnamese language and context
- FR21: System presents a dark-themed visual environment
- FR22: System provides animated transitions for interactive elements
- FR23: System displays the BS score result with an animated gauge visualization
- FR24: System adapts its layout for mobile and desktop viewport sizes
- FR25: System tracks excuse generation events (situation, recipient, tone)
- FR26: System tracks BS detection events (score, verdict)
- FR27: System tracks copy and share actions

### NonFunctional Requirements

- NFR1: Excuse generation completes within 500ms of parameter selection
- NFR2: BS Score calculation completes within 1 second of text submission
- NFR3: Tone Slider responds within 16ms (60fps animation)
- NFR4: First Contentful Paint under 1.5s on 4G mobile
- NFR5: Total bundle under 200KB gzipped
- NFR6: CSS animations at 60fps on mid-range devices
- NFR7: All interactive elements reachable via keyboard
- NFR8: WCAG AA color contrast (4.5:1) on dark theme
- NFR9: Touch targets minimum 48×48px mobile
- NFR10: `prefers-reduced-motion` respected
- NFR11: Screen reader compatible with `aria-labels` on custom controls
- NFR12: Core features function offline after initial load
- NFR13: No state loss on page refresh mid-session
- NFR14: Full functionality on Chrome/Safari mobile 90+/15+
- NFR15: Graceful degradation on older browsers
- NFR16: Viewport support 375px–2560px

### Additional Requirements

**From Architecture:**
- Starter template: `npm create vite@latest . -- --template react-swc-ts` (Vite 7 + React 19 + TypeScript + SWC)
- Feature-based folder structure: `features/tao/`, `features/soi/`, `shared/`
- Design tokens via CSS Custom Properties in `design-tokens.css`
- Testing: Vitest + React Testing Library
- Deploy: Vercel Free Tier, GitHub auto-deploy
- Analytics: Vercel Analytics
- State: `useState` only, no state library
- Routing: No router, conditional rendering

**From UX Design:**
- SituationPicker: custom pill button with label, emoji, chevron (not native select)
- Design direction: Glassmorphism + Neon hybrid (D2+D4+D5)
- `prefers-reduced-motion` support with fade alternatives
- Touch targets ≥48px
- `backdrop-filter` with `@supports` fallback
- Responsive: mobile-first, centered card on tablet/desktop

### FR Coverage Map

| FR | Epic | Description |
|---|---|---|
| FR1 | Epic 2 | Situation select |
| FR2 | Epic 2 | Recipient select |
| FR3 | Epic 2 | Tone slider |
| FR4 | Epic 2 | Excuse generation |
| FR5 | Epic 2 | Copy 1-tap |
| FR6 | Epic 2 | Regenerate |
| FR7 | Epic 2 | Tone feedback |
| FR8 | Epic 3 | Text input |
| FR9 | Epic 3 | BS score |
| FR10 | Epic 3 | Factor breakdown |
| FR11 | Epic 3 | Verdict badge |
| FR12 | Epic 3 | Share result |
| FR13 | Epic 3 | Min text length |
| FR14 | Epic 4 | Tab navigation |
| FR15 | Epic 4 | Tab state |
| FR16 | Epic 1 | Brand identity |
| FR17 | Epic 2 | 5+ situations |
| FR18 | Epic 2 | 3+ recipients |
| FR19 | Epic 2 | No repeats |
| FR20 | Epic 2 | Vietnamese context |
| FR21 | Epic 1 | Dark theme |
| FR22 | Epic 1 | Animations |
| FR23 | Epic 3 | BS gauge visual |
| FR24 | Epic 1 | Responsive |
| FR25 | Epic 4 | Track generation |
| FR26 | Epic 4 | Track detection |
| FR27 | Epic 4 | Track actions |

## Epic List

### Epic 1: App Visual Identity & Design System
Scaffold dự án và thiết lập design system để dev team có thể bắt đầu build features. App chạy được, dark theme hiển thị, shared components sẵn sàng.
**FRs covered:** FR16, FR21, FR22, FR24
**NFRs:** NFR4-6 (performance), NFR7-11 (a11y), NFR14-16 (compat)

### Epic 2: TẠO — Excuse Generation Experience
User có thể tạo excuse phù hợp bằng cách chọn tình huống, đối tượng, điều chỉnh tone, và copy kết quả. Hoàn chỉnh flow: chọn → tùy chỉnh → tạo → copy.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR17, FR18, FR19, FR20
**NFRs:** NFR1 (gen <500ms), NFR3 (60fps slider)

### Epic 3: SOI — BS Detection Experience
User có thể paste text, xem BS score với gauge animation, đọc breakdown factors, và share kết quả. Hoàn chỉnh flow: paste → phân tích → đọc kết quả → share.
**FRs covered:** FR8, FR9, FR10, FR11, FR12, FR13, FR23
**NFRs:** NFR2 (score <1s)

### Epic 4: Navigation, Analytics & Launch
User có thể switch tabs, app track usage, và triển khai production. App hoàn chỉnh, live trên internet, tracking hoạt động.
**FRs covered:** FR14, FR15, FR25, FR26, FR27
**NFRs:** NFR12-13 (offline, state persistence)

## Epic 1: App Visual Identity & Design System

Scaffold dự án và thiết lập design system để dev team có thể bắt đầu build features. App chạy được, dark theme hiển thị, shared components sẵn sàng.

### Story 1.1: Project Scaffolding

As a **developer**,
I want **a working Vite+React+TypeScript project with the correct folder structure**,
So that **I can start building features immediately**.

**Acceptance Criteria:**

**Given** a clean project directory
**When** the starter template is initialized with `npm create vite@latest . -- --template react-swc-ts`
**Then** the project builds successfully with `npm run dev`
**And** the feature-based folder structure exists (`features/tao/`, `features/soi/`, `shared/`, `data/`)
**And** Vitest + React Testing Library are installed and configured
**And** a sample test passes with `npm test`

### Story 1.2: Design Tokens & Dark Theme

As a **user**,
I want **a polished dark-themed interface**,
So that **the app looks premium and is comfortable to use** (FR21).

**Acceptance Criteria:**

**Given** the app is loaded in a browser
**When** the page renders
**Then** the dark theme is applied via CSS Custom Properties in `design-tokens.css`
**And** color tokens include `--color-bg`, `--color-surface`, `--color-accent`, `--color-text`
**And** spacing tokens (`--space-xs` to `--space-xl`) and radius tokens are defined
**And** WCAG AA contrast (4.5:1) is met for all text colors (NFR8)
**And** brand identity (logo area, app name "Ú Òa") is displayed (FR16)

### Story 1.3: Shared Components (GlassCard, Toast)

As a **developer**,
I want **reusable GlassCard and Toast components**,
So that **feature components have consistent visual containers and feedback** (FR22).

**Acceptance Criteria:**

**Given** a feature component needs a card container
**When** GlassCard is rendered
**Then** it displays with `backdrop-filter: blur()` glassmorphism effect
**And** it falls back gracefully when `@supports(backdrop-filter)` is false (NFR15)
**And** CSS animations use `prefers-reduced-motion` for fallback (NFR10)

**Given** a user action succeeded (copy/share)
**When** Toast is triggered
**Then** it appears with slide-in animation, auto-dismisses after 3s
**And** it is accessible with `role="status"` `aria-live="polite"` (NFR11)

### Story 1.4: Responsive Layout Shell

As a **user**,
I want **the app to look great on my phone and desktop**,
So that **I can use it anywhere** (FR24).

**Acceptance Criteria:**

**Given** viewport width 375px (mobile)
**When** the app renders
**Then** content fills the viewport with proper padding
**And** touch targets are ≥48px (NFR9)

**Given** viewport width ≥768px (tablet/desktop)
**When** the app renders
**Then** content is centered in a max-width card
**And** layout adapts without horizontal scroll
**And** viewport support covers 375px–2560px (NFR16)

## Epic 2: TẠO — Excuse Generation Experience

User có thể tạo excuse phù hợp bằng cách chọn tình huống, đối tượng, điều chỉnh tone, và copy kết quả. Hoàn chỉnh flow: chọn → tùy chỉnh → tạo → copy.

### Story 2.1: Template Data & Content Constants

As a **developer**,
I want **all excuse template data structured as TypeScript constants**,
So that **the excuse engine has content to generate from** (FR17, FR18, FR20).

**Acceptance Criteria:**

**Given** the `data/` directory
**When** data files are imported
**Then** `situations.ts` exports at least 5 situation categories with Vietnamese context (FR17, FR20)
**And** `recipients.ts` exports at least 3 recipient types (FR18)
**And** `toneLabels.ts` exports 5 tone levels with emoji + labels
**And** all data is typed with interfaces from `types.ts`

### Story 2.2: SituationPicker & RecipientPicker Components

As a **user**,
I want **to choose a situation and recipient for my excuse**,
So that **I get a relevant excuse for my specific case** (FR1, FR2).

**Acceptance Criteria:**

**Given** the TẠO tab is active
**When** the user taps the SituationPicker
**Then** a pill-style dropdown reveals all situation categories with emoji icons
**And** the selected situation is displayed with label + emoji + chevron
**And** keyboard navigation works (NFR7)

**Given** a situation is selected
**When** the user taps the RecipientPicker
**Then** recipient options are shown as selectable pills
**And** only one recipient can be selected at a time

### Story 2.3: ToneSlider with Emoji Feedback

As a **user**,
I want **to slide between 5 excuse tone levels and see emoji feedback**,
So that **I can fine-tune my excuse from sincere to elaborate** (FR3, FR7).

**Acceptance Criteria:**

**Given** the TẠO tab is active
**When** the user drags the ToneSlider
**Then** it smoothly transitions between 5 levels at 60fps (NFR3)
**And** emoji morph animation reflects the current tone level (FR7)
**And** tone label text updates in real-time
**And** the slider supports both touch and mouse input
**And** `prefers-reduced-motion` replaces animation with fade (NFR10)

### Story 2.4: Excuse Generation Engine

As a **user**,
I want **an excuse generated when I've selected situation + recipient + tone**,
So that **I can see a ready-to-use excuse** (FR4, FR19).

**Acceptance Criteria:**

**Given** situation, recipient, and tone are all selected
**When** the parameters change or user taps "Tạo"
**Then** an excuse is generated within 500ms (NFR1)
**And** the excuse uses the selected template with Vietnamese context (FR20)
**And** no exact repeat of the previous excuse is shown (FR19)
**And** the result displays in an ExcuseResult card with neon accent

### Story 2.5: Copy & Regenerate Actions

As a **user**,
I want **to copy the excuse with one tap or regenerate a new one**,
So that **I can quickly use the excuse or try another option** (FR5, FR6).

**Acceptance Criteria:**

**Given** an excuse is displayed
**When** the user taps the CopyButton
**Then** the text is copied to clipboard via Clipboard API
**And** `document.execCommand('copy')` is used as fallback
**And** a Toast shows "Đã copy! 📋" with auto-dismiss
**And** an analytics event is tracked (FR27)

**Given** an excuse is displayed
**When** the user taps the Regenerate button
**Then** a new excuse is generated with the same parameters
**And** the new excuse is different from the previous one (FR19)

## Epic 3: SOI — BS Detection Experience

User có thể paste text, xem BS score với gauge animation, đọc breakdown factors, và share kết quả. Hoàn chỉnh flow: paste → phân tích → đọc kết quả → share.

### Story 3.1: BS Scoring Data & Engine

As a **developer**,
I want **a BS scoring algorithm with keyword data and verdict thresholds**,
So that **the SOI tab can analyze text accurately** (FR9, FR10, FR11).

**Acceptance Criteria:**

**Given** `data/bsKeywords.ts` and `data/verdicts.ts`
**When** `useBSScorer` hook receives input text
**Then** it returns a score 0-100, factors breakdown array, and verdict string
**And** calculation completes within 1 second (NFR2)
**And** factors include: keyword density, sentence length, vagueness, emoji ratio
**And** verdict thresholds map to badges (e.g., 0-20: "Thật thà", 80-100: "Bịa như thật")

### Story 3.2: Text Input with Validation

As a **user**,
I want **to paste or type text to analyze for BS**,
So that **I can check if someone's excuse is believable** (FR8, FR13).

**Acceptance Criteria:**

**Given** the SOI tab is active
**When** the user types or pastes text
**Then** a textarea accepts input with placeholder prompt
**And** character count is displayed
**And** if text < minimum length, a hint message appears (FR13)
**And** analysis auto-triggers when sufficient text is entered
**And** the textarea is keyboard accessible (NFR7)

### Story 3.3: BS Gauge Visualization

As a **user**,
I want **to see my BS score as an animated speedometer gauge**,
So that **the result feels fun and immediate** (FR9, FR23).

**Acceptance Criteria:**

**Given** a BS score has been calculated
**When** the result is displayed
**Then** BSGauge renders a speedometer-style arc with needle animation
**And** the needle sweeps from 0 to the final score with CSS animation
**And** color gradient changes from green (low BS) to red (high BS)
**And** the percentage number is displayed centrally
**And** `prefers-reduced-motion` shows a static gauge with fade-in (NFR10)
**And** animation runs at 60fps (NFR6)

### Story 3.4: Verdict Badge & Factor Breakdown

As a **user**,
I want **to see a verdict badge and understand what made the score**,
So that **I know why the text is rated as BS or not** (FR10, FR11).

**Acceptance Criteria:**

**Given** a BS score is calculated
**When** the result section renders
**Then** VerdictBadge shows the verdict text with colored badge
**And** BSBreakdown lists each factor with its contribution to the score
**And** factors are sorted by impact (highest first)
**And** each factor shows a label, value, and visual bar

### Story 3.5: Share BS Result

As a **user**,
I want **to share the BS analysis result with friends**,
So that **I can prove someone's excuse is BS** (FR12).

**Acceptance Criteria:**

**Given** a BS result is displayed
**When** the user taps ShareButton
**Then** a pre-formatted text is generated: "🎯 BS Score: {score}% — {verdict}\n{breakdown summary}\n— Analyzed by Ú Òa"
**And** the text is copied to clipboard
**And** a Toast shows "Đã copy kết quả! 📋"
**And** an analytics event is tracked (FR27)

## Epic 4: Navigation, Analytics & Launch

User có thể switch tabs, app track usage, và triển khai production. App hoàn chỉnh, live trên internet, tracking hoạt động.

### Story 4.1: Tab Navigation (TabBar)

As a **user**,
I want **to switch between TẠO and SOI tabs**,
So that **I can easily access both features** (FR14, FR15).

**Acceptance Criteria:**

**Given** the app is loaded
**When** the user taps a tab in the TabBar
**Then** the active tab content renders (TaoTab or SoiTab)
**And** the inactive tab is hidden via conditional rendering
**And** the active tab has a neon underline indicator with animation
**And** tab state persists during the session (FR15)
**And** keyboard Tab + Enter navigation works (NFR7)
**And** `aria-selected` and `role="tablist"` are set (NFR11)

### Story 4.2: Analytics Integration

As a **product owner**,
I want **usage events tracked via Vercel Analytics**,
So that **I can understand how users interact with the app** (FR25, FR26, FR27).

**Acceptance Criteria:**

**Given** Vercel Analytics is integrated
**When** user generates an excuse
**Then** `trackEvent('excuse_generated', { situation, recipient, tone })` fires (FR25)

**Given** user analyzes text for BS
**When** BS score is calculated
**Then** `trackEvent('bs_detected', { score, verdict })` fires (FR26)

**Given** user copies or shares
**When** CopyButton or ShareButton is tapped
**Then** `trackEvent('excuse_copied')` or `trackEvent('bs_shared')` fires (FR27)
**And** analytics is silent-fail (no console errors if blocked)

### Story 4.3: Production Deploy

As a **user**,
I want **to access the app at a public URL**,
So that **I can use it from any device**.

**Acceptance Criteria:**

**Given** the code is pushed to GitHub main branch
**When** Vercel auto-deploy triggers
**Then** the app is live at the Vercel URL
**And** FCP is under 1.5s on 4G mobile (NFR4)
**And** total bundle is under 200KB gzipped (NFR5)
**And** OG meta tags and `og-image.png` are set for social sharing
**And** favicon is set



