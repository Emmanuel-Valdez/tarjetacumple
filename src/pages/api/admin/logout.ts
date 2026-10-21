import type { APIRoute } from 'astro';
import { isSecure } from '../../../lib/auth';

export const POST: APIRoute = async () => {
  const res = Response.json({ ok: true });
  res.headers.append('Set-Cookie', `admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${isSecure ? '; Secure' : ''}`);
  return res;
};
