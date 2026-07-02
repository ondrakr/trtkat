# Požadavky na app tabulky pro web admin (ke schválení mobilním vývojářem)

Web admin **nemění** existující app tabulky. Čte je přes serverové API (`service_role`).
Moderátorské akce se zapisují do nových tabulek `web_admin_*` a audit logu.

Pokud sloupce neodpovídají, admin UI zobrazí prázdná pole nebo chybu — je potřeba sladit schéma.

---

## Tabulka `reports` (povinná pro moderaci)

Admin očekává minimálně tyto sloupce (názvy mohou být aliasy — viz mapování v `api/admin/reports.js`):

| Účel | Očekávané sloupce (první nalezený se použije) |
|------|-----------------------------------------------|
| ID | `id` (uuid) |
| Typ reportu | `report_type`, `type`, `category`, `reason` |
| Stav v app | `status`, `report_status` |
| Kdo nahlásil | `reporter_id`, `reporter_user_id`, `reported_by` |
| Nahlášený uživatel | `reported_user_id`, `reported_id`, `target_user_id`, `user_id` |
| Nahlášená zpráva | `message_id`, `reported_message_id` |
| Nahlášená fotka | `photo_id`, `profile_photo_id`, `reported_photo_id` |
| Audio zpráva | `voice_message_id`, `audio_message_id` |
| Popis | `description`, `details`, `note` |
| Čas | `created_at`, `inserted_at` |

### Doporučené hodnoty `report_type` / `type`

`profile`, `photo`, `message`, `audio`, `spam`, `fraud`, `harassment`, `minor`, `child_safety`, `csam`, `csea`

### Co mobilní vývojář může přidat (VYŽADUJE SCHVÁLENÍ — neměnit bez domluvy)

- `priority` na reportu (jinak se řídí `web_admin_report_workflow.priority`)
- `assigned_to` (jinak `web_admin_report_workflow.assigned_to`)
- indexy pro frontu reportů

---

## Tabulka `profiles` (veřejný profil)

Admin zobrazuje **jen veřejný rozsah** (jak vidí ostatní uživatelé):

| Účel | Sloupce |
|------|---------|
| ID | `id` |
| Jméno | `display_name`, `name`, `username` |
| Bio | `bio`, `about`, `description` |
| Stav účtu | `status`, `account_status` |

**Nezobrazovat defaultně:** citlivé preference, přesná GPS, interní flagy.

### Akce moderace (vyžaduje app implementaci)

Web admin zatím pouze **loguje** akce do `web_admin_moderation_actions`:

- `hide_profile`, `restrict_account`, `ban_account`, `hide_from_discovery`

Mobilní app / backend musí tyto akce **aplikovat** na `profiles` nebo ekvivalent.

---

## Tabulka `profile_photos`

| Účel | Sloupce |
|------|---------|
| ID | `id` |
| URL | `url`, `storage_path`, `image_url` |
| Vlastník | `user_id` / `profile_id` |

---

## Tabulka `messages` (pouze nahlášené)

Admin čte zprávu **jen** pokud `reports.message_id` odkazuje na `messages.id`.
Okolní kontext: stejný `conversation_id` nebo `match_id` (max ~20 zpráv).

| Účel | Sloupce |
|------|---------|
| ID | `id` |
| Text | `content`, `body`, `text` |
| Konverzace | `conversation_id` nebo `match_id` |
| Odesílatel | `sender_id` |

---

## Tabulka `voice_messages` (pouze nahlášené)

| Účel | Sloupce |
|------|---------|
| ID | `id` |
| URL | `url`, `storage_path`, `audio_url` |

---

## Tabulka `blocks` (kontext v reportu)

| Účel | Sloupce |
|------|---------|
| Kdo blokuje | `blocker_id` |
| Koho | `blocked_id` |

**Nezobrazovat:** kompletní historii blokací mimo konkrétní report.

---

## Co admin NIKDY nečte běžně

- `swipes` — kompletní historie liků/passů
- `matches` — kompletní historie matchů/unmatchů
- `messages` / `voice_messages` bez vazby na report
- Přesná GPS (žádná tabulka by ji adminu neměla servírovat)
- Hesla, tokeny, session

---

## Nové web tabulky (migrace 006)

Spusť `supabase/migrations/006_web_admin_moderation.sql`:

- `web_admin_role_assignments` — role: support, moderator, security, super_admin
- `web_admin_audit_events` — audit (append-only)
- `web_admin_report_workflow` — priorita, stav, rozhodnutí
- `web_admin_case_notes` — interní poznámky
- `web_admin_gdpr_requests` — export, oprava, souhlas
- `web_admin_appeals` — odvolání
- `web_admin_support_tickets` — support fronta
- `web_admin_moderation_actions` — záznam akcí
- `web_admin_sensitive_access_log` — důvod otevření citlivého obsahu

Výchozí role: admin v `web_admin_users` bez řádku v `role_assignments` = `super_admin`.

---

## Env na Vercelu

- `SUPABASE_SERVICE_ROLE_KEY` — legacy JWT `eyJ…` (povinné pro `/api/admin/*`)
- `VITE_SUPABASE_URL` — bez `/rest/v1` na konci

---

## 2FA

Supabase Auth MFA pro admin účty zapni v Dashboard → Authentication → MFA.
Web admin zatím MFA nevyžaduje v kódu — doporučeno zapnout ručně pro oba účty.
