import type { TrigramStance, KoreanTechnique, TrigramData } from "../../types";
import { TRIGRAM_DATA } from "../../types";

export class KoreanTechniques {
  public static getTechniqueForStance(stance: TrigramStance): KoreanTechnique {
    const trigramData = TRIGRAM_DATA[stance];
    if (!trigramData?.technique) {
      throw new Error(`No technique found for stance: ${stance}`);
    }
    return trigramData.technique;
  }

  public static getAllTechniques(): Record<TrigramStance, KoreanTechnique> {
    const techniques: Record<TrigramStance, KoreanTechnique> = {} as Record<
      TrigramStance,
      KoreanTechnique
    >;

    Object.entries(TRIGRAM_DATA).forEach(([stance, data]) => {
      techniques[stance as TrigramStance] = data.technique;
    });

    return techniques;
  }

  public static getKoreanName(stance: TrigramStance): string {
    const technique = this.getTechniqueForStance(stance);
    return technique.koreanName || technique.name;
  }

  public static getTechniqueByName(name: string): KoreanTechnique | undefined {
    for (const stance in TRIGRAM_DATA) {
      const data = TRIGRAM_DATA[stance as TrigramStance];
      if (data.technique.name === name || data.technique.koreanName === name) {
        return data.technique;
      }
    }
    return undefined;
  }

  public static getStanceName(stance: TrigramStance): string {
    return TRIGRAM_DATA[stance].englishName;
  }

  public static getAllTechniqueNames(): string[] {
    return Object.values(TRIGRAM_DATA).map((data) => data.technique.name);
  }

  public static getTrigramDataForTechnique(
    techniqueName: string
  ): TrigramData | undefined {
    for (const stance in TRIGRAM_DATA) {
      const data = TRIGRAM_DATA[stance as TrigramStance];
      if (
        data.technique.name === techniqueName ||
        data.technique.koreanName === techniqueName
      ) {
        return data;
      }
    }
    return undefined;
  }
}

// Export for external access
export function getTechniqueByStance(stance: TrigramStance): KoreanTechnique {
  return KoreanTechniques.getTechniqueForStance(stance);
}

export function getAllTechniques(): KoreanTechnique[] {
  return Object.values(TRIGRAM_DATA).map((trigram) => trigram.technique);
}

export function getTechniquesByElement(element: string): KoreanTechnique[] {
  return Object.values(TRIGRAM_DATA)
    .filter((trigram) => trigram.element === element)
    .map((trigram) => trigram.technique);
}

export { KoreanTechniques as KOREAN_TECHNIQUES };
export default KoreanTechniques;
