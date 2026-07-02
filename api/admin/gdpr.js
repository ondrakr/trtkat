import { requireAdmin } from '../lib/adminAuth.js';
import { logAuditEvent } from '../lib/adminAudit.js';
import { restCount, restSelect, restUpdate } from '../lib/supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const admin = await requireAdmin(req, res, 'gdpr');
  if (!admin) return;

  if (req.method === 'GET') {
    const [gdpr, deletions] = await Promise.all([
      restSelect('web_admin_gdpr_requests', { select: '*', order: 'created_at.desc', limit: 200 }),
      restSelect('account_deletion_requests', { select: '*', order: 'created_at.desc', limit: 200 }),
    ]);

    await logAuditEvent({
      adminUserId: admin.userId,
      action: 'list_gdpr',
      resourceType: 'gdpr',
      ipAddress: admin.ip,
      userAgent: admin.userAgent,
    });

    return res.status(200).json({
      gdprRequests: gdpr.data ?? [],
      deletionRequests: deletions.data ?? [],
      gdprError: gdpr.error?.message ?? null,
      deletionError: deletions.error?.message ?? null,
    });
  }

  if (req.method === 'PATCH') {
    const { id, type, status, response_note, assigned_to } = req.body ?? {};
    if (!id || !type) return res.status(400).json({ error: 'invalid_request' });

    const table = type === 'deletion' ? 'account_deletion_requests' : 'web_admin_gdpr_requests';
    const updates = {};
    if (status) updates.status = status;
    if (response_note !== undefined) updates.response_note = response_note;
    if (assigned_to !== undefined) updates.assigned_to = assigned_to;
    if (status === 'completed') updates.completed_at = new Date().toISOString();
    if (type === 'deletion' && status === 'completed') updates.processed_at = new Date().toISOString();

    const column = type === 'deletion' ? 'id' : 'id';
    const { error } = await restUpdate(table, updates, column, id);
    if (error) return res.status(502).json({ error: 'update_failed', message: error.message });

    await logAuditEvent({
      adminUserId: admin.userId,
      action: 'update_gdpr',
      resourceType: type,
      resourceId: id,
      metadata: updates,
      ipAddress: admin.ip,
      userAgent: admin.userAgent,
    });

    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
}
