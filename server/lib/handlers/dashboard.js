import { requireAdmin } from '../adminAuth.js';
import { restCount, restSelect } from '../supabase.js';
import { isChildSafetyReport, isWorkflowOpen, mapWorkflow, pick } from '../reportSchema.js';

function isOverdue(workflow) {
  if (!workflow?.sla_due_at) return false;
  const status = workflow.status ?? workflow.workflow_status;
  if (!isWorkflowOpen(status)) return false;
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

  const [reportsResult, workflowsResult, gdprResult, deletionResult, appealsResult] =
    await Promise.all([
      restSelect('reports', {
        select: 'id,status,created_at,report_type,reason,reported_user_id,target_id',
        order: 'created_at.desc',
        limit: 500,
      }),
      restSelect('web_admin_report_workflow', { select: '*' }),
      restCount('web_admin_gdpr_requests'),
      restSelect('account_deletion_requests', { select: 'id,status' }),
      restCount('web_admin_appeals'),
    ]);

  const reports = reportsResult.data ?? [];
  const workflows = new Map((workflowsResult.data ?? []).map((w) => [w.report_id, w]));

  let openReports = 0;
  let urgentReports = 0;
  let overdueCases = 0;
  let childSafety = 0;

  for (const report of reports) {
    if (isChildSafetyReport(report)) childSafety += 1;

    const wf = mapWorkflow(workflows.get(report.id));
    if (isWorkflowOpen(wf.status)) {
      openReports += 1;
      if (wf.priority === 'P0' || wf.priority === 'P1') urgentReports += 1;
      if (isOverdue(workflows.get(report.id))) overdueCases += 1;
    }
  }

  const pendingGdpr =
    (gdprResult.count ?? 0) +
    ((deletionResult.data ?? []).filter((r) => r.status === 'pending').length);

  return res.status(200).json({
    openReports,
    urgentReports,
    childSafety,
    gdprRequests: pendingGdpr,
    overdueCases,
    pendingAppeals: appealsResult.count ?? 0,
    reportsAvailable: !reportsResult.error,
    reportsError: reportsResult.error?.message ?? null,
  });
}
