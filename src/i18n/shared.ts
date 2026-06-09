// Language-agnostic data shared by both dictionaries — single source of truth
// for company metadata and the tech-stack tokens (identical in EN and DE).
import type { Meta, TechGroup } from './types';

export const META: Meta = {
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
export const TECH: TechGroup[] = [
  { label: 'Frontend', items: ['React', 'TypeScript', 'Elm', 'Next.js', 'Web Components'] },
  {
    label: 'Architecture',
    items: ['Microfrontends', 'Design Systems', 'Performance', 'Accessibility'],
  },
  { label: 'Backend & Data', items: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL'] },
  { label: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Vercel', 'CI/CD', 'Monorepo (Lerna)'] },
  {
    label: 'AI',
    items: ['LLM-based engineering', 'Agentic workflows (Claude Code, Pencil, Linear, Obsidian)'],
  },
];
