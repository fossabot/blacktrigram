// Centralized exports for all base UI components

// PixiJS Components
export * from "./PixiComponents";

// Korean-specific components
export {
  KoreanText,
  KoreanTitle,
  KoreanSubtitle,
  KoreanInstruction,
  KoreanButton,
  CombatFeedback,
} from "./KoreanPixiComponents";

// Base components
export { BackgroundGrid } from "./BackgroundGrid";
export { BaseButton } from "./BaseButton";

// Korean text utilities
export {
  isKoreanText,
  formatKoreanTechniqueName,
  KOREAN_MARTIAL_TERMS,
} from "./KoreanText";

// Re-export PixiJS React components for convenience
export { Container, Graphics, Text } from "@pixi/react";
