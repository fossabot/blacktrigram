// Main components - import from components index
export {
  KoreanText,
  KoreanTitle,
  KoreanMartialText,
  KoreanTechniqueText,
  KoreanStatusText,
  KoreanPixiTextUtils,
} from "./components";

// Utilities and helpers
export {
  KoreanTextUtils,
  validateKoreanText,
  hasKoreanText,
  isKoreanCharacter,
  cssToPixiTextStyle,
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
  TrigramKey,
  KoreanTextVariant,
  KoreanTextEmphasis,
  HonorLevel,
} from "./types";
