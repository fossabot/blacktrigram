// filepath: /workspaces/blacktrigram/src/types/constants/trigram.ts
import type { TrigramStance } from "../enums";

// Eight Trigram stance order (팔괘 순서)
export const TRIGRAM_STANCES_ORDER = [
  "geon", // ☰ Heaven
  "tae", // ☱ Lake
  "li", // ☲ Fire
  "jin", // ☳ Thunder
  "son", // ☴ Wind
  "gam", // ☵ Water
  "gan", // ☶ Mountain
  "gon", // ☷ Earth
] as const satisfies readonly TrigramStance[];

// Trigram stance effectiveness matrix (팔괘 상성표)
export const STANCE_EFFECTIVENESS_MATRIX: Record<
  TrigramStance,
  Record<TrigramStance, number>
> = {
  geon: {
    geon: 1.0,
    tae: 1.1,
    li: 0.9,
    jin: 1.2,
    son: 0.8,
    gam: 1.1,
    gan: 0.9,
    gon: 1.3,
  },
  tae: {
    geon: 0.9,
    tae: 1.0,
    li: 1.2,
    jin: 0.8,
    son: 1.1,
    gam: 0.9,
    gan: 1.3,
    gon: 0.8,
  },
  li: {
    geon: 1.1,
    tae: 0.8,
    li: 1.0,
    jin: 0.9,
    son: 1.3,
    gam: 0.8,
    gan: 1.1,
    gon: 0.9,
  },
  jin: {
    geon: 0.8,
    tae: 1.2,
    li: 1.1,
    jin: 1.0,
    son: 0.9,
    gam: 1.3,
    gan: 0.8,
    gon: 1.1,
  },
  son: {
    geon: 1.2,
    tae: 0.9,
    li: 0.7,
    jin: 1.1,
    son: 1.0,
    gam: 1.1,
    gan: 1.3,
    gon: 0.8,
  },
  gam: {
    geon: 0.9,
    tae: 1.1,
    li: 1.2,
    jin: 0.7,
    son: 0.9,
    gam: 1.0,
    gan: 1.1,
    gon: 1.3,
  },
  gan: {
    geon: 1.1,
    tae: 0.7,
    li: 0.9,
    jin: 1.2,
    son: 0.7,
    gam: 0.9,
    gan: 1.0,
    gon: 1.1,
  },
  gon: {
    geon: 0.7,
    tae: 1.2,
    li: 1.1,
    jin: 0.9,
    son: 1.2,
    gam: 0.7,
    gan: 0.9,
    gon: 1.0,
  },
} as const;

// Create TRIGRAM_DATA export that components are expecting
export const TRIGRAM_DATA = {
  geon: {
    korean: "건",
    english: "Heaven",
    symbol: "☰",
    element: "Metal",
    color: 0xffd700,
    philosophy: "Force, creativity, strength",
    preferredTechniques: ["천둥벽력", "무력투혼"],
    technique: {
      name: "Heavenly Thunder Strike",
      koreanName: "천둥벽력",
      englishName: "Heavenly Thunder Strike",
      stance: "geon" as TrigramStance,
      damage: 28,
      staminaCost: 15,
      kiCost: 10,
      description: {
        korean: "하늘의 힘으로 적을 강타한다",
        english: "Strike with the force of heaven",
      },
    },
  },
  tae: {
    korean: "태",
    english: "Lake",
    symbol: "☱",
    element: "Metal",
    color: 0x87ceeb,
    philosophy: "Joy, satisfaction, reflection",
    preferredTechniques: ["유수연타", "호수반격"],
    technique: {
      name: "Flowing Water Strike",
      koreanName: "유수연타",
      englishName: "Flowing Water Strike",
      stance: "tae" as TrigramStance,
      damage: 22,
      staminaCost: 12,
      kiCost: 8,
      description: {
        korean: "물처럼 흘러가며 연속 타격",
        english: "Continuous strikes flowing like water",
      },
    },
  },
  li: {
    korean: "리",
    english: "Fire",
    symbol: "☲",
    element: "Fire",
    color: 0xff4500,
    philosophy: "Clarity, intelligence, precision",
    preferredTechniques: ["화염지창", "정밀타격"],
    technique: {
      name: "Flame Spear",
      koreanName: "화염지창",
      englishName: "Flame Spear",
      stance: "li" as TrigramStance,
      damage: 26,
      staminaCost: 14,
      kiCost: 12,
      description: {
        korean: "불꽃처럼 빠르고 정확한 창술",
        english: "Swift and precise spear technique like flame",
      },
    },
  },
  jin: {
    korean: "진",
    english: "Thunder",
    symbol: "☳",
    element: "Wood",
    color: 0x9370db,
    philosophy: "Movement, initiative, shock",
    preferredTechniques: ["벽력일섬", "충격파동"],
    technique: {
      name: "Lightning Flash",
      koreanName: "벽력일섬",
      englishName: "Lightning Flash",
      stance: "jin" as TrigramStance,
      damage: 30,
      staminaCost: 18,
      kiCost: 15,
      description: {
        korean: "번개같이 빠른 일격",
        english: "Swift strike like lightning",
      },
    },
  },
  son: {
    korean: "손",
    english: "Wind",
    symbol: "☴",
    element: "Wood",
    color: 0x98fb98,
    philosophy: "Gentleness, penetration, progress",
    preferredTechniques: ["선풍연격", "바람술법"],
    technique: {
      name: "Wind Continuous Strike",
      koreanName: "선풍연격",
      englishName: "Wind Continuous Strike",
      stance: "son" as TrigramStance,
      damage: 20,
      staminaCost: 10,
      kiCost: 6,
      description: {
        korean: "바람처럼 부드럽고 연속적인 타격",
        english: "Soft and continuous strikes like wind",
      },
    },
  },
  gam: {
    korean: "감",
    english: "Water",
    symbol: "☵",
    element: "Water",
    color: 0x4169e1,
    philosophy: "Danger, depth, flowing",
    preferredTechniques: ["수류반격", "심연장법"],
    technique: {
      name: "Water Counter",
      koreanName: "수류반격",
      englishName: "Water Counter",
      stance: "gam" as TrigramStance,
      damage: 24,
      staminaCost: 12,
      kiCost: 10,
      description: {
        korean: "물의 흐름으로 적의 공격을 역이용",
        english: "Counter using the flow of water",
      },
    },
  },
  gan: {
    korean: "간",
    english: "Mountain",
    symbol: "☶",
    element: "Earth",
    color: 0x8b4513,
    philosophy: "Stillness, meditation, stopping",
    preferredTechniques: ["반석방어", "산악진법"],
    technique: {
      name: "Solid Rock Defense",
      koreanName: "반석방어",
      englishName: "Solid Rock Defense",
      stance: "gan" as TrigramStance,
      damage: 16,
      staminaCost: 8,
      kiCost: 5,
      description: {
        korean: "바위처럼 견고한 방어 자세",
        english: "Solid defensive stance like a rock",
      },
    },
  },
  gon: {
    korean: "곤",
    english: "Earth",
    symbol: "☷",
    element: "Earth",
    color: 0x654321,
    philosophy: "Receptivity, yielding, nurturing",
    preferredTechniques: ["대지포옹", "모대수법"],
    technique: {
      name: "Earth Embrace",
      koreanName: "대지포옹",
      englishName: "Earth Embrace",
      stance: "gon" as TrigramStance,
      damage: 25,
      staminaCost: 16,
      kiCost: 12,
      description: {
        korean: "대지의 힘으로 적을 감싸 제압",
        english: "Envelop and subdue with earth's power",
      },
    },
  },
} as const;
