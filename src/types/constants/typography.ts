import * as PIXI from "pixi.js";
import { KoreanTextSize, KoreanTextWeight } from "../korean-text";
import { KOREAN_COLORS } from "./colors";

// Font Families
export const FONT_FAMILY = {
  PRIMARY: '"Noto Sans KR", "Malgun Gothic", Arial, sans-serif',
  SECONDARY: '"Nanum Gothic", Arial, sans-serif',
  MONO: '"Nanum Gothic Coding", monospace',
  KOREAN_BATTLE: '"Noto Sans KR", Impact, sans-serif',
  CYBER: '"Orbitron", "Noto Sans KR", monospace',
  SYMBOL: '"Arial Unicode MS", Arial, sans-serif',
  KOREAN: '"Noto Sans KR", "Malgun Gothic", Arial, sans-serif',
} as const;

// Fix: Add missing font sizes including xxlarge and xsmall
export const FONT_SIZES = {
  xsmall: 8,
  tiny: 10,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 28,
  huge: 32,
  title: 36,
  subtitle: 28,
} as const;

// Fix: Update FONT_WEIGHTS to include regular
export const FONT_WEIGHTS = {
  light: 300,
  normal: 400,
  regular: 400, // Fix: Add regular
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 900,
} as const;

// Use proper enum mapping for sizes
export const KOREAN_TEXT_SIZES: Record<KoreanTextSize, number> = {
  [KoreanTextSize.TINY]: 10,
  [KoreanTextSize.SMALL]: 12,
  [KoreanTextSize.MEDIUM]: 16,
  [KoreanTextSize.LARGE]: 20,
  [KoreanTextSize.XLARGE]: 24,
  [KoreanTextSize.HUGE]: 32,
};

// Fix: Use proper enum values for font weights
export const KOREAN_FONT_WEIGHTS = {
  [KoreanTextWeight.LIGHT]: 300,
  [KoreanTextWeight.NORMAL]: 400,
  [KoreanTextWeight.MEDIUM]: 500,
  [KoreanTextWeight.SEMIBOLD]: 600,
  [KoreanTextWeight.BOLD]: 700,
  [KoreanTextWeight.HEAVY]: 900,
  // Fix: Add regular as alias for normal
  regular: 400,
} as const;

// Fix: PIXI specific font weights with proper enum mapping
export const PIXI_FONT_WEIGHTS: Record<
  KoreanTextWeight,
  PIXI.TextStyleFontWeight
> = {
  [KoreanTextWeight.LIGHT]: "300",
  [KoreanTextWeight.NORMAL]: "400",
  [KoreanTextWeight.MEDIUM]: "500",
  [KoreanTextWeight.SEMIBOLD]: "600",
  [KoreanTextWeight.BOLD]: "700",
  [KoreanTextWeight.HEAVY]: "900",
};

// Default PIXI TextStyle
export const DEFAULT_PIXI_TEXT_STYLE: Partial<PIXI.TextStyleOptions> = {
  fontFamily: FONT_FAMILY.KOREAN,
  fontSize: KOREAN_TEXT_SIZES[KoreanTextSize.MEDIUM],
  fill: KOREAN_COLORS.TEXT_PRIMARY,
  align: "left",
  wordWrap: false,
  fontWeight: PIXI_FONT_WEIGHTS[KoreanTextWeight.NORMAL],
};

// PIXI Text Style Collections
export const PIXI_TEXT_STYLES = {
  DEFAULT: new PIXI.TextStyle(DEFAULT_PIXI_TEXT_STYLE),
  TITLE: new PIXI.TextStyle({
    ...DEFAULT_PIXI_TEXT_STYLE,
    fontFamily: FONT_FAMILY.KOREAN_BATTLE,
    fontSize: FONT_SIZES.title,
    fontWeight: PIXI_FONT_WEIGHTS[KoreanTextWeight.BOLD],
    fill: KOREAN_COLORS.ACCENT_PRIMARY,
    align: "center",
  }),
  SUBTITLE: new PIXI.TextStyle({
    ...DEFAULT_PIXI_TEXT_STYLE,
    fontSize: FONT_SIZES.large,
    fontWeight: PIXI_FONT_WEIGHTS[KoreanTextWeight.NORMAL],
    fill: KOREAN_COLORS.TEXT_SECONDARY,
    align: "center",
  }),
  BODY: new PIXI.TextStyle({
    ...DEFAULT_PIXI_TEXT_STYLE,
    fontSize: FONT_SIZES.medium,
    lineHeight: FONT_SIZES.medium * 1.5,
  }),
  BUTTON: new PIXI.TextStyle({
    ...DEFAULT_PIXI_TEXT_STYLE,
    fontSize: FONT_SIZES.medium,
    fontWeight: PIXI_FONT_WEIGHTS[KoreanTextWeight.SEMIBOLD],
    fill: KOREAN_COLORS.TEXT_PRIMARY,
    align: "center",
  }),
} as const;

// Fix: Add missing KOREAN_FONT_FAMILY constant
export const KOREAN_FONT_FAMILY = FONT_FAMILY.KOREAN;

// Default styles for HTML elements (React components)
export const HTML_DEFAULT_TEXT_STYLE: React.CSSProperties = {
  fontFamily: KOREAN_FONT_FAMILY,
  fontSize: `${KOREAN_TEXT_SIZES[KoreanTextSize.MEDIUM]}px`,
  color: `#${KOREAN_COLORS.TEXT_PRIMARY.toString(16).padStart(6, "0")}`,
  fontWeight: KOREAN_FONT_WEIGHTS[KoreanTextWeight.NORMAL], // Fix: Use NORMAL instead of regular
};
