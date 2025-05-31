// Main components
export { KoreanText } from "./components/KoreanText";
export { KoreanMartialText } from "./components/KoreanMartialText";
export { KoreanTechniqueText } from "./components/KoreanTechniqueText";
export { KoreanStatusText } from "./components/KoreanStatusText";
export { KoreanTitle } from "./components/KoreanTitle";

// PixiJS utilities
export { KoreanPixiTextUtils } from "./components/KoreanPixiTextUtils";

// Utilities and helpers
export {
  KoreanTextUtils,
  validateKoreanText,
  hasKoreanText,
  isKoreanCharacter,
} from "./utils";

// Hooks
export { useKoreanTextStyle } from "./hooks/useKoreanTextStyle";

// Constants
export {
  KOREAN_SIZE_CONFIG,
  MARTIAL_COLORS,
  KOREAN_STATUS_TRANSLATIONS,
  TRIGRAM_CONFIG,
} from "./constants";

// Types
export type {
  KoreanTextProps,
  KoreanMartialTextProps,
  KoreanTechniqueTextProps,
  KoreanStatusTextProps,
  KoreanTitleProps,
  PixiTextStyleOptions,
  KoreanTextSize,
  MartialVariant,
  StatusKey,
  KoreanTextVariant,
  KoreanTextEmphasis,
  HonorLevel,
} from "./types";
