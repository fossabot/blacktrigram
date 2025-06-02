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

// Constants
export {
  KOREAN_FONT_FAMILIES,
  KOREAN_TEXT_SIZES,
  KOREAN_FONT_SIZES,
  KOREAN_FONT_FAMILY,
  KOREAN_MARTIAL_TEXT_PRESETS,
  KOREAN_STATUS_TRANSLATIONS,
  KOREAN_MARTIAL_ARTS_TERMS,
} from "./constants";

// Types
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
  FontFamily,
} from "./types";
