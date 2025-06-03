// Trigram constants and data for Korean martial arts

import type { TrigramStance } from "../enums";
import type { TrigramData, TrigramEffectivenessMatrix } from "../trigram";
import type { KoreanTechnique } from "../combat";
import { KOREAN_COLORS } from "./colors";

// Create individual techniques to avoid array/single confusion
const GEON_TECHNIQUE: KoreanTechnique = {
  id: "geon_primary",
  name: "Heaven's Strike",
  koreanName: "천지격",
  englishName: "Heaven's Strike",
  romanized: "Cheonji-gyeok",
  description: {
    korean: "하늘의 힘을 담은 강력한 타격",
    english: "Powerful strike imbued with heaven's force",
  },
  stance: "geon",
  type: "strike",
  damage: 35,
  kiCost: 20,
  staminaCost: 15,
};

const TAE_TECHNIQUE: KoreanTechnique = {
  id: "tae_primary",
  name: "Lake's Flow",
  koreanName: "택류",
  englishName: "Lake's Flow",
  romanized: "Taek-ryu",
  description: {
    korean: "호수처럼 유연한 흐름의 기술",
    english: "Fluid technique like a lake's flow",
  },
  stance: "tae",
  type: "grapple",
  damage: 25,
  kiCost: 15,
  staminaCost: 10,
};

const LI_TECHNIQUE: KoreanTechnique = {
  id: "li_primary",
  name: "Flame Strike",
  koreanName: "화염격",
  englishName: "Flame Strike",
  romanized: "Hwayeom-gyeok",
  description: {
    korean: "불의 기세로 타는 강렬한 공격",
    english: "Intense attack burning with fire's momentum",
  },
  stance: "li",
  type: "strike",
  damage: 40,
  kiCost: 25,
  staminaCost: 20,
};

const JIN_TECHNIQUE: KoreanTechnique = {
  id: "jin_primary",
  name: "Thunder Punch",
  koreanName: "뇌전권",
  englishName: "Thunder Punch",
  romanized: "Noejeon-gwon",
  description: {
    korean: "천둥처럼 빠르고 강력한 주먹",
    english: "Swift and powerful punch like thunder",
  },
  stance: "jin",
  type: "punch",
  damage: 30,
  kiCost: 18,
  staminaCost: 12,
};

const SON_TECHNIQUE: KoreanTechnique = {
  id: "son_primary",
  name: "Wind Blade",
  koreanName: "풍인",
  englishName: "Wind Blade",
  romanized: "Pung-in",
  description: {
    korean: "바람처럼 예리한 손날 공격",
    english: "Sharp hand blade attack like wind",
  },
  stance: "son",
  type: "strike",
  damage: 28,
  kiCost: 16,
  staminaCost: 14,
};

const GAM_TECHNIQUE: KoreanTechnique = {
  id: "gam_primary",
  name: "Water Flow",
  koreanName: "수류",
  englishName: "Water Flow",
  romanized: "Su-ryu",
  description: {
    korean: "물의 흐름처럼 부드럽고 강한 기술",
    english: "Soft yet strong technique like water's flow",
  },
  stance: "gam",
  type: "grapple",
  damage: 22,
  kiCost: 12,
  staminaCost: 8,
};

const GAN_TECHNIQUE: KoreanTechnique = {
  id: "gan_primary",
  name: "Mountain Strike",
  koreanName: "산격",
  englishName: "Mountain Strike",
  romanized: "San-gyeok",
  description: {
    korean: "산처럼 견고하고 무거운 타격",
    english: "Solid and heavy strike like a mountain",
  },
  stance: "gan",
  type: "strike",
  damage: 45,
  kiCost: 30,
  staminaCost: 25,
};

