import type { APIRoute } from 'astro';
import { z } from 'zod';
import { checkPassword, signSession, rateLimit, isSecure } from '../../../lib/auth';

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for') || 'local';
  if (!rateLimit(`login:${ip}`)) {
    return Response.json({ error: 'too many attempts' }, { status: 429 });
  }
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: 'invalid json' }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return Response.json({ error: 'invalid data' }, { status: 400 });
  const { username, password } = parsed.data;
  const juliUser = process.env.ADMIN_JULI_USER || 'juli';
  let role: 'juli' | null = null;
  if (username === juliUser && checkPassword(password)) role = 'juli';
  if (!role) return Response.json({ error: 'invalid credentials' }, { status: 401 });
  const token = signSession(role);
  const res = Response.json({ ok: true, role });
  res.headers.append('Set-Cookie', `admin_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60*60*24*7}${isSecure ? '; Secure' : ''}`);
  return res;
};
