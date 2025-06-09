import type {
  PlayerState,
  TrigramStance,
  TrigramTransitionRule,
  TrigramTransitionCost,
} from "../../types";

/**
 * Calculator for trigram stance transition costs and validation
 */
export class TransitionCalculator {
  private transitionRulesInternal: readonly TrigramTransitionRule[];

  constructor(transitionRules?: readonly TrigramTransitionRule[]) {
    this.transitionRulesInternal =
      transitionRules || this.generateDefaultRules();
  }

  private generateDefaultRules(): readonly TrigramTransitionRule[] {
    const rules: TrigramTransitionRule[] = [];
    const stances = Object.keys(
      this.transitionRulesInternal
    ) as TrigramStance[];
    for (const from of stances) {
      for (const to of stances) {
        if (from === to) continue;
        const kiCost = 10;
        const staminaCost = 5;
        const timeMs = 500;
        const effectiveness = 1.0; // Default effectiveness

        rules.push({
          from,
          to,
          cost: { ki: kiCost, stamina: staminaCost, timeMilliseconds: timeMs },
          effectiveness: effectiveness,
          conditions: [],
          description: {
            korean: `${from} 에서 ${to} 로`,
            english: `From ${from} to ${to}`,
          },
        });
      }
    }
    return rules;
  }

  /**
   * Calculate the cost of transitioning between stances
   */
  static calculateCost(
    from: TrigramStance,
    to: TrigramStance
  ): TrigramTransitionCost {
    if (from === to) {
      return { ki: 0, stamina: 0, time: 0 };
    }

    const baseCost = { ki: 15, stamina: 10, time: 500 };
    const modifier = this.getAdjacencyModifier(from, to);

    return {
      ki: Math.floor(baseCost.ki * modifier),
      stamina: Math.floor(baseCost.stamina * modifier),
      time: Math.floor(baseCost.time * modifier),
    };
  }

  /**
   * Check if a transition is valid for a player
   */
  static canTransition(
    from: TrigramStance,
    to: TrigramStance,
    player: PlayerState
  ): boolean {
    const cost = this.calculateCost(from, to);
    return player.ki >= cost.ki && player.stamina >= cost.stamina;
  }

  /**
   * Get adjacency modifier for stance transitions
   */
  private static getAdjacencyModifier(
    from: TrigramStance,
    to: TrigramStance
  ): number {
    const adjacencyMap: Record<TrigramStance, TrigramStance[]> = {
      geon: ["tae", "gon"],
      tae: ["geon", "li"],
      li: ["tae", "jin"],
      jin: ["li", "son"],
      son: ["jin", "gam"],
      gam: ["son", "gan"],
      gan: ["gam", "gon"],
      gon: ["gan", "geon"],
    };

    return adjacencyMap[from]?.includes(to) ? 0.7 : 1.0;
  }

  /**
   * Get the shortest transition path between stances
   */
  static getTransitionPath(
    from: TrigramStance,
    to: TrigramStance
  ): TrigramStance[] {
    if (from === to) return [from];

    // Simple direct transition for now
    return [from, to];
  }

  /**
   * Calculate total cost for a transition path
   */
  static calculatePathCost(path: TrigramStance[]): TrigramTransitionCost {
    if (path.length <= 1) {
      return { ki: 0, stamina: 0, time: 0 };
    }

    let totalCost = { ki: 0, stamina: 0, time: 0 };

    for (let i = 0; i < path.length - 1; i++) {
      const stepCost = this.calculateCost(path[i], path[i + 1]);
      totalCost.ki += stepCost.ki;
      totalCost.stamina += stepCost.stamina;
      totalCost.time += stepCost.time;
    }

    return totalCost;
  }
}
