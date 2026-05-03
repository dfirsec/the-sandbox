---
title: "Astro Content Collections Deep Dive"
description: "How Astro Content Collections give you type-safe, schema-validated content for blogs, portfolios, and more."
pubDate: 2024-02-10
tags: ["astro", "content-collections", "typescript"]
---

## What are Content Collections?

Content Collections are Astro's answer to managing structured content. They live in `src/content/` and are validated with Zod schemas defined in `src/content/config.ts`.

```ts
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});
```

## Benefits

- **Type safety** — TypeScript knows the shape of every post's frontmatter.
- **Schema validation** — Bad data fails at build time, not runtime.
- **`getCollection()`** — A single async function to query all entries.

## Data Collections

Beyond markdown you can also store `type: 'data'` collections as JSON or YAML — perfect for portfolio entries, team members, or any structured data.
