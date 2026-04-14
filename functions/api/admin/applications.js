import { isAuthed, unauthorized } from '../../_shared/auth.js';

const VALID_STATUSES = ['Pending', 'Approved', 'Rejected', 'Interview Scheduled'];

export async function onRequestGet(context) {
  if (!(await isAuthed(context.request, context.env))) return unauthorized();

  const res = await fetch(
    `${context.env.SUPABASE_URL}/rest/v1/provider_applications?select=*&order=created_at.desc`,
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

export async function onRequestPatch(context) {
  if (!(await isAuthed(context.request, context.env))) return unauthorized();

  let body;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Bad request' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id, status, old_status } = body;

  if (!id || !VALID_STATUSES.includes(status)) {
    return new Response(JSON.stringify({ error: 'Invalid id or status' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  // Update status
  const updateRes = await fetch(
    `${context.env.SUPABASE_URL}/rest/v1/provider_applications?id=eq.${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: {
        apikey: context.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${context.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!updateRes.ok) {
    const err = await updateRes.text();
    return new Response(JSON.stringify({ error: err }), {
      status: 502, headers: { 'Content-Type': 'application/json' },
    });
  }

  // Write to activity log
  await fetch(`${context.env.SUPABASE_URL}/rest/v1/admin_log`, {
    method: 'POST',
    headers: {
      apikey: context.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${context.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      action: 'status_update',
      target_table: 'provider_applications',
      target_id: id,
      old_value: old_status || 'Pending',
      new_value: status,
      note: `Status changed from "${old_status || 'Pending'}" to "${status}"`,
    }),
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
