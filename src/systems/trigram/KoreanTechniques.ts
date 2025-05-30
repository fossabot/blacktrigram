import type { TrigramStance, KoreanTechnique } from "../../types";
import { TRIGRAM_DATA } from "../../types";

export class KoreanTechniques {
  static getAllTechniques(): Record<TrigramStance, KoreanTechnique> {
    const techniques: Partial<Record<TrigramStance, KoreanTechnique>> = {};

    for (const [stance, data] of Object.entries(TRIGRAM_DATA)) {
      if (data.technique) {
        techniques[stance as TrigramStance] = data.technique;
      }
    }

    return techniques as Record<TrigramStance, KoreanTechnique>;
  }

  static getTechniqueByName(name: string): KoreanTechnique | undefined {
    for (const [, data] of Object.entries(TRIGRAM_DATA)) {
      if (
        data.technique &&
        (data.technique.name === name || data.technique.koreanName === name)
      ) {
        return data.technique;
      }
    }
    return undefined;
  }

  static getStanceDisplayName(stance: TrigramStance): string {
    return TRIGRAM_DATA[stance].englishName || TRIGRAM_DATA[stance].element;
  }

  static getAllTechniqueNames(): string[] {
    return Object.values(TRIGRAM_DATA)
      .map((data) => data.technique)
      .filter(
        (technique): technique is KoreanTechnique => technique !== undefined
      )
      .map((technique) => technique.name);
  }

  static getStanceFromTechniqueName(
    techniqueName: string
  ): TrigramStance | undefined {
    const trigram = Object.values(TRIGRAM_DATA).find(
      (data) =>
        data.technique &&
        (data.technique.name === techniqueName ||
          data.technique.koreanName === techniqueName)
    );

    if (trigram) {
      return Object.keys(TRIGRAM_DATA).find(
        (key) => TRIGRAM_DATA[key as TrigramStance] === trigram
      ) as TrigramStance;
    }

    return undefined;
  }

  static getAllTechniquesArray(): KoreanTechnique[] {
    return Object.values(TRIGRAM_DATA)
      .map((trigram) => trigram.technique)
      .filter(
        (technique): technique is KoreanTechnique => technique !== undefined
      );
  }

  static getTechniquesForStance(stance: TrigramStance): KoreanTechnique[] {
    const technique = TRIGRAM_DATA[stance].technique;
    return technique ? [technique] : [];
  }
}

export function getTechniquesByElement(_element: string): KoreanTechnique[] {
  return Object.values(TRIGRAM_DATA)
    .map((trigram) => trigram.technique)
    .filter(
      (technique): technique is KoreanTechnique => technique !== undefined
    );
}
