import type { APIRoute } from 'astro';
import { db } from '../../db';
import { photos } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { contestStatus } from '../../lib/contest';

export const GET: APIRoute = async () => {
  // Las candidatas solo se exponen mientras la votacion esta abierta (D: gate por estado).
  if (contestStatus() !== 'open') return Response.json({ photos: [] });
  const rows = await db
    .select()
    .from(photos)
    .where(eq(photos.kind, 'contest'))
    .orderBy(photos.sortOrder, photos.id);
  return Response.json({
    photos: rows.map((p) => ({
      id: p.id,
      // Las fotos estaticas viven en public/ y las subidas en el volumen de uploads.
      url: p.filename.startsWith('/') ? p.filename : `/api/photos/${p.id}/file`,
      alt: p.alt,
      kind: p.kind,
    })),
  });
};
