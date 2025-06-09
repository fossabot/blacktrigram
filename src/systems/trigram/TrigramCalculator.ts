import { TrigramStance } from "../../types/enums";

/**
 * Trigram calculator for Korean martial arts stance relationships
 */
export class TrigramCalculator {
  /**
   * Fix: Define STANCE_EFFECTIVENESS_MATRIX locally to avoid import conflict
   */
  private static readonly STANCE_EFFECTIVENESS_MATRIX: Record<
    TrigramStance,
    Partial<Record<TrigramStance, number>>
  > = {
    [TrigramStance.GEON]: {
      [TrigramStance.GON]: 1.2,
      [TrigramStance.SON]: 0.8,
    },
    [TrigramStance.TAE]: {
      [TrigramStance.JIN]: 1.2,
      [TrigramStance.GAN]: 0.8,
    },
    [TrigramStance.LI]: {
      [TrigramStance.GAM]: 1.2,
      [TrigramStance.TAE]: 0.8,
    },
    [TrigramStance.JIN]: {
      [TrigramStance.SON]: 1.2,
      [TrigramStance.GEON]: 0.8,
    },
    [TrigramStance.SON]: {
      [TrigramStance.GON]: 1.2,
      [TrigramStance.LI]: 0.8,
    },
    [TrigramStance.GAM]: {
      [TrigramStance.LI]: 1.2,
      [TrigramStance.JIN]: 0.8,
    },
    [TrigramStance.GAN]: {
      [TrigramStance.TAE]: 1.2,
      [TrigramStance.GAM]: 0.8,
    },
    [TrigramStance.GON]: {
      [TrigramStance.GEON]: 1.2,
      [TrigramStance.SON]: 0.8,
    },
  };

  /**
   * Calculate effectiveness between two stances
   */
  static calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    // Use the effectiveness matrix to determine advantage/disadvantage
    const effectiveness =
      this.STANCE_EFFECTIVENESS_MATRIX[attackerStance]?.[defenderStance];
    return effectiveness ?? 1.0; // Default to neutral if not specified
  }

  /**
   * Get the optimal counter stance for a given opponent stance
   */
  static getCounterStance(opponentStance: TrigramStance): TrigramStance {
    // Find the stance that has the highest effectiveness against the opponent
    let bestStance = TrigramStance.GEON;
    let bestEffectiveness = 0;

    for (const stance of Object.values(TrigramStance)) {
      const effectiveness = this.calculateStanceEffectiveness(
        stance,
        opponentStance
      );
      if (effectiveness > bestEffectiveness) {
        bestEffectiveness = effectiveness;
        bestStance = stance;
      }
    }

    return bestStance;
  }

  /**
   * Calculate transition difficulty between stances
   */
  static calculateTransitionDifficulty(
    from: TrigramStance,
    to: TrigramStance
  ): number {
    if (from === to) {
      return 0;
    }

    const stanceOrder = Object.values(TrigramStance); // Fix: Use enum values
    const fromIndex = stanceOrder.indexOf(from);
    const toIndex = stanceOrder.indexOf(to);

    if (fromIndex === -1 || toIndex === -1) {
      return 1.0;
    }

    const distance = Math.abs(fromIndex - toIndex);
    const minDistance = Math.min(distance, stanceOrder.length - distance);

    return Math.max(0.2, minDistance / (stanceOrder.length / 2));
  }

  /**
   * Get adjacency modifier based on trigram relationships
   */
  public static getAdjacencyModifier(
    from: TrigramStance,
    to: TrigramStance
  ): number {
    const difficulty = this.calculateTransitionDifficulty(from, to);
    return 1.0 - difficulty * 0.3;
  }
}

// Fix: Export the matrix for external use
export const STANCE_EFFECTIVENESS_MATRIX =
  TrigramCalculator["STANCE_EFFECTIVENESS_MATRIX"];
