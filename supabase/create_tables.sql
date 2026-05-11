-- Run this entire file in Supabase SQL Editor
-- Dashboard > SQL Editor > New query > paste > Run

-- ── user_workspace ──────────────────────────────────────────────
create table if not exists user_workspace (
  id                  uuid primary key default gen_random_uuid(),
  clerk_user_id       text not null unique,
  subject             text default '',
  research_question   text default '',
  supervisor_name     text default '',
  submission_deadline date default null,
  has_paid            boolean not null default false,
  tier                text check (tier in ('basic', 'premium')) default null,
  paid_at             timestamptz default null,
  essay_text          text default null,
  essay_updated_at    timestamptz default null,
  trial_started_at    timestamptz default null,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- ── subscribers ──────────────────────────────────────────────────
create table if not exists subscribers (
  id               uuid primary key default gen_random_uuid(),
  email            text not null unique,
  source           text default 'unknown',
  subscribed_at    timestamptz default now(),
  email_1_sent_at  timestamptz,
  email_2_sent_at  timestamptz,
  email_3_sent_at  timestamptz,
  unsubscribed_at  timestamptz
);

-- ── module_progress ──────────────────────────────────────────────
create table if not exists module_progress (
  id             uuid primary key default gen_random_uuid(),
  clerk_user_id  text not null,
  module_id      text not null,
  visited_at     timestamptz default now(),
  unique (clerk_user_id, module_id)
);

-- ── dump_entries ─────────────────────────────────────────────────
create table if not exists dump_entries (
  id             uuid primary key default gen_random_uuid(),
  clerk_user_id  text not null,
  url            text,
  title          text,
  note           text,
  source_type    text,
  citation_mla   text,
  created_at     timestamptz default now()
);

-- ── planner_milestones ───────────────────────────────────────────
create table if not exists planner_milestones (
  id             uuid primary key default gen_random_uuid(),
  clerk_user_id  text not null,
  title          text not null,
  due_date       date,
  completed      boolean default false,
  created_at     timestamptz default now()
);

-- ── share_tokens ─────────────────────────────────────────────────
create table if not exists share_tokens (
  id             uuid primary key default gen_random_uuid(),
  clerk_user_id  text not null,
  token          text not null unique,
  essay_text     text,
  created_at     timestamptz default now()
);
