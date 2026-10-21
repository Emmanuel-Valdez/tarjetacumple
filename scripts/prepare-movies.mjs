// Uso: node scripts/prepare-movies.mjs
// Convierte las imagenes de src/img/movies a WebP en public/img/movies/ y escribe
// src/data/movies.ts. Optimizadas al tamano de las cards (360x480). Correr de
// nuevo cuando cambien las imagenes.
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve('src/img/movies');
const OUT = path.resolve('public/img/movies');
const MANIFEST = path.resolve('src/data/movies.ts');

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const entries = [];

for (const file of files) {
  const name = path.parse(file).name.replace(/[^a-zA-Z0-9_-]/g, '-');
  await sharp(path.join(SRC, file))
    .rotate()
    .resize({ width: 360, height: 480, fit: 'cover', position: 'attention' })
    .webp({ quality: 75 })
    .toFile(path.join(OUT, `${name}.webp`));
  entries.push(`/img/movies/${name}.webp`);
}

entries.sort();
const body = entries.map((f) => `  '${f}',`).join('\n');
await writeFile(
  MANIFEST,
  `// Generado por scripts/prepare-movies.mjs - no editar a mano.\nexport const MOVIES: string[] = [\n${body}\n];\n`,
  'utf8',
);
console.log(`${entries.length} imagenes en public/img/movies/`);
