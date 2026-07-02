import { requireAdmin } from '../adminAuth.js';
import { logAuditEvent, logModerationAction, logSensitiveAccess } from '../adminAudit.js';
import { restInsert, restSelect, restSelectOne, restUpdate } from '../supabase.js';
import {
  MODERATION_ACTIONS,
  buildWorkflowDbUpdate,
  mapReportRow,
  pick,
} from '../reportSchema.js';

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
      });
    }

    const workflows = await getWorkflowMap();
    const items = (reports ?? []).map((r) => mapReportRow(r, workflows.get(r.id)));

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
    const mapped = mapReportRow(report, workflow);

    const reportedUserId = mapped.reportedUserId;

    const [notesResult, previousReports, reportedProfile, photo] = await Promise.all([
      restSelect('web_admin_case_notes', {
        select: '*',
        filterRaw: { case_type: 'eq.report', case_id: `eq.${reportId}` },
        order: 'created_at.desc',
      }),
      reportedUserId
        ? restSelect('reports', {
            select: 'id',
            filterRaw: { or: `(reported_user_id.eq.${reportedUserId},target_id.eq.${reportedUserId})` },
          })
        : { data: [] },
      reportedUserId ? restSelectOne('profiles', 'id', reportedUserId, '*') : { data: null },
      mapped.photoId ? restSelectOne('profile_photos', 'id', mapped.photoId, '*') : { data: null },
    ]);

    const matchContext = {
      matchId: mapped.matchId,
      includeChat: mapped.includeChat,
      hasChatSnapshot: mapped.hasChatSnapshot,
      note: 'Historie liků/passů/matchů se nezobrazuje — pouze kontext tohoto reportu.',
    };

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
      previousReportsCount: (previousReports.data ?? []).length,
      publicProfile,
      reportedPhoto: photo.data
        ? { id: photo.data.id, url: pick(photo.data, 'url', 'storage_path', 'image_url') }
        : null,
      matchContext,
      sensitiveContent: {
        message: mapped.messageId ? { id: mapped.messageId, locked: true } : null,
        voice: mapped.voiceMessageId ? { id: mapped.voiceMessageId, locked: true } : null,
        chatSnapshot: mapped.hasChatSnapshot ? { locked: true, note: 'Vyžaduje důvod otevření.' } : null,
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
    const caseReportId = caseId ?? reportId;

    if (resourceType === 'chat_snapshot' && caseReportId) {
      const { data } = await restSelectOne('reports', 'id', caseReportId, 'chat_snapshot,message_id,match_id');
      content = data?.chat_snapshot ?? null;
      if (!content && data?.message_id) {
        const { data: msg } = await restSelectOne('messages', 'id', data.message_id, '*');
        content = msg ? { message: msg } : null;
      }
      if (!content && data?.match_id) {
        const { data: context } = await restSelect('messages', {
          select: 'id,content,created_at,sender_id',
          filterRaw: { match_id: `eq.${data.match_id}` },
          order: 'created_at.asc',
          limit: 20,
        });
        content = { match_id: data.match_id, messages: context ?? [] };
      }
    } else if (resourceType === 'message') {
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
    if (!MODERATION_ACTIONS.includes(actionType)) {
      return res.status(400).json({ error: 'invalid_action', allowed: MODERATION_ACTIONS });
    }

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
      hint: 'Akce zapsána do web_admin_moderation_actions a audit logu.',
    });
  }

  if (req.method === 'PATCH' && reportId) {
    const updates = buildWorkflowDbUpdate(req.body ?? {});
    if (Object.keys(updates).length === 0) return res.status(400).json({ error: 'no_updates' });

    const { data: existing } = await restSelectOne('web_admin_report_workflow', 'report_id', reportId, 'report_id');

    const { error } = existing
      ? await restUpdate('web_admin_report_workflow', updates, 'report_id', reportId)
      : await restInsert('web_admin_report_workflow', { report_id: reportId, status: 'open', ...updates });

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
