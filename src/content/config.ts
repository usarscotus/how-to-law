import { defineCollection, z } from 'astro:content';

const lessonSchema = z.object({
  title: z.string(),
  slug: z.string(),
  module: z.string(),
  moduleLabel: z.string(),
  level: z.string(),
  est_minutes: z.number().int().positive(),
  summary: z.string(),
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
});

const classroom = defineCollection({
  type: 'content',
  schema: lessonSchema
});

export const collections = {
  classroom
};
