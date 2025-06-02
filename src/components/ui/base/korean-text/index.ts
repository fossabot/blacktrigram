// Components
export { KoreanText } from "./components/KoreanText";
export { KoreanTitle } from "./components/KoreanTitle";
export { KoreanMartialText } from "./components/KoreanMartialText";
export { KoreanTechniqueText } from "./components/KoreanTechniqueText";
export { KoreanStatusText } from "./components/KoreanStatusText";

// Utilities & Hooks
export { useKoreanTextStyle } from "./hooks/useKoreanTextStyle";
export {
  getPixiTextStyle,
  getDynamicTextStyle,
  validateKoreanTextProps,
  // mapFontWeightToPixi, // Export if needed elsewhere
  // createKoreanTextBitmap, // Export if needed elsewhere
} from "./utils"; // Assuming these are in utils.ts

// Constants (ensure these are exported from constants.ts)
export {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
  KOREAN_FONT_SIZES,
  KOREAN_MARTIAL_TEXT_PRESETS,
  KOREAN_STATUS_TEXT_CONFIG,
  TRIGRAM_TEXT_CONFIG,
  KOREAN_SIZE_CONFIG, // Make sure this is defined and exported in constants.ts
  TRIGRAM_CONFIG, // Make sure this is defined and exported in constants.ts
} from "./constants";

// Types (ensure these are exported from types.ts)
export type {
  KoreanTextProps,
  KoreanTitleProps,
  KoreanMartialTextProps,
  KoreanTechniqueTextProps,
  KoreanStatusTextProps,
  KoreanTextHeaderProps,
  KoreanText as KoreanTextType, // Alias if 'KoreanText' component name conflicts
  KoreanTextSize,
  MartialVariant,
  KoreanTextVariant,
  KoreanTextEmphasis,
  HonorLevel,
  FontWeight,
  FontFamily,
  TrigramStance,
  // KoreanTextStyle, // This was an interface, use KoreanTextStyleInterface from global types if needed
  // KoreanTextStyleType, // This was an enum, ensure it's defined and exported if needed
  // PixiTextStyleConfig, // If this is a local type, ensure it's exported
} from "./types";
