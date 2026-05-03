# the-sandbox

A developer playground built with **Astro v6**, **React Islands**, **Tailwind CSS v4**, and **Content Collections**.

🌐 **Live site:** https://dfirsec.github.io/the-sandbox

## Features

- **Landing page** — Hero section with links to the blog and portfolio
- **Blog** — MDX-powered posts via Astro Content Collections with type-safe frontmatter
- **Portfolio** — Project showcase using JSON data collections
- **React Island** — A dark/light mode theme toggle demonstrating partial hydration (`client:load`)
- **Tailwind CSS v4** — Utility-first styling with `@tailwindcss/vite`
- **GitHub Pages deployment** — Automated via GitHub Actions on every push to `main`

## Tech Stack

| Tool | Purpose |
|---|---|
| [Astro v6](https://astro.build) | Static site generation & Islands Architecture |
| [React](https://react.dev) | Interactive island components |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [MDX](https://mdxjs.com) | Markdown + JSX for blog posts |
| [GitHub Pages](https://pages.github.com) | Hosting |

## Requirements

- **Node.js >= 22.12.0** (required by Astro v6)
- npm >= 9.6.5

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── ThemeToggle.tsx      # React Island: dark/light mode toggle
├── content/
│   ├── blog/                # Markdown & MDX blog posts
│   ├── portfolio/           # JSON project data
│   └── config.ts            # Content Collections schema
├── layouts/
│   └── BaseLayout.astro     # Shared HTML shell with nav & footer
├── pages/
│   ├── index.astro          # Landing page
│   ├── blog/
│   │   ├── index.astro      # Blog listing
│   │   └── [slug].astro     # Individual post
│   └── portfolio/
│       └── index.astro      # Portfolio grid
└── styles/
    └── global.css           # Tailwind CSS entry point
```

## Deployment

The site is automatically deployed to GitHub Pages on every push to `main` via the workflow at `.github/workflows/deploy.yml`.

To enable GitHub Pages for this repository:
1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
