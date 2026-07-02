-- Web admin: moderace, audit, role, GDPR, odvolání, support
-- REFERENČNÍ kopie — na produkci je nasazeno: 20260702013000_web_admin_moderation.sql
-- Spusť na sdílené APP Supabase po migracích 003–005.
-- NEMĚNÍ existující app tabulky (reports, profiles, messages, …).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Role adminů (oddělené od web_admin_users — ta tabulka zůstává beze změny)
-- ---------------------------------------------------------------------------
create table if not exists public.web_admin_role_assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check (role in ('support', 'moderator', 'security', 'super_admin')),
  granted_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create index if not exists web_admin_role_assignments_user_idx
  on public.web_admin_role_assignments (user_id);

-- ---------------------------------------------------------------------------
-- Audit log (append-only — běžný admin nesmí mazat)
-- ---------------------------------------------------------------------------
create table if not exists public.web_admin_audit_events (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references auth.users (id),
  action text not null,
  resource_type text not null,
  resource_id text,
  reason text,
  access_reason text,
  metadata jsonb not null default '{}'::jsonb,
  ip_address text,
  user_agent text,
  outcome text not null default 'success' check (outcome in ('success', 'failure', 'denied')),
  created_at timestamptz not null default now()
);

create index if not exists web_admin_audit_events_created_idx
  on public.web_admin_audit_events (created_at desc);

create index if not exists web_admin_audit_events_admin_idx
  on public.web_admin_audit_events (admin_user_id, created_at desc);

create index if not exists web_admin_audit_events_resource_idx
  on public.web_admin_audit_events (resource_type, resource_id);

