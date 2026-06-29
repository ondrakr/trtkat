import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import {
  deletePostAdmin,
  fetchPostByIdAdmin,
  upsertPostAdmin,
  type PostUpsertInput,
} from '../blog/service';
import type { BlogPostLocale } from '../blog/posts';

const emptyLocale = (): BlogPostLocale => ({
  title: '',
  excerpt: '',
  metaDescription: '',
  sections: [{ paragraphs: [''] }],
});

function LocaleEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: BlogPostLocale;
  onChange: (next: BlogPostLocale) => void;
}) {
  function updateSection(index: number, patch: Partial<BlogPostLocale['sections'][0]>) {
    const sections = value.sections.map((s, i) => (i === index ? { ...s, ...patch } : s));
    onChange({ ...value, sections });
  }

  return (
    <div className="glass-subtle rounded-2xl p-5 space-y-4">
      <h3 className="text-sm font-black uppercase tracking-wider text-trtkat-pink">{label}</h3>
      <input
        placeholder="Nadpis"
        value={value.title}
        onChange={(e) => onChange({ ...value, title: e.target.value })}
        className="glass-input w-full rounded-xl px-4 py-2.5 text-white"
      />
      <textarea
        placeholder="Perex"
        value={value.excerpt}
        onChange={(e) => onChange({ ...value, excerpt: e.target.value })}
        rows={2}
        className="glass-input w-full rounded-xl px-4 py-2.5 text-white"
      />
      <textarea
        placeholder="Meta description (SEO)"
        value={value.metaDescription}
        onChange={(e) => onChange({ ...value, metaDescription: e.target.value })}
        rows={2}
        className="glass-input w-full rounded-xl px-4 py-2.5 text-white"
      />

      {value.sections.map((section, sIndex) => (
        <div key={sIndex} className="glass-subtle rounded-xl p-4 space-y-3">
          <input
            placeholder="Nadpis sekce (volitelné)"
            value={section.heading ?? ''}
            onChange={(e) => updateSection(sIndex, { heading: e.target.value || undefined })}
            className="glass-input w-full rounded-lg px-3 py-2 text-sm text-white"
          />
          {section.paragraphs.map((p, pIndex) => (
            <textarea
              key={pIndex}
              placeholder={`Odstavec ${pIndex + 1}`}
              value={p}
              onChange={(e) => {
                const paragraphs = section.paragraphs.map((para, i) => (i === pIndex ? e.target.value : para));
                updateSection(sIndex, { paragraphs });
              }}
              rows={3}
              className="glass-input w-full rounded-lg px-3 py-2 text-sm text-white"
            />
          ))}
          <button
            type="button"
            onClick={() =>
              updateSection(sIndex, { paragraphs: [...section.paragraphs, ''] })
            }
            className="text-xs font-bold text-trtkat-blue"
          >
            + Odstavec
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange({ ...value, sections: [...value.sections, { paragraphs: [''] }] })}
        className="inline-flex items-center gap-1 text-xs font-bold text-trtkat-blue"
      >
        <Plus className="h-3.5 w-3.5" /> Sekce
      </button>
    </div>
  );
}

export function AdminPostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'novy';

  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [datePublished, setDatePublished] = useState(new Date().toISOString().slice(0, 10));
  const [cs, setCs] = useState(emptyLocale());
  const [en, setEn] = useState(emptyLocale());
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew || !id) return;
    fetchPostByIdAdmin(id)
      .then((post) => {
        if (!post) {
          setError('Článek nenalezen');
          return;
        }
        setSlug(post.slug);
        setStatus(post.status);
        setDatePublished(post.datePublished);
        setCs(post.cs);
        setEn(post.en);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Chyba'))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const input: PostUpsertInput = {
      slug: slug.trim(),
      status,
      datePublished,
      cs: {
        ...cs,
        sections: cs.sections.map((s) => ({
          ...s,
          paragraphs: s.paragraphs.filter(Boolean),
        })),
      },
      en: {
        ...en,
        sections: en.sections.map((s) => ({
          ...s,
          paragraphs: s.paragraphs.filter(Boolean),
        })),
      },
    };

    try {
      const postId = await upsertPostAdmin(input, isNew ? undefined : id);
      navigate(`/admin/clanky/${postId}`, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Uložení selhalo');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!id || isNew || !confirm('Opravdu smazat článek?')) return;
    try {
      await deletePostAdmin(id);
      navigate('/admin/clanky');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Mazání selhalo');
    }
  }

  if (loading) {
    return <p className="text-slate-400">Načítání…</p>;
  }

  return (
    <div>
      <Link to="/admin/clanky" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4" /> Zpět na seznam
      </Link>

      <h1 className="text-2xl font-black text-white mb-6">{isNew ? 'Nový článek' : 'Upravit článek'}</h1>

      <form onSubmit={onSubmit} className="space-y-6 max-w-4xl">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Slug (URL)</label>
            <input
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="muj-clanek"
              className="glass-input w-full rounded-xl px-4 py-2.5 text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Stav</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className="glass-input w-full rounded-xl px-4 py-2.5 text-white"
            >
              <option value="draft">Koncept</option>
              <option value="published">Publikováno</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Datum publikace</label>
            <input
              type="date"
              required
              value={datePublished}
              onChange={(e) => setDatePublished(e.target.value)}
              className="glass-input w-full rounded-xl px-4 py-2.5 text-white"
            />
          </div>
        </div>

        <LocaleEditor label="Čeština" value={cs} onChange={setCs} />
        <LocaleEditor label="English" value={en} onChange={setEn} />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-trtkat-gradient px-6 py-2.5 font-black text-white disabled:opacity-50"
          >
            {saving ? 'Ukládám…' : 'Uložit'}
          </button>
          {!isNew && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" /> Smazat
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
