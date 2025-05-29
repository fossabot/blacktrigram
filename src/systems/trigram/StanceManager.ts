import type { PlayerState, TrigramStance } from "../../types/GameTypes";
import { TrigramCalculator, type TransitionMetrics } from "./TrigramCalculator";

// Export stance order for testing
export const STANCE_ORDER: TrigramStance[] = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
];

export interface StanceTransitionResult {
  readonly updatedPlayer: PlayerState;
  readonly transitionData: {
    readonly cost: TransitionMetrics;
    readonly success: boolean;
    readonly reason?: string | undefined; // Allow undefined for success cases
  };
}

export interface StanceValidationResult {
  readonly success: boolean;
  readonly reason?: string;
}

export class StanceManager {
  /**
   * Execute stance transition with cost calculation
   */
  public executeStanceTransition(
    player: PlayerState,
    targetStance: TrigramStance
  ): StanceTransitionResult {
    // Check if player is stunned
    if (player.isStunned) {
      return {
        updatedPlayer: player,
        transitionData: {
          cost: {
            staminaCost: 0,
            kiCost: 0,
            timeDelay: 0,
            effectiveness: 0,
          },
          success: false,
          reason: "Cannot transition while stunned",
        },
      };
    }

    // Validate transition
    const validation = StanceManager.validateTransition(
      player.stance,
      targetStance
    );
    if (!validation.success) {
      return {
        updatedPlayer: player,
        transitionData: {
          cost: {
            staminaCost: 0,
            kiCost: 0,
            timeDelay: 0,
            effectiveness: 0,
          },
          success: false,
          reason: validation.reason,
        },
      };
    }

    // Calculate transition cost
    const transitionCost = TrigramCalculator.calculateTransitionCost(
      player.stance,
      targetStance
    );

    // Check if player has enough resources
    if (player.stamina < transitionCost.staminaCost) {
      return {
        updatedPlayer: player,
        transitionData: {
          cost: transitionCost,
          success: false,
          reason: "Insufficient stamina for stance transition",
        },
      };
    }

    if (player.ki < transitionCost.kiCost) {
      return {
        updatedPlayer: player,
        transitionData: {
          cost: transitionCost,
          success: false,
          reason: "Insufficient ki for stance transition",
        },
      };
    }

    // Execute transition
    const updatedPlayer: PlayerState = {
      ...player,
      stance: targetStance,
      stamina: Math.max(0, player.stamina - transitionCost.staminaCost),
      ki: Math.max(0, player.ki - transitionCost.kiCost),
      lastAttackTime: Date.now(),
    };

    return {
      updatedPlayer,
      transitionData: {
        cost: transitionCost,
        success: true,
      },
    };
  }

  /**
   * Validate if transition is possible
   */
  public static validateTransition(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): StanceValidationResult {
    if (fromStance === toStance) {
      return {
        success: false,
        reason: "Already in target stance",
      };
    }

    // Add any stance-specific restrictions here
    // For now, all transitions are valid if different
    return { success: true };
  }

  /**
   * Get available stance transitions from current stance
   */
  public getAvailableTransitions(
    currentStance: TrigramStance,
    player: PlayerState
  ): TrigramStance[] {
    const allStances: TrigramStance[] = [
      "geon",
      "tae",
      "li",
      "jin",
      "son",
      "gam",
      "gan",
      "gon",
    ];

    return allStances.filter((stance) => {
      if (stance === currentStance) return false;

      const cost = TrigramCalculator.calculateTransitionCost(
        currentStance,
        stance
      );
      return player.stamina >= cost.staminaCost && player.ki >= cost.kiCost;
    });
  }

  /**
   * Calculate time until transition is complete
   */
  public calculateTransitionTime(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): number {
    const cost = TrigramCalculator.calculateTransitionCost(
      fromStance,
      toStance
    );
    return cost.timeDelay;
  }

  /**
   * Get stance effectiveness modifier
   */
  public getStanceEffectiveness(
    playerStance: TrigramStance,
    opponentStance: TrigramStance
  ): number {
    return TrigramCalculator.calculateDamageMultiplier(
      playerStance,
      opponentStance
    );
  }

  /**
   * Check if a transition is possible
   */
  public canTransition(
    player: PlayerState,
    targetStance: TrigramStance
  ): boolean {
    if (player.isStunned) return false;
    if (player.stance === targetStance) return false;

    const cost = TrigramCalculator.calculateTransitionCost(
      player.stance,
      targetStance
    );
    return player.stamina >= cost.staminaCost && player.ki >= cost.kiCost;
  }

  /**
   * Execute transition (alias for executeStanceTransition)
   */
  public executeTransition(
    player: PlayerState,
    targetStance: TrigramStance
  ): StanceTransitionResult {
    return this.executeStanceTransition(player, targetStance);
  }

