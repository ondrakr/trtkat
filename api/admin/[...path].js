import dashboard from '../../server/lib/handlers/dashboard.js';
import reports from '../../server/lib/handlers/reports.js';
import gdpr from '../../server/lib/handlers/gdpr.js';
import appeals from '../../server/lib/handlers/appeals.js';
import support from '../../server/lib/handlers/support.js';
import audit from '../../server/lib/handlers/audit.js';
import bootstrapAdmin from '../../server/lib/handlers/bootstrap-admin.js';
import supabaseCheck from '../../server/lib/handlers/supabase-check.js';

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
