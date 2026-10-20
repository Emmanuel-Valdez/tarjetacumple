import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../db';
import { playlistTracks } from '../../db/schema';
import { desc } from 'drizzle-orm';

const schema = z.object({
  title: z.string().min(1).max(100),
  artist: z.string().min(1).max(100),
});

export const GET: APIRoute = async () => {
  const rows = await db.select().from(playlistTracks).orderBy(desc(playlistTracks.createdAt));
  return Response.json({ tracks: rows });
};

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: 'invalid json' }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return Response.json({ error: 'invalid data' }, { status: 400 });
  const { title, artist } = parsed.data;
  await db.insert(playlistTracks).values({ title, artist });
  return Response.json({ ok: true });
};