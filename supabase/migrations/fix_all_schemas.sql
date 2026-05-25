-- ============================================================
-- FIX ALL SCHEMAS — run this in Supabase SQL Editor
-- Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- ── 1. user_workspace: ensure essay + payment columns exist ──
alter table user_workspace
  add column if not exists essay_text        text          default null,
  add column if not exists essay_updated_at  timestamptz   default null,
  add column if not exists has_paid          boolean       not null default false,
  add column if not exists tier              text          default null,
  add column if not exists paid_at           timestamptz   default null,
  add column if not exists agent_free_uses   integer       default 0;

-- ── 2. planner_milestones: add all columns the app actually writes ──
-- Original schema had: id, clerk_user_id, title, due_date, completed, created_at
-- App writes:          label, phase, weeks_before, is_custom, sort_order
alter table planner_milestones
  add column if not exists label        text     default '',
  add column if not exists phase        text     default '',
  add column if not exists weeks_before integer  default null,
  add column if not exists is_custom    boolean  default false,
  add column if not exists sort_order   integer  default 0;

create index if not exists planner_milestones_user_idx
  on planner_milestones (clerk_user_id);

-- ── 3. subscribers: add paid_at so email sequence cron works ──
alter table subscribers
  add column if not exists paid_at timestamptz default null;

-- ── 4. dump_entries: ensure all columns exist ──
alter table dump_entries
  add column if not exists source_name    text    default '',
  add column if not exists author         text    default '',
  add column if not exists year           text    default '',
  add column if not exists publisher      text    default '',
  add column if not exists link           text    default '',
  add column if not exists source_type    text    default 'Website',
  add column if not exists key_info       text    default '',
  add column if not exists subtopic       text    default '',
  add column if not exists subtopic_color text    default '#6366f1',
  add column if not exists used           boolean default false,
  add column if not exists sort_order     integer default 0;

create index if not exists dump_entries_user_idx
  on dump_entries (clerk_user_id);

-- ── 5. share_tokens: create if missing, add index ──
create table if not exists share_tokens (
  id             uuid primary key default gen_random_uuid(),
  clerk_user_id  text not null,
  token          text not null unique,
  created_at     timestamptz default now()
);

create index if not exists share_tokens_token_idx
  on share_tokens (token);

create index if not exists share_tokens_user_idx
  on share_tokens (clerk_user_id);

-- Done! All tables now match what the app reads/writes.
