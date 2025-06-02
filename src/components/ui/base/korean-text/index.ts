// Main exports for Korean text system
export { KoreanText } from "./components/KoreanText";
export { KoreanTitle } from "./components/KoreanTitle";
export { KoreanTechniqueText } from "./components/KoreanTechniqueText";
export { KoreanStatusText } from "./components/KoreanStatusText";
export { KoreanMartialText } from "./components/KoreanMartialText";

// Export types
export type * from "./types";

// Export constants
export * from "./constants";

// Export utils (avoid conflicts)
export {
  isKoreanCharacter,
  hasKoreanText,
  formatKoreanNumber,
  validateKoreanText,
  KoreanTextUtils,
  measureKoreanText,
  cssToPixiTextStyle,
} from "./utils";

// Export hooks
export { useKoreanTextStyle } from "./hooks/useKoreanTextStyle";

// Default export for compatibility
export { KoreanText as default } from "./components/KoreanText";
