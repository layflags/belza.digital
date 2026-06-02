# [belza.digital](https://belza.digital)

Corporate-/Portfolio-Website von Belza Digital GmbH (Martin Belza).
Zweisprachiger (EN/DE) statischer One-Pager + Impressum — ohne Framework,
ohne Build-Schritt, ohne Runtime-Dependencies. Deployment auf Firebase Hosting.

## Schnellstart

```bash
npx serve public
# oder
cd public && python3 -m http.server 8000
```

## Bearbeiten

- **Texte:** `public/assets/content.js` (`window.BELZA.en` / `.de`) — nicht im HTML.
- **Styles:** `<style>`-Block in `public/index.html` bzw. `public/impressum.html`.
- **Hintergrund-Animation:** `public/assets/bg-field.js`.

Projektkontext & Konventionen: siehe [`CLAUDE.md`](CLAUDE.md).

## Deployment

Automatisch via GitHub Actions bei Push auf `master` (Repo-Secret `FIREBASE_TOKEN`).
Manuell:

```bash
npm install
export FIREBASE_TOKEN=dein-token
npm run deploy
```

Firebase serviert den Ordner `public/`. Config: `firebase.json`
(cleanUrls, 301-Redirects für `/martin` · `/kinga` · `/consulting` → `/`,
Caching- und Security-Header).

---
© Belza Digital GmbH · München
