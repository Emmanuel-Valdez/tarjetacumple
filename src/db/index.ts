import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as schema from './schema';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { eq } from 'drizzle-orm';
import { GALLERY } from '../data/gallery';
import '../lib/env';

const dbPath = process.env.DATABASE_PATH || './data/db.sqlite';
mkdirSync(dirname(dbPath), { recursive: true });

const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

export const db = drizzle(sqlite, { schema });
export { sqlite };

migrate(db, { migrationsFolder: join(process.cwd(), 'drizzle') });

// Seed idempotente: registra las fotos estaticas de public/img/photos (servidas por Astro).
// Solo corre una vez por archivo nuevo; los placeholders viejos se limpian.
try {
  db.delete(schema.photos).where(eq(schema.photos.filename, 'placeholder')).run();
  const existing = new Set(
    db.select({ f: schema.photos.filename }).from(schema.photos).all().map((r) => r.f),
  );
  GALLERY.forEach((g, i) => {
    if (!existing.has(g.file)) {
      db.insert(schema.photos).values({ filename: g.file, alt: g.alt, sortOrder: i }).run();
    }
  });
} catch {}
