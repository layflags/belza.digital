import type { Dict } from '@/i18n/types';
import { META, TECH } from '@/i18n/shared';

export const en: Dict = {
  meta: META,
  nav: {
    work: 'Work',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    cta: 'Book me',
    imprint: 'Imprint',
  },
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
    {
      n: '01',
      title: 'Frontend Architecture',
      desc: 'Scalable, long-lived architectures for complex web platforms — built for delivery speed and maintainability.',
    },
    {
      n: '02',
      title: 'Microfrontends & Design Systems',
      desc: 'Modular frontends and multi-brand component libraries that let large teams ship in parallel.',
    },
    {
      n: '03',
      title: 'Performance Engineering',
      desc: 'Measurable gains in load time, runtime performance and Core Web Vitals across web and e-commerce.',
    },
    {
      n: '04',
      title: 'Developer Experience',
      desc: 'Monorepos, tooling and CI/CD that make engineering teams faster, calmer and happier.',
    },
    {
      n: '05',
      title: 'AI-Assisted Engineering',
      desc: 'LLM integration and AI-driven workflows that accelerate prototyping and raise code quality.',
    },
    {
      n: '06',
      title: 'Engineering Leadership',
      desc: 'Team building, mentoring, technical strategy and stakeholder alignment — as a lead or hands-on.',
    },
  ],
  workHead: 'Selected work',
  workSub: 'A few engagements that shaped products used by millions.',
  projects: [
    {
      client: 'BSH Home Appliances',
      role: 'Lead Frontend Architect',
      period: '4+ years',
      desc: 'A new multi-brand frontend architecture for 14 brands across 40 countries. Major gains in DX, scalability and performance for website and e-commerce shop.',
      tags: ['Next.js', 'GraphQL', 'Multi-brand', 'E-commerce'],
    },
    {
      client: 'Telefónica / o2',
      role: 'Lead Frontend Architect',
      period: '2 years',
      desc: 'Greenfield SPA for a data-lake governance platform — architecture, UX and development from the ground up.',
      tags: ['React', 'Redux', 'Governance', 'SPA'],
    },
    {
      client: 'Shore GmbH',
      role: 'Lead Frontend Architect',
      period: '3 years',
      desc: 'Migrated a monolithic Ruby on Rails application into modular, scalable microfrontends and services.',
      tags: ['Microfrontends', 'Elm', 'TypeScript'],
    },
    {
      client: 'gutefrage.net',
      role: 'Frontend Architect',
      period: '6 months',
      desc: "New frontend architecture for one of Germany's biggest online communities. Atomic-Design workshops and team mentoring. Heavy Web Components.",
      tags: ['Web Components', 'Atomic Design', 'Mentoring'],
    },
    {
      client: 'CGPA Europe',
      role: 'Lead UI/UX Engineer',
      period: '1 year',
      desc: 'Mobile-first insurance tariff calculator and digital application flow — designed and delivered end to end.',
      tags: ['Elm', 'Firebase', 'Mobile-first', 'UI/UX'],
    },
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
    {
      name: 'NUMISTAR',
      url: 'numistar.com',
      href: 'https://numistar.com',
      desc: 'Gallery app for coin collectors. Elm/TypeScript on Supabase/PostgreSQL, deployed on Vercel.',
    },
    {
      name: 'Spiri Events',
      url: 'events.amorecura.de',
      href: 'https://events.amorecura.de',
      desc: 'Public spiritual-events calendar for Munich. React/Tailwind with AI-powered content ingestion.',
    },
    {
      name: 'num num menu',
      url: 'numnummenu.com',
      href: 'https://numnummenu.com',
      desc: 'SaaS for digital & printable restaurant menus with allergen labeling. Preact/Redux on Firebase.',
    },
  ],
  testimonial: {
    quote:
      'His impressive knowledge in frontend technologies and design techniques left the whole team in excitement. The fundament of our current FE tech stack is just right — not too complex, not too simple — GREAT.',
    author: 'Michael Maretzke',
    role: 'CEO, gutefrage.net',
  },
  contactHead: "Let's make your project a success.",
  contactSub:
    'Available for frontend-architecture and engineering-lead engagements. Remote or Munich-based.',
  contactCta: 'Write me an email',
  footerNote: 'Frontend Architect & Engineering Lead',
  langName: 'EN',
  theme: { auto: 'Auto', light: 'Light', dark: 'Dark' },
  imprint: {
    title: 'Imprint — Belza Digital GmbH',
    back: 'Back',
    city: 'Munich',
    footerHome: 'Home',
    kicker: 'Belza Digital GmbH',
    h1: 'Imprint',
    intro:
      'Information pursuant to § 5 DDG (German Digital Services Act), together with legal notices and privacy information.',
    authoritativeNote:
      'This English imprint is a courtesy translation. The German version at /de/impressum is legally authoritative.',
    providerHead: 'Provider',
    rows: [
      { k: 'Company', v: 'Belza Digital GmbH', big: true },
      { k: 'Address', lines: ['Amalienstraße 71, RGB2', '80799 Munich, Germany'] },
      { k: 'Managing Director', v: 'Martin Belza (authorized to represent)' },
      { k: 'Phone', v: '+49 (0)89 92927721' },
      { k: 'Fax', v: '+49 (0)3222 3944878' },
      { k: 'E-mail', email: 'hello@belza.digital' },
      { k: 'Register Court', v: 'Munich Local Court (Amtsgericht München)' },
      { k: 'Registration Number', v: 'HRB 222344' },
      { k: 'VAT ID (§ 27a UStG)', v: 'DE303717499' },
      { k: 'Tax Number', v: '143/119/61455' },
      { k: 'Responsible for content', v: 'Martin Belza (§ 18 (2) MStV, address as above)' },
    ],
    sections: [
      {
        h2: 'Legal Notices',
        subsections: [
          {
            h3: '§ 1 Liability for content',
            paras: [
              'The content of this website is created with the greatest possible care. However, no guarantee is given for the accuracy, completeness and timeliness of the content. Use of the content is at your own risk. Mere use of the website does not establish any contractual relationship between the user and the provider.',
            ],
          },
          {
            h3: '§ 2 External links',
            paras: [
              'This website contains links to third-party websites ("external links"). These websites are the responsibility of their respective operators. At the time the links were created, no legal violations were apparent. The provider has no influence on the current or future design of the linked pages. Should any legal violations become known, such links will be removed without delay.',
            ],
          },
          {
            h3: '§ 3 Copyright and ancillary copyright',
            paras: [
              'The content published on this website is subject to German copyright and ancillary copyright law. Any use not permitted by law requires the prior written consent of the provider or rights holder. This applies in particular to reproduction, editing, translation, storage, processing and reproduction in electronic systems. Copies and downloads for personal, private and non-commercial use are permitted.',
            ],
          },
        ],
      },
      {
        h2: 'Privacy',
        subsections: [
          {
            h3: 'Overview',
            paras: [
              'This website is a static site and deliberately does without tracking, analytics tools and advertising cookies. No profiling takes place. The controller within the meaning of the GDPR is Belza Digital GmbH, as named in the imprint.',
            ],
          },
          {
            h3: 'Local settings (localStorage)',
            paras: [
              'To store your language and theme choice (light/dark), the site uses your browser’s local storage (localStorage). This information remains exclusively on your device, is not transmitted to us or any third party, and serves solely your convenience. You can delete it at any time via your browser settings.',
            ],
          },
          {
            h3: 'Fonts',
            paras: [
              'Fonts are served locally from this website’s own server. There is no connection to external providers such as Google Fonts; accordingly, no data is transmitted to third parties for this purpose.',
            ],
          },
          {
            h3: 'Server log files & hosting',
            paras: [
              {
                pre: 'This website is hosted by Google Firebase Hosting (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland). When the website is accessed, the hosting provider processes technically necessary access data (e.g. IP address, date/time, file requested, browser type) in order to deliver the page and to ensure stability and security. The legal basis is the legitimate interest in secure operation (Art. 6(1)(f) GDPR). A transfer to the USA cannot be ruled out; it is based on the European Commission’s standard contractual clauses. Details at ',
                linkHref: 'https://firebase.google.com/support/privacy',
                linkLabel: 'firebase.google.com/support/privacy',
                post: '.',
              },
            ],
          },
          {
            h3: 'Contacting us',
            paras: [
              'If you contact us by e-mail, your information will be processed solely to handle your request and will not be passed on to third parties without your consent (Art. 6(1)(b) and (f) GDPR).',
            ],
          },
          {
            h3: 'Your rights',
            paras: [
              'You have the right at any time to access, rectification, erasure, restriction of processing, data portability and objection. To exercise these rights, please use the contact details given in the imprint. You also have the right to lodge a complaint with a data protection supervisory authority.',
            ],
          },
        ],
      },
    ],
  },
};
