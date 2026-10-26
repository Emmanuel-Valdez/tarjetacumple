import { createHmac, timingSafeEqual } from 'node:crypto';
import './env';

export type Role = 'juli';

const DEV_SECRET = 'dev-secret-change-me';

// En produccion el secret es obligatorio: sin el, cualquiera podria forjar una sesion de admin.
const secret = (() => {
  const s = process.env.SESSION_SECRET;
  if (process.env.NODE_ENV === 'production' && (!s || s === DEV_SECRET)) {
    throw new Error('SESSION_SECRET es obligatorio en produccion');
  }
  return s || DEV_SECRET;
})();

export const isSecure = process.env.NODE_ENV === 'production';

export function checkPassword(password: string): boolean {
  const envPass = process.env.ADMIN_JULI_PASSWORD;
  if (!envPass) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(envPass);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function signSession(role: Role): string {
  const payload = `${role}.${Date.now() + 1000 * 60 * 60 * 24 * 7}`;
  const sig = createHmac('sha256', secret).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function verifySession(token: string | undefined): Role | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [role, exp, sig] = parts;
  if (role !== 'juli') return null;
  const expected = createHmac('sha256', secret).update(`${role}.${exp}`).digest('hex');
  if (sig !== expected) return null;
  if (Date.now() > Number(exp)) return null;
  return role as Role;
}

// simple in-memory rate limit for login
const attempts = new Map<string, { count: number; reset: number }>();
export function rateLimit(key: string, max = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const rec = attempts.get(key);
  if (!rec || now > rec.reset) {
    attempts.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  if (rec.count >= max) return false;
  rec.count++;
  return true;
}
