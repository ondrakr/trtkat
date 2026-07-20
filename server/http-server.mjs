/**
 * Express server for Hetzner — wraps existing Vercel-style handlers.
 * Listens on 127.0.0.1:3001 only (Nginx proxies /api).
 */
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import dashboard from './lib/handlers/dashboard.js';
import reports from './lib/handlers/reports.js';
import gdpr from './lib/handlers/gdpr.js';
import appeals from './lib/handlers/appeals.js';
import support from './lib/handlers/support.js';
import audit from './lib/handlers/audit.js';
import bootstrapAdmin from './lib/handlers/bootstrap-admin.js';
import supabaseCheck from './lib/handlers/supabase-check.js';
import waitlist from './lib/handlers/waitlist.js';
import accountDeletion from './lib/handlers/account-deletion.js';
import cookieConsent from './lib/handlers/cookie-consent.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env') });

const PORT = Number(process.env.PORT || 3001);
const HOST = process.env.HOST || '127.0.0.1';

const adminRoutes = {
  dashboard,
  reports,
  gdpr,
  appeals,
  support,
  audit,
  bootstrap: bootstrapAdmin,
  check: supabaseCheck,
};

const formRoutes = {
  waitlist,
  'account-deletion': accountDeletion,
  'cookie-consent': cookieConsent,
};

function wrap(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('[http-server] handler error', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'internal_error' });
      }
    }
  };
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'trtkat-web-api' });
});

app.all('/api/admin/:route', wrap(async (req, res) => {
  const fn = adminRoutes[req.params.route];
  if (!fn) {
    return res.status(404).json({ error: 'not_found', route: req.params.route });
  }
  return fn(req, res);
}));

app.all('/api/forms/:route', wrap(async (req, res) => {
  const fn = formRoutes[req.params.route];
  if (!fn) {
    return res.status(404).json({ error: 'not_found', route: req.params.route });
  }
  return fn(req, res);
}));

// Aliases from vercel.json
app.all('/api/waitlist', wrap(waitlist));
app.all('/api/account-deletion', wrap(accountDeletion));
app.all('/api/cookie-consent', wrap(cookieConsent));
app.all('/api/bootstrap-admin', wrap(bootstrapAdmin));
app.all('/api/supabase-check', wrap(supabaseCheck));

app.listen(PORT, HOST, () => {
  console.log(`[trtkat-web-api] listening on http://${HOST}:${PORT}`);
});
