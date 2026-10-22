import type { APIRoute } from 'astro';
import { db } from '../../db';
import { contestCategories, contestVotes } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { contestStatus } from '../../lib/contest';
import { getVisitorId, visitorCookie } from '../../lib/visitor';

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const GET: APIRoute = async ({ request }) => {
  const { id: visitorId, isNew } = getVisitorId(request.headers.get('cookie'));
  const status = contestStatus();
  const rows = await db
    .select()
    .from(contestCategories)
    .orderBy(contestCategories.position, contestCategories.id);
  const mine = await db
    .select({ categoryId: contestVotes.categoryId })
    .from(contestVotes)
    .where(eq(contestVotes.visitorId, visitorId));
  const voted = new Set(mine.map((m) => m.categoryId));
  // El orden es aleatorio para que no siempre se vote la misma categoria primero.
  const categories = shuffle(rows).map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    emoji: c.emoji,
    teaser: c.teaser,
    voted: voted.has(c.id),
    // El conteo solo aparece cuando el concurso cerro (D8: sin tally durante la votacion).
    ...(status === 'closed' ? { winnerPhotoId: c.winnerPhotoId, winnerVotes: c.winnerVotes } : {}),
  }));
  const res = Response.json({
    status,
    categories,
    pending: categories.filter((c) => !c.voted).length,
  });
  if (isNew) res.headers.append('Set-Cookie', visitorCookie(visitorId));
  return res;
};
