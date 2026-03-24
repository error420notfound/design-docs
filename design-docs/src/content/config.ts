import { defineCollection, z } from 'astro:content';

const archive = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    thesis: z.string(),                              // one-line thesis / pull quote
    type: z.enum(['reading', 'signal', 'application', 'calibration']),
    tags: z.array(z.string()).default([]),
    source: z.string().optional(),                   // URL or citation for readings
    date: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

const journal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    type: z.enum(['project-log', 'reflection', 'decision', 'weekly']),
    project: z.string().optional(),                  // which project this relates to
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const zine = defineCollection({
  type: 'content',
  schema: z.object({
    issue: z.number(),                               // issue number
    title: z.string(),
    theme: z.string(),                               // one-word theme
    thesis: z.string(),                              // what this issue is about
    season: z.string(),                              // e.g. "Winter 2025"
    coverAccent: z.string().default('#2F9E8F'),      // accent color for cover
    date: z.coerce.date(),
    status: z.enum(['published', 'upcoming']).default('published'),
  }),
});

export const collections = { archive, journal, zine };
