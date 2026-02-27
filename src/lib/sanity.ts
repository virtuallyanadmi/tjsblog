import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

// optional server-side client (using a private token) for previewing drafts
// - create a read token in Sanity project settings -> API
// - set it as SANITY_API_TOKEN in your environment (server-only)
export const serverClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

// whether we have the minimum configuration to use Sanity
const isSanityConfigured = Boolean(import.meta.env.PUBLIC_SANITY_PROJECT_ID);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ Queries
export const queries = {
  // Get all posts
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    featured,
    "categories": categories[]->{
      _id,
      title,
      slug,
      color,
      icon
    },
    "author": author->{
      name,
      image
    }
  }`,

  // Get featured posts
  featuredPosts: `*[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "categories": categories[]->{
      _id,
      title,
      slug,
      color,
      icon
    },
    "author": author->{
      name,
      image
    }
  }`,

  // Get recent posts
  recentPosts: `*[_type == "post"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "categories": categories[]->{
      _id,
      title,
      slug,
      color,
      icon
    },
    "author": author->{
      name,
      image
    }
  }`,

  // Get single post by slug
  postBySlug: (slug: string) => `*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    body,
    featured,
    "categories": categories[]->{
      _id,
      title,
      slug,
      color,
      icon
    },
    "author": author->{
      name,
      image,
      title,
      bio,
      linkedin,
      twitter
    }
  }`,

  // Get posts by category
  postsByCategory: (categorySlug: string) => `*[_type == "post" && "${categorySlug}" in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "categories": categories[]->{
      _id,
      title,
      slug,
      color,
      icon
    },
    "author": author->{
      name,
      image
    }
  }`,

  // Get all categories
  allCategories: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    icon
  }`,

  // Get author
  author: `*[_type == "author"][0] {
    _id,
    name,
    image,
    title,
    bio,
    email,
    linkedin,
    twitter
  }`,

  // Get site settings
  siteSettings: `*[_type == "siteSettings"][0] {
    title,
    description,
    missionStatement,
    logo,
    ogImage,
    footerText,
    socialLinks
  }`,
};

// Helper to safely fetch from Sanity
async function safeFetch<T>(query: string, defaultValue: T): Promise<T> {
  if (!isSanityConfigured || !client) {
    return defaultValue;
  }
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return defaultValue;
  }
}

// Fetch functions with graceful fallbacks
export async function getAllPosts() {
  return safeFetch(queries.allPosts, []);
}

export async function getFeaturedPosts() {
  return safeFetch(queries.featuredPosts, []);
}

export async function getRecentPosts() {
  return safeFetch(queries.recentPosts, []);
}

export async function getPostBySlug(slug: string) {
  return safeFetch(queries.postBySlug(slug), null);
}

export async function getPostsByCategory(categorySlug: string) {
  return safeFetch(queries.postsByCategory(categorySlug), []);
}

export async function getAllCategories() {
  return safeFetch(queries.allCategories, []);
}

export async function getAuthor() {
  return safeFetch(queries.author, null);
}

export async function getSiteSettings() {
  return safeFetch(queries.siteSettings, null);
}
