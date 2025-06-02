// Korean typography and font configuration
export const KOREAN_FONT_FAMILY = "Noto Sans KR, Arial, sans-serif" as const;

export const KOREAN_FONT_FAMILY_EXTENDED = {
  PRIMARY: "Noto Sans KR, Arial, sans-serif",
  FALLBACK: "Arial, sans-serif",
} as const;

// Extract primary font family as string for compatibility
export const KOREAN_FONT_FAMILY_STRING = KOREAN_FONT_FAMILY_EXTENDED.PRIMARY;

// For components that expect string type
export const KOREAN_FONT_FAMILY_PRIMARY = KOREAN_FONT_FAMILY;

export const KOREAN_TEXT_SIZES = {
  small: 12,
  medium: 16,
  large: 24,
  xlarge: 32,
  title: 48,
} as const;

export const KOREAN_FONT_SIZES = {
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 24,
  XLARGE: 32,
  TITLE: 48,
} as const;

export const KOREAN_FONT_WEIGHTS = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  BOLD: 700,
  HEAVY: 900,
} as const;

export const KOREAN_LINE_HEIGHTS = {
  TIGHT: 1.2,
  NORMAL: 1.5,
  RELAXED: 1.8,
} as const;
