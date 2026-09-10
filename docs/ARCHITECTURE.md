# Architecture

## Layers

```
  browser
    │  tier-1 photo measurements (real pixels, no model)
    ▼
  app/[locale]/page.tsx ──► components/Studio.tsx        the flow
    │
    ▼
  app/api/*                                              typed HTTP surface
    │
    ▼
  lib/agents/*        intent · camera · guardrail · prompt builder · regions
    │
    ▼
  lib/providers/*     the ONLY vendor-aware code: adapters + routing
    │
    ▼
  Gemini (image edit · structured text · vision)
```

Nothing above `lib/providers/` knows a vendor name, a model id, or a vendor
response shape. Swapping or adding a provider means adding one adapter file and
one branch in `registry.ts`.

## Never fake an AI result

This is the rule the layering exists to serve.

- `lib/providers/errors.ts` defines the failure taxonomy. A provider that is
  unconfigured, unreachable, timing out, refusing, or returning garbage produces
  a `ProviderError` with a specific code.
- `lib/api.ts` turns those into a structured HTTP error carrying
  `capability_gap: true` when the cause is a missing capability rather than bad
  input.
- `components/Studio.tsx` renders that as an explicit panel: *"No AI result —
  and we will not fake one"*, with the reason code, and (for
  `PROVIDER_NOT_CONFIGURED`) how to fix it. There is no placeholder image, no
  CSS filter approximation, no stock photo, anywhere in the codebase.
- `GET /api/health` reports the same truth at the deployment level so the gap is
  visible before a user hits it.

The same rule shapes the agents:

| Agent | When its provider is down |
| --- | --- |
| Intent Understanding | Returns 503. The UI says the sentence was **not** parsed and steers the user to deterministic area chips, which carry a region id and need no model. There is no keyword-matching fallback pretending to understand. |
| Camera Intelligence (tier 2) | Face-level checks come back `not_evaluated` with a reason. They are never reported as `pass` on the strength of tier-1 pixel measurements. |
| Medical Boundary | Cannot go down — it is deterministic in-process logic, deliberately not a model call. |
| Visualization | Returns 503/502/504. No image is shown. |

## Agents that exist today

| Agent | File | Kind |
| --- | --- | --- |
| Camera Intelligence — tier 1 | `lib/photo-metrics.ts`, `lib/agents/photo-grading.ts` | deterministic, browser |
| Camera Intelligence — tier 2 | `lib/agents/camera-agent.ts` | vision model |
| Intent Understanding | `lib/agents/intent-agent.ts` | structured output |
| Targeted Visualization (FEATURE LOCK) | `lib/agents/prompt-builder.ts` + `app/api/visualize` | image model |
| Medical Boundary / Guardrail | `lib/agents/guardrail-agent.ts` | deterministic rule engine |
| Region taxonomy / region validation | `lib/agents/regions.ts` | deterministic |

Not built yet (see `BACKLOG.md`): Aesthetic Knowledge & Proportion Engine,
Doctor Matching, Price Intelligence, Conversation/Edit History, Privacy/Data
Agent, and the master orchestrator that decomposes mixed FACE/HAIR/FASHION
intents.

## FEATURE LOCK

`buildVisualizationPrompt()` is the only way to produce a visualization
instruction. It always emits:

1. the single target region, named explicitly ("Edit ONLY the lips");
2. the locked list — every other region in the same module, plus the target's
   adjacent regions (the usual bleed risk), plus background, framing, lighting,
   expression and identifying marks;
3. the identity block — same person, no face swap, no beautification, no change
   to apparent age, ethnicity, gender presentation or body size;
4. an output constraint — one photo, no collage, no watermark, no extra people.

User text is sanitized before it reaches the model turn, so a request cannot
carry instructions that would loosen the lock. `tests/prompt-lock.test.ts` pins
all of this.

Masking (pixel-level region enforcement, brief V4) is not implemented yet; today
the lock is instruction-level plus region validation. That is stated here rather
than implied to be stronger than it is.

## Medical Boundary agent

A deterministic rule engine with three severities:

- **block** — the copy is dropped entirely (claims to be a doctor, beauty
  scores, dosages, fabricated prices, diagnosis phrasing);
- **rewrite** — the phrasing is replaced with the approved pattern
  ("you need X" → "one option you could discuss with a qualified professional is
  X"; guarantees and risk-downplaying language are removed);
- **note** — allowed, but recorded (e.g. specific downtime claims).

Every piece of model-written copy passes through it before reaching the user:
the visualization route reviews any text the image model volunteers, and the
intent route reviews the restatement and the clarifying question.

## Localization

`lib/i18n/dictionary.ts` types every locale as `Record<MessageKey, string>`
where `MessageKey` is derived from the English dictionary. A locale missing a
key — or inventing one — fails `npm run typecheck`. That is what keeps the
product genuinely multi-language rather than English-with-fallbacks.

`app/[locale]/layout.tsx` sets `lang`/`dir` and binds the locale's display and
body font stacks, so Arabic RTL is a first-class path rather than a patch over
an English shell.

## Provider request shape — verification status

`lib/providers/gemini.ts` targets Gemini 3 Pro Image
(`gemini-3-pro-image-preview`) via `generateContent`:

```
POST {base}/models/{model}:generateContent          header: x-goog-api-key
contents[].parts[]        { text } | { inlineData: { mimeType, data } }
generationConfig          { responseModalities: ["TEXT","IMAGE"],
                            imageConfig: { imageSize, aspectRatio? } }
response                  candidates[0].content.parts[].inlineData.{mimeType,data}
```

`ai.google.dev` is blocked from the environment this was written in, so the
shape follows the documented `generateContent` contract rather than a fresh read
of the live page. **Re-verify against the live docs before the first production
deployment** (backlog item 1). Everything vendor-specific lives in that one
file, so a shape change is a local change.
