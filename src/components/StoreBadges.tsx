import { useI18n } from '../i18n/I18nProvider';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../config/stores';

const badgeHeights = {
  sm: 'h-9 md:h-10',
  md: 'h-11 md:h-12',
  lg: 'h-11 sm:h-12 md:h-14',
} as const;

type StoreBadgesProps = {
  size?: keyof typeof badgeHeights;
  layout?: 'row' | 'stack';
  className?: string;
};

export function StoreBadges({ size = 'md', layout = 'row', className = '' }: StoreBadgesProps) {
  const { t } = useI18n();
  const height = badgeHeights[size];
  const layoutClass =
    layout === 'stack'
      ? 'flex-col items-stretch sm:flex-row sm:items-center'
      : 'flex-row flex-wrap items-center';

  return (
    <div className={`flex gap-3 ${layoutClass} ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.stores.appStoreLabel}
        className={`inline-flex justify-center transition-opacity hover:opacity-85 active:scale-[0.98] ${
          layout === 'stack' ? 'w-full sm:w-auto' : ''
        }`}
      >
        <img
          src="/badges/app-store.svg"
          alt=""
          className={`${height} w-auto max-w-full`}
          loading="lazy"
          decoding="async"
        />
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.stores.googlePlayLabel}
        className={`inline-flex justify-center transition-opacity hover:opacity-85 active:scale-[0.98] ${
          layout === 'stack' ? 'w-full sm:w-auto' : ''
        }`}
      >
        <img
          src="/badges/google-play.svg"
          alt=""
          className={`${height} w-auto max-w-full`}
          loading="lazy"
          decoding="async"
        />
      </a>
    </div>
  );
}
