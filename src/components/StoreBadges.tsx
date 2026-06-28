import { useI18n } from '../i18n/I18nProvider';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../config/stores';

const badgeHeights = {
  sm: 'h-9 md:h-10',
  md: 'h-11 md:h-12',
  lg: 'h-12 md:h-14',
} as const;

type StoreBadgesProps = {
  size?: keyof typeof badgeHeights;
  className?: string;
};

export function StoreBadges({ size = 'md', className = '' }: StoreBadgesProps) {
  const { t } = useI18n();
  const height = badgeHeights[size];

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.stores.appStoreLabel}
        className="inline-block transition-opacity hover:opacity-85 active:scale-[0.98]"
      >
        <img
          src="/badges/app-store.svg"
          alt=""
          className={`${height} w-auto`}
          loading="lazy"
          decoding="async"
        />
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.stores.googlePlayLabel}
        className="inline-block transition-opacity hover:opacity-85 active:scale-[0.98]"
      >
        <img
          src="/badges/google-play.svg"
          alt=""
          className={`${height} w-auto`}
          loading="lazy"
          decoding="async"
        />
      </a>
    </div>
  );
}
