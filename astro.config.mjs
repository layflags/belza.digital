import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Tailwind v4 is wired in via PostCSS (postcss.config.mjs) rather than the Vite
// plugin, which is currently incompatible with Astro 6's rolldown-based Vite.
export default defineConfig({
  site: 'https://belza.digital',

  // Two static pages per language; EN has no prefix (/), DE lives under /de.
  // Defaults are set explicitly because Astro v6 changed i18n routing defaults.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      // Imprint pages are noindex — keep them out of the sitemap.
      filter: (page) => !page.includes('/impressum'),
      serialize: (item) => {
        // Normalize to the canonical, slash-free URLs (matches hreflang/canonical).
        const u = new URL(item.url);
        const path = u.pathname.replace(/\/+$/, '') || '/';
        item.url = path === '/' ? `${u.origin}/` : `${u.origin}${path}`;
        item.priority = path === '/' ? 1.0 : path === '/de' ? 0.9 : 0.5;
        item.changefreq = 'monthly';
        return item;
      },
    }),
  ],

  vite: {
    resolve: {
      alias: { '@': '/src' },
    },
  },
});
