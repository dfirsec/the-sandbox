import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // This tells Astro exactly where to look and what files to include
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // Use coerce to handle string-to-date conversion
    tags: z.array(z.string()).optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/portfolio" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Add other fields based on your JSON files here
  }),
});

export const collections = { blog, portfolio };