import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    publishedAt: z.string(),
    mainImage: z.string().optional().transform((val) =>
      val && !val.startsWith('http') ? `https://images.thejonathanstewart.com/${val}` : val
    ),
    mainImageAlt: z.string().optional(),
    mainImageLight: z.boolean().optional(),
    categories: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const categories = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.enum(['cloud', 'ai', 'leadership']).optional(),
    color: z.enum(['blue', 'purple', 'green', 'orange']).optional(),
  }),
});

export const collections = { blog, categories };
