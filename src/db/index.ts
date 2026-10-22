import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as schema from './schema';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import '../lib/env';

const dbPath = process.env.DATABASE_PATH || './data/db.sqlite';
mkdirSync(dirname(dbPath), { recursive: true });

const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

export const db = drizzle(sqlite, { schema });
export { sqlite };

migrate(db, { migrationsFolder: join(process.cwd(), 'drizzle') });
