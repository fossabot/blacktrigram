import { PlayerArchetype, TrigramStance } from "../../types";
import { TrigramStance as TrigramStanceEnum } from "../../types/common";
import { PlayerState } from "../player";
import { PLAYER_ARCHETYPES_DATA } from "../types";
import { KoreanTechnique } from "../vitalpoint";
import { TRIGRAM_TECHNIQUES } from "./techniques";

/**
 * Korean martial arts techniques system
 */
export class KoreanTechniquesSystem {
  /**
   * Get available techniques for a trigram stance
   */
  static getAvailableTechniques(
    stance: TrigramStance
  ): readonly KoreanTechnique[] {
    return (TRIGRAM_TECHNIQUES[stance] as readonly KoreanTechnique[]) || [];
  }

  /**
   * Get primary technique for stance
   */
  static getPrimaryTechnique(stance: TrigramStance): KoreanTechnique | null {
    const techniques = this.getAvailableTechniques(stance);
    return techniques[0] || null;
  }

  /**
   * Check if player can execute technique
   */
  static canExecuteTechnique(
    player: PlayerState,
    technique: KoreanTechnique
  ): boolean {
    return (
      player.ki >= technique.kiCost &&
      player.stamina >= technique.staminaCost &&
      player.currentStance === technique.stance
    );
  }

  /**
   * Get technique effectiveness against target stance
   */
  static getTechniqueEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    return (
      TECHNIQUE_EFFECTIVENESS_MATRIX[attackerStance]?.[defenderStance] || 1.0
    );
  }

  /**
   * Get all techniques
   */
  static getAllTechniques(): KoreanTechnique[] {
    // Fix: Convert readonly array to mutable array using spread operator
    return [...Object.values(TRIGRAM_TECHNIQUES).flat()] as KoreanTechnique[];
  }

  static getTechniquesByArchetype(
    archetype: PlayerArchetype
  ): readonly KoreanTechnique[] {
    const allTechniques = this.getAllTechniques();

    // Filter techniques based on archetype preferences
    const archetypeData = PLAYER_ARCHETYPES_DATA[archetype]; // Fix: Now properly imported
    const favoredStances = archetypeData.favoredStances || [];

    return allTechniques.filter((technique) =>
      favoredStances.includes(technique.stance)
    );
  }

  static getTechniqueById(id: string): KoreanTechnique | undefined {
    const allTechniques = this.getAllTechniques();
    return allTechniques.find((technique) => technique.id === id);
  }
}

// Export functions for backwards compatibility
export function getTechniquesByStance(
  stance: TrigramStance
): KoreanTechnique[] {
  // Fix: Convert readonly array to mutable array
  return [
    ...((TRIGRAM_TECHNIQUES[stance] as unknown as KoreanTechnique[]) || []),
  ];
}

// Export TRIGRAM_TECHNIQUES for tests
export { TRIGRAM_TECHNIQUES } from "./techniques";

// Export technique effectiveness matrix
export const TECHNIQUE_EFFECTIVENESS_MATRIX: Record<
  TrigramStance,
  Partial<Record<TrigramStance, number>>
> = {
  [TrigramStanceEnum.GEON]: {
    [TrigramStanceEnum.GON]: 1.2,
    [TrigramStanceEnum.SON]: 0.8,
  },
  [TrigramStanceEnum.TAE]: {
    [TrigramStanceEnum.JIN]: 1.2,
    [TrigramStanceEnum.GAN]: 0.8,
  },
  [TrigramStanceEnum.LI]: {
    [TrigramStanceEnum.GAM]: 1.2,
    [TrigramStanceEnum.TAE]: 0.8,
  },
  [TrigramStanceEnum.JIN]: {
    [TrigramStanceEnum.SON]: 1.2,
    [TrigramStanceEnum.GEON]: 0.8,
  },
  [TrigramStanceEnum.SON]: {
    [TrigramStanceEnum.GON]: 1.2,
    [TrigramStanceEnum.LI]: 0.8,
  },
  [TrigramStanceEnum.GAM]: {
    [TrigramStanceEnum.LI]: 1.2,
    [TrigramStanceEnum.JIN]: 0.8,
  },
  [TrigramStanceEnum.GAN]: {
    [TrigramStanceEnum.TAE]: 1.2,
    [TrigramStanceEnum.GAM]: 0.8,
  },
  [TrigramStanceEnum.GON]: {
    [TrigramStanceEnum.GEON]: 1.2,
    [TrigramStanceEnum.SON]: 0.8,
  },
};
