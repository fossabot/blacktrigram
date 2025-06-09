/**
 * Main constants export for Black Trigram Korean martial arts system
 */

// This file re-exports constants from other files in this directory.
// Ensure that there are no naming conflicts between re-exported members.

// Re-export all constants from individual files
export * from "./animations";
export * from "./colors";
export * from "./combat";
export * from "./controls";
export * from "./game";
export * from "./player";
export * from "./techniques";
export * from "./trigram";
export * from "./typography";
export * from "./ui";
export * from "./vital-points";

// Fix: Ensure KOREAN_COLORS is available from main exports
export { KOREAN_COLORS } from "./colors";

// Additional exports that might be needed
export const TRIGRAM_STANCES_ORDER = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
] as const;

export const FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 900,
} as const;

// Legacy export for compatibility
export { KOREAN_FONT_WEIGHTS as FONT_WEIGHTS_LEGACY } from "./typography";

// Explicitly export from typography if they were missed by wildcard
export {
  FONT_FAMILY,
  FONT_SIZES,
  KOREAN_TEXT_SIZES,
  KOREAN_FONT_WEIGHTS,
  KOREAN_FONT_FAMILY, // Ensure this is exported from typography.ts
  // KOREAN_FONT_FAMILY_PRIMARY, // If these are distinct and needed, ensure they are defined and exported
  // KOREAN_FONT_FAMILY_SECONDARY,
  PIXI_TEXT_STYLES,
  CYBERPUNK_TEXT_STYLES,
} from "./typography";

// Resolve specific export conflicts if they exist by aliasing or choosing one source
// Example: if COMBAT_CONTROLS is in both ./combat and ./controls
// import { COMBAT_CONTROLS as GameCombatControls } from "./combat";
// import { COMBAT_CONTROLS as UiCombatControls } from "./controls";
// export { GameCombatControls, UiCombatControls };
