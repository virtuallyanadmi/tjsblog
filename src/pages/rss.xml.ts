import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const sorted = posts.sort(
    (a, b) =>
      new Date(b.data.publishedAt ?? 0).valueOf() -
      new Date(a.data.publishedAt ?? 0).valueOf()
  );

  return rss({
    title: 'Jonathan Stewart — Cloud, AI & Leadership',
    description:
      'A servant leader helping businesses bring about cloud efficiencies, AI enablement, and leadership development.',
    site: context.site!,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt ? new Date(post.data.publishedAt) : undefined,
      description: post.data.excerpt,
      link: `/blog/${post.slug}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
