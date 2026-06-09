# Spec: Migration belza.digital auf Astro + Tailwind v4

**Datum:** 2026-06-09
**Status:** Entwurf zur Review
**Ziel:** Die bestehende statische Site (handgeschriebenes HTML mit
client-seitigem Rendering aus `content.js`) auf einen komponentenbasierten
Astro-Stack umstellen, der **perfekt statisches HTML pro Sprache** ausgibt und
die **Pflege vereinfacht** — ohne Hosting-Wechsel.

---

## 1. Motivation

Heute ist die Seite zwar statisch ausgeliefert, aber der sichtbare Inhalt wird
zur Laufzeit per JavaScript aus `public/assets/content.js` erzeugt (`data-k`-
Attribute + `innerHTML`-Mounts). Folgen:

- **SEO/Crawler:** JS-loses Abrufen liefert praktisch leeren `<body>`; ein
  einzelner JS-Fehler entfernt den Inhalt für alle Crawler.
- **Pflege:** Markup, Styles und Logik liegen monolithisch in `index.html`
  (~425 Zeilen, Markup + Inline-`<style>` + Inline-Script).

Astro löst beides: statisches Pre-Rendering (null JS by default) + Komponenten,
mit gezielten Vanilla-JS-Islands für die Interaktivität.

**Nicht-Ziele:** Kein Redesign — der visuelle Output bleibt identisch. Kein
Hosting-Wechsel. Kein UI-Framework. Keine neuen Features.

---

## 2. Getroffene Entscheidungen

| #   | Thema             | Entscheidung                                                                                                                            |
| --- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | i18n-Auslieferung | **Zwei statische Seiten pro Sprache** (Variante A)                                                                                      |
| 2   | URL-Struktur      | EN ohne Präfix (`/`, `/impressum`), DE mit Präfix (`/de`, `/de/impressum`); `prefixDefaultLocale: false`                                |
| 3   | Content-Pflege    | **Getrennte Dictionaries** `en.json`/`de.json` (Astro-i18n, Variante B); geteilte Daten in `shared.ts`                                  |
| 4   | Interaktivität    | **Vanilla-JS-Islands**, kein UI-Framework                                                                                               |
| 5   | Styling           | **Tailwind v4** (`@tailwindcss/vite`), Tokens via `@theme`, überwiegend Utilities; scoped `<style>` nur für Canvas/Animationen/Parallax |
| 6   | Deployment        | **Firebase bleibt**, `firebase.json` → `"public": "dist"`, Build in CI                                                                  |
| 7   | Service Worker    | `public/sw.js` **verbatim** behalten (Kill-Switch), keine SW-Registrierung                                                              |
| 8   | Sprache (Code)    | **TypeScript** (Astro-eingebaut)                                                                                                        |
| 9   | Formatierung      | **Prettier** + `prettier-plugin-astro`                                                                                                  |
| 10  | Linting           | **ESLint** (Flat-Config, `typescript-eslint` + `eslint-plugin-astro` + `eslint-config-prettier`)                                        |
| 11  | Tests             | **Vitest** (Theme-Logik) **+ Playwright-Smoke-Test** in CI (Stufe 2)                                                                    |
| 12  | CI/CD             | **Ein Workflow** (Variante A): `ci`-Job bei jedem Push/PR, `deploy`-Job mit `needs: ci` + `if: ref == master`                           |

---

## 3. Architektur

Statischer Astro-Build (`output: 'static'`), zwei Sprachen via Astro-i18n,
Output nach `dist/`, ausgeliefert von Firebase Hosting. Reines statisches HTML
pro Sprache; Interaktivität als kleine Vanilla-JS-Islands. Tailwind v4 über das
Vite-Plugin.

### 3.1 Zielstruktur

