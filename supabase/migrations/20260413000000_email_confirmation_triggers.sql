-- Enable pg_net for outbound HTTP requests from Postgres
create extension if not exists pg_net with schema extensions;

-- ──────────────────────────────────────────────
-- Trigger 1: client_signups → send-waitlist-confirmation
-- ──────────────────────────────────────────────

create or replace function public.notify_waitlist_confirmation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform extensions.net.http_post(
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

drop trigger if exists on_client_signup_send_confirmation on public.client_signups;

create trigger on_client_signup_send_confirmation
  after insert on public.client_signups
  for each row execute function public.notify_waitlist_confirmation();

-- ──────────────────────────────────────────────
-- Trigger 2: provider_applications → send-companion-confirmation
-- ──────────────────────────────────────────────

create or replace function public.notify_companion_confirmation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform extensions.net.http_post(
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

drop trigger if exists on_companion_application_send_confirmation on public.provider_applications;

create trigger on_companion_application_send_confirmation
  after insert on public.provider_applications
  for each row execute function public.notify_companion_confirmation();
