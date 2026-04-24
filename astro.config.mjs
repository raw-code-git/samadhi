import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://samadhi-mock.example',
  trailingSlash: 'never',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({ filter: (page) => !page.includes('/book') && !page.includes('/404') }),
  ],
  image: {
    domains: ['images.unsplash.com'],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
