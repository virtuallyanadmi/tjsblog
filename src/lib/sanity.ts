import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

const IMAGE_CDN_URL = import.meta.env.PUBLIC_IMAGE_CDN_URL || '';

export function urlFor(source: SanityImageSource) {
  const img = builder.image(source);

  if (!IMAGE_CDN_URL) return img;

  // Return a proxy that preserves the builder's chainable API
  // but rewrites the final `.url()` result to use the custom CDN origin.
  const originalUrl = img.url.bind(img);

  // `any` because the builder has a fluent API with many methods.
  return new Proxy(img as any, {
    get(target, prop, receiver) {
      if (prop === 'url') {
        return (...args: any[]) => {
          const url = originalUrl(...args);
          return url.replace(/^https?:\/\/cdn\.sanity\.io/, IMAGE_CDN_URL);
        };
      }
      const val = Reflect.get(target, prop, receiver);
      return typeof val === 'function' ? val.bind(target) : val;
    }
  }) as any;
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

// Fetch functions
export async function getAllPosts() {
  return await client.fetch(queries.allPosts);
}

export async function getFeaturedPosts() {
  return await client.fetch(queries.featuredPosts);
}

export async function getRecentPosts() {
  return await client.fetch(queries.recentPosts);
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(queries.postBySlug(slug));
}

export async function getPostsByCategory(categorySlug: string) {
  return await client.fetch(queries.postsByCategory(categorySlug));
}

export async function getAllCategories() {
  return await client.fetch(queries.allCategories);
}

export async function getAuthor() {
  return await client.fetch(queries.author);
}

export async function getSiteSettings() {
  return await client.fetch(queries.siteSettings);
}
