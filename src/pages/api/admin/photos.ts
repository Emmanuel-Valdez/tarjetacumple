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

function roleFromRequest(request: Request) {
  const match = request.headers.get('cookie')?.match(/(?:^|;\s*)admin_session=([^;]+)/);
  return verifySession(match ? decodeURIComponent(match[1]) : undefined);
}

export const GET: APIRoute = async ({ request }) => {
  const role = roleFromRequest(request);
  if (!role) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const rows = await db
    .select()
    .from(photos)
    .where(eq(photos.kind, 'contest'))
    .orderBy(photos.sortOrder, photos.id);
  return Response.json({
    photos: rows.map((p) => ({
      id: p.id,
      url: p.filename.startsWith('/') ? p.filename : `/api/photos/${p.id}/file`,
      alt: p.alt,
      filename: p.filename,
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
  const max = db.select({ m: sql<number>`max(sort_order)` }).from(photos).all()[0]?.m ?? 0;
  await db
    .insert(photos)
    .values({ filename, alt: alt || null, kind: 'contest', sortOrder: max + 1 });
  return Response.json({ ok: true, filename });
};

export const DELETE: APIRoute = async ({ request }) => {
  const role = roleFromRequest(request);
  if (!role) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get('id'));
  if (!id) return Response.json({ error: 'missing id' }, { status: 400 });
  const rows = await db.select().from(photos).where(eq(photos.id, id));
  const photo = rows[0];
  if (!photo) return Response.json({ error: 'not found' }, { status: 404 });
  if (photo.kind !== 'contest' || photo.filename.startsWith('/')) {
    return Response.json(
      { error: 'esa foto no es una candidata del concurso y no se puede borrar desde el panel' },
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
