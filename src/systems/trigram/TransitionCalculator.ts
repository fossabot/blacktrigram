import type { TrigramStance } from "../../types/GameTypes";
import { StanceManager, STANCE_ORDER } from "./StanceManager";

/**
 * TransitionCalculator - Handles advanced trigram stance transitions
 * Manages optimal transition paths and calculates transition costs for Korean martial arts
 */

export interface TransitionMetrics {
  readonly distance: number;
  readonly energyCost: number;
  readonly timeRequired: number;
  readonly difficulty: "easy" | "medium" | "hard" | "expert";
  readonly isRecommended: boolean;
}

export interface TransitionPath {
  readonly startStance: TrigramStance;
  readonly endStance: TrigramStance;
  readonly intermediateStances: readonly TrigramStance[];
  readonly totalCost: number;
  readonly totalTime: number;
  readonly metrics: TransitionMetrics;
}

// Energy cost modifiers for different stance distances
const DISTANCE_ENERGY_COSTS: Record<number, number> = {
  0: 0, // Same stance
  1: 5, // Adjacent stance
  2: 15, // Two steps
  3: 25, // Three steps
  4: 40, // Opposite stance (maximum distance)
} as const;

// Time modifiers in milliseconds for transition animations
const DISTANCE_TIME_COSTS: Record<number, number> = {
  0: 0,
  1: 300,
  2: 600,
  3: 900,
  4: 1200,
} as const;

// Korean martial arts philosophy-based transition difficulties
const STANCE_TRANSITION_DIFFICULTY: Record<
  TrigramStance,
  Record<TrigramStance, "easy" | "medium" | "hard" | "expert">
> = {
  geon: {
    geon: "easy",
    tae: "easy",
    li: "medium",
    jin: "medium",
    son: "hard",
    gam: "expert",
    gan: "medium",
    gon: "easy",
  },
  tae: {
    geon: "easy",
    tae: "easy",
    li: "easy",
    jin: "medium",
    son: "medium",
    gam: "medium",
    gan: "expert",
    gon: "medium",
  },
  li: {
    geon: "medium",
    tae: "easy",
    li: "easy",
    jin: "easy",
    son: "medium",
    gam: "expert",
    gan: "hard",
    gon: "medium",
  },
  jin: {
    geon: "medium",
    tae: "medium",
    li: "easy",
    jin: "easy",
    son: "easy",
    gam: "medium",
    gan: "expert",
    gon: "hard",
  },
  son: {
    geon: "hard",
    tae: "medium",
    li: "medium",
    jin: "easy",
    son: "easy",
    gam: "easy",
    gan: "medium",
    gon: "medium",
  },
  gam: {
    geon: "expert",
    tae: "medium",
    li: "expert",
    jin: "medium",
    son: "easy",
    gam: "easy",
    gan: "easy",
    gon: "medium",
  },
  gan: {
    geon: "medium",
    tae: "expert",
    li: "hard",
    jin: "expert",
    son: "medium",
    gam: "easy",
    gan: "easy",
    gon: "easy",
  },
  gon: {
    geon: "easy",
    tae: "medium",
    li: "medium",
    jin: "hard",
    son: "medium",
    gam: "medium",
    gan: "easy",
    gon: "easy",
  },
};

export class TransitionCalculator {
  /**
   * Calculate comprehensive metrics for a stance transition
   */
  public static calculateTransitionMetrics(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): TransitionMetrics {
    const distance = StanceManager.calculateStanceDistance(
      fromStance,
      toStance
    );
    const energyCost = DISTANCE_ENERGY_COSTS[distance] || 50;
    const timeRequired = DISTANCE_TIME_COSTS[distance] || 1500;
    const difficulty = STANCE_TRANSITION_DIFFICULTY[fromStance][toStance];
    const isRecommended = StanceManager.isOptimalTransition(
      fromStance,
      toStance
    );

    return {
      distance,
      energyCost,
      timeRequired,
      difficulty,
      isRecommended,
    };
  }

