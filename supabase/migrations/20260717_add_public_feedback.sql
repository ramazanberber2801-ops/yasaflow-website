create table if not exists public.public_feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  category text not null check (category in ('idea', 'bug', 'feature', 'other')),
  message text not null check (char_length(message) between 10 and 4000),
  locale text not null default 'nb' check (locale in ('en', 'nb', 'tr')),
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'planned', 'in_progress', 'completed', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.public_feedback enable row level security;

create policy "Anyone can submit public feedback"
on public.public_feedback
for insert
to anon, authenticated
with check (
  char_length(name) between 1 and 120
  and char_length(email) between 3 and 254
  and char_length(message) between 10 and 4000
  and category in ('idea', 'bug', 'feature', 'other')
  and locale in ('en', 'nb', 'tr')
);

create index if not exists public_feedback_created_at_idx
on public.public_feedback (created_at desc);
