// Player archetype constants for Korean martial arts game

import type {
  PlayerArchetype,
  PlayerArchetypeData,
  TrigramStance,
  KoreanText,
} from "../../types"; // Ensure PlayerArchetypeData is imported correctly

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
    baseHealth: 120,
    baseKi: 100,
    baseStamina: 100,
    coreStance: "geon",
    theme: {
      primary: 0xffd700, // Gold
      secondary: 0xffdd44,
      accent: 0xffffff,
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
      primary: 0x440044, // Purple
      secondary: 0x660066,
      accent: 0x8800aa,
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
      primary: 0x00ff88, // Neon green
      secondary: 0x44ff99,
      accent: 0x88ffcc,
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
      primary: 0x0088ff, // Blue
      secondary: 0x4499ff,
      accent: 0x88ccff,
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
      primary: 0xdc143c, // Crimson red
      secondary: 0xff4466,
      accent: 0xff8899,
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
