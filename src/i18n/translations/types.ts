export type StatItem = { value: string; title: string; desc: string };
export type StatCategory = {
  key: string;
  label: string;
  title: string;
  insight?: string;
  stats: StatItem[];
};
export type ChartDataPoint = {
  label: string;
  value?: number;
  women?: number;
  men?: number;
};
export type ChartCategory = {
  title: string;
  subtitle: string;
  suffix: string;
  type?: 'simple' | 'grouped';
  seriesLabels?: { women: string; men: string };
  data: ChartDataPoint[];
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
    imageAlt: string;
  };
  how: {
    title: string;
    subtitle: string;
    steps: Array<{ title: string; bodyMobile: string; bodyDesktop: string }>;
  };
  features: {
    title: string;
    subtitle: string;
    introMobile: string;
    introDesktop: string;
    items: Array<{ title: string; bodyMobile: string; bodyDesktop: string }>;
  };
  data: {
    title: string;
    introMobile: string;
    introDesktop: string;
    compareHint: string;
    timelineTitle: string;
    timelineAccordion: string;
    tooltipValue: string;
    sourceLabel: string;
    sourceText: string;
    womenLabel: string;
    menLabel: string;
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
  about: {
    title: string;
    bodyMobile: string;
    bodyDesktop: string;
  };
  cta: {
    title: string;
    bodyMobile: string;
    bodyDesktop: string;
    footnote: string;
  };
  comingSoon: {
    title: string;
    badge: string;
    heading: string;
    body: string;
    emailLabel: string;
    emailPlaceholder: string;
    submitButton: string;
    successTitle: string;
    successBody: string;
    privacyNote: string;
    errors: {
      invalid_email: string;
      submit_failed: string;
      network: string;
    };
    platforms: string;
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
    cookieSettings: string;
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
    loading: string;
  };
  cookies: {
    title: string;
    description: string;
    privacyLink: string;
    acceptAll: string;
    rejectOptional: string;
    customize: string;
    settingsTitle: string;
    necessaryTitle: string;
    necessaryDesc: string;
    alwaysOn: string;
    analyticsTitle: string;
    analyticsDesc: string;
    marketingTitle: string;
    marketingDesc: string;
    saveMinimal: string;
    saveChoices: string;
    settingsLink: string;
  };
};
