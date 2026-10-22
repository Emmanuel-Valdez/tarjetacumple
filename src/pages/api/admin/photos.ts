import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { photos, contestVotes } from '../../../db/schema';
import { verifySession } from '../../../lib/auth';
import { toWebp, MAX_UPLOAD_BYTES } from '../../../lib/images';
import { mkdirSync } from 'node:fs';
import { writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { eq, sql } from 'drizzle-orm';
import { likes } from '../../../db/schema';
import { z } from 'zod';

const kindSchema = z.enum(['backstage', 'contest']);

function roleFromRequest(request: Request) {
  const match = request.headers.get('cookie')?.match(/(?:^|;\s*)admin_session=([^;]+)/);
  return verifySession(match ? decodeURIComponent(match[1]) : undefined);
}

export const GET: APIRoute = async ({ request }) => {
  const role = roleFromRequest(request);
  if (!role) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const rows = await db.select().from(photos).orderBy(photos.sortOrder, photos.id);
  const counts = await db
    .select({ photoId: likes.photoId, count: sql<number>`count(*)` })
    .from(likes)
    .groupBy(likes.photoId);
  const map = new Map(counts.map((c) => [c.photoId, c.count]));
  return Response.json({
    photos: rows.map((p) => ({
      id: p.id,
      url: p.filename.startsWith('/') ? p.filename : `/api/photos/${p.id}/file`,
      alt: p.alt,
      filename: p.filename,
      kind: p.kind,
      likes: map.get(p.id) ?? 0,
    })),
  });
};

export const POST: APIRoute = async ({ request }) => {
  const role = roleFromRequest(request);
  if (!role) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) return Response.json({ error: 'no file' }, { status: 400 });
  if (!file.type.startsWith('image/')) return Response.json({ error: 'invalid type' }, { status: 400 });
  if (file.size > MAX_UPLOAD_BYTES) return Response.json({ error: 'too large' }, { status: 400 });

  let processed;
  try {
    processed = await toWebp(Buffer.from(await file.arrayBuffer()));
  } catch {
    return Response.json({ error: 'invalid image' }, { status: 400 });
  }

  const uploads = process.env.UPLOADS_PATH || './data/uploads';
  mkdirSync(uploads, { recursive: true });
  const filename = `${randomUUID()}${processed.ext}`;
  await writeFile(path.join(uploads, filename), processed.buffer);

  const alt = String(form.get('alt') || '').slice(0, 200);
  const kind = kindSchema.safeParse(form.get('kind') || 'backstage');
  if (!kind.success) return Response.json({ error: 'invalid kind' }, { status: 400 });
  const max = db.select({ m: sql<number>`max(sort_order)` }).from(photos).all()[0]?.m ?? 0;
  await db
    .insert(photos)
    .values({ filename, alt: alt || null, kind: kind.data, sortOrder: max + 1 });
  return Response.json({ ok: true, filename, kind: kind.data });
};

export const DELETE: APIRoute = async ({ request }) => {
  const role = roleFromRequest(request);
  if (!role) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get('id'));
  if (!id) return Response.json({ error: 'missing id' }, { status: 400 });
  const rows = await db.select().from(photos).where(eq(photos.id, id));
  const photo = rows[0];
  if (!photo) return Response.json({ error: 'not found' }, { status: 404 });
  // Las fotos del repo viven en la imagen del contenedor: se borran del codigo, no desde aca.
  if (photo.filename.startsWith('/')) {
    return Response.json(
      { error: 'las fotos del repo se borran del codigo, no desde el panel' },
      { status: 409 },
    );
  }
  const votes = await db
    .select({ n: sql<number>`count(*)` })
    .from(contestVotes)
    .where(eq(contestVotes.photoId, id));
  if ((votes[0]?.n ?? 0) > 0) {
    return Response.json(
      { error: 'la foto tiene votos del concurso y no se puede borrar' },
      { status: 409 },
    );
  }
  await db.delete(photos).where(eq(photos.id, id));
  const uploads = process.env.UPLOADS_PATH || './data/uploads';
  await unlink(path.join(uploads, path.basename(photo.filename))).catch(() => {});
  return Response.json({ ok: true });
};
