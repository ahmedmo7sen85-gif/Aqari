/**
 * Provider abstraction (brief §V4).
 *
 * The product must stay vendor-replaceable: nothing outside src/lib/providers/*
 * may import a vendor SDK, a vendor model id, or a vendor response shape.
 * Agents talk to these four capabilities only.
 */

export type ImageBlob = {
  /** Raw base64, WITHOUT a data: URL prefix. */
  base64: string;
  mimeType: string;
};

export type ImageEditRequest = {
  /** The user's own photo. The only face that may ever appear in the output. */
  source: ImageBlob;
  /** Fully-built FEATURE-LOCK instruction (see lib/agents/prompt-builder.ts). */
  instruction: string;
  /** Requested output size hint; providers may clamp. */
  sizeHint?: '1K' | '2K' | '4K';
  aspectRatio?: string;
  signal?: AbortSignal;
};

export type ImageEditResult = {
  image: ImageBlob;
  /** Any text the model returned alongside the image. Never shown unguarded. */
  modelText?: string;
  provider: string;
  model: string;
};

export type StructuredRequest<T> = {
  system: string;
  user: string;
  /** JSON Schema (subset) the provider must constrain output to. */
  schema: JsonSchema;
  /** Runtime validator — the provider result is never trusted unchecked. */
  validate: (value: unknown) => T;
  signal?: AbortSignal;
};

export type StructuredResult<T> = {
  value: T;
  provider: string;
  model: string;
};

export type VisionRequest<T> = {
  image: ImageBlob;
  system: string;
  user: string;
  schema: JsonSchema;
  validate: (value: unknown) => T;
  signal?: AbortSignal;
};

export type JsonSchema = {
  type: 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean';
  description?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  nullable?: boolean;
};

export interface ImageEditProvider {
  readonly id: string;
  readonly model: string;
  /** False when the deployment has no credentials/config for this provider. */
  isConfigured(): boolean;
  editImage(req: ImageEditRequest): Promise<ImageEditResult>;
}

export interface StructuredTextProvider {
  readonly id: string;
  readonly model: string;
  isConfigured(): boolean;
  structured<T>(req: StructuredRequest<T>): Promise<StructuredResult<T>>;
}

export interface VisionProvider {
  readonly id: string;
  readonly model: string;
  isConfigured(): boolean;
  inspectImage<T>(req: VisionRequest<T>): Promise<StructuredResult<T>>;
}
