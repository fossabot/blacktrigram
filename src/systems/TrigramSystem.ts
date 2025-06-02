import type {
  // PlayerState, // Unused
  TrigramStance,
  TrigramData,
  // TrigramTransitionCost, // Unused directly here, but TransitionMetrics uses it
  TransitionPath,
  KoreanTechnique as CombatKoreanTechnique, // Use combat.ts definition
  KiFlowFactors,
  // StanceTransition, // Unused
  KoreanText,
  TransitionMetrics,
  TrigramTransitionCost, // Import for TransitionMetrics and TransitionPath
} from "../types";
import {
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
  TRIGRAM_STANCES_ORDER,
} from "../types";

export class TrigramSystem {
  private static BASE_KI_FLOW_RATES: Record<TrigramStance, number> = {
    geon: 1.2, // Heaven - high spiritual energy
    tae: 1.0, // Lake - balanced energy flow
    li: 1.1, // Fire - intense but consuming
    jin: 0.9, // Thunder - explosive but draining
    son: 1.1, // Wind - gentle and sustained
    gam: 1.3, // Water - deep and flowing
    gan: 0.8, // Mountain - stable but slow
    gon: 0.9, // Earth - grounded and steady
  };

  static calculateKiFlow(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    factors: KiFlowFactors
  ): number {
    const baseFlow = this.BASE_KI_FLOW_RATES[fromStance] || 1.0;
    let flow = baseFlow;

    // Same element bonus
    const fromElement = TRIGRAM_DATA[fromStance].element;
    const toElement = TRIGRAM_DATA[toStance].element;

    if (fromElement === toElement && flow !== undefined) {
      flow *= 1.2; // Bonus for same element transition
    }

    const playerLevelModifier = factors.playerLevelModifier || 1.0;
    const stanceAffinity = factors.stanceAffinity || 1.0;

    if (flow !== undefined) {
      flow *= playerLevelModifier * stanceAffinity;
    }

    // kiRecovery and kiConsumption are not direct properties of KiFlowFactors.
    // They might be derived from player stats or activeEffects.
    // For now, assuming they are passed if needed or handled elsewhere.
    // Example: if (factors.activeEffects) { flow += calculateKiRecoveryFromEffects(factors.activeEffects) }
    // flow += (factors.kiRecoveryBase || 0) - (factors.kiConsumptionModifier || 0);

    return flow || 0;
  }

  static TRIGRAM_DATA = TRIGRAM_DATA;
  static STANCE_EFFECTIVENESS_MATRIX = STANCE_EFFECTIVENESS_MATRIX;
  static TRIGRAM_STANCES_ORDER = TRIGRAM_STANCES_ORDER;

  static getTrigramData(stance: TrigramStance): TrigramData {
    return TRIGRAM_DATA[stance];
  }

  static getTechniqueForStance(
    stance: TrigramStance
  ): CombatKoreanTechnique | null {
    // Assuming TRIGRAM_DATA[stance].technique aligns with CombatKoreanTechnique
    // This might require ensuring TrigramData's technique property is of type CombatKoreanTechnique
    const technique = TRIGRAM_DATA[stance]?.technique as
      | CombatKoreanTechnique
      | undefined;
    return technique || null;
  }

  static calculateStanceAdvantage(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    return (
      TrigramSystem.STANCE_EFFECTIVENESS_MATRIX[attackerStance]?.[
        defenderStance
      ] || 1.0
    );
  }

  static getKiRegenRate(stance: TrigramStance, baseRate: number = 0.5): number {
    // Example: Geon has higher Ki regen
    const stanceModifier = stance === "geon" ? 1.5 : 1.0;
    return baseRate * stanceModifier;
  }

  static calculateTransitionCost(
    fromStance: TrigramStance,
    toStance: TrigramStance
    // playerState: PlayerState // If needed for more complex cost calculation
  ): TransitionMetrics {
    if (fromStance === toStance) {
      const zeroCost: TrigramTransitionCost = {
        ki: 0,
        stamina: 0,
        timeMilliseconds: 0,
      };
      return {
        cost: zeroCost,
        effectiveness: 1,
        risk: 0, // Added risk
        // time: 0, // time is part of TrigramTransitionCost
        // cooldown: 0, // cooldown might be separate
      };
    }

    const fromData = TRIGRAM_DATA[fromStance];
    const toData = TRIGRAM_DATA[toStance];
    const orderDiff = Math.abs((fromData.order ?? 0) - (toData.order ?? 0));

    const kiCost = Math.max(5, orderDiff * 3);
    const staminaCost = Math.max(3, orderDiff * 2);
    const timeMilliseconds = orderDiff * 100; // in ms
    const effectiveness = Math.max(0.5, 1 - orderDiff * 0.1);

    const transitionCostValue: TrigramTransitionCost = {
      ki: kiCost,
      stamina: staminaCost,
      timeMilliseconds,
    };

    return {
      cost: transitionCostValue,
      effectiveness,
      risk: (kiCost + staminaCost) / 20, // Example risk
      // time: timeMilliseconds,
      // cooldown: timeMilliseconds * 2,
    };
  }

