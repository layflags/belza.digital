/* Belza Digital — bilingual content model (EN / DE)
   Shared across all three website directions. One source of truth.
   window.BELZA.en / window.BELZA.de  +  window.BELZA.applyLang(lang) helper. */

(function () {
  const META = {
    name: 'Martin Belza',
    company: 'Belza Digital GmbH',
    location: 'Munich, Germany',
    email: 'martin@belza.digital',
    phone: '+49 1520 1776831',
    linkedin: 'linkedin.com/in/martinbelza',
    linkedinUrl: 'https://www.linkedin.com/in/martinbelza',
    github: 'github.com/layflags',
    githubUrl: 'https://github.com/layflags',
  };

  // Tech-stack tokens are identical in both languages.
  const TECH = [
    { label: 'Frontend', items: ['React', 'TypeScript', 'Elm', 'Next.js', 'Web Components'] },
    { label: 'Architecture', items: ['Microfrontends', 'Design Systems', 'Performance', 'Accessibility'] },
    { label: 'Backend & Data', items: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL'] },
    { label: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Vercel', 'CI/CD', 'Monorepo (Lerna)'] },
    { label: 'AI', items: ['LLM-based engineering', 'Agentic workflows (Claude Code, Pencil, Linear, Obsidian)'] },
  ];

  const SIDE = [
    { name: 'NUMISTAR', url: 'numistar.com', href: 'https://numistar.com' },
    { name: 'Spiri Events', url: 'events.amorecura.de', href: 'https://events.amorecura.de' },
    { name: 'num num menu', url: 'numnummenu.com', href: 'https://numnummenu.com' },
  ];

  const EN = {
    meta: META,
    nav: { work: 'Work', services: 'Services', about: 'About', contact: 'Contact', cta: 'Book me', imprint: 'Imprint' },
    hero: {
      status: 'Available for new projects',
      roleLine: 'Frontend Architect · Engineering Lead · UI/UX Engineer',
      headlinePre: 'Frontend architecture that',
      headlineEm: 'scales',
      headlinePost: '— and teams that ship.',
      sub: 'I design and scale high-performance web platforms for enterprises, scale-ups and startups. 20+ years in the field, 90+ projects shipped. Hands-on, end to end.',
      ctaPrimary: 'Book me for a project',
      ctaSecondary: 'See selected work',
    },
    stats: [
      { value: '20+', label: 'years in the field' },
      { value: '90+', label: 'projects delivered' },
      { value: '45+', label: 'clients served' },
      { value: '∞', label: 'curiosity' },
    ],
    servicesHead: 'What I do',
    servicesSub: 'Frontend architecture as the core — leadership, UX and AI as force multipliers.',
    services: [
      { n: '01', title: 'Frontend Architecture', desc: 'Scalable, long-lived architectures for complex web platforms — built for delivery speed and maintainability.' },
      { n: '02', title: 'Microfrontends & Design Systems', desc: 'Modular frontends and multi-brand component libraries that let large teams ship in parallel.' },
      { n: '03', title: 'Performance Engineering', desc: 'Measurable gains in load time, runtime performance and Core Web Vitals across web and e-commerce.' },
      { n: '04', title: 'Developer Experience', desc: 'Monorepos, tooling and CI/CD that make engineering teams faster, calmer and happier.' },
      { n: '05', title: 'AI-Assisted Engineering', desc: 'LLM integration and AI-driven workflows that accelerate prototyping and raise code quality.' },
      { n: '06', title: 'Engineering Leadership', desc: 'Team building, mentoring, technical strategy and stakeholder alignment — as a lead or hands-on.' },
    ],
    workHead: 'Selected work',
    workSub: 'A few engagements that shaped products used by millions.',
    projects: [
      { client: 'BSH Home Appliances', role: 'Lead Frontend Architect', period: '4+ years', desc: 'A new multi-brand frontend architecture for 14 brands across 40 countries. Major gains in DX, scalability and performance for website and e-commerce shop.', tags: ['Next.js', 'GraphQL', 'Multi-brand', 'E-commerce'] },
      { client: 'Telefónica / o2', role: 'Lead Frontend Architect', period: '2 years', desc: 'Greenfield SPA for a data-lake governance platform — architecture, UX and development from the ground up.', tags: ['React', 'Redux', 'Governance', 'SPA'] },
      { client: 'Shore GmbH', role: 'Lead Frontend Architect', period: '3 years', desc: 'Migrated a monolithic Ruby on Rails application into modular, scalable microfrontends and services.', tags: ['Microfrontends', 'Elm', 'TypeScript'] },
      { client: 'gutefrage.net', role: 'Frontend Architect', period: '6 months', desc: "New frontend architecture for one of Germany's biggest online communities. Atomic-Design workshops and team mentoring. Heavy Web Components.", tags: ['Web Components', 'Atomic Design', 'Mentoring'] },
      { client: 'CGPA Europe', role: 'Lead UI/UX Engineer', period: '1 year', desc: 'Mobile-first insurance tariff calculator and digital application flow — designed and delivered end to end.', tags: ['Elm', 'Firebase', 'Mobile-first', 'UI/UX'] },
    ],
    expHead: 'Track record',
    experience: [
      { period: '2015 — now', org: 'Belza Digital GmbH', role: 'Founder & Lead Frontend Architect' },
      { period: '2020 — 2024', org: 'ThankU (Non-Profit)', role: 'Co-Founder & CTO' },
      { period: '2013 — 2014', org: 'Gini GmbH', role: 'VP Engineering' },
      { period: '2010 — 2013', org: 'FriendScout24', role: 'Team Lead Software Development' },
      { period: '2007 — 2010', org: 'Sapient', role: 'Senior Interactive Consultant' },
      { period: '1999 — 2007', org: 'Freelance', role: 'Interactive / Web Developer' },
    ],
    aboutHead: 'About',
    about: [
      'I started in the dot-com era around 1999 — building websites, web apps, online games and interactive media as a freelance interactive designer.',
      'After a computer-science degree and years across agencies, consultancies, enterprises and start-ups — as game designer, interactive consultant, team lead and VP of Engineering — I founded Belza Digital.',
      'Today I work as a hands-on Frontend Architect and Engineering Lead: helping teams design frontend systems that stay fast and maintainable as they grow — and shipping right alongside them.',
    ],
    techHead: 'Tech focus',
    tech: TECH,
    sideHead: 'Side projects',
    sideSub: 'Things I build on my own time.',
    side: [
      { name: 'NUMISTAR', url: 'numistar.com', href: 'https://numistar.com', desc: 'Gallery app for coin collectors. Elm/TypeScript on Supabase/PostgreSQL, deployed on Vercel.' },
      { name: 'Spiri Events', url: 'events.amorecura.de', href: 'https://events.amorecura.de', desc: 'Public spiritual-events calendar for Munich. React/Tailwind with AI-powered content ingestion.' },
      { name: 'num num menu', url: 'numnummenu.com', href: 'https://numnummenu.com', desc: 'SaaS for digital & printable restaurant menus with allergen labeling. Preact/Redux on Firebase.' },
    ],
    testimonial: {
      quote: 'His impressive knowledge in frontend technologies and design techniques left the whole team in excitement. The fundament of our current FE tech stack is just right — not too complex, not too simple — GREAT.',
      author: 'Michael Maretzke',
      role: 'CEO, gutefrage.net',
    },
    contactHead: "Let's make your project a success.",
    contactSub: 'Available for frontend-architecture and engineering-lead engagements. Remote or Munich-based.',
    contactCta: 'Write me an email',
    footerNote: 'Frontend Architect & Engineering Lead',
    langName: 'EN',
  };

  const DE = {
    meta: META,
    nav: { work: 'Projekte', services: 'Leistungen', about: 'Über mich', contact: 'Kontakt', cta: 'Anfragen', imprint: 'Impressum' },
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
      { n: '01', title: 'Frontend-Architektur', desc: 'Skalierbare, langlebige Architekturen für komplexe Web-Plattformen — auf Liefertempo und Wartbarkeit ausgelegt.' },
      { n: '02', title: 'Microfrontends & Design-Systeme', desc: 'Modulare Frontends und Multi-Brand-Komponentenbibliotheken, mit denen große Teams parallel liefern.' },
      { n: '03', title: 'Performance-Engineering', desc: 'Messbare Gewinne bei Ladezeit, Laufzeit-Performance und Core Web Vitals — Web wie E-Commerce.' },
      { n: '04', title: 'Developer Experience', desc: 'Monorepos, Tooling und CI/CD, die Entwicklungsteams schneller, ruhiger und zufriedener machen.' },
      { n: '05', title: 'KI-gestützte Entwicklung', desc: 'LLM-Integration und KI-getriebene Workflows, die Prototyping beschleunigen und Code-Qualität heben.' },
      { n: '06', title: 'Engineering Leadership', desc: 'Teamaufbau, Mentoring, technische Strategie und Stakeholder-Alignment — als Lead oder hands-on.' },
    ],
    workHead: 'Ausgewählte Projekte',
    workSub: 'Einige Engagements, die Produkte für Millionen geprägt haben.',
    projects: [
      { client: 'BSH Hausgeräte', role: 'Lead Frontend-Architekt', period: '4+ Jahre', desc: 'Eine neue Multi-Brand-Frontend-Architektur für 14 Marken in 40 Ländern. Deutliche Gewinne bei DX, Skalierbarkeit und Performance für Website und E-Commerce-Shop.', tags: ['Next.js', 'GraphQL', 'Multi-Brand', 'E-Commerce'] },
      { client: 'Telefónica / o2', role: 'Lead Frontend-Architekt', period: '2 Jahre', desc: 'Greenfield-SPA für eine Data-Lake-Governance-Plattform — Architektur, UX und Entwicklung von Grund auf.', tags: ['React', 'Redux', 'Governance', 'SPA'] },
      { client: 'Shore GmbH', role: 'Lead Frontend-Architekt', period: '3 Jahre', desc: 'Migration einer monolithischen Ruby-on-Rails-Anwendung in modulare, skalierbare Microfrontends und Services.', tags: ['Microfrontends', 'Elm', 'TypeScript'] },
      { client: 'gutefrage.net', role: 'Frontend-Architekt', period: '6 Monate', desc: 'Neue Frontend-Architektur für eine der größten Online-Communitys Deutschlands. Atomic-Design-Workshops und Team-Mentoring. Intensiver Einsatz von Web Components.', tags: ['Web Components', 'Atomic Design', 'Mentoring'] },
      { client: 'CGPA Europe', role: 'Lead UI/UX-Engineer', period: '1 Jahr', desc: 'Mobile-first Versicherungs-Tarifrechner und digitale Antragsstrecke — durchgängig konzipiert und umgesetzt.', tags: ['Elm', 'Firebase', 'Mobile-first', 'UI/UX'] },
    ],
    expHead: 'Werdegang',
    experience: [
      { period: '2015 — heute', org: 'Belza Digital GmbH', role: 'Gründer & Lead Frontend-Architekt' },
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
      { name: 'NUMISTAR', url: 'numistar.com', href: 'https://numistar.com', desc: 'Galerie-App für Münzsammler. Elm/TypeScript auf Supabase/PostgreSQL, deployed auf Vercel.' },
      { name: 'Spiri Events', url: 'events.amorecura.de', href: 'https://events.amorecura.de', desc: 'Öffentlicher Kalender für spirituelle Events in München. React/Tailwind mit KI-gestützter Content-Pflege.' },
      { name: 'num num menu', url: 'numnummenu.com', href: 'https://numnummenu.com', desc: 'SaaS für digitale & druckbare Restaurant-Menüs mit Allergen-Kennzeichnung. Preact/Redux auf Firebase.' },
    ],
    testimonial: {
      quote: 'Sein beeindruckendes Wissen über Frontend-Technologien und Design-Techniken hat das ganze Team begeistert. Das Fundament unseres heutigen FE-Tech-Stacks ist genau richtig — nicht zu komplex, nicht zu simpel — GROSSARTIG.',
      author: 'Michael Maretzke',
      role: 'CEO, gutefrage.net',
    },
    contactHead: 'Machen wir Ihr Projekt zum Erfolg.',
    contactSub: 'Verfügbar für Engagements als Frontend-Architekt und Engineering Lead. Remote oder vor Ort in München.',
    contactCta: 'Schreiben Sie mir eine E-Mail',
    footerNote: 'Frontend-Architekt & Engineering Lead',
    langName: 'DE',
  };

  window.BELZA = { en: EN, de: DE };
})();
