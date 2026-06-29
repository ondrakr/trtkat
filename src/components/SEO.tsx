import { useEffect } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { SITE_URL } from '../config/site';
import { OG_IMAGE, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SEO_KEYWORDS_CS, SEO_KEYWORDS_EN, SITE_NAME } from '../config/seo';

type SEOProps = {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setJsonLd(data: Record<string, unknown> | Record<string, unknown>[] | undefined) {
  const id = 'trtkat-jsonld';
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  if (!data) return;

  const payload = Array.isArray(data)
    ? {
        '@context': 'https://schema.org',
        '@graph': data.map(({ '@context': _ctx, ...node }) => node),
      }
    : data;

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(payload);
  document.head.appendChild(script);
}

function setLink(rel: string, href: string, attrs: Record<string, string> = {}) {
  const selector = `link[rel="${rel}"]${attrs.hreflang ? `[hreflang="${attrs.hreflang}"]` : ''}`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
  Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value));
}

export function SEO({
  title,
  description,
  path = '/',
  type = 'website',
  publishedTime,
  modifiedTime,
  jsonLd,
  noindex,
}: SEOProps) {
  const { locale } = useI18n();
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const ogLocale = locale === 'en' ? 'en_GB' : 'cs_CZ';
  const contentLanguage = locale === 'en' ? 'en' : 'cs';
  const keywords = (locale === 'en' ? SEO_KEYWORDS_EN : SEO_KEYWORDS_CS).join(', ');

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = locale;

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('content-language', contentLanguage);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('googlebot', noindex ? 'noindex, nofollow' : 'index, follow');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    setLink('alternate', `${SITE_URL}/`, { hreflang: 'cs' });
    setLink('alternate', `${SITE_URL}/`, { hreflang: 'x-default' });
    if (locale === 'en') {
      setLink('alternate', url, { hreflang: 'en' });
    }

    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('og:type', type, true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:locale', ogLocale, true);
    if (locale === 'cs') {
      setMeta('og:locale:alternate', 'en_GB', true);
    } else {
      setMeta('og:locale:alternate', 'cs_CZ', true);
    }
    setMeta('og:image', OG_IMAGE, true);
    setMeta('og:image:width', OG_IMAGE_WIDTH, true);
    setMeta('og:image:height', OG_IMAGE_HEIGHT, true);
    setMeta('og:image:alt', title, true);

    if (type === 'article' && publishedTime) {
      setMeta('article:published_time', publishedTime, true);
      if (modifiedTime) {
        setMeta('article:modified_time', modifiedTime, true);
      }
    }

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', OG_IMAGE);

    setJsonLd(jsonLd);
  }, [title, description, url, type, publishedTime, modifiedTime, ogLocale, locale, jsonLd, noindex, contentLanguage, keywords]);

  return null;
}
