'use client';

import { useMemo, useRef, useState } from 'react';
import BeforeAfter from './BeforeAfter';
import { gradeClientMetrics } from '@/lib/agents/photo-grading';
import { preparePhoto, type PreparedPhoto } from '@/lib/photo-metrics';
import { REGIONS } from '@/lib/agents/regions';
import { INTENSITIES, STYLES, type Intensity, type Intent, type PhotoReport, type StyleId } from '@/lib/agents/types';
import type { Dictionary, MessageKey } from '@/lib/i18n/dictionary';
import type { Locale } from '@/lib/i18n/config';

/**
 * The end-to-end flow (brief §1):
 *   photo -> what you want -> how much -> your own before/after -> compare ->
 *   what a specialist would assess -> consultation brief.
 *
 * Two rules are enforced in this component, not just documented:
 *  1. The "after" is always the model's edit of the user's own upload from this
 *     session. There is no stock imagery anywhere in the product.
 *  2. When the backend cannot produce a real result, the failure is shown as a
 *     failure. Nothing is simulated, filtered or substituted.
 */

type Step = 'welcome' | 'upload' | 'check' | 'intent' | 'intensity' | 'result';

type ApiFailure = { code: string; message: string; detail?: string; capability_gap: boolean };

const CHIP_REGIONS = [
  'lips',
  'nose',
  'jawline',
  'chin',
  'cheeks',
  'under_eyes',
  'skin_texture',
  'teeth',
  'eyebrows',
  'hairstyle',
  'hair_color',
  'facial_hair',
];

const STEP_ORDER: Step[] = ['upload', 'check', 'intent', 'intensity', 'result'];

