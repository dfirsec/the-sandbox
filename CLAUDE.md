# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — local Astro dev server
- `npm run build` — static build to `dist/` (also what CI runs)
- `npm run preview` — serve the built `dist/` locally
- Node `>=22.12.0` is required (see `package.json` engines).

There is no test runner or linter configured.

## Architecture

Astro v5 SSG site deployed to GitHub Pages at `https://dfirsec.github.io/the-sandbox` (note the `base: '/the-sandbox'` in `astro.config.mjs` — all internal links must respect this base path).

Content is the architecture. Three Astro Content Collections defined in `src/content.config.ts` drive every page:

1. **`playbooks`** — Markdown/MDX in `src/content/playbooks/`. Schema enforces `title`, `description`, `severity` (Low/Medium/High/Critical enum), `lastUpdated`, `author`. Rendered by dynamic route `src/pages/playbooks/[id].astro`.
2. **`registry`** — JSON in `src/content/registry/`. Schema: `toolName`, `category`, `status` (Active/Under Review/Deprecated), optional `url`, `internalOwner`. Rendered as a table at `/registry`.
3. **`controls`** — JSON in `src/content/controls/`. Schema: `controlId` (e.g., "CIS 4.1"), `title`, `implementationStatus` (Implemented/Partial/Not Started/N/A), optional `evidenceLink`, `notes`. Rendered as a table at `/controls`, sorted with `localeCompare(..., { numeric: true })` so `CIS 5.1` sorts before `CIS 10.1`.

Adding content = add a file in the right collection directory. The Zod schemas in `content.config.ts` are the source of truth; build will fail if a new file violates them.

Styling is Tailwind v4 via the Vite plugin (`@tailwindcss/vite`) — no `tailwind.config.js`. Global styles and the `@tailwindcss/typography` plugin are wired in `src/styles/global.css`. The site uses a dark slate palette throughout; preserve the existing visual language when adding pages.

React (`@astrojs/react`) is enabled but used sparingly — only `src/components/ThemeToggle.tsx` is a client component. Default to `.astro` components.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on push to `main`. Because of the `base` path, never hardcode root-relative URLs — use Astro's `<a href={...}>` with the base, or `import.meta.env.BASE_URL`.
