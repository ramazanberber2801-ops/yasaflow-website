alter table public.organizations
  add column if not exists paddle_customer_id text,
  add column if not exists paddle_subscription_id text,
  add column if not exists paddle_transaction_id text,
  add column if not exists paddle_price_ids text[] not null default '{}',
  add column if not exists subscription_updated_at timestamptz;

create unique index if not exists organizations_paddle_subscription_id_key
  on public.organizations (paddle_subscription_id)
  where paddle_subscription_id is not null;

create table if not exists public.paddle_webhook_events (
  event_id text primary key,
  event_type text not null,
  occurred_at timestamptz,
  processed_at timestamptz not null default now(),
  organization_id text references public.organizations(id) on delete set null,
  payload jsonb not null
);

alter table public.paddle_webhook_events enable row level security;
revoke all on public.paddle_webhook_events from anon, authenticated;
