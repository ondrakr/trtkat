# Web admin — nasazené Supabase schéma

**Project ref:** `zfowzsmpsmsfwtfzxyjr`  
**Migrace na remote:** `20260702013000_web_admin_moderation.sql`

Web admin čte app data přes **serverové API** (`SUPABASE_SERVICE_ROLE_KEY`), ne přes anon klíč.

---

## Tabulka `reports` (app — rozšířená, neměnit z webu)

### Nové sloupce (trigger doplňuje z legacy)
| Sloupec | Zdroj |
|---------|--------|
| `reported_user_id` | z `target_id` |
| `report_type` | z `reason` |
| `description` | z `details` |
| `message_id` | app |
| `photo_id` | app |
| `voice_message_id` | app |

### Původní app sloupce (mobilní app dál zapisuje)
`id`, `reporter_id`, `target_id`, `match_id`, `reason`, `details`, `include_chat`, `chat_snapshot`, `status`, `created_at`

### Admin používá
- Profil: `reported_user_id`
- Zpráva: `message_id`
- Fotka: `photo_id`
- Audio: `voice_message_id`
- Kontext chatu: `chat_snapshot`, případně `match_id` / `message_id` (po zalogování citlivého přístupu)

---

## `web_admin_report_workflow`

| Sloupec | Hodnoty |
|---------|---------|
| `report_id` | uuid (PK) |
| `status` | `open`, `reviewing`, `waiting`, `resolved`, `rejected` |
| `priority` | `P0`–`P3` |
| `assigned_to` | uuid |
| `decision` | text |
| `resolved_at` | timestamptz |
| `updated_at` | timestamptz |

Starší sloupce (`workflow_status`, `decision_reason`, …) mohou na remote existovat — kód je toleruje.

---

## Moderátorské akce (`web_admin_moderation_actions`)

Povolené `action_type`:
- `hide_profile`
- `restrict_account`
- `ban_account`
- `hide_from_discovery`
- `restore_profile`
- `unrestrict_account`
- `unban_account`

Web admin **nezapisuje přímo** do app tabulek — pouze do `web_admin_*` + audit.

---

## Role (`web_admin_role_assignments`)

`support` | `moderator` | `security` | `super_admin`

Bez řádku v tabulce = `super_admin` (výchozí).

---

## Co admin nečte běžně

- `swipes`, kompletní `matches` historie
- kompletní `messages` / `voice_messages` bez reportu
- přesná GPS

---

## Lokální migrace v repu

`supabase/migrations/006_web_admin_moderation.sql` je referenční kopie.  
Na produkci platí `20260702013000_web_admin_moderation.sql`.
