import { NextResponse } from 'next/server';
import { buildReport, inspectPhoto } from '@/lib/agents/camera-agent';
import type { PhotoCheck, PhotoCheckStatus } from '@/lib/agents/types';
import { errorResponse, readImage, readJsonBody } from '@/lib/api';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const CLIENT_CHECK_IDS = ['resolution', 'exposure', 'sharpness'];
const STATUSES: PhotoCheckStatus[] = ['pass', 'warn', 'fail', 'not_evaluated'];

/**
 * POST /api/photo-check — Camera Intelligence Agent, tier 2 (brief §9 item 2).
 *
 * Body: { imageBase64, mimeType, clientChecks: PhotoCheck[] }
 * 200:  { report }
 *
 * Face-level checks that could not run come back as `not_evaluated` with a
 * reason. They are never reported as passing.
 */
export async function POST(req: Request) {
  try {
    const body = await readJsonBody(req);
    const image = readImage(body);
    const clientChecks = readClientChecks(body.clientChecks);

    const vision = await inspectPhoto(image, req.signal);
    const report = buildReport(clientChecks, vision);

    // A photo of a possible minor is refused outright (brief §2 boundaries).
    if (vision.tier === 'model' && vision.minor) {
      return NextResponse.json(
        {
          error: {
            code: 'SUBJECT_NOT_ELIGIBLE',
            message: 'This product only works on photos of adults.',
            capability_gap: false,
          },
        },
        { status: 422 },
      );
    }

    return NextResponse.json({ report });
  } catch (e) {
    return errorResponse(e);
  }
}

function readClientChecks(raw: unknown): PhotoCheck[] {
  if (!Array.isArray(raw)) return [];
  const out: PhotoCheck[] = [];
  for (const item of raw.slice(0, 10)) {
    if (typeof item !== 'object' || item === null) continue;
    const o = item as Record<string, unknown>;
    const id = String(o.id ?? '');
    const status = String(o.status ?? '');
    if (!CLIENT_CHECK_IDS.includes(id)) continue;
    if (!(STATUSES as string[]).includes(status)) continue;
    out.push({
      id,
      status: status as PhotoCheckStatus,
      reason_key: String(o.reason_key ?? `photo_check.${id}.${status}`).slice(0, 80),
      measured: typeof o.measured === 'number' ? o.measured : undefined,
    });
  }
  return out;
}
