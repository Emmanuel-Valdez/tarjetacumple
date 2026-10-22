import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../../db';
import { contest, contestCategories, contestVotes, photos } from '../../../db/schema';
import { verifySession } from '../../../lib/auth';
import { contestStatus } from '../../../lib/contest';
import { AWARDS } from '../../../data/awards';
import { eq, sql } from 'drizzle-orm';

const schema = z.object({
  action: z.enum(['open', 'close', 'reset']),
  confirm: z.string().optional(),
});

function roleFromRequest(request: Request) {
  const match = request.headers.get('cookie')?.match(/(?:^|;\s*)admin_session=([^;]+)/);
  return verifySession(match ? decodeURIComponent(match[1]) : undefined);
}

function photoUrl(p: { id: number; filename: string }) {
  return p.filename.startsWith('/') ? p.filename : `/api/photos/${p.id}/file`;
}

export const GET: APIRoute = async ({ request }) => {
  if (!roleFromRequest(request)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const categories = db
    .select()
    .from(contestCategories)
    .orderBy(contestCategories.position, contestCategories.id)
    .all();
  const counts = db
    .select({
      categoryId: contestVotes.categoryId,
      photoId: contestVotes.photoId,
      votes: sql<number>`count(*)`,
    })
    .from(contestVotes)
    .groupBy(contestVotes.categoryId, contestVotes.photoId)
    .all();
  const candidates = db
    .select()
    .from(photos)
    .where(eq(photos.kind, 'contest'))
    .orderBy(photos.sortOrder, photos.id)
    .all();
  const tally = new Map(counts.map((c) => [`${c.categoryId}:${c.photoId}`, c.votes]));
  return Response.json({
    status: contestStatus(),
    totalVotes: counts.reduce((n, c) => n + c.votes, 0),
    categories: categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      emoji: c.emoji,
      teaser: c.teaser,
      winnerPhotoId: c.winnerPhotoId,
      winnerVotes: c.winnerVotes,
      tally: candidates.map((p) => ({
        photoId: p.id,
        url: photoUrl(p),
        alt: p.alt,
        votes: tally.get(`${c.id}:${p.id}`) ?? 0,
      })),
    })),
  });
};

export const POST: APIRoute = async ({ request }) => {
  if (!roleFromRequest(request)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'invalid json' }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return Response.json({ error: 'invalid data' }, { status: 400 });
  const { action, confirm } = parsed.data;
  const status = contestStatus();

  if (action === 'open') {
    // Cerrar es definitivo: no hay reapertura (D5).
    if (status === 'closed') {
      return Response.json({ error: 'el concurso ya cerro y no se puede reabrir' }, { status: 409 });
    }
    // Abrir dos veces mantiene la lista congelada la primera vez.
    if (status === 'open') return Response.json({ ok: true, status: 'open' });
    const now = new Date();
    db.transaction((tx) => {
      tx.insert(contestCategories)
        .values(
          AWARDS.map((a, i) => ({
            slug: a.slug,
            title: a.title,
            emoji: a.emoji,
            teaser: a.teaser,
            position: i,
          })),
        )
        .run();
      tx.insert(contest)
        .values({ id: 1, status: 'open', openedAt: now })
        .onConflictDoUpdate({
          target: contest.id,
          set: { status: 'open', openedAt: now, closedAt: null },
        })
        .run();
    });
    return Response.json({ ok: true, status: 'open' });
  }

  if (action === 'close') {
    if (status !== 'open') {
      return Response.json({ error: 'el concurso no esta abierto' }, { status: 409 });
    }
    const categories = db.select().from(contestCategories).all();
    const counts = db
      .select({
        categoryId: contestVotes.categoryId,
        photoId: contestVotes.photoId,
        votes: sql<number>`count(*)`,
      })
      .from(contestVotes)
      .groupBy(contestVotes.categoryId, contestVotes.photoId)
      .all();
    db.transaction((tx) => {
      for (const c of categories) {
        const best = counts
          .filter((t) => t.categoryId === c.id)
          .sort((a, b) => b.votes - a.votes || a.photoId - b.photoId)[0];
        tx.update(contestCategories)
          .set({ winnerPhotoId: best?.photoId ?? null, winnerVotes: best?.votes ?? null })
          .where(eq(contestCategories.id, c.id))
          .run();
      }
      tx.update(contest)
        .set({ status: 'closed', closedAt: new Date() })
        .where(eq(contest.id, 1))
        .run();
    });
    return Response.json({ ok: true, status: 'closed' });
  }

  // reset: borra votos y ganadores, vacia las categorias y vuelve a idle. Las fotos no se tocan.
  if (confirm !== 'reiniciar') {
    return Response.json({ error: 'escribi "reiniciar" para confirmar' }, { status: 400 });
  }
  db.transaction((tx) => {
    tx.delete(contestVotes).run();
    tx.delete(contestCategories).run();
    tx.insert(contest)
      .values({ id: 1, status: 'idle' })
      .onConflictDoUpdate({
        target: contest.id,
        set: { status: 'idle', openedAt: null, closedAt: null },
      })
      .run();
  });
  return Response.json({ ok: true, status: 'idle' });
};
