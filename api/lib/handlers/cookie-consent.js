import { getSupabaseConfig, restInsert, restSelectOne, restUpdate } from '../supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const visitorId = typeof req.body?.visitorId === 'string' ? req.body.visitorId.trim() : '';
  if (!visitorId || visitorId.length > 64) {
    return res.status(400).json({ error: 'invalid_visitor' });
  }

  const analytics = req.body?.analytics === true;
  const marketing = req.body?.marketing === true;
  const userAgent = typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : null;

  if (!getSupabaseConfig()) {
    console.log('[cookie-consent]', { visitorId, analytics, marketing });
    return res.status(200).json({ ok: true });
  }

  const { data: existing, error: selectError } = await restSelectOne('cookie_consents', 'visitor_id', visitorId, 'id');

  if (selectError) {
    console.error('[cookie-consent] select failed', selectError);
    return res.status(502).json({ error: 'save_failed' });
  }

  const payload = {
    visitor_id: visitorId,
    analytics,
    marketing,
    necessary: true,
    user_agent: userAgent,
  };

  const { error } = existing
    ? await restUpdate('cookie_consents', payload, 'id', existing.id)
    : await restInsert('cookie_consents', payload);

  if (error) {
    console.error('[cookie-consent] save failed', error);
    return res.status(502).json({ error: 'save_failed' });
  }

  return res.status(200).json({ ok: true });
}
