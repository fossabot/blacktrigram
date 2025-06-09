import type {
  KoreanTechnique,
  TrigramStance,
  StatusEffect,
  DamageType,
  CombatAttackType,
} from "../../types";
import {
  TrigramStance as TrigramStanceEnum,
  DamageType as DamageTypeEnum,
  EnumCombatAttackType,
} from "../../types/enums";

export const TECHNIQUES: Record<string, KoreanTechnique> = {
  geon_heavenly_thunder: {
    id: "geon_heavenly_thunder",
    name: {
      korean: "건천뇌",
      english: "Heavenly Thunder",
      romanized: "Geon Cheon Roe",
    },
    koreanName: "건천뇌",
    englishName: "Heavenly Thunder",
    romanized: "Geon Cheon Roe",
    description: {
      korean: "하늘의 뇌성같은 강력한 일격",
      english: "A powerful strike like thunder from heaven",
    },
    stance: TrigramStanceEnum.GEON,
    type: "strike" as CombatAttackType,
    damageType: DamageTypeEnum.BLUNT,
    damageRange: { min: 15, max: 25, type: DamageTypeEnum.BLUNT },
    damage: 20,
    range: 1.5,
    kiCost: 20,
    staminaCost: 15,
    accuracy: 0.85,
    executionTime: 800,
    recoveryTime: 600,
    critChance: 0.15,
    critMultiplier: 2.0,
    effects: [],
    properties: ["heavy", "stunning"],
  },
  // Add more techniques for other stances...
};

export function getTechniqueById(id: string): KoreanTechnique | undefined {
  return TECHNIQUES[id];
}

export function getTechniquesByStance(
  stance: TrigramStance
): KoreanTechnique[] {
  return Object.values(TECHNIQUES).filter(
    (technique) => technique.stance === stance
  );
}

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
  // Add complete matrix for all stances...
};
