import { randomUUID } from 'node:crypto';

export function getVisitorId(cookieHeader: string | null): { id: string; isNew: boolean } {
  const match = cookieHeader?.match(/(?:^|;\s*)visitor_id=([^;]+)/);
  if (match) return { id: decodeURIComponent(match[1]), isNew: false };
  return { id: randomUUID(), isNew: true };
}

export function visitorCookie(id: string): string {
  return `visitor_id=${encodeURIComponent(id)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 365}`;
}