import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../db';
import { rsvps } from '../../db/schema';
import { sql } from 'drizzle-orm';

const schema = z.object({
  name: z.string().min(1).max(100),
  companions: z.number().int().min(0).max(20).default(0),
  dedication: z.string().max(500).optional(),
});

export const GET: APIRoute = async () => {
  const rows = await db.select({ count: sql<number>`count(*)` }).from(rsvps);
  const count = rows[0]?.count ?? 0;
  return Response.json({ count });
};

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: 'invalid json' }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return Response.json({ error: 'invalid data' }, { status: 400 });
  const { name, companions, dedication } = parsed.data;
  await db.insert(rsvps).values({ name, companions, dedication: dedication || null });
  const rows = await db.select({ count: sql<number>`count(*)` }).from(rsvps);
  return Response.json({ ok: true, count: rows[0]?.count ?? 0 });
};