import { NextResponse } from 'next/server';
import { understandIntent } from '@/lib/agents/intent-agent';
import { reviewCopy } from '@/lib/agents/guardrail-agent';
import { INTENSITIES, type Intensity } from '@/lib/agents/types';
import { isEnabled } from '@/config/flags';
import { ProviderError } from '@/lib/providers/errors';
import { errorResponse, readEnum, readJsonBody, readString } from '@/lib/api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/intent — Intent Understanding Agent (brief §9 item 3).
 *
 * Body: { text, locale, intensity? }
 * 200:  { intent, provider, model }
 *
 * There is no keyword-matching fallback. If the structured-output provider is
 * unavailable, this returns PROVIDER_NOT_CONFIGURED / PROVIDER_UNAVAILABLE and
 * the UI tells the user their sentence was not parsed and offers the
 * deterministic area chips instead.
 */
export async function POST(req: Request) {
  try {
    if (!isEnabled('intentAgent')) {
      throw new ProviderError({
        code: 'PROVIDER_UNAVAILABLE',
        provider: 'flag',
        message: 'Free-text understanding is switched off in this deployment.',
        detail: 'MIRRA_FLAG_INTENT_AGENT is off.',
      });
    }

    const body = await readJsonBody(req);
    const text = readString(body, 'text', 600);
    const locale = readString(body, 'locale', 8);
    const intensityHint = readEnum<Intensity>(body, 'intensity', INTENSITIES, 'subtle');

    const { intent, provider, model } = await understandIntent({ text, locale, intensityHint });

    // The restatement is model-written copy, so it passes the guardrail before
    // we echo it back to the user.
    const review = reviewCopy(intent.requested_change);
    if (!review.safe) {
      return NextResponse.json({
        intent: {
          ...intent,
          requested_change: text,
          ambiguous: true,
          clarifying_question: intent.clarifying_question,
        },
        provider,
        model,
        guardrail: { dropped: true, findings: review.findings },
      });
    }

    const clarifying = intent.clarifying_question
      ? reviewCopy(intent.clarifying_question)
      : null;

    return NextResponse.json({
      intent: {
        ...intent,
        requested_change: review.text,
        clarifying_question: clarifying?.safe ? clarifying.text : null,
      },
      provider,
      model,
      guardrail: { dropped: false, findings: review.findings },
    });
  } catch (e) {
    return errorResponse(e);
  }
}
