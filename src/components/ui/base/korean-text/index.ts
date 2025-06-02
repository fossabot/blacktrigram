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
  validateKoreanText,
  KoreanTextUtils,
  measureKoreanText,
  cssToPixiTextStyle,
} from "./utils";

// Constants (ensure these are exported from constants.ts)
export {
  KOREAN_FONT_FAMILIES,
  KOREAN_TEXT_SIZES,
  KOREAN_FONT_SIZES, // Alias
  KOREAN_FONT_FAMILY, // Alias
  KOREAN_MARTIAL_TEXT_PRESETS,
  KOREAN_STATUS_TRANSLATIONS,
  KOREAN_MARTIAL_ARTS_TERMS,
} from "./constants";

// Types (ensure these are exported from types.ts)
export type {
  KoreanTextProps,
  KoreanTitleProps,
  KoreanMartialTextProps,
  KoreanTechniqueTextProps,
  KoreanStatusTextProps,
  KoreanTextHeaderProps,
  KoreanText as KoreanTextType,
  KoreanTextSize,
  MartialVariant,
  KoreanTextVariant,
  KoreanTextEmphasis,
  HonorLevel,
  KoreanFontWeight,
  FontFamily,
} from "./types";