  /**
   * Get optimal transition path between distant stances
   */
  public static getOptimalTransitionPath(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): TransitionPath {
    if (fromStance === toStance) {
      const metrics = this.calculateTransitionMetrics(fromStance, toStance);
      return {
        startStance: fromStance,
        endStance: toStance,
        intermediateStances: [],
        totalCost: 0,
        totalTime: 0,
        metrics,
      };
    }

    const path: TrigramStance[] = [fromStance];
    const fromIndex = STANCE_ORDER.indexOf(fromStance);
    const toIndex = STANCE_ORDER.indexOf(toStance);

    if (fromIndex === -1 || toIndex === -1) {
      // Fallback for invalid stances
      const metrics = this.calculateTransitionMetrics(fromStance, toStance);
      return {
        startStance: fromStance,
        endStance: toStance,
        intermediateStances: [toStance],
        totalCost: 100,
        totalTime: 2000,
        metrics,
      };
    }

    // Determine shortest path direction
    const directDistance = toIndex - fromIndex;
    const wrapDistance =
      directDistance > 0
        ? directDistance - STANCE_ORDER.length
        : directDistance + STANCE_ORDER.length;

    const useDirectPath = Math.abs(directDistance) <= Math.abs(wrapDistance);
    const step = useDirectPath
      ? directDistance > 0
        ? 1
        : -1
      : wrapDistance > 0
      ? 1
      : -1;

    let currentIndex = fromIndex;
    while (currentIndex !== toIndex) {
      currentIndex =
        (currentIndex + step + STANCE_ORDER.length) % STANCE_ORDER.length;
      const nextStance = STANCE_ORDER[currentIndex];

      // Type safety: ensure we got a valid stance
      if (!nextStance) {
        console.error(`Invalid stance index calculation: ${currentIndex}`);
        break;
      }

      path.push(nextStance);
    }

    // Calculate total costs
    let totalCost = 0;
    let totalTime = 0;

    for (let i = 0; i < path.length - 1; i++) {
      const currentStance = path[i];
      const nextStance = path[i + 1];

      // Type safety checks
      if (!currentStance || !nextStance) {
        console.warn(`Invalid stance in path at index ${i}`);
        continue;
      }

      const segmentMetrics = this.calculateTransitionMetrics(
        currentStance,
        nextStance
      );
      totalCost += segmentMetrics.energyCost;
      totalTime += segmentMetrics.timeRequired;
    }

    const overallMetrics = this.calculateTransitionMetrics(
      fromStance,
      toStance
    );

    return {
      startStance: fromStance,
      endStance: toStance,
      intermediateStances: path.slice(1, -1), // Exclude start and end
      totalCost,
      totalTime,
      metrics: overallMetrics,
    };
  }

  /**
   * Get all possible transitions from a stance ranked by efficiency
   */
  public static getRankedTransitions(
    fromStance: TrigramStance
  ): readonly (TransitionPath & { targetStance: TrigramStance })[] {
    const transitions = STANCE_ORDER.filter((stance) => stance !== fromStance)
      .map((targetStance) => ({
        ...this.getOptimalTransitionPath(fromStance, targetStance),
        targetStance,
      }))
      .sort((a, b) => {
        // Sort by cost first, then by time
        if (a.totalCost !== b.totalCost) {
          return a.totalCost - b.totalCost;
        }
        return a.totalTime - b.totalTime;
      });

    return transitions;
  }

  /**
   * Calculate energy efficiency rating for a transition (0-100)
   */
  public static calculateEfficiencyRating(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): number {
    const metrics = this.calculateTransitionMetrics(fromStance, toStance);
    const maxPossibleCost = DISTANCE_ENERGY_COSTS[4] || 50;

    // Invert cost to get efficiency (lower cost = higher efficiency)
    const costEfficiency =
      ((maxPossibleCost - metrics.energyCost) / maxPossibleCost) * 100;

    // Apply bonuses for recommended transitions
    const recommendationBonus = metrics.isRecommended ? 20 : 0;

    // Apply difficulty penalties
    const difficultyPenalty = {
      easy: 0,
      medium: -5,
      hard: -15,
      expert: -25,
    }[metrics.difficulty];

    return Math.max(
      0,
      Math.min(100, costEfficiency + recommendationBonus + difficultyPenalty)
    );
  }

