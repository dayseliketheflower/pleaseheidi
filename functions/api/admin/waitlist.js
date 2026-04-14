import { isAuthed, unauthorized } from '../../_shared/auth.js';

export async function onRequestGet(context) {
  if (!(await isAuthed(context.request, context.env))) return unauthorized();

  const res = await fetch(
    `${context.env.SUPABASE_URL}/rest/v1/client_signups?select=*&order=created_at.desc`,
    {
      headers: {
        apikey: context.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${context.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );

  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
