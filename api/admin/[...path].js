import dashboard from '../lib/handlers/dashboard.js';
import reports from '../lib/handlers/reports.js';
import gdpr from '../lib/handlers/gdpr.js';
import appeals from '../lib/handlers/appeals.js';
import support from '../lib/handlers/support.js';
import audit from '../lib/handlers/audit.js';
import bootstrapAdmin from '../lib/handlers/bootstrap-admin.js';
import supabaseCheck from '../lib/handlers/supabase-check.js';

const routes = {
  dashboard,
  reports,
  gdpr,
  appeals,
  support,
  audit,
  bootstrap: bootstrapAdmin,
  check: supabaseCheck,
};

export default async function handler(req, res) {
  const segments = req.query.path;
  const route = Array.isArray(segments) ? segments[0] : segments ?? '';

  const fn = routes[route];
  if (!fn) {
    return res.status(404).json({ error: 'not_found', route });
  }

  return fn(req, res);
}
