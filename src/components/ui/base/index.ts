// Clean base exports without naming conflicts

// Export base components
export * from "./BackgroundGrid";
export * from "./BaseButton";
export * from "./KoreanHeader";
export * from "./PixiComponents";

// Export Korean Pixi components with specific names
export {
  KoreanPixiButton,
  KoreanPixiProgressTracker,
  KoreanPixiTrigramWheel,
  KoreanPixiHealthBar,
} from "./KoreanPixiComponents";

// Export Korean text system separately to avoid conflicts
export { KoreanText } from "./korean-text/components/KoreanText";
export { KoreanTitle } from "./korean-text/components/KoreanTitle";
export { KoreanTechniqueText } from "./korean-text/components/KoreanTechniqueText";
export { KoreanStatusText } from "./korean-text/components/KoreanStatusText";

// Export types from korean-text without conflicting names
export type {
  KoreanTextComponentProps,
  KoreanTextSize,
  KoreanTextWeight,
  KoreanTextVariant,
  KoreanTitleProps,
} from "./korean-text/types";

// Export utils
export {
  formatKoreanText,
  sizeToPixels,
  weightToCSSValue,
} from "./korean-text/utils";
