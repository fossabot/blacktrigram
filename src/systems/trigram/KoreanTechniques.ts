import type { TrigramStance } from "../../types";

interface KoreanTechnique {
  readonly name: string;
  readonly damage: number;
  readonly range: number;
  readonly kiCost: number;
  readonly description: string;
}

const KOREAN_TECHNIQUES: Record<TrigramStance, KoreanTechnique> = {
  geon: {
    name: "천둥벽력",
    damage: 28,
    range: 60,
    kiCost: 15,
    description: "Heaven's Thunder Strike - Divine power from above",
  },
  tae: {
    name: "유수연타",
    damage: 18,
    range: 45,
    kiCost: 10,
    description: "Lake's Flowing Combo - Gentle yet persistent",
  },
  li: {
    name: "화염지창",
    damage: 35,
    range: 55,
    kiCost: 20,
    description: "Fire Spear - Explosive piercing attack",
  },
  jin: {
    name: "벽력일섬",
    damage: 40,
    range: 50,
    kiCost: 25,
    description: "Thunder Flash - Lightning-fast strike",
  },
  son: {
    name: "선풍연격",
    damage: 15,
    range: 70,
    kiCost: 8,
    description: "Wind Whirlwind - Swift successive strikes",
  },
  gam: {
    name: "수류반격",
    damage: 25,
    range: 40,
    kiCost: 12,
    description: "Water Counter - Flowing defensive strike",
  },
  gan: {
    name: "반석방어",
    damage: 12,
    range: 30,
    kiCost: 5,
    description: "Mountain Defense - Immovable protection",
  },
  gon: {
    name: "대지포옹",
    damage: 30,
    range: 35,
    kiCost: 18,
    description: "Earth Embrace - Grounding grappling technique",
  },
};

export class KoreanTechniques {
  public static getTechniqueForStance(stance: TrigramStance): KoreanTechnique {
    return KOREAN_TECHNIQUES[stance];
  }

  public static getAllTechniques(): Record<TrigramStance, KoreanTechnique> {
    return { ...KOREAN_TECHNIQUES };
  }

  public static getKoreanName(stance: TrigramStance): string {
    return KOREAN_TECHNIQUES[stance].name;
  }
}

// Export both names to satisfy different import patterns
export { KoreanTechniques as KOREAN_TECHNIQUES };
export default KoreanTechniques;
