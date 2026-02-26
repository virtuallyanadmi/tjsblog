import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Check if Sanity is configured (at build time)
const isSanityConfigured = !!process.env.PUBLIC_SANITY_PROJECT_ID;

export default defineConfig({
  site: 'https://thejonathanstewart.com',
  integrations: [
    tailwind(),
    // Only include sitemap if we have content (Sanity configured)
    // This prevents errors when building without any blog posts
    ...(isSanityConfigured ? [sitemap()] : [])
  ],
  output: 'static',
  build: {
    format: 'directory'
  }
});
