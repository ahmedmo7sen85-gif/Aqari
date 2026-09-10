/**
 * Camera Intelligence Agent, tier 1 (brief §9 item 2) — runs in the browser.
 *
 * These are real measurements on real pixels, not a model's opinion:
 *   brightness — mean luma, 0..255
 *   sharpness  — variance of the Laplacian, the standard blur estimator
 *
 * Nothing here guesses at faces. Face-level judgement is tier 2 (a vision call),
 * and when tier 2 cannot run the product says so rather than implying tier 1
 * covered it.
 */

export type PhotoMetrics = {
  width: number;
  height: number;
  brightness: number;
  sharpness: number;
  bytes: number;
};

export type PreparedPhoto = {
  metrics: PhotoMetrics;
  /** Downscaled JPEG for upload: base64 without the data: prefix. */
  base64: string;
  mimeType: string;
  /** Object URL for display. Caller revokes it. */
  previewUrl: string;
};

const MAX_UPLOAD_EDGE = 1600;
const ANALYSIS_EDGE = 480;

export async function preparePhoto(file: File): Promise<PreparedPhoto> {
  const bitmap = await loadBitmap(file);
  try {
    const metrics = measure(bitmap, file.size);
    const { base64, mimeType } = encodeForUpload(bitmap);
    return {
      metrics,
      base64,
      mimeType,
      previewUrl: URL.createObjectURL(file),
    };
  } finally {
    if ('close' in bitmap && typeof bitmap.close === 'function') bitmap.close();
  }
}

type Drawable = ImageBitmap | HTMLImageElement;

async function loadBitmap(file: File): Promise<Drawable> {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file);
    } catch {
      // Safari/HEIC and some older browsers: fall through to <img>.
    }
  }
  const url = URL.createObjectURL(file);
  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('This file could not be read as an image.'));
      img.src = url;
    });
  } finally {
    // The bitmap data is already decoded into the element by the time we draw.
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  }
}

function sizeOf(src: Drawable): { width: number; height: number } {
  return src instanceof HTMLImageElement
    ? { width: src.naturalWidth, height: src.naturalHeight }
    : { width: src.width, height: src.height };
}

function measure(src: Drawable, bytes: number): PhotoMetrics {
  const { width, height } = sizeOf(src);
  const scale = Math.min(1, ANALYSIS_EDGE / Math.max(width, height));
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas is unavailable in this browser.');
  ctx.drawImage(src, 0, 0, w, h);

  const { data } = ctx.getImageData(0, 0, w, h);
  const luma = new Float32Array(w * h);
  let sum = 0;
  for (let i = 0, p = 0; i < data.length; i += 4, p += 1) {
    const y = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    luma[p] = y;
    sum += y;
  }
  const brightness = sum / luma.length;

  // 4-neighbour Laplacian; variance of the response tracks focus.
  let lapSum = 0;
  let lapSqSum = 0;
  let count = 0;
  for (let y = 1; y < h - 1; y += 1) {
    for (let x = 1; x < w - 1; x += 1) {
      const i = y * w + x;
      const v = 4 * luma[i] - luma[i - 1] - luma[i + 1] - luma[i - w] - luma[i + w];
      lapSum += v;
      lapSqSum += v * v;
      count += 1;
    }
  }
  const mean = count ? lapSum / count : 0;
  const sharpness = count ? lapSqSum / count - mean * mean : 0;

  return { width, height, brightness, sharpness, bytes };
}

function encodeForUpload(src: Drawable): { base64: string; mimeType: string } {
  const { width, height } = sizeOf(src);
  const scale = Math.min(1, MAX_UPLOAD_EDGE / Math.max(width, height));
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is unavailable in this browser.');
  ctx.drawImage(src, 0, 0, w, h);

  const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
  return { base64: dataUrl.split(',')[1] ?? '', mimeType: 'image/jpeg' };
}
