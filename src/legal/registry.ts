import type { Locale } from '../i18n/detectLocale';

export type LegalSlug =
  | 'privacy'
  | 'terms'
  | 'community-guidelines'
  | 'account-deletion'
  | 'support'
  | 'child-safety'
  | 'moderation'
  | 'security'
  | 'cookies';

export type LegalPageMeta = {
  slug: LegalSlug;
  title: { cs: string; en: string };
  metaDescription: { cs: string; en: string };
  hasForm?: boolean;
  enAvailable: boolean;
};

export const LEGAL_PAGES: LegalPageMeta[] = [
  {
    slug: 'privacy',
    title: { cs: 'Zásady ochrany osobních údajů', en: 'Privacy Policy' },
    metaDescription: {
      cs: 'Zásady ochrany osobních údajů aplikace Trtkat. Provozovatelé Ondřej Krejčí a Marek Hlava. GDPR, data, smazání účtu. Pouze 18+.',
      en: 'Trtkat Privacy Policy. Joint controllers Ondřej Krejčí and Marek Hlava. GDPR, data processing, account deletion. Adults 18+ only.',
    },
    enAvailable: true,
  },
  {
    slug: 'terms',
    title: { cs: 'Podmínky používání', en: 'Terms of Service' },
    metaDescription: {
      cs: 'Podmínky používání aplikace Trtkat. Pravidla účtu, chatu, fotek a moderace. Aplikace pouze pro dospělé 18+.',
      en: 'Trtkat Terms of Service. Account rules, chat, photos and moderation. Adults 18+ only.',
    },
    enAvailable: true,
  },
  {
    slug: 'community-guidelines',
    title: { cs: 'Pravidla komunity', en: 'Community Guidelines' },
    metaDescription: {
      cs: 'Pravidla komunity Trtkat. Respekt, souhlas, zákaz obtěžování a falešných profilů. Pouze 18+.',
      en: 'Trtkat Community Guidelines. Respect, consent, no harassment or fake profiles. Adults 18+ only.',
    },
    enAvailable: true,
  },
  {
    slug: 'account-deletion',
    title: { cs: 'Smazání účtu', en: 'Account Deletion' },
    metaDescription: {
      cs: 'Jak smazat účet Trtkat v aplikaci nebo přes web. Lhůta smazání do 30 dnů. Kontakt privacy@trtkat.cz.',
      en: 'How to delete your Trtkat account in the app or on the web. Deletion within 30 days. Contact privacy@trtkat.cz.',
    },
    hasForm: true,
    enAvailable: true,
  },
  {
    slug: 'support',
    title: { cs: 'Podpora', en: 'Support' },
    metaDescription: {
      cs: 'Kontakt na podporu Trtkat. support@trtkat.cz, privacy@trtkat.cz, safety@trtkat.cz. Reakční doby a co uvést do požadavku.',
      en: 'Trtkat support contacts. support@trtkat.cz, privacy@trtkat.cz, safety@trtkat.cz. Response times and what to include.',
    },
    enAvailable: true,
  },
  {
    slug: 'child-safety',
    title: { cs: 'Ochrana dětí', en: 'Child Safety Standards' },
    metaDescription: {
      cs: 'Standardy ochrany dětí Trtkat. Pouze 18+, nulová tolerance CSAM/CSEA. Hlášení na safety@trtkat.cz.',
      en: 'Trtkat child safety standards. Adults 18+ only, zero tolerance for CSAM/CSEA. Report to safety@trtkat.cz.',
    },
    enAvailable: true,
  },
  {
    slug: 'moderation',
    title: { cs: 'Moderace obsahu', en: 'Moderation Policy' },
    metaDescription: {
      cs: 'Moderační politika Trtkat. Reporty, blokace, zásahy a odvolání. DSA kontakt dsa@trtkat.cz.',
      en: 'Trtkat moderation policy. Reports, blocks, enforcement and appeals. DSA contact dsa@trtkat.cz.',
    },
    enAvailable: true,
  },
  {
    slug: 'security',
    title: { cs: 'Bezpečnost', en: 'Security Policy' },
    metaDescription: {
      cs: 'Bezpečnostní politika Trtkat. HTTPS, hashování hesel, ochrana fotek a polohy. Hlášení na security@trtkat.cz.',
      en: 'Trtkat security policy. HTTPS, password hashing, photo and location protection. Report to security@trtkat.cz.',
    },
    enAvailable: true,
  },
  {
    slug: 'cookies',
    title: { cs: 'Zásady cookies', en: 'Cookie Policy' },
    metaDescription: {
      cs: 'Zásady cookies Trtkat. Nezbytné, analytické a marketingové cookies. Správa souhlasů.',
      en: 'Trtkat Cookie Policy. Essential, analytics and marketing cookies. Consent management.',
    },
    enAvailable: true,
  },
];

const csModules = import.meta.glob<string>('./cs/*.md', { query: '?raw', import: 'default', eager: true });
const enModules = import.meta.glob<string>('./en/*.md', { query: '?raw', import: 'default', eager: true });

export function getLegalPage(slug: LegalSlug, locale: Locale): { meta: LegalPageMeta; content: string } | null {
  const meta = LEGAL_PAGES.find((page) => page.slug === slug);
  if (!meta) return null;

  const useEn = locale === 'en' && meta.enAvailable;
  const modules = useEn ? enModules : csModules;
  const path = useEn ? `./en/${slug}.md` : `./cs/${slug}.md`;
  const content = modules[path];
  if (!content) return null;

  return { meta, content };
}

export function getLegalPath(slug: LegalSlug, locale: Locale): string {
  return locale === 'en' && LEGAL_PAGES.find((p) => p.slug === slug)?.enAvailable
    ? `/en/${slug}`
    : `/${slug}`;
}

export function isLegalSlug(value: string): value is LegalSlug {
  return LEGAL_PAGES.some((page) => page.slug === value);
}

/** Legacy Czech URLs → new canonical paths */
export const LEGACY_LEGAL_REDIRECTS: Record<string, string> = {
  '/ochrana-soukromi': '/privacy',
  '/podminky': '/terms',
  '/kontakt': '/support',
};
