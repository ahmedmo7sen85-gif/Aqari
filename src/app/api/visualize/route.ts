import { NextResponse } from 'next/server';
import { buildVisualizationPrompt } from '@/lib/agents/prompt-builder';
import { reviewCopy } from '@/lib/agents/guardrail-agent';
import { isKnownRegion } from '@/lib/agents/regions';
import { INTENSITIES, STYLES, type Intensity, type StyleId } from '@/lib/agents/types';
import { imageEditProvider } from '@/lib/providers/registry';
import { BadRequest, errorResponse, readEnum, readImage, readJsonBody, readString } from '@/lib/api';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

/**
 * POST /api/visualize
 *
 * Body:  { imageBase64, mimeType, targetArea, requestedChange, style, intensity }
 * 200:   { imageBase64, mimeType, provider, model, promptSummary, modelNote? }
 * 4xx/5xx: { error: { code, message, detail?, capability_gap } }
 *
 * HARD RULE (brief §3): when the provider cannot produce a real edit, this route
 * returns a typed error. It never returns a filtered, cached, stock or otherwise
 * synthesized image that a user could mistake for an AI result.
 *
 * The API key is read from the server environment only and is never sent to the
 * client in any response.
 */
export async function POST(req: Request) {
  try {
    const body = await readJsonBody(req);

    const source = readImage(body);
    const targetArea = readString(body, 'targetArea', 60);
    if (!isKnownRegion(targetArea)) {
      throw new BadRequest(`Unknown targetArea "${targetArea}".`);
    }

    const requestedChange = readString(body, 'requestedChange', 300);
    const intensity = readEnum<Intensity>(body, 'intensity', INTENSITIES, 'subtle');
    const style = readEnum<StyleId>(body, 'style', STYLES, 'natural');

    const instruction = buildVisualizationPrompt({
      targetAreaId: targetArea,
      requestedChange,
      intensity,
      style,
    });

    const provider = imageEditProvider();
    const result = await provider.editImage({ source, instruction, signal: req.signal });

    // Any text the model volunteered goes through the Medical Boundary agent
    // before it can reach the user; unsafe text is dropped, not laundered.
    const review = result.modelText ? reviewCopy(result.modelText) : null;

    return NextResponse.json({
      imageBase64: result.image.base64,
      mimeType: result.image.mimeType,
      provider: result.provider,
      model: result.model,
      targetArea,
      intensity,
      style,
      modelNote: review?.safe ? review.text : undefined,
      guardrail: review
        ? { findings: review.findings.map((f) => ({ rule: f.rule, severity: f.severity })) }
        : undefined,
    });
  } catch (e) {
    return errorResponse(e);
  }
}
