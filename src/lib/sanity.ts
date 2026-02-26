import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Check if Sanity is configured
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const isSanityConfigured = !!projectId;

// Log warning during build if Sanity is not configured
if (!isSanityConfigured) {
  console.warn(`
╔════════════════════════════════════════════════════════════════════════════╗
║                        SANITY CMS NOT CONFIGURED                          ║
╠════════════════════════════════════════════════════════════════════════════╣
║ The site will build successfully, but blog content will not be available. ║
║                                                                            ║
║ To configure Sanity CMS, set these environment variables:                  ║
║   - PUBLIC_SANITY_PROJECT_ID (required)                                    ║
║   - PUBLIC_SANITY_DATASET (defaults to "production")                       ║
║                                                                            ║
║ In Cloudflare Pages:                                                       ║
║   1. Go to your Pages project settings                                     ║
║   2. Navigate to Settings > Environment variables                          ║
║   3. Add the variables for Production (and Preview if needed)              ║
║   4. Redeploy the site                                                     ║
╚════════════════════════════════════════════════════════════════════════════╝
`);
}

// Create client only if configured
let client: SanityClient | null = null;
let builder: ReturnType<typeof imageUrlBuilder> | null = null;

if (isSanityConfigured) {
  client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  });
  builder = imageUrlBuilder(client);
}

// Export a safe client reference (use with isSanityConfigured check)
export { client };

// Placeholder builder that mimics the image URL builder API
const placeholderBuilder = {
  width: function() { return this; },
  height: function() { return this; },
  url: () => '/placeholder-blog.svg',
};

export function urlFor(source: SanityImageSource): { width: (w: number) => any; height: (h: number) => any; url: () => string } {
  if (!builder || !source) {
    return placeholderBuilder as any;
  }
  return builder.image(source) as any;
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
