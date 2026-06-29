import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { SEO } from '../components/SEO';
import { fetchPostBySlug, type BlogPost } from '../blog/service';
import { buildArticleSchema } from '../lib/schema';
import { sectionWrap, sectionY } from '../lib/navigation';

export function BlogPostPage() {
  const { slug } = useParams();
  const { t, locale } = useI18n();
  const [post, setPost] = useState<BlogPost | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    fetchPostBySlug(slug)
      .then(setPost)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className={`${sectionY} flex-grow`}>
        <div className={`${sectionWrap} text-slate-400`}>{t.blog.loading}</div>
      </main>
    );
  }

  if (!post) return <Navigate to="/blog" replace />;

  const localized = locale === 'en' ? post.en : post.cs;
  const path = `/blog/${post.slug}`;

  return (
    <>
      <SEO
        title={`${localized.title} | Trtkat`}
        description={localized.metaDescription}
        path={path}
        type="article"
        publishedTime={post.datePublished}
        modifiedTime={post.dateModified}
        jsonLd={buildArticleSchema(
          {
            title: localized.title,
            description: localized.metaDescription,
            path,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
          },
          locale,
        )}
      />
      <main className={`${sectionY} flex-grow`}>
        <article className={`${sectionWrap} max-w-3xl`}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.blog.backToBlog}
          </Link>

          <header className="mb-8">
            <time className="text-xs font-bold uppercase tracking-wider text-trtkat-pink" dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString(locale === 'en' ? 'en-GB' : 'cs-CZ')}
            </time>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">{localized.title}</h1>
            <p className="mt-4 text-lg text-slate-400">{localized.excerpt}</p>
          </header>

          <div className="space-y-8">
            {localized.sections.map((section, index) => (
              <section key={index}>
                {section.heading && (
                  <h2 className="text-2xl font-black text-white mb-3">{section.heading}</h2>
                )}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-slate-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
