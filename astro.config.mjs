import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://thejonathanstewart.com',
  integrations: [
    tailwind(),
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
