import {
  getSupabaseConfig,
  restInsert,
  restSelect,
  restSelectOne,
  verifyUserJwt,
} from './supabase.js';

const ALL_ROLES = ['support', 'moderator', 'security', 'super_admin'];

const ROLE_PERMISSIONS = {
  support: ['support', 'gdpr', 'appeals'],
  moderator: ['reports', 'profiles', 'photos', 'chat', 'audio', 'appeals'],
  security: ['reports', 'child_safety', 'security', 'chat', 'audio', 'audit'],
  super_admin: ['*'],
};

export async function requireAdmin(req, res, permission = null) {
  const authHeader = req.headers.authorization ?? req.headers.Authorization;
  const token = typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (!token) {
    res.status(401).json({ error: 'unauthorized', message: 'Chybí přihlášení.' });
    return null;
  }

  const { user, error: userError } = await verifyUserJwt(token);
  if (userError || !user?.id) {
    res.status(401).json({ error: 'unauthorized', message: 'Neplatná session.' });
    return null;
  }

  const { data: webAdmin } = await restSelectOne('web_admin_users', 'user_id', user.id, 'user_id');
  if (!webAdmin) {
    res.status(403).json({ error: 'forbidden', message: 'Účet není web admin.' });
    return null;
  }

  const { data: roleRows } = await restSelect('web_admin_role_assignments', {
    select: 'role',
    filters: { user_id: user.id },
  });

  const roles = roleRows.length > 0 ? roleRows.map((r) => r.role) : ['super_admin'];

  if (permission && !hasPermission(roles, permission)) {
    res.status(403).json({ error: 'forbidden', message: 'Nemáte oprávnění pro tuto akci.' });
    return null;
  }

  return {
    userId: user.id,
    email: user.email,
    roles,
    ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() ?? req.socket?.remoteAddress ?? null,
    userAgent: typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : null,
  };
}

export function hasPermission(roles, permission) {
  if (roles.includes('super_admin')) return true;
  for (const role of roles) {
    const perms = ROLE_PERMISSIONS[role] ?? [];
    if (perms.includes('*') || perms.includes(permission)) return true;
  }
  return false;
}

export { ALL_ROLES, ROLE_PERMISSIONS };
