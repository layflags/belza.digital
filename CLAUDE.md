# CLAUDE.md — belza.digital

Guidance für Claude Code (claude.ai/code) in diesem Repository.

## Projektüberblick

Corporate-/Portfolio-Website von **Martin Belza** (Belza Digital GmbH, München) —
Frontend Architect & Engineering Lead. Zweisprachiger (EN/DE) One-Pager + Impressum.

**Live:** https://belza.digital/ · **Hosting:** Firebase Hosting (`belza-digital`)

> Stand: Relaunch 2026. Die frühere EJS/PostCSS-Build-Pipeline und Kingas Seite
> wurden entfernt — siehe `MIGRATION.md` für die Historie.

## Tech-Stack (bewusst minimalistisch)

- **Reines statisches HTML, CSS und Vanilla-JavaScript.**
- **Kein Framework, kein Build-Schritt, keine Runtime-Dependencies.**
- **Keine externen Requests zur Laufzeit:** Schriften lokal eingebettet
  (`public/assets/fonts.css`), kein Tracking/Analytics, keine Cookies.
  Nur `localStorage` für Sprache & Theme.
- Firebase serviert direkt den Ordner `public/` (kein Kompilieren).

## Struktur

```
public/                 ← wird von Firebase deployed (firebase.json: "public": "public")
  index.html            Startseite (One-Pager): Markup + <style> + Inline-Script
  impressum.html        Impressum / Datenschutz
  assets/
    content.js          EINZIGE Textquelle — window.BELZA.en / .de
    bg-field.js         Interaktiver Canvas-Hintergrund (Mesh-Kraftfeld)
    fonts.css           Lokal eingebettete Schriften (Base64 woff2, latin)
    og-image.png        Social-Preview (1200×630)
  favicon.*, *-manifest-*.png, site.webmanifest, robots.txt, sitemap.xml
firebase.json           Hosting-Config (cleanUrls, Redirects, Caching, Security-Header)
package.json            Nur firebase-tools + deploy-Script
.firebaserc             Firebase-Projekt: belza-digital
.github/workflows/deploy.yml   Auto-Deploy bei Push auf master
```

## Konventionen

- **Texte ändern → IMMER in `public/assets/content.js`** (`window.BELZA.en` / `.de`).
  Das HTML rendert per `data-k="pfad"`-Attributen aus diesem Objekt. EN + DE parallel
  pflegen. `TECH` und die Side-Projects sind sprachübergreifend geteilt.
- **Basissprache Englisch** (`<html lang="en">`, Default im Script); DE umschaltbar.
- **Interne Links extensionslos** (`/`, `/impressum`) — passend zu `cleanUrls: true`.
- **Theme:** Auto (System) / Light / Dark, in `localStorage` (`belza-theme`).
  Farben als CSS-Custom-Properties unter `:root` / `html[data-theme="light"]`.
  Akzent = `--acc`; das Logo nutzt ihn via `currentColor`.
- **Schriften:** Schibsted Grotesk (Display) + JetBrains Mono (Mono/Labels).
  Eingebettete Schnitte: Schibsted 400/500/600, Mono 400/500 — keine weiteren
  verwenden, ohne `fonts.css` neu zu erzeugen.
- **Bewegung** respektiert `prefers-reduced-motion`; Reveal hat ein Failsafe.

## Lokal ansehen

```bash
npx serve public      # oder: (cd public && python3 -m http.server 8000)
```

## Deployen

Automatisch via GitHub Actions bei Push auf `master` (Secret `FIREBASE_TOKEN`).

Manuell:
```bash
npm install
export FIREBASE_TOKEN=dein-token
npm run deploy
```

## Hinweise / To-dos

- Impressum-Rechtstexte vor Go-Live juristisch prüfen lassen.
- `public/assets/og-image.png` wird per Canvas-Skript erzeugt (nicht von Hand editieren).
- Optionaler Follow-up: Workbox-Service-Worker (Offline) wieder ergänzen — wurde beim
  Relaunch zugunsten von Einfachheit entfernt.
