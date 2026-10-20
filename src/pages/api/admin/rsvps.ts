import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { rsvps } from '../../../db/schema';
import { desc, eq } from 'drizzle-orm';
import { verifySession } from '../../../lib/auth';

function roleFromRequest(request: Request) {
  const match = request.headers.get('cookie')?.match(/(?:^|;\s*)admin_session=([^;]+)/);
  return verifySession(match ? decodeURIComponent(match[1]) : undefined);
}

export const GET: APIRoute = async ({ request }) => {
  const role = roleFromRequest(request);
  if (!role) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const rows = await db.select().from(rsvps).orderBy(desc(rsvps.createdAt));
  const data = rows.map((r) => ({
    id: r.id,
    name: r.name,
    companions: r.companions,
    dedication: role === 'organizer' ? r.dedication : null,
    createdAt: r.createdAt,
  }));
  return Response.json({ role, rsvps: data });
};

export const DELETE: APIRoute = async ({ request }) => {
  const role = roleFromRequest(request);
  if (!role) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const url = new URL(request.url);
  const id = Number(url.searchParams.get('id'));
  if (!id) return Response.json({ error: 'missing id' }, { status: 400 });
  await db.delete(rsvps).where(eq(rsvps.id, id));
  return Response.json({ ok: true });
};
