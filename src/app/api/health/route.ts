import { NextResponse } from 'next/server';
import { capabilityStatus } from '@/lib/providers/registry';
import { allFlags } from '@/config/flags';
import { GUARDRAIL_RULE_IDS } from '@/lib/agents/guardrail-agent';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/health — what this deployment can and cannot actually do.
 *
 * Deliberately blunt: it reports which capabilities are unconfigured so the
 * gap is visible in the deployment itself, not only when a user hits it.
 * Never returns key material.
 */
export function GET() {
  return NextResponse.json({
    ok: true,
    capabilities: capabilityStatus(),
    flags: allFlags(),
    guardrail: { engine: 'deterministic', rules: GUARDRAIL_RULE_IDS.length },
    retention: { temporary_assets_hours: 24, saved_projects_months: 12 },
  });
}
