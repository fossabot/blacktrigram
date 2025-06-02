// Typography constants for Korean martial arts game

export const KOREAN_FONT_FAMILY_PRIMARY = "Noto Sans KR, Arial, sans-serif";
export const KOREAN_FONT_FAMILY_SECONDARY = "Malgun Gothic, sans-serif";

// Legacy export for backward compatibility
export const KOREAN_FONT_FAMILY = KOREAN_FONT_FAMILY_PRIMARY;

export const KOREAN_TEXT_SIZES = {
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 20,
  XLARGE: 24,
  XXLARGE: 32,
} as const;

export const KOREAN_FONT_SIZES = KOREAN_TEXT_SIZES; // Alias for compatibility

export const KOREAN_FONT_WEIGHTS = {
  LIGHT: "300",
  REGULAR: "400",
  MEDIUM: "500",
  BOLD: "700",
  HEAVY: "900",
} as const;

export const KOREAN_LINE_HEIGHTS = {
  TIGHT: 1.2,
  NORMAL: 1.5,
  RELAXED: 1.8,
} as const;
