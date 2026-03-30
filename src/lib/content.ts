import { getCollection, getEntry } from 'astro:content';
import authorData from '../data/author.json';

export interface CategoryData {
  id: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface AuthorSummary {
  name: string;
  image?: string;
}

export interface AuthorData extends AuthorSummary {
  title?: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
}

export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  mainImage?: string;
  mainImageAlt?: string;
  categories: CategoryData[];
  author: AuthorSummary;
  featured: boolean;
}

async function getCategoryMap(): Promise<Record<string, CategoryData>> {
  const entries = await getCollection('categories');
  const map: Record<string, CategoryData> = {};
  for (const entry of entries) {
    map[entry.id] = {
      id: entry.id,
      slug: entry.id,
      title: entry.data.title,
      description: entry.data.description,
      icon: entry.data.icon,
      color: entry.data.color,
    };
  }
  return map;
}

function toPostSummary(
  entry: Awaited<ReturnType<typeof getCollection<'blog'>>>[number],
  categoryMap: Record<string, CategoryData>
): PostSummary {
  return {
    id: entry.id,
    title: entry.data.title,
    slug: entry.slug,
    excerpt: entry.data.excerpt,
    publishedAt: entry.data.publishedAt,
    mainImage: entry.data.mainImage,
    mainImageAlt: entry.data.mainImageAlt,
    categories: (entry.data.categories ?? []).map(
      (slug) => categoryMap[slug] ?? { id: slug, slug, title: slug }
    ),
    author: { name: authorData.name, image: authorData.image || undefined },
    featured: entry.data.featured ?? false,
  };
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const categoryMap = await getCategoryMap();
  const entries = await getCollection('blog');
  return entries
    .map((e) => toPostSummary(e, categoryMap))
    .sort((a, b) =>
      (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '')
    );
}

export async function getFeaturedPosts(): Promise<PostSummary[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.featured).slice(0, 3);
}

export async function getRecentPosts(): Promise<PostSummary[]> {
  const all = await getAllPosts();
  return all.slice(0, 6);
}

export async function getPostBySlug(slug: string) {
  const categoryMap = await getCategoryMap();
  const entry = await getEntry('blog', slug);
  if (!entry) return null;
  return {
    ...toPostSummary(entry, categoryMap),
    entry,
  };
}

export async function getPostsByCategory(categorySlug: string): Promise<PostSummary[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.categories.some((c) => c.slug === categorySlug));
}

export async function getAllCategories(): Promise<CategoryData[]> {
  const entries = await getCollection('categories');
  return entries
    .map((e) => ({
      id: e.id,
      slug: e.id,
      title: e.data.title,
      description: e.data.description,
      icon: e.data.icon,
      color: e.data.color,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getAuthor(): Promise<AuthorData> {
  return {
    name: authorData.name,
    title: authorData.title,
    bio: authorData.bio,
    image: authorData.image || undefined,
    email: authorData.email || undefined,
    linkedin: authorData.linkedin || undefined,
    twitter: authorData.twitter || undefined,
  };
}
