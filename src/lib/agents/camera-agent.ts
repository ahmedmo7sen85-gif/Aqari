import { visionProvider } from '@/lib/providers/registry';
import { isProviderError } from '@/lib/providers/errors';
import type { JsonSchema, ImageBlob } from '@/lib/providers/types';
import { isEnabled } from '@/config/flags';
import type { PhotoCheck, PhotoCheckStatus, PhotoReport } from './types';

export { gradeClientMetrics } from './photo-grading';

/**
 * Camera Intelligence Agent (brief §4, §9 item 2).
 *
 * Two tiers, and the difference between them is always visible to the user:
 *
 *  Tier 1 — deterministic pixel measurements, run in the browser before upload
 *           (src/lib/photo-metrics.ts): resolution, exposure, sharpness. These
 *           are real measurements, not model output, so they always run.
 *
 *  Tier 2 — face-level judgement that genuinely needs vision: face present,
 *           single face, framing/angle, obstruction, heavy filtering. This is a
 *           real model call. When no vision provider is configured these checks
 *           are reported as `not_evaluated` with a reason. They are NEVER
 *           reported as "pass" on the strength of tier 1 alone.
 */

export const VISION_CHECK_IDS = [
  'face_present',
  'single_face',
  'face_angle',
  'face_unobstructed',
  'no_heavy_filter',
  'eyes_open',
] as const;

export type VisionCheckId = (typeof VISION_CHECK_IDS)[number];

const SCHEMA: JsonSchema = {
  type: 'object',
  properties: {
    face_present: { type: 'string', enum: ['pass', 'warn', 'fail'] },
    single_face: { type: 'string', enum: ['pass', 'warn', 'fail'] },
    face_angle: { type: 'string', enum: ['pass', 'warn', 'fail'] },
    face_unobstructed: { type: 'string', enum: ['pass', 'warn', 'fail'] },
    no_heavy_filter: { type: 'string', enum: ['pass', 'warn', 'fail'] },
    eyes_open: { type: 'string', enum: ['pass', 'warn', 'fail'] },
    appears_to_be_a_minor: { type: 'boolean' },
  },
  required: [...VISION_CHECK_IDS, 'appears_to_be_a_minor'],
};

const SYSTEM = [
  'You are a photo-suitability checker for an aesthetic visualization product.',
  '',
  'You report ONLY on photo quality and framing. You never describe, rate, or comment on how the person looks,',
  'never name features, never mention anything that could read as a flaw, and never guess identity or ethnicity.',
  '',
  'Grade each check:',
  '  face_present      — a human face is clearly visible',
  '  single_face       — exactly one face in frame (fail if several people)',
  '  face_angle        — roughly front-facing; warn for three-quarter, fail for profile/extreme angle',
  '  face_unobstructed — not covered by hands, hair, mask, sunglasses or heavy shadow',
  '  no_heavy_filter   — no beauty filter, smoothing, AR mask or heavy retouching already applied',
  '  eyes_open         — eyes open and visible',
  '',
  'Set appears_to_be_a_minor=true if the subject may be under 18. Be conservative.',
].join('\n');

type VisionRaw = Record<VisionCheckId, PhotoCheckStatus> & { appears_to_be_a_minor: boolean };

export type VisionOutcome =
  | { tier: 'model'; checks: PhotoCheck[]; minor: boolean; provider: string; model: string }
  | { tier: 'none'; checks: PhotoCheck[]; minor: false; gapReason: string };

export async function inspectPhoto(image: ImageBlob, signal?: AbortSignal): Promise<VisionOutcome> {
  if (!isEnabled('visionPhotoCheck')) {
    return notEvaluated('photo_check.gap.flag_off');
  }

  try {
    const provider = visionProvider();
    const { value, model } = await provider.inspectImage<VisionRaw>({
      image,
      system: SYSTEM,
      user: 'Grade this photo against each check. Return only the JSON object.',
      schema: SCHEMA,
      validate: validateVision,
      signal,
    });

    return {
      tier: 'model',
      minor: value.appears_to_be_a_minor,
      provider: provider.id,
      model,
      checks: VISION_CHECK_IDS.map((id) => ({
        id,
        status: value[id],
        reason_key: `photo_check.${id}.${value[id]}`,
      })),
    };
  } catch (e) {
    // An unavailable checker is a stated gap, never a silent pass.
    const detail = isProviderError(e) ? e.code : 'UNKNOWN';
    return notEvaluated(`photo_check.gap.${detail.toLowerCase()}`);
  }
}

function notEvaluated(gapReason: string): VisionOutcome {
  return {
    tier: 'none',
    minor: false,
    gapReason,
    checks: VISION_CHECK_IDS.map((id) => ({
      id,
      status: 'not_evaluated' as const,
      reason_key: gapReason,
    })),
  };
}

export function validateVision(raw: unknown): VisionRaw {
  if (typeof raw !== 'object' || raw === null) throw new Error('vision result is not an object');
  const o = raw as Record<string, unknown>;
  const out = { appears_to_be_a_minor: Boolean(o.appears_to_be_a_minor) } as VisionRaw;
  for (const id of VISION_CHECK_IDS) {
    const v = String(o[id] ?? '');
    if (!['pass', 'warn', 'fail'].includes(v)) throw new Error(`check "${id}" has value "${v}"`);
    out[id] = v as PhotoCheckStatus;
  }
  return out;
}

/**
 * Folds tier-1 (client measurements, already graded) and tier-2 checks into one
 * report. `not_evaluated` never improves or worsens the overall verdict — it is
 * carried through so the UI can say which checks did not run.
 */
export function buildReport(clientChecks: PhotoCheck[], vision: VisionOutcome): PhotoReport {
  const checks = [...clientChecks, ...vision.checks];
  const has = (s: PhotoCheckStatus) => checks.some((c) => c.status === s);
  const overall: PhotoCheckStatus = has('fail')
    ? 'fail'
    : has('warn')
      ? 'warn'
      : checks.every((c) => c.status === 'not_evaluated')
        ? 'not_evaluated'
        : 'pass';

  return {
    checks,
    overall,
    vision_tier: vision.tier,
    vision_gap_reason: vision.tier === 'none' ? vision.gapReason : undefined,
  };
}
