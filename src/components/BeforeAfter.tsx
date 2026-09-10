'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * Before/after comparison of the SAME user's photo (brief §1).
 *
 * Both images come from this session: `before` is the user's upload, `after` is
 * the model's edit of that upload. This component never renders a stock or
 * third-party "after".
 */
export default function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
  dragLabel,
  rtl,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  dragLabel: string;
  rtl: boolean;
}) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const el = box.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, raw)));
  }, []);

  return (
    <div
      ref={box}
      className="compare"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.buttons === 1) move(e.clientX);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={before} alt={beforeLabel} />
      {/* Clipping (rather than resizing) keeps the two frames pixel-aligned. */}
      <div className="after" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after} alt={afterLabel} />
      </div>

      <span className="tag" style={{ [rtl ? 'right' : 'left']: '10px' }}>
        {beforeLabel}
      </span>
      <span className="tag" style={{ [rtl ? 'left' : 'right']: '10px' }}>
        {afterLabel}
      </span>

      <div className="handle" style={{ left: `${pos}%` }}>
        <span className="knob" aria-hidden="true">
          ⇔
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label={dragLabel}
        onChange={(e) => setPos(Number(e.target.value))}
        style={{
          position: 'absolute',
          inset: 'auto 0 8px 0',
          width: '92%',
          margin: '0 auto',
          opacity: 0,
          height: 30,
        }}
      />
    </div>
  );
}
