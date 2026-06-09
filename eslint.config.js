import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      'dist/',
      '.astro/',
      '.remember/',
      'node_modules/',
      'playwright-report/',
      'test-results/',
      // static assets served verbatim (incl. the self-destroying sw.js kill switch)
      'public/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  // Browser globals for client-side TS and inline scripts.
  {
    files: ['src/**/*.{ts,astro}'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  // Node globals for config files (astro/postcss/vitest/playwright configs).
  {
    files: ['*.config.{js,mjs,ts}', '*.config.*'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  prettier
);
