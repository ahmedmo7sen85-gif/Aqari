# Backlog

Priority order carried over from the project brief. Status as of this commit.

## Done

- [x] **Project foundation** — Next.js App Router + TypeScript, provider
      abstraction, feature flags, brand constant, typed agent contracts.
- [x] **`POST /api/visualize`** — FEATURE-LOCK image edit via the Gemini
      adapter, structured errors, guardrail pass over any model text.
      (Supersedes the standalone `visualize-route.js` sketch.)
- [x] **End-to-end flow UI** — welcome → upload → photo check → intent →
      intensity → before/after slider → 3-intensity comparison → consultation
      brief, with the honest gap panel wherever a real result is missing.
      (Supersedes the standalone `mirra-prototype.html` sketch. If you still
      have that file and want it served for reference, drop it into `public/`.)
- [x] **Camera Intelligence Agent (item 2)** — tier 1 real pixel measurements in
      the browser (resolution, exposure, Laplacian-variance sharpness); tier 2
      vision checks (face present, single face, angle, obstruction, filtering,
      eyes open, possible minor). Checks that could not run report as
      `not_evaluated`, never as `pass`.
- [x] **Intent Understanding Agent (item 3)** — real structured-output call with
      a JSON schema and runtime validation. No keyword fallback: when it is
      unavailable the UI says the sentence was not parsed and offers the
      deterministic area chips.
- [x] **Medical Boundary / Guardrail Agent (item 4)** — deterministic rule
      engine (block / rewrite / note) applied to all model-written copy, with
      tests.
- [x] **Remaining locales (item 7)** — de, it, pt, tr added alongside en, ar,
      fr, es. Completeness is enforced by the type system.
- [x] **Brand name behind one constant (item 6, mechanism)** — `src/config/brand.ts`.
      The name itself is still undecided.

## Next

1. **Re-verify the Gemini 3 Pro Image request/response shape** against
   <https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-image> before the
   first production deployment. `ai.google.dev` was unreachable from the
   environment where `lib/providers/gemini.ts` was written, so the shape follows
   the documented `generateContent` contract rather than a live read. Then run a
   real photo through the deployed URL end to end.
2. **Rotate the leaked API key** (see `SECURITY.md`) — do this first if it has
   not happened yet.
3. **Persistence + retention** — Supabase storage for saved projects, with the
   24 h / 12 month retention rules implemented alongside it, not after.
4. **Masking** — pixel-level region enforcement so FEATURE LOCK is not
   instruction-only. Needs a landmark/segmentation step (Facial Analysis Agent).
5. **Aesthetic Knowledge & Proportion Engine** — educational, non-diagnostic.
   Must not become a scoring feature.
6. **Master orchestrator** — decompose mixed FACE / HAIR / FASHION / MEDICAL
   intents into sequential single-region jobs.
7. **Smart regeneration and edit history** — iterate on a result without losing
   the original, and keep a per-session edit trail.
8. **Doctor Matching + Price Intelligence + booking** — gated behind the
   `doctorMatching` / `priceIntelligence` flags, which are off. Price
   Intelligence must show "Price unavailable" rather than ever fabricating a
   figure; the guardrail already blocks fabricated prices in copy.
9. **Decide the final brand name**, then change `src/config/brand.ts`.

## Deliberately not done

- No simulated visualization for demo purposes, in any form.
- No stock or third-party before/after imagery.
- No fallback intent parser that guesses a region from keywords and presents it
  as understanding.
