/**
 * Korean text component exports for Black Trigram martial arts game
 */

// Fix: Export component with different name to avoid conflict
export { KoreanText as KoreanPixiTextComponent } from "./components/KoreanText";
export { KoreanTitle } from "./components/KoreanTitle";
export { KoreanMartialText } from "./components/KoreanMartialText";
export { KoreanStatusText } from "./components/KoreanStatusText";
export { KoreanTechniqueText } from "./components/KoreanTechniqueText";

// Fix: Export the correct utilities with proper imports
export {
  createKoreanTextStyle,
  getDisplayText,
  KOREAN_TEXT_STYLES,
} from "./components/KoreanPixiTextUtils";

// Re-export types
export type { KoreanTextProps } from "./components/KoreanText";
export type { KoreanTitleProps } from "./components/KoreanTitle";
export type { KoreanMartialTextProps } from "./components/KoreanMartialText";
export type { KoreanStatusTextProps } from "./components/KoreanStatusText";
export type { KoreanTechniqueTextProps } from "./components/KoreanTechniqueText";
export type { KoreanPixiTextProps } from "./components/KoreanPixiTextUtils";

// Fix: Add backward compatibility export
export { KoreanText } from "./components/KoreanText";

// Types
export type * from "./types";

// Constants - Fix: Use correct export names
export {
  KOREAN_TEXT_SIZES,
  KOREAN_FONT_FAMILY,
  // Remove incorrect exports
} from "./constants";

// Hooks
export { useKoreanTextStyle } from "./hooks/useKoreanTextStyle";

// Utils
export * from "./utils";
