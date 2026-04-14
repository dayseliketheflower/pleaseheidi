-- Add status column to provider_applications
alter table public.provider_applications
  add column if not exists status text not null default 'Pending';

-- Create admin_log table
create table if not exists public.admin_log (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),
  action      text        not null,
  target_table text       not null,
  target_id   uuid,
  old_value   text,
  new_value   text,
  note        text
);

-- No RLS on admin_log — only accessible via service role key from Edge Functions/Functions
