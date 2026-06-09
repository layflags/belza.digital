# CLAUDE.md — belza.digital

Guidance für Claude Code (claude.ai/code) in diesem Repository.

## Projektüberblick

Corporate-/Portfolio-Website von **Martin Belza** (Belza Digital GmbH, München) —
Frontend Architect & Engineering Lead. Zweisprachiger (EN/DE) One-Pager + Impressum.

**Live:** https://belza.digital/ · **Hosting:** Firebase Hosting (`belza-digital`)

> Stand: Astro-Migration 2026. Davor: reines statisches HTML mit client-seitigem
> Rendering aus `content.js`. Die frühere EJS/PostCSS-Pipeline und Kingas Seite
> wurden bereits beim Relaunch entfernt — siehe `MIGRATION.md` für die Historie.

## Tech-Stack

- **Astro** (statischer Output, `output: "static"`) + **TypeScript**, **Tailwind v4**
  (via PostCSS, ohne Preflight) und schlanke **Vanilla-JS-Islands** für Interaktivität.
  Kein UI-Framework (kein React/Vue) — die Interaktivität ist imperativ (Canvas,
  Scroll-Observer, Theme-Attribut).
- **Pro Sprache eine statische Seite:** EN ohne Präfix (`/`), DE unter `/de`
  (Astro-i18n, `prefixDefaultLocale: false`). Der Inhalt steht vollständig im HTML
  (gut für Crawler) — kein client-seitiges Content-Rendering mehr.
- **Keine externen Requests zur Laufzeit:** Schriften lokal ausgeliefert
  (`public/fonts/*.woff2`, eingebunden via gebündeltem `src/styles/fonts.css`),
  kein Tracking/Analytics, keine Cookies.
  Nur `localStorage` für Sprache (`belza-lang`) & Theme (`belza-theme`).
- **Build → `dist/`**, das Firebase Hosting ausliefert (`firebase.json: "public": "dist"`).

## Struktur

```
src/
  pages/
    index.astro          /            (EN)
    de/index.astro       /de          (DE)
    impressum.astro      /impressum     (EN, noindex)
    de/impressum.astro   /de/impressum  (DE, noindex)
    404.astro            Custom-404 (noindex; Firebase serviert dist/404.html)
  layouts/Base.astro     <head>, Meta, Anti-FOUC-Theme-Snippet, Font-Preloads, Scripts
  components/            Header, Hero, Stats, Services, Work, About, SideProjects,
                         Testimonial, Contact, Footer, Signet, HomeHead, Impressum, JsonLd
  i18n/
    types.ts             Dictionary-Typ — erzwingt Key-Gleichheit EN/DE (Drift-Schutz)
    en.ts / de.ts        Sprach-Dictionaries (Texte, inkl. imprint)
    shared.ts            sprachübergreifend: META, TECH
    index.ts             dicts/getDict/homePath-Helper
  lib/jsonld.ts          baut das schema.org-@graph für die Startseite
  scripts/               theme.ts, lang.ts, reveal.ts, parallax.ts, bg-field.ts
  styles/
    fonts.css            @font-face (gebündelt) → public/fonts/*.woff2, font-display:swap
    global.css           Tailwind (theme+utilities, KEIN Preflight) + @theme-Tokens
    home.css             Home-Design (verbatim aus altem index.html portiert)
    impressum.css        Impressum-Design (verbatim portiert)
public/                  verbatim ausgeliefert: fonts/*.woff2, assets/og-image.png,
                         Favicons, site.webmanifest, robots.txt, sw.js
                         (sitemap wird per @astrojs/sitemap generiert, nicht eingecheckt)
test/theme.test.ts       Vitest-Unit-Tests (reine Theme-Logik)
tests/e2e/smoke.spec.ts  Playwright-Smoke-Test
astro.config.mjs · postcss.config.mjs · eslint.config.js · .prettierrc · .editorconfig · vitest.config.ts · playwright.config.ts
firebase.json            Hosting-Config (cleanUrls, Redirects, Caching, Security-Header)
.github/workflows/deploy.yml   CI (lint/typecheck/test/build/e2e) + Deploy bei Push auf master
```

## Konventionen

- **Texte ändern → in `src/i18n/en.ts` und `src/i18n/de.ts`.** Beide teilen den Typ
  `Dict` (`src/i18n/types.ts`) — ein fehlender Key in einer Sprache ist ein
  Compile-Fehler (`npm run typecheck`). `META` und `TECH` sind in `shared.ts`
  sprachübergreifend; Side-Projects haben pro Sprache eine `desc`.
