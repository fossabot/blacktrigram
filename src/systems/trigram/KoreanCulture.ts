import { TRIGRAM_DATA, type TrigramStance } from "../../types";

export class KoreanCulture {
  public static getTrigramDescription(stance: TrigramStance): string {
    const data = TRIGRAM_DATA[stance];
    return data?.philosophy ?? `Unknown philosophy for ${stance}`;
  }

  public static getTrigramElement(stance: TrigramStance): string {
    const data = TRIGRAM_DATA[stance];
    return data?.element ?? "Unknown";
  }

  public static getTrigramDirection(stance: TrigramStance): string {
    const data = TRIGRAM_DATA[stance];
    return data?.direction ?? "Unknown";
  }

  public static getTrigramSymbol(stance: TrigramStance): string {
    const data = TRIGRAM_DATA[stance];
    return data?.symbol ?? "?";
  }

  public static getKoreanName(stance: TrigramStance): string {
    const data = TRIGRAM_DATA[stance];
    return data?.korean ?? "Unknown";
  }

  // Add missing methods that systems are calling
  public static getStanceCulture(stance: TrigramStance): {
    philosophy: string;
    element: string;
    direction: string;
  } {
    const data = TRIGRAM_DATA[stance];
    return {
      philosophy: data?.philosophy ?? "Unknown philosophy",
      element: data?.element ?? "Unknown element",
      direction: data?.direction ?? "Unknown direction",
    };
  }

  public static getCultureInfo(stance: TrigramStance): {
    korean: string;
    english: string;
    philosophy: string;
    element: string;
  } {
    const data = TRIGRAM_DATA[stance];
    return {
      korean: data?.korean ?? "Unknown",
      english: data?.english ?? "Unknown",
      philosophy: data?.philosophy ?? "Unknown philosophy",
      element: data?.element ?? "Unknown element",
    };
  }
}

// Export TRIGRAM_DATA for external use
export { TRIGRAM_DATA };
