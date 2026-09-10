import { NextResponse } from 'next/server';
import { isProviderError, ProviderError } from './providers/errors';

/**
 * Shared API surface rules.
 *
 * Errors are structured and honest: a client can always tell WHY there is no
 * result, and never receives something it could render as a successful AI
 * output. Nothing here ever returns a placeholder image.
 */

export type ApiError = {
  error: {
    code: string;
    message: string;
    detail?: string;
    /** True when the gap is a missing/unavailable capability rather than bad input. */
    capability_gap: boolean;
  };
};

export function errorResponse(e: unknown): NextResponse<ApiError> {
  if (isProviderError(e)) {
    return NextResponse.json(
      {
        error: {
          code: e.code,
          message: e.message,
          detail: e.detail,
          capability_gap:
            e.code === 'PROVIDER_NOT_CONFIGURED' || e.code === 'PROVIDER_UNAVAILABLE',
        },
      },
      { status: e.status },
    );
  }

  if (e instanceof BadRequest) {
    return NextResponse.json(
      { error: { code: 'INVALID_INPUT', message: e.message, capability_gap: false } },
      { status: 400 },
    );
  }

  console.error('[mirra] unhandled error', e);
  return NextResponse.json(
    {
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Something failed on our side. No result was produced.',
        capability_gap: false,
      },
    },
    { status: 500 },
  );
}

export class BadRequest extends Error {}

/** Max decoded photo size we accept, in bytes. */
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

export type IncomingImage = { base64: string; mimeType: string };

/** Validates an inbound photo payload. Strips any data: URL prefix. */
export function readImage(body: Record<string, unknown>, field = 'imageBase64'): IncomingImage {
  const rawImage = body[field];
  const rawMime = body.mimeType;

  if (typeof rawImage !== 'string' || rawImage.length === 0) {
    throw new BadRequest(`"${field}" is required.`);
  }
  const base64 = rawImage.replace(/^data:[^;]+;base64,/, '').trim();

  if (!/^[A-Za-z0-9+/=\s]+$/.test(base64)) {
    throw new BadRequest(`"${field}" is not valid base64.`);
  }

  const bytes = Math.floor((base64.replace(/\s/g, '').length * 3) / 4);
  if (bytes > MAX_IMAGE_BYTES) {
    throw new BadRequest(
      `Photo is ${(bytes / 1024 / 1024).toFixed(1)} MB; the limit is ${MAX_IMAGE_BYTES / 1024 / 1024} MB.`,
    );
  }

  const mimeType = typeof rawMime === 'string' && rawMime ? rawMime.toLowerCase() : 'image/jpeg';
  if (!ALLOWED_MIME.includes(mimeType)) {
    throw new BadRequest(`Unsupported image type "${mimeType}".`);
  }

  return { base64: base64.replace(/\s/g, ''), mimeType };
}

export function readString(body: Record<string, unknown>, field: string, max = 600): string {
  const v = body[field];
  if (typeof v !== 'string' || v.trim() === '') throw new BadRequest(`"${field}" is required.`);
  return v.trim().slice(0, max);
}

export function readEnum<T extends string>(
  body: Record<string, unknown>,
  field: string,
  allowed: readonly T[],
  fallback?: T,
): T {
  const v = body[field];
  if (typeof v === 'string' && (allowed as readonly string[]).includes(v)) return v as T;
  if (fallback !== undefined) return fallback;
  throw new BadRequest(`"${field}" must be one of: ${allowed.join(', ')}.`);
}

export async function readJsonBody(req: Request): Promise<Record<string, unknown>> {
  try {
    const body = await req.json();
    if (typeof body !== 'object' || body === null) throw new Error('not an object');
    return body as Record<string, unknown>;
  } catch {
    throw new BadRequest('Request body must be a JSON object.');
  }
}

export { ProviderError };
