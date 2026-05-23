/// <reference types="vitest" />
import { describe, it, expect } from 'vitest';
import { runSpendAudit } from './auditEngine';
import type { ToolInput } from './auditEngine';

describe('Credex AI Spend Audit Engine — Core Algorithmic Validation Suite', () => {

  // TEST 1: Claude Seat Floor Threshold Compliance
  it('should flag and optimize Claude Team plans with fewer than 5 active seats', () => {
    const sampleStack: ToolInput[] = [
      { toolName: 'claude', plan: 'Team Tier', seats: 3, monthlySpend: 150 }
    ];
    const report = runSpendAudit(sampleStack, 5);

    expect(report.netMonthlySavings).toBe(90); 
    expect(report.recommendations[0].actionRequired).toBe('DOWNGRADE_TIER');
    expect(report.recommendations[0].optimizedSpend).toBe(60);
  });

  // TEST 2: Cursor Overprovisioning Optimization Check
  it('should optimize Cursor Business tier overhead when node scale is under 3 users', () => {
    const sampleStack: ToolInput[] = [
      { toolName: 'cursor', plan: 'Business Corporate', seats: 2, monthlySpend: 80 }
    ];
    const report = runSpendAudit(sampleStack, 5);

    expect(report.netMonthlySavings).toBe(40); 
    expect(report.recommendations[0].actionRequired).toBe('DOWNGRADE_TIER');
  });

  // TEST 3: Headcount Operational Bloat Detection (teamSize Rule)
  it('should trigger CONSOLIDATE_SEATS when tool seats exceed total company headcount parameters', () => {
    const sampleStack: ToolInput[] = [
      { toolName: 'copilot', plan: 'Individual License', seats: 8, monthlySpend: 80 }
    ];
    const report = runSpendAudit(sampleStack, 5);

    expect(report.netMonthlySavings).toBe(30); 
    expect(report.recommendations[0].actionRequired).toBe('CONSOLIDATE_SEATS');
    expect(report.recommendations[0].optimizedSpend).toBe(50);
  });

  // TEST 4: High Cost Dev API Reallocation to Credex Sovereign Compute
  it('should recommend shifting massive API cost structures to subsidized Credex infra lines', () => {
    const sampleStack: ToolInput[] = [
      { toolName: 'openai_api', plan: 'Pay-as-you-go', seats: 1, monthlySpend: 400 }
    ];
    const report = runSpendAudit(sampleStack, 5);

    expect(report.netMonthlySavings).toBe(100); 
    expect(report.recommendations[0].actionRequired).toBe('MIGRATE_TO_CREDEX');
    expect(report.recommendations[0].optimizedSpend).toBe(300);
  });

  // TEST 5: Perfect Fiscal Baseline Preservation State
  it('should maintain zero variance metrics when the deployment is perfectly optimal', () => {
    const sampleStack: ToolInput[] = [
      { toolName: 'chatgpt', plan: 'Plus individual', seats: 2, monthlySpend: 40 }
    ];
    const report = runSpendAudit(sampleStack, 2);

    expect(report.netMonthlySavings).toBe(0);
    expect(report.efficiencyScore).toBe(100);
    expect(report.recommendations[0].actionRequired).toBe('OPTIMAL');
  });

});