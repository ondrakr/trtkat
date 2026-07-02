/** Mapování reports + workflow podle nasazeného schématu (zfowzsmpsmsfwtfzxyjr). */

export const WORKFLOW_STATUSES = ['open', 'reviewing', 'waiting', 'resolved', 'rejected'];

export const CLOSED_WORKFLOW_STATUSES = ['resolved', 'rejected'];

export const MODERATION_ACTIONS = [
  'hide_profile',
  'restrict_account',
  'ban_account',
  'hide_from_discovery',
  'restore_profile',
  'unrestrict_account',
  'unban_account',
];

const CHILD_SAFETY_TYPES = ['minor', 'underage', 'csam', 'csea', 'child_safety', 'nezletil'];

export function pick(row, ...keys) {
  if (!row) return null;
  for (const key of keys) {
    if (row[key] != null && row[key] !== '') return row[key];
  }
  return null;
}

/** Normalizuje legacy workflow status na open/reviewing/waiting/… */
export function normalizeWorkflowStatus(raw) {
  const value = raw ?? 'open';
  if (value === 'new') return 'open';
  if (value === 'in_progress') return 'reviewing';
  if (value === 'escalated') return 'waiting';
  return value;
}

export function mapWorkflow(wf) {
  if (!wf) {
    return {
      priority: 'P2',
      status: 'open',
      assigned_to: null,
      decision: null,
      decision_reason: null,
      resolved_at: null,
    };
  }

  return {
    priority: wf.priority ?? 'P2',
    status: normalizeWorkflowStatus(wf.status ?? wf.workflow_status),
    assigned_to: wf.assigned_to ?? null,
    decision: wf.decision ?? null,
    decision_reason: wf.decision_reason ?? null,
    resolved_at: wf.resolved_at ?? null,
  };
}

export function isWorkflowOpen(status) {
  return !CLOSED_WORKFLOW_STATUSES.includes(normalizeWorkflowStatus(status));
}

export function mapReportRow(row, workflowRow) {
  return {
    id: row.id,
    type: pick(row, 'report_type', 'reason') ?? 'unknown',
    appStatus: pick(row, 'status') ?? 'pending',
    reporterId: pick(row, 'reporter_id'),
    reportedUserId: pick(row, 'reported_user_id', 'target_id'),
    messageId: pick(row, 'message_id'),
    photoId: pick(row, 'photo_id'),
    voiceMessageId: pick(row, 'voice_message_id'),
    description: pick(row, 'description', 'details'),
    matchId: pick(row, 'match_id'),
    includeChat: row.include_chat === true,
    hasChatSnapshot: row.chat_snapshot != null && row.chat_snapshot !== '',
    createdAt: pick(row, 'created_at'),
    workflow: mapWorkflow(workflowRow),
  };
}

export function isChildSafetyReport(report) {
  const type = String(pick(report, 'report_type', 'reason') ?? '').toLowerCase();
  return CHILD_SAFETY_TYPES.some((t) => type.includes(t));
}

export function buildWorkflowDbUpdate(body) {
  const updates = {};
  const PRIORITIES = ['P0', 'P1', 'P2', 'P3'];

  if (body.priority && PRIORITIES.includes(body.priority)) {
    updates.priority = body.priority;
  }

  const rawStatus = body.status ?? body.workflow_status;
  if (rawStatus) {
    const status = normalizeWorkflowStatus(rawStatus);
    if (WORKFLOW_STATUSES.includes(status) || ['new', 'in_progress', 'escalated'].includes(rawStatus)) {
      updates.status = status;
      if (status === 'resolved') {
        updates.resolved_at = new Date().toISOString();
      }
    }
  }

  if (body.assigned_to !== undefined) updates.assigned_to = body.assigned_to;
  if (body.decision !== undefined) updates.decision = body.decision;
  if (body.decision_reason !== undefined) updates.decision_reason = body.decision_reason;

  return updates;
}
