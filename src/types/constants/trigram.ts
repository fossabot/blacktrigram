// Korean martial arts trigram system constants for Black Trigram

import type {
  TrigramStance,
  TrigramData,
  TrigramTransitionCost,
  TrigramEffectivenessMatrix,
  StanceTransition,
} from "../trigram";

// Eight Trigram Combat Data (팔괘 무술 체계)
// Authentic Korean martial arts interpretations of I Ching trigrams

const TRIGRAM_DATA_INTERNAL: Record<TrigramStance, TrigramData> = {
  // ☰ 건 (Geon) - Heaven Trigram
  geon: {
    korean: "건",
    english: "Heaven",
    symbol: "☰",
    element: "metal",
    nature: "creative force",
    direction: "northwest",
    season: "late autumn",
    bodyPart: "head",
    emotion: "determination",
    virtue: "strength",
    weakness: "rigidity",
    strongAgainst: ["son", "gam"],
    technique: {
      id: "geon_thunder_strike",
      name: "Thunder Strike",
      koreanName: "천둥벽력",
      englishName: "Heavenly Thunder Strike",
      romanized: "cheondeungbyeokryeok",
      description: {
        korean: "하늘의 위력으로 적을 압도하는 강력한 직선 타격",
        english: "Overwhelming linear strike with the power of heaven",
      },
      stance: "geon",
      type: "bone_strike",
      damageRange: { min: 25, max: 35 },
      kiCost: 15,
      staminaCost: 12,
      executionTime: 800,
      recoveryTime: 1200,
      accuracy: 0.85,
      range: 2.0,
      effects: [],
      damageMultiplier: 1.4,
      critMultiplier: 2.0,
      critChance: 0.15,
      properties: ["armor_piercing", "knockback"],
    },
    philosophy: {
      korean: "하늘의 기운으로 강인함을 추구하되, 지나친 경직성을 경계하라",
      english:
        "Pursue strength with heaven's energy, but beware of excessive rigidity",
    },
    combatStyle: "Direct overwhelming force",
    preferredRange: "close",
    kiFlow: "external",
  },

  // ☱ 태 (Tae) - Lake Trigram
  tae: {
    korean: "태",
    english: "Lake",
    symbol: "☱",
    element: "metal",
    nature: "joyful",
    direction: "west",
    season: "autumn",
    bodyPart: "mouth",
    emotion: "joy",
    virtue: "pleasure",
    weakness: "indulgence",
    strongAgainst: ["li", "jin"],
    technique: {
      id: "tae_flowing_strike",
      name: "Flowing Strike",
      koreanName: "유수연타",
      englishName: "Flowing Water Strikes",
      romanized: "yusuyeontta",
      description: {
        korean: "호수의 잔잔함과 같은 유연한 연속 타격",
        english: "Gentle continuous strikes like the calmness of a lake",
      },
      stance: "tae",
      type: "joint_lock",
      damageRange: { min: 18, max: 28 },
      kiCost: 12,
      staminaCost: 10,
      executionTime: 600,
      recoveryTime: 900,
      accuracy: 0.9,
      range: 1.5,
      effects: [],
      damageMultiplier: 1.2,
      critMultiplier: 1.8,
      critChance: 0.2,
      properties: ["joint_manipulation", "fluid_motion"],
    },
    philosophy: {
      korean: "기쁨과 유연함으로 상대를 제압하되, 안일함에 빠지지 마라",
      english:
        "Overcome opponents with joy and flexibility, but avoid complacency",
    },
    combatStyle: "Fluid joint manipulation",
    preferredRange: "close",
    kiFlow: "balanced",
  },

  // ☲ 리 (Li) - Fire Trigram
  li: {
    korean: "리",
    english: "Fire",
    symbol: "☲",
    element: "fire",
    nature: "clinging",
    direction: "south",
    season: "summer",
    bodyPart: "eyes",
    emotion: "excitement",
    virtue: "clarity",
    weakness: "burnout",
    strongAgainst: ["gan", "gon"],
    technique: {
      id: "li_flame_spear",
      name: "Flame Spear",
      koreanName: "화염지창",
      englishName: "Flame Point Thrust",
      romanized: "hwayeomjichang",
      description: {
        korean: "불의 정확성으로 급소를 꿰뚫는 정밀한 찌르기",
        english: "Precise thrust piercing vital points with fire's accuracy",
      },
      stance: "li",
      type: "nerve_strike",
      damageRange: { min: 22, max: 32 },
      kiCost: 18,
      staminaCost: 8,
      executionTime: 500,
      recoveryTime: 800,
      accuracy: 0.95,
      range: 2.2,
      effects: [],
      damageMultiplier: 1.6,
      critMultiplier: 2.5,
      critChance: 0.25,
      properties: ["vital_point_targeting", "precision_strike"],
    },
    philosophy: {
      korean: "불의 명료함으로 정확히 타격하되, 소진되지 않도록 주의하라",
      english:
        "Strike precisely with fire's clarity, but beware of burning out",
    },
    combatStyle: "Precise nerve strikes",
    preferredRange: "medium",
    kiFlow: "external",
  },

  // ☳ 진 (Jin) - Thunder Trigram
  jin: {
    korean: "진",
    english: "Thunder",
    symbol: "☳",
    element: "wood",
    nature: "arousing",
    direction: "east",
    season: "spring",
    bodyPart: "feet",
    emotion: "shock",
    virtue: "movement",
    weakness: "recklessness",
    strongAgainst: ["tae", "li"],
    technique: {
      id: "jin_lightning_slash",
      name: "Lightning Slash",
      koreanName: "벽력일섬",
      englishName: "Single Lightning Flash",
      romanized: "byeokryeogilseom",
      description: {
        korean: "천둥의 충격으로 상대를 기절시키는 순간적 타격",
        english: "Instantaneous strike stunning opponent with thunder's shock",
      },
      stance: "jin",
      type: "nerve_strike",
      damageRange: { min: 20, max: 30 },
      kiCost: 20,
      staminaCost: 15,
      executionTime: 400,
      recoveryTime: 1000,
      accuracy: 0.8,
      range: 1.8,
      effects: [],
      damageMultiplier: 1.5,
      critMultiplier: 2.2,
      critChance: 0.18,
      properties: ["stunning", "electrical_damage"],
    },
    philosophy: {
      korean: "천둥의 움직임으로 신속히 행동하되, 무모함을 피하라",
      english: "Act swiftly with thunder's movement, but avoid recklessness",
    },
    combatStyle: "Stunning techniques",
    preferredRange: "close",
    kiFlow: "external",
  },

  // ☴ 손 (Son) - Wind Trigram
  son: {
    korean: "손",
    english: "Wind",
    symbol: "☴",
    element: "wood",
    nature: "gentle",
    direction: "southeast",
    season: "early summer",
    bodyPart: "thighs",
    emotion: "penetration",
    virtue: "flexibility",
    weakness: "inconsistency",
    strongAgainst: ["geon", "tae"],
    technique: {
      id: "son_whirlwind_strikes",
      name: "Whirlwind Strikes",
      koreanName: "선풍연격",
      englishName: "Whirlwind Barrage",
      romanized: "seonpungyeongyeok",
      description: {
        korean: "바람의 지속성으로 끊임없이 압박하는 연속 공격",
        english: "Continuous pressure attacks with wind's persistence",
      },
      stance: "son",
      type: "pressure_point",
      damageRange: { min: 16, max: 26 },
      kiCost: 14,
      staminaCost: 18,
      executionTime: 1200,
      recoveryTime: 600,
      accuracy: 0.88,
      range: 1.6,
      effects: [],
      damageMultiplier: 1.3,
      critMultiplier: 1.9,
      critChance: 0.12,
      properties: ["continuous_pressure", "stamina_drain"],
    },
    philosophy: {
      korean: "바람의 유연함으로 꾸준히 압박하되, 일관성을 잃지 마라",
      english:
        "Apply steady pressure with wind's flexibility, but maintain consistency",
    },
    combatStyle: "Continuous pressure",
    preferredRange: "medium",
    kiFlow: "internal",
  },

  // ☵ 감 (Gam) - Water Trigram
  gam: {
    korean: "감",
    english: "Water",
    symbol: "☵",
    element: "water",
    nature: "abysmal",
    direction: "north",
    season: "winter",
    bodyPart: "ears",
    emotion: "fear",
    virtue: "depth",
    weakness: "stagnation",
    strongAgainst: ["li", "jin"],
    technique: {
      id: "gam_water_counter",
      name: "Water Counter",
      koreanName: "수류반격",
      englishName: "Water Flow Counter",
      romanized: "suryubangyeok",
      description: {
        korean: "물의 흐름으로 상대 공격을 받아넘기며 반격하는 기법",
        english:
          "Technique redirecting opponent's attack and counter like water flow",
      },
      stance: "gam",
      type: "counter",
      damageRange: { min: 24, max: 34 },
      kiCost: 16,
      staminaCost: 11,
      executionTime: 700,
      recoveryTime: 900,
      accuracy: 0.92,
      range: 1.4,
      effects: [],
      damageMultiplier: 1.7,
      critMultiplier: 2.3,
      critChance: 0.22,
      properties: ["blood_flow_restriction", "counter_attack"],
    },
    philosophy: {
      korean: "물의 깊이로 상대를 이해하고 대응하되, 정체되지 마라",
      english:
        "Understand and respond to opponents with water's depth, but avoid stagnation",
    },
    combatStyle: "Blood flow restriction",
    preferredRange: "close",
    kiFlow: "internal",
  },

  // ☶ 간 (Gan) - Mountain Trigram
  gan: {
    korean: "간",
    english: "Mountain",
    symbol: "☶",
    element: "earth",
    nature: "keeping still",
    direction: "northeast",
    season: "late winter",
    bodyPart: "hands",
    emotion: "stubbornness",
    virtue: "stillness",
    weakness: "passivity",
    strongAgainst: ["son", "gam"],
    technique: {
      id: "gan_rock_defense",
      name: "Rock Defense",
      koreanName: "반석방어",
      englishName: "Immovable Rock Defense",
      romanized: "banseokbangeo",
      description: {
        korean: "산의 견고함으로 모든 공격을 막아내는 절대 방어",
        english:
          "Absolute defense blocking all attacks with mountain's solidity",
      },
      stance: "gan",
      type: "defense",
      damageRange: { min: 12, max: 22 },
      kiCost: 10,
      staminaCost: 8,
      executionTime: 300,
      recoveryTime: 500,
      accuracy: 0.98,
      range: 1.0,
      effects: [],
      damageMultiplier: 0.8,
      critMultiplier: 1.5,
      critChance: 0.08,
      properties: ["defensive_counter", "damage_reduction"],
    },
    philosophy: {
      korean: "산의 고요함으로 중심을 지키되, 수동성에 빠지지 마라",
      english: "Maintain center with mountain's stillness, but avoid passivity",
    },
    combatStyle: "Defensive counters",
    preferredRange: "close",
    kiFlow: "balanced",
  },

  // ☷ 곤 (Gon) - Earth Trigram
  gon: {
    korean: "곤",
    english: "Earth",
    symbol: "☷",
    element: "earth",
    nature: "receptive",
    direction: "southwest",
    season: "late summer",
    bodyPart: "abdomen",
    emotion: "devotion",
    virtue: "receptivity",
    weakness: "submission",
    strongAgainst: ["gan", "geon"],
    technique: {
      id: "gon_earth_embrace",
      name: "Earth Embrace",
      koreanName: "대지포옹",
      englishName: "Earth's Embrace",
      romanized: "daejipoong",
      description: {
        korean: "대지의 포용력으로 상대를 제압하는 그라운드 기법",
        english:
          "Ground technique subduing opponent with earth's embracing power",
      },
      stance: "gon",
      type: "grapple",
      damageRange: { min: 28, max: 38 },
      kiCost: 22,
      staminaCost: 25,
      executionTime: 1500,
      recoveryTime: 1800,
      accuracy: 0.75,
      range: 1.2,
      effects: [],
      damageMultiplier: 1.8,
      critMultiplier: 2.4,
      critChance: 0.1,
      properties: ["ground_technique", "submission_hold"],
    },
    philosophy: {
      korean: "대지의 수용성으로 모든 것을 받아들이되, 굴복하지는 마라",
      english: "Accept all with earth's receptivity, but do not submit",
    },
    combatStyle: "Ground techniques",
    preferredRange: "close",
    kiFlow: "internal",
  },
} as const;

