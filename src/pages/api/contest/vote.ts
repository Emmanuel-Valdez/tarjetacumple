import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../../db';
import { contestCategories, contestVotes, photos } from '../../../db/schema';
import { and, eq } from 'drizzle-orm';
import { contestStatus } from '../../../lib/contest';
import { getVisitorId, visitorCookie } from '../../../lib/visitor';

const schema = z.object({
  categoryId: z.number().int().positive(),
  photoId: z.number().int().positive(),
});

export const POST: APIRoute = async ({ request }) => {
  const { id: visitorId, isNew } = getVisitorId(request.headers.get('cookie'));
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'invalid json' }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return Response.json({ error: 'invalid data' }, { status: 400 });
  if (contestStatus() !== 'open') {
    return Response.json({ error: 'el concurso no esta abierto' }, { status: 409 });
  }
  const { categoryId, photoId } = parsed.data;

  const cats = await db.select().from(contestCategories).where(eq(contestCategories.id, categoryId));
  if (!cats[0]) return Response.json({ error: 'categoria inexistente' }, { status: 404 });
  const rows = await db.select().from(photos).where(eq(photos.id, photoId));
  if (!rows[0]) return Response.json({ error: 'foto inexistente' }, { status: 404 });
  if (rows[0].kind !== 'contest') {
    return Response.json({ error: 'esa foto no es candidata del concurso' }, { status: 400 });
  }

  const voted = await db
    .select({ id: contestVotes.id })
    .from(contestVotes)
    .where(and(eq(contestVotes.categoryId, categoryId), eq(contestVotes.visitorId, visitorId)));
  if (voted.length) {
    return Response.json({ error: 'ya votaste en esta categoria' }, { status: 409 });
  }
  try {
    await db.insert(contestVotes).values({ categoryId, photoId, visitorId });
  } catch {
    // Carrera del doble toque: el UNIQUE de la base lo frena.
    return Response.json({ error: 'ya votaste en esta categoria' }, { status: 409 });
  }
  const res = Response.json({ ok: true });
  if (isNew) res.headers.append('Set-Cookie', visitorCookie(visitorId));
  return res;
};
