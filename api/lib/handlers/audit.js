import { requireAdmin } from '../adminAuth.js';
import { restSelect } from '../supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' });

  const admin = await requireAdmin(req, res, 'audit');
  if (!admin) return;

  const limit = Math.min(Number(req.query?.limit) || 200, 500);
  const { data, error } = await restSelect('web_admin_audit_events', {
    select: '*',
    order: 'created_at.desc',
    limit,
  });

  if (error) return res.status(502).json({ error: 'fetch_failed', message: error.message });

  return res.status(200).json({ items: data ?? [] });
}
