// Typography constants for Korean martial arts game

// Korean font families optimized for martial arts display
export const KOREAN_FONT_FAMILIES = {
  PRIMARY: "Noto Sans KR, Arial, sans-serif",
  SECONDARY: "Malgun Gothic, sans-serif",
  MONOSPACE: "D2Coding, monospace",
  TRADITIONAL: "Batang, serif",
} as const;

// Font sizes for Korean text (in pixels)
export const KOREAN_FONT_SIZES = {
  TINY: 10,
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 20,
  XLARGE: 24,
  XXLARGE: 32,
  TITLE: 48,
} as const;

// Korean font weights (numeric for cross-platform compatibility)
export const KOREAN_FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  heavy: 900,
} as const;

// Line height ratios for Korean text readability
export const KOREAN_LINE_HEIGHT = {
  TIGHT: 1.2,
  NORMAL: 1.4,
  RELAXED: 1.6,
  LOOSE: 1.8,
} as const;

// Letter spacing for Korean characters
export const KOREAN_LETTER_SPACING = {
  TIGHT: -0.5,
  NORMAL: 0,
  WIDE: 1,
  EXTRA_WIDE: 2,
} as const;

// Text shadow configurations for cyberpunk styling
export const KOREAN_TEXT_SHADOWS = {
  NONE: "none",
  SUBTLE: "1px 1px 2px rgba(0,0,0,0.3)",
  STRONG: "2px 2px 4px rgba(0,0,0,0.5)",
  GLOW: "0 0 10px currentColor",
  NEON: "0 0 20px currentColor, 0 0 40px currentColor",
} as const;

// Cyberpunk Korean text effects
export const KOREAN_TEXT_EFFECTS = {
  GLITCH: {
    textShadow: "2px 0 #ff0000, -2px 0 #00ffff",
    animation: "glitch 0.3s infinite",
  },
  HOLOGRAM: {
    textShadow: "0 0 5px currentColor, 0 0 10px currentColor",
    opacity: 0.9,
  },
  MATRIX: {
    textShadow: "0 0 10px #00ff00, 0 0 20px #00ff00",
    color: "#00ff00",
  },
} as const;

// Legacy export for backward compatibility
export const KOREAN_FONT_FAMILY = "Noto Sans KR, Arial, sans-serif";
