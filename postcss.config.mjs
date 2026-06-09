// Tailwind v4 via PostCSS. The @import statements in src/styles/global.css
// deliberately pull in only the theme + utilities layers (no preflight), so
// Tailwind's reset does not alter the hand-written design.
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
