import { requireAdmin } from '../adminAuth.js';
import { logAuditEvent } from '../adminAudit.js';
import { restSelect, restUpdate } from '../supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const admin = await requireAdmin(req, res, 'appeals');
  if (!admin) return;

  if (req.method === 'GET') {
    const { data, error } = await restSelect('web_admin_appeals', {
      select: '*',
      order: 'created_at.desc',
      limit: 200,
    });
    if (error) return res.status(502).json({ error: 'fetch_failed', message: error.message });
    return res.status(200).json({ items: data ?? [] });
  }

  if (req.method === 'PATCH') {
    const { id, status, decision_reason, assigned_to } = req.body ?? {};
    if (!id) return res.status(400).json({ error: 'invalid_request' });

    const updates = {};
    if (status) updates.status = status;
    if (decision_reason !== undefined) updates.decision_reason = decision_reason;
    if (assigned_to !== undefined) updates.assigned_to = assigned_to;
    if (['upheld', 'overturned', 'rejected'].includes(status)) {
      updates.resolved_at = new Date().toISOString();
      updates.resolved_by = admin.userId;
    }

    const { error } = await restUpdate('web_admin_appeals', updates, 'id', id);
    if (error) return res.status(502).json({ error: 'update_failed', message: error.message });

    await logAuditEvent({
      adminUserId: admin.userId,
      action: 'update_appeal',
      resourceType: 'appeal',
      resourceId: id,
      reason: decision_reason,
      metadata: updates,
      ipAddress: admin.ip,
      userAgent: admin.userAgent,
    });

    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
}
