// Korean text system exports

// Component exports
export { KoreanText } from "./KoreanText";
export * from "./components";

// Type exports
export type * from "./types";

// Utility exports
export {
  isKoreanCharacter,
  hasKoreanText,
  validateKoreanText,
  formatKoreanText,
  getTextConfigForVariant,
  sizeToPixels,
  weightToCSSValue,
} from "./utils";

// Hook exports
export * from "./hooks/useKoreanTextStyle";

// Constant exports
export {
  KOREAN_TEXT_COLORS,
  KOREAN_TEXT_VARIANT_SIZES,
  KOREAN_TEXT_VARIANT_CONFIGS,
} from "./constants";
