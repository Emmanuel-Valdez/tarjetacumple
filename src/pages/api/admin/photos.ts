import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { photos } from '../../../db/schema';
import { verifySession } from '../../../lib/auth';
import { mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp']);

function roleFromRequest(request: Request) {
  const match = request.headers.get('cookie')?.match(/(?:^|;\s*)admin_session=([^;]+)/);
  return verifySession(match ? decodeURIComponent(match[1]) : undefined);
}

export const POST: APIRoute = async ({ request }) => {
  const role = roleFromRequest(request);
  if (!role) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) return Response.json({ error: 'no file' }, { status: 400 });
  if (!ALLOWED.has(file.type)) return Response.json({ error: 'invalid type' }, { status: 400 });
  if (file.size > MAX_SIZE) return Response.json({ error: 'too large' }, { status: 400 });
  const uploads = process.env.UPLOADS_PATH || './data/uploads';
  mkdirSync(uploads, { recursive: true });
  const ext = file.type === 'image/png' ? '.png' : file.type === 'image/webp' ? '.webp' : '.jpg';
  const filename = `${randomUUID()}${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploads, filename), buf);
  const alt = String(form.get('alt') || '');
  await db.insert(photos).values({ filename, alt: alt || null, sortOrder: 0 });
  return Response.json({ ok: true });
};