import type { Dict } from '@/i18n/types';
import type { Locale } from '@/i18n';
import { META } from '@/i18n/shared';

/** Build the schema.org @graph for the home page (Person + Organization + WebSite). */
export function buildHomeJsonLd(locale: Locale, t: Dict, siteUrl: string): object[] {
  const base = siteUrl.replace(/\/$/, '');
  const personId = `${base}/#martin`;
  const orgId = `${base}/#org`;
  const knowsAbout = t.tech.flatMap((g) => g.items);

  return [
    {
      '@type': 'Person',
      '@id': personId,
      name: META.name,
      jobTitle: t.footerNote,
      description: t.hero.sub,
      url: `${base}/`,
      email: META.email,
      sameAs: [META.githubUrl, META.linkedinUrl],
      worksFor: { '@id': orgId },
      knowsAbout,
    },
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': orgId,
      name: META.company,
      url: `${base}/`,
      founder: { '@id': personId },
      email: 'hello@belza.digital',
      areaServed: locale === 'de' ? 'Weltweit' : 'Worldwide',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Amalienstraße 71',
        postalCode: '80799',
        addressLocality: 'München',
        addressCountry: 'DE',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      url: `${base}/`,
      name: 'Belza Digital',
      inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
      publisher: { '@id': orgId },
    },
  ];
}
