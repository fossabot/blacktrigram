// Centralized exports for all base UI components

// Base UI Components - Korean Martial Arts Theme
export {
  Container,
  Graphics,
  Text,
  Sprite,
  useApp,
  KoreanContainer,
  KoreanText,
  KoreanHeader,
  KoreanInstruction,
  KoreanPhilosophy,
  KoreanStatus,
} from "./PixiComponents";

// Re-export Korean-specific components
export {
  KoreanButton,
  KoreanTitleText,
  KoreanBodyText,
  KoreanCombatStatus,
} from "./KoreanPixiComponents";

// Base components
export { BaseButton } from "./BaseButton";
export type { BaseButtonProps } from "./BaseButton";

// Re-export types for convenience
export type {
  BasePixiProps,
  KoreanContainerProps,
  KoreanTextProps,
  KoreanHeaderProps,
  KoreanInstructionProps,
  KoreanPhilosophyProps,
  KoreanStatusProps,
} from "./PixiComponents";

export type {
  KoreanButtonProps,
  KoreanTitleTextProps,
  KoreanBodyTextProps,
  KoreanCombatStatusProps,
} from "./KoreanPixiComponents";

// Export common Korean styles and colors from types
export { KOREAN_FONT_FAMILY } from "../../../types";
