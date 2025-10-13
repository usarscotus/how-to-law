import { defineCollection, z } from 'astro:content';

const lessonSchema = z
  .object({
    title: z.string(),
    slug: z.string().optional(),
    module: z.string(),
    moduleLabel: z.string().optional(),
    moduleTitle: z.string().optional(),
    level: z.string(),
    order: z.number().int().positive().optional(),
    est_minutes: z.number().int().positive().optional(),
    estimatedTime: z.string().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    objectives: z.array(z.string()).min(1),
    prereqs: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    quiz: z
      .array(
        z.object({
          id: z.string(),
          prompt: z.string(),
          options: z.array(z.string()).min(2),
          answer: z.string(),
          explanation: z.string().optional()
        })
      )
      .optional(),
    further_reading: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url()
        })
      )
      .optional()
  })
  .superRefine((data, ctx) => {
    if (!data.description && !data.summary) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['description'],
        message: 'Provide either description or summary.'
      });
    }

    if (!data.estimatedTime && !data.est_minutes) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['estimatedTime'],
        message: 'Provide either estimatedTime or est_minutes.'
      });
    }

    if (!data.moduleTitle && !data.moduleLabel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['moduleTitle'],
        message: 'Provide either moduleTitle or moduleLabel.'
      });
    }
  });

const classroom = defineCollection({
  type: 'content',
  schema: lessonSchema
});

export const collections = {
  classroom
};
