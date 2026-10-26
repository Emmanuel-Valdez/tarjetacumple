import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../../db';
import { contestCategories } from '../../../db/schema';
import { verifySession } from '../../../lib/auth';
import { contestStatus } from '../../../lib/contest';
import { AWARDS } from '../../../data/awards';
import { eq, sql } from 'drizzle-orm';

function roleFromRequest(request: Request) {
  const match = request.headers.get('cookie')?.match(/(?:^|;\s*)admin_session=([^;]+)/);
  return verifySession(match ? decodeURIComponent(match[1]) : undefined);
}

const createSchema = z.object({
  title: z.string().trim().min(1).max(80),
  emoji: z.string().trim().min(1).max(8),
  teaser: z.string().trim().min(1).max(200),
});

const updateSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().trim().min(1).max(80).optional(),
  emoji: z.string().trim().min(1).max(8).optional(),
  teaser: z.string().trim().min(1).max(200).optional(),
  position: z.number().int().min(0).optional(),
});

function slugify(value: string) {
  const base = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || 'categoria';
}

function uniqueSlug(base: string) {
  let slug = slugify(base);
  let n = 2;
  while (db.select({ n: sql<number>`count(*)` }).from(contestCategories).where(eq(contestCategories.slug, slug)).all()[0]?.n) {
    slug = `${slugify(base)}-${n}`;
    n += 1;
  }
  return slug;
}

function seedDefaultsIfEmpty() {
  if (contestStatus() !== 'idle') return;
  const count = db.select({ n: sql<number>`count(*)` }).from(contestCategories).all()[0]?.n ?? 0;
  if (count > 0) return;
  db.insert(contestCategories)
    .values(AWARDS.map((a, i) => ({ slug: a.slug, title: a.title, emoji: a.emoji, teaser: a.teaser, position: i })))
    .run();
}

export const GET: APIRoute = async ({ request }) => {
  if (!roleFromRequest(request)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  seedDefaultsIfEmpty();
  const rows = db.select().from(contestCategories).orderBy(contestCategories.position, contestCategories.id).all();
  return Response.json({
    categories: rows.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      emoji: c.emoji,
      teaser: c.teaser,
      position: c.position,
    })),
  });
};

export const POST: APIRoute = async ({ request }) => {
  if (!roleFromRequest(request)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  if (contestStatus() !== 'idle') return Response.json({ error: 'el concurso no esta inactivo' }, { status: 409 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'invalid json' }, { status: 400 });
  }
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: 'datos invalidos' }, { status: 400 });
  const { title, emoji, teaser } = parsed.data;
  const max = db.select({ m: sql<number>`max(position)` }).from(contestCategories).all()[0]?.m ?? -1;
  const category = db
    .insert(contestCategories)
    .values({ slug: uniqueSlug(title), title, emoji, teaser, position: max + 1 })
    .returning()
    .get();
  return Response.json({ ok: true, category });
};

export const PATCH: APIRoute = async ({ request }) => {
  if (!roleFromRequest(request)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  if (contestStatus() !== 'idle') return Response.json({ error: 'el concurso no esta inactivo' }, { status: 409 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'invalid json' }, { status: 400 });
  }
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: 'datos invalidos' }, { status: 400 });
  const { id, title, emoji, teaser, position } = parsed.data;
  const patch: Record<string, unknown> = {};
  if (title !== undefined) patch.title = title;
  if (emoji !== undefined) patch.emoji = emoji;
  if (teaser !== undefined) patch.teaser = teaser;
  if (position !== undefined) patch.position = position;
  if (Object.keys(patch).length === 0) return Response.json({ error: 'sin cambios' }, { status: 400 });
  const updated = db.update(contestCategories).set(patch).where(eq(contestCategories.id, id)).returning().get();
  if (!updated) return Response.json({ error: 'no encontrado' }, { status: 404 });
  return Response.json({ ok: true, category: updated });
};

export const DELETE: APIRoute = async ({ request }) => {
  if (!roleFromRequest(request)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  if (contestStatus() !== 'idle') return Response.json({ error: 'el concurso no esta inactivo' }, { status: 409 });
  const id = Number(new URL(request.url).searchParams.get('id'));
  if (!id) return Response.json({ error: 'missing id' }, { status: 400 });
  const rows = db.select().from(contestCategories).where(eq(contestCategories.id, id)).all();
  if (!rows[0]) return Response.json({ error: 'no encontrado' }, { status: 404 });
  db.delete(contestCategories).where(eq(contestCategories.id, id)).run();
  return Response.json({ ok: true });
};
