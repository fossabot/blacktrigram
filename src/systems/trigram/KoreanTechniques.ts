import type {
  TrigramStance,
  KoreanTechnique,
  // Remove unused import
  // PlayerState,
} from "../../types";
import { TrigramStance as TrigramStanceEnum } from "../../types/enums";
import { TRIGRAM_DATA } from "../../types/constants";

/**
 * Korean martial arts techniques system
 */
export class KoreanTechniquesSystem {
  /**
   * Get available techniques for a trigram stance
   */
  static getAvailableTechniques(stance: TrigramStance): KoreanTechnique[] {
    const stanceData = TRIGRAM_DATA[stance];

    if (!stanceData?.techniques?.primary) {
      return [];
    }

    const primary = stanceData.techniques.primary;
    return [
      {
        id: `${stance}_primary`,
        name: {
          korean: primary.korean,
          english: primary.english,
          romanized: primary.korean,
        },
        koreanName: primary.korean,
        englishName: primary.english,
        romanized: primary.korean,
        description: primary.description,
        stance,
        type: "strike" as any, // Fix: Keep simple type assertion
        damageType: "blunt" as any,
        damage: primary.damage,
        damageRange: {
          min: primary.damage - 5,
          max: primary.damage + 5,
        },
        range: 1.0,
        kiCost: primary.kiCost,
        staminaCost: primary.staminaCost,
        accuracy: primary.hitChance,
        executionTime: 500,
        recoveryTime: 800,
        critChance: primary.criticalChance || 0.1,
        critMultiplier: 1.5,
        effects: [],
      },
    ];
  }

  // ...existing code...
}

// Fix: Complete effectiveness matrix
export const TECHNIQUE_EFFECTIVENESS_MATRIX: Record<
  TrigramStance,
  Record<TrigramStance, number>
> = {
  [TrigramStanceEnum.GEON]: {
    [TrigramStanceEnum.GEON]: 1.0,
    [TrigramStanceEnum.TAE]: 1.2,
    [TrigramStanceEnum.LI]: 0.8,
    [TrigramStanceEnum.JIN]: 1.1,
    [TrigramStanceEnum.SON]: 0.9,
    [TrigramStanceEnum.GAM]: 1.3,
    [TrigramStanceEnum.GAN]: 0.7,
    [TrigramStanceEnum.GON]: 1.0,
  },
  [TrigramStanceEnum.TAE]: {
    [TrigramStanceEnum.GEON]: 0.8,
    [TrigramStanceEnum.TAE]: 1.0,
    [TrigramStanceEnum.LI]: 1.2,
    [TrigramStanceEnum.JIN]: 0.9,
    [TrigramStanceEnum.SON]: 1.1,
    [TrigramStanceEnum.GAM]: 0.7,
    [TrigramStanceEnum.GAN]: 1.3,
    [TrigramStanceEnum.GON]: 1.0,
  },
  [TrigramStanceEnum.LI]: {
    [TrigramStanceEnum.GEON]: 1.2,
    [TrigramStanceEnum.TAE]: 0.8,
    [TrigramStanceEnum.LI]: 1.0,
    [TrigramStanceEnum.JIN]: 1.3,
    [TrigramStanceEnum.SON]: 0.7,
    [TrigramStanceEnum.GAM]: 1.1,
    [TrigramStanceEnum.GAN]: 0.9,
    [TrigramStanceEnum.GON]: 1.0,
  },
  [TrigramStanceEnum.JIN]: {
    [TrigramStanceEnum.GEON]: 0.9,
    [TrigramStanceEnum.TAE]: 1.1,
    [TrigramStanceEnum.LI]: 0.7,
    [TrigramStanceEnum.JIN]: 1.0,
    [TrigramStanceEnum.SON]: 1.3,
    [TrigramStanceEnum.GAM]: 0.8,
    [TrigramStanceEnum.GAN]: 1.2,
    [TrigramStanceEnum.GON]: 1.0,
  },
  [TrigramStanceEnum.SON]: {
    [TrigramStanceEnum.GEON]: 1.1,
    [TrigramStanceEnum.TAE]: 0.9,
    [TrigramStanceEnum.LI]: 1.3,
    [TrigramStanceEnum.JIN]: 0.7,
    [TrigramStanceEnum.SON]: 1.0,
    [TrigramStanceEnum.GAM]: 1.2,
    [TrigramStanceEnum.GAN]: 0.8,
    [TrigramStanceEnum.GON]: 1.0,
  },
  [TrigramStanceEnum.GAM]: {
    [TrigramStanceEnum.GEON]: 0.7,
    [TrigramStanceEnum.TAE]: 1.3,
    [TrigramStanceEnum.LI]: 0.9,
    [TrigramStanceEnum.JIN]: 1.2,
    [TrigramStanceEnum.SON]: 0.8,
    [TrigramStanceEnum.GAM]: 1.0,
    [TrigramStanceEnum.GAN]: 1.1,
    [TrigramStanceEnum.GON]: 1.0,
  },
  [TrigramStanceEnum.GAN]: {
    [TrigramStanceEnum.GEON]: 1.3,
    [TrigramStanceEnum.TAE]: 0.7,
    [TrigramStanceEnum.LI]: 1.1,
    [TrigramStanceEnum.JIN]: 0.8,
    [TrigramStanceEnum.SON]: 1.2,
    [TrigramStanceEnum.GAM]: 0.9,
    [TrigramStanceEnum.GAN]: 1.0,
    [TrigramStanceEnum.GON]: 1.0,
  },
  [TrigramStanceEnum.GON]: {
    [TrigramStanceEnum.GEON]: 1.0,
    [TrigramStanceEnum.TAE]: 1.0,
    [TrigramStanceEnum.LI]: 1.0,
    [TrigramStanceEnum.JIN]: 1.0,
    [TrigramStanceEnum.SON]: 1.0,
    [TrigramStanceEnum.GAM]: 1.0,
    [TrigramStanceEnum.GAN]: 1.0,
    [TrigramStanceEnum.GON]: 1.0,
  },
};

// Export helper functions
export function getTechniquesByStance(
  stance: TrigramStance
): KoreanTechnique[] {
  return KoreanTechniquesSystem.getAvailableTechniques(stance);
}

// Export default for backward compatibility
export const KoreanTechniques = KoreanTechniquesSystem;

// Export TRIGRAM_TECHNIQUES for test compatibility
export const TRIGRAM_TECHNIQUES = TECHNIQUE_EFFECTIVENESS_MATRIX;
