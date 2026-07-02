import { requireAdmin } from '../adminAuth.js';
import { restCount, restSelect } from '../supabase.js';

const CHILD_SAFETY_TYPES = ['minor', 'underage', 'csam', 'csea', 'child_safety'];

function isChildSafetyReport(report) {
  const type = String(report.report_type ?? report.type ?? report.reason ?? '').toLowerCase();
  return CHILD_SAFETY_TYPES.some((t) => type.includes(t));
}

function isOverdue(workflow, createdAt) {
  if (!workflow?.sla_due_at) return false;
  if (['resolved', 'rejected'].includes(workflow.workflow_status)) return false;
  return new Date(workflow.sla_due_at) < new Date();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' });

  const admin = await requireAdmin(req, res, 'reports');
  if (!admin) return;

  const [reportsResult, workflowsResult, gdprResult, deletionResult, appealsResult, childResult] =
    await Promise.all([
      restSelect('reports', { select: 'id,status,created_at,report_type,type,reason', order: 'created_at.desc', limit: 500 }),
      restSelect('web_admin_report_workflow', { select: '*' }),
      restCount('web_admin_gdpr_requests'),
      restSelect('account_deletion_requests', { select: 'id,status' }),
      restCount('web_admin_appeals'),
      restSelect('reports', { select: 'id,report_type,type,reason', limit: 500 }),
    ]);

  const reports = reportsResult.data ?? [];
  const workflows = new Map((workflowsResult.data ?? []).map((w) => [w.report_id, w]));

  let openReports = 0;
  let urgentReports = 0;
  let overdueCases = 0;

  for (const report of reports) {
    const wf = workflows.get(report.id);
    const status = wf?.workflow_status ?? 'new';
    if (!['resolved', 'rejected'].includes(status)) {
      openReports += 1;
      const priority = wf?.priority ?? 'P2';
      if (priority === 'P0' || priority === 'P1') urgentReports += 1;
      if (isOverdue(wf, report.created_at)) overdueCases += 1;
    }
  }

  const childSafety = (childResult.data ?? []).filter(isChildSafetyReport).length;

  const pendingGdpr =
    (gdprResult.count ?? 0) +
    ((deletionResult.data ?? []).filter((r) => r.status === 'pending').length);

  const pendingAppeals = appealsResult.count ?? 0;

  return res.status(200).json({
    openReports,
    urgentReports,
    childSafety,
    gdprRequests: pendingGdpr,
    overdueCases,
    pendingAppeals,
    reportsAvailable: !reportsResult.error,
    reportsError: reportsResult.error?.message ?? null,
  });
}
