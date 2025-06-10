/**
 * Base UI components for Black Trigram Korean martial arts
 */

export { BaseButton } from "./BaseButton";
export { BackgroundGrid } from "./BackgroundGrid";
export { KoreanHeader } from "./KoreanHeader";

// Fix: Export the correct components
export { KoreanPixiComponents, KoreanPixiText } from "./KoreanPixiComponents";
export {
  PixiComponents,
  PixiContainer,
  PixiText,
  PixiGraphics,
} from "./PixiComponents";

// Korean text components
export * from "./korean-text";

// Re-export types
export type { BaseButtonProps } from "../../../types/components";