  /**
   * Get the most efficient counter-transition for opponent's stance
   */
  public static getBestCounterTransition(
    currentStance: TrigramStance,
    opponentStance: TrigramStance
  ): TransitionPath {
    const counterStance = StanceManager.getCounterStance(opponentStance);
    return this.getOptimalTransitionPath(currentStance, counterStance);
  }

  /**
   * Calculate stamina cost modifier based on current stamina level
   */
  public static calculateStaminaCostModifier(
    currentStamina: number,
    maxStamina: number
  ): number {
    if (maxStamina <= 0) return 2.0; // High penalty for invalid max stamina

    const staminaRatio = currentStamina / maxStamina;

    if (staminaRatio >= 0.8) return 1.0; // Full efficiency
    if (staminaRatio >= 0.6) return 1.2; // Slight penalty
    if (staminaRatio >= 0.4) return 1.5; // Moderate penalty
    if (staminaRatio >= 0.2) return 2.0; // High penalty
    return 3.0; // Exhausted penalty
  }

  /**
   * Predict optimal stance sequence for a combo attack
   */
  public static calculateComboSequence(
    startingStance: TrigramStance,
    targetStances: readonly TrigramStance[],
    maxTotalCost: number = 100
  ): readonly TransitionPath[] {
    if (targetStances.length === 0) return [];

    const sequence: TransitionPath[] = [];
    let currentStance = startingStance;
    let totalCostSoFar = 0;

    for (const targetStance of targetStances) {
      const transition = this.getOptimalTransitionPath(
        currentStance,
        targetStance
      );

      if (totalCostSoFar + transition.totalCost > maxTotalCost) {
        break; // Combo too expensive
      }

      sequence.push(transition);
      currentStance = targetStance;
      totalCostSoFar += transition.totalCost;
    }

    return sequence;
  }

  /**
   * Check if a transition is physically possible given current constraints
   */
  public static isTransitionFeasible(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    currentStamina: number,
    maxStamina: number
  ): boolean {
    const metrics = this.calculateTransitionMetrics(fromStance, toStance);
    const staminaModifier = this.calculateStaminaCostModifier(
      currentStamina,
      maxStamina
    );
    const actualCost = metrics.energyCost * staminaModifier;

    return actualCost <= currentStamina;
  }

  /**
   * Get traditional Korean martial arts philosophy explanation for transition
   */
  public static getTransitionPhilosophy(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): string {
    const stanceNames: Record<TrigramStance, string> = {
      geon: "Heaven (건)",
      tae: "Lake (태)",
      li: "Fire (리)",
      jin: "Thunder (진)",
      son: "Wind (손)",
      gam: "Water (감)",
      gan: "Mountain (간)",
      gon: "Earth (곤)",
    };

    const distance = StanceManager.calculateStanceDistance(
      fromStance,
      toStance
    );
    const fromName = stanceNames[fromStance];
    const toName = stanceNames[toStance];

    if (distance === 0) {
      return `Maintaining ${fromName} stance - centering and deepening focus.`;
    }

    if (distance === 1) {
      return `Flowing from ${fromName} to ${toName} - natural harmonic progression in the trigram cycle.`;
    }

    if (distance === 4) {
      return `Dramatic shift from ${fromName} to ${toName} - embracing the complementary opposite force.`;
    }

    return `Transitioning from ${fromName} to ${toName} - seeking balance through ${distance}-step movement.`;
  }

  /**
   * Calculate transition success probability based on skill level
   */
  public static calculateSuccessProbability(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    skillLevel: number // 0-100
  ): number {
    const metrics = this.calculateTransitionMetrics(fromStance, toStance);

    // Base success rate based on difficulty
    const baseDifficulty = {
      easy: 0.95,
      medium: 0.8,
      hard: 0.6,
      expert: 0.4,
    }[metrics.difficulty];

    // Skill modifier
    const skillModifier = skillLevel / 100;

    // Distance penalty
    const distancePenalty = metrics.distance * 0.05;

    const successRate =
      baseDifficulty * (0.5 + 0.5 * skillModifier) - distancePenalty;

    return Math.max(0.1, Math.min(0.99, successRate));
  }

  // Fix the missing method for backward compatibility
  public static calculateTransitionCost(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): number {
    const metrics = this.calculateTransitionMetrics(fromStance, toStance);
    return metrics.energyCost; // Use energyCost instead of cost
  }
}
