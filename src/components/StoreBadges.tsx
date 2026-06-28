import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider';
import { DOWNLOAD_PAGE_PATH } from '../config/stores';

const badgeHeights = {
  sm: 'h-9 md:h-10',
  md: 'h-11 md:h-12',
  lg: 'h-11 sm:h-12 md:h-14',
} as const;

type StoreBadgesProps = {
  size?: keyof typeof badgeHeights;
  layout?: 'row' | 'stack';
  className?: string;
  priority?: boolean;
};

export function StoreBadges({ size = 'md', layout = 'row', className = '', priority = false }: StoreBadgesProps) {
  const { t } = useI18n();
  const height = badgeHeights[size];
  const layoutClass =
    layout === 'stack'
      ? 'flex-col items-stretch sm:flex-row sm:items-center'
      : 'flex-row flex-wrap items-center';

  const badgeClass = `inline-flex justify-center transition-opacity hover:opacity-85 active:scale-[0.98] ${
    layout === 'stack' ? 'w-full sm:w-auto' : ''
  }`;

  return (
    <div className={`flex gap-3 ${layoutClass} ${className}`}>
      <Link to={DOWNLOAD_PAGE_PATH} aria-label={t.stores.appStoreLabel} className={badgeClass}>
        <img
          src="/badges/app-store.svg"
          alt=""
          className={`${height} w-auto max-w-full`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </Link>
      <Link to={DOWNLOAD_PAGE_PATH} aria-label={t.stores.googlePlayLabel} className={badgeClass}>
        <img
          src="/badges/google-play.svg"
          alt=""
          className={`${height} w-auto max-w-full`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </Link>
    </div>
  );
}
