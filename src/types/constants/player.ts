// Player archetype constants

import type { PlayerArchetypeData } from "../player";

export const PLAYER_ARCHETYPES: Record<string, PlayerArchetypeData> = {
  musa: {
    name: { korean: "무사", english: "Traditional Warrior" },
    description: {
      korean: "명예로운 전통 무사",
      english: "Honor through strength, disciplined combat",
    },
    bonuses: {
      damageResistance: 1.2,
      jointTechniques: 1.5,
      militaryDiscipline: 1.3,
      staminaRegeneration: 1.1,
    },
    preferredTrigrams: ["geon", "jin"],
    philosophy: "Honor through strength, disciplined combat",
    combatStyle: "Direct confrontation, overwhelming force",
  },
  amsalja: {
    name: { korean: "암살자", english: "Shadow Assassin" },
    description: {
      korean: "은밀한 암살자",
      english: "Efficiency through invisibility, one perfect strike",
    },
    bonuses: {
      stealthMultiplier: 1.8,
      oneStrikeKill: 2.0,
      silentMovement: 1.5,
      vitalPointAccuracy: 1.4,
    },
    preferredTrigrams: ["son", "gam"],
    philosophy: "Efficiency through invisibility, one perfect strike",
    combatStyle: "Stealth approaches, instant takedowns",
  },
  hacker: {
    name: { korean: "해커", english: "Cyber Warrior" },
    description: {
      korean: "사이버 전사",
      english: "Information as power, technological advantage",
    },
    bonuses: {
      precisionAnalysis: 1.6,
      environmentalControl: 1.4,
      dataOptimization: 1.3,
      techEnhancement: 1.2,
    },
    preferredTrigrams: ["li", "tae"],
    philosophy: "Information as power, technological advantage",
    combatStyle: "Environmental manipulation, tech-assisted strikes",
  },
  jeongbo: {
    name: { korean: "정보요원", english: "Intelligence Operative" },
    description: {
      korean: "정보 요원",
      english: "Knowledge through observation, strategic thinking",
    },
    bonuses: {
      psychologicalWarfare: 1.5,
      strategicAnalysis: 1.4,
      painCompliance: 1.7,
      interrogationSkills: 1.3,
    },
    preferredTrigrams: ["gan", "gon"],
    philosophy: "Knowledge through observation, strategic thinking",
    combatStyle: "Psychological manipulation, precise timing",
  },
  jojik: {
    name: { korean: "조직폭력배", english: "Organized Crime" },
    description: {
      korean: "조직 폭력배",
      english: "Survival through ruthlessness, practical violence",
    },
    bonuses: {
      dirtyFighting: 1.8,
      survivalInstinct: 1.6,
      streetSmart: 1.5,
      brutalEfficiency: 1.4,
    },
    preferredTrigrams: ["jin", "gam"],
    philosophy: "Survival through ruthlessness, practical violence",
    combatStyle: "Dirty fighting, improvised weapons",
  },
} as const;

export const PLAYER_STATS_BASE = {
  HEALTH: 100,
  KI: 100,
  STAMINA: 100,
  CONSCIOUSNESS: 100,
  PAIN: 0,
  BALANCE: 100,
  BLOOD_LOSS: 0,
} as const;
