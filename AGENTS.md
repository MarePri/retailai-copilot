# Repository Guide

## Running the App

```bash
# Install dependencies
npm install

# Development server at http://localhost:3000
npm run dev

# Production build and preview
npm run build
npm run preview

# GitHub Pages build and deployment
npm run build:github-pages
npx gh-pages -d dist
```

No linting or test commands are currently configured.

## Architecture

The application is a React 18 and Vite single-page app. Most application code
lives in `src/App.jsx`, including screens, shared UI primitives, demo data,
theme tokens, animations, and local interaction responses.

Screen routing uses the `screen` state in `App` and `renderScreen()`:

| Screen | Component | Purpose |
|---|---|---|
| `home` | `CommandCenter` | KPIs, daily briefing, and navigation |
| `styleai` | `StyleAI` | Product alternatives, outfits, and upsell |
| `merchai` | `MerchAI` | Collection health and product replacement |
| `retailai` | `RetailAI` | Commercial Q&A, family view, and forecast |
| `catchmeup` | `CatchMeUp` | Returning-manager briefing |
| `visit` | `VisitReadiness` | Visit score and action plan |

The app has no backend or external AI integration. Interactive responses are
deterministic demo data and must continue to work as a static GitHub Pages site.

## Key Conventions

- Use existing React and inline-style patterns; there is no external UI library.
- Use active theme values from `useTheme()` instead of hardcoded UI colors.
- Keep shared primitives near the top of `src/App.jsx`.
- Static images live in `public/`.
- Reference public assets with `import.meta.env.BASE_URL`, not root-relative
  paths, so deployments work below a GitHub repository path.
- Preserve the Vite-only workflow; there is no standalone HTML build.
- Do not commit generated `dist/` output.

## Verification

For code changes, run:

```bash
npm run build
npm run build:github-pages
```

The Pages build must emit relative asset references and `dist/.nojekyll`.
