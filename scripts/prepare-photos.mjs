// Uso: node scripts/prepare-photos.mjs
// Convierte las fotos y fondos de src/img a WebP optimizado en public/img/ y
// escribe src/data/gallery.ts con el manifiesto. Correr de nuevo cuando cambien.
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve('src/img');
const OUT = path.resolve('public/img/photos');
const IMG = path.resolve('public/img');
const MANIFEST = path.resolve('src/data/gallery.ts');

// Fondos: horizontal para desktop, vertical para mobile.
const BACKGROUNDS = [
  { src: 'fondo.jpg', out: 'fondo-desktop.webp', size: { width: 1600 } },
  { src: 'fondo-vertical.jpg', out: 'fondo-mobile.webp', size: { height: 1400 } },
];

const ALT = {
  'igexport-DeKGYHinI3F.jpg':
    'payaso con traje de McDonald’s junto a una bruja en un cementerio de calaveras',
  'igexport-DeKGYHinI3F-2.jpg':
    'pareja de Jack Skellington y Sally en un cementerio de calaveras',
  'igexport-DeKGYHinI3F-3.jpg': 'payaso a rayas y arlequín multicolor sobre fondo gris',
  'igexport-DeKGYHinI3F-4.jpg':
    'pareja de Zorro en negro con sombreros y máscaras de zorro',
  'igexport-DeKGYHinI3F-5.jpg':
    'Doctor Strange con capa roja y Bruja Escarlata con magia en una biblioteca',
  'igexport-DeKGYHinI3F-6.jpg':
    'vampiro con capa violeta y su pareja de vestido negro sobre fondo oscuro',
  'igexport-DeKGYHinI3F-7.jpg':
    'payaso terrorífico con globos rojos junto a una chica pelirroja de vestido blanco',
  'igexport-DeKGYHinI3F-8.jpg': 'pareja de Joker y Harley Quinn con abrigos morados de payaso',
  'igexport-DeKGYHinI3F-9.jpg': 'pareja de Chucky y Tiffany con peto azul y camiseta de rayas',
  'igexport-DeKGYHinI3F-10.jpg': 'dos alumnos con uniforme de Hogwarts y varas en una biblioteca',
  'HARRY-POTTER.jpg': 'chica con capa de Gryffindor y varita mágica en el bosque',
  'IT-PENNYWISE.jpg': 'mujer disfrazada de Pennywise con vestido de payaso y globo rojo',
  'WEDNESDAY.jpg': 'dos niñas con uniforme de Miércoles Addams sentadas sobre el césped',
};

await mkdir(OUT, { recursive: true });
await mkdir(IMG, { recursive: true });

for (const bg of BACKGROUNDS) {
  await sharp(path.join(SRC, bg.src))
    .rotate()
    .resize({ ...bg.size, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(IMG, bg.out));
}

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith('fondo'));
const entries = [];

for (const file of files) {
  const name = path.parse(file).name.replace(/[^a-zA-Z0-9_-]/g, '-');
  const out = path.join(OUT, `${name}.webp`);
  await sharp(path.join(SRC, file))
    .rotate()
    .resize({ width: 576, height: 576, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  entries.push({
    file: `/img/photos/${name}.webp`,
    alt: ALT[file] ?? `Foto de disfraces: ${name}`,
  });
}

entries.sort((a, b) => a.file.localeCompare(b.file));
if (entries.length === 0) {
  console.warn('No hay fotos en src/img; no se reescribe gallery.ts.');
  process.exit(0);
}
const body = entries
  .map((e) => `  { file: '${e.file}', alt: '${e.alt.replace(/'/g, "\\'")}' },`)
  .join('\n');
await writeFile(MANIFEST, `// Generado por scripts/prepare-photos.mjs - no editar a mano.\nexport const GALLERY: { file: string; alt: string }[] = [\n${body}\n];\n`, 'utf8');
console.log(`${entries.length} fotos y ${BACKGROUNDS.length} fondos en public/img/`);
