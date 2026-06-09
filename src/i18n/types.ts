// One shared shape for both language dictionaries. Because `en` and `de` are
// both typed as `Dict`, a missing or misspelled key in either language becomes
// a compile-time error — this is the guard against EN/DE drift.

export interface Meta {
  name: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  linkedinUrl: string;
  github: string;
  githubUrl: string;
}

export interface TechGroup {
  label: string;
  items: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Service {
  n: string;
  title: string;
  desc: string;
}

export interface Project {
  client: string;
  role: string;
  period: string;
  desc: string;
  tags: string[];
}

export interface ExperienceEntry {
  period: string;
  org: string;
  role: string;
}

export interface SideProject {
  name: string;
  url: string;
  href: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Nav {
  work: string;
  services: string;
  about: string;
  contact: string;
  cta: string;
  imprint: string;
}

export interface Hero {
  status: string;
  roleLine: string;
  headlinePre: string;
  headlineEm: string;
  headlinePost: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface ThemeLabels {
  auto: string;
  light: string;
  dark: string;
}

export interface Dict {
  meta: Meta;
  nav: Nav;
  hero: Hero;
  stats: Stat[];
  servicesHead: string;
  servicesSub: string;
  services: Service[];
  workHead: string;
  workSub: string;
  projects: Project[];
  expHead: string;
  experience: ExperienceEntry[];
  aboutHead: string;
  about: string[];
  techHead: string;
  tech: TechGroup[];
  sideHead: string;
  sideSub: string;
  side: SideProject[];
  testimonial: Testimonial;
  contactHead: string;
  contactSub: string;
  contactCta: string;
  footerNote: string;
  langName: string;
  theme: ThemeLabels;
}
