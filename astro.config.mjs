import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// Only include sitemap if we have actual content;
// process.env will only have PUBLIC_SANITY_PROJECT_ID if Cloudflare has set it
const hasSanityConfig = process.env.PUBLIC_SANITY_PROJECT_ID;

export default defineConfig({
  site: 'https://thejonathanstewart.com',
  integrations: [
    tailwind(),
    // TODO: sitemap disabled for now - causes build failure with Cloudflare SSR
    // Re-enable once you have stable content and routes
    // ...(hasSanityConfig ? [sitemap()] : [])
  ],
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },
    routes: {
      strategy: 'auto'
    }
  }),
  build: {
    format: 'directory'
  }
});
