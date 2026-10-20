import type { APIRoute } from 'astro';
import { db } from '../../../../db';
import { photos } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const GET: APIRoute = async ({ params }) => {
  const id = Number(params.id);
  if (!id) return new Response('not found', { status: 404 });
  const rows = await db.select().from(photos).where(eq(photos.id, id));
  const photo = rows[0];
  if (!photo) return new Response('not found', { status: 404 });
  if (photo.filename === 'placeholder') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="#1a1a2e"/><text x="50%" y="50%" fill="#00f0ff" font-size="24" text-anchor="middle" dominant-baseline="middle">Foto ${photo.id}</text></svg>`;
    return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=3600' } });
  }
  const uploads = process.env.UPLOADS_PATH || './data/uploads';
  const filePath = path.join(uploads, photo.filename);
  if (!existsSync(filePath)) return new Response('not found', { status: 404 });
  const buf = await readFile(filePath);
  const ext = path.extname(photo.filename).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
  return new Response(buf, { headers: { 'Content-Type': mime, 'Cache-Control': 'public, max-age=31536000' } });
};