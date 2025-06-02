import type { MartialVariant, StatusKey } from "../../../../types";
import { KOREAN_COLORS } from "../../../../types/constants";

// Korean text size constants
export const KOREAN_TEXT_SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
} as const;

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
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  heavy: 900,
} as const;

// Status translations
export const KOREAN_STATUS_TRANSLATIONS: Record<
  StatusKey,
  { korean: string; english: string }
> = {
  // Player vital stats
  health: { korean: "체력", english: "Health" },
  ki: { korean: "기력", english: "Ki" },
  stamina: { korean: "스태미나", english: "Stamina" },
  consciousness: { korean: "의식", english: "Consciousness" },
  pain: { korean: "고통", english: "Pain" },
  balance: { korean: "균형", english: "Balance" },

  // Combat conditions
  health_critical: { korean: "위험상태", english: "Critical Health" },
  stamina_low: { korean: "체력부족", english: "Low Stamina" },
  ki_depleted: { korean: "기력고갈", english: "Ki Depleted" },
  stunned: { korean: "기절", english: "Stunned" },
  bleeding: { korean: "출혈", english: "Bleeding" },
  poisoned: { korean: "중독", english: "Poisoned" },
  burning: { korean: "화상", english: "Burning" },
  frozen: { korean: "빙결", english: "Frozen" },
  slowed: { korean: "둔화", english: "Slowed" },
  hastened: { korean: "가속", english: "Hastened" },
  guard_break: { korean: "가드파괴", english: "Guard Break" },
  counter_hit: { korean: "카운터", english: "Counter Hit" },
  vulnerable: { korean: "취약", english: "Vulnerable" },

  // General status indicators
  ready: { korean: "준비", english: "Ready" },
  active: { korean: "활성", english: "Active" },
  inactive: { korean: "비활성", english: "Inactive" },
  success: { korean: "성공", english: "Success" },
  failure: { korean: "실패", english: "Failure" },
  warning: { korean: "경고", english: "Warning" },
  info: { korean: "정보", english: "Info" },
} as const;

// Martial arts colors (using existing Korean colors)
export const MARTIAL_COLORS: Record<MartialVariant, number> = {
  technique: KOREAN_COLORS.GREEN,
  philosophy: KOREAN_COLORS.BLUE,
  instruction: KOREAN_COLORS.WHITE,
  practitioner: KOREAN_COLORS.SILVER,
  master: KOREAN_COLORS.GOLD,
  honor: KOREAN_COLORS.ORANGE,
  discipline: KOREAN_COLORS.CYAN, // Use CYAN instead of missing PURPLE
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
