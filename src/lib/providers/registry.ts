import { geminiImageProvider, geminiTextProvider, geminiVisionProvider } from './gemini';
import { ProviderError } from './errors';
import type { ImageEditProvider, StructuredTextProvider, VisionProvider } from './types';

/**
 * Model routing (brief §V4).
 *
 * One place decides which adapter serves each capability. Adding a second
 * vendor means adding an adapter file and a branch here — nothing else in the
 * codebase changes.
 *
 * If the selected provider is not configured we throw PROVIDER_NOT_CONFIGURED.
 * We do NOT silently fall back to a weaker model and we never fabricate output.
 */

export type Capability = 'image-edit' | 'structured-text' | 'vision';

const imageProviders: ImageEditProvider[] = [geminiImageProvider];
const textProviders: StructuredTextProvider[] = [geminiTextProvider];
const visionProviders: VisionProvider[] = [geminiVisionProvider];

function pick<T extends { isConfigured(): boolean; id: string }>(
  list: T[],
  capability: Capability,
): T {
  const configured = list.find((p) => p.isConfigured());
  if (configured) return configured;
  throw new ProviderError({
    code: 'PROVIDER_NOT_CONFIGURED',
    provider: list[0]?.id ?? 'none',
    message: `No provider is connected for "${capability}".`,
    detail:
      'Set GEMINI_API_KEY in the hosting platform environment variables (server-side only) and redeploy.',
  });
}

export function imageEditProvider(): ImageEditProvider {
  return pick(imageProviders, 'image-edit');
}

export function structuredTextProvider(): StructuredTextProvider {
  return pick(textProviders, 'structured-text');
}

export function visionProvider(): VisionProvider {
  return pick(visionProviders, 'vision');
}

/** Non-throwing capability report, for /api/health and honest UI messaging. */
export function capabilityStatus(): Record<Capability, { configured: boolean; provider: string; model: string }> {
  return {
    'image-edit': describe(imageProviders[0]),
    'structured-text': describe(textProviders[0]),
    vision: describe(visionProviders[0]),
  };
}

function describe(p: { id: string; model: string; isConfigured(): boolean } | undefined) {
  if (!p) return { configured: false, provider: 'none', model: 'none' };
  return { configured: p.isConfigured(), provider: p.id, model: p.model };
}