-- ---------------------------------------------------------------------------
-- Workflow reportů (metadata vrstva — report_id odkazuje na public.reports bez FK)
-- ---------------------------------------------------------------------------
create table if not exists public.web_admin_report_workflow (
  report_id uuid primary key,
  priority text not null default 'P2' check (priority in ('P0', 'P1', 'P2', 'P3')),
  workflow_status text not null default 'new'
    check (workflow_status in ('new', 'in_progress', 'resolved', 'rejected', 'escalated')),
  assigned_to uuid references auth.users (id),
  decision text,
  decision_reason text,
  escalated_to text,
  sla_due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists web_admin_report_workflow_status_idx
  on public.web_admin_report_workflow (workflow_status, priority);

create index if not exists web_admin_report_workflow_assigned_idx
  on public.web_admin_report_workflow (assigned_to);

drop trigger if exists web_admin_report_workflow_updated_at on public.web_admin_report_workflow;
create trigger web_admin_report_workflow_updated_at
  before update on public.web_admin_report_workflow
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Interní poznámky k případům
-- ---------------------------------------------------------------------------
create table if not exists public.web_admin_case_notes (
  id uuid primary key default gen_random_uuid(),
  case_type text not null
    check (case_type in ('report', 'gdpr', 'appeal', 'support', 'child_safety', 'security')),
  case_id uuid not null,
  author_id uuid not null references auth.users (id),
  note text not null check (char_length(trim(note)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists web_admin_case_notes_case_idx
  on public.web_admin_case_notes (case_type, case_id, created_at desc);

-- ---------------------------------------------------------------------------
-- GDPR žádosti (export, oprava, odvolání souhlasu — smazání zůstává v account_deletion_requests)
-- ---------------------------------------------------------------------------
create table if not exists public.web_admin_gdpr_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text not null,
  request_type text not null
    check (request_type in ('export', 'correction', 'consent_withdrawal', 'deletion', 'other')),
  description text,
  status text not null default 'pending'
    check (status in ('pending', 'in_progress', 'completed', 'rejected')),
  assigned_to uuid references auth.users (id),
  due_at timestamptz,
  response_note text,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  processed_by uuid references auth.users (id)
);

create index if not exists web_admin_gdpr_requests_status_idx
  on public.web_admin_gdpr_requests (status, created_at desc);

-- ---------------------------------------------------------------------------
-- Odvolání uživatelů
-- ---------------------------------------------------------------------------
create table if not exists public.web_admin_appeals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text not null,
  appeal_type text not null
    check (appeal_type in ('ban', 'content_removal', 'account_restriction', 'other')),
  original_action_id uuid,
  original_action_type text,
  user_message text not null,
  status text not null default 'pending'
    check (status in ('pending', 'in_progress', 'upheld', 'overturned', 'rejected')),
  decision_reason text,
  assigned_to uuid references auth.users (id),
  resolved_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists web_admin_appeals_status_idx
  on public.web_admin_appeals (status, created_at desc);

-- ---------------------------------------------------------------------------
-- Support fronta
-- ---------------------------------------------------------------------------
create table if not exists public.web_admin_support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'open'
    check (status in ('open', 'in_progress', 'resolved', 'escalated')),
  category text not null default 'general',
  assigned_to uuid references auth.users (id),
  escalated_to text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists web_admin_support_tickets_status_idx
  on public.web_admin_support_tickets (status, created_at desc);

-- ---------------------------------------------------------------------------
-- Záznam moderátorských akcí (audit + podklad pro app — app tabulky se nemění)
-- ---------------------------------------------------------------------------
create table if not exists public.web_admin_moderation_actions (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references auth.users (id),
  action_type text not null,
  target_user_id uuid,
  target_resource_type text,
  target_resource_id uuid,
  reason text not null,
  report_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists web_admin_moderation_actions_target_idx
  on public.web_admin_moderation_actions (target_user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Log otevření citlivého obsahu (povinný důvod)
-- ---------------------------------------------------------------------------
create table if not exists public.web_admin_sensitive_access_log (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references auth.users (id),
  access_reason text not null check (access_reason in (
    'report_resolution',
    'security_incident',
    'gdpr_request',
    'child_safety',
    'technical_diagnosis',
    'appeal_review'
  )),
  resource_type text not null,
  resource_id text not null,
  case_id uuid,
  created_at timestamptz not null default now()
);

create index if not exists web_admin_sensitive_access_log_admin_idx
  on public.web_admin_sensitive_access_log (admin_user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- RLS — pouze web admini
-- ---------------------------------------------------------------------------
alter table public.web_admin_role_assignments enable row level security;
alter table public.web_admin_audit_events enable row level security;
alter table public.web_admin_report_workflow enable row level security;
alter table public.web_admin_case_notes enable row level security;
alter table public.web_admin_gdpr_requests enable row level security;
alter table public.web_admin_appeals enable row level security;
alter table public.web_admin_support_tickets enable row level security;
alter table public.web_admin_moderation_actions enable row level security;
alter table public.web_admin_sensitive_access_log enable row level security;

-- Role
drop policy if exists "Web admins manage role assignments" on public.web_admin_role_assignments;
create policy "Web admins manage role assignments"
  on public.web_admin_role_assignments for all
  using (public.is_web_admin())
  with check (public.is_web_admin());

-- Audit: insert + select, žádný update/delete
drop policy if exists "Web admins insert audit" on public.web_admin_audit_events;
create policy "Web admins insert audit"
  on public.web_admin_audit_events for insert
  with check (public.is_web_admin() and admin_user_id = auth.uid());

drop policy if exists "Web admins read audit" on public.web_admin_audit_events;
create policy "Web admins read audit"
  on public.web_admin_audit_events for select
  using (public.is_web_admin());

-- Workflow reportů
drop policy if exists "Web admins manage report workflow" on public.web_admin_report_workflow;
create policy "Web admins manage report workflow"
  on public.web_admin_report_workflow for all
  using (public.is_web_admin())
  with check (public.is_web_admin());

-- Poznámky
drop policy if exists "Web admins manage case notes" on public.web_admin_case_notes;
create policy "Web admins manage case notes"
  on public.web_admin_case_notes for all
  using (public.is_web_admin())
  with check (public.is_web_admin() and author_id = auth.uid());

-- GDPR
drop policy if exists "Web admins manage gdpr requests" on public.web_admin_gdpr_requests;
create policy "Web admins manage gdpr requests"
  on public.web_admin_gdpr_requests for all
  using (public.is_web_admin())
  with check (public.is_web_admin());

-- Odvolání
drop policy if exists "Web admins manage appeals" on public.web_admin_appeals;
create policy "Web admins manage appeals"
  on public.web_admin_appeals for all
  using (public.is_web_admin())
  with check (public.is_web_admin());

-- Support
drop policy if exists "Web admins manage support tickets" on public.web_admin_support_tickets;
create policy "Web admins manage support tickets"
  on public.web_admin_support_tickets for all
  using (public.is_web_admin())
  with check (public.is_web_admin());

-- Moderation actions
drop policy if exists "Web admins insert moderation actions" on public.web_admin_moderation_actions;
create policy "Web admins insert moderation actions"
  on public.web_admin_moderation_actions for insert
  with check (public.is_web_admin() and admin_user_id = auth.uid());

drop policy if exists "Web admins read moderation actions" on public.web_admin_moderation_actions;
create policy "Web admins read moderation actions"
  on public.web_admin_moderation_actions for select
  using (public.is_web_admin());

-- Sensitive access log
drop policy if exists "Web admins insert sensitive access" on public.web_admin_sensitive_access_log;
create policy "Web admins insert sensitive access"
  on public.web_admin_sensitive_access_log for insert
  with check (public.is_web_admin() and admin_user_id = auth.uid());

drop policy if exists "Web admins read sensitive access" on public.web_admin_sensitive_access_log;
create policy "Web admins read sensitive access"
  on public.web_admin_sensitive_access_log for select
  using (public.is_web_admin());

-- ---------------------------------------------------------------------------
-- POZNÁMKA: Čtení app tabulek (reports, profiles, messages, …) probíhá
-- přes serverové API se service_role — zde se app tabulky NEMĚNÍ.
-- Viz docs/APP_TABLE_ADMIN_REQUIREMENTS.md pro sloupce, které app musí mít.
-- ---------------------------------------------------------------------------
