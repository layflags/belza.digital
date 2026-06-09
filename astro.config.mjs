import { defineConfig } from 'astro/config';

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
});
