import { requireAdmin } from '../lib/adminAuth.js';
import { logAuditEvent, logModerationAction, logSensitiveAccess } from '../lib/adminAudit.js';
import { restInsert, restSelect, restSelectOne, restUpdate } from '../lib/supabase.js';

const PRIORITIES = ['P0', 'P1', 'P2', 'P3'];
const WORKFLOW_STATUSES = ['new', 'in_progress', 'resolved', 'rejected', 'escalated'];

function pick(row, ...keys) {
  for (const key of keys) {
    if (row?.[key] != null && row[key] !== '') return row[key];
  }
  return null;
}

function mapReport(row, workflow) {
  return {
    id: row.id,
    type: pick(row, 'report_type', 'type', 'category', 'reason') ?? 'unknown',
    appStatus: pick(row, 'status', 'report_status') ?? 'pending',
    reporterId: pick(row, 'reporter_id', 'reporter_user_id', 'reported_by'),
    reportedUserId: pick(row, 'reported_user_id', 'reported_id', 'target_user_id', 'user_id'),
    messageId: pick(row, 'message_id', 'reported_message_id'),
    photoId: pick(row, 'photo_id', 'profile_photo_id', 'reported_photo_id'),
    voiceMessageId: pick(row, 'voice_message_id', 'audio_message_id'),
    description: pick(row, 'description', 'details', 'note'),
    createdAt: pick(row, 'created_at', 'inserted_at'),
    workflow: workflow ?? {
      priority: 'P2',
      workflow_status: 'new',
      assigned_to: null,
      decision: null,
      decision_reason: null,
      sla_due_at: null,
    },
  };
}

