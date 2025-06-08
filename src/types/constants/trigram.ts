/**
 * Trigram system constants for Black Trigram Korean martial arts
 */

import { KoreanTechnique } from "../combat";
import { PlayerArchetype, TrigramStance } from "../enums";
import type {
  TrigramData,
  TrigramEffectivenessMatrix,
  TrigramTheme,
} from "../trigram";
import { KOREAN_COLORS } from "./colors";

export const DEFAULT_TRIGRAM_THEME: TrigramTheme = {
  primary: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
  secondary: KOREAN_COLORS.UI_BORDER,
  active: KOREAN_COLORS.PRIMARY_CYAN,
  hover: KOREAN_COLORS.UI_BACKGROUND_LIGHT,
  text: KOREAN_COLORS.TEXT_PRIMARY, // Added text property
  glow: KOREAN_COLORS.ACCENT_GOLD,
};

// Defines the order of trigrams for UI elements like selection wheels or bars
export const TRIGRAM_STANCES_ORDER: readonly TrigramStance[] = [ // Ensured type is TrigramStance[]
  TrigramStance.GEON,
  TrigramStance.TAE,
  TrigramStance.LI,
  TrigramStance.JIN,
  TrigramStance.SON,
  TrigramStance.GAM,
  TrigramStance.GAN,
  TrigramStance.GON,
];

// Base techniques for each trigram stance
const createTrigram = (
  id: TrigramStance,
  koreanName: string,
  englishName: string,
  symbol: string,
  element: { korean: string; english: string },
  philosophy: { korean: string; english: string },
  combatRole: { korean: string; english: string },
  techniqueKorean: string,
  techniqueEnglish: string
): TrigramData => ({
  id,
  name: { korean: koreanName, english: englishName },
  symbol,
  element,
  philosophy,
  combatRole,
  technique: {
    id: `${id}_technique`,
    name: techniqueKorean,
    koreanName: techniqueKorean,
    englishName: techniqueEnglish,
    romanized: techniqueEnglish.toLowerCase().replace(/\s+/g, "_"),
    description: {
      korean: `${koreanName} 자세의 기본 기술`,
      english: `Basic technique of ${englishName} stance`,
    },
    stance: id,
    type: "strike",
    damage: 25,
    kiCost: 10,
    staminaCost: 15,
    accuracy: 0.75,
    effects: [],
  } as KoreanTechnique,
  strengths: ["balanced"],
  weaknesses: ["none"],
  offensiveBonus: 1.0,
  defensiveBonus: 1.0,
  kiFlowModifier: 1.0,
  staminaModifier: 1.0,
  // Add theme property for visual styling
  theme: {
    primary: 0x00ffff,
    secondary: 0xffffff,
    active: 0x40ffff,
    hover: 0x80ffff,
    glow: 0x00ffff,
  },
});

// Trigram data definitions
export const TRIGRAM_DATA: Record<TrigramStance, TrigramData> = {
  [TrigramStance.GEON]: {
    name: { korean: "건", english: "Geon (Heaven)" },
    symbol: "☰",
    description: {
      korean: "하늘을 상징하며, 창조적이고 강력한 힘을 나타냅니다.",
      english: "Symbolizes Heaven, representing creative and powerful force.",
    },
    keywords: ["creative", "strong", "active", "heaven"],
    archetypeAffinity: [PlayerArchetype.MUSA],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_GEON_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_GEON_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_GEON_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID, // Added text color
      glow: KOREAN_COLORS.ACCENT_GOLD,
    },
  },
  [TrigramStance.TAE]: {
    name: { korean: "태", english: "Tae (Lake)" },
    symbol: "☱",
    description: {
      korean: "호수를 상징하며, 기쁨과 평온함을 나타냅니다.",
      english: "Symbolizes Lake, representing joy and serenity.",
    },
    keywords: ["joyful", "serene", "calm", "lake"],
    archetypeAffinity: [PlayerArchetype.JEONGBO_YOWON],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_TAE_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_TAE_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_TAE_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID, // Added text color
      glow: KOREAN_COLORS.PRIMARY_CYAN_LIGHT,
    },
  },
  [TrigramStance.LI]: {
    name: { korean: "리", english: "Li (Fire)" },
    symbol: "☲",
    description: {
      korean: "불을 상징하며, 열정과 명료함을 나타냅니다.",
      english: "Symbolizes Fire, representing passion and clarity.",
    },
    keywords: ["passionate", "clear", "bright", "fire"],
    archetypeAffinity: [PlayerArchetype.HACKER],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_LI_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_LI_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_LI_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID, // Added text color
      glow: KOREAN_COLORS.ACCENT_ORANGE,
    },
  },
  [TrigramStance.JIN]: {
    name: { korean: "진", english: "Jin (Thunder)" },
    symbol: "☳",
    description: {
      korean: "천둥을 상징하며, 움직임과 활동성을 나타냅니다.",
      english: "Symbolizes Thunder, representing movement and activity.",
    },
    keywords: ["arousing", "active", "moving", "thunder"],
    archetypeAffinity: [PlayerArchetype.JOJIK_POKRYEOKBAE],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_JIN_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_JIN_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_JIN_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID, // Added text color
      glow: KOREAN_COLORS.PRIMARY_YELLOW,
    },
  },
  [TrigramStance.SON]: {
    name: { korean: "손", english: "Son (Wind)" },
    symbol: "☴",
    description: {
      korean: "바람을 상징하며, 부드러움과 순응을 나타냅니다.",
      english: "Symbolizes Wind, representing gentleness and penetration.",
    },
    keywords: ["gentle", "penetrating", "following", "wind"],
    archetypeAffinity: [PlayerArchetype.AMSALJA],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_SON_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_SON_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_SON_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID, // Added text color
      glow: KOREAN_COLORS.PRIMARY_GREEN_LIGHT,
    },
  },
  [TrigramStance.GAM]: {
    name: { korean: "감", english: "Gam (Water)" },
    symbol: "☵",
    description: {
      korean: "물을 상징하며, 위험과 어려움을 나타냅니다.",
      english: "Symbolizes Water, representing danger and abyss.",
    },
    keywords: ["dangerous", "abysmal", "deep", "water"],
    archetypeAffinity: [PlayerArchetype.AMSALJA, PlayerArchetype.HACKER],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_GAM_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_GAM_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_GAM_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID, // Added text color
      glow: KOREAN_COLORS.PRIMARY_BLUE_DARK,
    },
  },
  [TrigramStance.GAN]: {
    name: { korean: "간", english: "Gan (Mountain)" },
    symbol: "☶",
    description: {
      korean: "산을 상징하며, 정지와 견고함을 나타냅니다.",
      english: "Symbolizes Mountain, representing stillness and solidity.",
    },
    keywords: ["still", "solid", "immovable", "mountain"],
    archetypeAffinity: [PlayerArchetype.MUSA, PlayerArchetype.JEONGBO_YOWON],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_GAN_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_GAN_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_GAN_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID, // Added text color
      glow: KOREAN_COLORS.ACCENT_SILVER,
    },
  },
  [TrigramStance.GON]: {
    name: { korean: "곤", english: "Gon (Earth)" },
    symbol: "☷",
    description: {
      korean: "땅을 상징하며, 수용적이고 양육하는 힘을 나타냅니다.",
      english: "Symbolizes Earth, representing receptive and nurturing power.",
    },
    keywords: ["receptive", "nurturing", "devoted", "earth"],
    archetypeAffinity: [
      PlayerArchetype.JOJIK_POKRYEOKBAE,
      PlayerArchetype.MUSA,
    ],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_GON_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_GON_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_GON_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID, // Added text color
      glow: KOREAN_COLORS.ACCENT_BRONZE,
    },
  },
};

