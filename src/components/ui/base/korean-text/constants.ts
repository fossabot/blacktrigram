import type { MartialVariant } from "../../../../types";

// Korean text size constants
export const KOREAN_TEXT_SIZES = {
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 20,
  XLARGE: 24,
  XXLARGE: 32,
} as const;

// Alias for compatibility
export const KOREAN_FONT_SIZES = KOREAN_TEXT_SIZES;

// Korean font families
export const KOREAN_FONT_FAMILIES = {
  PRIMARY: "Noto Sans KR, Arial, sans-serif",
  SECONDARY: "Malgun Gothic, sans-serif",
  MONOSPACE: "D2Coding, monospace",
} as const;

// Alias for compatibility
export const KOREAN_FONT_FAMILY = KOREAN_FONT_FAMILIES.PRIMARY;

// Korean font weights
export const KOREAN_FONT_WEIGHTS = {
  LIGHT: "300",
  REGULAR: "400",
  MEDIUM: "500",
  BOLD: "700",
  HEAVY: "900",
} as const;

// Korean martial text presets
export const KOREAN_MARTIAL_TEXT_PRESETS: Record<
  MartialVariant,
  {
    size: keyof typeof KOREAN_TEXT_SIZES;
    weight: keyof typeof KOREAN_FONT_WEIGHTS;
  }
> = {
  technique: {
    size: "MEDIUM",
    weight: "BOLD",
  },
  philosophy: {
    size: "LARGE",
    weight: "MEDIUM",
  },
  instruction: {
    size: "MEDIUM",
    weight: "REGULAR",
  },
  practitioner: {
    size: "MEDIUM",
    weight: "REGULAR",
  },
  master: {
    size: "LARGE",
    weight: "BOLD",
  },
  honor: {
    size: "MEDIUM",
    weight: "MEDIUM",
  },
  discipline: {
    size: "MEDIUM",
    weight: "MEDIUM",
  },
} as const;

// Status translations
export const KOREAN_STATUS_TRANSLATIONS = {
  health: { korean: "체력", english: "Health" },
  ki: { korean: "기력", english: "Ki" },
  stamina: { korean: "스태미나", english: "Stamina" },
  consciousness: { korean: "의식", english: "Consciousness" },
  pain: { korean: "고통", english: "Pain" },
  balance: { korean: "균형", english: "Balance" },
} as const;

// Martial arts colors
export const MARTIAL_COLORS = {
  technique: 0x00ff00,
  philosophy: 0x0066cc,
  instruction: 0xffffff,
  practitioner: 0xcccccc,
  master: 0xffd700,
  honor: 0xff6600,
  discipline: 0x9900cc,
} as const;

// Korean martial arts terms
export const KOREAN_MARTIAL_ARTS_TERMS = {
  dojang: { korean: "도장", english: "Training Hall" },
  trigram: { korean: "괘", english: "Trigram" },
  technique: { korean: "기법", english: "Technique" },
  stance: { korean: "자세", english: "Stance" },
  master: { korean: "사범", english: "Master" },
  student: { korean: "제자", english: "Student" },
} as const;

// Trigram text configuration for Korean martial arts
export const TRIGRAM_TEXT_CONFIG = {
  geon: {
    color: 0xffd700, // Gold for Heaven
    korean: "건",
    english: "Heaven",
    symbol: "☰",
  },
  tae: {
    color: 0x87ceeb, // Sky blue for Lake
    korean: "태",
    english: "Lake",
    symbol: "☱",
  },
  li: {
    color: 0xff4500, // Orange red for Fire
    korean: "리",
    english: "Fire",
    symbol: "☲",
  },
  jin: {
    color: 0x9370db, // Medium purple for Thunder
    korean: "진",
    english: "Thunder",
    symbol: "☳",
  },
  son: {
    color: 0x98fb98, // Pale green for Wind
    korean: "손",
    english: "Wind",
    symbol: "☴",
  },
  gam: {
    color: 0x4169e1, // Royal blue for Water
    korean: "감",
    english: "Water",
    symbol: "☵",
  },
  gan: {
    color: 0x8b4513, // Saddle brown for Mountain
    korean: "간",
    english: "Mountain",
    symbol: "☶",
  },
  gon: {
    color: 0x654321, // Dark brown for Earth
    korean: "곤",
    english: "Earth",
    symbol: "☷",
  },
} as const;
