import { useEffect } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { SITE_URL } from '../config/site';
import { OG_IMAGE, SITE_NAME } from '../config/seo';

type SEOProps = {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
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

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function SEO({ title, description, path = '/', type = 'website', jsonLd, noindex }: SEOProps) {
  const { locale } = useI18n();
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const ogLocale = locale === 'en' ? 'en_GB' : 'cs_CZ';

  useEffect(() => {
    document.title = title;

    setMeta('description', description);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('googlebot', noindex ? 'noindex, nofollow' : 'index, follow');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('og:type', type, true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:locale', ogLocale, true);
    setMeta('og:locale:alternate', locale === 'cs' ? 'en_GB' : 'cs_CZ', true);
    setMeta('og:image', OG_IMAGE, true);
    setMeta('og:image:alt', title, true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', OG_IMAGE);

    setJsonLd(jsonLd);
  }, [title, description, url, type, ogLocale, locale, jsonLd, noindex]);

  return null;
}
