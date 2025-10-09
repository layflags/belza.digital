# [belza.digital](http://belza.digital)

Corporate website for Belza Digital GmbH - a static site built with EJS templates and deployed to Firebase Hosting.

## Tech Stack

- **Templates**: EJS
- **CSS**: PostCSS (postcss-import, postcss-cssnext)
- **Build**: Custom Node.js build script
- **Dev Server**: Browser-Sync with live reload
- **Service Worker**: Workbox
- **Hosting**: Firebase Hosting
- **CI/CD**: GitHub Actions

## Prerequisites

- Node.js 22 or higher
- npm

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```
   This starts Browser-Sync on port 3333 with live reload for CSS and template changes.

3. **Open in browser**
   ```
   http://localhost:3333
   ```

## Available Commands

- `npm run dev` - Start local development server with live reload
- `npm start` - Alias for `npm run dev`
- `npm run build` - Build files to `build/` directory (development build without minification)
- `npm run predeploy` - Production build with HTML/CSS minification and service worker generation
- `npm run deploy` - Deploy to Firebase (automatically runs `predeploy` first, requires `FIREBASE_TOKEN` env var)

## Project Structure

```
src/
  ├── templates/          # EJS templates (files starting with _ are partials)
  │   ├── index.html.ejs  # Homepage
  │   ├── _meta_defaults/ # Shared meta tag partials
  │   └── _ci/            # SVG logo components
  ├── css/                # PostCSS stylesheets
  │   ├── _variables.css  # Shared CSS variables (imported by others)
  │   ├── home.css        # Homepage styles
  │   ├── page.css        # General page styles
  │   └── consulting.css  # Consulting page styles
  └── static/             # Static assets (images, videos, etc.)
build/                    # Compiled output (generated)
bin/compile               # Custom EJS compilation script
firebase.json             # Firebase Hosting configuration
workbox-config.js         # Service worker configuration
```

## Deployment

### Automatic Deployment (Recommended)

The site automatically deploys to Firebase Hosting via GitHub Actions when changes are pushed to the `master` branch. See `.github/workflows/deploy.yml` for the CI/CD configuration.

### Manual Deployment

For manual deployment:
```bash
export FIREBASE_TOKEN=your-token-here
npm run deploy
```

The deploy command automatically runs `predeploy` first, which:
- Minifies HTML and inlines CSS using `inline-assets`
- Generates service worker with Workbox
- Removes standalone CSS files (styles are inlined)

## Development Notes

- **URL Handling**: The build system uses a `hrefExt` variable for internal links
  - Development: `.html` extension (for local file browsing)
  - Production: no extension (Firebase's `cleanUrls: true` handles routing)

- **Firebase Configuration**: The site uses Firebase Hosting with:
  - Clean URLs (`.html` extensions removed from URLs)
  - Custom headers for caching and security (HSTS)
  - Service worker with Workbox for offline support

---
© Belza Digital GmbH
