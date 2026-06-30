# RetailAI Copilot — Store Intelligence Dashboard

> **Case Study** · *A hackathon-to-portfolio transformation*
>
> *Built for the Inditex AI Hackathon, June 2026 · Refactored and polished July 2026*
>
> **[Live Demo →](https://your-username.github.io/retailai-copilot/)**

A single-page store intelligence dashboard for Pull & Bear retail teams — built as a two-day hackathon prototype, then refactored into a production-quality portfolio piece. All data is deterministic and simulated: no backend, no live AI service, no external API dependencies. The entire application runs as a static site on GitHub Pages.

> **Honesty note**: This application displays simulated demo data. There is no live store connection, no real AI inference, and no external API calls. Every response comes from pre-built local datasets. See the [Honesty Audit](./.opencode/docs/ai-honesty-audit.md) for the full inventory.

---

## Table of Contents

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Screens & Features](#screens--features)
- [Technical Architecture](#technical-architecture)
- [Key Technical Decisions](#key-technical-decisions)
- [What I Learned](#what-i-learned)
- [Future Improvements](#future-improvements)
- [Running Locally](#running-locally)
- [Deployment](#deployment)

---

## The Problem

Store teams at Inditex brands like Pull & Bear operate with fragmented information. Sales data lives in one system, inventory in another, and visit-readiness checklists are buried in email threads. During a hackathon with a **two-day window**, the challenge was to design a single interface that gives a store manager at-a-glance intelligence: *what happened, what needs attention, and what to do today.*

The hard constraint: the demo had to deploy as a **static site with zero backend infrastructure** — no server, no database, no API keys, no build pipeline beyond what GitHub Pages provides. Every interaction had to be self-contained and work from a single `git push`.

---

## The Solution

RetailAI Copilot is a decision-layer dashboard that consolidates store performance, product intelligence, and daily priorities into one browser-based interface. Rather than presenting raw spreadsheets, it approaches store management as a **conversation** — each screen answers a specific question a store manager might ask during a shift.

The application comprises six screens, 12 reusable UI components, a two-palette theme system, and fully deterministic demo data. The entire JS bundle is ~218 KB gzipped to ~64 KB.

```
src/
├── App.jsx                   — Root: routing, theme toggle, bottom nav
├── main.jsx                  — React entry point
├── styles/app.css            — Static CSS: animations, keyframes, utilities
├── screens/                  — 6 screen components
├── components/ui/            — 12 reusable UI primitives
├── data/                     — 4 deterministic data modules
├── hooks/                    — 2 custom hooks
└── theme/                    — darkC/lightC tokens, ThemeContext, useTheme
```

---

## Screens & Features

### Command Center (Home) — *"What is the state of my store right now?"*

The default landing view. A store health score, four live KPI tiles (sales, units, traffic, conversion vs LY), an AI Daily Briefing panel, priority actions ranked by impact, and an expected-gain projection.

**Technical highlight**: The KPI tiles use a custom `AnimatedNumber` component that animates value transitions with a requestAnimationFrame counter. This gives the dashboard a "live" feel without any real-time data connection.

### StyleAI — *"The customer wants something we don't have. What do I do?"*

Three shop-floor tools:
- **Save the Sale**: Type a product name → get the closest in-stock alternative with similarity score, stockroom zone, and match rationale
- **Outfit Builder**: Generates three complete looks using only in-stock products around a hero item
- **Smart Upsell**: Suggests complementary products based on selection

**Technical highlight**: All lookups are deterministic array `filter`/`find` operations against pre-built datasets in `src/data/styleai.js`. The "AI Reasoning" panel displays static template text — there is no language model, no API call, and no randomness.

### MerchAI — *"A hero product is delayed. Can we fix the collection?"*

Monitors a fictional "Urban Summer 2026" collection with a live health score. Flags a missing hero product and introduces a "Rebuild" workflow that replaces it with an in-stock substitute. The rebuild animates the health score from 62% to 91%, with before/after comparison on visual integrity, cross-sell rate, commercial strength, and estimated daily gain.

**Technical highlight**: The rebuild uses a `setTimeout` chain for a 2.2-second loading simulation. The health score change, replacement match confidence, and impact metrics are all pre-defined in `src/data/merchai.js`.

### RetailAI — *"Why are we behind on sales?"*

A chat-style Q&A interface where the user asks about store performance. Responses are generated from a deterministic lookup table keyed to known question patterns — no language model involved. Also includes a family performance breakdown and a closing forecast with a risk-annotated 3-day action timeline.

**Technical highlight**: The reply engine (`getDeterministicReply` in `src/data/retailai.js`) uses simple `String.includes()` keyword matching against a handful of known question patterns. This means zero network requests and instant response times.

### Catch Me Up — *"I've been away for a week. What did I miss?"*

A returning-manager briefing tool. The user selects a duration (3, 7, 14, or 30 days) and the app assembles a structured briefing covering what happened, what matters, and what to do next — all from the local dataset.

### Visit Readiness — *"The regional director is coming. Are we ready?"*

A readiness assessment displaying an overall score (74/100) with breakdowns across Commercial Readiness, Collection Integrity, and Operations. Each area lists specific issues, and a 7-day action plan provides a timeline of recommended tasks.

---

## Technical Architecture

### Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | React 18 (hooks, no classes) | Industry standard, component model |
| Build | Vite 5 | Fast dev server, zero-config CSS/asset handling |
| Language | JavaScript (JSX) | Faster iteration than TypeScript for a 2-day build |
| Styling | Inline styles + theme tokens | Zero config, zero dependencies |
| Routing | `useState`-driven switch | 6 screens don't need React Router |
| Animations | CSS `@keyframes` + JS counters | GPU-composited, no animation library |
| Data | Deterministic JS modules | Always works, no network, no flaky demos |
| Linting | ESLint 8 + Prettier | Enforced consistency during refactor |
| Deploy | GitHub Pages | Static SPA, no infra |

### State Management

There is no state management library. Application state lives in:
1. **`useState` hooks** within each screen component for local UI state (loading phases, active tabs, search queries)
2. **`ThemeContext`** provided by `App.jsx` for the current color palette
3. **Static imports** from `src/data/` for all content — no state synchronization needed

### Theme System

The theme module (`src/theme/index.js`) exports two token objects — `darkC` and `lightC` — each containing ~30 semantic color tokens (backgrounds, text levels, accent colors, borders, surface variants). A React context wraps the app via `App.jsx`, and all components consume the active theme through the `useTheme()` hook. This means zero hardcoded color values in any component. Dark mode is a single boolean toggle.

### CSS Architecture

Static CSS (animations, keyframes, utility classes, background elements) lives in `src/styles/app.css`, imported directly in `App.jsx`. Dynamic theme-dependent styles remain inline — they reference JavaScript variables and cannot be extracted to static files. This hybrid approach was the right balance for the project's scale.

---

## Key Technical Decisions

### Why JavaScript, not TypeScript?
The hackathon had a two-day window. JavaScript removed the need for type definitions, tsconfig setup, and build pipeline changes. For a portfolio piece, TypeScript would be the obvious addition in a production context — the component boundaries are clean enough that adding types would be mechanical, not architectural.

### Why inline styles, not CSS modules or Tailwind?
Inline styles meant zero configuration, zero build plugins, and zero context switching between JSX and CSS files. The theme token system provided enough consistency for a demo of this scale. The trade-off became visible when animations needed `@keyframes` — that is where the extracted `app.css` file paid for itself.

### Why deterministic data, not a real API?
The project had to deploy as a static site. No server, no database, no API keys. Every interaction had to work from a `git push` to a live URL with zero infrastructure. Deterministic data also eliminated flaky demo scenarios: the data always loads, the responses are always consistent, and there is nothing to debug during a live walkthrough.

### Why no React Router?
With six screens and no deep-linking requirements, a state-driven switch statement was simpler, lighter, and avoided an extra dependency:

```jsx
const renderScreen = () => {
  switch (screen) {
    case "home": return <CommandCenter onNav={setScreen} />;
    case "styleai": return <StyleAI />;
    // ...4 more cases
  }
};
```

The trade-off is that browser back/forward navigation is not supported — an acceptable cost for a kiosk-style demo.

### Why the "AI Honesty" refactor?
The original hackathon prototype used "AI" as a branding shortcut. During the portfolio refactor, every UI-visible AI reference was audited (35 total across 14 files) and either replaced with neutral language or paired with a "SIMULATED" badge. This was not just an ethical decision — it made the demo technically honest: the code does exactly what it says, no more, no less.

---

## What I Learned

### Designing for a specific user makes decisions faster
Once I committed to a single persona — a Pull & Bear store manager preparing for a regional visit — every screen had a clear purpose. Features that didn't serve that persona were easy to cut. Half the screens that made it into the original hackathon were removed during the refactor.

### Inline styles scale poorly but ship fast
The theme token system was the right compromise for a 48-hour build. It prevented color drift without the overhead of a CSS architecture. The trade-off became visible when animations and responsive breakpoints needed coordination — that is where extracting a `styles/app.css` file paid for itself. For a larger project, I would adopt CSS modules or a utility-first framework from day one.

### Simulated data is a feature, not a shortcut
For a demo that must always work, deterministic data removed every possible failure mode. No loading spinners that never resolve, no "API key not configured" errors, no network flakiness during a presentation. The discipline of clearly labeling content as "SIMULATED" became a design pattern in itself — it built trust with the audience.

### Dark mode from day one is cheap if you plan for it
A theme token system with two color objects and a React context took about an hour to set up. Adding it after the fact would have meant auditing every hardcoded color across every component — a much larger cost. The `useTheme()` hook pattern meant I never had to think about theme after the initial setup.

### Refactoring is where the real learning happens
The hackathon produced working code. The refactor produced *understandable* code. Extracting the monolithic `App.jsx` into separate components, adding linting, adding a CSS file, and — most importantly — making the "AI" claims honest: these changes taught me more about production-quality software than the original build did.

---

## Future Improvements

- **TypeScript**: Add type definitions for the data modules and component props. The clean component boundaries make this a mechanical rather than architectural change.
- **Unit tests**: The deterministic data layer is trivially testable. Vitest + React Testing Library would add confidence for future changes.
- **Image optimization**: The six product images in `public/` total ~4.9 MB. Converting to AVIF/WebP and generating srcset variants would significantly improve load time.
- **Code splitting**: Lazy-load each screen with `React.lazy()` and `Suspense` to reduce the initial bundle from ~218 KB to per-screen chunks.
- **Accessibility audit**: Add ARIA labels, keyboard navigation, and focus management. The current implementation assumes mouse interaction.

---

## Running Locally

The app runs through Vite. There is no standalone HTML build.

**Prerequisites:** Node.js 18+ and npm.

```bash
npm install        # Install dependencies (already done if cloned)
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
```

### Code Verification

```bash
npx eslint src/              # Lint check
npm run build                # Production build
npm run build:github-pages   # GitHub Pages build (relative paths + .nojekyll)
```

---

## Deployment

The project is designed for GitHub Pages as a static SPA:

```bash
npm run build:github-pages    # Build with relative asset paths
npx gh-pages -d dist          # Publish to gh-pages branch
```

The Pages build outputs repository-relative asset paths and a `.nojekyll` file. On GitHub, configure **Settings > Pages** to deploy from the `gh-pages` branch at the root folder.

---

*Built for the Inditex AI Hackathon, June 2026. Refactored and portfoliated July 2026.*
