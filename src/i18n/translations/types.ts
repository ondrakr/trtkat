export type StatItem = { value: string; title: string; desc: string };
export type StatCategory = {
  key: string;
  label: string;
  title: string;
  stats: StatItem[];
};
export type ChartCategory = {
  title: string;
  subtitle: string;
  suffix: string;
  data: { label: string; value: number }[];
};
export type TimelineItem = { period: string; label: string; value: string };

export type LegalSection = { heading?: string; paragraphs: string[] };

export type SiteCopy = {
  meta: { title: string; description: string };
  nav: {
    about: string;
    stats: string;
    ethics: string;
    features: string;
    science: string;
    benefits: string;
    download: string;
    blog: string;
  };
  stores: {
    appStoreLabel: string;
    googlePlayLabel: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    statsLink: string;
    imageAlt: string;
  };
  how: {
    title: string;
    subtitle: string;
    steps: Array<{ title: string; bodyMobile: string; bodyDesktop: string }>;
  };
  data: {
    title: string;
    introMobile: string;
    introDesktop: string;
    compareHint: string;
    timelineTitle: string;
    timelineAccordion: string;
    tooltipValue: string;
    statCategories: StatCategory[];
    charts: Record<string, ChartCategory>;
    timeline: TimelineItem[];
  };
  benefits: {
    title: string;
    titleAccent: string;
    introMobile: string;
    introDesktop: string;
    items: Array<{ title: string; desc: string }>;
  };
  trust: {
    title: string;
    quote: string;
    author: string;
    imageAlt: string;
    items: Array<{ title: string; bodyMobile: string; bodyDesktop: string }>;
  };
  cta: {
    title: string;
    bodyMobile: string;
    bodyDesktop: string;
    footnote: string;
  };
  footer: {
    offer: string;
    howItWorks: string;
    stats: string;
    safety: string;
    download: string;
    blog: string;
    legal: string;
    privacy: string;
    terms: string;
    contact: string;
    followUs: string;
    copyright: string;
  };
  legal: {
    privacy: { title: string; metaDescription: string; sections: LegalSection[] };
    terms: { title: string; metaDescription: string; sections: LegalSection[] };
    contact: { title: string; metaDescription: string; sections: LegalSection[]; emailPlaceholder: string };
  };
  blog: {
    title: string;
    metaDescription: string;
    subtitle: string;
    readMore: string;
    backToBlog: string;
    backHome: string;
  };
};
