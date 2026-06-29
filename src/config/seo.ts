import { SITE_URL } from './site';

export const OG_IMAGE = `${SITE_URL}/images/hero-phone.png`;
export const OG_IMAGE_WIDTH = '788';
export const OG_IMAGE_HEIGHT = '1400';
export const SITE_NAME = 'Trtkat';

/** Intent clusters — long-tail fráze pro obsah a metadata (ne keyword stuffing). */
export const SEO_KEYWORDS_CS = [
  'seznamovací aplikace zdarma',
  'nezávazné seznamování',
  'seznamka pro studenty',
  'flirt bez závazků',
  'bezpečné seznámení',
  'alternativa tinderu',
  'sexuální výchova',
  'osvěta seznamování',
  'casual dating česko',
] as const;

export const SEO_KEYWORDS_EN = [
  'free dating app',
  'casual dating app',
  'low pressure dating',
  'student dating app',
  'safe dating app',
  'tinder alternative',
  'sexual education',
  'meetup app',
] as const;
