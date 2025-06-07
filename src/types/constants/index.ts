/**
 * Main constants export for Black Trigram Korean martial arts system
 */

// Re-export all constants from subdirectories
export * from "./colors";
export * from "./combat";
export * from "./controls";
export * from "./game";
export * from "./player";
export * from "./techniques";
export * from "./trigram";
export * from "./typography";
export * from "./vital-points";

// Legacy exports for compatibility
export { KOREAN_COLORS } from "./colors";
export { CYBERPUNK_PALETTE } from "./colors";

// Additional constants that don't fit in specific categories
export const APP_CONSTANTS = {
  NAME: "흑괘 (Black Trigram)",
  VERSION: "1.0.0",
  DESCRIPTION: "Korean Martial Arts Combat Simulator",
} as const;

// Export typography constants
export * from "./typography";

// Re-export font constants for compatibility
export {
  KOREAN_FONT_FAMILY,
  KOREAN_TEXT_SIZES,
  KOREAN_FONT_WEIGHTS,
  KOREAN_BASE_TEXT_STYLES,
  COMBAT_TEXT_STYLES,
  UI_TEXT_STYLES,
} from "./typography";

// Create aliases for backward compatibility
export const FONT_FAMILY = {
  PRIMARY: '"Noto Sans KR", "Malgun Gothic", Arial, sans-serif',
  SECONDARY: '"Nanum Gothic", Arial, sans-serif',
  MONO: '"Nanum Gothic Coding", monospace',
  KOREAN_BATTLE: '"Noto Sans KR", Impact, sans-serif',
} as const;

export const FONT_SIZES = {
  xsmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
  title: 48,
} as const;

export const FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 900,
} as const;
