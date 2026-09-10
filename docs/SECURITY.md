# Security notes

## Outstanding action: rotate the leaked key

A Google AI Studio API key was pasted into a chat during planning. **Treat it as
compromised.** Regenerate it in Google AI Studio before using this project, and
revoke the old one.

No API key should ever be typed into a chat, a prompt, a code file, or
client-side JavaScript. It belongs only in the hosting platform's environment
variable settings.

## How keys are handled here

- `GEMINI_API_KEY` is read with `process.env` inside server-only modules
  (`src/lib/providers/gemini.ts`), which are imported only by route handlers
  running on the Node runtime.
- No environment value in this project is prefixed `NEXT_PUBLIC_`, so nothing is
  inlined into the client bundle.
- No route echoes key material. `GET /api/health` reports whether a capability is
  configured — a boolean — and never the value.
- Provider error details are truncated before they are returned, and the adapter
  never forwards the raw upstream body.
- `.env`, `.env.local` and `.env*.local` are gitignored; `.env.example` carries
  empty values only.

## Input handling

- Uploaded photos are validated for base64 shape, MIME type and size
  (`MAX_IMAGE_BYTES`, 8 MB decoded) before anything else touches them.
- User text is sanitized (`sanitize()` in `prompt-builder.ts`) before it enters a
  model turn: control characters stripped, quotes normalized, and
  "ignore previous instructions"-style phrasing neutralized.
- Model output is never trusted unchecked: every structured response is parsed
  and validated against a runtime validator, and every piece of model-written
  copy passes the Medical Boundary agent before display.

## Privacy

- All optional consents default OFF.
- Temporary assets: deleted 24 h after job completion.
- Saved projects: retained 12 months, configurable per jurisdiction.
- No facial database. Facial data is never sold.
- The current build holds photos in memory for the duration of a request only —
  there is no storage layer yet, so nothing is persisted server-side. When
  Supabase storage is added, the retention rules above must be implemented with
  it, not after it.
