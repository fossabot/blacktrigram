import { TrigramStance } from "../../types/enums";
import type { TrigramTransitionCost, PlayerState } from "../../types";

/**
 * Calculator for trigram stance transitions and effectiveness
 */
export class TrigramCalculator {
  /**
   * Calculate transition cost between two stances
   */
  static calculateTransitionCost(
    from: TrigramStance,
    to: TrigramStance
  ): TrigramTransitionCost {
    if (from === to) {
      return { ki: 0, stamina: 0, time: 0 };
    }

    // Base transition costs
    const baseCost = { ki: 15, stamina: 10, time: 500 };

    // Calculate adjacency modifier
    const modifier = this.getAdjacencyModifier(from, to);

    return {
      ki: Math.floor(baseCost.ki * modifier),
      stamina: Math.floor(baseCost.stamina * modifier),
      time: Math.floor(baseCost.time * modifier),
    };
  }

  /**
   * Calculate stance effectiveness multiplier
   */
  static calculateStanceEffectiveness(
    attacker: TrigramStance,
    defender: TrigramStance
  ): number {
    // Trigram effectiveness matrix based on I Ching philosophy
    const matrix: Record<
      TrigramStance,
      Partial<Record<TrigramStance, number>>
    > = {
      geon: { gon: 1.2, son: 0.8 },
      tae: { jin: 1.2, gan: 0.8 },
      li: { gam: 1.2, tae: 0.8 },
      jin: { son: 1.2, geon: 0.8 },
      son: { gon: 1.2, li: 0.8 },
      gam: { li: 1.2, jin: 0.8 },
      gan: { tae: 1.2, gam: 0.8 },
      gon: { geon: 1.2, son: 0.8 },
    };

    return matrix[attacker]?.[defender] ?? 1.0;
  }

  /**
   * Calculate adjacency modifier for smooth transitions
   */
  private static getAdjacencyModifier(
    from: TrigramStance,
    to: TrigramStance
  ): number {
    const adjacentStances: Record<TrigramStance, TrigramStance[]> = {
      geon: ["tae", "gon"],
      tae: ["geon", "li"],
      li: ["tae", "jin"],
      jin: ["li", "son"],
      son: ["jin", "gam"],
      gam: ["son", "gan"],
      gan: ["gam", "gon"],
      gon: ["gan", "geon"],
    };

    return adjacentStances[from]?.includes(to) ? 0.7 : 1.0;
  }

  // Fix: Use proper enum values throughout
  private static adjacencyMap: Record<TrigramStance, TrigramStance[]> = {
    [TrigramStance.GEON]: [TrigramStance.TAE, TrigramStance.GON],
    [TrigramStance.TAE]: [TrigramStance.GEON, TrigramStance.LI],
    [TrigramStance.LI]: [TrigramStance.TAE, TrigramStance.JIN],
    [TrigramStance.JIN]: [TrigramStance.LI, TrigramStance.SON],
    [TrigramStance.SON]: [TrigramStance.JIN, TrigramStance.GAM],
    [TrigramStance.GAM]: [TrigramStance.SON, TrigramStance.GAN],
    [TrigramStance.GAN]: [TrigramStance.GAM, TrigramStance.GON],
    [TrigramStance.GON]: [TrigramStance.GAN, TrigramStance.GEON],
  };

  public static getStanceAdjacency(stance: TrigramStance): TrigramStance[] {
    return this.adjacencyMap[stance] || [];
  }
}
