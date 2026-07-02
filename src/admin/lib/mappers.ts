/** Flexibilní mapování sloupců app tabulek — ověřit proti skutečné DB. */

export function pick(row, ...keys) {
  if (!row) return null;
  for (const key of keys) {
    if (row[key] != null && row[key] !== '') return row[key];
  }
  return null;
}

export function mapReport(row) {
  return {
    id: row.id,
    type: pick(row, 'report_type', 'type', 'category', 'reason') ?? 'unknown',
    status: pick(row, 'status', 'report_status') ?? 'pending',
    reporterId: pick(row, 'reporter_id', 'reporter_user_id', 'reported_by'),
    reportedUserId: pick(row, 'reported_user_id', 'reported_id', 'target_user_id', 'user_id'),
    messageId: pick(row, 'message_id', 'reported_message_id'),
    photoId: pick(row, 'photo_id', 'profile_photo_id', 'reported_photo_id'),
    voiceMessageId: pick(row, 'voice_message_id', 'audio_message_id'),
    description: pick(row, 'description', 'details', 'note'),
    createdAt: pick(row, 'created_at', 'inserted_at'),
  };
}

export function mapProfile(row) {
  return {
    id: row.id,
    displayName: pick(row, 'display_name', 'name', 'username'),
    bio: pick(row, 'bio', 'about', 'description'),
    age: pick(row, 'age'),
    gender: pick(row, 'gender'),
    status: pick(row, 'status', 'account_status'),
    isHidden: pick(row, 'is_hidden', 'hidden', 'is_discoverable') === false,
    createdAt: pick(row, 'created_at'),
  };
}

export const CHILD_SAFETY_TYPES = ['minor', 'underage', 'csam', 'csea', 'child_safety', 'nezletil'];

export function isChildSafetyType(type) {
  const value = String(type ?? '').toLowerCase();
  return CHILD_SAFETY_TYPES.some((t) => value.includes(t));
}

export const REPORT_TYPE_LABELS = {
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
