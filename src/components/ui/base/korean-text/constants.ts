import type {
  KoreanTextStyle,
  MartialVariant,
  TrigramStance,
  StatusKey, // Ensure StatusKey is defined in enums and imported correctly
  KoreanFontWeight,
  ColorValue,
} from "../../../../types"; // Assuming types are re-exported from here

import {
  KOREAN_COLORS as APP_KOREAN_COLORS,
  KOREAN_COLORS,
} from "../../../../types/constants"; // Alias to avoid conflict

// Korean Font Weights (uppercase for consistency)
export const KOREAN_FONT_WEIGHTS: Record<string, number> = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  BOLD: 700,
  HEAVY: 900,
} as const;

// Korean Text Sizes
export const KOREAN_TEXT_SIZES = {
  small: 12,
  medium: 16,
  large: 24,
  xlarge: 32,
  title: 48,
} as const;

// Korean Font Families
export const KOREAN_FONT_FAMILIES = {
  primary: "Noto Sans KR, Arial, sans-serif",
  traditional: "Noto Serif KR, serif",
  modern: "Nanum Gothic, sans-serif",
} as const;

// Martial Text Style Presets
export const KOREAN_MARTIAL_TEXT_PRESETS: Record<
  MartialVariant,
  KoreanTextStyle
> = {
  technique: {
    size: "medium",
    weight: "BOLD",
  },
  philosophy: {
    size: "large",
    weight: "MEDIUM",
  },
  instruction: {
    size: "medium",
    weight: "REGULAR",
  },
  practitioner: {
    size: "medium",
    weight: "REGULAR",
  },
  master: {
    size: "large",
    weight: "BOLD",
  },
  honor: {
    size: "medium",
    weight: "MEDIUM",
  },
  discipline: {
    size: "medium",
    weight: "MEDIUM",
  },
} as const;

// Status translations - simplified for available StatusKey values
export const KOREAN_STATUS_TRANSLATIONS = {
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

// Korean martial arts terms
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
