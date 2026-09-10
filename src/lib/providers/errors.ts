/**
 * Error taxonomy for the provider layer.
 *
 * HARD RULE (brief §3, V4): when a provider cannot serve a request we surface a
 * typed, honest failure. We never synthesize, mock, filter or otherwise fake a
 * result that the user would read as an AI output.
 */
export type ProviderErrorCode =
  | 'PROVIDER_NOT_CONFIGURED'
  | 'PROVIDER_UNAVAILABLE'
  | 'PROVIDER_REJECTED'
  | 'PROVIDER_TIMEOUT'
  | 'NO_IMAGE_RETURNED'
  | 'MALFORMED_RESPONSE'
  | 'INVALID_INPUT';

export class ProviderError extends Error {
  readonly code: ProviderErrorCode;
  readonly provider: string;
  readonly detail?: string;
  readonly status: number;

  constructor(args: {
    code: ProviderErrorCode;
    provider: string;
    message: string;
    detail?: string;
    status?: number;
  }) {
    super(args.message);
    this.name = 'ProviderError';
    this.code = args.code;
    this.provider = args.provider;
    this.detail = args.detail;
    this.status = args.status ?? defaultStatus(args.code);
  }

  toJSON() {
    return {
      code: this.code,
      provider: this.provider,
      message: this.message,
      detail: this.detail,
    };
  }
}

function defaultStatus(code: ProviderErrorCode): number {
  switch (code) {
    case 'PROVIDER_NOT_CONFIGURED':
    case 'PROVIDER_UNAVAILABLE':
      return 503;
    case 'PROVIDER_TIMEOUT':
      return 504;
    case 'PROVIDER_REJECTED':
      return 422;
    case 'INVALID_INPUT':
      return 400;
    default:
      return 502;
  }
}

export function isProviderError(e: unknown): e is ProviderError {
  return e instanceof ProviderError;
}
