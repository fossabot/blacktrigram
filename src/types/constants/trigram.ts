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
  text: KOREAN_COLORS.TEXT_PRIMARY,
};

// Defines the order of trigrams for UI elements like selection wheels or bars
export const TRIGRAM_STANCES_ORDER: readonly TrigramStance[] = [
  TrigramStance.GEON,
  TrigramStance.TAE,
  TrigramStance.LI,
  TrigramStance.JIN,
  TrigramStance.SON,
  TrigramStance.GAM,
  TrigramStance.GAN,
  TrigramStance.GON,
] as const;

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
      korean: "하늘을 상징하며, 강력하고 직접적인 공격을 나타냅니다.",
      english: "Symbolizes Heaven; represents powerful, direct attacks.",
    },
    keywords: ["power", "creation", "sky", "masculine"],
    techniques: [
      "천둥벽력 (Thunderclap Strike)",
      "하늘의 분노 (Wrath of Heaven)",
    ],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_GEON_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_GEON_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_GEON_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID,
    },
  },
  [TrigramStance.TAE]: {
    name: { korean: "태", english: "Tae (Lake)" },
    symbol: "☱",
    description: {
      korean: "호수를 상징하며, 유연하고 흐르는 듯한 움직임을 나타냅니다.",
      english: "Symbolizes Lake; represents fluid, flowing movements.",
    },
    keywords: ["joy", "fluidity", "lake", "feminine"],
    techniques: ["유수연타 (Flowing Water Combo)", "잔잔한 파문 (Calm Ripple)"],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_TAE_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_TAE_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_TAE_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID,
    },
  },
  [TrigramStance.LI]: {
    name: { korean: "리", english: "Li (Fire)" },
    symbol: "☲",
    description: {
      korean: "불을 상징하며, 빠르고 정확한 신경 타격을 나타냅니다.",
      english: "Symbolizes Fire; represents fast, precise nerve strikes.",
    },
    keywords: ["clarity", "adherence", "fire", "brilliance"],
    techniques: ["화염지창 (Flame Spear)", "불새출현 (Phoenix Emergence)"],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_LI_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_LI_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_LI_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID,
    },
  },
  [TrigramStance.JIN]: {
    name: { korean: "진", english: "Jin (Thunder)" },
    symbol: "☳",
    description: {
      korean: "천둥을 상징하며, 충격적이고 기절시키는 기술을 나타냅니다.",
      english:
        "Symbolizes Thunder; represents stunning, concussive techniques.",
    },
    keywords: ["action", "movement", "thunder", "shock"],
    techniques: ["벽력일섬 (Lightning Flash)", "천둥의 포효 (Thunder's Roar)"],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_JIN_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_JIN_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_JIN_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID,
    },
  },
  [TrigramStance.SON]: {
    name: { korean: "손", english: "Son (Wind)" },
    symbol: "☴",
    description: {
      korean: "바람을 상징하며, 지속적인 압박과 빠른 이동을 나타냅니다.",
      english:
        "Symbolizes Wind; represents continuous pressure and swift movement.",
    },
    keywords: ["gentleness", "penetration", "wind", "subtlety"],
    techniques: ["선풍연격 (Whirlwind Combo)", "바람의 칼날 (Blade of Wind)"],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_SON_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_SON_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_SON_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID,
    },
  },
  [TrigramStance.GAM]: {
    name: { korean: "감", english: "Gam (Water)" },
    symbol: "☵",
    description: {
      korean:
        "물을 상징하며, 혈류를 차단하거나 흐름을 이용한 기술을 나타냅니다.",
      english:
        "Symbolizes Water; represents techniques involving blood flow restriction or using flow.",
    },
    keywords: ["danger", "depth", "water", "abyss"],
    techniques: [
      "수류반격 (Water Current Counter)",
      "깊은 물의 포박 (Deep Water Bind)",
    ],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_GAM_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_GAM_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_GAM_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID,
    },
  },
  [TrigramStance.GAN]: {
    name: { korean: "간", english: "Gan (Mountain)" },
    symbol: "☶",
    description: {
      korean: "산을 상징하며, 견고한 방어와 강력한 반격을 나타냅니다.",
      english:
        "Symbolizes Mountain; represents solid defense and powerful counters.",
    },
    keywords: ["stillness", "immovability", "mountain", "stopping"],
    techniques: ["반석방어 (Bedrock Defense)", "산의 울림 (Mountain's Echo)"],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_GAN_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_GAN_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_GAN_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID,
    },
  },
  [TrigramStance.GON]: {
    name: { korean: "곤", english: "Gon (Earth)" },
    symbol: "☷",
    description: {
      korean: "땅을 상징하며, 안정적인 자세와 지면 기술을 나타냅니다.",
      english:
        "Symbolizes Earth; represents stable stances and ground techniques.",
    },
    keywords: ["receptivity", "submission", "earth", "yielding"],
    techniques: ["대지포옹 (Earth Embrace)", "지각변동 (Earthquake Strike)"],
    theme: {
      primary: KOREAN_COLORS.TRIGRAM_GON_PRIMARY,
      secondary: KOREAN_COLORS.TRIGRAM_GON_SECONDARY,
      active: KOREAN_COLORS.WHITE_SOLID,
      hover: KOREAN_COLORS.TRIGRAM_GON_LIGHT,
      text: KOREAN_COLORS.BLACK_SOLID,
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
