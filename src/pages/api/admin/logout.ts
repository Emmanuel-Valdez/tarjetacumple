import type { APIRoute } from 'astro';

export const POST: APIRoute = async () => {
  const res = Response.json({ ok: true });
  res.headers.append('Set-Cookie', 'admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  return res;
};
