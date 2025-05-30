import type {
  TrigramStance,
  KoreanTechnique as ImportedKoreanTechnique,
  TrigramData,
  KoreanTechnique,
} from "../../types"; // Use alias for imported type
import { TRIGRAM_DATA } from "../../types"; // Ensure TRIGRAM_DATA is imported if used directly

export class KoreanTechniques {
  public static getTechniqueForStance(
    stance: TrigramStance
  ): ImportedKoreanTechnique {
    const trigramData = TRIGRAM_DATA[stance];
    if (!trigramData || !trigramData.technique) {
      throw new Error(`Technique for stance ${stance} not found.`);
    }
    return trigramData.technique as ImportedKoreanTechnique;
  }

  public static getAllTechniques(): ImportedKoreanTechnique[] {
    return Object.values(TRIGRAM_DATA).map(
      (trigram) => trigram.technique as ImportedKoreanTechnique
    );
  }

  public static getKoreanName(stance: TrigramStance): string {
    return TRIGRAM_DATA[stance].name;
  }
}

// Add the missing function that systems are trying to import
export function getTechniqueByStance(
  stance: TrigramStance
): ImportedKoreanTechnique {
  const trigramData = TRIGRAM_DATA[stance];
  if (!trigramData || !trigramData.technique) {
    // Fallback or default technique if specific one not found
    // This should ideally not happen if TRIGRAM_DATA is complete
    throw new Error(
      `Technique for stance ${stance} not found in TRIGRAM_DATA.`
    );
  }
  return trigramData.technique;
}

// Export techniques for external access
export function getAllTechniques(): ImportedKoreanTechnique[] {
  return Object.values(TRIGRAM_DATA).map(
    (trigram) => trigram.technique as ImportedKoreanTechnique
  );
}

export function getTechniquesByElement(
  element: string
): ImportedKoreanTechnique[] {
  return Object.values(TRIGRAM_DATA)
    .filter((trigram) => trigram.element === element)
    .map((trigram) => trigram.technique as ImportedKoreanTechnique);
}

export function getTechniqueByName(name: string): KoreanTechnique | undefined {
  for (const stance in TRIGRAM_DATA) {
    const data = TRIGRAM_DATA[stance as TrigramStance];
    if (data.technique.name === name || data.technique.koreanName === name) {
      return data.technique;
    }
  }
  return undefined;
}

export function getTechniquesByStance(
  stance: TrigramStance
): KoreanTechnique[] {
  const data = TRIGRAM_DATA[stance];
  // Assuming a stance might have multiple techniques in the future,
  // for now, it's just one.
  return data ? [data.technique] : [];
}

export function getAllTechniqueNames(): string[] {
  const names: string[] = [];
  for (const stance in TRIGRAM_DATA) {
    const data = TRIGRAM_DATA[stance as TrigramStance];
    names.push(data.technique.name);
  }
  return names;
}

export function getTrigramDataForTechnique(
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

// Add this function if it was intended from the error:
// "Property 'name' does not exist on type 'TrigramData'."
// This implies a direct access like TRIGRAM_DATA[stance].name was attempted somewhere.
// If it's about the stance name itself:
export function getStanceName(stance: TrigramStance): string {
  return TRIGRAM_DATA[stance].englishName; // Use englishName or koreanName
}

// Export both names to satisfy different import patterns
export { KoreanTechniques as KOREAN_TECHNIQUES };
export default KoreanTechniques;
