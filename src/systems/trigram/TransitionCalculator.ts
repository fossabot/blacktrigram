import type {
  TrigramStance,
  TransitionMetrics,
  TransitionPath,
  KiFlowFactors,
} from "../../types";
import { TRIGRAM_DATA, TRIGRAM_STANCES_ORDER } from "../../types";

/**
 * Korean Martial Arts Transition Calculator
 * Calculates optimal paths between trigram stances based on traditional Korean philosophy
 */

export class TransitionCalculator {
  // Remove unused constant or use it
  // private static readonly MAX_TRANSITION_STEPS = 3;

  private static readonly KI_COST_BASE = 10;
  private static readonly STAMINA_COST_BASE = 8;
  private static readonly TIME_DELAY_BASE = 200; // milliseconds

  /**
   * Calculate metrics for a single transition between stances
   */
  static calculateTransition(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): TransitionMetrics {
    if (fromStance === toStance) {
      return {
        staminaCost: 0,
        kiCost: 0,
        timeDelay: 0,
        effectiveness: 1.0,
        cost: 0,
        time: 0,
        cooldown: 0,
      };
    }

    const fromData = TRIGRAM_DATA[fromStance];
    const toData = TRIGRAM_DATA[toStance];

    // Calculate order difference in the traditional sequence
    const orderDiff = Math.abs((fromData.order || 0) - (toData.order || 0));

    // Base costs increase with distance in traditional order
    const kiCost = this.KI_COST_BASE + orderDiff * 5;
    const staminaCost = this.STAMINA_COST_BASE + orderDiff * 3;
    const timeDelay = this.TIME_DELAY_BASE + orderDiff * 50;

    // Effectiveness decreases with larger transitions
    const effectiveness = Math.max(0.3, 1.0 - orderDiff * 0.1);

    // Consider elemental relationships for efficiency
    const elementalBonus = this.calculateElementalBonus(fromStance, toStance);
    const adjustedEffectiveness = Math.min(1.0, effectiveness * elementalBonus);

    return {
      staminaCost,
      kiCost,
      timeDelay,
      effectiveness: adjustedEffectiveness,
      cost: kiCost + staminaCost,
      time: timeDelay,
      cooldown: timeDelay * 1.5,
    };
  }

  /**
   * Find the optimal transition path between two stances
   */
  static findOptimalPath(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    _maxSteps: number = 3 // Prefix with underscore to indicate intentionally unused
  ): TransitionPath {
    // For now, direct transition is optimal (can be enhanced later for multi-step paths)
    const directTransition = this.calculateTransition(fromStance, toStance);

    return {
      path: [fromStance, toStance],
      totalCost: directTransition.cost || 0,
      totalKiCost: directTransition.kiCost,
      totalStaminaCost: directTransition.staminaCost,
      efficiency: directTransition.effectiveness,
      success: true,
      description: `Direct transition from ${TRIGRAM_DATA[fromStance].koreanName} to ${TRIGRAM_DATA[toStance].koreanName}`,
      from: fromStance,
      to: toStance,
    };
  }

  /**
   * Calculate Ki flow efficiency between stances
   */
  static calculateKiFlow(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    factors: KiFlowFactors = {}
  ): number {
    const baseTransition = this.calculateTransition(fromStance, toStance);
    let flowEfficiency = baseTransition.effectiveness;

    // Apply player level modifier
    if (factors.playerLevelModifier) {
      flowEfficiency *= factors.playerLevelModifier;
    }

    // Apply stance affinity
    if (factors.stanceAffinity) {
      flowEfficiency *= factors.stanceAffinity;
    }

    // Factor in ki recovery and consumption
    const kiBalance = (factors.kiRecovery || 0) - (factors.kiConsumption || 0);
    flowEfficiency += kiBalance * 0.01; // Small adjustment based on ki balance

    return Math.max(0.1, Math.min(2.0, flowEfficiency));
  }

  /**
   * Get transition difficulty rating
   */
  static getTransitionDifficulty(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): "easy" | "medium" | "hard" | "expert" {
    const metrics = this.calculateTransition(fromStance, toStance);
    const totalCost = metrics.cost || 0;

    if (totalCost <= 15) return "easy";
    if (totalCost <= 25) return "medium";
    if (totalCost <= 35) return "hard";
    return "expert";
  }

  /**
   * Calculate elemental bonus based on traditional Korean five-element theory
   */
  private static calculateElementalBonus(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): number {
    const fromElement = TRIGRAM_DATA[fromStance].element;
    const toElement = TRIGRAM_DATA[toStance].element;

    // Same element transitions are more efficient
    if (fromElement === toElement) {
      return 1.2;
    }

    // Complementary element bonuses (simplified)
    const elementPairs: Record<string, string[]> = {
      Heaven: ["Earth", "Thunder"],
      Earth: ["Heaven", "Mountain"],
      Fire: ["Water", "Lake"],
      Water: ["Fire", "Wind"],
      Thunder: ["Heaven", "Wind"],
      Wind: ["Thunder", "Lake"],
      Mountain: ["Earth", "Lake"],
      Lake: ["Mountain", "Fire", "Wind"],
    };

    const compatibleElements = elementPairs[fromElement] || [];
    if (compatibleElements.includes(toElement)) {
      return 1.1;
    }

    return 1.0; // Neutral transition
  }

  /**
   * Get all possible transitions from a stance with their metrics
   */
  static getAllTransitionsFrom(
    fromStance: TrigramStance
  ): Array<{ toStance: TrigramStance; metrics: TransitionMetrics }> {
    return TRIGRAM_STANCES_ORDER.filter((stance) => stance !== fromStance)
      .map((toStance) => ({
        toStance,
        metrics: this.calculateTransition(fromStance, toStance),
      }))
      .sort((a, b) => (a.metrics.cost || 0) - (b.metrics.cost || 0));
  }

  // Remove unused helper function or implement it properly
  // If this is meant to be a private helper for future multi-step pathfinding:
  // private static findBestIntermediatePath(
  //   fromStance: TrigramStance,
  //   toStance: TrigramStance,
  //   _maxSteps: number
  // ): TransitionPath {
  //   // Implementation for multi-step pathfinding
  //   // For now, just return direct path
  //   return this.findOptimalPath(fromStance, toStance, _maxSteps);
  // }
}
