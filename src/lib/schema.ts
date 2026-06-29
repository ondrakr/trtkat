import { SITE_URL } from '../config/site';
import { OG_IMAGE, SITE_NAME } from '../config/seo';
import { SOCIAL_LINKS } from '../config/social';
import type { SiteCopy } from '../i18n/translations/types';

export function buildOrganizationSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon/android-chrome-192x192.png`,
    description,
    sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook, SOCIAL_LINKS.tiktok],
  };
}

export function buildWebSiteSchema(description: string, locale: 'cs' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description,
    inLanguage: locale === 'en' ? 'en-GB' : 'cs-CZ',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildMobileAppSchema(t: SiteCopy, locale: 'cs' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: SITE_NAME,
    alternateName: locale === 'cs' ? ['seznamovací aplikace Trtkat', 'seznamka zdarma'] : ['Trtkat dating app', 'free dating app'],
    operatingSystem: 'iOS, Android',
    applicationCategory: 'SocialNetworkingApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: locale === 'cs' ? 'CZK' : 'EUR',
    },
    description: t.meta.description,
    image: OG_IMAGE,
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: 18,
      audienceType: 'Adults',
    },
  };
}

export function buildFAQSchema(t: SiteCopy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.seoFaq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildLandingSchemas(t: SiteCopy, locale: 'cs' | 'en' = 'cs') {
  return [
    buildOrganizationSchema(t.meta.description),
    buildWebSiteSchema(t.meta.description, locale),
    buildMobileAppSchema(t, locale),
    buildFAQSchema(t),
  ];
}

export function buildArticleSchema(
  post: {
    title: string;
    description: string;
    path: string;
    datePublished: string;
    dateModified?: string;
  },
  locale: 'cs' | 'en' = 'cs',
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: OG_IMAGE,
    inLanguage: locale === 'en' ? 'en-GB' : 'cs-CZ',
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon/android-chrome-192x192.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}${post.path}`,
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
}
