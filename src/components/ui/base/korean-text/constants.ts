import type {
  KoreanTextStyleInterface, // Use the alias from korean-text.ts
  // KoreanTextVariant, // Unused
  TrigramStance,
  StatusKey, // Ensure StatusKey is defined in enums and imported correctly
  KoreanFontWeight,
  ColorValue,
} from "../../../../types"; // Assuming types are re-exported from here

import {
  KOREAN_COLORS as APP_KOREAN_COLORS,
  KOREAN_COLORS,
} from "../../../../types/constants"; // Alias to avoid conflict

export const KOREAN_FONT_FAMILY = {
  PRIMARY: "Noto Sans KR, Arial, sans-serif",
  FALLBACK: "Arial, sans-serif",
} as const;

export const KOREAN_FONT_WEIGHTS: Record<KoreanFontWeight, number> = {
  light: 300,
  regular: 400,
  normal: 400, // Map normal to regular
  medium: 500,
  bold: 700,
  heavy: 900,
};

export const KOREAN_TEXT_SIZES = {
  small: 12,
  medium: 16,
  large: 24,
  xlarge: 32,
  title: 48,
} as const;

// Alias for compatibility
export const KOREAN_FONT_SIZES = KOREAN_TEXT_SIZES;

// Import KOREAN_COLORS from the main constants
export { KOREAN_COLORS } from "../../../../types/constants";

// Korean martial text presets
export const KOREAN_MARTIAL_TEXT_PRESETS = {
  technique: { size: "medium" as const, weight: 700 },
  philosophy: { size: "large" as const, weight: 500 },
  instruction: { size: "medium" as const, weight: 400 },
  practitioner: { size: "medium" as const, weight: 500 },
} as const;

// Korean status text configuration
export const KOREAN_STATUS_TEXT_CONFIG = {
  default: { showPercentage: false, criticalThreshold: 0.3 },
  health: { showPercentage: true, criticalThreshold: 0.2 },
  ki: { showPercentage: false, criticalThreshold: 0.1 },
} as const;

// Trigram text configuration
export const TRIGRAM_TEXT_CONFIG = {
  geon: { color: KOREAN_COLORS.geon, symbol: "☰" },
  tae: { color: KOREAN_COLORS.tae, symbol: "☱" },
  li: { color: KOREAN_COLORS.li, symbol: "☲" },
  jin: { color: KOREAN_COLORS.jin, symbol: "☳" },
  son: { color: KOREAN_COLORS.son, symbol: "☴" },
  gam: { color: KOREAN_COLORS.gam, symbol: "☵" },
  gan: { color: KOREAN_COLORS.gan, symbol: "☶" },
  gon: { color: KOREAN_COLORS.gon, symbol: "☷" },
} as const;

// Define MARTIAL_COLORS if it's specific to this module
export const MARTIAL_COLORS: Record<string, ColorValue> = {
  techniqueFocus: APP_KOREAN_COLORS.CYAN,
  philosophyAccent: APP_KOREAN_COLORS.GOLD,
  // ... other martial-specific colors
};

export const KOREAN_STATUS_TRANSLATIONS: Record<
  StatusKey,
  { korean: string; english: string }
> = {
  health: { korean: "체력", english: "Health" },
  ki: { korean: "기", english: "Ki" },
  stamina: { korean: "지구력", english: "Stamina" },
  consciousness: { korean: "의식", english: "Consciousness" },
  pain: { korean: "고통", english: "Pain" },
  balance: { korean: "균형", english: "Balance" },
  bloodLoss: { korean: "출혈", english: "Blood Loss" },
  posture: { korean: "자세", english: "Posture" },
  // Add other status keys
};

export const KOREAN_MARTIAL_ARTS_TERMS: Record<
  string,
  { korean: string; english: string; romanized: string }
> = {
  dojang: { korean: "도장", english: "Training Hall", romanized: "Dojang" },
  sabum: {
    korean: "사범",
    english: "Master Instructor",
    romanized: "Sabumnim",
  },
  // ... other terms
};

// Additional configuration objects
export const KOREAN_SIZE_CONFIG = KOREAN_TEXT_SIZES;
export const TRIGRAM_CONFIG = TRIGRAM_TEXT_CONFIG;

// ... other constants
