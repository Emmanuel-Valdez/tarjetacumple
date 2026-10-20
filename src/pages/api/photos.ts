import type { APIRoute } from 'astro';
import { db } from '../../db';
import { photos, likes } from '../../db/schema';
import { sql } from 'drizzle-orm';
import { getVisitorId, visitorCookie } from '../../lib/visitor';

export const GET: APIRoute = async ({ request }) => {
  const { id: visitorId, isNew } = getVisitorId(request.headers.get('cookie'));
  const rows = await db.select().from(photos).orderBy(photos.sortOrder, photos.id);
  const counts = await db
    .select({ photoId: likes.photoId, count: sql<number>`count(*)` })
    .from(likes)
    .groupBy(likes.photoId);
  const liked = await db
    .select({ photoId: likes.photoId })
    .from(likes)
    .where(sql`${likes.visitorId} = ${visitorId}`);
  const countMap = new Map(counts.map((c) => [c.photoId, c.count]));
  const likedSet = new Set(liked.map((l) => l.photoId));
  const data = rows.map((p) => ({
    id: p.id,
    url: `/api/photos/${p.id}/file`,
    alt: p.alt,
    likes: countMap.get(p.id) ?? 0,
    liked: likedSet.has(p.id),
  }));
  const res = Response.json({ photos: data });
  if (isNew) res.headers.append('Set-Cookie', visitorCookie(visitorId));
  return res;
};