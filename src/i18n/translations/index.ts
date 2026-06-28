import { cs } from './cs';
import { en } from './en';
import type { Locale } from '../detectLocale';
import type { SiteCopy } from './types';

export type { SiteCopy, StatCategory, ChartCategory, TimelineItem } from './types';

export const translations: Record<Locale, SiteCopy> = { cs, en };

export function getCopy(locale: Locale): SiteCopy {
  return translations[locale];
}
