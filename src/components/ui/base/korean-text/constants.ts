import { KOREAN_COLORS, FONT_FAMILY } from "../../../../types/constants";
import { KoreanTextVariant, KoreanTextConfig } from "./types";

// Fix: Re-export for local use
export { KOREAN_COLORS, FONT_FAMILY };

// Fix: Add FONT_SIZES export
export const FONT_SIZES = {
  tiny: 10,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  huge: 32,
  title: 36,
} as const;

// Fix: Remove invalid 'warning' variant
export const KOREAN_TEXT_COLORS: Record<KoreanTextVariant, number> = {
  primary: KOREAN_COLORS.TEXT_PRIMARY,
  secondary: KOREAN_COLORS.TEXT_SECONDARY,
  accent: KOREAN_COLORS.TEXT_ACCENT,
  combat: KOREAN_COLORS.NEGATIVE_RED,
};

export const KOREAN_TEXT_VARIANT_SIZES: Record<KoreanTextVariant, number> = {
  primary: 16,
  secondary: 14,
  accent: 20,
  combat: 18,
};

// Fix: Remove invalid 'warning' variant
export const KOREAN_TEXT_VARIANT_CONFIGS: Record<
  KoreanTextVariant,
  KoreanTextConfig
> = {
  primary: {
    variant: "primary",
    size: "medium",
    weight: "regular",
    order: "korean_first",
    cyberpunk: false,
  },
  secondary: {
    variant: "secondary",
    size: "small",
    weight: "light",
    order: "korean_first",
    cyberpunk: false,
  },
  accent: {
    variant: "accent",
    size: "large",
    weight: "bold",
    order: "korean_first",
    cyberpunk: true,
  },
  combat: {
    variant: "combat",
    size: "large",
    weight: "bold",
    order: "korean_first",
    cyberpunk: true,
  },
};

// Korean text system constants

export const KOREAN_TEXT_SIZES = {
  xsmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
  title: 48,
} as const;

export const KOREAN_FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 900,
} as const;

// Export font family for convenience
export const KOREAN_FONT_FAMILY = FONT_FAMILY.PRIMARY;

// Add missing TRIGRAM_SYMBOL_DATA
export const TRIGRAM_SYMBOL_DATA = {
  geon: { symbol: "☰", korean: "건", english: "Heaven" },
  tae: { symbol: "☱", korean: "태", english: "Lake" },
  li: { symbol: "☲", korean: "리", english: "Fire" },
  jin: { symbol: "☳", korean: "진", english: "Thunder" },
  son: { symbol: "☴", korean: "손", english: "Wind" },
  gam: { symbol: "☵", korean: "감", english: "Water" },
  gan: { symbol: "☶", korean: "간", english: "Mountain" },
  gon: { symbol: "☷", korean: "곤", english: "Earth" },
} as const;
