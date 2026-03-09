# Ú Òa 🫣

Vietnamese excuse generator & BS detector — a fun, mobile-first web app.

## Features

- **TẠO (Create)** — Generate Vietnamese excuses by situation, recipient, and tone level
- **SOI (Detect)** — Analyze text for BS indicators with a visual gauge and verdict

## Tech Stack

- **React 19** + **TypeScript 5.9** — Type-safe component architecture
- **Vite 7** (SWC) — Fast dev server & optimized builds
- **Vanilla CSS** — Custom Properties design system, glassmorphism, dark theme
- **Vitest** + React Testing Library — 194+ unit tests
- **Vercel** — Production hosting with analytics

## Quick Start

```bash
npm install
npm run dev       # Start dev server at localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | TypeScript check + production build |
| `npm test` | Run all unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |
| `npm run format` | Auto-format with Prettier |
| `npm run format:check` | Check formatting |

## Project Structure

```
src/
├── features/
│   ├── tao/          # TẠO — Excuse Generator
│   └── soi/          # SOI — BS Detector
├── shared/
│   ├── components/   # TabBar, GlassCard, Toast
│   ├── hooks/        # useTimeout
│   ├── styles/       # Design tokens, globals, animations
│   └── utils/        # Clipboard, analytics
├── data/             # Templates, keywords, verdicts
├── App.tsx           # Root component with tab navigation
└── main.tsx          # React entry point
```

## Stats

- **Bundle:** 63KB gzip (budget: 200KB)
- **Tests:** 194+ passing
- **Accessibility:** WCAG AA compliant (contrast ≥4.5:1)
- **Lighthouse:** FCP <1.5s

## License

Private project.
