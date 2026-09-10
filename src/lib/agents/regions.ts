/**
 * Region taxonomy + FEATURE LOCK support.
 *
 * Every visualization names exactly one target region. Every region that is NOT
 * the target is explicitly listed as locked in the model instruction, so the
 * request can never read as "improve this face".
 */

export const MODULES = ['face', 'hair', 'makeup', 'body', 'full_look'] as const;
export type ModuleId = (typeof MODULES)[number];

export type Region = {
  id: string;
  module: ModuleId;
  /** Plain-language name used inside the model instruction (English, model-facing). */
  label: string;
  /** Regions that neighbour this one and are the usual bleed risk. */
  adjacent: string[];
};

export const REGIONS: Region[] = [
  { id: 'lips', module: 'face', label: 'the lips', adjacent: ['nasolabial_folds', 'chin', 'jawline'] },
  { id: 'nose', module: 'face', label: 'the nose', adjacent: ['under_eyes', 'cheeks', 'lips'] },
  { id: 'jawline', module: 'face', label: 'the jawline', adjacent: ['chin', 'neck', 'cheeks'] },
  { id: 'chin', module: 'face', label: 'the chin', adjacent: ['jawline', 'lips'] },
  { id: 'cheeks', module: 'face', label: 'the cheeks', adjacent: ['under_eyes', 'nasolabial_folds', 'jawline'] },
  { id: 'under_eyes', module: 'face', label: 'the under-eye area', adjacent: ['cheeks', 'eyelids'] },
  { id: 'eyelids', module: 'face', label: 'the eyelids', adjacent: ['eyebrows', 'under_eyes'] },
  { id: 'eyebrows', module: 'face', label: 'the eyebrows', adjacent: ['eyelids', 'forehead'] },
  { id: 'forehead', module: 'face', label: 'the forehead', adjacent: ['eyebrows', 'hairline'] },
  { id: 'nasolabial_folds', module: 'face', label: 'the nasolabial folds', adjacent: ['lips', 'cheeks'] },
  { id: 'skin_texture', module: 'face', label: 'the overall skin texture and tone', adjacent: [] },
  { id: 'teeth', module: 'face', label: 'the teeth', adjacent: ['lips'] },
  { id: 'neck', module: 'face', label: 'the neck', adjacent: ['jawline'] },

  { id: 'hairstyle', module: 'hair', label: 'the hairstyle (cut and shape)', adjacent: ['hairline', 'forehead'] },
  { id: 'hair_color', module: 'hair', label: 'the hair colour', adjacent: ['eyebrows'] },
  { id: 'hairline', module: 'hair', label: 'the hairline and hair density', adjacent: ['forehead'] },
  { id: 'facial_hair', module: 'hair', label: 'the beard and moustache', adjacent: ['jawline', 'lips', 'chin'] },

  { id: 'makeup_look', module: 'makeup', label: 'the makeup (applied cosmetics only)', adjacent: ['lips', 'eyelids', 'cheeks'] },

  { id: 'outfit', module: 'body', label: 'the clothing and outfit', adjacent: [] },
  { id: 'posture', module: 'body', label: 'the posture and stance', adjacent: [] },

  { id: 'full_look', module: 'full_look', label: 'the overall styling (hair, makeup and outfit together)', adjacent: [] },
];

const BY_ID = new Map(REGIONS.map((r) => [r.id, r]));

export function getRegion(id: string): Region | undefined {
  return BY_ID.get(id);
}

export function isKnownRegion(id: string): boolean {
  return BY_ID.has(id);
}

export function regionIds(): string[] {
  return REGIONS.map((r) => r.id);
}

/**
 * Regions to explicitly lock for a given target.
 *
 * Everything in the same module that is not the target, plus the target's
 * adjacent regions from any module (bleed risk), plus identity anchors that are
 * always locked unless they ARE the target.
 */
export const IDENTITY_ANCHORS = ['eye_shape', 'eye_colour', 'face_shape', 'skin_tone', 'bone_structure'];

export function lockedRegionsFor(targetId: string): string[] {
  const target = getRegion(targetId);
  if (!target) return [];
  const sameModule = REGIONS.filter((r) => r.module === target.module && r.id !== target.id);
  const adjacent = target.adjacent.map((id) => getRegion(id)).filter((r): r is Region => Boolean(r));
  const set = new Map<string, Region>();
  for (const r of [...sameModule, ...adjacent]) set.set(r.id, r);
  return [...set.values()].map((r) => r.label);
}