// Stance effectiveness matrix - combat advantage calculations
const STANCE_EFFECTIVENESS_MATRIX_INTERNAL: TrigramEffectivenessMatrix = {
  geon: {
    geon: 1.0,
    tae: 1.2,
    li: 0.8,
    jin: 1.1,
    son: 1.4,
    gam: 1.3,
    gan: 0.9,
    gon: 0.7,
  },
  tae: {
    geon: 0.8,
    tae: 1.0,
    li: 1.3,
    jin: 1.4,
    son: 0.9,
    gam: 1.1,
    gan: 1.2,
    gon: 0.8,
  },
  li: {
    geon: 1.2,
    tae: 0.7,
    li: 1.0,
    jin: 0.9,
    son: 1.1,
    gam: 0.6,
    gan: 1.4,
    gon: 1.3,
  },
  jin: {
    geon: 0.9,
    tae: 0.6,
    li: 1.1,
    jin: 1.0,
    son: 1.2,
    gam: 0.8,
    gan: 1.3,
    gon: 1.4,
  },
  son: {
    geon: 0.6,
    tae: 1.1,
    li: 0.9,
    jin: 0.8,
    son: 1.0,
    gam: 1.3,
    gan: 1.4,
    gon: 1.2,
  },
  gam: {
    geon: 0.7,
    tae: 0.9,
    li: 1.4,
    jin: 1.2,
    son: 0.7,
    gam: 1.0,
    gan: 1.1,
    gon: 0.9,
  },
  gan: {
    geon: 1.1,
    tae: 0.8,
    li: 0.6,
    jin: 0.7,
    son: 0.6,
    gam: 0.9,
    gan: 1.0,
    gon: 1.3,
  },
  gon: {
    geon: 1.3,
    tae: 1.2,
    li: 0.7,
    jin: 0.6,
    son: 0.8,
    gam: 1.1,
    gan: 0.7,
    gon: 1.0,
  },
} as const;

