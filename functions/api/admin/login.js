import { createToken, makeSetCookie } from '../../_shared/auth.js';

export async function onRequestPost(context) {
  let body;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Bad request' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!context.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'ADMIN_PASSWORD not configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body.password || body.password !== context.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), {
      status: 401, headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = await createToken(context.env.ADMIN_PASSWORD);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': makeSetCookie(token),
    },
  });
}
