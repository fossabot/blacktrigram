// Base UI component exports for Korean martial arts game

// Export Korean text components
export * from "./korean-text";

// Export other base components
export { BaseButton } from "./BaseButton";
export { KoreanHeader } from "./KoreanHeader";

// Export PixiJS components
export * from "./KoreanPixiComponents";

// Export background grid (remove duplicate)
export { BackgroundGrid } from "./BackgroundGrid";

// Utility type for Korean UI theming
export interface KoreanUITheme {
  readonly primaryColor: number;
  readonly accentColor: number;
  readonly backgroundColor: number;
  readonly textColor: number;
  readonly fontFamily: string;
}

// Default Korean martial arts theme
export const KOREAN_MARTIAL_THEME: KoreanUITheme = {
  primaryColor: 0xffd700, // GOLD
  accentColor: 0x00ffff, // CYAN
  backgroundColor: 0x000000, // BLACK
  textColor: 0xffffff, // WHITE
  fontFamily: "Noto Sans KR, Arial, sans-serif",
} as const;
