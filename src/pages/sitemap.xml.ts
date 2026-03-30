import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

const SITE = 'https://thejonathanstewart.com';

const STATIC_PAGES: { url: string; priority: string; changefreq: string; lastmod?: Date }[] = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/blog/', priority: '0.9', changefreq: 'daily' },
  { url: '/about/', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact/', priority: '0.7', changefreq: 'monthly' },
];

export async function GET(_ctx: APIContext): Promise<Response> {
  const posts = await getCollection('blog');
  const postEntries = posts.map((post) => ({
    url: `/blog/${post.slug}/`,
    lastmod: post.data.publishedAt ?? undefined,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const allEntries = [...STATIC_PAGES, ...postEntries];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    (entry) => `  <url>
    <loc>${SITE}${entry.url}</loc>${
      entry.lastmod
        ? `
    <lastmod>${entry.lastmod}</lastmod>`
        : ''
    }
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
