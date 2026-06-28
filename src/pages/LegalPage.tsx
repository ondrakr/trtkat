import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { SEO } from '../components/SEO';
import { sectionWrap, sectionY } from '../lib/navigation';

type LegalPageProps = {
  type: 'privacy' | 'terms' | 'contact';
};

const paths = {
  privacy: '/ochrana-soukromi',
  terms: '/podminky',
  contact: '/kontakt',
};

export function LegalPage({ type }: LegalPageProps) {
  const { t } = useI18n();
  const content = t.legal[type];

  return (
    <>
      <SEO title={`${content.title} | Trtkat`} description={content.metaDescription} path={paths[type]} />
      <main className={`${sectionY} flex-grow`}>
        <div className={`${sectionWrap} max-w-3xl`}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.blog.backHome}
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-8">{content.title}</h1>

          <div className="space-y-8">
            {content.sections.map((section, index) => (
              <section key={index}>
                {section.heading && (
                  <h2 className="text-xl font-black text-white mb-3">{section.heading}</h2>
                )}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-slate-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            {type === 'contact' && (
              <p className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-trtkat-pink font-bold">
                {t.legal.contact.emailPlaceholder}
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
