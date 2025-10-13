import { defineCollection, z } from 'astro:content';

const classroom = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    module: z.string(),
    moduleTitle: z.string(),
    order: z.number().int().nonnegative(),
    estimatedTime: z.string(),
    objectives: z.array(z.string()).min(1),
    tags: z.array(z.string()).default([]),
    references: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url()
        })
      )
      .default([])
  })
});

export const collections = {
  classroom
};
