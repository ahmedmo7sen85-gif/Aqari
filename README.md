# Mirra

**See your beauty goals before you decide.**

Mirra is an AI aesthetic visualization, education and professional-connection
platform. You upload your photo, describe the change you are curious about, and
see it visualized **on your own face** — never on a model, never on someone
else's before/after.

> **YOU ASK. AI UNDERSTANDS. AI VISUALIZES. YOU DECIDE.**

`Mirra` is a placeholder brand name. It is defined once, in
[`src/config/brand.ts`](src/config/brand.ts).

---

## The two rules this codebase enforces in code, not just in docs

1. **The "after" is always the same person.** Every visualization is a localized
   edit of the user's own upload from the current session, built through
   [`prompt-builder.ts`](src/lib/agents/prompt-builder.ts), which cannot be
   called without the FEATURE LOCK and identity-preservation clauses.
2. **Never fake an AI result.** If a provider is missing, unavailable or refuses,
   the API returns a typed error and the UI shows an explicit gap panel naming
   the reason. Nothing is simulated, filtered, cached or substituted. See
   [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Quick start

```bash
npm install
cp .env.example .env.local     # then add your key to .env.local
npm run dev                    # http://localhost:3000 -> redirects to /en
```

The app runs without a key: every screen works, and the AI-dependent steps say
plainly that they could not run. That is the intended behaviour, not a degraded
mode to be papered over.

```bash
npm run build      # production build
npm run typecheck  # tsc --noEmit (also enforces dictionary completeness)
npm test           # guardrail + prompt-lock + grading tests
curl localhost:3000/api/health   # what this deployment can actually do
```

## Deploying (Vercel)

1. Push this repository to GitHub and import it into Vercel (framework: Next.js,
   no build overrides needed).
2. Project → Settings → Environment Variables → add `GEMINI_API_KEY` for
   Production, Preview and Development.
3. Redeploy, then check `https://<your-app>/api/health` — every capability
   should read `"configured": true`.
4. Test with a real photo through the deployed URL.

**The key is server-side only.** It is read via `process.env` inside route
handlers, never bundled, never returned in a response. No value in this project
is prefixed `NEXT_PUBLIC_`.

## Routes

| Route | What it does | Behaviour with no provider |
| --- | --- | --- |
| `POST /api/visualize` | FEATURE-LOCK image edit of the user's photo | `503 PROVIDER_NOT_CONFIGURED` |
| `POST /api/intent` | Intent Understanding Agent (structured output) | `503` — UI falls back to deterministic area chips |
| `POST /api/photo-check` | Camera Intelligence tier 2 (vision) | `200` with face checks marked `not_evaluated` |
| `GET /api/health` | Capability, flag and guardrail report | always answers |
| `GET /[locale]` | The flow, in `en · ar · fr · es · de · it · pt · tr` | works |

## Layout

```
src/config/         brand name, feature flags
src/lib/providers/  vendor adapters + routing (the only vendor-aware code)
src/lib/agents/     region taxonomy, prompt builder, intent, camera, guardrail
src/lib/i18n/       locale config + one complete dictionary per locale
src/app/            App Router pages and API routes
src/components/     the flow UI and the before/after comparison
tests/              guardrail and feature-lock tests
docs/               principles (fixed), architecture, backlog
```

## Documentation

- [`docs/PRINCIPLES.md`](docs/PRINCIPLES.md) — product principles. Fixed; do not
  silently change.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — how the layers fit together
  and which agents exist yet.
- [`docs/BACKLOG.md`](docs/BACKLOG.md) — what is done and what is next.
- [`docs/SECURITY.md`](docs/SECURITY.md) — key handling and the outstanding key
  rotation.

---

Not medical advice. Not a diagnosis. Not a guaranteed outcome.