// Trigram stances in traditional order
const TRIGRAM_STANCES_ORDER_INTERNAL: readonly TrigramStance[] = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
] as const;

// Stance transition costs (Ki, Stamina, Time, Difficulty)
const STANCE_TRANSITION_COSTS_INTERNAL: Record<
  TrigramStance,
  Record<TrigramStance, TrigramTransitionCost>
> = {
  geon: {
    geon: { kiCost: 0, staminaCost: 0, time: 0 }, // No cost for same stance
    tae: { kiCost: 15, staminaCost: 10, time: 0.3 }, // Heaven to Lake
    li: { kiCost: 20, staminaCost: 15, time: 0.4 }, // Heaven to Fire
    jin: { kiCost: 10, staminaCost: 8, time: 0.2 }, // Heaven to Thunder
    son: { kiCost: 25, staminaCost: 20, time: 0.5 }, // Heaven to Wind
    gam: { kiCost: 30, staminaCost: 25, time: 0.6 }, // Heaven to Water
    gan: { kiCost: 18, staminaCost: 12, time: 0.35 }, // Heaven to Mountain
    gon: { kiCost: 35, staminaCost: 30, time: 0.7 }, // Heaven to Earth
  },
  tae: {
    geon: { kiCost: 15, staminaCost: 10, time: 0.3 }, // Lake to Heaven
    tae: { kiCost: 0, staminaCost: 0, time: 0 }, // No cost for same stance
    li: { kiCost: 12, staminaCost: 8, time: 0.25 }, // Lake to Fire
    jin: { kiCost: 18, staminaCost: 15, time: 0.4 }, // Lake to Thunder
    son: { kiCost: 14, staminaCost: 10, time: 0.3 }, // Lake to Wind
    gam: { kiCost: 16, staminaCost: 12, time: 0.35 }, // Lake to Water
    gan: { kiCost: 22, staminaCost: 18, time: 0.45 }, // Lake to Mountain
    gon: { kiCost: 20, staminaCost: 15, time: 0.4 }, // Lake to Earth
  },
  li: {
    geon: { kiCost: 20, staminaCost: 15, time: 0.4 }, // Fire to Heaven
    tae: { kiCost: 12, staminaCost: 8, time: 0.25 }, // Fire to Lake
    li: { kiCost: 0, staminaCost: 0, time: 0 }, // No cost for same stance
    jin: { kiCost: 8, staminaCost: 5, time: 0.15 }, // Fire to Thunder
    son: { kiCost: 10, staminaCost: 8, time: 0.2 }, // Fire to Wind
    gam: { kiCost: 28, staminaCost: 22, time: 0.55 }, // Fire to Water
    gan: { kiCost: 15, staminaCost: 12, time: 0.3 }, // Fire to Mountain
    gon: { kiCost: 25, staminaCost: 20, time: 0.5 }, // Fire to Earth
  },
  jin: {
    geon: { kiCost: 10, staminaCost: 8, time: 0.2 }, // Thunder to Heaven
    tae: { kiCost: 18, staminaCost: 15, time: 0.4 }, // Thunder to Lake
    li: { kiCost: 8, staminaCost: 5, time: 0.15 }, // Thunder to Fire
    jin: { kiCost: 0, staminaCost: 0, time: 0 }, // No cost for same stance
    son: { kiCost: 12, staminaCost: 10, time: 0.25 }, // Thunder to Wind
    gam: { kiCost: 20, staminaCost: 16, time: 0.4 }, // Thunder to Water
    gan: { kiCost: 25, staminaCost: 20, time: 0.5 }, // Thunder to Mountain
    gon: { kiCost: 22, staminaCost: 18, time: 0.45 }, // Thunder to Earth
  },
  son: {
    geon: { kiCost: 25, staminaCost: 20, time: 0.5 }, // Wind to Heaven
    tae: { kiCost: 14, staminaCost: 10, time: 0.3 }, // Wind to Lake
    li: { kiCost: 10, staminaCost: 8, time: 0.2 }, // Wind to Fire
    jin: { kiCost: 12, staminaCost: 10, time: 0.25 }, // Wind to Thunder
    son: { kiCost: 0, staminaCost: 0, time: 0 }, // No cost for same stance
    gam: { kiCost: 16, staminaCost: 12, time: 0.35 }, // Wind to Water
    gan: { kiCost: 18, staminaCost: 15, time: 0.4 }, // Wind to Mountain
    gon: { kiCost: 14, staminaCost: 10, time: 0.3 }, // Wind to Earth
  },
  gam: {
    geon: { kiCost: 30, staminaCost: 25, time: 0.6 }, // Water to Heaven
    tae: { kiCost: 16, staminaCost: 12, time: 0.35 }, // Water to Lake
    li: { kiCost: 28, staminaCost: 22, time: 0.55 }, // Water to Fire
    jin: { kiCost: 20, staminaCost: 16, time: 0.4 }, // Water to Thunder
    son: { kiCost: 16, staminaCost: 12, time: 0.35 }, // Water to Wind
    gam: { kiCost: 0, staminaCost: 0, time: 0 }, // No cost for same stance
    gan: { kiCost: 12, staminaCost: 8, time: 0.25 }, // Water to Mountain
    gon: { kiCost: 10, staminaCost: 8, time: 0.2 }, // Water to Earth
  },
  gan: {
    geon: { kiCost: 18, staminaCost: 12, time: 0.35 }, // Mountain to Heaven
    tae: { kiCost: 22, staminaCost: 18, time: 0.45 }, // Mountain to Lake
    li: { kiCost: 15, staminaCost: 12, time: 0.3 }, // Mountain to Fire
    jin: { kiCost: 25, staminaCost: 20, time: 0.5 }, // Mountain to Thunder
    son: { kiCost: 18, staminaCost: 15, time: 0.4 }, // Mountain to Wind
    gam: { kiCost: 12, staminaCost: 8, time: 0.25 }, // Mountain to Water
    gan: { kiCost: 0, staminaCost: 0, time: 0 }, // No cost for same stance
    gon: { kiCost: 8, staminaCost: 5, time: 0.15 }, // Mountain to Earth
  },
  gon: {
    geon: { kiCost: 35, staminaCost: 30, time: 0.7 }, // Earth to Heaven
    tae: { kiCost: 20, staminaCost: 15, time: 0.4 }, // Earth to Lake
    li: { kiCost: 25, staminaCost: 20, time: 0.5 }, // Earth to Fire
    jin: { kiCost: 22, staminaCost: 18, time: 0.45 }, // Earth to Thunder
    son: { kiCost: 14, staminaCost: 10, time: 0.3 }, // Earth to Wind
    gam: { kiCost: 10, staminaCost: 8, time: 0.2 }, // Earth to Water
    gan: { kiCost: 8, staminaCost: 5, time: 0.15 }, // Earth to Mountain
    gon: { kiCost: 0, staminaCost: 0, time: 0 }, // No cost for same stance
  },
} as const;

