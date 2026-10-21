import sharp from 'sharp';

export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;
export const MAX_EDGE = 1600;

export type Processed = { buffer: Buffer; ext: string; width: number; height: number };

/**
 * Reescala y convierte a WebP cualquier imagen subida.
 * ponytail: sharp ya viene como dependencia de astro; se agrega explicita por uso directo.
 */
export async function toWebp(input: Buffer): Promise<Processed> {
  const image = sharp(input, { failOn: 'none' }).rotate();
  const meta = await image.metadata();
  if (!meta.width || !meta.height) throw new Error('invalid image');
  const out = await image
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer({ resolveWithObject: true });
  return {
    buffer: out.data,
    ext: '.webp',
    width: out.info.width,
    height: out.info.height,
  };
}