- **Basissprache Englisch.** `/` rendert EN; ein render-blockierendes Inline-Skript
  schickt zurückkehrende DE-Besucher (`belza-lang`/`navigator.language`) nach `/de`.
- **Interne Links extensionslos** (`/`, `/de`, `/impressum`) — passend zu `cleanUrls`.
- **Imports via `@/`-Alias** (= `src/`, in `tsconfig.json` + `astro.config.mjs`) statt
  relativer Pfade.
- **SEO:** Startseiten betten schema.org-JSON-LD ein (`lib/jsonld.ts` → `JsonLd.astro`);
  Sitemap/canonical/hreflang/OG werden aus `site` (astro.config) abgeleitet.
- **Styling:** Pixel-Identität hat Vorrang. Das ursprüngliche CSS lebt verbatim in
  `home.css` / `impressum.css`; Tailwind ist via PostCSS verdrahtet (Tokens in
  `@theme`), aber **ohne Preflight**, damit Tailwinds Reset das Design nicht verändert.
  Beide Seiten-Stylesheets laden nie gemeinsam → keine Kaskaden-Konflikte.
- **Theme:** Auto (System) / Light / Dark, in `localStorage` (`belza-theme`).
  Farben als CSS-Custom-Properties unter `:root` / `html[data-theme="light"]`.
  Akzent = `--acc`; das Logo nutzt ihn via `currentColor`. Reine Theme-Logik in
  `scripts/theme.ts` (testbar) getrennt vom DOM-Binding.
- **Schriften:** Schibsted Grotesk (Display) + JetBrains Mono (Mono/Labels).
  Lokale Schnitte (`public/fonts/`): Schibsted 400/500/600, Mono 400/500 — keine
  weiteren verwenden, ohne die `.woff2` zu ergänzen und `src/styles/fonts.css` zu
  erweitern.
- **Bewegung** respektiert `prefers-reduced-motion`; Reveal hat ein Failsafe.

## Lokal entwickeln & prüfen

```bash
npm install
npm run dev          # Astro Dev-Server (HMR)
npm run build        # Build nach dist/
npm run preview      # gebautes dist/ lokal servieren (Port 4321)

npm run lint         # ESLint (flat config)
npm run typecheck    # astro check
npm test             # Vitest (Unit)
npm run test:e2e     # Playwright-Smoke-Test (braucht: npx playwright install chromium)
npm run format       # Prettier
```

## Deployen

Automatisch via GitHub Actions bei Push auf `master`: Job `ci` (lint, typecheck,
Vitest, `astro build`, Playwright) muss grün sein; nur dann läuft Job `deploy`
(`needs: ci`) und führt `npm run deploy` (`firebase deploy --only hosting`) auf
Node 24 aus — das gebaute `dist/` wird als Artifact weitergereicht. Auth über
Application Default Credentials: der Workflow schreibt das Secret
`FIREBASE_SERVICE_ACCOUNT_BELZA_DIGITAL` in eine Temp-Datei und setzt
`GOOGLE_APPLICATION_CREDENTIALS` darauf. Keine Drittanbieter-Deploy-Action.

Manuell (lokal, erfordert `firebase login` oder `GOOGLE_APPLICATION_CREDENTIALS`):

```bash
npm install && npm run build && npm run deploy
```

## Hinweise / To-dos

- Impressum-Rechtstexte vor Go-Live juristisch prüfen lassen. Das Impressum ist
  zweisprachig (`/impressum` EN, `/de/impressum` DE, beide `noindex`); Inhalt in
  `src/i18n/*.ts` unter `imprint`. Die **deutsche Fassung ist rechtlich maßgeblich**,
  die englische ist eine Service-Übersetzung (Hinweis steht auf der EN-Seite).
- `public/assets/og-image.png` wird per Canvas-Skript erzeugt (nicht von Hand editieren).
- `public/sw.js` ist ein selbst-zerstörender „Kill-Switch"-Service-Worker (entfernt
  Alt-Caches früherer Besucher). Muss verbatim unter `/sw.js` bleiben, bis die
  Altbesucher bereinigt sind; danach entfernbar. Die Seite registriert selbst keinen SW.
- Tailwind läuft via PostCSS, weil `@tailwindcss/vite` aktuell mit Astro 6s
  Rolldown-Vite inkompatibel ist.
