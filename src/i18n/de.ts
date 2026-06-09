import type { Dict } from './types';
import { META, TECH } from './shared';

export const de: Dict = {
  meta: META,
  nav: {
    work: 'Projekte',
    services: 'Leistungen',
    about: 'Über mich',
    contact: 'Kontakt',
    cta: 'Anfragen',
    imprint: 'Impressum',
  },
  hero: {
    status: 'Verfügbar für neue Projekte',
    roleLine: 'Frontend-Architekt · Engineering Lead · UI/UX-Engineer',
    headlinePre: 'Frontend-Architektur, die',
    headlineEm: 'skaliert',
    headlinePost: '— und Teams, die liefern.',
    sub: 'Ich konzipiere und skaliere performante Web-Plattformen für Konzerne, Scale-ups und Startups. 20+ Jahre Erfahrung, 90+ Projekte umgesetzt. Hands-on, von A bis Z.',
    ctaPrimary: 'Projekt anfragen',
    ctaSecondary: 'Ausgewählte Projekte',
  },
  stats: [
    { value: '20+', label: 'Jahre Erfahrung' },
    { value: '90+', label: 'Projekte umgesetzt' },
    { value: '45+', label: 'Kunden betreut' },
    { value: '∞', label: 'Neugier' },
  ],
  servicesHead: 'Was ich mache',
  servicesSub: 'Frontend-Architektur als Kern — Leadership, UX und KI als Verstärker.',
  services: [
    {
      n: '01',
      title: 'Frontend-Architektur',
      desc: 'Skalierbare, langlebige Architekturen für komplexe Web-Plattformen — auf Liefertempo und Wartbarkeit ausgelegt.',
    },
    {
      n: '02',
      title: 'Microfrontends & Design-Systeme',
      desc: 'Modulare Frontends und Multi-Brand-Komponentenbibliotheken, mit denen große Teams parallel liefern.',
    },
    {
      n: '03',
      title: 'Performance-Engineering',
      desc: 'Messbare Gewinne bei Ladezeit, Laufzeit-Performance und Core Web Vitals — Web wie E-Commerce.',
    },
    {
      n: '04',
      title: 'Developer Experience',
      desc: 'Monorepos, Tooling und CI/CD, die Entwicklungsteams schneller, ruhiger und zufriedener machen.',
    },
    {
      n: '05',
      title: 'KI-gestützte Entwicklung',
      desc: 'LLM-Integration und KI-getriebene Workflows, die Prototyping beschleunigen und Code-Qualität heben.',
    },
    {
      n: '06',
      title: 'Engineering Leadership',
      desc: 'Teamaufbau, Mentoring, technische Strategie und Stakeholder-Alignment — als Lead oder hands-on.',
    },
  ],
  workHead: 'Ausgewählte Projekte',
  workSub: 'Einige Engagements, die Produkte für Millionen geprägt haben.',
  projects: [
    {
      client: 'BSH Hausgeräte',
      role: 'Lead Frontend-Architekt',
      period: '4+ Jahre',
      desc: 'Eine neue Multi-Brand-Frontend-Architektur für 14 Marken in 40 Ländern. Deutliche Gewinne bei DX, Skalierbarkeit und Performance für Website und E-Commerce-Shop.',
      tags: ['Next.js', 'GraphQL', 'Multi-Brand', 'E-Commerce'],
    },
    {
      client: 'Telefónica / o2',
      role: 'Lead Frontend-Architekt',
      period: '2 Jahre',
      desc: 'Greenfield-SPA für eine Data-Lake-Governance-Plattform — Architektur, UX und Entwicklung von Grund auf.',
      tags: ['React', 'Redux', 'Governance', 'SPA'],
    },
    {
      client: 'Shore GmbH',
      role: 'Lead Frontend-Architekt',
      period: '3 Jahre',
      desc: 'Migration einer monolithischen Ruby-on-Rails-Anwendung in modulare, skalierbare Microfrontends und Services.',
      tags: ['Microfrontends', 'Elm', 'TypeScript'],
    },
    {
      client: 'gutefrage.net',
      role: 'Frontend-Architekt',
      period: '6 Monate',
      desc: 'Neue Frontend-Architektur für eine der größten Online-Communitys Deutschlands. Atomic-Design-Workshops und Team-Mentoring. Intensiver Einsatz von Web Components.',
      tags: ['Web Components', 'Atomic Design', 'Mentoring'],
    },
    {
      client: 'CGPA Europe',
      role: 'Lead UI/UX-Engineer',
      period: '1 Jahr',
      desc: 'Mobile-first Versicherungs-Tarifrechner und digitale Antragsstrecke — durchgängig konzipiert und umgesetzt.',
      tags: ['Elm', 'Firebase', 'Mobile-first', 'UI/UX'],
    },
  ],
  expHead: 'Werdegang',
  experience: [
    {
      period: '2015 — heute',
      org: 'Belza Digital GmbH',
      role: 'Gründer & Lead Frontend-Architekt',
    },
    { period: '2020 — 2024', org: 'ThankU (Non-Profit)', role: 'Mitgründer & CTO' },
    { period: '2013 — 2014', org: 'Gini GmbH', role: 'VP Engineering' },
    { period: '2010 — 2013', org: 'FriendScout24', role: 'Team Lead Software-Entwicklung' },
    { period: '2007 — 2010', org: 'Sapient', role: 'Senior Interactive Consultant' },
    { period: '1999 — 2007', org: 'Freelance', role: 'Interactive- / Web-Entwickler' },
  ],
  aboutHead: 'Über mich',
  about: [
    'Ich habe in der Dotcom-Ära um 1999 angefangen — als freier Interactive Designer baute ich Websites, Web-Apps, Online-Games und interaktive Medien.',
    'Nach dem Informatik-Studium und Jahren in Agenturen, Beratungen, Konzernen und Start-ups — als Game-Designer, Interactive Consultant, Team Lead und VP Engineering — gründete ich Belza Digital.',
    'Heute arbeite ich als Hands-on Frontend-Architekt und Engineering Lead: Ich helfe Teams, Frontend-Systeme zu entwerfen, die mit dem Wachstum schnell und wartbar bleiben — und liefere direkt mit.',
  ],
  techHead: 'Tech-Fokus',
  tech: TECH,
  sideHead: 'Side-Projects',
  sideSub: 'Dinge, die ich in meiner eigenen Zeit baue.',
  side: [
    {
      name: 'NUMISTAR',
      url: 'numistar.com',
      href: 'https://numistar.com',
      desc: 'Galerie-App für Münzsammler. Elm/TypeScript auf Supabase/PostgreSQL, deployed auf Vercel.',
    },
    {
      name: 'Spiri Events',
      url: 'events.amorecura.de',
      href: 'https://events.amorecura.de',
      desc: 'Öffentlicher Kalender für spirituelle Events in München. React/Tailwind mit KI-gestützter Content-Pflege.',
    },
    {
      name: 'num num menu',
      url: 'numnummenu.com',
      href: 'https://numnummenu.com',
      desc: 'SaaS für digitale & druckbare Restaurant-Menüs mit Allergen-Kennzeichnung. Preact/Redux auf Firebase.',
    },
  ],
  testimonial: {
    quote:
      'Sein beeindruckendes Wissen über Frontend-Technologien und Design-Techniken hat das ganze Team begeistert. Das Fundament unseres heutigen FE-Tech-Stacks ist genau richtig — nicht zu komplex, nicht zu simpel — GROSSARTIG.',
    author: 'Michael Maretzke',
    role: 'CEO, gutefrage.net',
  },
  contactHead: 'Machen wir Ihr Projekt zum Erfolg.',
  contactSub:
    'Verfügbar für Engagements als Frontend-Architekt und Engineering Lead. Remote oder vor Ort in München.',
  contactCta: 'Schreiben Sie mir eine E-Mail',
  footerNote: 'Frontend-Architekt & Engineering Lead',
  langName: 'DE',
  theme: { auto: 'Auto', light: 'Hell', dark: 'Dunkel' },
  imprint: {
    title: 'Impressum — Belza Digital GmbH',
    back: 'Zurück',
    city: 'München',
    footerHome: 'Start',
    kicker: 'Belza Digital GmbH',
    h1: 'Impressum',
    intro:
      'Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) sowie rechtliche Hinweise und Datenschutz.',
    providerHead: 'Anbieter',
    rows: [
      { k: 'Unternehmen', v: 'Belza Digital GmbH', big: true },
      { k: 'Anschrift', lines: ['Amalienstraße 71, RGB2', '80799 München, Deutschland'] },
      { k: 'Geschäftsführer', v: 'Martin Belza (vertretungsberechtigt)' },
      { k: 'Telefon', v: '+49 (0)89 92927721' },
      { k: 'Telefax', v: '+49 (0)3222 3944878' },
      { k: 'E-Mail', email: 'hello@belza.digital' },
      { k: 'Registergericht', v: 'Amtsgericht München' },
      { k: 'Registernummer', v: 'HRB 222344' },
      { k: 'USt-IdNr. (§ 27a UStG)', v: 'DE303717499' },
      { k: 'Steuernummer', v: '143/119/61455' },
      { k: 'Inhaltlich verantwortlich', v: 'Martin Belza (§ 18 Abs. 2 MStV, Anschrift wie oben)' },
    ],
    sections: [
      {
        h2: 'Rechtliche Hinweise',
        subsections: [
          {
            h3: '§ 1 Haftung für Inhalte',
            paras: [
              'Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen. Die Nutzung der Inhalte erfolgt auf eigene Gefahr. Mit der reinen Nutzung der Website kommt kein Vertragsverhältnis zwischen Nutzer und Anbieter zustande.',
            ],
          },
          {
            h3: '§ 2 Externe Links',
            paras: [
              'Diese Website enthält Verknüpfungen zu Websites Dritter („externe Links"). Diese Websites unterliegen der Haftung der jeweiligen Betreiber. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Auf die aktuelle und zukünftige Gestaltung der verlinkten Seiten hat der Anbieter keinen Einfluss. Bei Bekanntwerden von Rechtsverstößen werden derartige Links unverzüglich entfernt.',
            ],
          },
          {
            h3: '§ 3 Urheber- und Leistungsschutzrechte',
            paras: [
              'Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und Leistungsschutzrecht. Jede nicht zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters bzw. Rechteinhabers. Dies gilt insbesondere für Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung und Wiedergabe in elektronischen Systemen. Kopien und Downloads für den persönlichen, privaten und nicht-kommerziellen Gebrauch sind gestattet.',
            ],
          },
        ],
      },
      {
        h2: 'Datenschutz',
        subsections: [
          {
            h3: 'Überblick',
            paras: [
              'Diese Website ist eine statische Seite und verzichtet bewusst auf Tracking, Analyse-Tools und Werbe-Cookies. Es findet keine Profilbildung statt. Verantwortlicher im Sinne der DSGVO ist die im Impressum genannte Belza Digital GmbH.',
            ],
          },
          {
            h3: 'Lokale Einstellungen (localStorage)',
            paras: [
              'Zur Speicherung deiner Sprach- und Theme-Auswahl (Hell/Dunkel) verwendet die Seite den lokalen Speicher deines Browsers (localStorage). Diese Angaben verbleiben ausschließlich auf deinem Gerät, werden nicht an uns oder Dritte übertragen und dienen allein deinem Bedienkomfort. Du kannst sie jederzeit über deine Browser-Einstellungen löschen.',
            ],
          },
          {
            h3: 'Schriften',
            paras: [
              'Schriftarten werden lokal vom Server dieser Website ausgeliefert. Es besteht keine Verbindung zu externen Anbietern wie Google Fonts; entsprechend werden hierfür keine Daten an Dritte übertragen.',
            ],
          },
          {
            h3: 'Server-Logfiles & Hosting',
            paras: [
              {
                pre: 'Diese Website wird bei Google Firebase Hosting gehostet (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Beim Aufruf der Website verarbeitet der Hosting-Provider technisch notwendige Zugriffsdaten (z. B. IP-Adresse, Datum/Uhrzeit, abgerufene Datei, Browsertyp) zur Auslieferung der Seite sowie zur Gewährleistung von Stabilität und Sicherheit. Rechtsgrundlage ist das berechtigte Interesse an einem sicheren Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Eine Übermittlung in die USA kann nicht ausgeschlossen werden; sie stützt sich auf die Standardvertragsklauseln der EU-Kommission. Details unter ',
                linkHref: 'https://firebase.google.com/support/privacy',
                linkLabel: 'firebase.google.com/support/privacy',
                post: '.',
              },
            ],
          },
          {
            h3: 'Kontaktaufnahme',
            paras: [
              'Wenn du uns per E-Mail kontaktierst, werden deine Angaben ausschließlich zur Bearbeitung der Anfrage verarbeitet und nicht ohne deine Einwilligung an Dritte weitergegeben (Art. 6 Abs. 1 lit. b und f DSGVO).',
            ],
          },
          {
            h3: 'Deine Rechte',
            paras: [
              'Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Wende dich dazu an die im Impressum genannten Kontaktdaten. Zudem besteht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde.',
            ],
          },
        ],
      },
    ],
  },
};
