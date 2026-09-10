# Mirra — product principles

These are fixed. Do not change them silently; if a change is genuinely needed,
raise it explicitly and get a decision before implementing it.

## 1. The promise

> See your beauty goals before you decide.

```
photo -> the user describes the change they want (natural language) ->
AI identifies the target area -> AI generates a personalized visualization ->
before/after of the SAME user -> understand the options ->
optional professional discovery -> consultation brief -> booking
```

**Non-negotiable:** the "after" image is always the same user's own face,
generated only from their own photo. Never another person's face. Never a
swapped identity. Never other customers' before/afters as the default
experience.

## 2. YOU ASK. AI VISUALIZES.

Three layers, kept strictly apart:

| Layer | What it does | What it must never do |
| --- | --- | --- |
| **Visualization** | Executes the user's explicit request on their own photo | Change anything that was not requested |
| **Education** | Neutral, non-diagnostic explanation of what a *category* of change generally involves (non-invasive / minimally invasive / injectable / surgical), downtime category, general risks, questions to ask | Recommend a specific procedure for this user |
| **Professional guidance** | Points to qualified professionals | Diagnose, prescribe, guarantee, or claim to be a doctor |

Approved phrasing pattern:

> "One option you could discuss with a qualified professional is …"

Mirra is **not** an AI doctor, a beauty-rating app, a defect detector, or a
filter app. It never judges appearance and never gives unsolicited cosmetic
recommendations. Hair and Style modules may offer neutral options; they never
offer judgements. No body-shaming. No beauty scores.

**EXECUTE, DON'T JUDGE.**

## 3. Scope

Five modules: **Face, Hair, Makeup, Body/Fashion, Full Look.**

The product is a decision journey, not a single generation: photo → AI
visualization on the user's OWN face → adjust versions → compare → real verified
doctor results → consultation guide → matching doctors → booking.

The app must actively prevent the user from believing that a visualization
obliges a professional to deliver that exact result. Every visualization is
followed by "what a specialist should assess" and questions for the doctor.

## 4. Hard rule — never fake an AI result

If a provider is unavailable: build the interface, isolate the gap, and **say
so**. Never show a simulated, filtered, cached or stock result in place of a
model output.

## 5. Technical principles

- **FEATURE LOCK** — non-requested regions are explicitly protected, at the
  model-instruction level and (target state) at a masking level.
- **Identity preservation** — the output must remain recognizably the same
  person.
- **Intensity** — Subtle (default) / Moderate / Strong, generated as separate
  variants.
- **Beauty Style Profile** — Natural, Subtle, Soft, Defined, Glam, Sculpted,
  Youthful, Minimal Intervention.
- **Privacy by design** — all optional consents default OFF; temporary assets
  deleted 24 h after job completion; saved projects retained 12 months
  (configurable per jurisdiction); no facial database; facial data is never
  sold.
- **Provider-agnostic** — no vendor lock-in; the AI provider must stay
  replaceable.

## 6. Design and localization

- Luxury, minimal, premium beauty-tech. Warm ivory `#F7F1E6`, charcoal
  `#221F1D`, champagne `#C9A876`, soft blush `#D9A9A0`, deep merlot `#5B2333`
  for CTAs. Light and dark mode.
- Playfair Display / Amiri (display, Latin / Arabic), Inter / Cairo (body,
  Latin / Arabic).
- **Fully multi-language, not English-first with fallbacks.** Target locales:
  English, Arabic (RTL), French, Spanish, German, Italian, Portuguese, Turkish.
- Stack: Next.js on Supabase + Vercel.
