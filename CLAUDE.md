# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a corporate website for Belza Digital GmbH, a static site built with EJS templates, PostCSS, and deployed to Firebase Hosting. The site uses a custom build pipeline with Browser-Sync for local development.

## Build System Architecture

The build system uses a custom Node.js script (`bin/compile`) that compiles EJS templates from `src/templates/` to HTML files in `build/`:

- Templates starting with `_` are partials (not compiled directly)
- The compile script sets `hrefExt` based on `NODE_ENV`:
  - Development: `.html` (for local browsing)
  - Production: empty string (Firebase's `cleanUrls` option handles routing)

Build process:
1. `build:clean` - Removes and recreates `build/` directory
2. `build:static` - Copies all files from `src/static/` to `build/`
3. `build:css` - Processes CSS with postcss-import and postcss-cssnext
4. `bin/compile` - Compiles EJS templates to HTML

## Development Commands

### Local Development
```bash
npm run dev
# or
npm start
```
Runs three concurrent processes:
- CSS watcher (rebuilds CSS on changes)
- Template watcher (recompiles EJS files on changes)
- Browser-Sync server on port 3333

### Building
```bash
npm run build
```
Full build without compression (for development testing)

### Deployment
```bash
npm run predeploy
```
Production build with:
- HTML/CSS minification via inline-assets
- Service worker generation via Workbox
- CSS file removal (styles are inlined)

```bash
npm run deploy
```
Deploys to Firebase (requires `FIREBASE_TOKEN` environment variable)

Note: `predeploy` runs automatically before `deploy` via npm's pre-script hook. GitHub Actions automatically deploys to Firebase on every push to the master branch (see `.github/workflows/deploy.yml`)

## CSS Architecture

CSS files in `src/css/`:
- `_variables.css` - Shared CSS variables (not built directly, imported by others)
- `home.css` - Homepage styles
- `page.css` - General page styles
- `consulting.css` - Consulting page styles

PostCSS processes:
- `postcss-import` - Resolves @import statements
- `postcss-cssnext` - Transforms modern CSS to browser-compatible CSS

## Firebase Configuration

The site is hosted on Firebase with:
- `cleanUrls: true` - Removes `.html` extensions from URLs
- Custom headers for caching, security (HSTS), and CORS
- Service worker (`sw.js`) with no-cache policy
- Redirect: `/consulting` → `/` (301)

The Workbox service worker config (`workbox-config.js`) transforms manifest URLs to remove `.html` extensions, matching Firebase's cleanUrls behavior.

## Template Structure

EJS templates use:
- `hrefExt` variable for internal links (empty in production, `.html` in dev)
- Partial includes for reusable components (`_meta_defaults`, `_favicons`, `_footer`, `_ga`)
- SVG includes from `_ci/` subdirectory for logo components

Main page templates:
- `index.html.ejs` - Homepage with video background
- `kinga.html.ejs`, `martin.html.ejs` - Consultant profiles
- `impressum.html.ejs` - Legal/imprint page
- `404.html.ejs` - Not found page
