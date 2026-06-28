import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil } from 'lucide-react';
import { fetchAllPostsAdmin, type AdminBlogPost } from '../blog/service';

export function AdminPostsPage() {
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllPostsAdmin()
      .then(setPosts)
      .catch((e) => setError(e instanceof Error ? e.message : 'Chyba načítání'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Články</h1>
          <p className="text-slate-400 mt-1">Správa blogových příspěvků (CS + EN).</p>
        </div>
        <Link
          to="/admin/clanky/novy"
          className="inline-flex items-center gap-2 rounded-xl bg-trtkat-gradient px-4 py-2.5 text-sm font-black text-white"
        >
          <Plus className="h-4 w-4" />
          Nový článek
        </Link>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">Nadpis (CS)</th>
              <th className="px-4 py-3 hidden sm:table-cell">Slug</th>
              <th className="px-4 py-3">Stav</th>
              <th className="px-4 py-3 hidden md:table-cell">Datum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-slate-400">
                  Načítání…
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-slate-400">
                  Zatím žádné články.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-bold text-white">{post.cs.title || '—'}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-slate-400">{post.slug}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        post.status === 'published'
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }
                    >
                      {post.status === 'published' ? 'Publikováno' : 'Koncept'}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-400">{post.datePublished}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/clanky/${post.id}`}
                      className="inline-flex items-center gap-1 text-trtkat-blue hover:text-white"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Upravit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