  static findOptimalTransitionPath(
    fromStance: TrigramStance,
    toStance: TrigramStance
    // playerState: PlayerState // If needed for pathfinding logic
  ): TransitionPath {
    const directTransitionMetrics = this.calculateTransitionCost(
      fromStance,
      toStance
    );

    if (fromStance === toStance) {
      return {
        path: [fromStance],
        totalCost: { ki: 0, stamina: 0, timeMilliseconds: 0 },
        overallEffectiveness: 1.0,
        cumulativeRisk: 0,
        name: "Current Stance",
        description: {
          korean: "전환 불필요",
          english: "No transition needed",
        } as KoreanText,
      };
    }

    // Simplified: return direct path for now
    // More complex pathfinding (A*, Dijkstra) would go here if intermediate steps are allowed
    const directPath: TransitionPath = {
      path: [fromStance, toStance],
      totalCost: directTransitionMetrics.cost,
      overallEffectiveness: directTransitionMetrics.effectiveness,
      cumulativeRisk: directTransitionMetrics.risk,
      name: `Direct: ${TRIGRAM_DATA[fromStance].name.korean} -> ${TRIGRAM_DATA[toStance].name.korean}`,
      description: {
        korean: `${TRIGRAM_DATA[fromStance].name.korean} 에서 ${TRIGRAM_DATA[toStance].name.korean}(으)로 직접 전환`,
        english: `Direct transition from ${TRIGRAM_DATA[fromStance].name.english} to ${TRIGRAM_DATA[toStance].name.english}`,
      } as KoreanText,
    };

    return directPath;
  }

  public static calculateTechniqueEffectiveness(
    technique: CombatKoreanTechnique,
    distance: number
    // targetVitalPoint?: string // This parameter was unused
  ): number {
    let effectiveness = technique.accuracy || 0.7; // Base effectiveness from accuracy

    // Range penalty/bonus
    if (technique.range !== undefined) {
      // Check if range is defined
      const optimalRange = technique.range * 0.75;
      if (distance < optimalRange * 0.5 || distance > technique.range * 1.5) {
        effectiveness *= 0.6; // Significantly out of optimal range
      } else if (distance > technique.range) {
        // Gradual falloff beyond optimal range up to max range
        effectiveness *= Math.max(
          0.2,
          1 - (distance - optimalRange) / (technique.range * 2)
        );
      } else if (distance < optimalRange) {
        // Slight penalty if too close for some techniques
        effectiveness *= 0.9;
      }
    } else {
      // Default for techniques with no defined range (e.g. grappling, self-buffs)
      // No range penalty, or a small penalty if distance is large.
      if (distance > 2) effectiveness *= 0.8; // Arbitrary distance unit
    }

    // Vital point bonus
    return effectiveness;
  }

  /**
   * Get effectiveness multiplier between two trigram stances
   * @param attackerStance The attacker's current stance
   * @param defenderStance The defender's current stance
   * @returns Effectiveness multiplier (1.0 = neutral, >1.0 = advantage, <1.0 = disadvantage)
   */
  getStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    // Use the stance effectiveness matrix from constants
    // For now, implement a basic circular effectiveness system
    const stanceOrder = [
      "geon",
      "tae",
      "li",
      "jin",
      "son",
      "gam",
      "gan",
      "gon",
    ];
    const attackerIndex = stanceOrder.indexOf(attackerStance);
    const defenderIndex = stanceOrder.indexOf(defenderStance);

    if (attackerIndex === -1 || defenderIndex === -1) {
      return 1.0; // Neutral if stance not found
    }

    // Calculate relative position in the trigram cycle
    const difference = (attackerIndex - defenderIndex + 8) % 8;

    // Determine effectiveness based on trigram relationships
    switch (difference) {
      case 0:
        return 1.0; // Same stance - neutral
      case 1:
      case 7:
        return 1.1; // Adjacent stances - slight advantage
      case 2:
      case 6:
        return 1.2; // Strong advantage
      case 3:
      case 5:
        return 0.9; // Slight disadvantage
      case 4:
        return 0.8; // Opposite stance - strong disadvantage
      default:
        return 1.0;
    }
  }
}
