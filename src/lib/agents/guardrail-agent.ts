import type { GuardrailFinding, GuardrailResult } from './types';

/**
 * Medical Boundary / Guardrail Agent (brief §2, §4, §9 item 4).
 *
 * Every piece of AI-generated or AI-relayed copy passes through here before it
 * reaches the user. The engine is deterministic and runs in-process: it is real
 * logic, not a model call, so it cannot be "unavailable" and it cannot itself
 * invent text. That matters — the guardrail must not be the component that goes
 * dark when a provider does.
 *
 * Three severities:
 *   block   — the copy may not be shown at all; the caller drops it.
 *   rewrite — the offending phrasing is replaced with approved phrasing.
 *   note    — allowed, but recorded for review.
 *
 * Approved phrasing pattern (brief §2):
 *   "One option you could discuss with a qualified professional is ..."
 */

type Rule = {
  id: string;
  severity: GuardrailFinding['severity'];
  pattern: RegExp;
  /** Replacement for `rewrite` rules. `$1`-style captures are supported. */
  replacement?: string;
  reason_key: string;
};

const RULES: Rule[] = [
  // --- Diagnosis / prescription -------------------------------------------
  {
    id: 'prescriptive_need',
    severity: 'rewrite',
    pattern: /\byou (?:need|should get|must get|have to get|require)\b\s*/gi,
    replacement: 'one option you could discuss with a qualified professional is ',
    reason_key: 'guardrail.prescriptive',
  },
  {
    id: 'recommend_procedure',
    severity: 'rewrite',
    pattern: /\bI (?:recommend|suggest|advise)\b\s*/gi,
    replacement: 'one option you could discuss with a qualified professional is ',
    reason_key: 'guardrail.prescriptive',
  },
  {
    id: 'diagnosis_verb',
    severity: 'block',
    pattern: /\b(?:you have|you are suffering from|this is a case of|you['’]?ve got)\b.{0,40}\b(?:condition|syndrome|disorder|deficiency|asymmetry disorder)\b/gi,
    reason_key: 'guardrail.diagnosis',
  },
  {
    id: 'claims_to_be_doctor',
    severity: 'block',
    pattern: /\b(?:as (?:your|a) (?:doctor|physician|surgeon|dermatologist)|in my medical opinion|medically speaking, you)\b/gi,
    reason_key: 'guardrail.impersonation',
  },
  // --- Outcome guarantees ---------------------------------------------------
  {
    id: 'guarantee',
    severity: 'rewrite',
    pattern: /\b(?:guarantee[ds]?|guaranteed results?|is guaranteed to|will definitely|will certainly|you will get exactly)\b/gi,
    replacement: 'may',
    reason_key: 'guardrail.guarantee',
  },
  {
    id: 'result_promise',
    severity: 'rewrite',
    pattern: /\bthis is (?:exactly )?(?:what|how) you (?:will|['’]ll) look\b/gi,
    replacement: 'this is one possible visualization, not a predicted outcome',
    reason_key: 'guardrail.guarantee',
  },
  {
    id: 'risk_free',
    severity: 'rewrite',
    pattern: /\b(?:risk[- ]free|completely safe|no risks?|100% safe|painless and safe)\b/gi,
    replacement: 'something to review with a qualified professional',
    reason_key: 'guardrail.risk_downplay',
  },
  // --- Judgement about appearance (brief §2: execute, don't judge) ----------
  {
    id: 'defect_language',
    severity: 'rewrite',
    pattern: /\b(?:flaw|defect|imperfection|problem area|ugly|unattractive|bad (?:nose|chin|jaw|skin)|too (?:fat|thin|big))\b/gi,
    replacement: 'the area you asked about',
    reason_key: 'guardrail.judgement',
  },
  {
    id: 'beauty_score',
    severity: 'block',
    pattern: /\b(?:beauty score|attractiveness (?:score|rating)|you (?:rate|score)\s*\d|\d\s*(?:\/|out of)\s*10 (?:in )?(?:looks|beauty|attractiveness))\b/gi,
    reason_key: 'guardrail.rating',
  },
  {
    id: 'unsolicited_advice',
    severity: 'rewrite',
    pattern: /\byou (?:would|['’]d) look (?:better|much better|prettier|more attractive)\b/gi,
    replacement: 'another change you could explore, if you want to',
    reason_key: 'guardrail.judgement',
  },
  // --- Dosage / clinical specifics ------------------------------------------
  {
    id: 'dosage',
    severity: 'block',
    pattern: /\b\d+(?:\.\d+)?\s?(?:units?|ml|cc|mg)\b.{0,30}\b(?:botox|filler|toxin|hyaluronic|lip|injection)\b/gi,
    reason_key: 'guardrail.dosage',
  },
  {
    id: 'brand_procedure_directive',
    severity: 'rewrite',
    pattern: /\b(?:get|book|go for)\s+(?:some\s+)?(botox|fillers?|rhinoplasty|a facelift|a nose job)\b/gi,
    replacement: 'one option you could discuss with a qualified professional is $1',
    reason_key: 'guardrail.prescriptive',
  },
  // --- Price fabrication (brief §4: never invent prices) --------------------
  {
    id: 'fabricated_price',
    severity: 'block',
    pattern: /\b(?:costs?|priced at|around|about)\s?(?:[$€£]|USD|EUR|AED|SAR)\s?\d[\d,.]*/gi,
    reason_key: 'guardrail.price',
  },
  // --- Notes ----------------------------------------------------------------
  {
    id: 'downtime_specific',
    severity: 'note',
    pattern: /\b(?:recovery|downtime|healing)\s+(?:is|takes|of)\s+\d+\s*(?:days?|weeks?|months?)\b/gi,
    reason_key: 'guardrail.downtime_specific',
  },
];

export function reviewCopy(input: string): GuardrailResult {
  const findings: GuardrailFinding[] = [];
  let text = input;
  let blocked = false;

  for (const rule of RULES) {
    const re = new RegExp(rule.pattern.source, rule.pattern.flags);
    const matches = input.match(re);
    if (!matches || matches.length === 0) continue;

    for (const m of matches.slice(0, 5)) {
      findings.push({ rule: rule.id, severity: rule.severity, match: m.trim().slice(0, 120), reason_key: rule.reason_key });
    }

    if (rule.severity === 'block') {
      blocked = true;
    } else if (rule.severity === 'rewrite' && rule.replacement !== undefined) {
      text = text.replace(new RegExp(rule.pattern.source, rule.pattern.flags), rule.replacement);
    }
  }

  if (blocked) {
    return { safe: false, text: '', findings };
  }

  return { safe: true, text: tidy(text), findings };
}

/**
 * Convenience wrapper for the common case: return the copy if it survives,
 * otherwise return null so the caller shows its own neutral fallback rather
 * than a laundered version of unsafe text.
 */
export function safeCopyOrNull(input: string): string | null {
  const result = reviewCopy(input);
  return result.safe ? result.text : null;
}

function tidy(text: string): string {
  return text
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/(^|[.!?]\s+)([a-z])/g, (_m, p1: string, p2: string) => p1 + p2.toUpperCase())
    .trim();
}

/** Exposed for tests and for the review log. */
export const GUARDRAIL_RULE_IDS = RULES.map((r) => r.id);
