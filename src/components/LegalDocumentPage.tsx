import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { SEO } from './SEO';
import { AccountDeletionForm } from './AccountDeletionForm';
import { MarkdownContent } from '../lib/markdown';
import { getLegalPage, getLegalPath, type LegalSlug } from '../legal/registry';
import type { Locale } from '../i18n/detectLocale';
import { sectionWrap, sectionY } from '../lib/navigation';

type LegalDocumentPageProps = {
  slug: LegalSlug;
  locale: Locale;
};

export function LegalDocumentPage({ slug, locale }: LegalDocumentPageProps) {
  const { t } = useI18n();
  const page = getLegalPage(slug, locale);

  if (!page) {
    return null;
  }

  const { meta, content } = page;
  const title = meta.title[locale];
  const description = meta.metaDescription[locale];
  const path = getLegalPath(slug, locale);

  return (
    <>
      <SEO title={`${title} | Trtkat`} description={description} path={path} />
      <main className={`${sectionY} flex-grow`}>
        <div className={`${sectionWrap} max-w-3xl`}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.blog.backHome}
          </Link>

          <MarkdownContent source={content} />

          {meta.hasForm && <AccountDeletionForm locale={locale} />}
        </div>
      </main>
    </>
  );
}
