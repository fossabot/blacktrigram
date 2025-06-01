import { KOREAN_COLORS } from "../../../../types";

// Size configuration with Korean typography considerations
export const KOREAN_SIZE_CONFIG = {
  tiny: { fontSize: "0.65rem", lineHeight: 1.2 },
  small: { fontSize: "0.8rem", lineHeight: 1.3 },
  medium: { fontSize: "1rem", lineHeight: 1.4 },
  large: { fontSize: "1.25rem", lineHeight: 1.45 },
  xlarge: { fontSize: "1.5rem", lineHeight: 1.5 },
  xxlarge: { fontSize: "2rem", lineHeight: 1.55 },
} as const;

// Korean martial arts color themes
export const MARTIAL_COLORS = {
  technique: KOREAN_COLORS.GOLD,
  stance: KOREAN_COLORS.CYAN,
  philosophy: KOREAN_COLORS.Purple,
  honor: KOREAN_COLORS.TRADITIONAL_RED,
  respect: KOREAN_COLORS.WHITE,
  combat: KOREAN_COLORS.Red,
  training: KOREAN_COLORS.Green,
  mastery: KOREAN_COLORS.GOLD,
  wisdom: KOREAN_COLORS.Purple,
} as const;

// Korean text status translations
export const KOREAN_STATUS_TRANSLATIONS = {
  health: { korean: "체력", hanja: "體力" },
  ki: { korean: "기력", hanja: "氣力" },
  stamina: { korean: "스태미나", hanja: "持久力" },
  victory: { korean: "승리", hanja: "勝利" },
  defeat: { korean: "패배", hanja: "敗北" },
  ready: { korean: "준비", hanja: "準備" },
  attacking: { korean: "공격", hanja: "攻擊" },
  defending: { korean: "방어", hanja: "防禦" },
  stunned: { korean: "기절", hanja: "氣絕" },
  recovering: { korean: "회복", hanja: "回復" },
} as const;

// Trigram symbols and colors
export const TRIGRAM_CONFIG = {
  geon: { symbol: "☰", color: KOREAN_COLORS.geon },
  tae: { symbol: "☱", color: KOREAN_COLORS.tae },
  li: { symbol: "☲", color: KOREAN_COLORS.li },
  jin: { symbol: "☳", color: KOREAN_COLORS.jin },
  son: { symbol: "☴", color: KOREAN_COLORS.son },
  gam: { symbol: "☵", color: KOREAN_COLORS.gam },
  gan: { symbol: "☶", color: KOREAN_COLORS.gan },
  gon: { symbol: "☷", color: KOREAN_COLORS.gon },
} as const;
