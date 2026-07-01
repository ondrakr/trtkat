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
  const note = typeof req.body?.note === 'string' ? req.body.note.trim().slice(0, 2000) : null;

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  if (getSupabaseConfig()) {
    const { error } = await restInsert('account_deletion_requests', {
      email,
      note,
      source: 'web_form',
      status: 'pending',
    });

    if (error) {
      console.error('[account-deletion] insert failed', error);
      return res.status(502).json({ error: 'submit_failed' });
    }

    return res.status(200).json({ ok: true });
  }

  const payload = {
    email,
    note,
    source: 'web_form',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const webhook = process.env.ACCOUNT_DELETION_WEBHOOK_URL ?? process.env.WAITLIST_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'account_deletion', ...payload }),
      });
      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`);
      }
    } catch (error) {
      console.error('[account-deletion] webhook failed', error);
      return res.status(502).json({ error: 'submit_failed' });
    }
  } else {
    console.log('[account-deletion] request', payload);
  }

  return res.status(200).json({ ok: true });
}