```
src/
  pages/
    index.astro            → /            (EN)
    impressum.astro        → /impressum   (EN)
    de/index.astro         → /de          (DE)
    de/impressum.astro     → /de/impressum (DE)
  layouts/
    Base.astro             <head>, Meta/OG, hreflang, global.css-Import,
                           blockierendes Theme-Init-Snippet (Anti-FOUC)
  components/
    Header.astro           Brand + Nav + Theme-Toggle + Sprach-Link
    Hero.astro
    Services.astro
    Work.astro
    About.astro            inkl. Tech-Liste (aus shared.ts)
    SideProjects.astro
    Testimonial.astro
    Contact.astro
    Footer.astro
    BgField.astro          Canvas-Island (lädt scripts/bg-field.ts)
  i18n/
    en.json                EN-Dictionary
    de.json                DE-Dictionary
    types.ts               Dictionary-Typ — erzwingt Key-Gleichheit EN/DE
    shared.ts              sprachübergreifende Daten (tech, side-projects)
  scripts/
    theme.ts               reine Logik (resolveTheme, nextMode, themePref) + Bind
    reveal.ts              Reveal-on-Scroll (IntersectionObserver + Failsafe)
    parallax.ts            data-px-Parallax
    bg-field.ts            Canvas-Kraftfeld (Port von bg-field.js)
  styles/
    global.css             @import "tailwindcss"; @theme-Tokens; Reset/Typo;
                           Font-Einbindung
public/                    1:1 übernommen (verbatim, kein Bundling/Hashing):
                           assets/fonts.css, assets/og-image.png, Favicons,
                           site.webmanifest, robots.txt, sitemap.xml, sw.js
test/
  theme.test.ts            Vitest-Unit-Tests (Theme-Logik)
  e2e/smoke.spec.ts        Playwright-Smoke-Test
astro.config.mjs
firebase.json              "public": "dist"
eslint.config.js
.prettierrc
playwright.config.ts
vitest.config.ts (oder Astros getViteConfig)
package.json               Scripts: dev, build, preview, lint, typecheck, test, test:e2e, format
.github/workflows/deploy.yml   ci-Job + deploy-Job
```

### 3.2 i18n-Konfiguration

`astro.config.mjs` mit `defaultLocale: 'en'`, `locales: ['en', 'de']`,
`routing: { prefixDefaultLocale: false }`. Da Astro v6 die i18n-Defaults
geändert hat, werden die Routing-Optionen **explizit** gesetzt. Die bestehenden
URLs (`/`, `/impressum`) bleiben dadurch unverändert.

### 3.3 Content & Drift-Schutz

`en.json` und `de.json` liefern die Texte; ein gemeinsamer TypeScript-Typ
(`i18n/types.ts`) beschreibt die Dictionary-Struktur, sodass ein fehlender Key
in einer Sprache zum **Compile-Fehler** wird (fängt das Hauptrisiko von
Variante B ab). Sprachübergreifende Daten (`tech`-Gruppen, Side-Projects) leben
einmalig in `shared.ts`.

### 3.4 Styling (Tailwind v4)

- `global.css`: `@import "tailwindcss";`, danach `@theme { … }` mit den
  Design-Tokens (Akzent `--acc` etc.), Reset, Basis-Typografie, Font-Einbindung
  (`fonts.css`).
- Theming Auto/Light/Dark weiterhin über `html[data-theme="…"]` +
  CSS-Custom-Properties; das Akzent-Logo nutzt `currentColor`.
- Styling überwiegend per Utility-Klassen im Komponenten-Markup; scoped
  `<style>` nur für Canvas, Keyframe-Animationen und Parallax-Feinheiten.
- `prefers-reduced-motion` wird respektiert (Reveal mit Failsafe).

### 3.5 Interaktivität (Islands)

Port des bestehenden, funktionierenden Vanilla-Codes nach TypeScript:

- **`bg-field.ts`** — Canvas-Kraftfeld (aus `bg-field.js`).
- **`theme.ts`** — Auto→Light→Dark-Cycling, `localStorage` (`belza-theme`),
  System-`matchMedia`-Sync. Reine Funktionen (`resolveTheme`, `nextMode`,
  `themePref`) getrennt vom DOM-Binding, damit unit-testbar.
- **`reveal.ts`** / **`parallax.ts`** — Scroll-Effekte.
- Sprachwechsel ist mit Variante A ein normaler Link → kein JS.

### 3.6 Datenfluss

- **Build-Zeit:** Astro liest `en.json`/`de.json` + `shared.ts` → rendert pro
  Sprache vollständiges statisches HTML in `dist/`.
