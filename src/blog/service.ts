import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import type { BlogSection } from '../lib/database.types';
import { BLOG_POSTS, type BlogPost, type BlogPostLocale } from './posts';

export type { BlogPost, BlogPostLocale, BlogSection };

function mapRowToPost(
  row: {
    slug: string;
    date_published: string;
    date_modified: string | null;
  },
  translations: Array<{
    locale: string;
    title: string;
    excerpt: string;
    meta_description: string;
    sections: BlogSection[];
  }>,
): BlogPost {
  const cs = translations.find((t) => t.locale === 'cs');
  const en = translations.find((t) => t.locale === 'en');

  return {
    slug: row.slug,
    datePublished: row.date_published,
    dateModified: row.date_modified ?? undefined,
    cs: cs
      ? {
          title: cs.title,
          excerpt: cs.excerpt,
          metaDescription: cs.meta_description,
          sections: cs.sections ?? [],
        }
      : { title: '', excerpt: '', metaDescription: '', sections: [] },
    en: en
      ? {
          title: en.title,
          excerpt: en.excerpt,
          metaDescription: en.meta_description,
          sections: en.sections ?? [],
        }
      : { title: '', excerpt: '', metaDescription: '', sections: [] },
  };
}

export async function fetchPublishedPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) {
    return BLOG_POSTS;
  }

  try {
    const supabase = getSupabase();
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('id, slug, date_published, date_modified, status')
      .eq('status', 'published')
      .order('date_published', { ascending: false });

    if (postsError || !posts?.length) {
      return BLOG_POSTS;
    }

    const ids = posts.map((p) => p.id);
    const { data: translations, error: trError } = await supabase
      .from('blog_post_translations')
      .select('post_id, locale, title, excerpt, meta_description, sections')
      .in('post_id', ids);

    if (trError) {
      return BLOG_POSTS;
    }

    return posts.map((post) => {
      const postTranslations = (translations ?? []).filter((t) => t.post_id === post.id);
      return mapRowToPost(post, postTranslations);
    });
  } catch {
    return BLOG_POSTS;
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!isSupabaseConfigured) {
    return BLOG_POSTS.find((p) => p.slug === slug);
  }

  try {
    const supabase = getSupabase();
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('id, slug, date_published, date_modified, status')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error || !post) {
      return BLOG_POSTS.find((p) => p.slug === slug);
    }

    const { data: translations } = await supabase
      .from('blog_post_translations')
      .select('locale, title, excerpt, meta_description, sections')
      .eq('post_id', post.id);

    return mapRowToPost(post, translations ?? []);
  } catch {
    return BLOG_POSTS.find((p) => p.slug === slug);
  }
}

export type AdminBlogPost = BlogPost & { id: string; status: 'draft' | 'published' };

export async function fetchAllPostsAdmin(): Promise<AdminBlogPost[]> {
  const supabase = getSupabase();
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, date_published, date_modified, status')
    .order('date_published', { ascending: false });

  if (error) throw error;
  if (!posts?.length) return [];

  const ids = posts.map((p) => p.id);
  const { data: translations, error: trError } = await supabase
    .from('blog_post_translations')
    .select('post_id, locale, title, excerpt, meta_description, sections')
    .in('post_id', ids);

  if (trError) throw trError;

  return posts.map((post) => ({
    ...mapRowToPost(
      post,
      (translations ?? []).filter((t) => t.post_id === post.id),
    ),
    id: post.id,
    status: post.status as 'draft' | 'published',
  }));
}

export async function fetchPostByIdAdmin(id: string): Promise<AdminBlogPost | null> {
  const supabase = getSupabase();
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('id, slug, date_published, date_modified, status')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  if (!post) return null;

  const { data: translations, error: trError } = await supabase
    .from('blog_post_translations')
    .select('locale, title, excerpt, meta_description, sections')
    .eq('post_id', post.id);

  if (trError) throw trError;

  return {
    ...mapRowToPost(post, translations ?? []),
    id: post.id,
    status: post.status as 'draft' | 'published',
  };
}

export type PostUpsertInput = {
  slug: string;
  status: 'draft' | 'published';
  datePublished: string;
  dateModified?: string;
  cs: BlogPostLocale;
  en: BlogPostLocale;
};

export async function upsertPostAdmin(input: PostUpsertInput, existingId?: string): Promise<string> {
  const supabase = getSupabase();

  const postPayload = {
    slug: input.slug,
    status: input.status,
    date_published: input.datePublished,
    date_modified: input.dateModified ?? null,
  };

  let postId = existingId;

  if (postId) {
    const { error } = await supabase.from('blog_posts').update(postPayload).eq('id', postId);
    if (error) throw error;
  } else {
    const { data, error } = await supabase.from('blog_posts').insert(postPayload).select('id').single();
    if (error) throw error;
    if (!data) throw new Error('Insert failed');
    postId = data.id;
  }

  for (const locale of ['cs', 'en'] as const) {
    const loc = locale === 'cs' ? input.cs : input.en;
    const { error } = await supabase.from('blog_post_translations').upsert(
      {
        post_id: postId!,
        locale,
        title: loc.title,
        excerpt: loc.excerpt,
        meta_description: loc.metaDescription,
        sections: loc.sections,
      },
      { onConflict: 'post_id,locale' },
    );
    if (error) throw error;
  }

  return postId!;
}

export async function deletePostAdmin(id: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}

export async function fetchWaitlistAdmin() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('waitlist_subscribers')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchCookieConsentsAdmin() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('cookie_consents')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(500);
  if (error) throw error;
  return data ?? [];
}

export async function fetchAdminStats() {
  const supabase = getSupabase();
  const [posts, waitlist, consents] = await Promise.all([
    supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
    supabase.from('waitlist_subscribers').select('id', { count: 'exact', head: true }),
    supabase.from('cookie_consents').select('id', { count: 'exact', head: true }),
  ]);

  const analyticsAccepted = await supabase
    .from('cookie_consents')
    .select('id', { count: 'exact', head: true })
    .eq('analytics', true);

  return {
    posts: posts.count ?? 0,
    waitlist: waitlist.count ?? 0,
    consents: consents.count ?? 0,
    analyticsAccepted: analyticsAccepted.count ?? 0,
  };
}
