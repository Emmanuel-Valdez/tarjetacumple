// Uso: node scripts/clean-test-data.mjs
// Borra los datos de prueba (canciones, likes y fotos subidas) de la DB local.
import Database from 'better-sqlite3';

const db = new Database(process.env.DATABASE_PATH || './data/db.sqlite');
db.prepare('delete from playlist_tracks').run();
db.prepare('delete from likes').run();
db.prepare("delete from photos where filename not like '/%'").run();
db.prepare('delete from rsvps').run();

for (const t of ['rsvps', 'photos', 'likes', 'playlist_tracks']) {
  console.log(t, db.prepare(`select count(*) as c from ${t}`).get().c);
}
