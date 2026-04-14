/**
 * HMAC-SHA256 session cookie helpers for Cloudflare Pages Functions.
 * Session token format: "{timestamp}.{hmac_hex}"
 * Expiry: 24 hours (86400 seconds)
 */

const SESSION_MAX_AGE_MS = 86_400_000; // 24h

/** Sign a string with HMAC-SHA256, return hex. */
export async function sign(data, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  );
  const buf = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Constant-time string equality to prevent timing attacks. */
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Create a signed session token from the current timestamp. */
export async function createToken(secret) {
  const ts = Date.now().toString();
  const sig = await sign(ts, secret);
  return `${ts}.${sig}`;
}

/** Verify a session token. Returns true if valid and not expired. */
export async function verifyToken(token, secret) {
  if (!token) return false;
  const dot = token.lastIndexOf('.');
  if (dot === -1) return false;
  const ts = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const age = Date.now() - parseInt(ts, 10);
  if (isNaN(age) || age < 0 || age > SESSION_MAX_AGE_MS) return false;
  const expected = await sign(ts, secret);
  return safeEqual(expected, sig);
}

/** Extract admin_session cookie value from a Request. */
export function getSessionToken(request) {
  const cookies = request.headers.get('Cookie') || '';
  const m = cookies.match(/(?:^|;\s*)admin_session=([^;\s]+)/);
  return m ? m[1] : null;
}

/** Set-Cookie header value to establish a session. */
export function makeSetCookie(token) {
  return `admin_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`;
}

/** Set-Cookie header value to clear a session. */
export function makeClearCookie() {
  return `admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

/** Check auth from request + env, return bool. */
export async function isAuthed(request, env) {
  const token = getSessionToken(request);
  return verifyToken(token, env.ADMIN_PASSWORD);
}

/** Return 401 JSON response. */
export function unauthorized() {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}
