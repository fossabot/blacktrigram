// Player archetype constants for Korean martial arts game

import type {
  PlayerArchetype,
  PlayerArchetypeData,
  TrigramStance,
  KoreanText,
} from "../../types"; // Ensure PlayerArchetypeData is imported correctly
import { KOREAN_COLORS } from "./colors";

// Define PLAYER_ARCHETYPES_DATA with explicit Record type
export const PLAYER_ARCHETYPES_DATA: Record<
  PlayerArchetype,
  PlayerArchetypeData
> = {
  musa: {
    id: "musa",
    name: { korean: "무사", english: "Warrior" },
    description: {
      korean: "전통적인 무예의 길을 걷는 명예로운 전사입니다.",
      english: "An honorable warrior following the traditional martial path.",
    },
    baseHealth: 120, // Add missing properties
    baseKi: 100,
    baseStamina: 100,
    coreStance: "geon",
    theme: {
      primary: KOREAN_COLORS.MUSA_PRIMARY,
      secondary: KOREAN_COLORS.WHITE_SOLID,
    },
    colors: {
      primary: KOREAN_COLORS.MUSA_PRIMARY,
      secondary: KOREAN_COLORS.WHITE_SOLID,
    },
    stats: {
      attackPower: 90,
      defense: 85,
      speed: 70,
      technique: 80,
    },
    favoredStances: ["geon", "gan"],
    specialAbilities: ["honorable_strike", "iron_defense"],
    philosophy: {
      korean: "명예와 정의를 추구하는 전통 무사의 길",
      english: "The path of traditional warriors pursuing honor and justice",
    },
  },
  amsalja: {
    id: "amsalja",
    name: { korean: "암살자", english: "Assassin" },
    description: {
      korean: "그림자 속에서 효율성을 추구하는 은밀한 전사입니다.",
      english: "A silent warrior pursuing efficiency from the shadows.",
    },
    baseHealth: 90,
    baseKi: 120,
    baseStamina: 90,
    coreStance: "son",
    theme: {
      primary: KOREAN_COLORS.AMSALJA_PRIMARY,
      secondary: KOREAN_COLORS.UI_STEEL_GRAY,
    },
    colors: {
      primary: KOREAN_COLORS.AMSALJA_PRIMARY,
      secondary: KOREAN_COLORS.UI_STEEL_GRAY,
    },
    stats: {
      attackPower: 95,
      defense: 60,
      speed: 100,
      technique: 95,
    },
    favoredStances: ["son", "gam"],
    specialAbilities: ["shadow_strike", "vital_point_mastery"],
    philosophy: {
      korean: "그림자에서 나타나 정확한 일격으로 적을 제거하는 길",
      english:
        "The path of emerging from shadows to eliminate enemies with precise strikes",
    },
  },
  hacker: {
    id: "hacker",
    name: { korean: "해커", english: "Hacker" },
    description: {
      korean: "정보를 힘으로 삼는 사이버 전사입니다.",
      english: "A cyber warrior wielding information as power.",
    },
    baseHealth: 100,
    baseKi: 110,
    baseStamina: 80,
    coreStance: "gam",
    theme: {
      primary: KOREAN_COLORS.HACKER_PRIMARY,
      secondary: KOREAN_COLORS.PRIMARY_CYAN,
    },
    colors: {
      primary: KOREAN_COLORS.HACKER_PRIMARY,
      secondary: KOREAN_COLORS.PRIMARY_CYAN,
    },
    stats: {
      attackPower: 85,
      defense: 70,
      speed: 90,
      technique: 100,
    },
    favoredStances: ["li", "jin"],
    specialAbilities: ["system_hack", "digital_strike"],
    philosophy: {
      korean: "디지털 세계와 현실을 연결하여 상대를 압도하는 길",
      english:
        "The path of overwhelming opponents by connecting digital and physical worlds",
    },
  },
  jeongbo_yowon: {
    id: "jeongbo_yowon",
    name: { korean: "정보요원", english: "Intelligence Operative" },
    description: {
      korean: "관찰을 통해 지식을 얻는 전략적 전사입니다.",
      english: "A strategic warrior gaining knowledge through observation.",
    },
    baseHealth: 95,
    baseKi: 130,
    baseStamina: 75,
    coreStance: "li",
    theme: {
      primary: KOREAN_COLORS.JEONGBO_PRIMARY,
      secondary: KOREAN_COLORS.SECONDARY_BLUE_LIGHT,
    },
    colors: {
      primary: KOREAN_COLORS.JEONGBO_PRIMARY,
      secondary: KOREAN_COLORS.SECONDARY_BLUE_LIGHT,
    },
    stats: {
      attackPower: 80,
      defense: 80,
      speed: 85,
      technique: 90,
    },
    favoredStances: ["tae", "gan"],
    specialAbilities: ["tactical_analysis", "counter_strike"],
    philosophy: {
      korean: "상대를 관찰하고 분석하여 최적의 전략으로 승리하는 길",
      english:
        "The path of victory through observing and analyzing opponents for optimal strategy",
    },
  },
  jojik_pokryeokbae: {
    id: "jojik_pokryeokbae",
    name: { korean: "조직폭력배", english: "Organized Crime" },
    description: {
      korean: "무자비함을 통해 생존하는 거친 전사입니다.",
      english: "A ruthless warrior surviving through brutality.",
    },
    baseHealth: 130,
    baseKi: 80,
    baseStamina: 120,
    coreStance: "jin",
    theme: {
      primary: KOREAN_COLORS.JOJIK_PRIMARY,
      secondary: KOREAN_COLORS.NEGATIVE_RED,
    },
    colors: {
      primary: KOREAN_COLORS.JOJIK_PRIMARY,
      secondary: KOREAN_COLORS.NEGATIVE_RED,
    },
    stats: {
      attackPower: 100,
      defense: 90,
      speed: 75,
      technique: 70,
    },
    favoredStances: ["geon", "gon"],
    specialAbilities: ["brutal_assault", "intimidation"],
    philosophy: {
      korean: "생존을 위해 수단과 방법을 가리지 않는 거친 전투의 길",
      english: "The path of rough combat that stops at nothing for survival",
    },
  },
};

export const DEFAULT_PLAYER_NAME: KoreanText = {
  korean: "무명",
  english: "Nameless",
  romanized: "Mumyeong",
};

// Add missing PLAYER_ARCHETYPES export
export const PLAYER_ARCHETYPES = Object.keys(
  PLAYER_ARCHETYPES_DATA
) as PlayerArchetype[];

// Player creation utilities
export const DEFAULT_PLAYER_STATS = {
  health: 100,
  maxHealth: 100,
  ki: 100,
  maxKi: 100,
  stamina: 100,
  maxStamina: 100,
  pain: 0,
  consciousness: 100,
  balance: 100,
} as const;

export const PLAYER_LIMITS = {
  MIN_HEALTH: 0,
  MAX_HEALTH: 200,
  MIN_KI: 0,
  MAX_KI: 200,
  MIN_STAMINA: 0,
  MAX_STAMINA: 200,
  MIN_PAIN: 0,
  MAX_PAIN: 100,
  MIN_CONSCIOUSNESS: 0,
  MAX_CONSCIOUSNESS: 100,
  MIN_BALANCE: 0,
  MAX_BALANCE: 100,
} as const;
