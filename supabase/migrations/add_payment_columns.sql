-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- Adds payment fields to user_workspace table

alter table user_workspace
  add column if not exists has_paid boolean not null default false,
  add column if not exists tier text check (tier in ('basic', 'premium')) default null,
  add column if not exists paid_at timestamptz default null;

-- Optional: add essay columns while we're here
alter table user_workspace
  add column if not exists essay_text text default null,
  add column if not exists essay_updated_at timestamptz default null;
