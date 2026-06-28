/**
 * Generates supabase/seed.sql from src/blog/posts.ts
 * Run: node scripts/generate-seed.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const postsPath = path.join(root, 'src/blog/posts.ts');
const outPath = path.join(root, 'supabase/seed.sql');

const src = readFileSync(postsPath, 'utf8');
const match = src.match(/export const BLOG_POSTS: BlogPost\[\] = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not parse BLOG_POSTS from posts.ts');
  process.exit(1);
}

// eslint-disable-next-line no-eval
const posts = eval(match[1]);

function esc(s) {
  return s.replace(/'/g, "''");
}

function sectionsJson(sections) {
  return esc(JSON.stringify(sections));
}

let sql = `-- Auto-generated from src/blog/posts.ts — run after 001_initial_schema.sql\n\n`;

for (const post of posts) {
  sql += `insert into public.blog_posts (slug, status, date_published)\n`;
  sql += `values ('${esc(post.slug)}', 'published', '${post.datePublished}')\n`;
  sql += `on conflict (slug) do update set date_published = excluded.date_published;\n\n`;

  for (const locale of ['cs', 'en']) {
    const loc = post[locale];
    sql += `insert into public.blog_post_translations (post_id, locale, title, excerpt, meta_description, sections)\n`;
    sql += `select p.id, '${locale}', '${esc(loc.title)}', '${esc(loc.excerpt)}', '${esc(loc.metaDescription)}', '${sectionsJson(loc.sections)}'::jsonb\n`;
    sql += `from public.blog_posts p where p.slug = '${esc(post.slug)}'\n`;
    sql += `on conflict (post_id, locale) do update set\n`;
    sql += `  title = excluded.title,\n`;
    sql += `  excerpt = excluded.excerpt,\n`;
    sql += `  meta_description = excluded.meta_description,\n`;
    sql += `  sections = excluded.sections;\n\n`;
  }
}

writeFileSync(outPath, sql);
console.log(`Wrote ${outPath} (${posts.length} posts)`);
