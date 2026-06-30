# RetailAI Copilot — Store Intelligence Dashboard

> Built for the Inditex AI Hackathon, June 2026. Refactored and polished July 2026.

**This is a demo.** There's no live store connection, no real AI inference, and no database. Every interaction works from pre-built local datasets so the demo always runs — no API keys, no server, no flaky network calls. The code does exactly what it says.

---

## At a Glance

| | |
|---|---|
| **Stack** | React 18, Vite 5, JavaScript (JSX) |
| **Routing** | `useState`-driven screen switching (6 screens) |
| **Styling** | Inline styles + theme token system (dark/light) |
| **State** | `useState` hooks + React Context |
| **Data** | Deterministic JS modules — all local, no backend |
| **Build** | ~218 KB JS bundle (~64 KB gzipped) |
| **Deploy** | GitHub Pages static site |
| **Linting** | ESLint + Prettier |

---

## The Problem

Store teams at Inditex brands like Pull & Bear deal with fragmented information. Sales data is in one system, inventory in another, and visit-readiness checklists live in email threads. A store manager walking in for a shift has to piece together the story from multiple tools.

The hackathon constraint was tight: two days to build something demoable, deployable as a static site with zero backend infrastructure, and presentable to leadership. No server, no database, no API keys — just a `git push` to GitHub Pages.

## What This Project Does

RetailAI Copilot pulls store performance, product intelligence, and daily priorities into a single browser dashboard. Instead of raw spreadsheets, each screen answers a question a store manager might ask during a shift: *What happened? What needs attention? What do I do today?*

---

## My Role

I designed and built the entire application — frontend, data layer, theming, and deployment. Here's what that looked like:

- **Concept & architecture** — Structured the app around six focused screens, each solving a specific problem for a store manager persona
- **React components** — Built all 12 reusable UI components (KPI tiles, info panels, score badges, chat bubbles, loading skeletons, animated counters)
- **Screen implementations** — Developed each screen as a self-contained component with local state, loading simulations, and responsive layouts
- **Theme system** — Designed a two-palette (dark/light) token system with 30+ semantic color variables, wired through React Context so no component hardcodes colors
- **Data layer** — Wrote deterministic data modules that simulate product catalogs, sales KPIs, Q&A responses, and collection metrics — all local, no backend
- **Routing** — Implemented state-driven screen switching with animated transitions and a bottom navigation bar
- **Deployment** — Configured Vite for GitHub Pages with relative asset paths and `.nojekyll` support
- **AI honesty refactor** — Audited every "AI" label across the UI, replaced ambiguous language, and added "SIMULATED" badges so the demo is transparent about what it does and doesn't do

---

## Screens

### Command Center (Home) — *"What's the state of my store right now?"*

<!-- TODO: Add screenshot → docs/command-center.png -->

The landing view. Shows a store health score, four KPI tiles (sales, units, traffic, conversion vs last year), an AI Daily Briefing panel with priority actions, and an expected-gain projection. The KPI tiles use a custom `AnimatedNumber` component that runs a `requestAnimationFrame` counter to make the numbers feel live — even though the data is static.

### StyleAI — *"The customer wants something we don't have. What do I do?"*

<!-- TODO: Add screenshot → docs/styleai.png -->

Three shop-floor tools in one screen: **Save the Sale** finds the closest in-stock alternative when a product is missing, **Outfit Builder** generates complete looks from available inventory, and **Smart Upsell** suggests complementary products. All lookups run against a local product dataset — no API calls, just deterministic `filter`/`find` operations.

### MerchAI — *"A hero product is delayed. Can we fix the collection?"*

<!-- TODO: Add screenshot → docs/merchai.png -->

Monitors a fictional "Urban Summer 2026" collection with a health score. When a key product is flagged as missing, a "Rebuild" workflow replaces it with an in-stock substitute and animates the health score from 62% to 91% with before/after metrics. The rebuild uses a `setTimeout` chain for a 2-second loading simulation — all metrics are pre-defined in the local data module.

### RetailAI — *"Why are we behind on sales?"*

<!-- TODO: Add screenshot → docs/retailai.png -->

A chat-style Q&A where you type questions about store performance. Responses match against known patterns using `String.includes()` keyword matching — no language model involved. Also includes a family performance breakdown and a closing forecast with a 3-day action timeline.

### Catch Me Up — *"I've been away for a week. What did I miss?"*

<!-- TODO: Add screenshot → docs/catch-me-up.png -->

A returning-manager briefing tool. Pick a duration (3, 7, 14, or 30 days) and the app assembles a structured briefing covering what happened, what matters, and next steps — all from the local dataset.

### Visit Readiness — *"The regional director is coming. Are we ready?"*

<!-- TODO: Add screenshot → docs/visit-readiness.png -->

A readiness assessment scoring 74/100 across Commercial Readiness, Collection Integrity, and Operations. Each area lists specific issues, and a 7-day action plan provides a timeline of recommended tasks.

---

## Technical Architecture

### Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 18 (hooks, no classes) | Industry standard, component model |
| Build | Vite 5 | Fast dev server, zero-config asset handling |
| Language | JavaScript (JSX) | Faster iteration for a 2-day build |
| Styling | Inline styles + theme tokens | Zero config, zero extra dependencies |
| Routing | `useState`-driven switch | 6 screens don't need React Router |
| Animations | CSS `@keyframes` + JS counters | GPU-composited, no animation library |
| Data | Deterministic JS modules | Always works, no network, no flaky demos |
| Linting | ESLint 8 + Prettier | Kept things consistent during the refactor |
| Deploy | GitHub Pages | Static SPA, zero infrastructure |

### Project Structure

