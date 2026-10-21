import type { APIRoute } from 'astro';
import { db } from '../../../../db';
import { photos } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

export const GET: APIRoute = async ({ params }) => {
  const id = Number(params.id);
  if (!id) return new Response('not found', { status: 404 });
  const rows = await db.select().from(photos).where(eq(photos.id, id));
  const photo = rows[0];
  if (!photo || photo.filename.startsWith('/')) return new Response('not found', { status: 404 });
  const uploads = process.env.UPLOADS_PATH || './data/uploads';
  const filePath = path.join(uploads, path.basename(photo.filename));
  if (!existsSync(filePath)) return new Response('not found', { status: 404 });
  const buf = await readFile(filePath);
  const mime = MIME[path.extname(photo.filename).toLowerCase()] ?? 'application/octet-stream';
  return new Response(buf, { headers: { 'Content-Type': mime, 'Cache-Control': 'public, max-age=31536000' } });
};
