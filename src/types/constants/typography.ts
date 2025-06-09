import * as PIXI from "pixi.js"; // Import PIXI
import type { KoreanTextSize, KoreanFontWeight } from "../korean-text"; // Corrected path
import { KOREAN_COLORS } from "./colors"; // Assuming KOREAN_COLORS is defined here

// Font Families
export const FONT_FAMILY = {
  PRIMARY: '"Noto Sans KR", "Malgun Gothic", Arial, sans-serif',
  SECONDARY: '"Nanum Gothic", Arial, sans-serif',
  MONO: '"Nanum Gothic Coding", monospace',
  KOREAN_BATTLE: '"Noto Sans KR", Impact, sans-serif', // For impactful in-game text
  CYBER: '"Orbitron", "Noto Sans KR", monospace', // Cyberpunk style font
  SYMBOL: '"Arial Unicode MS", Arial, sans-serif', // For special symbols like Trigrams
  KOREAN: '"Noto Sans KR", "Malgun Gothic", Arial, sans-serif', // General Korean font
} as const;

export const KOREAN_FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600, // Add missing semibold
  bold: 700,
  heavy: 900,
} as const;

// Export both names for compatibility
export const FONT_WEIGHTS = KOREAN_FONT_WEIGHTS;

// Add missing font family exports
export const KOREAN_FONT_FAMILY = "Noto Sans KR, Arial, sans-serif"; // Ensure this is defined and exported

// Font Sizes (Numeric values in pixels)
export const KOREAN_TEXT_SIZES: Record<
  KoreanTextSize | "default" | "extraLarge",
  number
> = {
  default: 16, // Default size if not specified
  xsmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
  extraLarge: 36, // Add missing size
  title: 48,
};
export const FONT_SIZES: Record<
  KoreanTextSize | "default" | "extraLarge" | "title" | "xsmall" | "xxlarge",
  number
> = {
  [KoreanTextSize.TINY]: 10,
  [KoreanTextSize.SMALL]: 12,
  [KoreanTextSize.MEDIUM]: 16,
  [KoreanTextSize.LARGE]: 20,
  [KoreanTextSize.XLARGE]: 24,
  [KoreanTextSize.HUGE]: 32,
  default: 16,
  extraLarge: 28,
  title: 36,
  xsmall: 10,
  xxlarge: 40,
} as const; // Alias for general use

// PIXI specific font weights (must be strings as per PIXI.TextStyleFontWeight)
export const PIXI_FONT_WEIGHTS: Record<
  Extract<KoreanFontWeight, string>,
  PIXI.TextStyleFontWeight
> = {
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  heavy: "900",
};

// Default PIXI TextStyle (example)
export const DEFAULT_PIXI_TEXT_STYLE: Partial<PIXI.TextStyleOptions> = {
  fontFamily: KOREAN_FONT_FAMILY,
  fontSize: KOREAN_TEXT_SIZES.medium,
  fill: KOREAN_COLORS.TEXT_PRIMARY,
  align: "left",
  wordWrap: false,
  fontWeight: PIXI_FONT_WEIGHTS.regular,
};

// Example of PIXI.TextStyle.defaultTextStyle usage (if needed, though direct creation is common)
// const defaultPixiFontWeight = PIXI.TextStyle.defaultTextStyle.fontWeight;

// PIXI Text Style Collections
export const PIXI_TEXT_STYLES = {
  DEFAULT: new PIXI.TextStyle(DEFAULT_PIXI_TEXT_STYLE),
  TITLE: new PIXI.TextStyle({
    ...DEFAULT_PIXI_TEXT_STYLE,
    fontFamily: FONT_FAMILY.KOREAN_BATTLE,
    fontSize: KOREAN_TEXT_SIZES.title,
    fontWeight: PIXI_FONT_WEIGHTS.bold,
    fill: KOREAN_COLORS.ACCENT_PRIMARY,
    align: "center",
  }),
  SUBTITLE: new PIXI.TextStyle({
    ...DEFAULT_PIXI_TEXT_STYLE,
    fontSize: KOREAN_TEXT_SIZES.large,
    fontWeight: PIXI_FONT_WEIGHTS.regular,
    fill: KOREAN_COLORS.TEXT_SECONDARY,
    align: "center",
  }),
  BODY: new PIXI.TextStyle({
    ...DEFAULT_PIXI_TEXT_STYLE,
    fontSize: KOREAN_TEXT_SIZES.medium,
    lineHeight: KOREAN_TEXT_SIZES.medium * 1.5,
  }),
  BUTTON: new PIXI.TextStyle({
    ...DEFAULT_PIXI_TEXT_STYLE,
    fontSize: KOREAN_TEXT_SIZES.medium,
    fontWeight: PIXI_FONT_WEIGHTS.semibold,
    fill: KOREAN_COLORS.TEXT_PRIMARY,
    align: "center",
  }),
  DEBUG: new PIXI.TextStyle({
    fontFamily: FONT_FAMILY.MONO,
    fontSize: KOREAN_TEXT_SIZES.small,
    fill: KOREAN_COLORS.DEBUG_TEXT,
    align: "left",
  }),
  // Add more predefined styles as needed
} as const;

// Cyberpunk specific text styles
export const CYBERPUNK_TEXT_STYLES = {
  // ... (define cyberpunk styles using CYBERPUNK_PALETTE and FONT_FAMILY.CYBER)
  // Example:
  HEADER: new PIXI.TextStyle({
    fontFamily: FONT_FAMILY.CYBER,
    fontSize: KOREAN_TEXT_SIZES.xlarge,
    fill: KOREAN_COLORS.PRIMARY_CYAN, // Using KOREAN_COLORS as CYBERPUNK_PALETTE might not be fully defined
    stroke: { color: KOREAN_COLORS.BLACK_SOLID, width: 2 },
    dropShadow: {
      color: KOREAN_COLORS.ACCENT_MAGENTA,
      alpha: 0.7,
      angle: Math.PI / 4,
      blur: 4,
      distance: 3,
    },
    align: "center",
  }),
  BODY_NEON: new PIXI.TextStyle({
    fontFamily: FONT_FAMILY.CYBER,
    fontSize: KOREAN_TEXT_SIZES.medium,
    fill: KOREAN_COLORS.ACCENT_GREEN,
    dropShadow: {
      color: KOREAN_COLORS.ACCENT_GREEN,
      alpha: 0.5,
      blur: 8,
      distance: 0,
    },
  }),
  // ...
} as const;

// For KOREAN_UI font family, ensure FONT_FAMILY.KOREAN is used or define FONT_FAMILY.KOREAN_UI
// If KOREAN_UI was meant to be FONT_FAMILY.KOREAN:
// export const KOREAN_UI_TEXT_STYLE_OPTIONS: Partial<PIXI.TextStyleOptions> = {
//   fontFamily: FONT_FAMILY.KOREAN, // Corrected
//   fontSize: KOREAN_TEXT_SIZES.medium,
//   fill: KOREAN_COLORS.TEXT_UI_PRIMARY,
// };

// Default styles for HTML elements (React components)
export const HTML_DEFAULT_TEXT_STYLE: React.CSSProperties = {
  fontFamily: KOREAN_FONT_FAMILY,
  fontSize: `${KOREAN_TEXT_SIZES.medium}px`,
  color: `#${KOREAN_COLORS.TEXT_PRIMARY.toString(16).padStart(6, "0")}`,
  fontWeight: KOREAN_FONT_WEIGHTS.regular,
};
