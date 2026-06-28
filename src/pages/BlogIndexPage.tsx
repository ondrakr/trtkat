import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { SEO } from '../components/SEO';
import { BLOG_POSTS } from '../blog/posts';
import { sectionWrap, sectionY } from '../lib/navigation';

export function BlogIndexPage() {
  const { t, locale } = useI18n();

  return (
    <>
      <SEO title={`${t.blog.title} | Trtkat`} description={t.blog.metaDescription} path="/blog" />
      <main className={`${sectionY} flex-grow`}>
        <div className={sectionWrap}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.blog.backHome}
          </Link>

          <div className="max-w-3xl mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 leading-tight">{t.blog.title}</h1>
            <p className="text-base sm:text-lg text-slate-400">{t.blog.subtitle}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => {
              const localized = locale === 'en' ? post.en : post.cs;
              return (
                <article
                  key={post.slug}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07] transition-colors"
                >
                  <time className="text-xs font-bold uppercase tracking-wider text-trtkat-pink" dateTime={post.datePublished}>
                    {new Date(post.datePublished).toLocaleDateString(locale === 'en' ? 'en-GB' : 'cs-CZ')}
                  </time>
                  <h2 className="mt-3 text-xl font-black text-white leading-snug">{localized.title}</h2>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{localized.excerpt}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-5 inline-flex text-sm font-bold text-trtkat-blue hover:text-white transition-colors"
                  >
                    {t.blog.readMore} →
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
