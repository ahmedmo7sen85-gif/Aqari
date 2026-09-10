import { ProviderError } from './errors';
import type {
  ImageEditProvider,
  ImageEditRequest,
  ImageEditResult,
  StructuredRequest,
  StructuredResult,
  StructuredTextProvider,
  VisionProvider,
  VisionRequest,
} from './types';

/**
 * Google Gemini adapter (image editing + structured text + vision).
 *
 * Image model: Gemini 3 Pro Image ("Nano Banana Pro"), chosen for identity
 * preservation and localized edits (brief §7).
 *
 * REQUEST/RESPONSE SHAPE — verification status:
 *   The canonical docs (https://ai.google.dev/gemini-api/docs/image-generation)
 *   are unreachable from the build environment used to write this file, so the
 *   shape below follows the documented generateContent contract:
 *     POST {base}/models/{model}:generateContent  (header: x-goog-api-key)
 *     body.contents[].parts[]        -> { text } | { inlineData: { mimeType, data } }
 *     body.generationConfig          -> { responseModalities, imageConfig }
 *     response.candidates[0].content.parts[].inlineData.{mimeType,data}
 *   Image-model APIs move fast. Re-verify against live docs before the first
 *   production deployment (brief §9, item 1). Everything vendor-specific is in
 *   this one file by design — a shape change is a local change.
 */

const DEFAULT_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';
const DEFAULT_IMAGE_MODEL = 'gemini-3-pro-image-preview';
const DEFAULT_TEXT_MODEL = 'gemini-3-pro-preview';
const REQUEST_TIMEOUT_MS = 120_000;

const PROVIDER_ID = 'google-gemini';

function apiKey(): string | undefined {
  const key = process.env.GEMINI_API_KEY;
  return key && key.trim() !== '' ? key.trim() : undefined;
}

function baseUrl(): string {
  return (process.env.GEMINI_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, '');
}

function requireKey(): string {
  const key = apiKey();
  if (!key) {
    throw new ProviderError({
      code: 'PROVIDER_NOT_CONFIGURED',
      provider: PROVIDER_ID,
      message: 'No AI provider is connected to this deployment.',
      detail:
        'GEMINI_API_KEY is not set. Set it in the hosting platform environment variables (server-side only) and redeploy.',
    });
  }
  return key;
}

type GeminiPart =
  | { text: string }
  | { inlineData: { mimeType: string; data: string } };

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: GeminiPart[] };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string; blockReasonMessage?: string };
  error?: { code?: number; message?: string; status?: string };
};

async function callGemini(
  model: string,
  body: unknown,
  signal?: AbortSignal,
): Promise<GeminiResponse> {
  const key = requireKey();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort);

  let res: Response;
  try {
    res = await fetch(`${baseUrl()}/models/${model}:generateContent`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-goog-api-key': key,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (e) {
    const aborted = (e as Error)?.name === 'AbortError';
    throw new ProviderError({
      code: aborted ? 'PROVIDER_TIMEOUT' : 'PROVIDER_UNAVAILABLE',
      provider: PROVIDER_ID,
      message: aborted
        ? 'The AI provider did not answer in time.'
        : 'The AI provider could not be reached.',
      detail: (e as Error)?.message,
    });
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }

  const text = await res.text();
  let json: GeminiResponse;
  try {
    json = text ? (JSON.parse(text) as GeminiResponse) : {};
  } catch {
    throw new ProviderError({
      code: 'MALFORMED_RESPONSE',
      provider: PROVIDER_ID,
      message: 'The AI provider returned a response we could not read.',
      detail: text.slice(0, 300),
    });
  }

  if (!res.ok) {
    const detail = json.error?.message || text.slice(0, 300);
    throw new ProviderError({
      code:
        res.status === 401 || res.status === 403
          ? 'PROVIDER_NOT_CONFIGURED'
          : res.status === 429 || res.status >= 500
            ? 'PROVIDER_UNAVAILABLE'
            : 'PROVIDER_REJECTED',
      provider: PROVIDER_ID,
      message: 'The AI provider refused the request.',
      detail,
      status: res.status === 429 ? 503 : undefined,
    });
  }

  const block = json.promptFeedback?.blockReason;
  if (block) {
    throw new ProviderError({
      code: 'PROVIDER_REJECTED',
      provider: PROVIDER_ID,
      message: 'The AI provider blocked this request under its own safety policy.',
      detail: json.promptFeedback?.blockReasonMessage || block,
    });
  }

  return json;
}

function partsOf(json: GeminiResponse): GeminiPart[] {
  return json.candidates?.[0]?.content?.parts ?? [];
}

function firstInlineImage(json: GeminiResponse): { mimeType: string; data: string } | undefined {
  for (const p of partsOf(json)) {
    if ('inlineData' in p && p.inlineData?.data) return p.inlineData;
  }
  return undefined;
}

