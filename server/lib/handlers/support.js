import { requireAdmin } from '../adminAuth.js';
import { logAuditEvent } from '../adminAudit.js';
import { restSelect, restUpdate } from '../supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const admin = await requireAdmin(req, res, 'support');
  if (!admin) return;

  if (req.method === 'GET') {
    const { data, error } = await restSelect('web_admin_support_tickets', {
      select: '*',
      order: 'created_at.desc',
      limit: 200,
    });
    if (error) return res.status(502).json({ error: 'fetch_failed', message: error.message });
    return res.status(200).json({ items: data ?? [] });
  }

  if (req.method === 'PATCH') {
    const { id, status, assigned_to, escalated_to } = req.body ?? {};
    if (!id) return res.status(400).json({ error: 'invalid_request' });

    const updates = {};
    if (status) updates.status = status;
    if (assigned_to !== undefined) updates.assigned_to = assigned_to;
    if (escalated_to !== undefined) updates.escalated_to = escalated_to;
    if (status === 'resolved') updates.resolved_at = new Date().toISOString();

    const { error } = await restUpdate('web_admin_support_tickets', updates, 'id', id);
    if (error) return res.status(502).json({ error: 'update_failed', message: error.message });

    await logAuditEvent({
      adminUserId: admin.userId,
      action: 'update_support_ticket',
      resourceType: 'support',
      resourceId: id,
      metadata: updates,
      ipAddress: admin.ip,
      userAgent: admin.userAgent,
    });

    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
}
