import type { APIRoute } from 'astro';
import { db } from '../../db';
import { photos, likes, contest } from '../../db/schema';
import { eq, inArray, sql } from 'drizzle-orm';
import { getVisitorId, visitorCookie } from '../../lib/visitor';

export const GET: APIRoute = async ({ request }) => {
  const { id: visitorId, isNew } = getVisitorId(request.headers.get('cookie'));
  const url = new URL(request.url);
  const wantContest = url.searchParams.get('kind') === 'contest';
  const status =
    db.select({ s: contest.status }).from(contest).where(eq(contest.id, 1)).all()[0]?.s ??
    'idle';
  // Las candidatas del concurso no van a las tiras mientras el concurso esta abierto.
  const kinds = wantContest
    ? ['contest']
    : status === 'open'
      ? ['backstage']
      : ['backstage', 'contest'];
  const rows = await db
    .select()
    .from(photos)
    .where(inArray(photos.kind, kinds))
    .orderBy(photos.sortOrder, photos.id);
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
    // Las fotos estaticas viven en public/ y las subidas en el volumen de uploads.
    url: p.filename.startsWith('/') ? p.filename : `/api/photos/${p.id}/file`,
    alt: p.alt,
    kind: p.kind,
    likes: countMap.get(p.id) ?? 0,
    liked: likedSet.has(p.id),
  }));
  const res = Response.json({ photos: data });
  if (isNew) res.headers.append('Set-Cookie', visitorCookie(visitorId));
  return res;
};