- **Laufzeit:** nur die Islands (Theme-Toggle, Canvas, Reveal, Parallax) laufen
  im Browser. Theme-Init als blockierendes Inline-Snippet im `<head>` gegen
  FOUC.

---

## 4. Tooling

- **TypeScript:** Astros eingebauter Support; `astro check` für Typprüfung.
- **Prettier:** `.prettierrc` + `prettier-plugin-astro`; `npm run format`.
- **ESLint:** Flat-Config `eslint.config.js` mit `typescript-eslint`,
  `eslint-plugin-astro`, `eslint-config-prettier` (Stil-Konflikte vermeiden);
  `npm run lint`.
- **Vitest:** Unit-Tests für die reinen Theme-Funktionen (`test/theme.test.ts`).
- **Playwright:** ein Smoke-Test (`test/e2e/smoke.spec.ts`): Seite lädt,
  Theme-Toggle ändert `data-theme`, Sprach-Link führt nach `/de`.

---

## 5. Deployment & CI/CD

Ein Workflow (`.github/workflows/deploy.yml`):

- **Job `ci`** (bei jedem Push **und** PR): `npm ci` → `lint` → `typecheck`
  (`astro check`) → `test` (Vitest) → `build` (`astro build`) → `test:e2e`
  (Playwright, Browser-Binaries gecacht). Lädt `dist/` als Artifact hoch.
- **Job `deploy`** (`needs: ci`, `if: github.ref == 'refs/heads/master'`):
  lädt das `dist/`-Artifact und führt `firebase deploy --only hosting` aus.
  Auth wie bisher über `FIREBASE_SERVICE_ACCOUNT_BELZA_DIGITAL` /
  `GOOGLE_APPLICATION_CREDENTIALS`.

`firebase.json`: `"public": "dist"` (statt `"public"`). `cleanUrls`, Redirects,
Caching- und Security-Header bleiben unverändert.

---

## 6. Verifikation

- `astro build` ohne Fehler; `lint`, `typecheck`, `test`, `test:e2e` grün.
- Alle vier URLs erreichbar: `/`, `/impressum`, `/de`, `/de/impressum`.
- **Visueller Pixel-Abgleich** der gebauten Seite gegen die aktuelle
  Live-Version in EN & DE, jeweils Light & Dark.
- Theme-Toggle, Sprach-Link, Canvas-Hintergrund, Reveal/Parallax funktionieren;
  `prefers-reduced-motion` greift.
- `sw.js` ist unter `/sw.js` abrufbar (verbatim, unverändert).
- Inhalt steht ohne JS bereits im HTML (Crawler-Test: JS deaktiviert).

---

## 7. Bewusste Trade-offs

- **Sprachwechsel mit kurzem Reload** statt Instant-Toggle — gewollt für
  „perfekt statisch" und saubere Per-Sprache-URLs.
- **EN/DE in getrennten Dateien** (Variante B) — Drift-Risiko durch
  gemeinsamen TS-Typ abgefedert.
- **Neuer Build-Schritt** — bewusst akzeptiert für Komponenten-Pflege und
  Tooling-Gewinne.
- **„Kein Build / keine Dependencies"-Prinzip wird aufgegeben** — die frühere
  CLAUDE.md-Konvention wird durch den neuen Stack ersetzt.

---

## 8. Folgearbeiten (nach Migration)

- `CLAUDE.md` an den neuen Stack anpassen (Struktur, Konventionen, Build/Deploy,
  Content-Pflege über Dictionaries statt `content.js`).
- `MIGRATION.md` um diesen Schritt ergänzen.
- `public/assets/content.js` und die alten Inline-Skripte/Styles entfernen,
  sobald die Astro-Variante verifiziert ist.
- Service Worker `sw.js` entfernen, sobald Altbesucher bereinigt sind
  (separater, späterer Schritt).

---

(Hinweis: Die genauen API-/Config-Details von Astro v6, Tailwind v4, Vitest und
Playwright werden in der Implementierungsplan-Phase gegen die aktuellen Docs
verifiziert, bevor Code geschrieben wird.)
