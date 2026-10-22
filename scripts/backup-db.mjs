import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const dbPath = process.env.DATABASE_PATH || './data/db.sqlite';
const dir = join(dirname(resolve(dbPath)), 'backups');
mkdirSync(dir, { recursive: true });

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const out = join(dir, `db-${stamp}.sqlite`);

const db = new Database(dbPath, { readonly: true });
await db.backup(out);
db.close();

console.log(`Backup: ${out}`);
