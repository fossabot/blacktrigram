/**
 * Korean text components and utilities export
 */

// Components
export { KoreanText } from "./components/KoreanText";
export { KoreanTitle } from "./components/KoreanTitle";
export { KoreanMartialText } from "./components/KoreanMartialText";
export { KoreanStatusText } from "./components/KoreanStatusText";
export { KoreanTechniqueText } from "./components/KoreanTechniqueText";

// Utils - Fix: Use 'export type' for TypeScript isolatedModules
export type { KoreanPixiTextStyle } from "./components/KoreanPixiTextUtils";
export { createKoreanTextStyle } from "./components/KoreanPixiTextUtils";

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
