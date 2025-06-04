// Korean typography constants for Black Trigram

// Korean font families for authentic display
export const KOREAN_FONT_FAMILY_PRIMARY = "Noto Sans KR";
export const KOREAN_FONT_FAMILY_SECONDARY = "Malgun Gothic, 맑은 고딕";

// Korean text sizes mapping
export const KOREAN_TEXT_SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
  title: 48,
} as const;

// Korean font weights
export const KOREAN_FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  heavy: 900,
} as const;

// Korean text styles for martial arts context
export const KOREAN_TEXT_STYLES = {
  normal: "normal",
  italic: "italic",
  traditional: "traditional", // For classical Korean text
  modern: "modern", // For contemporary Korean text
  cyberpunk: "cyberpunk", // For game aesthetic
} as const;

// Combined font family string
export const KOREAN_FONT_FAMILY_COMBINED = `${KOREAN_FONT_FAMILY_PRIMARY}, ${KOREAN_FONT_FAMILY_SECONDARY}, Arial, sans-serif`;

// Korean martial arts specific typography
export const MARTIAL_ARTS_TYPOGRAPHY = {
  technique_names: {
    fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
    fontSize: 18,
    fontWeight: 700,
    color: 0xffd700, // Gold for technique names
  },
  stance_labels: {
    fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
    fontSize: 16,
    fontWeight: 500,
    color: 0x00ffff, // Cyan for stance labels
  },
  damage_numbers: {
    fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
    fontSize: 24,
    fontWeight: 900,
    color: 0xff4500, // Red-orange for damage
  },
  philosophy_text: {
    fontFamily: KOREAN_FONT_FAMILY_SECONDARY,
    fontSize: 14,
    fontWeight: 400,
    color: 0xf5f5dc, // Hanbok white for philosophy
  },
} as const;

// Typography scales for responsive design
export const TYPOGRAPHY_SCALE = {
  base: 16,
  ratio: 1.25, // Major third scale
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 20,
    xl: 25,
    "2xl": 31,
    "3xl": 39,
    "4xl": 49,
    "5xl": 61,
  },
} as const;

// Line heights optimized for Korean text
export const KOREAN_LINE_HEIGHTS = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2.0,
} as const;

// Letter spacing for Korean characters
export const KOREAN_LETTER_SPACING = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

// Export main font family for backward compatibility
export const KOREAN_FONT_FAMILY = KOREAN_FONT_FAMILY_COMBINED;

// Additional Korean typography constants
export const KOREAN_FONTS = {
  PRIMARY: "Noto Sans KR",
  FALLBACK: "Arial, sans-serif",
  TRADITIONAL: "Nanum Myeongjo",
  MODERN: "Noto Sans KR",
} as const;

export const FONT_WEIGHTS = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  BOLD: 700,
  HEAVY: 900,
} as const;

export const FONT_SIZES = {
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 24,
  XLARGE: 32,
  TITLE: 48,
  MASSIVE: 64,
} as const;

export const TEXT_STYLES = {
  TECHNIQUE_NAME: {
    fontFamily: KOREAN_FONTS.PRIMARY,
    fontSize: FONT_SIZES.LARGE,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  STANCE_DISPLAY: {
    fontFamily: KOREAN_FONTS.TRADITIONAL,
    fontSize: FONT_SIZES.TITLE,
    fontWeight: FONT_WEIGHTS.HEAVY,
  },
  UI_ELEMENT: {
    fontFamily: KOREAN_FONTS.PRIMARY,
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
} as const;
