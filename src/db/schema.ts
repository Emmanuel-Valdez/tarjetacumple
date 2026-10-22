import { sqliteTable, integer, text, index, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const rsvps = sqliteTable('rsvps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  companions: integer('companions').notNull().default(0),
  dedication: text('dedication'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const photos = sqliteTable('photos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  filename: text('filename').notNull(),
  alt: text('alt'),
  // backstage = tira de la landing, contest = candidata del concurso de premios.
  kind: text('kind').notNull().default('backstage'),
  sortOrder: integer('sort_order').notNull().default(0),
  uploadedAt: integer('uploaded_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
}, (t) => [index('photos_kind_idx').on(t.kind)]);

export const likes = sqliteTable('likes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  photoId: integer('photo_id').notNull().references(() => photos.id, { onDelete: 'cascade' }),
  visitorId: text('visitor_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const playlistTracks = sqliteTable('playlist_tracks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  artist: text('artist').notNull(),
  addedBy: text('added_by'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Concurso de premios: una sola fila (id = 1) con la maquina de estados.
export const contest = sqliteTable('contest', {
  id: integer('id').primaryKey(),
  status: text('status').notNull().default('idle'),
  openedAt: integer('opened_at', { mode: 'timestamp' }),
  closedAt: integer('closed_at', { mode: 'timestamp' }),
});

// Snapshot de los premios congelado al abrir el concurso, con el ganador al cerrar.
export const contestCategories = sqliteTable('contest_categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  emoji: text('emoji').notNull(),
  teaser: text('teaser').notNull(),
  position: integer('position').notNull().default(0),
  winnerPhotoId: integer('winner_photo_id').references(() => photos.id),
  winnerVotes: integer('winner_votes'),
});

// Un voto por visitante y categoria: la unicidad vive en la base, no en la app.
export const contestVotes = sqliteTable('contest_votes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  categoryId: integer('category_id').notNull().references(() => contestCategories.id, { onDelete: 'cascade' }),
  photoId: integer('photo_id').notNull().references(() => photos.id),
  visitorId: text('visitor_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
}, (t) => [
  uniqueIndex('contest_votes_category_visitor_idx').on(t.categoryId, t.visitorId),
  index('contest_votes_photo_idx').on(t.photoId),
]);