const GON_TECHNIQUE: KoreanTechnique = {
  id: "gon_primary",
  name: "Earth Palm",
  koreanName: "지장",
  englishName: "Earth Palm",
  romanized: "Ji-jang",
  description: {
    korean: "대지의 안정감을 담은 장법",
    english: "Palm technique with earth's stability",
  },
  stance: "gon",
  type: "strike",
  damage: 20,
  kiCost: 10,
  staminaCost: 5,
};

// Trigram data with all required properties
export const TRIGRAM_DATA: Record<TrigramStance, TrigramData> = {
  geon: {
    id: "geon",
    name: { korean: "건", english: "Heaven" },
    symbol: "☰",
    element: "metal",
    direction: "northwest",
    philosophy: {
      korean: "창조와 리더십의 원리. 강함과 결단력을 상징한다.",
      english:
        "Principle of creation and leadership. Symbolizes strength and determination.",
    },
    strengths: ["high_damage", "breaking_power", "leadership"],
    weaknesses: ["energy_drain", "predictable"],
    technique: GEON_TECHNIQUE,
    color: KOREAN_COLORS.HEAVEN_GOLD,
    order: 1,
    preferredTechniques: [GEON_TECHNIQUE],
  },
  tae: {
    id: "tae",
    name: { korean: "태", english: "Lake" },
    symbol: "☱",
    element: "metal",
    direction: "west",
    philosophy: {
      korean: "기쁨과 소통의 원리. 유연함과 적응력을 나타낸다.",
      english:
        "Principle of joy and communication. Represents flexibility and adaptability.",
    },
    strengths: ["flexibility", "counter_attacks", "flow"],
    weaknesses: ["lower_damage", "requires_timing"],
    technique: TAE_TECHNIQUE,
    color: KOREAN_COLORS.LAKE_SILVER,
    order: 2,
    preferredTechniques: [TAE_TECHNIQUE],
  },
  li: {
    id: "li",
    name: { korean: "리", english: "Fire" },
    symbol: "☲",
    element: "fire",
    direction: "south",
    philosophy: {
      korean: "명료함과 지혜의 원리. 열정과 통찰력을 의미한다.",
      english:
        "Principle of clarity and wisdom. Signifies passion and insight.",
    },
    strengths: ["speed", "critical_hits", "insight"],
    weaknesses: ["stamina_drain", "vulnerable_defense"],
    technique: LI_TECHNIQUE,
    color: KOREAN_COLORS.FIRE_RED,
    order: 3,
    preferredTechniques: [LI_TECHNIQUE],
  },
  jin: {
    id: "jin",
    name: { korean: "진", english: "Thunder" },
    symbol: "☳",
    element: "wood",
    direction: "east",
    philosophy: {
      korean: "충격과 각성의 원리. 변화와 움직임을 촉진한다.",
      english:
        "Principle of shock and awakening. Promotes change and movement.",
    },
    strengths: ["surprise_attacks", "mobility", "awakening"],
    weaknesses: ["lacks_defense", "unpredictable"],
    technique: JIN_TECHNIQUE,
    color: KOREAN_COLORS.THUNDER_YELLOW,
    order: 4,
    preferredTechniques: [JIN_TECHNIQUE],
  },
  son: {
    id: "son",
    name: { korean: "손", english: "Wind" },
    symbol: "☴",
    element: "wood",
    direction: "southeast",
    philosophy: {
      korean: "침투와 영향의 원리. 점진적이고 지속적인 힘을 나타낸다.",
      english:
        "Principle of penetration and influence. Represents gradual and persistent force.",
    },
    strengths: ["penetration", "persistent_damage", "influence"],
    weaknesses: ["gradual_effect", "requires_patience"],
    technique: SON_TECHNIQUE,
    color: KOREAN_COLORS.WIND_GREEN,
    order: 5,
    preferredTechniques: [SON_TECHNIQUE],
  },
  gam: {
    id: "gam",
    name: { korean: "감", english: "Water" },
    symbol: "☵",
    element: "water",
    direction: "north",
    philosophy: {
      korean: "위험과 흐름의 원리. 적응과 극복의 지혜를 담는다.",
      english:
        "Principle of danger and flow. Contains wisdom of adaptation and overcoming.",
    },
    strengths: ["adaptability", "flow_control", "wisdom"],
    weaknesses: ["complex_execution", "vulnerable_to_force"],
    technique: GAM_TECHNIQUE,
    color: KOREAN_COLORS.WATER_BLUE,
    order: 6,
    preferredTechniques: [GAM_TECHNIQUE],
  },
  gan: {
    id: "gan",
    name: { korean: "간", english: "Mountain" },
    symbol: "☶",
    element: "earth",
    direction: "northeast",
    philosophy: {
      korean: "정지와 명상의 원리. 침착함과 인내를 상징한다.",
      english:
        "Principle of stillness and meditation. Symbolizes calmness and patience.",
    },
    strengths: ["defense", "endurance", "meditation"],
    weaknesses: ["slow_attacks", "lacks_mobility"],
    technique: GAN_TECHNIQUE,
    color: KOREAN_COLORS.MOUNTAIN_BROWN,
    order: 7,
    preferredTechniques: [GAN_TECHNIQUE],
  },
  gon: {
    id: "gon",
    name: { korean: "곤", english: "Earth" },
    symbol: "☷",
    element: "earth",
    direction: "southwest",
    philosophy: {
      korean: "수용과 양육의 원리. 포용력과 지지를 나타낸다.",
      english:
        "Principle of receptivity and nourishment. Represents embrace and support.",
    },
    strengths: ["support", "healing", "receptivity"],
    weaknesses: ["passive_nature", "low_offense"],
    technique: GON_TECHNIQUE,
    color: KOREAN_COLORS.EARTH_ORANGE,
    order: 8,
    preferredTechniques: [GON_TECHNIQUE],
  },
} as const;

