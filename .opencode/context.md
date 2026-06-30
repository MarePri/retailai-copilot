# Project Context — Complete

## Environment
- Language: JavaScript (React 18 + Vite 5)
- Runtime: Node.js 18+
- Build: `npm run build` (vite build) — ✅ PASS
- Pages Build: `npm run build:github-pages` — ✅ PASS (relative assets, .nojekyll)
- Lint: ESLint 8 with React + Prettier config — ✅ PASS
- Package Manager: npm

## All 4 Phases — COMPLETE ✅

### Phase 1: Code Structure & Hygiene
- ✅ `.eslintrc.cjs` — React + hooks + prettier config
- ✅ `.prettierrc` — singleQuotes, trailingCommas, printWidth 100
- ✅ `LICENSE` — MIT
- ✅ `npx eslint src/ --fix` — zero remaining errors

### Phase 2: Honesty Pass on "AI" Claims
- ✅ `AILabel.jsx` — auto-shows "simulated" badge on every AI-labeled section (opt-out via `demo={false}`)
- ✅ `retailai.js` — strengthened disclaimer: "No LLM, no external AI service"
- ✅ `RetailAI.jsx` — simulated demo notice below chat area
- ✅ `index.html` title changed to "...Store Intelligence Dashboard (Demo)"
- ✅ README already said "deterministic local data"

### Phase 3: Visual & Performance Polish
- ✅ Inline styles extracted to `src/styles/app.css` (335 lines of keyframes, utilities, responsive)
- ✅ `loading="lazy"` on all product/collection images
- ✅ `will-change: transform` on background blobs
- ✅ `prefers-reduced-motion` support added
- ✅ Responsive breakpoints (480px, 380px, 768px) with grid/font adjustments
- ✅ Enhanced nav button hover states, theme toggle hover effects

### Phase 4: README as Case Study
- ✅ Complete rewrite: Problem → Solution → Screens → Architecture → Key Decisions → Lessons
- ✅ Transparent about JS vs TS, inline styles, deterministic data, no router
- ✅ Professional tone suitable for portfolio

## Package.json
- `npm run dev` — dev server at :3000
- `npm run build` — production build
- `npm run build:github-pages` — Pages build with relative paths + .nojekyll
- `npm run preview` — preview production build