// Valid stance transitions with difficulty ratings
const VALID_STANCE_TRANSITIONS_INTERNAL: readonly StanceTransition[] = [
  // Geon transitions
  {
    from: "geon",
    to: "tae",
    cost: 8,
    duration: 500,
    effectiveness: 1.2,
    difficulty: 0.3,
  },
  {
    from: "geon",
    to: "gan",
    cost: 6,
    duration: 400,
    effectiveness: 0.9,
    difficulty: 0.2,
  },

  // Tae transitions
  {
    from: "tae",
    to: "li",
    cost: 6,
    duration: 400,
    effectiveness: 1.3,
    difficulty: 0.2,
  },
  {
    from: "tae",
    to: "jin",
    cost: 12,
    duration: 700,
    effectiveness: 1.4,
    difficulty: 0.5,
  },

  // Continue for all valid transitions...
] as const;

// Export the constants - single export only
export {
  TRIGRAM_DATA_INTERNAL as TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX_INTERNAL as STANCE_EFFECTIVENESS_MATRIX,
  TRIGRAM_STANCES_ORDER_INTERNAL as TRIGRAM_STANCES_ORDER,
  STANCE_TRANSITION_COSTS_INTERNAL as STANCE_TRANSITION_COSTS,
  VALID_STANCE_TRANSITIONS_INTERNAL as VALID_STANCE_TRANSITIONS,
};
