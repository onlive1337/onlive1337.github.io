# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server at http://localhost:3000
- `npm run build` — static production build, emitted to `out/` (this is what gets deployed)
- `npm run lint` — ESLint (Next.js core-web-vitals + typescript configs)
- `npm run start` — serve a production build (rarely used; the site is statically exported)

There is no test suite. Type checking happens via `next build` (tsconfig has `noEmit`).

## Architecture

This is a **statically-exported** Next.js 16 / React 19 portfolio site (`output: 'export'` in `next.config.js`), deployed to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`. The custom domain is in `CNAME` (`onswix.uz`).

### Critical: there is no server runtime

Because the site is a static export, **all "real-time" data (music, Steam, GitHub, analytics) is fetched client-side at runtime from a separate external API**, not from Next.js. That API base URL lives in `src/utils/api.ts` (`API_BASE_URL`, overridable with `NEXT_PUBLIC_API_URL`) and points to a separately-hosted service (`portfolio-api-*.vercel.app`). The Spotify/Steam secrets referenced in the README and in the GitHub Actions `build` env are consumed by **that** external API project, not by this repo — do not assume Next.js API routes or server components fetch them here.

- `src/utils/api.ts` — `fetchFromAPIWithMeta` / `fetchFromAPI`: fetch wrapper with timeout, retries-with-backoff, and content-type validation. All external calls go through this.
- `src/hooks/use-music.ts`, `src/hooks/use-steam.ts` — SWR hooks polling the external API (`refreshInterval`); they wrap the fetch wrapper and normalize the response shape.

### Rendering structure

The page is composed almost entirely of `next/dynamic` imports to control hydration and code-split:
- `src/app/page.tsx` renders `Navigation` + `Hero` (`ssr: true`) and `ClientContent`.
- `src/components/ClientContent.tsx` is `"use client"` and lazy-loads all the data-driven sections (`Technologies`, `Portfolio`, `Socials`, `NowPlaying`, `Gaming`, `Experience`, `Analytics`) with `ssr: false`, wrapped in `Suspense` and the fade-in animation helpers from `src/utils/Animations.tsx`.
- Sections live in `src/components/sections/`; layout chrome in `src/components/layout/`.
- `/resume` (`src/app/resume/page.tsx` → `src/components/Resume.tsx`) is a separate page that uses `html2pdf.js` for PDF export.

### Theming (Material You 3)

Theming is **runtime CSS-variable injection**, not static Tailwind colors:
- `ThemeProvider.tsx` wraps `next-themes` (class-based dark mode, system theme disabled) and on theme change calls `applyM3Theme` from `src/utils/m3-theme.ts`.
- `applyM3Theme` generates a full M3 scheme from a single seed color (`DEFAULT_SEED_COLOR` in `ThemeProvider.tsx`) using `@material/material-color-utilities` and writes `--md-sys-color-*` CSS custom properties onto `document.documentElement`.
- `src/app/globals.css` uses **Tailwind v4** (`@import "tailwindcss"` + `@theme` block — there is no `tailwind.config.js`). The `@theme` block maps `--color-md-*` Tailwind tokens to the `--md-sys-color-*` variables, so use classes like `bg-md-surface`, `text-md-on-surface`, etc. To change the palette, change the seed color, not individual colors.

### Conventions

- Import alias `@/*` → `src/*`.
- `cn()` in `src/utils/cn.ts` (clsx + tailwind-merge) for conditional classNames.
- Shared types in `src/types/index.ts`; web-component typings in `src/types/custom-elements.d.ts`.
- Animations use `framer-motion`; smooth scrolling uses `lenis`.

> Note: `README.md` is outdated in places (says Next.js 13 / React 18 / server components / Discord/Spotify env vars in this repo). Trust the code and this file over the README for stack and data-flow details.
