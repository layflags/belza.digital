# MIGRATION.md — Relaunch von belza.digital

Diese Datei beschreibt, wie das bestehende Repository `layflags/belza.digital`
vom alten Stand (EJS/PostCSS-Build, Kinga + Martin Profile) auf den **Relaunch**
(statischer One-Pager) umgestellt wird.

> **Kontext für Claude Code:** Du arbeitest im lokal ausgecheckten Repo
> `git@github.com:layflags/belza.digital.git` (Branch `master`). Das `.git`-Verzeichnis,
> die Remote und das GitHub-Actions-Secret `FIREBASE_TOKEN` bleiben unangetastet.
> Ziel: alten Quellstand durch die Dateien aus diesem Paket ersetzen, committen, pushen.
> Der Push auf `master` löst den bestehenden Auto-Deploy-Workflow aus.

---

## Was sich ändert (Überblick)

**Vorher:** EJS-Templates → `bin/compile` → `build/` → PostCSS → `inline-assets`
(CSS-Minify) → Workbox-Service-Worker → Firebase serviert `build/`.

**Nachher:** Selbst-enthaltende statische Seite. Firebase serviert direkt `public/`.
Kein EJS, kein PostCSS, kein Compile-/Inline-Schritt mehr nötig (CSS ist inline,
Fonts sind eingebettet, Inhalte liegen in `assets/content.js`).

Beibehalten: Firebase-Projekt (`belza-digital`), Auto-Deploy via GitHub Actions auf
`master`, `cleanUrls`, HSTS/Security-Header. Neu: 301-Redirects für die alten URLs.

---

## Schritt 1 — Alten Quellstand entfernen

Diese Dateien/Ordner werden nicht mehr gebraucht und sollten gelöscht werden:

```
src/                     # EJS-Templates, PostCSS, alte statische Assets (inkl. Kinga)
bin/                     # bin/compile (EJS-Compiler)
workbox-config.js        # Service-Worker-Config (Relaunch ohne SW)
.travis.yml              # alter CI (Deploy läuft über GitHub Actions)
package-lock.json        # wird mit der neuen, schlanken package.json neu erzeugt
```

> Hinweis: Kingas Inhalte und die Profil-Unterseiten (`kinga.*`, `martin.*`,
> `consulting.*`) entfallen bewusst — der Relaunch ist ein einziger One-Pager
> über Martin. Alte URLs werden per 301 auf `/` umgeleitet (siehe firebase.json).

## Schritt 2 — Neue Dateien übernehmen

Aus diesem Paket ins Repo-Root kopieren (vorhandene gleichnamige Dateien ersetzen):

```
public/                  # die komplette neue Website (Firebase-Root)
firebase.json            # ersetzt die alte Version
package.json             # schlank: nur firebase-tools + deploy-Script
.firebaserc              # unverändert (Projekt: belza-digital) — nur zur Sicherheit
.github/workflows/deploy.yml   # unverändert in der Funktion (npm ci + npm run deploy)
.gitignore               # aktualisiert
CLAUDE.md                # ersetzt die alte Version (neuer Projektkontext)
README.md                # ersetzt die alte Version
```

Danach `package-lock.json` neu erzeugen:

```bash
npm install
```

## Schritt 3 — Lokal prüfen

```bash
npx serve public            # http://localhost:3000 (oder vom Tool genannter Port)
```

Checkliste:
- [ ] Startseite lädt, Mesh-Hintergrund läuft, EN/DE-Umschalter + Theme (Auto/Hell/Dunkel) ok
- [ ] `/impressum` erreichbar, Links „Zurück" / „Start" führen auf `/`
- [ ] Keine Konsolen-Fehler, kein horizontales Scrollen auf Mobile

Optional (echter Hosting-Emulator, prüft cleanUrls/Redirects/Header):
```bash
npx firebase emulators:start --only hosting
```

## Schritt 4 — Committen & Pushen

```bash
git add -A
git commit -m "Relaunch: statischer One-Pager, EJS/PostCSS-Pipeline entfernt"
git push origin master
```

Der Push auf `master` triggert `.github/workflows/deploy.yml` → `npm ci` →
`npm run deploy` → Firebase. Nach ~1–2 Minuten ist der Relaunch live.

> Voraussetzung: Das Repo-Secret `FIREBASE_TOKEN` existiert bereits (aus dem alten
> Setup). Falls das Token abgelaufen ist, mit `npx firebase login:ci` ein neues
> erzeugen und unter GitHub → Settings → Secrets → Actions aktualisieren.

---

## Endzustand (Repo-Layout)

```
belza.digital/
├── public/
│   ├── index.html
│   ├── impressum.html
│   ├── assets/  (content.js · bg-field.js · fonts.css · og-image.png)
│   ├── favicon.svg · favicon-96x96.png · apple-touch-icon.png
│   ├── web-app-manifest-192x192.png · web-app-manifest-512x512.png
│   ├── site.webmanifest · robots.txt · sitemap.xml
├── firebase.json
├── package.json
├── .firebaserc
├── .gitignore
├── .github/workflows/deploy.yml
├── CLAUDE.md
└── README.md
```

## Rollback

Da alles über Git läuft: `git revert <commit>` oder im Firebase-Console-Hosting-Tab
ein früheres Release als „rollback" reaktivieren.
