import test from 'node:test';
import assert from 'node:assert/strict';
import { reviewCopy, safeCopyOrNull } from '../src/lib/agents/guardrail-agent';

/**
 * The Medical Boundary agent is a safety component, so its behaviour is pinned
 * by tests rather than by convention.
 */

test('passes neutral educational copy through unchanged', () => {
  const input =
    'Non-invasive options generally involve little or no downtime. A qualified professional can explain what applies to you.';
  const out = reviewCopy(input);
  assert.equal(out.safe, true);
  assert.equal(out.findings.length, 0);
  assert.equal(out.text, input);
});

test('rewrites prescriptive phrasing into the approved pattern', () => {
  const out = reviewCopy('You need filler in this area.');
  assert.equal(out.safe, true);
  assert.match(out.text, /discuss with a qualified professional/i);
  assert.doesNotMatch(out.text, /you need/i);
  assert.ok(out.findings.some((f) => f.rule === 'prescriptive_need'));
});

test('rewrites a first-person recommendation', () => {
  const out = reviewCopy('I recommend a rhinoplasty for you.');
  assert.equal(out.safe, true);
  assert.doesNotMatch(out.text, /I recommend/i);
});

test('blocks copy that claims to be a doctor', () => {
  const out = reviewCopy('As your doctor, this is straightforward.');
  assert.equal(out.safe, false);
  assert.equal(out.text, '');
  assert.equal(safeCopyOrNull('As your doctor, this is straightforward.'), null);
});

test('blocks a beauty score', () => {
  assert.equal(reviewCopy('Your beauty score is high.').safe, false);
});

test('blocks a dosage recommendation', () => {
  assert.equal(reviewCopy('About 4 units of botox would do it.').safe, false);
});

test('blocks a fabricated price', () => {
  assert.equal(reviewCopy('This usually costs $1,200 per session.').safe, false);
});

test('removes outcome guarantees', () => {
  const out = reviewCopy('This is guaranteed to give you the result shown.');
  assert.equal(out.safe, true);
  assert.doesNotMatch(out.text, /guaranteed/i);
});

test('removes "this is what you will look like"', () => {
  const out = reviewCopy('This is exactly what you will look like afterwards.');
  assert.equal(out.safe, true);
  assert.match(out.text, /not a predicted outcome/i);
});

test('removes judgement about appearance', () => {
  const out = reviewCopy('We softened the flaw around your chin.');
  assert.equal(out.safe, true);
  assert.doesNotMatch(out.text, /flaw/i);
});

test('removes risk-downplaying language', () => {
  const out = reviewCopy('The procedure is completely safe.');
  assert.equal(out.safe, true);
  assert.doesNotMatch(out.text, /completely safe/i);
});

test('records specific downtime claims as notes without blocking', () => {
  const out = reviewCopy('Recovery takes 3 days for most people.');
  assert.equal(out.safe, true);
  assert.ok(out.findings.some((f) => f.rule === 'downtime_specific' && f.severity === 'note'));
});