// Stance effectiveness matrix (how effective each stance is against others)
export const STANCE_EFFECTIVENESS_MATRIX: TrigramEffectivenessMatrix = {
  geon: {
    geon: 1.0,
    tae: 1.1,
    li: 0.9,
    jin: 1.0,
    son: 1.2,
    gam: 0.8,
    gan: 1.1,
    gon: 0.9,
  },
  tae: {
    geon: 0.9,
    tae: 1.0,
    li: 1.1,
    jin: 0.8,
    son: 1.0,
    gam: 1.2,
    gan: 0.9,
    gon: 1.1,
  },
  li: {
    geon: 1.1,
    tae: 0.9,
    li: 1.0,
    jin: 1.2,
    son: 0.8,
    gam: 1.0,
    gan: 1.1,
    gon: 0.9,
  },
  jin: {
    geon: 1.0,
    tae: 1.2,
    li: 0.8,
    jin: 1.0,
    son: 1.1,
    gam: 0.9,
    gan: 1.0,
    gon: 1.1,
  },
  son: {
    geon: 0.8,
    tae: 1.0,
    li: 1.2,
    jin: 0.9,
    son: 1.0,
    gam: 1.1,
    gan: 0.8,
    gon: 1.0,
  },
  gam: {
    geon: 1.2,
    tae: 0.8,
    li: 1.0,
    jin: 1.1,
    son: 0.9,
    gam: 1.0,
    gan: 1.2,
    gon: 0.8,
  },
  gan: {
    geon: 0.9,
    tae: 1.1,
    li: 0.9,
    jin: 1.0,
    son: 1.2,
    gam: 0.8,
    gan: 1.0,
    gon: 1.1,
  },
  gon: {
    geon: 1.1,
    tae: 0.9,
    li: 1.1,
    jin: 0.9,
    son: 1.0,
    gam: 1.2,
    gan: 0.9,
    gon: 1.0,
  },
};

// Archetype stance preferences
export const ARCHETYPE_STANCE_AFFINITIES: Record<
  PlayerArchetype,
  Record<TrigramStance, number>
> = {
  musa: {
    geon: 1.2,
    tae: 1.0,
    li: 1.1,
    jin: 1.1,
    son: 0.9,
    gam: 1.0,
    gan: 1.1,
    gon: 0.9,
  },
  amsalja: {
    geon: 0.9,
    tae: 1.2,
    li: 1.1,
    jin: 1.0,
    son: 1.2,
    gam: 1.1,
    gan: 0.8,
    gon: 0.9,
  },
  hacker: {
    geon: 0.8,
    tae: 1.1,
    li: 1.2,
    jin: 0.9,
    son: 1.1,
    gam: 1.1,
    gan: 1.0,
    gon: 1.0,
  },
  jeongbo_yowon: {
    geon: 1.0,
    tae: 1.1,
    li: 1.0,
    jin: 0.9,
    son: 1.2,
    gam: 1.1,
    gan: 1.0,
    gon: 0.9,
  },
  jojik_pokryeokbae: {
    geon: 1.1,
    tae: 0.9,
    li: 1.0,
    jin: 1.2,
    son: 0.8,
    gam: 1.0,
    gan: 1.1,
    gon: 1.1,
  },
};
