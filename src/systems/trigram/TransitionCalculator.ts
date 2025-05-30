import type {
  TrigramStance,
  PlayerState,
  TransitionMetrics,
  TransitionPath,
} from "../../types";
import { TRIGRAM_DATA, TRIGRAM_STANCES_ORDER } from "../../types";

export interface TransitionNode {
  readonly stance: TrigramStance;
  readonly cost: number;
  readonly path: readonly TrigramStance[];
}

export interface TransitionOptions {
  readonly maxCost?: number;
  readonly preferredPath?: readonly TrigramStance[];
  readonly avoidStances?: readonly TrigramStance[];
}

export class TransitionCalculator {
  private static readonly MAX_TRANSITION_COST = 100;

  /**
   * Calculate the metrics for transitioning between two stances
   */
  public static calculateTransition(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player: PlayerState
  ): TransitionMetrics {
    if (fromStance === toStance) {
      return {
        kiCost: 0,
        staminaCost: 0,
        time: 0,
        effectiveness: 1.0,
      };
    }

    const fromData = TRIGRAM_DATA[fromStance];
    const toData = TRIGRAM_DATA[toStance];

    // Calculate base transition distance
    const fromIndex = TRIGRAM_STANCES_ORDER.indexOf(fromStance);
    const toIndex = TRIGRAM_STANCES_ORDER.indexOf(toStance);
    const distance = Math.min(
      Math.abs(toIndex - fromIndex),
      8 - Math.abs(toIndex - fromIndex) // Circular distance
    );

    // Base costs
    let kiCost = 5 + distance * 3;
    let staminaCost = 3 + distance * 2;
    let time = 0.2 + distance * 0.1;

    // Element compatibility modifier
    if (fromData.element === toData.element) {
      kiCost *= 0.8; // Same element bonus
      staminaCost *= 0.8;
      time *= 0.9;
    }

    // Player state modifiers
    const kiRatio = player.ki / player.maxKi;
    const staminaRatio = player.stamina / player.maxStamina;

    if (kiRatio < 0.3) {
      kiCost *= 1.3; // Low ki penalty
      time *= 1.2;
    }

    if (staminaRatio < 0.3) {
      staminaCost *= 1.3; // Low stamina penalty
      time *= 1.1;
    }

    // Calculate effectiveness
    const effectiveness = Math.max(
      0.3,
      1.0 - distance * 0.1 - Math.max(0, 0.3 - kiRatio) * 0.5
    );

    return {
      kiCost: Math.round(kiCost),
      staminaCost: Math.round(staminaCost),
      time: Math.round(time * 100) / 100,
      effectiveness: Math.round(effectiveness * 100) / 100,
    };
  }

  /**
   * Find the optimal transition path between stances
   */
  public static findOptimalPath(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player: PlayerState,
    options: TransitionOptions = {}
  ): TransitionPath {
    if (fromStance === toStance) {
      return {
        path: [fromStance],
        totalKiCost: 0,
        totalStaminaCost: 0,
      };
    }

    // For simple transitions, use direct path
    const directTransition = this.calculateTransition(
      fromStance,
      toStance,
      player
    );

    // Check if direct path is acceptable
    const maxCost = options.maxCost ?? this.MAX_TRANSITION_COST;
    if (directTransition.kiCost <= maxCost) {
      return {
        path: [fromStance, toStance],
        totalKiCost: directTransition.kiCost,
        totalStaminaCost: directTransition.staminaCost,
      };
    }

    // If direct path is too expensive, find alternative
    return this.findAlternativePath(fromStance, toStance, player, options);
  }

  /**
   * Find alternative path when direct transition is not optimal
   */
  private static findAlternativePath(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player: PlayerState,
    options: TransitionOptions
  ): TransitionPath {
    const visited = new Set<TrigramStance>();
    const queue: TransitionNode[] = [
      {
        stance: fromStance,
        cost: 0,
        path: [fromStance],
      },
    ];

    visited.add(fromStance);

    while (queue.length > 0) {
      const current = queue.shift()!;

      if (current.stance === toStance) {
        return {
          path: [...current.path], // Create mutable copy
          totalKiCost: current.cost,
          totalStaminaCost: Math.round(current.cost * 0.6),
        };
      }

      // Explore adjacent stances
      for (const nextStance of TRIGRAM_STANCES_ORDER) {
        if (visited.has(nextStance)) continue;
        if (options.avoidStances?.includes(nextStance)) continue;

        const transition = this.calculateTransition(
          current.stance,
          nextStance,
          player
        );
        const newCost = current.cost + transition.kiCost;

        if (newCost <= (options.maxCost ?? this.MAX_TRANSITION_COST)) {
          visited.add(nextStance);
          queue.push({
            stance: nextStance,
            cost: newCost,
            path: [...current.path, nextStance],
          });
        }
      }
    }

    // Fallback to direct path if no alternative found
    const directTransition = this.calculateTransition(
      fromStance,
      toStance,
      player
    );
    return {
      path: [fromStance, toStance],
      totalKiCost: directTransition.kiCost,
      totalStaminaCost: directTransition.staminaCost,
    };
  }

  /**
   * Calculate transition efficiency based on player state and stance compatibility
   */
  public static calculateTransitionEfficiency(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player: PlayerState
  ): number {
    const metrics = this.calculateTransition(fromStance, toStance, player);
    const playerResourceRatio =
      (player.ki + player.stamina) / (player.maxKi + player.maxStamina);

    // Fix undefined effectiveness
    const effectiveness = metrics.effectiveness ?? 1.0;
    return effectiveness * playerResourceRatio;
  }

  /**
   * Get recommended transitions based on current player state
   */
  public static getRecommendedTransitions(
    currentStance: TrigramStance,
    player: PlayerState,
    targetStance?: TrigramStance
  ): readonly TrigramStance[] {
    if (targetStance) {
      const path = this.findOptimalPath(currentStance, targetStance, player);
      return path.path.slice(1); // Remove current stance
    }

    // Return adjacent stances with good efficiency
    return TRIGRAM_STANCES_ORDER.filter((stance) => {
      if (stance === currentStance) return false;
      const efficiency = this.calculateTransitionEfficiency(
        currentStance,
        stance,
        player
      );
      return efficiency > 0.7;
    });
  }

  /**
   * Check if a transition is viable given current player state
   */
  public static isTransitionViable(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player: PlayerState
  ): boolean {
    const metrics = this.calculateTransition(fromStance, toStance, player);
    const effectiveness = metrics.effectiveness ?? 1.0;
    return (
      player.ki >= metrics.kiCost &&
      player.stamina >= metrics.staminaCost &&
      effectiveness > 0.5
    );
  }

  /**
   * Calculate stance distance in the trigram circle
   */
  public static calculateStanceDistance(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): number {
    const fromIndex = TRIGRAM_STANCES_ORDER.indexOf(fromStance);
    const toIndex = TRIGRAM_STANCES_ORDER.indexOf(toStance);

    if (fromIndex === -1 || toIndex === -1) {
      return Infinity; // Invalid stance
    }

    return Math.min(
      Math.abs(toIndex - fromIndex),
      8 - Math.abs(toIndex - fromIndex) // Circular distance
    );
  }

  /**
   * Get the most efficient path considering multiple factors
   */
  public static getMostEfficientPath(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player: PlayerState
  ): TransitionPath {
    const directPath = this.findOptimalPath(fromStance, toStance, player);

    // For now, return the direct path as it includes optimization logic
    // Future enhancement: compare multiple path strategies
    return directPath;
  }
}
