import type { PlayerArchetype } from "../enums";
import { PlayerArchetypeData } from "../player";

// Player archetype order for UI
export const ARCHETYPE_ORDER = [
  "musa", // 무사 - Traditional Warrior
  "amsalja", // 암살자 - Shadow Assassin
  "hacker", // 해커 - Cyber Warrior
  "jeongbo", // 정보요원 - Intelligence Operative
  "jojik", // 조직폭력배 - Organized Crime
] as const satisfies readonly PlayerArchetype[];

// Player archetype definitions (플레이어 원형 데이터)
export const PLAYER_ARCHETYPES_DATA: Record<
  PlayerArchetype,
  PlayerArchetypeData
> = {
  musa: {
    name: { korean: "무사", english: "Traditional Warrior" },
    description: {
      korean: "전통 무예의 길",
      english: "Path of traditional martial arts",
    },
    bonuses: {
      strength: 1.2,
      honor: 1.5,
      discipline: 1.3,
      damageResistance: 1.2,
    },
  },
  amsalja: {
    name: { korean: "암살자", english: "Shadow Assassin" },
    description: {
      korean: "그림자의 길",
      english: "Path of shadows",
    },
    bonuses: {
      stealth: 1.8,
      precision: 2.0,
      speed: 1.5,
      stealthMultiplier: 1.8,
    },
  },
  hacker: {
    name: { korean: "해커", english: "Cyber Warrior" },
    description: {
      korean: "정보의 길",
      english: "Path of information",
    },
    bonuses: {
      analysis: 1.6,
      technology: 1.4,
      adaptation: 1.3,
      precisionAnalysis: 1.6,
    },
  },
  jeongbo: {
    name: { korean: "정보요원", english: "Intelligence Operative" },
    description: {
      korean: "지식의 길",
      english: "Path of knowledge",
    },
    bonuses: {
      observation: 1.4,
      strategy: 1.5,
      psychology: 1.7,
      psychologicalWarfare: 1.5,
    },
  },
  jojik: {
    name: { korean: "조직폭력배", english: "Organized Crime" },
    description: {
      korean: "생존의 길",
      english: "Path of survival",
    },
    bonuses: {
      brutality: 1.8,
      survival: 1.6,
      street: 1.5,
      dirtyFighting: 1.8,
    },
  },
} as const;
