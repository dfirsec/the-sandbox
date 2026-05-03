import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. Incident Response Playbooks (Markdown)
const playbooks = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/playbooks" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    severity: z.enum(['Low', 'Medium', 'High', 'Critical']),
    lastUpdated: z.coerce.date(),
    author: z.string().default('SecOps Team'),
  }),
});

// 2. Architecture & Tooling Registry (JSON)
const registry = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/registry" }),
  schema: z.object({
    toolName: z.string(),
    category: z.string(), // e.g., "EDR", "SIEM", "Firewall"
    status: z.enum(['Active', 'Under Review', 'Deprecated']),
    url: z.string().url().optional(),
    internalOwner: z.string(),
  }),
});

// 3. CIS Controls & Compliance (JSON)
const controls = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/controls" }),
  schema: z.object({
    controlId: z.string(), // e.g., "CIS 4.1"
    title: z.string(),
    implementationStatus: z.enum(['Implemented', 'Partial', 'Not Started', 'N/A']),
    evidenceLink: z.string().optional(),
    notes: z.string(),
  }),
});

export const collections = { playbooks, registry, controls };