function joinedText(json: GeminiResponse): string {
  return partsOf(json)
    .map((p) => ('text' in p ? p.text : ''))
    .filter(Boolean)
    .join('\n')
    .trim();
}

/** Strips ```json fences some models still emit around structured output. */
function parseJsonLoosely(raw: string): unknown {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```$/, '')
    .trim();
  return JSON.parse(cleaned);
}

// --------------------------------------------------------------------------
// Image editing
// --------------------------------------------------------------------------

export const geminiImageProvider: ImageEditProvider = {
  id: PROVIDER_ID,
  model: process.env.GEMINI_IMAGE_MODEL || DEFAULT_IMAGE_MODEL,

  isConfigured() {
    return apiKey() !== undefined;
  },

  async editImage(req: ImageEditRequest): Promise<ImageEditResult> {
    const model = this.model;
    const imageConfig: Record<string, unknown> = {
      imageSize: req.sizeHint || process.env.GEMINI_IMAGE_SIZE || '2K',
    };
    if (req.aspectRatio) imageConfig.aspectRatio = req.aspectRatio;

    const json = await callGemini(
      model,
      {
        contents: [
          {
            role: 'user',
            parts: [
              { text: req.instruction },
              { inlineData: { mimeType: req.source.mimeType, data: req.source.base64 } },
            ],
          },
        ],
        generationConfig: {
          // Gemini 3 image models return an image alongside a text turn.
          responseModalities: ['TEXT', 'IMAGE'],
          imageConfig,
        },
      },
      req.signal,
    );

    const image = firstInlineImage(json);
    if (!image) {
      throw new ProviderError({
        code: 'NO_IMAGE_RETURNED',
        provider: PROVIDER_ID,
        message: 'The AI returned no image for this request.',
        detail:
          joinedText(json).slice(0, 400) ||
          json.candidates?.[0]?.finishReason ||
          'No inline image part in the response.',
      });
    }

    return {
      image: { base64: image.data, mimeType: image.mimeType || 'image/png' },
      modelText: joinedText(json) || undefined,
      provider: PROVIDER_ID,
      model,
    };
  },
};

// --------------------------------------------------------------------------
// Structured text (Intent Understanding Agent, copy generation)
// --------------------------------------------------------------------------

export const geminiTextProvider: StructuredTextProvider = {
  id: PROVIDER_ID,
  model: process.env.GEMINI_TEXT_MODEL || DEFAULT_TEXT_MODEL,

  isConfigured() {
    return apiKey() !== undefined;
  },

  async structured<T>(req: StructuredRequest<T>): Promise<StructuredResult<T>> {
    const model = this.model;
    const json = await callGemini(
      model,
      {
        systemInstruction: { parts: [{ text: req.system }] },
        contents: [{ role: 'user', parts: [{ text: req.user }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: req.schema,
          temperature: 0.2,
        },
      },
      req.signal,
    );

    return { value: coerce(req.validate, joinedText(json)), provider: PROVIDER_ID, model };
  },
};

// --------------------------------------------------------------------------
// Vision (Camera Intelligence Agent)
// --------------------------------------------------------------------------

export const geminiVisionProvider: VisionProvider = {
  id: PROVIDER_ID,
  model: process.env.GEMINI_TEXT_MODEL || DEFAULT_TEXT_MODEL,

  isConfigured() {
    return apiKey() !== undefined;
  },

  async inspectImage<T>(req: VisionRequest<T>): Promise<StructuredResult<T>> {
    const model = this.model;
    const json = await callGemini(
      model,
      {
        systemInstruction: { parts: [{ text: req.system }] },
        contents: [
          {
            role: 'user',
            parts: [
              { text: req.user },
              { inlineData: { mimeType: req.image.mimeType, data: req.image.base64 } },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: req.schema,
          temperature: 0,
        },
      },
      req.signal,
    );

    return { value: coerce(req.validate, joinedText(json)), provider: PROVIDER_ID, model };
  },
};

function coerce<T>(validate: (v: unknown) => T, raw: string): T {
  if (!raw) {
    throw new ProviderError({
      code: 'MALFORMED_RESPONSE',
      provider: PROVIDER_ID,
      message: 'The AI returned an empty result.',
    });
  }
  let parsed: unknown;
  try {
    parsed = parseJsonLoosely(raw);
  } catch {
    throw new ProviderError({
      code: 'MALFORMED_RESPONSE',
      provider: PROVIDER_ID,
      message: 'The AI returned output that was not valid JSON.',
      detail: raw.slice(0, 300),
    });
  }
  try {
    return validate(parsed);
  } catch (e) {
    throw new ProviderError({
      code: 'MALFORMED_RESPONSE',
      provider: PROVIDER_ID,
      message: 'The AI result did not match the expected shape.',
      detail: (e as Error)?.message,
    });
  }
}
