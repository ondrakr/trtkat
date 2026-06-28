import { getServiceClient } from './lib/supabase.js';

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

  const supabase = getServiceClient();
  if (!supabase) {
    console.log('[cookie-consent]', { visitorId, analytics, marketing });
    return res.status(200).json({ ok: true });
  }

  const { data: existing } = await supabase
    .from('cookie_consents')
    .select('id')
    .eq('visitor_id', visitorId)
    .maybeSingle();

  const payload = {
    visitor_id: visitorId,
    analytics,
    marketing,
    necessary: true,
    user_agent: userAgent,
  };

  const { error } = existing
    ? await supabase.from('cookie_consents').update(payload).eq('id', existing.id)
    : await supabase.from('cookie_consents').insert(payload);

  if (error) {
    console.error('[cookie-consent] supabase failed', error);
    return res.status(502).json({ error: 'save_failed' });
  }

  return res.status(200).json({ ok: true });
}
