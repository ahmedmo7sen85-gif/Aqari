import type { PhotoCheck } from './types';

/**
 * Tier-1 grading for the browser-side photo measurements.
 *
 * Pure and dependency-free so it can run in the client bundle without dragging
 * provider code along, and so the thresholds are testable in isolation.
 */

/** Grades the numeric measurements taken in the browser. Pure, testable. */
export function gradeClientMetrics(metrics: {
  width: number;
  height: number;
  brightness: number; // 0..255 mean luma
  sharpness: number; // variance of Laplacian
  bytes: number;
}): PhotoCheck[] {
  const shortSide = Math.min(metrics.width, metrics.height);
  return [
    {
      id: 'resolution',
      measured: shortSide,
      status: shortSide >= 720 ? 'pass' : shortSide >= 480 ? 'warn' : 'fail',
      reason_key:
        shortSide >= 720
          ? 'photo_check.resolution.pass'
          : shortSide >= 480
            ? 'photo_check.resolution.warn'
            : 'photo_check.resolution.fail',
    },
    {
      id: 'exposure',
      measured: Math.round(metrics.brightness),
      status:
        metrics.brightness >= 70 && metrics.brightness <= 200
          ? 'pass'
          : metrics.brightness >= 45 && metrics.brightness <= 225
            ? 'warn'
            : 'fail',
      reason_key:
        metrics.brightness < 70
          ? 'photo_check.exposure.dark'
          : metrics.brightness > 200
            ? 'photo_check.exposure.bright'
            : 'photo_check.exposure.pass',
    },
    {
      id: 'sharpness',
      measured: Math.round(metrics.sharpness),
      status: metrics.sharpness >= 120 ? 'pass' : metrics.sharpness >= 45 ? 'warn' : 'fail',
      reason_key:
        metrics.sharpness >= 120
          ? 'photo_check.sharpness.pass'
          : metrics.sharpness >= 45
            ? 'photo_check.sharpness.warn'
            : 'photo_check.sharpness.fail',
    },
  ];
}
