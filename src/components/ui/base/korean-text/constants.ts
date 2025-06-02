import type {
  KoreanTextStyleInterface, // Use the alias from korean-text.ts
  // KoreanTextVariant, // Unused
  TrigramStance,
  StatusKey, // Ensure StatusKey is defined in enums and imported correctly
  KoreanFontWeight,
  ColorValue,
} from "../../../../types"; // Assuming types are re-exported from here

import { KOREAN_COLORS as APP_KOREAN_COLORS } from "../../../../types/constants"; // Alias to avoid conflict

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

// ... other constants
