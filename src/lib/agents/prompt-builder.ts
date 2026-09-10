import { getRegion, lockedRegionsFor } from './regions';
import type { Intensity, StyleId } from './types';

/**
 * FEATURE LOCK prompt builder (brief §5).
 *
 * Every visualization instruction is assembled here, never inline at a call
 * site, so the identity-preservation and lock clauses cannot be forgotten or
 * softened by a future edit.
 */

const INTENSITY_CLAUSE: Record<Intensity, string> = {
  subtle:
    'Make the change SUBTLE: barely-there, the kind of difference a person notices only when comparing side by side. Err on the side of too little.',
  moderate:
    'Make the change MODERATE: clearly visible in a side-by-side comparison, but still restrained and natural-looking.',
  strong:
    'Make the change STRONG but still physically plausible for a real person. Never caricature, never distort surrounding anatomy.',
};

const STYLE_CLAUSE: Record<StyleId, string> = {
  natural: 'Aim for a natural, untouched-looking result.',
  subtle: 'Aim for an understated result that reads as "well rested", not "done".',
  soft: 'Aim for a soft, rounded, gentle aesthetic.',
  defined: 'Aim for a defined, crisp aesthetic with clear edges.',
  glam: 'Aim for a polished, high-glamour finish.',
  sculpted: 'Aim for a sculpted, contoured aesthetic.',
  youthful:
    'Aim for a fresher, more rested look, without changing the person’s apparent age bracket.',
  minimal_intervention: 'Aim for the smallest possible change that still answers the request.',
};

export type VisualizationPromptInput = {
  targetAreaId: string;
  /** The user's own words, already validated/normalized by the Intent agent. */
  requestedChange: string;
  intensity: Intensity;
  style: StyleId;
};

export function buildVisualizationPrompt(input: VisualizationPromptInput): string {
  const region = getRegion(input.targetAreaId);
  const area = region ? region.label : input.targetAreaId.replace(/_/g, ' ');
  const locked = lockedRegionsFor(input.targetAreaId);

  const lockList = locked.length
    ? locked.map((l) => `- ${l}`).join('\n')
    : '- every part of the image other than the target area';

  return [
    'You are editing a photograph of a real person at that person’s own explicit request.',
    '',
    `TASK: Edit ONLY ${area}. The requested change, in the person’s own words, is: "${sanitize(
      input.requestedChange,
    )}".`,
    '',
    INTENSITY_CLAUSE[input.intensity],
    STYLE_CLAUSE[input.style],
    '',
    'FEATURE LOCK — the following must come through completely unchanged, pixel-for-pixel where possible:',
    lockList,
    '- the background, framing, crop and camera angle',
    '- the lighting, shadows, colour temperature and grain of the original photo',
    '- the facial expression, gaze direction and head pose',
    '- skin tone, freckles, moles, scars and other identifying marks outside the target area',
    '',
    'IDENTITY — non-negotiable:',
    '- The output must be unmistakably THE SAME PERSON as the input photo.',
    '- Do not swap, blend, replace or beautify the face.',
    '- Do not import features from any other person, reference or archetype.',
    '- Do not slim, smooth, whiten, de-age or otherwise "improve" anything that was not asked for.',
    '- Do not change apparent age, ethnicity, gender presentation or body size.',
    '',
    'OUTPUT: return one edited photograph at the same aspect ratio as the input. No text, no watermark, no collage, no before/after grid, no additional people.',
  ].join('\n');
}

/** Keeps user text from smuggling instructions into the model turn. */
export function sanitize(text: string): string {
  return text
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/"/g, "'")
    .replace(
      /\b(ignore|disregard|forget)\s+(all\s+|the\s+|previous\s+|above\s+)*(instructions?|rules?|prompts?)\b/gi,
      '[removed]',
    )
    .trim()
    .slice(0, 600);
}
