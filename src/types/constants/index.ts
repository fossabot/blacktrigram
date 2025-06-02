// filepath: /workspaces/blacktrigram/src/types/constants/index.ts
// Export all constants from their respective files
export * from "./colors";
export * from "./combat";
export * from "./game";
export * from "./player";
export * from "./techniques";
export * from "./trigram";
export * from "./typography";
export * from "./vital-points";

// UI layout constants
export const UI_LAYOUT = {
  HEADER_HEIGHT: 80,
  SIDEBAR_WIDTH: 250,
  FOOTER_HEIGHT: 60,
  PADDING: 16,
  BORDER_RADIUS: 8,
} as const;

// Combat timing constants
export const COMBAT_TIMING = {
  ATTACK_WINDOW_MS: 200,
  COUNTER_WINDOW_MS: 150,
  BLOCK_WINDOW_MS: 300,
  STANCE_CHANGE_DURATION_MS: 400,
  RECOVERY_TIME_MS: 500,
} as const;

// Korean font family constants for consistent typography
export const KOREAN_FONT_FAMILY_PRIMARY = "Noto Sans KR, Arial, sans-serif";
export const KOREAN_FONT_FAMILY_SECONDARY = "Malgun Gothic, sans-serif";
export const KOREAN_FONT_FAMILY_MONOSPACE = "D2Coding, monospace";

// Additional UI constants for Korean martial arts theme
export const KOREAN_UI_CONSTANTS = {
  HEADER_HEIGHT: 80,
  SIDEBAR_WIDTH: 280,
  CARD_BORDER_RADIUS: 8,
  TRANSITION_DURATION: "0.3s",
  BOX_SHADOW: "0 4px 8px rgba(0,0,0,0.3)",
} as const;
