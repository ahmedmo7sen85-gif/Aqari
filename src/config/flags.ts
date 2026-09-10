/**
 * Feature flags (project brief §V4 execution layer).
 *
 * Read server-side only. A flag that is OFF must make the product *say so*
 * rather than substitute a simulated result — see docs/ARCHITECTURE.md,
 * "Never fake an AI result".
 */
export type FlagName =
  | 'intentAgent'
  | 'visionPhotoCheck'
  | 'intensityVariants'
  | 'doctorMatching'
  | 'priceIntelligence';

const DEFAULTS: Record<FlagName, boolean> = {
  intentAgent: true,
  visionPhotoCheck: true,
  intensityVariants: true,
  // Not built yet (brief §9 — after the core visualization loop is validated).
  doctorMatching: false,
  priceIntelligence: false,
};

const ENV_KEYS: Record<FlagName, string> = {
  intentAgent: 'MIRRA_FLAG_INTENT_AGENT',
  visionPhotoCheck: 'MIRRA_FLAG_VISION_PHOTO_CHECK',
  intensityVariants: 'MIRRA_FLAG_INTENSITY_VARIANTS',
  doctorMatching: 'MIRRA_FLAG_DOCTOR_MATCHING',
  priceIntelligence: 'MIRRA_FLAG_PRICE_INTELLIGENCE',
};

export function isEnabled(flag: FlagName): boolean {
  const raw = process.env[ENV_KEYS[flag]];
  if (raw == null || raw === '') return DEFAULTS[flag];
  return ['1', 'on', 'true', 'yes'].includes(raw.trim().toLowerCase());
}

export function allFlags(): Record<FlagName, boolean> {
  return (Object.keys(DEFAULTS) as FlagName[]).reduce(
    (acc, f) => ({ ...acc, [f]: isEnabled(f) }),
    {} as Record<FlagName, boolean>,
  );
}
