import { SITE_URL } from './site';

export const OG_IMAGE = `${SITE_URL}/images/hero-phone.png`;
export const OG_IMAGE_WIDTH = '788';
export const OG_IMAGE_HEIGHT = '1400';
export const SITE_NAME = 'Trtkat';

/** Intent clusters — long-tail fráze pro obsah a metadata (ne keyword stuffing). */
export const SEO_KEYWORDS_CS = [
  'aplikace pro rande a party',
  'offline život',
  'mapa akcí a party',
  'romantická místa',
  'Bolt Uber navigace',
  'rezervace hotelu',
  'seznamování 18+',
  'alternativa tinderu',
  'sexuální výchova',
  'osvěta seznamování',
] as const;

export const SEO_KEYWORDS_EN = [
  'offline life app',
  'dates parties events',
  'event map app',
  'romantic spots',
  'Bolt Uber navigation',
  'hotel booking',
  'dating app 18+',
  'tinder alternative',
  'sexual education',
  'meetup app',
] as const;
