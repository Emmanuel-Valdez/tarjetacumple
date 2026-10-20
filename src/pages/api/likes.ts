import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../db';
import { likes, photos } from '../../db/schema';
import { sql, eq, and } from 'drizzle-orm';
import { getVisitorId, visitorCookie } from '../../lib/visitor';

const schema = z.object({ photoId: z.number().int().positive() });

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: 'invalid json' }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return Response.json({ error: 'invalid data' }, { status: 400 });
  const { photoId } = parsed.data;
  const { id: visitorId, isNew } = getVisitorId(request.headers.get('cookie'));
  const exists = await db.select().from(photos).where(eq(photos.id, photoId));
  if (!exists.length) return Response.json({ error: 'not found' }, { status: 404 });
  const already = await db.select().from(likes).where(and(eq(likes.photoId, photoId), eq(likes.visitorId, visitorId)));
  if (!already.length) {
    await db.insert(likes).values({ photoId, visitorId });
  }
  const rows = await db.select({ count: sql<number>`count(*)` }).from(likes).where(eq(likes.photoId, photoId));
  const res = Response.json({ likes: rows[0]?.count ?? 0, liked: true });
  if (isNew) res.headers.append('Set-Cookie', visitorCookie(visitorId));
  return res;
};