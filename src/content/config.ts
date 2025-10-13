import { z, defineCollection } from 'astro:content';

const quizSchema = z.array(
  z.object({
    type: z.enum(['mc', 'tf']).default('mc'),
    q: z.string(),
    choices: z.array(z.string()).optional(),
    answer: z.number(),
    explain: z.string()
  })
);

const rpDiffSchema = z.array(
  z.object({
    id: z.string(),
    baseline: z.string(),
    rule: z.string()
  })
);

const classroom = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      module: z.string(),
      moduleLabel: z.string().optional(),
      level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
      est_minutes: z.number(),
      objectives: z.array(z.string()),
      prereqs: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      summary: z.string().optional(),
      quiz: quizSchema.optional(),
      rp_diffs: rpDiffSchema.default([])
    })
    .passthrough()
});

export const collections = { classroom };
