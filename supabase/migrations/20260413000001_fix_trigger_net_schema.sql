-- Fix: trigger functions were calling extensions.net.http_post() which
-- Postgres interprets as a cross-database reference and rejects.
-- Correct call is net.http_post() — pg_net always registers in the net schema.

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
      'Authorization', 'Bearer sb_publishable_FO0hzMBNbuV9y_6abg4Ptw_er2vCvKi'
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
      'Authorization', 'Bearer sb_publishable_FO0hzMBNbuV9y_6abg4Ptw_er2vCvKi'
    ),
    body    := to_jsonb(NEW)
  );
  return NEW;
end;
$$;
