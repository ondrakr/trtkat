import { Navigate, useParams } from 'react-router-dom';
import { LegalDocumentPage } from '../components/LegalDocumentPage';
import { isLegalSlug } from '../legal/registry';
import type { Locale } from '../i18n/detectLocale';

type LegalRoutePageProps = {
  locale: Locale;
};

export function LegalRoutePage({ locale }: LegalRoutePageProps) {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !isLegalSlug(slug)) {
    return <Navigate to="/" replace />;
  }

  return <LegalDocumentPage slug={slug} locale={locale} />;
}
