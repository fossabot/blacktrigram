import type { PlayerState, TrigramStance } from "../../types";

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

export interface TransitionMetrics {
  readonly cost: number; // General cost metric
  readonly effectiveness: number;
  readonly timeRequired: number;
  readonly kiCost?: number; // Add as optional for backward compatibility
  readonly staminaCost?: number; // Add as optional for backward compatibility
}

export interface StanceTransitionResult {
  readonly updatedPlayer: PlayerState;
  readonly transitionData: {
    readonly cost: TransitionMetrics;
    readonly success: boolean;
    readonly reason?: string | undefined; // Fix: explicitly allow undefined
  };
}

export interface StanceValidationResult {
  readonly success: boolean;
  readonly reason?: string | undefined; // Fix: explicitly allow undefined
}

export class StanceManager {
  /**
   * Execute stance transition with cost calculation
   */
  public executeStanceTransition(
    player: PlayerState,
    targetStance: TrigramStance
  ): StanceTransitionResult {
    const validation = StanceManager.validateTransition(
      player.stance,
      targetStance
    );
    if (!validation.success) {
      return {
        updatedPlayer: player,
        transitionData: {
          cost: { cost: 0, effectiveness: 0, timeRequired: 0 },
          success: false,
          reason: validation.reason, // Now properly typed as string | undefined
        },
      };
    }

    const costMetrics = this.calculateTransitionCost(
      player.stance,
      targetStance
    );
    const updatedPlayer: PlayerState = {
      ...player,
      stance: targetStance,
      ki: Math.max(0, player.ki - costMetrics.cost),
      stamina: Math.max(
        0,
        player.stamina - (costMetrics.staminaCost || costMetrics.cost * 0.5)
      ),
      lastStanceChangeTime: Date.now(),
    };

    return {
      updatedPlayer,
      transitionData: {
        cost: costMetrics,
        success: true,
        reason: undefined, // Explicitly set to undefined for successful transitions
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
      return { success: false, reason: "Already in target stance" };
    }
    return { success: true, reason: undefined }; // Explicitly set reason to undefined
  }

  private calculateTransitionCost(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): TransitionMetrics {
    const fromIndex = STANCE_ORDER.indexOf(fromStance);
    const toIndex = STANCE_ORDER.indexOf(toStance);
    const distance = Math.abs(toIndex - fromIndex);

    const baseCost = distance * 5;
    const staminaCost = distance * 3;

    return {
      cost: baseCost,
      effectiveness: 1.0 - distance * 0.1,
      timeRequired: distance * 0.2,
      kiCost: baseCost, // Add for compatibility
      staminaCost: staminaCost, // Add for compatibility
    };
  }

  /**
   * Get available stance transitions from current stance
   */
  public getAvailableTransitions(
    currentStance: TrigramStance,
    player: PlayerState
  ): TrigramStance[] {
    return STANCE_ORDER.filter((stance) => {
      if (stance === currentStance) return false;
      const cost = this.calculateTransitionCost(currentStance, stance);
      return (
        player.ki >= cost.cost &&
        player.stamina >= (cost.staminaCost || cost.cost * 0.5)
      );
    });
  }

  /**
   * Check if a transition is possible
   */
  public canTransition(
    player: PlayerState,
    targetStance: TrigramStance
  ): boolean {
    const validation = StanceManager.validateTransition(
      player.stance,
      targetStance
    );
    if (!validation.success) return false;

    const cost = this.calculateTransitionCost(player.stance, targetStance);
    return (
      player.ki >= cost.cost &&
      player.stamina >= (cost.staminaCost || cost.cost * 0.5)
    );
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
    const effectiveness = advantage > 1.0 ? advantage : 1.0 / advantage;

    let recommendation: string;
    if (advantage > 1.1) {
      recommendation = `${playerStance} has advantage over ${opponentStance}`;
    } else if (advantage < 0.9) {
      recommendation = `Consider switching from ${playerStance} against ${opponentStance}`;
    } else {
      recommendation = `${playerStance} is neutral against ${opponentStance}`;
    }

    return { advantage, effectiveness, recommendation };
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
    let bestStance = currentStance;
    let bestAdvantage = StanceManager.calculateStanceAdvantage(
      currentStance,
      opponentStance
    );

    for (const stance of STANCE_ORDER) {
      if (this.canTransition(player, stance)) {
        const advantage = StanceManager.calculateStanceAdvantage(
          stance,
          opponentStance
        );
        if (advantage > bestAdvantage) {
          bestAdvantage = advantage;
          bestStance = stance;
        }
      }
    }

    const confidence = Math.min(1.0, (bestAdvantage - 1.0) * 2);
    const reason =
      bestStance === currentStance
        ? "Current stance is optimal"
        : `Switch to ${bestStance} for ${Math.round(
            (bestAdvantage - 1) * 100
          )}% advantage`;

    return {
      recommendedStance: bestStance,
      reason,
      confidence,
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

  // Add the missing calculateDamageMultiplier method
  public calculateDamageMultiplier(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance,
    technique?: string
  ): number {
    const baseAdvantage = StanceManager.calculateStanceAdvantage(
      attackerStance,
      defenderStance
    );

    // Additional modifiers based on technique type
    let techniqueModifier = 1.0;
    if (technique) {
      // Simple technique-based modifiers
      const techniqueModifiers: Record<string, number> = {
        천둥벽력: 1.1, // Thunder techniques are stronger
        화염지창: 1.15, // Fire techniques have high damage
        수류반격: 1.2, // Counter techniques are very effective
      };
      techniqueModifier = techniqueModifiers[technique] || 1.0;
    }

    return baseAdvantage * techniqueModifier;
  }

  // Static calculation methods
  public static calculateStanceAdvantage(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    // Simplified stance advantage calculation based on I Ching relationships
    const advantages: Record<TrigramStance, TrigramStance[]> = {
      geon: ["tae", "gam"], // Heaven overcomes Lake and Water
      tae: ["li", "gan"], // Lake overcomes Fire and Mountain
      li: ["jin", "gon"], // Fire overcomes Thunder and Earth
      jin: ["son", "geon"], // Thunder overcomes Wind and Heaven
      son: ["gam", "tae"], // Wind overcomes Water and Lake
      gam: ["gan", "li"], // Water overcomes Mountain and Fire
      gan: ["gon", "jin"], // Mountain overcomes Earth and Thunder
      gon: ["geon", "son"], // Earth overcomes Heaven and Wind
    };

    return advantages[attackerStance]?.includes(defenderStance) ? 1.2 : 1.0;
  }

  /**
   * Get the stance that counters the given stance most effectively
   */
  public static getCounterStance(stance: TrigramStance): TrigramStance {
    const counters: Record<TrigramStance, TrigramStance> = {
      geon: "gam", // Heaven countered by Water
      tae: "li", // Lake countered by Fire
      li: "gam", // Fire countered by Water
      jin: "gan", // Thunder countered by Mountain
      son: "geon", // Wind countered by Heaven
      gam: "li", // Water countered by Fire
      gan: "jin", // Mountain countered by Thunder
      gon: "son", // Earth countered by Wind
    };

    return counters[stance];
  }

  /**
   * Calculate the minimum distance between two stances in the trigram circle
   */
  public static calculateStanceDistance(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): number {
    const fromIndex = STANCE_ORDER.indexOf(fromStance);
    const toIndex = STANCE_ORDER.indexOf(toStance);

    if (fromIndex === -1 || toIndex === -1) {
      throw new Error(`Invalid stance provided: ${fromStance} or ${toStance}`);
    }

    const directDistance = Math.abs(toIndex - fromIndex);
    const wraparoundDistance = STANCE_ORDER.length - directDistance;

    return Math.min(directDistance, wraparoundDistance);
  }

  /**
   * Get adjacent stances (previous and next in the trigram order)
   */
  public static getAdjacentStances(stance: TrigramStance): {
    previous: TrigramStance;
    next: TrigramStance;
  } {
    const currentIndex = STANCE_ORDER.indexOf(stance);

    // Handle wrap-around for circular stance order
    const previousIndex =
      currentIndex === 0 ? STANCE_ORDER.length - 1 : currentIndex - 1;
    const nextIndex =
      currentIndex === STANCE_ORDER.length - 1 ? 0 : currentIndex + 1;

    // These are guaranteed to be valid since we're using controlled indices
    const previous = STANCE_ORDER[previousIndex];
    const next = STANCE_ORDER[nextIndex];

    // Add runtime safety check
    if (!previous || !next) {
      throw new Error(`Invalid stance configuration for ${stance}`);
    }

    return {
      previous,
      next,
    };
  }

  /**
   * Check if a transition is optimal (distance <= 2 or is a counter stance)
   */
  public static isOptimalTransition(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): boolean {
    if (fromStance === toStance) {
      return true; // Same stance is always optimal
    }

    const distance = this.calculateStanceDistance(fromStance, toStance);
    const isCounter = this.getCounterStance(fromStance) === toStance;

    return distance <= 2 || isCounter;
  }

  /**
   * Get stances ordered by transition efficiency from the given stance
   */
  public static getStancesByTransitionEfficiency(
    fromStance: TrigramStance
  ): TrigramStance[] {
    const otherStances = STANCE_ORDER.filter((stance) => stance !== fromStance);

    return otherStances.sort((a, b) => {
      const distanceA = this.calculateStanceDistance(fromStance, a);
      const distanceB = this.calculateStanceDistance(fromStance, b);

      // Counter stances get priority (lower sort value)
      const isCounterA = this.getCounterStance(fromStance) === a ? -10 : 0;
      const isCounterB = this.getCounterStance(fromStance) === b ? -10 : 0;

      return distanceA + isCounterA - (distanceB + isCounterB);
    });
  }
}
