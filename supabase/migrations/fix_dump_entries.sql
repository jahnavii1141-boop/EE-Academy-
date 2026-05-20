-- Migration: fix dump_entries schema to match the app's API
-- Run this in Supabase Dashboard → SQL Editor → New query → Run

-- Drop the old table (it had wrong columns: url, title, note, citation_mla)
drop table if exists dump_entries;

-- Recreate with the correct columns that the app actually uses
create table dump_entries (
  id             uuid primary key default gen_random_uuid(),
  clerk_user_id  text not null,
  source_name    text default '',
  author         text default '',
  year           text default '',
  publisher      text default '',
  link           text default '',
  source_type    text default 'Website',
  key_info       text default '',
  subtopic       text default '',
  subtopic_color text default '#6366f1',
  used           boolean default false,
  sort_order     integer default 0,
  created_at     timestamptz default now()
);

create index if not exists dump_entries_user_idx on dump_entries (clerk_user_id);
