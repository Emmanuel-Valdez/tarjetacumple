import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { playlistTracks } from '../../../db/schema';
import { verifySession } from '../../../lib/auth';
import { desc, eq } from 'drizzle-orm';

function roleFromRequest(request: Request) {
  const match = request.headers.get('cookie')?.match(/(?:^|;\s*)admin_session=([^;]+)/);
  return verifySession(match ? decodeURIComponent(match[1]) : undefined);
}

export const GET: APIRoute = async ({ request }) => {
  const role = roleFromRequest(request);
  if (!role) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const rows = await db.select().from(playlistTracks).orderBy(desc(playlistTracks.createdAt));
  return Response.json({ tracks: rows });
};

export const DELETE: APIRoute = async ({ request }) => {
  const role = roleFromRequest(request);
  if (!role) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get('id'));
  if (!id) return Response.json({ error: 'missing id' }, { status: 400 });
  await db.delete(playlistTracks).where(eq(playlistTracks.id, id));
  return Response.json({ ok: true });
};
