// Korean typography constants for authentic martial arts presentation

// Korean font families prioritized for martial arts game
export const KOREAN_FONT_FAMILIES = {
  PRIMARY: "Noto Sans KR, Arial, sans-serif",
  SECONDARY: "Malgun Gothic, sans-serif",
  TRADITIONAL: "Batang, serif",
  MODERN: "Apple SD Gothic Neo, sans-serif",
} as const;

// Font weights for Korean text
export const KOREAN_FONT_WEIGHTS = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  BOLD: 700,
  HEAVY: 900,
} as const;

// Font sizes for different UI elements
export const KOREAN_FONT_SIZES = {
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 20,
  XLARGE: 24,
  XXLARGE: 32,
  TITLE: 48,
} as const;

// Typography styles for different contexts
export const KOREAN_TEXT_STYLES = {
  BODY: {
    fontFamily: KOREAN_FONT_FAMILIES.PRIMARY,
    fontSize: KOREAN_FONT_SIZES.MEDIUM,
    fontWeight: KOREAN_FONT_WEIGHTS.REGULAR,
  },
  TITLE: {
    fontFamily: KOREAN_FONT_FAMILIES.PRIMARY,
    fontSize: KOREAN_FONT_SIZES.TITLE,
    fontWeight: KOREAN_FONT_WEIGHTS.BOLD,
  },
  TECHNIQUE: {
    fontFamily: KOREAN_FONT_FAMILIES.TRADITIONAL,
    fontSize: KOREAN_FONT_SIZES.LARGE,
    fontWeight: KOREAN_FONT_WEIGHTS.MEDIUM,
  },
  STATUS: {
    fontFamily: KOREAN_FONT_FAMILIES.MODERN,
    fontSize: KOREAN_FONT_SIZES.SMALL,
    fontWeight: KOREAN_FONT_WEIGHTS.REGULAR,
  },
  MARTIAL: {
    fontFamily: KOREAN_FONT_FAMILIES.TRADITIONAL,
    fontSize: KOREAN_FONT_SIZES.XLARGE,
    fontWeight: KOREAN_FONT_WEIGHTS.HEAVY,
  },
} as const;

// Export primary font family for PIXI compatibility
export const KOREAN_FONT_FAMILY = KOREAN_FONT_FAMILIES.PRIMARY;
