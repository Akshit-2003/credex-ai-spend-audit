// Strict type frameworks for Audit Inputs & Outputs

export interface ToolInput {
  toolName: string;
  plan: string;
  seats: number;
  monthlySpend: number;
}

export interface AuditRecommendation {
  toolName: string;
  currentSpend: number;
  optimizedSpend: number;
  potentialSavings: number;
  actionRequired: 'DOWNGRADE_TIER' | 'CONSOLIDATE_SEATS' | 'OPTIMAL' | 'MIGRATE_TO_CREDEX';
  reasoning: string;
}

export interface AuditSummary {
  totalCurrentSpend: number;
  totalOptimizedSpend: number;
  netMonthlySavings: number;
  efficiencyScore: number; // Percentage value (0-100)
  recommendations: AuditRecommendation[];
  credexSubsidyEligible: boolean;
  credexSubsidyAmount: number;
}

/**
 * Pure Deterministic Audit Engine Module
 * Evaluates operational inputs directly against verified May 2026 contract parameters.
 */
export function runSpendAudit(tools: ToolInput[], teamSize: number): AuditSummary {
  let totalCurrentSpend = 0;
  let totalOptimizedSpend = 0;
  const recommendations: AuditRecommendation[] = [];

  tools.forEach((tool) => {
    const current = tool.monthlySpend;
    totalCurrentSpend += current;
    
    let optimized = current;
    let action: AuditRecommendation['actionRequired'] = 'OPTIMAL';
    let reasoning = "Your current pricing tier alignment fits standard operational patterns safely.";

    const name = tool.toolName.toLowerCase();

    // 1. ANTHROPIC CLAUDE COMPLIANCE MATRIX
    if (name.includes('claude')) {
      const isTeamPlan = tool.plan.toLowerCase().includes('team');
      if (isTeamPlan && tool.seats < 5) {
        const individualProCost = tool.seats * 20;
        if (individualProCost < current) {
          optimized = individualProCost;
          action = 'DOWNGRADE_TIER';
          reasoning = `Anthropic Claude Team tier enforces a mandatory 5-seat billing floor. Downgrading your ${tool.seats} active users to individual 'Pro' accounts ($20/mo) prevents paying for ghost allocations.`;
        }
      } else if (!isTeamPlan && tool.seats >= 5) {
        const standardProCost = tool.seats * 20;
        if (current > standardProCost) {
          optimized = standardProCost;
          action = 'CONSOLIDATE_SEATS';
          reasoning = "Your individual billing nodes exceed standard matrix tiers. Consolidate into a single centralized subscription channel.";
        }
      }
    }

    // 2. CURSOR AI EDITOR ANALYSIS
    else if (name.includes('cursor')) {
      const isBusiness = tool.plan.toLowerCase().includes('business');
      const standardProCost = tool.seats * 20;

      if (isBusiness && tool.seats < 3) {
        optimized = standardProCost;
        action = 'DOWNGRADE_TIER';
        reasoning = `Cursor Business tier ($40/mo) is overkill for small deployments. Shifting your team to Cursor Pro ($20/mo) maintains unlimited autocomplete while reducing line overhead.`;
      } else if (current > (isBusiness ? tool.seats * 40 : standardProCost)) {
        optimized = isBusiness ? tool.seats * 40 : standardProCost;
        action = 'CONSOLIDATE_SEATS';
        reasoning = "Detected internal premium seat padding. Normalizing to real verified retail limits.";
      }
    }

    // 3. CHATGPT (OPENAI) COMPLIANCE ENGINE
    else if (name.includes('chatgpt')) {
      const isTeam = tool.plan.toLowerCase().includes('team');
      if (isTeam && tool.seats < 2) {
        optimized = tool.seats * 20;
        action = 'DOWNGRADE_TIER';
        reasoning = "OpenAI ChatGPT Team subscription enforces a 2-seat minimum contract floor. Reverting standalone user to ChatGPT Plus saves direct monthly capital.";
      } else if (current > (isTeam ? tool.seats * 30 : tool.seats * 20)) {
        optimized = isTeam ? tool.seats * 30 : tool.seats * 20;
        action = 'CONSOLIDATE_SEATS';
        reasoning = "Billing telemetry exceeds base OpenAI contract thresholds. Trimming residual retail padding.";
      }
    }

    // 4. HEADCOUNT OVERPROVISIONING CHECK (Fixed fractional math logic here!)
    if (tool.seats > teamSize && action === 'OPTIMAL') {
      const adjustedSeatsCost = Math.round(teamSize * (current / tool.seats));
      if (adjustedSeatsCost < current) {
        optimized = adjustedSeatsCost;
        action = 'CONSOLIDATE_SEATS';
        reasoning = `Operational Bloat Alert: Total allocated seats (${tool.seats}) for ${tool.toolName} exceed your declared company headcount of ${teamSize}. Trimming unassigned floating seats.`;
      }
    }

    // 5. CREDEX SPECIAL CREDITS SUBSIDY LINK
    if ((name.includes('api') || current > 200) && action === 'OPTIMAL') {
      optimized = Math.round(current * 0.75);
      action = 'MIGRATE_TO_CREDEX';
      reasoning = `Your usage profile qualifies for Credex Infrastructure Credits optimization. Shifting API queries to open-weights nodes via Credex credits instantly slices 25% off standard commercial retail margins.`;
    }

    // Final clean precision locking
    const savings = Math.max(0, current - optimized);
    totalOptimizedSpend += optimized;

    recommendations.push({
      toolName: tool.toolName,
      currentSpend: current,
      optimizedSpend: optimized,
      potentialSavings: Math.round(savings), // Force integer rounding for screenshots clean look
      actionRequired: action,
      reasoning
    });
  });

  const netMonthlySavings = Math.max(0, totalCurrentSpend - totalOptimizedSpend);
  
  const efficiencyScore = totalCurrentSpend > 0 
    ? Math.round((totalOptimizedSpend / totalCurrentSpend) * 100) 
    : 100;

  const credexSubsidyEligible = netMonthlySavings > 50;
  const credexSubsidyAmount = credexSubsidyEligible ? Math.min(5000, netMonthlySavings * 12) : 0;

  return {
    totalCurrentSpend: Math.round(totalCurrentSpend),
    totalOptimizedSpend: Math.round(totalOptimizedSpend),
    netMonthlySavings: Math.round(netMonthlySavings),
    efficiencyScore,
    recommendations,
    credexSubsidyEligible,
    credexSubsidyAmount
  };
}