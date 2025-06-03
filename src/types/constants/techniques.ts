// Korean martial arts techniques for Black Trigram

import type { KoreanTechnique } from "../combat";
import type { TrigramStance } from "../enums";

// Korean martial arts technique categories
export const TECHNIQUE_CATEGORIES = {
  BASIC: "basic", // 기본기 - Basic techniques
  ADVANCED: "advanced", // 고급기 - Advanced techniques
  SECRET: "secret", // 비전 - Secret/hidden techniques
  FORBIDDEN: "forbidden", // 금기 - Forbidden techniques
} as const;

// Technique execution timing for Korean martial arts
export const TECHNIQUE_TIMING = {
  INSTANT: 100, // 즉시 - Instant execution
  FAST: 300, // 빠름 - Fast execution
  NORMAL: 600, // 보통 - Normal execution
  SLOW: 1000, // 느림 - Slow execution
  RITUAL: 2000, // 의식 - Ritual/ceremonial timing
} as const;

// Korean martial arts technique properties
export const TECHNIQUE_PROPERTIES = {
  // Combat properties
  UNBLOCKABLE: "unblockable", // 막을 수 없는
  ARMOR_PIERCING: "armor_piercing", // 갑옷 관통
  COUNTER_ATTACK: "counter_attack", // 반격
  AREA_EFFECT: "area_effect", // 범위 공격

  // Korean martial arts specific
  PRESSURE_POINT: "pressure_point", // 혈자리 공격
  NERVE_STRIKE: "nerve_strike", // 신경 타격
  JOINT_LOCK: "joint_lock", // 관절기
  BONE_BREAKING: "bone_breaking", // 골절기
  BREATH_CONTROL: "breath_control", // 호흡 조절

  // Ki and energy
  KI_ENHANCED: "ki_enhanced", // 기력 강화
  ENERGY_DRAIN: "energy_drain", // 기력 흡수
  CHAKRA_DISRUPTION: "chakra_disruption", // 차크라 교란

  // Traditional elements
  TRADITIONAL: "traditional", // 전통 기법
  MODERN_ADAPTATION: "modern_adaptation", // 현대 적용
  CYBERPUNK_FUSION: "cyberpunk_fusion", // 사이버펑크 융합
} as const;

// Archetype-specific technique modifiers
export const ARCHETYPE_TECHNIQUE_BONUSES = {
  musa: {
    // 무사 - Traditional Warrior
    bone_breaking: 1.5,
    joint_lock: 1.4,
    traditional: 1.3,
    honor_based: 1.2,
  },
  amsalja: {
    // 암살자 - Shadow Assassin
    nerve_strike: 1.8,
    pressure_point: 1.7,
    stealth: 1.6,
    silent_takedown: 2.0,
  },
  hacker: {
    // 해커 - Cyber Warrior
    cyberpunk_fusion: 1.6,
    tech_enhanced: 1.5,
    data_analysis: 1.4,
    system_disruption: 1.7,
  },
  jeongbo: {
    // 정보요원 - Intelligence Operative
    psychological: 1.5,
    interrogation: 1.6,
    pain_compliance: 1.7,
    information_extraction: 1.4,
  },
  jojik: {
    // 조직폭력배 - Organized Crime
    dirty_fighting: 1.8,
    environmental: 1.6,
    survival: 1.5,
    ruthless: 1.7,
  },
} as const;

// Stance compatibility matrix for techniques
export const STANCE_TECHNIQUE_COMPATIBILITY: Record<
  TrigramStance,
  {
    preferred: readonly string[];
    effective: readonly string[];
    difficult: readonly string[];
  }
> = {
  geon: {
    preferred: ["bone_breaking", "direct_strike", "overwhelming_force"],
    effective: ["armor_piercing", "traditional", "honor_based"],
    difficult: ["stealth", "deception", "indirect"],
  },
  tae: {
    preferred: ["joint_lock", "fluid_movement", "continuous_pressure"],
    effective: ["counter_attack", "defensive", "adaptive"],
    difficult: ["rigid", "explosive", "linear"],
  },
  li: {
    preferred: ["nerve_strike", "precision", "analytical"],
    effective: ["pressure_point", "tech_enhanced", "calculated"],
    difficult: ["brute_force", "chaotic", "unpredictable"],
  },
  jin: {
    preferred: ["stunning", "explosive", "shocking"],
    effective: ["area_effect", "intimidation", "violent"],
    difficult: ["subtle", "gentle", "gradual"],
  },
  son: {
    preferred: ["continuous_pressure", "wind_like", "flowing"],
    effective: ["evasive", "persistent", "adaptive"],
    difficult: ["static", "heavy", "anchored"],
  },
  gam: {
    preferred: ["blood_flow", "circulation", "submission"],
    effective: ["choking", "drowning_techniques", "fluid"],
    difficult: ["fire_based", "explosive", "dry"],
  },
  gan: {
    preferred: ["defensive", "immovable", "mountain_like"],
    effective: ["counter", "solid", "protective"],
    difficult: ["aggressive", "mobile", "flexible"],
  },
  gon: {
    preferred: ["ground_techniques", "nurturing", "earth_based"],
    effective: ["grappling", "supportive", "foundational"],
    difficult: ["aerial", "sky_based", "ethereal"],
  },
} as const;

