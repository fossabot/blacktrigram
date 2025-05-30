// Centralized exports for all base UI components

// Base UI Components - Korean Martial Arts Theme
export {
  Stage,
  Container,
  Graphics,
  Text,
  Sprite,
  useTick,
  useApp,
  KoreanPixiContainer,
  KOREAN_TEXT_STYLE,
  KOREAN_COLORS, // Now properly exported from PixiComponents
} from "./PixiComponents";

export {
  KoreanText,
  KoreanHeader,
  KoreanTitle,
  KoreanSubtitle,
  KoreanInstruction,
  CombatFeedback,
  KOREAN_TEXT_STYLES,
} from "./KoreanPixiComponents";

// Base components
export { BaseButton } from "./BaseButton";
export { BackgroundGrid } from "./BackgroundGrid";

// Korean text utilities
export {
  isKoreanText,
  formatKoreanTechniqueName,
  KOREAN_MARTIAL_TERMS,
} from "./KoreanText";

// Export types
export type {
  BasePixiProps,
  PixiContainerProps,
  PixiGraphicsProps,
  PixiTextProps,
  PixiSpriteProps,
  KoreanPixiContainerProps,
} from "./PixiComponents";

export type {
  KoreanTextProps,
  KoreanHeaderProps,
  KoreanTitleProps,
  KoreanSubtitleProps,
  KoreanInstructionProps,
  CombatFeedbackProps,
} from "./KoreanPixiComponents";