```
src/
├── App.jsx                   — Root: routing, theme toggle, bottom nav
├── main.jsx                  — React entry point
├── styles/app.css            — Static CSS: animations, keyframes, utilities
├── screens/                  — 6 screen components (one per view)
├── components/ui/            — 12 reusable UI primitives
├── data/                     — 4 deterministic data modules
├── hooks/                    — 2 custom hooks
└── theme/                    — dark/light tokens, ThemeContext, useTheme
```

### State Management

No state management library. Application state lives in three places:
1. **`useState` hooks** inside each screen for local UI state (loading phases, active tabs, search queries)
2. **`ThemeContext`** provided by `App.jsx` for the active color palette
3. **Static imports** from `src/data/` for all content — no state synchronization needed

### Theme System

The theme module exports two token objects — `darkC` and `lightC` — each with about 30 semantic color tokens (backgrounds, text levels, accent colors, borders, surface variants). A React context wraps the whole app, and components consume the active theme through `useTheme()`. No hardcoded color values anywhere. Dark mode is a single boolean toggle.

### CSS Architecture

Static CSS (animations, keyframes, utility classes, background elements) lives in `src/styles/app.css`, imported directly in `App.jsx`. Dynamic theme-dependent styles stay inline because they reference JavaScript variables. This hybrid approach worked well for this project's scale.

---

## Design Decisions

### Why JavaScript instead of TypeScript?
Two-day hackathon. Removing type definitions, tsconfig setup, and build pipeline changes saved real time. The component boundaries are clean enough that adding types later would be mechanical, not architectural.

### Why inline styles instead of CSS modules or Tailwind?
Zero configuration, zero build plugins, zero context switching between JSX and CSS files. The theme token system provided enough consistency at this scale. The trade-off showed up when animations needed `@keyframes` — that's where the extracted `app.css` file earned its place.

### Why deterministic data instead of a real API?
The project had to deploy as a static site. No server, no database, no API keys. Deterministic data also removed every demo failure mode: the data always loads, responses are always consistent, and nothing breaks mid-presentation.

### Why no React Router?
Six screens and no deep-linking needs. A state-driven switch is simpler, lighter, and avoids an extra dependency. The trade-off is no browser back/forward navigation — acceptable for a kiosk-style demo.

### Why the "AI Honesty" refactor?
The original hackathon prototype used "AI" loosely. During the refactor, I audited every visible AI reference (35 total across 14 files) and replaced ambiguous language or added SIMULATED badges. It makes the demo technically honest — the code does exactly what it says.

---

## What I Learned

### Designing for a specific user makes decisions faster
Once I committed to a single persona — a Pull & Bear store manager preparing for a regional visit — every screen had a clear purpose. Features that didn't serve that persona were easy to cut. Half the screens from the original hackathon got removed during the refactor.

### Inline styles scale poorly but ship fast
The theme token system was the right call for a 48-hour build. It prevented color drift without the overhead of a full CSS architecture. For a larger project, I'd use CSS modules or a utility-first framework from day one.

### Simulated data is a feature, not a shortcut
Deterministic data removed every possible failure mode: no loading spinners that never resolve, no "API key not configured" errors, no network flakiness during a demo. Labeling everything as SIMULATED became a design pattern on its own — it built trust with the audience.

### Dark mode from day one is cheap if you plan for it
A theme token system with two color objects and a React context took about an hour to set up. Adding it after the fact would have meant auditing every hardcoded color across every component. The `useTheme()` hook pattern meant I never had to think about theme after the initial setup.

### Refactoring is where the real learning happens
The hackathon produced working code. The refactor produced *understandable* code. Extracting the monolithic `App.jsx` into separate components, adding linting, adding a CSS file, and — most importantly — making the "AI" claims honest: these changes taught me more about production software than the original build did.

---

## Demo

<!--
  TODO: Add a short screen recording GIF showing the main flows:
  - Navigating between screens via the bottom nav
  - Dark/light mode toggle
  - MerchAI rebuild animation
  - RetailAI Q&A interaction
-->

| | |
|---|---|
| **Live Demo** | [retailai-copilot](https://marepri.github.io/retailai-copilot/) |
| **Screenshots** | *Coming soon — see TODO comments in each screen section* |

---

## Future Improvements

These are the things I'd add if I kept working on this:

- **Firebase backend** — Replace the static data modules with real-time Firestore collections so the dashboard reflects actual store data
- **Authentication** — Role-based access for store managers, regional directors, and HQ staff
- **Real inventory API** — Connect to an actual retail ERP or warehouse API instead of the demo catalog
- **AI model integration** — Swap the deterministic Q&A lookup with a lightweight LLM (via API) for actual natural language understanding
- **Historical analytics** — Add date-range picking and trend charts so managers can compare performance over time
- **Push notifications** — Alert store managers when KPIs drop below thresholds or when a visit readiness issue arises
- **Mobile optimization** — The responsive layout works on phones, but a dedicated native or PWA experience would be better for store-floor use
- **TypeScript** — Add type definitions for data modules and component props
- **Unit tests** — The deterministic data layer is trivially testable with Vitest + React Testing Library
- **Image optimization** — The six product images total ~4.9 MB. Converting to AVIF/WebP with srcset variants would help load times

---

## Running Locally

The app runs through Vite. No standalone HTML build.

**Prerequisites:** Node.js 18+ and npm.

```bash
npm install        # Install dependencies
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

Designed for GitHub Pages as a static SPA:

```bash
npm run build:github-pages    # Build with relative asset paths
npx gh-pages -d dist          # Publish to gh-pages branch
```

The Pages build outputs repository-relative asset paths and a `.nojekyll` file. On GitHub, configure **Settings > Pages** to deploy from the `gh-pages` branch at the root folder.

---

*Built for the Inditex AI Hackathon, June 2026. Refactored and portfoliated July 2026.*
