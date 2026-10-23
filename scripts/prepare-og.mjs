// Uso: node scripts/prepare-og.mjs
// Genera public/img/og.png (1200x630) para la previsualizacion del enlace.
// Los clientes de mensajeria no renderizan WebP en las tarjetas de preview.
import sharp from 'sharp';
import path from 'node:path';

const SRC = path.resolve('public/img/fondo-desktop.webp');
const OUT = path.resolve('public/img/og.png');

await sharp(SRC)
  .resize({ width: 1200, height: 630, fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log('public/img/og.png generado (1200x630)');
