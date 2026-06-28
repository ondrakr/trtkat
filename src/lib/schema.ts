import { SITE_URL } from '../config/site';
import { OG_IMAGE, SITE_NAME } from '../config/seo';
import { SOCIAL_LINKS } from '../config/social';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../config/stores';
import type { SiteCopy } from '../i18n/translations/types';

export function buildOrganizationSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/logo%20trtkat.svg`,
    description,
    sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook, SOCIAL_LINKS.tiktok],
  };
}

export function buildWebSiteSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description,
    inLanguage: ['cs-CZ', 'en'],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildMobileAppSchema(t: SiteCopy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: SITE_NAME,
    operatingSystem: 'iOS, Android',
    applicationCategory: 'SocialNetworkingApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CZK',
    },
    description: t.meta.description,
    downloadUrl: [APP_STORE_URL, GOOGLE_PLAY_URL],
    installUrl: [APP_STORE_URL, GOOGLE_PLAY_URL],
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: 18,
      audienceType: 'Students',
    },
  };
}

export function buildFAQSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildArticleSchema(post: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: OG_IMAGE,
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
        url: `${SITE_URL}/logo/logo%20trtkat.svg`,
      },
    },
    mainEntityOfPage: `${SITE_URL}${post.path}`,
  };
}

export function buildLandingSchemas(t: SiteCopy) {
  return [
    buildOrganizationSchema(t.meta.description),
    buildWebSiteSchema(t.meta.description),
    buildMobileAppSchema(t),
    buildFAQSchema(t.faq.items),
  ];
}
