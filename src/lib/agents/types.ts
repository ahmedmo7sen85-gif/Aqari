import type { ModuleId } from './regions';

/** Brief §5 — intensity is always explicit; Subtle is the default. */
export const INTENSITIES = ['subtle', 'moderate', 'strong'] as const;
export type Intensity = (typeof INTENSITIES)[number];

/** Brief §5 — Beauty Style Profile. */
export const STYLES = [
  'natural',
  'subtle',
  'soft',
  'defined',
  'glam',
  'sculpted',
  'youthful',
  'minimal_intervention',
] as const;
export type StyleId = (typeof STYLES)[number];

/** Output of the Intent Understanding Agent. */
export type Intent = {
  module: ModuleId;
  /** Region id from lib/agents/regions.ts, or null when the agent could not resolve one. */
  target_area: string | null;
  /** Neutral restatement of what the user asked for, in the user's own terms. */
  requested_change: string;
  intensity: Intensity;
  /** true when the request is too vague/ambiguous to visualize responsibly. */
  ambiguous: boolean;
  /** One clarifying question, present only when ambiguous. */
  clarifying_question: string | null;
  /** true when the request asks to change identity, age down a minor, or target another person. */
  out_of_scope: boolean;
  out_of_scope_reason: string | null;
  confidence: number;
};

/** Output of the Camera Intelligence Agent. */
export type PhotoCheckStatus = 'pass' | 'warn' | 'fail' | 'not_evaluated';

export type PhotoCheck = {
  id: string;
  status: PhotoCheckStatus;
  /** Machine-readable reason key; the UI localizes it. */
  reason_key: string;
  /** Measured value when the check is numeric (resolution, sharpness…). */
  measured?: number;
};

export type PhotoReport = {
  checks: PhotoCheck[];
  overall: PhotoCheckStatus;
  /** Which tier produced the face-level checks; 'none' means they were not run. */
  vision_tier: 'model' | 'none';
  vision_gap_reason?: string;
};

/** Output of the Medical Boundary / Guardrail Agent. */
export type GuardrailFinding = {
  rule: string;
  severity: 'block' | 'rewrite' | 'note';
  match: string;
  /** Localization key for the explanation shown to the user or logged. */
  reason_key: string;
};

export type GuardrailResult = {
  safe: boolean;
  /** Copy after rewriting. Identical to input when nothing matched. */
  text: string;
  findings: GuardrailFinding[];
};
