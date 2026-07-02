/** Mapování reports + workflow — synchronizováno s nasazeným Supabase schématem. */

export function pick(row: Record<string, unknown> | null | undefined, ...keys: string[]) {
  if (!row) return null;
  for (const key of keys) {
    const value = row[key];
    if (value != null && value !== '') return value as string;
  }
  return null;
}

export const WORKFLOW_STATUSES = ['open', 'reviewing', 'waiting', 'resolved', 'rejected'] as const;

export const CLOSED_WORKFLOW_STATUSES = ['resolved', 'rejected'];

export const MODERATION_ACTIONS = [
  { action: 'hide_profile', label: 'Skrýt profil' },
  { action: 'hide_from_discovery', label: 'Skrýt z discovery' },
  { action: 'restrict_account', label: 'Omezit účet' },
  { action: 'ban_account', label: 'Zablokovat účet' },
  { action: 'restore_profile', label: 'Obnovit profil' },
  { action: 'unrestrict_account', label: 'Zrušit omezení' },
  { action: 'unban_account', label: 'Zrušit ban' },
] as const;

export function normalizeWorkflowStatus(raw: string | null | undefined) {
  const value = raw ?? 'open';
  if (value === 'new') return 'open';
  if (value === 'in_progress') return 'reviewing';
  if (value === 'escalated') return 'waiting';
  return value;
}

export function isWorkflowOpen(status: string | null | undefined) {
  return !CLOSED_WORKFLOW_STATUSES.includes(normalizeWorkflowStatus(status));
}

export const CHILD_SAFETY_TYPES = ['minor', 'underage', 'csam', 'csea', 'child_safety', 'nezletil'];

export function isChildSafetyType(type: string) {
  const value = type.toLowerCase();
  return CHILD_SAFETY_TYPES.some((t) => value.includes(t));
}

export const REPORT_TYPE_LABELS: Record<string, string> = {
  profile: 'Profil',
  photo: 'Fotka',
  message: 'Zpráva',
  audio: 'Audio zpráva',
  spam: 'Spam',
  fraud: 'Podvod',
  harassment: 'Obtěžování',
  minor: 'Nezletilý',
  child_safety: 'Child safety',
  csam: 'CSAM/CSEA',
  other: 'Jiné',
  unknown: 'Neznámý',
};

export const ACCESS_REASONS = [
  { value: 'report_resolution', label: 'Řešení reportu' },
  { value: 'security_incident', label: 'Bezpečnostní incident' },
  { value: 'gdpr_request', label: 'GDPR žádost' },
  { value: 'child_safety', label: 'Child safety' },
  { value: 'technical_diagnosis', label: 'Technická diagnostika' },
  { value: 'appeal_review', label: 'Přezkum odvolání' },
];

export const WORKFLOW_STATUS_LABELS: Record<string, string> = {
  open: 'Otevřený',
  reviewing: 'V řešení',
  waiting: 'Čeká',
  resolved: 'Vyřešený',
  rejected: 'Zamítnutý',
};