  /**
   * Get stance analysis for strategic decision making
   */
  public getStanceAnalysis(
    playerStance: TrigramStance,
    opponentStance: TrigramStance
  ): {
    advantage: number;
    effectiveness: number;
    recommendation: string;
  } {
    const advantage = StanceManager.calculateStanceAdvantage(
      playerStance,
      opponentStance
    );
    const effectiveness = TrigramCalculator.calculateDamageMultiplier(
      playerStance,
      opponentStance
    );

    let recommendation = "Maintain current stance";
    if (advantage < -0.3) {
      recommendation = "Consider defensive transition";
    } else if (advantage > 0.3) {
      recommendation = "Aggressive stance - exploit advantage";
    }

    return {
      advantage,
      effectiveness,
      recommendation,
    };
  }

  /**
   * Get optimal stance recommendation
   */
  public getOptimalStance(
    currentStance: TrigramStance,
    opponentStance: TrigramStance,
    player: PlayerState
  ): {
    recommendedStance: TrigramStance;
    reason: string;
    confidence: number;
  } {
    const availableStances = this.getAvailableTransitions(
      currentStance,
      player
    );

    if (availableStances.length === 0) {
      return {
        recommendedStance: currentStance,
        reason: "No available transitions",
        confidence: 0,
      };
    }

    // Find stance with highest advantage
    let bestStance = currentStance;
    let bestAdvantage = StanceManager.calculateStanceAdvantage(
      currentStance,
      opponentStance
    );

    for (const stance of availableStances) {
      const advantage = StanceManager.calculateStanceAdvantage(
        stance,
        opponentStance
      );
      if (advantage > bestAdvantage) {
        bestAdvantage = advantage;
        bestStance = stance;
      }
    }

    return {
      recommendedStance: bestStance,
      reason:
        bestStance === currentStance
          ? "Current stance is optimal"
          : "Better advantage available",
      confidence: Math.abs(bestAdvantage),
    };
  }

  /**
   * Get transition history (simplified implementation)
   */
  private transitionHistory: Array<{
    from: TrigramStance;
    to: TrigramStance;
    timestamp: number;
  }> = [];

  public getTransitionHistory(): Array<{
    from: TrigramStance;
    to: TrigramStance;
    timestamp: number;
  }> {
    return [...this.transitionHistory];
  }

  public clearHistory(): void {
    this.transitionHistory = [];
  }

  // Static calculation methods
  public static calculateStanceAdvantage(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    const compatibility = TrigramCalculator["calculateCompatibility"](
      attackerStance,
      defenderStance
    );
    return (compatibility - 0.5) * 2; // Normalize to -1 to 1 range
  }

  public static calculateStanceDistance(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): number {
    const fromIndex = STANCE_ORDER.indexOf(fromStance);
    const toIndex = STANCE_ORDER.indexOf(toStance);

    if (fromIndex === -1 || toIndex === -1) return Infinity;

    const directDistance = Math.abs(toIndex - fromIndex);
    const wraparoundDistance = STANCE_ORDER.length - directDistance;

    return Math.min(directDistance, wraparoundDistance);
  }

  public static getCounterStance(stance: TrigramStance): TrigramStance {
    // Based on I Ching opposition principles
    const counterMap: Record<TrigramStance, TrigramStance> = {
      geon: "gam", // Heaven vs Water
      tae: "son", // Lake vs Wind
      li: "gam", // Fire vs Water
      jin: "gan", // Thunder vs Mountain
      son: "tae", // Wind vs Lake
      gam: "li", // Water vs Fire
      gan: "jin", // Mountain vs Thunder
      gon: "geon", // Earth vs Heaven
    };

    return counterMap[stance];
  }

  public static getAdjacentStances(stance: TrigramStance): {
    previous: TrigramStance;
    next: TrigramStance;
  } {
    const index = STANCE_ORDER.indexOf(stance);
    if (index === -1) {
      throw new Error(`Invalid stance: ${stance}`);
    }

    const previousIndex =
      (index - 1 + STANCE_ORDER.length) % STANCE_ORDER.length;
    const nextIndex = (index + 1) % STANCE_ORDER.length;

    const previous = STANCE_ORDER[previousIndex];
    const next = STANCE_ORDER[nextIndex];

    if (!previous || !next) {
      throw new Error(`Failed to get adjacent stances for ${stance}`);
    }

    return {
      previous,
      next,
    };
  }

  public static isOptimalTransition(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): boolean {
    const distance = this.calculateStanceDistance(fromStance, toStance);
    return distance <= 1 || distance >= 3; // Adjacent or opposite stances
  }

  public static getStancesByTransitionEfficiency(
    fromStance: TrigramStance
  ): TrigramStance[] {
    return STANCE_ORDER.filter((stance) => stance !== fromStance).sort(
      (a, b) => {
        const distanceA = this.calculateStanceDistance(fromStance, a);
        const distanceB = this.calculateStanceDistance(fromStance, b);
        return distanceA - distanceB;
      }
    );
  }
}
