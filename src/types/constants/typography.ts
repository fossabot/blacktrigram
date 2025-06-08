import * as PIXI from "pixi.js";
import { KOREAN_FONT_WEIGHTS, KOREAN_TEXT_SIZES } from ".";

// Typography constants for Korean martial arts UI

// Font families optimized for Korean text display
export const FONT_FAMILY = {
  PRIMARY: '"Noto Sans KR", "Malgun Gothic", Arial, sans-serif',
  SECONDARY: '"Nanum Gothic", Arial, sans-serif',
  MONO: '"Nanum Gothic Coding", monospace',
  KOREAN_BATTLE: '"Noto Sans KR", Impact, sans-serif',
  CYBER: '"Orbitron", "Noto Sans KR", monospace', // Ensure this line is present

  // Add missing font families for backwards compatibility
  KOREAN: '"Noto Sans KR", "Malgun Gothic", Arial, sans-serif',
  ENGLISH: 'Arial, "Helvetica Neue", sans-serif',
} as const;

// Font sizes for different UI elements
export const FONT_SIZES = {
  xsmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
  extraLarge: 36, // Ensure this line is present
  title: 48,

  // Add missing font sizes
  huge: 64,
  massive: 80,
} as const;

// Font weights for Korean text
export const FONT_WEIGHTS = {
  thin: 100,
  extraLight: 200,
  light: 300,
  regular: 400, // Corresponds to 'normal'
  medium: 500,
  semiBold: 600,
  bold: 700, // Corresponds to 'bold'
  extraBold: 800,
  black: 900,
} as const;

// Mapping for PIXI.TextStyleFontWeight which expects specific string values or numbers
export const PIXI_FONT_WEIGHTS: Record<
  keyof typeof FONT_WEIGHTS,
  typeof PIXI.TextStyle.defaultStyle.fontWeight
> = {
  thin: "100",
  extraLight: "200",
  light: "300",
  regular: "normal", // or "400"
  medium: "500",
  semiBold: "600",
  bold: "bold", // or "700"
  extraBold: "800",
  black: "900",
} as const;

// Line heights optimized for Korean text readability
export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
  loose: 2.0,
} as const;

// Letter spacing for Korean characters
export const LETTER_SPACING = {
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
} as const;

// Legacy aliases
export const FONT_SIZES_LEGACY = FONT_SIZES;
export const FONT_WEIGHTS_LEGACY = KOREAN_FONT_WEIGHTS;

// Korean text size constants
export const KOREAN_TEXT_SIZES_LEGACY = {
  xsmall: 12,
  small: 16, // Korean text needs slightly larger sizes
  medium: 20,
  large: 28,
  xlarge: 36,
  xxlarge: 52,
} as const;

// Korean font weight constants
export const KOREAN_FONT_WEIGHTS_LEGACY = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
} as const;

// PixiJS compatible text style options
export interface KoreanTextStyleOptions extends Partial<PIXI.TextStyleOptions> {
  // Korean specific extensions
  hangeulSpacing?: number;
  verticalAlignment?: "top" | "middle" | "bottom";
  koreanEmphasis?: "normal" | "bold" | "outline" | "glow";
}

// Base Korean text styles for different contexts
export const KOREAN_BASE_TEXT_STYLES: Record<string, KoreanTextStyleOptions> = {
  default: {
    fontFamily: FONT_FAMILY.KOREAN_UI,
    fontSize: KOREAN_TEXT_SIZES.medium,
    fontWeight:
      KOREAN_FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight,
    fill: 0xffffff,
    align: "left",
  },
  title: {
    fontFamily: FONT_FAMILY.KOREAN_UI,
    fontSize: KOREAN_TEXT_SIZES.xxlarge,
    fontWeight: KOREAN_FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
    fill: 0x00ffcc,
    align: "center",
  },
  body: {
    fontFamily: FONT_FAMILY.KOREAN_UI,
    fontSize: KOREAN_TEXT_SIZES.medium,
    fontWeight:
      KOREAN_FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight,
    fill: 0xcccccc,
    wordWrap: true,
    wordWrapWidth: 400,
  },
  small: {
    fontFamily: FONT_FAMILY.KOREAN_UI,
    fontSize: KOREAN_TEXT_SIZES.small,
    fontWeight:
      KOREAN_FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight,
    fill: 0x999999,
  },
};

// Combat specific text styles
export const COMBAT_TEXT_STYLES: Record<string, KoreanTextStyleOptions> = {
  damage: {
    fontFamily: FONT_FAMILY.KOREAN_UI,
    fontSize: KOREAN_TEXT_SIZES.large,
    fontWeight: KOREAN_FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
    fill: 0xff4444,
    stroke: { color: 0x000000, width: 2 },
  },
  critical: {
    fontFamily: FONT_FAMILY.KOREAN_UI,
    fontSize: KOREAN_TEXT_SIZES.xlarge,
    fontWeight:
      KOREAN_FONT_WEIGHTS.black.toString() as PIXI.TextStyleFontWeight,
    fill: 0xffaa00,
    stroke: { color: 0x000000, width: 3 },
    dropShadow: {
      color: 0xff0000,
      blur: 4,
      distance: 2,
    },
  },
  status: {
    fontFamily: FONT_FAMILY.KOREAN_UI,
    fontSize: KOREAN_TEXT_SIZES.small,
    fontWeight:
      KOREAN_FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight,
    fill: 0x00ff88,
  },
};

// UI specific text styles
export const UI_TEXT_STYLES: Record<string, KoreanTextStyleOptions> = {
  button: {
    fontFamily: FONT_FAMILY.KOREAN_UI,
    fontSize: KOREAN_TEXT_SIZES.medium,
    fontWeight:
      KOREAN_FONT_WEIGHTS.semibold.toString() as PIXI.TextStyleFontWeight,
    fill: 0xffffff,
    align: "center",
  },
  menu: {
    fontFamily: FONT_FAMILY.KOREAN_UI,
    fontSize: KOREAN_TEXT_SIZES.large,
    fontWeight:
      KOREAN_FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight,
    fill: 0x00ffcc,
    align: "center",
  },
  label: {
    fontFamily: FONT_FAMILY.KOREAN_UI,
    fontSize: KOREAN_TEXT_SIZES.small,
    fontWeight:
      KOREAN_FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight,
    fill: 0xaaaaaa,
  },
};

// Export convenience type
export type KoreanTextSize = keyof typeof KOREAN_TEXT_SIZES;
export type KoreanFontWeight = keyof typeof KOREAN_FONT_WEIGHTS;
