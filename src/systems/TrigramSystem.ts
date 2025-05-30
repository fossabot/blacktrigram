import type {
  TrigramStance,
  KoreanTechnique,
  TrigramData,
  TransitionMetrics,
  TransitionPath,
  KiFlowFactors,
} from "../types";
import {
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
  TRIGRAM_STANCES_ORDER,
} from "../types";

export const TrigramSystem = {
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
  TRIGRAM_STANCES_ORDER,

  getTrigramData(stance: TrigramStance): TrigramData {
    return TRIGRAM_DATA[stance];
  },

  getTechniqueForStance(stance: TrigramStance): KoreanTechnique | null {
    const technique = TRIGRAM_DATA[stance]?.technique;
    return technique || null; // Ensure it returns null if undefined
  },

  calculateStanceAdvantage(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    return (
      TrigramSystem.STANCE_EFFECTIVENESS_MATRIX[attackerStance]?.[
        defenderStance
      ] || 1.0
    );
  },

  getKiRegenRate(stance: TrigramStance, baseRate: number = 0.5): number {
    // Example: Geon has higher Ki regen
    const stanceModifier = stance === "geon" ? 1.5 : 1.0;
    return baseRate * stanceModifier;
  },

  calculateKiFlow(
    // playerState: PlayerState, // Removed unused parameter
    fromStance: TrigramStance,
    toStance: TrigramStance,
    factors: KiFlowFactors
  ): number {
    const fromData = TRIGRAM_DATA[fromStance];
    const toData = TRIGRAM_DATA[toStance];
    let flow = factors.baseRate;
    if (fromData.element === toData.element) {
      flow *= 1.2; // Bonus for same element transition
    }
    flow *= factors.playerLevelModifier * factors.stanceAffinity;
    // Use kiRecovery and kiConsumption if they are part of factors
    flow += (factors.kiRecovery || 0) - (factors.kiConsumption || 0);
    return flow;
  },

  calculateTransitionCost(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerMaxKi: number // playerMaxKi might not be directly used if costs are fixed
  ): TransitionMetrics {
    if (fromStance === toStance) {
      return { kiCost: 0, staminaCost: 0, time: 0, effectiveness: 1 };
    }
    const fromData = TRIGRAM_DATA[fromStance];
    const toData = TRIGRAM_DATA[toStance];
    // Example cost calculation
    const orderDiff = Math.abs(fromData.order - toData.order);
    const kiCost = orderDiff * 5 + playerMaxKi * 0.02; // Base cost + percentage of max Ki
    const staminaCost = orderDiff * 3;
    const timeDelay = orderDiff * 0.1; // seconds
    return {
      kiCost: kiCost,
      staminaCost: staminaCost,
      time: timeDelay,
      effectiveness: 1 - orderDiff * 0.05, // Less effective for distant transitions
    };
  },

  findOptimalTransitionPath(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerMaxKi: number
  ): TransitionPath {
    // Placeholder for actual pathfinding logic
    if (fromStance === toStance) {
      return { path: [fromStance], totalKiCost: 0, totalStaminaCost: 0 };
    }
    // Simplified: direct path
    const directCost = TrigramSystem.calculateTransitionCost(
      fromStance,
      toStance,
      playerMaxKi
    );
    return {
      path: [fromStance, toStance],
      totalKiCost: directCost.kiCost,
      totalStaminaCost: directCost.staminaCost,
    };
  },

  calculateDamage(
    technique: KoreanTechnique,
    distance: number,
    stanceAdvantage: number
  ): number {
    let damage = technique.damage * stanceAdvantage;
    // Apply range modifier (example: damage decreases with distance beyond optimal range)
    const optimalRange = technique.range * 0.75;
    if (distance > optimalRange) {
      damage *= Math.max(
        0.3,
        1 - (distance - optimalRange) / (technique.range * 2)
      );
    }
    return Math.max(0, damage);
  },
};