async function getWorkflowMap() {
  const { data } = await restSelect('web_admin_report_workflow', { select: '*' });
  return new Map((data ?? []).map((w) => [w.report_id, w]));
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const admin = await requireAdmin(req, res, 'reports');
  if (!admin) return;

  const reportId = req.query?.id ?? req.body?.id;

  if (req.method === 'GET' && !reportId) {
    const { data: reports, error } = await restSelect('reports', {
      select: '*',
      order: 'created_at.desc',
      limit: 200,
    });

    if (error) {
      await logAuditEvent({
        adminUserId: admin.userId,
        action: 'list_reports',
        resourceType: 'reports',
        outcome: 'failure',
        metadata: { error: error.message },
        ipAddress: admin.ip,
        userAgent: admin.userAgent,
      });
      return res.status(502).json({
        error: 'reports_unavailable',
        message: error.message,
        hint: 'Ověř, že tabulka reports existuje a service_role klíč je správný.',
      });
    }

    const workflows = await getWorkflowMap();
    const items = (reports ?? []).map((r) => mapReport(r, workflows.get(r.id)));

    await logAuditEvent({
      adminUserId: admin.userId,
      action: 'list_reports',
      resourceType: 'reports',
      metadata: { count: items.length },
      ipAddress: admin.ip,
      userAgent: admin.userAgent,
    });

    return res.status(200).json({ items });
  }

  if (req.method === 'GET' && reportId) {
    const { data: report, error } = await restSelectOne('reports', 'id', reportId, '*');
    if (error || !report) {
      return res.status(404).json({ error: 'not_found', message: 'Report nenalezen.' });
    }

    const { data: workflow } = await restSelectOne('web_admin_report_workflow', 'report_id', reportId, '*');
    const mapped = mapReport(report, workflow);

    const [notesResult, reporterReports, reportedProfile, photo, message, voice] = await Promise.all([
      restSelect('web_admin_case_notes', {
        select: '*',
        filterRaw: { case_type: 'eq.report', case_id: `eq.${reportId}` },
        order: 'created_at.desc',
      }),
      mapped.reportedUserId
        ? restSelect('reports', {
            select: 'id',
            filterRaw: { reported_user_id: `eq.${mapped.reportedUserId}` },
          })
        : { data: [] },
      mapped.reportedUserId
        ? restSelectOne('profiles', 'id', mapped.reportedUserId, '*')
        : { data: null },
      mapped.photoId ? restSelectOne('profile_photos', 'id', mapped.photoId, '*') : { data: null },
      null,
      null,
    ]);

    let matchContext = null;
    if (mapped.reporterId && mapped.reportedUserId) {
      const { data: blocks } = await restSelect('blocks', { select: '*', limit: 100 });

      const relevantBlock = (blocks ?? []).find(
        (b) =>
          (b.blocker_id === mapped.reporterId && b.blocked_id === mapped.reportedUserId) ||
          (b.blocker_id === mapped.reportedUserId && b.blocked_id === mapped.reporterId),
      );

      matchContext = {
        hadBlock: Boolean(relevantBlock),
        note: 'Historie liků/matchů se nezobrazuje — pouze blokace v kontextu reportu.',
      };
    }

    const publicProfile = reportedProfile.data
      ? {
          id: reportedProfile.data.id,
          displayName: pick(reportedProfile.data, 'display_name', 'name', 'username'),
          bio: pick(reportedProfile.data, 'bio', 'about'),
          status: pick(reportedProfile.data, 'status', 'account_status'),
        }
      : null;

    await logAuditEvent({
      adminUserId: admin.userId,
      action: 'view_report',
      resourceType: 'report',
      resourceId: reportId,
      ipAddress: admin.ip,
      userAgent: admin.userAgent,
    });

    return res.status(200).json({
      report: mapped,
      notes: notesResult.data ?? [],
      previousReportsCount: (reporterReports.data ?? []).length,
      publicProfile,
      reportedPhoto: photo.data
        ? { id: photo.data.id, url: pick(photo.data, 'url', 'storage_path', 'image_url') }
        : null,
      matchContext,
      sensitiveContent: {
        message: mapped.messageId ? { id: mapped.messageId, locked: true } : null,
        voice: mapped.voiceMessageId ? { id: mapped.voiceMessageId, locked: true } : null,
        chatContext: mapped.messageId ? { locked: true, note: 'Vyžaduje důvod otevření.' } : null,
      },
    });
  }

  if (req.method === 'POST' && req.body?.action === 'sensitive_access') {
    const { accessReason, resourceType, resourceId, caseId } = req.body;
    if (!accessReason || !resourceType || !resourceId) {
      return res.status(400).json({ error: 'invalid_request' });
    }

    const { error } = await logSensitiveAccess({
      adminUserId: admin.userId,
      accessReason,
      resourceType,
      resourceId,
      caseId: caseId ?? reportId,
    });

    if (error) return res.status(502).json({ error: 'log_failed', message: error.message });

    let content = null;
    if (resourceType === 'message') {
      const { data } = await restSelectOne('messages', 'id', resourceId, '*');
      content = data;
    } else if (resourceType === 'voice_message') {
      const { data } = await restSelectOne('voice_messages', 'id', resourceId, '*');
      content = data
        ? {
            id: data.id,
            url: pick(data, 'url', 'storage_path', 'audio_url'),
            duration: pick(data, 'duration', 'duration_seconds'),
          }
        : null;
    } else if (resourceType === 'chat_context' && req.body.messageId) {
      const { data: center } = await restSelectOne('messages', 'id', req.body.messageId, '*');
      if (center?.conversation_id ?? center?.match_id) {
        const filterKey = center.conversation_id ? 'conversation_id' : 'match_id';
        const filterVal = center.conversation_id ?? center.match_id;
        const { data: context } = await restSelect('messages', {
          select: 'id,content,created_at,sender_id',
          filterRaw: { [filterKey]: `eq.${filterVal}` },
          order: 'created_at.asc',
          limit: 20,
        });
        content = { center, context: context ?? [] };
      }
    }

    return res.status(200).json({ ok: true, content });
  }

  if (req.method === 'POST' && req.body?.action === 'add_note') {
    const { note } = req.body;
    if (!reportId || !note?.trim()) return res.status(400).json({ error: 'invalid_request' });

    const { error } = await restInsert('web_admin_case_notes', {
      case_type: 'report',
      case_id: reportId,
      author_id: admin.userId,
      note: note.trim(),
    });

    if (error) return res.status(502).json({ error: 'insert_failed', message: error.message });

    await logAuditEvent({
      adminUserId: admin.userId,
      action: 'add_case_note',
      resourceType: 'report',
      resourceId: reportId,
      ipAddress: admin.ip,
      userAgent: admin.userAgent,
    });

    return res.status(200).json({ ok: true });
  }

  if (req.method === 'POST' && req.body?.action === 'moderation') {
    const { actionType, reason, targetUserId, targetResourceType, targetResourceId } = req.body;
    if (!actionType || !reason?.trim()) return res.status(400).json({ error: 'invalid_request' });

    const { error } = await logModerationAction({
      adminUserId: admin.userId,
      actionType,
      targetUserId,
      targetResourceType,
      targetResourceId,
      reason: reason.trim(),
      reportId,
    });

    if (error) return res.status(502).json({ error: 'action_failed', message: error.message });

    return res.status(200).json({
      ok: true,
      hint: 'Akce zaznamenána. Provedení v app DB vyžaduje schválení mobilního vývojáře.',
    });
  }

  if (req.method === 'PATCH' && reportId) {
    const { priority, workflow_status, assigned_to, decision, decision_reason, escalated_to } = req.body ?? {};
    const updates = {};

    if (priority && PRIORITIES.includes(priority)) updates.priority = priority;
    if (workflow_status && WORKFLOW_STATUSES.includes(workflow_status)) updates.workflow_status = workflow_status;
    if (assigned_to !== undefined) updates.assigned_to = assigned_to;
    if (decision !== undefined) updates.decision = decision;
    if (decision_reason !== undefined) updates.decision_reason = decision_reason;
    if (escalated_to !== undefined) updates.escalated_to = escalated_to;

    if (Object.keys(updates).length === 0) return res.status(400).json({ error: 'no_updates' });

    const { data: existing } = await restSelectOne('web_admin_report_workflow', 'report_id', reportId, 'report_id');

    const { error } = existing
      ? await restUpdate('web_admin_report_workflow', updates, 'report_id', reportId)
      : await restInsert('web_admin_report_workflow', { report_id: reportId, ...updates });

    if (error) return res.status(502).json({ error: 'update_failed', message: error.message });

    await logAuditEvent({
      adminUserId: admin.userId,
      action: 'update_report_workflow',
      resourceType: 'report',
      resourceId: reportId,
      metadata: updates,
      ipAddress: admin.ip,
      userAgent: admin.userAgent,
    });

    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
}
