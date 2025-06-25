import { TrigramStance } from "../../types/common";

/**
 * Enhanced stance effectiveness matrix for Korean martial arts
 * Based on traditional I-Ching trigram relationships
 */
const STANCE_EFFECTIVENESS_MATRIX: Record<
  TrigramStance,
  Partial<Record<TrigramStance, number>>
> = {
  [TrigramStance.GEON]: { [TrigramStance.GON]: 1.2, [TrigramStance.SON]: 0.8 },
  [TrigramStance.GON]: { [TrigramStance.GEON]: 0.8, [TrigramStance.GAM]: 1.2 },
  [TrigramStance.TAE]: { [TrigramStance.JIN]: 1.2, [TrigramStance.GAN]: 0.8 },
  [TrigramStance.JIN]: { [TrigramStance.TAE]: 0.8, [TrigramStance.SON]: 1.2 },
  [TrigramStance.LI]: { [TrigramStance.GAM]: 0.8, [TrigramStance.TAE]: 0.8 },
  [TrigramStance.GAM]: {
    // water extinguishes fire:
    [TrigramStance.LI]: 1.2,
    [TrigramStance.GON]: 0.8,
  },
  [TrigramStance.SON]: { [TrigramStance.GEON]: 1.2, [TrigramStance.JIN]: 0.8 },
  [TrigramStance.GAN]: { [TrigramStance.TAE]: 1.2, [TrigramStance.LI]: 0.8 },
};

export class TrigramCalculator {
  /**
   * Calculate effectiveness of one stance against another
   */
  calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    if (attackerStance === defenderStance) {
      return 1.0; // Neutral when same stance
    }

    const effectiveness =
      STANCE_EFFECTIVENESS_MATRIX[attackerStance]?.[defenderStance];
    return effectiveness ?? 1.0; // Default to neutral if no specific relationship
  }

  /**
   * Get the optimal counter stance for a given stance
   */
  getCounterStance(targetStance: TrigramStance): TrigramStance {
    let bestCounter = TrigramStance.GEON;
    let bestEffectiveness = 0;

    // Find stance with highest effectiveness against target
    for (const stance of Object.values(TrigramStance)) {
      const effectiveness = this.calculateStanceEffectiveness(
        stance,
        targetStance
      );
      if (effectiveness > bestEffectiveness) {
        bestEffectiveness = effectiveness;
        bestCounter = stance;
      }
    }

    return bestCounter;
  }

  /**
   * Calculate transition difficulty between stances
   */
  calculateTransitionDifficulty(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): number {
    if (fromStance === toStance) return 0;

    // Base difficulty for any transition
    const baseDifficulty = 0.5;

    // Get stance order for adjacency calculation
    const stanceOrder = Object.values(TrigramStance);
    const fromIndex = stanceOrder.indexOf(fromStance);
    const toIndex = stanceOrder.indexOf(toStance);

    if (fromIndex === -1 || toIndex === -1) {
      return 1.0; // Unknown stances, high difficulty
    }

    // Calculate distance (adjacent stances are easier)
    const distance = Math.min(
      Math.abs(toIndex - fromIndex),
      stanceOrder.length - Math.abs(toIndex - fromIndex)
    );

    // Normalize distance to 0-1 range and add base difficulty
    const normalizedDistance = distance / (stanceOrder.length / 2);
    return baseDifficulty + normalizedDistance * 0.5;
  }

  /**
   * Calculate stance effectiveness between attacker and defender
   */
  static calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    // Use the effectiveness matrix from constants
    const effectiveness =
      STANCE_EFFECTIVENESS_MATRIX[attackerStance]?.[defenderStance];
    return effectiveness ?? 1.0; // Default neutral effectiveness
  }

  /**
   * Get optimal counter stance against opponent stance
   */
  static getCounterStance(opponentStance: TrigramStance): TrigramStance {
    // Find the stance that has highest effectiveness against opponent
    const stances = Object.values(TrigramStance);
    let bestCounter = TrigramStance.GEON;
    let bestEffectiveness = 0;

    stances.forEach((stance) => {
      const effectiveness = this.calculateStanceEffectiveness(
        stance,
        opponentStance
      );
      if (effectiveness > bestEffectiveness) {
        bestEffectiveness = effectiveness;
        bestCounter = stance;
      }
    });

    return bestCounter;
  }

  /**
   * Calculate difficulty of transitioning between stances
   */
  static calculateTransitionDifficulty(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): number {
    if (fromStance === toStance) {
      return 0; // No transition needed
    }

    // Base difficulty for any transition
    const baseDifficulty = 0.5;

    // Get stance order for adjacency calculation
    const stanceOrder = Object.values(TrigramStance);
    const fromIndex = stanceOrder.indexOf(fromStance);
    const toIndex = stanceOrder.indexOf(toStance);

    if (fromIndex === -1 || toIndex === -1) {
      return 1.0; // Unknown stances, high difficulty
    }

    // Calculate distance (adjacent stances are easier)
    const distance = Math.min(
      Math.abs(toIndex - fromIndex),
      stanceOrder.length - Math.abs(toIndex - fromIndex)
    );

    // Normalize distance to 0-1 range and add base difficulty
    const normalizedDistance = distance / (stanceOrder.length / 2);
    return baseDifficulty + normalizedDistance * 0.5;
  }
} // end of class

export { STANCE_EFFECTIVENESS_MATRIX };
