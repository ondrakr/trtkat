import { restInsert } from './supabase.js';

export async function logAuditEvent({
  adminUserId,
  action,
  resourceType,
  resourceId = null,
  reason = null,
  accessReason = null,
  metadata = {},
  ipAddress = null,
  userAgent = null,
  outcome = 'success',
}) {
  return restInsert('web_admin_audit_events', {
    admin_user_id: adminUserId,
    action,
    resource_type: resourceType,
    resource_id: resourceId,
    reason,
    access_reason: accessReason,
    metadata,
    ip_address: ipAddress,
    user_agent: userAgent,
    outcome,
  });
}

export async function logSensitiveAccess({
  adminUserId,
  accessReason,
  resourceType,
  resourceId,
  caseId = null,
}) {
  const { error } = await restInsert('web_admin_sensitive_access_log', {
    admin_user_id: adminUserId,
    access_reason: accessReason,
    resource_type: resourceType,
    resource_id: String(resourceId),
    case_id: caseId,
  });

  if (!error) {
    await logAuditEvent({
      adminUserId,
      action: 'sensitive_access',
      resourceType,
      resourceId: String(resourceId),
      accessReason,
      metadata: { case_id: caseId },
      outcome: 'success',
    });
  }

  return { error };
}

export async function logModerationAction({
  adminUserId,
  actionType,
  targetUserId = null,
  targetResourceType = null,
  targetResourceId = null,
  reason,
  reportId = null,
  metadata = {},
}) {
  const { error } = await restInsert('web_admin_moderation_actions', {
    admin_user_id: adminUserId,
    action_type: actionType,
    target_user_id: targetUserId,
    target_resource_type: targetResourceType,
    target_resource_id: targetResourceId,
    reason,
    report_id: reportId,
    metadata,
  });

  if (!error) {
    await logAuditEvent({
      adminUserId,
      action: actionType,
      resourceType: targetResourceType ?? 'user',
      resourceId: targetResourceId ?? targetUserId,
      reason,
      metadata: { report_id: reportId, ...metadata },
    });
  }

  return { error };
}
