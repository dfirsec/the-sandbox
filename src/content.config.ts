import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const playbooks = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/playbooks" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    severity: z.enum(['Low', 'Medium', 'High', 'Critical']),
    lastUpdated: z.coerce.date(),
    author: z.string().default('SecOps Team'),
    tags: z.array(z.string()).optional(),
    relatedPlaybooks: z.array(z.string()).optional(),
  }),
});

const registry = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/registry" }),
  schema: z.object({
    toolName: z.string(),
    category: z.string(),
    status: z.enum(['Active', 'Under Review', 'Deprecated']),
    url: z.string().url().optional(),
    internalOwner: z.string(),
    contractExpiry: z.string().optional(),
    notes: z.string().optional(),
  }),
});

const controls = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/controls" }),
  schema: z.object({
    controlId: z.string(),
    title: z.string(),
    cisGroup: z.string().optional(),
    implementationStatus: z.enum(['Implemented', 'Partial', 'Not Started', 'N/A']),
    evidenceLink: z.string().optional(),
    notes: z.string(),
  }),
});

const escalation = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/escalation" }),
  schema: z.object({
    name: z.string(),
    type: z.enum(['Internal', 'Vendor', 'External']),
    role: z.string(),
    phone: z.string().optional(),
    email: z.string().optional(),
    priority: z.enum(['P1', 'P2', 'P3', 'Any']),
    notes: z.string().optional(),
  }),
});

export const collections = { playbooks, registry, controls, escalation };
