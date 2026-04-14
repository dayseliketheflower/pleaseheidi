-- Fix: trigger functions were sending the publishable key (sb_publishable_...)
-- as the Authorization bearer. Supabase Edge Functions require a JWT.
-- Updated to use the legacy JWT anon key.

create or replace function public.notify_waitlist_confirmation()
returns trigger
language plpgsql
security definer
set search_path = public, net
as $$
begin
  perform net.http_post(
    url     := 'https://dzowogyemuauogzwylfv.supabase.co/functions/v1/send-waitlist-confirmation',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6b3dvZ3llbXVhdW9nend5bGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1Njk3MTUsImV4cCI6MjA5MDE0NTcxNX0.79E8pYmWBsFZu2EfIxhHnVH727UsFbgtnTUmIdB6-lM'
    ),
    body    := to_jsonb(NEW)
  );
  return NEW;
end;
$$;

create or replace function public.notify_companion_confirmation()
returns trigger
language plpgsql
security definer
set search_path = public, net
as $$
begin
  perform net.http_post(
    url     := 'https://dzowogyemuauogzwylfv.supabase.co/functions/v1/send-companion-confirmation',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6b3dvZ3llbXVhdW9nend5bGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1Njk3MTUsImV4cCI6MjA5MDE0NTcxNX0.79E8pYmWBsFZu2EfIxhHnVH727UsFbgtnTUmIdB6-lM'
    ),
    body    := to_jsonb(NEW)
  );
  return NEW;
end;
$$;
