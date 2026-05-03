---
title: "Welcome to the Sandbox"
description: "Kicking off a developer playground with Astro, React Islands, Tailwind CSS, and Content Collections."
pubDate: 2024-01-15
tags: ["astro", "intro"]
---

## Hello World 👋

Welcome to **the-sandbox** — a place to experiment with modern web technologies.

This site is built with:

- **Astro** for static-site generation and partial hydration
- **React Islands** for interactive components (try the theme toggle in the header!)
- **Tailwind CSS** for styling
- **Content Collections** for type-safe markdown/MDX content

## Why Astro?

Astro ships zero JavaScript by default and lets you sprinkle in interactivity only where you need it using the [Islands Architecture](https://docs.astro.build/en/concepts/islands/).

```js
// Only this component ships JS to the browser
<ThemeToggle client:load />
```

Stay tuned for more experiments!
