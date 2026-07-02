import { getSupabase } from '../../lib/supabase';

export type AdminRole = 'support' | 'moderator' | 'security' | 'super_admin';

export type ModerationDashboard = {
  openReports: number;
  urgentReports: number;
  childSafety: number;
  gdprRequests: number;
  overdueCases: number;
  pendingAppeals: number;
  reportsAvailable: boolean;
  reportsError: string | null;
};

export type ReportListItem = {
  id: string;
  type: string;
  appStatus: string;
  reporterId: string | null;
  reportedUserId: string | null;
  messageId: string | null;
  photoId: string | null;
  voiceMessageId: string | null;
  description: string | null;
  createdAt: string | null;
  workflow: {
    priority: string;
    status: string;
    assigned_to: string | null;
    decision: string | null;
    decision_reason: string | null;
    resolved_at: string | null;
  };
};

async function adminFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error('Nejste přihlášeni.');

  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message ?? body.error ?? `HTTP ${response.status}`);
  }
  return body as T;
}

export function fetchModerationDashboard() {
  return adminFetch<ModerationDashboard>('/api/admin/dashboard');
}

export function fetchReports() {
  return adminFetch<{ items: ReportListItem[] }>('/api/admin/reports');
}

export function fetchReportDetail(id: string) {
  return adminFetch<Record<string, unknown>>(`/api/admin/reports?id=${encodeURIComponent(id)}`);
}

export function updateReportWorkflow(
  id: string,
  updates: Record<string, string | null>,
) {
  return adminFetch<{ ok: boolean }>(`/api/admin/reports?id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

export function requestSensitiveAccess(payload: {
  id: string;
  accessReason: string;
  resourceType: string;
  resourceId: string;
  messageId?: string;
}) {
  return adminFetch<{ ok: boolean; content: unknown }>('/api/admin/reports', {
    method: 'POST',
    body: JSON.stringify({ ...payload, action: 'sensitive_access' }),
  });
}

export function addReportNote(id: string, note: string) {
  return adminFetch<{ ok: boolean }>('/api/admin/reports', {
    method: 'POST',
    body: JSON.stringify({ id, action: 'add_note', note }),
  });
}

export function recordModerationAction(
  id: string,
  payload: {
    actionType: string;
    reason: string;
    targetUserId?: string;
    targetResourceType?: string;
    targetResourceId?: string;
  },
) {
  return adminFetch<{ ok: boolean; hint?: string }>('/api/admin/reports', {
    method: 'POST',
    body: JSON.stringify({ id, action: 'moderation', ...payload }),
  });
}

export function fetchGdprQueue() {
  return adminFetch<{
    gdprRequests: Record<string, unknown>[];
    deletionRequests: Record<string, unknown>[];
  }>('/api/admin/gdpr');
}

export function updateGdprItem(payload: Record<string, unknown>) {
  return adminFetch<{ ok: boolean }>('/api/admin/gdpr', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function fetchAuditLog() {
  return adminFetch<{ items: Record<string, unknown>[] }>('/api/admin/audit');
}

export function fetchAppeals() {
  return adminFetch<{ items: Record<string, unknown>[] }>('/api/admin/appeals');
}

export function updateAppeal(payload: Record<string, unknown>) {
  return adminFetch<{ ok: boolean }>('/api/admin/appeals', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function fetchSupportTickets() {
  return adminFetch<{ items: Record<string, unknown>[] }>('/api/admin/support');
}

export function updateSupportTicket(payload: Record<string, unknown>) {
  return adminFetch<{ ok: boolean }>('/api/admin/support', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}