// Korean traditional martial arts principles
export const MARTIAL_ARTS_PRINCIPLES = {
  // 오행 (Five Elements) integration
  WOOD: { korean: "목", principle: "Growth and flexibility" },
  FIRE: { korean: "화", principle: "Explosive power and speed" },
  EARTH: { korean: "토", principle: "Stability and grounding" },
  METAL: { korean: "금", principle: "Precision and cutting" },
  WATER: { korean: "수", principle: "Flow and adaptation" },

  // 음양 (Yin-Yang) balance
  YIN: { korean: "음", principle: "Soft, yielding, defensive" },
  YANG: { korean: "양", principle: "Hard, aggressive, offensive" },

  // 기 (Ki/Chi) energy cultivation
  KI_CULTIVATION: {
    korean: "기수련",
    principle: "Internal energy development",
  },
  KI_PROJECTION: {
    korean: "기방출",
    principle: "External energy manifestation",
  },
  KI_CIRCULATION: { korean: "기순환", principle: "Energy flow management" },
} as const;

// Technique effectiveness modifiers
export const TECHNIQUE_EFFECTIVENESS = {
  CRITICAL_MULTIPLIER: 2.0, // 치명타 배수
  VITAL_POINT_MULTIPLIER: 2.5, // 급소 공격 배수
  COMBO_MULTIPLIER: 1.3, // 연속기 배수
  COUNTER_MULTIPLIER: 1.8, // 반격 배수
  PERFECT_TIMING_MULTIPLIER: 1.5, // 완벽한 타이밍 배수
} as const;

// Training requirements for Korean martial arts mastery
export const MASTERY_REQUIREMENTS = {
  BEGINNER: { korean: "초급", practice_hours: 100, techniques_learned: 5 },
  INTERMEDIATE: { korean: "중급", practice_hours: 500, techniques_learned: 15 },
  ADVANCED: { korean: "고급", practice_hours: 1500, techniques_learned: 30 },
  EXPERT: { korean: "전문가", practice_hours: 3000, techniques_learned: 50 },
  MASTER: { korean: "대가", practice_hours: 10000, techniques_learned: 70 },
} as const;

// Export technique difficulty levels
export const TECHNIQUE_DIFFICULTY = {
  NOVICE: 1, // 초보자 - Beginner level
  STUDENT: 2, // 학생 - Student level
  PRACTITIONER: 3, // 수련자 - Practitioner level
  EXPERT: 4, // 전문가 - Expert level
  MASTER: 5, // 대가 - Master level
} as const;

// Geon (Heaven) techniques
export const heavenly_thunder_strike: KoreanTechnique = {
  id: "heavenly_thunder_strike",
  name: "Heavenly Thunder Strike",
  koreanName: "천둥벽력",
  englishName: "Heavenly Thunder Strike",
  romanized: "cheondung-byeongnyeok",
  description: {
    korean: "하늘의 번개처럼 강력한 일격",
    english: "A powerful strike like lightning from heaven",
  },
  stance: "geon",
  type: "strike",
  damageType: "blunt",
  damage: 35,
  kiCost: 25,
  staminaCost: 20,
  executionTime: 800,
  recoveryTime: 400,
  accuracy: 0.85,
  range: 2.0,
  damageMultiplier: 1.2,
  critMultiplier: 1.8,
  critChance: 0.15,
  properties: ["bone_strike", "stunning"],
};

// Tae (Lake) techniques
export const flowing_water_strike: KoreanTechnique = {
  id: "flowing_water_strike",
  name: "Flowing Water Strike",
  koreanName: "유수연타",
  englishName: "Flowing Water Strike",
  romanized: "yusu-yeonta",
  description: {
    korean: "물처럼 유연하고 연속적인 타격",
    english: "Fluid and continuous strikes like flowing water",
  },
  stance: "tae",
  type: "combo_sequence",
  damageType: "pressure",
  damage: 25,
  kiCost: 20,
  staminaCost: 15,
  executionTime: 1200,
  recoveryTime: 300,
  accuracy: 0.9,
  range: 1.8,
  damageMultiplier: 1.0,
  critMultiplier: 1.5,
  critChance: 0.1,
  properties: ["joint_manipulation", "continuous"],
};

// Basic technique templates for each archetype
export const ARCHETYPE_TECHNIQUES = {
  MUSA: {
    PRIMARY: "정면돌파", // Direct breakthrough
    SECONDARY: "명예일격", // Honor strike
    SPECIAL: "무사도정신", // Warrior spirit
  },
  AMSALJA: {
    PRIMARY: "은밀제압", // Stealth takedown
    SECONDARY: "그림자일격", // Shadow strike
    SPECIAL: "완벽암살", // Perfect assassination
  },
  HACKER: {
    PRIMARY: "시스템분석", // System analysis
    SECONDARY: "데이터해킹", // Data hacking
    SPECIAL: "사이버공격", // Cyber attack
  },
  JEONGBO: {
    PRIMARY: "정보수집", // Intelligence gathering
    SECONDARY: "심리전술", // Psychological tactics
    SPECIAL: "비밀작전", // Covert operation
  },
  JOJIK: {
    PRIMARY: "거친싸움", // Rough fighting
    SECONDARY: "생존본능", // Survival instinct
    SPECIAL: "무자비타격", // Ruthless strike
  },
} as const;

// Technique damage ranges by type
export const TECHNIQUE_DAMAGE_RANGES = {
  LIGHT: { min: 5, max: 15 },
  MEDIUM: { min: 15, max: 25 },
  HEAVY: { min: 25, max: 35 },
  CRITICAL: { min: 35, max: 50 },
} as const;

// Korean technique naming patterns
export const KOREAN_TECHNIQUE_PATTERNS = {
  DESCRIPTIVE: ["천둥", "번개", "바람", "물결", "산", "땅", "불꽃", "호수"],
  ACTION: ["벽력", "타격", "일섬", "연타", "포옹", "반격", "지창", "방어"],
  INTENSITY: ["일", "연", "천", "지", "무", "절", "완", "극"],
} as const;
