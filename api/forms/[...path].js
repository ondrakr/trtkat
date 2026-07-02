import waitlist from '../lib/handlers/waitlist.js';
import accountDeletion from '../lib/handlers/account-deletion.js';
import cookieConsent from '../lib/handlers/cookie-consent.js';

const routes = {
  waitlist,
  'account-deletion': accountDeletion,
  'cookie-consent': cookieConsent,
};

export default async function handler(req, res) {
  const segments = req.query.path;
  const route = Array.isArray(segments) ? segments.join('/') : segments ?? '';

  const fn = routes[route];
  if (!fn) {
    return res.status(404).json({ error: 'not_found', route });
  }

  return fn(req, res);
}
