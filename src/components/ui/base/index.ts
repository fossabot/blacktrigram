// Base UI component exports for Korean martial arts game

// Background components
export { BackgroundGrid } from "./BackgroundGrid";

// Button components
export { BaseButton } from "./BaseButton";

// Korean text system
export * from "./korean-text";
export { KoreanHeader } from "./KoreanHeader";

// PIXI components
export { default as KoreanPixiComponents } from "./KoreanPixiComponents";
export { default as PixiComponents } from "./PixiComponents";

// Re-export key Korean text utilities
export {
  KOREAN_TEXT_CONSTANTS,
  useKoreanTextStyle,
  createKoreanPixiText,
  getKoreanTextMetrics,
} from "./korean-text";
