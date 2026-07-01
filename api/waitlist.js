import { getSupabaseConfig, restInsert } from './lib/supabase.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  const page = typeof req.body?.page === 'string' ? req.body.page : '/ziskat-aplikaci';
  const source = typeof req.body?.source === 'string' ? req.body.source : 'early_access';
  const locale = typeof req.body?.locale === 'string' && ['cs', 'en'].includes(req.body.locale) ? req.body.locale : null;
  const userAgent = typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'].slice(0, 512) : null;

  if (getSupabaseConfig()) {
    const { error } = await restInsert('early_access_signups', {
      email,
      source,
      page,
      locale,
      user_agent: userAgent,
    });

    if (error) {
      if (error.code === '23505') {
        return res.status(200).json({ ok: true, duplicate: true });
      }
      console.error('[waitlist] insert failed', error);
      return res.status(502).json({ error: 'submit_failed' });
    }

    return res.status(200).json({ ok: true });
  }

  const payload = {
    email,
    source,
    page,
    createdAt: new Date().toISOString(),
  };

  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`);
      }
    } catch (error) {
      console.error('[waitlist] webhook failed', error);
      return res.status(502).json({ error: 'submit_failed' });
    }
  } else {
    console.log('[waitlist] signup', payload);
  }

  return res.status(200).json({ ok: true });
}
