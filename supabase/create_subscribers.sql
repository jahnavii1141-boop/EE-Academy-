create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'unknown',
  subscribed_at timestamptz default now(),
  email_1_sent_at timestamptz,
  email_2_sent_at timestamptz,
  email_3_sent_at timestamptz,
  unsubscribed_at timestamptz
);

create index if not exists subscribers_email_idx on subscribers(email);
create index if not exists subscribers_subscribed_at_idx on subscribers(subscribed_at);
