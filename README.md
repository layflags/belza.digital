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
- `npm run build` - Build production files to `build/` directory
- `npm run deploy` - Build and deploy to Firebase (requires `FIREBASE_TOKEN` env var)

## Project Structure

```
src/
  ├── templates/     # EJS templates (files starting with _ are partials)
  ├── css/           # PostCSS stylesheets
  └── static/        # Static assets (images, videos, etc.)
build/               # Compiled output (generated)
bin/compile          # Custom EJS compilation script
```

## Deployment

The site automatically deploys to Firebase Hosting via GitHub Actions when changes are pushed to the `master` branch.

For manual deployment:
```bash
export FIREBASE_TOKEN=your-token-here
npm run deploy
```

---
© Belza Digital GmbH
