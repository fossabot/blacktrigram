/**
 * Base UI components for Black Trigram Korean martial arts
 */

export { BackgroundGrid } from "./BackgroundGrid";
export { BaseButton } from "./BaseButton";
export { KoreanHeader } from "./KoreanHeader";
export { KoreanPixiComponents } from "./KoreanPixiComponents";
export {
  PixiContainer,
  PixiGraphics,
  PixiText,
  PixiSprite,
  // Fix: Remove PixiComponents - export individual components instead
} from "./PixiComponents";

// Fix: Export the default export from PixiComponents as PixiUtils
export { default as PixiUtils } from "./PixiComponents";

// Korean text components
export * from "./korean-text";

// Re-export types
export type { BaseButtonProps } from "../../../types/components";
