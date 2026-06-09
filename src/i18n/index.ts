import type { Dict } from '@/i18n/types';
import { en } from '@/i18n/en';
import { de } from '@/i18n/de';

export const dicts = { en, de } satisfies Record<string, Dict>;

export type Locale = keyof typeof dicts;

export const locales = ['en', 'de'] as const satisfies readonly Locale[];

export function getDict(locale: Locale): Dict {
  return dicts[locale];
}

/** Path to the equivalent home page for a given locale. */
export function homePath(locale: Locale): string {
  return locale === 'de' ? '/de' : '/';
}