// Stance effectiveness matrix
export const STANCE_EFFECTIVENESS_MATRIX: TrigramEffectivenessMatrix = {
  geon: {
    geon: 1.0,
    tae: 1.2,
    li: 0.8,
    jin: 1.1,
    son: 0.9,
    gam: 1.3,
    gan: 0.7,
    gon: 1.4,
  },
  tae: {
    geon: 0.8,
    tae: 1.0,
    li: 1.1,
    jin: 0.9,
    son: 1.2,
    gam: 0.7,
    gan: 1.3,
    gon: 1.0,
  },
  li: {
    geon: 1.2,
    tae: 0.9,
    li: 1.0,
    jin: 1.3,
    son: 0.8,
    gam: 1.1,
    gan: 0.6,
    gon: 1.2,
  },
  jin: {
    geon: 0.9,
    tae: 1.1,
    li: 0.7,
    jin: 1.0,
    son: 1.4,
    gam: 0.8,
    gan: 1.2,
    gon: 0.9,
  },
  son: {
    geon: 1.1,
    tae: 0.8,
    li: 1.2,
    jin: 0.6,
    son: 1.0,
    gam: 1.3,
    gan: 0.9,
    gon: 1.1,
  },
  gam: {
    geon: 0.7,
    tae: 1.3,
    li: 0.9,
    jin: 1.2,
    son: 0.7,
    gam: 1.0,
    gan: 1.1,
    gon: 0.8,
  },
  gan: {
    geon: 1.3,
    tae: 0.7,
    li: 1.4,
    jin: 0.8,
    son: 1.1,
    gam: 0.9,
    gan: 1.0,
    gon: 1.2,
  },
  gon: {
    geon: 0.6,
    tae: 1.0,
    li: 0.8,
    jin: 1.1,
    son: 0.9,
    gam: 1.2,
    gan: 0.8,
    gon: 1.0,
  },
} as const;

// Trigram stances in traditional order
export const TRIGRAM_STANCES_ORDER: readonly TrigramStance[] = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
] as const;
