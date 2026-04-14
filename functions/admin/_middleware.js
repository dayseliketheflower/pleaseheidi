import { isAuthed } from '../_shared/auth.js';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.replace(/\/+$/, ''); // strip trailing slash

  // Login page is always accessible
  if (path === '/admin/login') {
    return context.next();
  }

  const authed = await isAuthed(context.request, context.env);
  if (!authed) {
    return Response.redirect(new URL('/admin/login', context.request.url).toString(), 302);
  }

  return context.next();
}