export default function Studio({
  locale,
  dict,
  brandName,
  locales,
}: {
  locale: Locale;
  dict: Dictionary;
  brandName: string;
  locales: { code: string; label: string }[];
}) {
  const t = useMemo(
    () =>
      (key: MessageKey, vars?: Record<string, string | number>) => {
        const raw = dict[key];
        return vars
          ? raw.replace(/\{(\w+)\}/g, (m, n: string) => (n in vars ? String(vars[n]) : m))
          : raw;
      },
    [dict],
  );

  const rtl = locale === 'ar';

  const [step, setStep] = useState<Step>('welcome');
  const [photo, setPhoto] = useState<PreparedPhoto | null>(null);
  const [report, setReport] = useState<PhotoReport | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [failure, setFailure] = useState<ApiFailure | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const [text, setText] = useState('');
  const [region, setRegion] = useState<string | null>(null);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [intentGap, setIntentGap] = useState(false);
  const [style, setStyle] = useState<StyleId>('natural');
  const [intensity, setIntensity] = useState<Intensity>('subtle');
  const [consent, setConsent] = useState(false);

  const [result, setResult] = useState<string | null>(null);
  const [variants, setVariants] = useState<Partial<Record<Intensity, string>>>({});
  const [briefText, setBriefText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);

  const stepIndex = STEP_ORDER.indexOf(step);

  function reset() {
    if (photo) URL.revokeObjectURL(photo.previewUrl);
    setPhoto(null);
    setReport(null);
    setText('');
    setRegion(null);
    setIntent(null);
    setIntentGap(false);
    setResult(null);
    setVariants({});
    setBriefText(null);
    setFailure(null);
    setLocalError(null);
    setConsent(false);
    setStep('welcome');
  }

  async function post<T>(url: string, body: unknown): Promise<T> {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = (await res.json()) as T & { error?: ApiFailure };
    if (!res.ok || json.error) {
      throw json.error ?? {
        code: 'UNKNOWN',
        message: `Request failed (${res.status}).`,
        capability_gap: false,
      };
    }
    return json;
  }

  async function onPickFile(file: File) {
    setLocalError(null);
    setFailure(null);
    setBusy(t('upload.measuring'));
    try {
      const prepared = await preparePhoto(file);
      setPhoto(prepared);

      const clientChecks = gradeClientMetrics(prepared.metrics);
      try {
        const { report: r } = await post<{ report: PhotoReport }>('/api/photo-check', {
          imageBase64: prepared.base64,
          mimeType: prepared.mimeType,
          clientChecks,
        });
        setReport(r);
      } catch (e) {
        const err = e as ApiFailure;
        if (err.code === 'SUBJECT_NOT_ELIGIBLE') {
          setLocalError(err.message);
          setPhoto(null);
          setBusy(null);
          return;
        }
        // The vision tier failed outright: report tier 1 only, and say tier 2
        // did not run rather than implying the photo passed.
        setReport({
          checks: [
            ...clientChecks,
            ...['face_present', 'single_face', 'face_angle', 'face_unobstructed', 'no_heavy_filter', 'eyes_open'].map(
              (id) => ({ id, status: 'not_evaluated' as const, reason_key: 'photo_check.gap.request_failed' }),
            ),
          ],
          overall: clientChecks.some((c) => c.status === 'fail')
            ? 'fail'
            : clientChecks.some((c) => c.status === 'warn')
              ? 'warn'
              : 'pass',
          vision_tier: 'none',
          vision_gap_reason: 'photo_check.gap.request_failed',
        });
      }
      setStep('check');
    } catch (e) {
      setLocalError((e as Error).message || 'This file could not be read.');
    } finally {
      setBusy(null);
    }
  }

  async function onSubmitIntent() {
    setFailure(null);
    setIntentGap(false);

    // A chip alone is deterministic: it carries a region id, so it works with or
    // without the intent agent.
    if (!text.trim() && region) {
      setIntent(null);
      setStep('intensity');
      return;
    }

    setBusy(t('intent.parsing'));
    try {
      const { intent: parsed } = await post<{ intent: Intent }>('/api/intent', {
        text: text.trim(),
        locale,
        intensity,
      });
      setIntent(parsed);

      if (parsed.out_of_scope) return;
      if (parsed.ambiguous && !parsed.target_area && !region) return;

      if (parsed.target_area) setRegion(parsed.target_area);
      setIntensity(parsed.intensity);
      setStep('intensity');
    } catch (e) {
      const err = e as ApiFailure;
      // No fallback parsing: we say the sentence was not understood and steer
      // the user to the deterministic chips.
      setIntentGap(true);
      if (!err.capability_gap) setFailure(err);
    } finally {
      setBusy(null);
    }
  }

  function requestedChangeFor(): string {
    if (intent?.requested_change) return intent.requested_change;
    if (text.trim()) return text.trim();
    const label = REGIONS.find((r) => r.id === region)?.label ?? region ?? '';
    return `a restrained refinement of ${label}; no further detail was specified by the user`;
  }

  async function generate(level: Intensity, into: 'main' | 'variant') {
    if (!photo || !region) return;
    setFailure(null);
    setBusy(t('result.generating'));
    if (into === 'main') setStep('result');
    try {
      const res = await post<{ imageBase64: string; mimeType: string }>('/api/visualize', {
        imageBase64: photo.base64,
        mimeType: photo.mimeType,
        targetArea: region,
        requestedChange: requestedChangeFor(),
        style,
        intensity: level,
      });
      const url = `data:${res.mimeType};base64,${res.imageBase64}`;
      if (into === 'main') setResult(url);
      setVariants((v) => ({ ...v, [level]: url }));
    } catch (e) {
      setFailure(e as ApiFailure);
      if (into === 'main') setResult(null);
    } finally {
      setBusy(null);
    }
  }

  async function generateAllVariants() {
    for (const level of INTENSITIES) {
      if (!variants[level]) {
        // Sequential: three concurrent image jobs is a good way to get rate
        // limited, and a partial grid is worse than a slower complete one.
        // eslint-disable-next-line no-await-in-loop
        await generate(level, 'variant');
      }
    }
  }

  function buildBrief() {
    const regionLabel = region ? t(`region.${region}` as MessageKey) : '—';
    const lines = [
      `${brandName} — ${t('result.brief_title')}`,
      '',
      `${t('brief.request')}: ${requestedChangeFor()}`,
      `${t('brief.area')}: ${regionLabel}`,
      `${t('brief.intensity')}: ${t(`intensity.${intensity}` as MessageKey)}`,
      `${t('brief.style')}: ${t(`style.${style}` as MessageKey)}`,
      '',
      t('brief.note'),
      '',
      `${t('brief.questions')}:`,
      `1. ${t('result.q1')}`,
      `2. ${t('result.q2')}`,
      `3. ${t('result.q3')}`,
      `4. ${t('result.q4')}`,
      '',
      t('footer.notmedical'),
    ];
    setBriefText(lines.join('\n'));
  }

  return (
    <main className="shell">
      <header className="topbar">
        <h1 className="wordmark">
          {brandName}
          <small>{t('brand.principle')}</small>
        </h1>
        <nav className="langs" aria-label={t('common.language')}>
          {locales.map((l) => (
            <a key={l.code} href={`/${l.code}`} aria-current={l.code === locale}>
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      {stepIndex >= 0 && (
        <p className="progress">{t('common.step', { n: stepIndex + 1, total: STEP_ORDER.length })}</p>
      )}

      {localError && <div className="notice gap">{localError}</div>}

      {step === 'welcome' && (
        <section className="card">
          <h2>{t('welcome.title')}</h2>
          <p className="lede">{t('welcome.lede')}</p>
          <ul>
            <li>{t('welcome.point1')}</li>
            <li>{t('welcome.point2')}</li>
            <li>{t('welcome.point3')}</li>
          </ul>
          <hr className="rule" />
          <p className="lede" style={{ fontSize: '0.84rem' }}>
            {t('welcome.legal')}
          </p>
          <button className="btn" onClick={() => setStep('upload')}>
            {t('welcome.cta')}
          </button>
        </section>
      )}

      {step === 'upload' && (
        <section className="card">
          <h2>{t('upload.title')}</h2>
          <p className="lede">{t('upload.lede')}</p>

          <label className="consent">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>{t('upload.consent')}</span>
          </label>

          <hr className="rule" />

          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onPickFile(f);
              e.target.value = '';
            }}
          />
          <div className="row">
            <button className="btn" disabled={!consent || busy !== null} onClick={() => fileInput.current?.click()}>
              {busy ? (
                <>
                  <span className="spinner" />
                  {busy}
                </>
              ) : (
                t('upload.pick')
              )}
            </button>
            <button className="btn link" onClick={() => setStep('welcome')}>
              {t('common.back')}
            </button>
          </div>

          <p className="lede" style={{ fontSize: '0.8rem', marginTop: 14 }}>
            {t('upload.privacy')}
          </p>
        </section>
      )}

      {step === 'check' && report && photo && (
        <section className="card">
          <h2>{t('check.title')}</h2>
          <p className="lede">{t('check.lede')}</p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.previewUrl}
            alt=""
            style={{ width: 128, borderRadius: 10, border: '1px solid var(--line)', marginBottom: 14 }}
          />

          <ul className="checklist">
            {report.checks.map((c) => (
              <li key={c.id} className="checkitem">
                <span>{t(`check.${c.id}` as MessageKey)}</span>
                <span className={`badge ${c.status}`}>{t(`status.${c.status}` as MessageKey)}</span>
              </li>
            ))}
          </ul>

          <p style={{ marginTop: 16 }}>{t(`check.overall.${report.overall}` as MessageKey)}</p>

          {report.vision_tier === 'none' && (
            <div className="notice gap">
              <strong>{t('check.notrun')}</strong>
              {report.vision_gap_reason && (
                <p style={{ margin: '8px 0 0' }}>
                  {t('gap.code')}: <code>{report.vision_gap_reason}</code>
                </p>
              )}
            </div>
          )}

          <div className="row" style={{ marginTop: 16 }}>
            <button className="btn" onClick={() => setStep('intent')}>
              {t('check.continue')}
            </button>
            <button
              className="btn ghost"
              onClick={() => {
                setPhoto(null);
                setReport(null);
                setStep('upload');
              }}
            >
              {t('check.retake')}
            </button>
          </div>
        </section>
      )}

      {step === 'intent' && (
        <section className="card">
          <h2>{t('intent.title')}</h2>
          <p className="lede">{t('intent.lede')}</p>

          <textarea
            rows={3}
            value={text}
            placeholder={t('intent.placeholder')}
            onChange={(e) => setText(e.target.value)}
          />

          {intent?.out_of_scope && (
            <div className="notice gap" style={{ marginTop: 12 }}>
              {t('intent.out_of_scope')}
              {intent.out_of_scope_reason && <p style={{ margin: '8px 0 0' }}>{intent.out_of_scope_reason}</p>}
            </div>
          )}

          {intent?.ambiguous && intent.clarifying_question && !intent.out_of_scope && (
            <div className="notice" style={{ marginTop: 12 }}>
              <strong>{t('intent.ambiguous')}</strong>
              <p style={{ margin: '6px 0 0' }}>{intent.clarifying_question}</p>
            </div>
          )}

          {intentGap && (
            <div className="notice gap" style={{ marginTop: 12 }}>
              {t('intent.unavailable')}
              {failure && (
                <p style={{ margin: '8px 0 0' }}>
                  {t('gap.code')}: <code>{failure.code}</code>
                </p>
              )}
            </div>
          )}

          <h3 style={{ marginTop: 18 }}>{t('intent.chips')}</h3>
          <div className="chips">
            {CHIP_REGIONS.map((id) => (
              <button
                key={id}
                className="chip"
                aria-pressed={region === id}
                onClick={() => setRegion(region === id ? null : id)}
              >
                {t(`region.${id}` as MessageKey)}
              </button>
            ))}
          </div>

          <h3 style={{ marginTop: 18 }}>{t('intent.style')}</h3>
          <div className="chips">
            {STYLES.map((s) => (
              <button key={s} className="chip" aria-pressed={style === s} onClick={() => setStyle(s)}>
                {t(`style.${s}` as MessageKey)}
              </button>
            ))}
          </div>

          <div className="row" style={{ marginTop: 18 }}>
            <button
              className="btn"
              disabled={busy !== null || (!text.trim() && !region)}
              onClick={() => void onSubmitIntent()}
            >
              {busy ? (
                <>
                  <span className="spinner" />
                  {busy}
                </>
              ) : (
                t('intent.parse')
              )}
            </button>
            <button className="btn link" onClick={() => setStep('check')}>
              {t('common.back')}
            </button>
          </div>
        </section>
      )}

      {step === 'intensity' && (
        <section className="card">
          <h2>{t('intensity.title')}</h2>
          <p className="lede">{t('intensity.lede')}</p>

          <div className="chips">
            {INTENSITIES.map((level) => (
              <button
                key={level}
                className="chip"
                aria-pressed={intensity === level}
                onClick={() => setIntensity(level)}
              >
                {t(`intensity.${level}` as MessageKey)}
              </button>
            ))}
          </div>

          <p className="lede" style={{ fontSize: '0.83rem', marginTop: 14 }}>
            {t('intensity.note')}
          </p>

          <div className="row">
            <button className="btn" onClick={() => void generate(intensity, 'main')}>
              {t('common.next')}
            </button>
            <button className="btn link" onClick={() => setStep('intent')}>
              {t('common.back')}
            </button>
          </div>
        </section>
      )}

      {step === 'result' && (
        <section className="card">
          <h2>{t('result.title')}</h2>

          {busy && (
            <p className="lede">
              <span className="spinner" />
              {busy}
            </p>
          )}

          {/* The honest gap: no image, no simulation, a stated reason. */}
          {!busy && !result && failure && (
            <div className="notice gap">
              <h3 style={{ marginTop: 0 }}>{failure.capability_gap ? t('gap.title') : failure.message}</h3>
              {failure.capability_gap && <p>{t('gap.body')}</p>}
              <p style={{ margin: '8px 0 0' }}>
                {t('gap.code')}: <code>{failure.code}</code>
              </p>
              {failure.detail && (
                <p className="lede" style={{ margin: '8px 0 0', fontSize: '0.82rem' }}>
                  {failure.detail}
                </p>
              )}
              {failure.code === 'PROVIDER_NOT_CONFIGURED' && (
                <p style={{ margin: '10px 0 0', fontSize: '0.82rem' }}>{t('gap.fix')}</p>
              )}
              <div className="row" style={{ marginTop: 12 }}>
                <button className="btn ghost" onClick={() => void generate(intensity, 'main')}>
                  {t('common.next')}
                </button>
                <button className="btn link" onClick={() => setStep('intensity')}>
                  {t('common.back')}
                </button>
              </div>
            </div>
          )}

          {result && photo && (
            <>
              <BeforeAfter
                before={photo.previewUrl}
                after={result}
                beforeLabel={t('result.before')}
                afterLabel={t('result.after')}
                dragLabel={t('result.drag')}
                rtl={rtl}
              />

              <div className="notice" style={{ marginTop: 14 }}>
                {t('result.disclaimer')}
              </div>

              <h3 style={{ marginTop: 20 }}>{t('result.variants')}</h3>
              <div className="variants">
                {INTENSITIES.map((level) => (
                  <figure key={level} className="variant" style={{ margin: 0 }}>
                    {variants[level] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={variants[level]} alt={t(`intensity.${level}` as MessageKey)} />
                    ) : (
                      <div
                        style={{
                          aspectRatio: '1/1',
                          border: '1px dashed var(--line)',
                          borderRadius: 'var(--radius-sm)',
                          display: 'grid',
                          placeItems: 'center',
                          color: 'var(--ink-muted)',
                          fontSize: '0.78rem',
                        }}
                      >
                        —
                      </div>
                    )}
                    <figcaption>{t(`intensity.${level}` as MessageKey)}</figcaption>
                  </figure>
                ))}
              </div>
              <div className="row" style={{ marginTop: 10 }}>
                <button className="btn ghost" disabled={busy !== null} onClick={() => void generateAllVariants()}>
                  {t('result.variants_cta')}
                </button>
              </div>

              <hr className="rule" />

              <h3>{t('result.assess_title')}</h3>
              <p className="lede">{t('result.assess_body')}</p>

              <h3>{t('result.questions_title')}</h3>
              <ul>
                <li>{t('result.q1')}</li>
                <li>{t('result.q2')}</li>
                <li>{t('result.q3')}</li>
                <li>{t('result.q4')}</li>
              </ul>

              <div className="row">
                <button className="btn" onClick={buildBrief}>
                  {t('result.brief_cta')}
                </button>
                <button className="btn ghost" onClick={() => setStep('intent')}>
                  {t('result.again')}
                </button>
                <button className="btn link" onClick={reset}>
                  {t('common.restart')}
                </button>
              </div>

              {briefText && (
                <>
                  <h3 style={{ marginTop: 20 }}>{t('result.brief_title')}</h3>
                  <p className="lede" style={{ fontSize: '0.83rem' }}>
                    {t('result.brief_hint')}
                  </p>
                  <pre className="brief">{briefText}</pre>
                  <button
                    className="btn ghost"
                    onClick={() => {
                      void navigator.clipboard?.writeText(briefText);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    {copied ? t('common.copied') : t('common.copy')}
                  </button>
                </>
              )}
            </>
          )}
        </section>
      )}

      <footer className="foot">
        <p>{t('footer.notmedical')}</p>
        <p>{t('brand.tagline')}</p>
      </footer>
    </main>
  );
}
