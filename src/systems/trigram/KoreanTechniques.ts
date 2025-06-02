import type {
  KoreanTechnique,
  TrigramStance,
  DamageType,
  CombatAttackType,
} from "../../types"; // CombatAttackType might be from enums or combat
// KoreanText is not directly used here for defining techniques, but KoreanTechnique uses it.

// Define a map of techniques
export const TECHNIQUES: Readonly<Record<string, KoreanTechnique>> = {
  geon_heavenly_thunder: {
    id: "geon_heavenly_thunder",
    name: "Geon Heavenly Thunder", // Internal name
    koreanName: "천둥벽력",
    englishName: "Heavenly Thunder Strike",
    romanized: "Cheondung Byeokryeok",
    description: {
      korean: "하늘의 힘을 담은 강력한 일격.",
      english: "A powerful strike imbued with heavenly force.",
    },
    stance: "geon",
    type: CombatAttackType.STRIKE,
    damageType: DamageType.BLUNT,
    damageRange: { min: 25, max: 35, type: DamageType.BLUNT },
    range: 1.5, // Added
    kiCost: 20,
    staminaCost: 15,
    accuracy: 0.85,
    executionTime: 500, // in ms
    recoveryTime: 700, // in ms
    critChance: 0.1,
    critMultiplier: 1.6,
    effects: [
      {
        id: "stun_effect_geon",
        type: EffectType.STUN,
        intensity: EffectIntensity.MODERATE,
        duration: 2000, // 2 seconds
        description: { korean: "일시적 기절", english: "Temporary stun" },
        stackable: false,
      },
    ],
    properties: ["heavy_impact", "bone_seeking"],
  },
  tae_flowing_strikes: {
    id: "tae_flowing_strikes",
    name: "Tae Flowing Strikes",
    koreanName: "유수연타",
    englishName: "Flowing Water Strikes",
    romanized: "Yusu Yeonta",
    description: {
      korean: "물처럼 부드럽고 연속적인 공격.",
      english: "Smooth and continuous attacks like flowing water.",
    },
    stance: "tae",
    type: CombatAttackType.STRIKE,
    damageType: DamageType.BLUNT,
    damageRange: { min: 18, max: 28, type: DamageType.BLUNT },
    range: 1.2, // Added
    kiCost: 18,
    staminaCost: 12,
    accuracy: 0.9,
    executionTime: 400,
    recoveryTime: 600,
    critChance: 0.08,
    critMultiplier: 1.5,
    effects: [
      {
        id: "balance_loss_tae",
        type: EffectType.BALANCE_LOSS,
        intensity: EffectIntensity.MODERATE,
        duration: 1500,
        description: { korean: "균형 잃음", english: "Loss of balance" },
        stackable: true,
      },
    ],
    properties: ["fluid_motion", "combo_starter"],
  },
  li_flame_lance: {
    id: "li_flame_lance",
    name: "Li Flame Lance",
    koreanName: "화염지창",
    englishName: "Flame Lance Thrust",
    romanized: "Hwayeom Jichang",
    description: {
      korean: "불꽃처럼 빠르고 정확한 찌르기.",
      english: "A swift and precise thrust like a darting flame.",
    },
    stance: "li",
    type: CombatAttackType.STRIKE, // Or "THRUST" if that's a type
    damageType: DamageType.PIERCING,
    damageRange: { min: 22, max: 30, type: DamageType.PIERCING },
    range: 1.8, // Added
    kiCost: 22,
    staminaCost: 18,
    accuracy: 0.92,
    executionTime: 350,
    recoveryTime: 550,
    critChance: 0.15,
    critMultiplier: 1.7,
    effects: [
      {
        id: "burning_effect_li",
        type: EffectType.BURNING, // Assuming EffectType.BURNING exists
        intensity: EffectIntensity.MODERATE,
        duration: 3000, // 3 seconds DoT
        description: { korean: "화상 효과", english: "Burning effect" },
        stackable: true,
      },
    ],
    properties: ["armor_piercing", "fast_strike"],
  },
  jin_thunderclap_strike: {
    id: "jin_thunderclap_strike",
    name: "Jin Thunderclap Strike",
    koreanName: "벽력일섬",
    englishName: "Thunderclap Flash",
    romanized: "Byeokryeok Ilseom",
    description: {
      korean: "천둥처럼 강력하고 충격적인 공격.",
      english: "A powerful and shocking attack like thunder.",
    },
    stance: "jin",
    type: CombatAttackType.STRIKE,
    damageType: DamageType.IMPACT, // Assuming DamageType.IMPACT exists
    damageRange: { min: 28, max: 40, type: DamageType.IMPACT },
    range: 1.6, // Added
    kiCost: 25,
    staminaCost: 20,
    accuracy: 0.8,
    executionTime: 600,
    recoveryTime: 800,
    critChance: 0.12,
    critMultiplier: 1.8,
    // No specific effects array, implies it relies on raw power or inherent stun from impact
  },
  son_gale_barrage: {
    id: "son_gale_barrage",
    name: "Son Gale Barrage",
    koreanName: "선풍연격",
    englishName: "Gale Barrage",
    romanized: "Seonpung Yeongyeok",
    description: {
      korean: "바람처럼 빠르고 지속적인 연타 공격.",
      english: "Swift and continuous barrage of attacks like the wind.",
    },
    stance: "son",
    type: CombatAttackType.STRIKE, // Or "MULTI_HIT" if that's a type
    damageType: DamageType.SHARP,
    damageRange: { min: 15, max: 25, type: DamageType.SHARP }, // Per hit, if multi-hit
    range: 1.4, // Added
    kiCost: 15,
    staminaCost: 10,
    accuracy: 0.88,
    executionTime: 300, // Fast execution
    recoveryTime: 400,
    critChance: 0.05,
    critMultiplier: 1.4,
    effects: [
      {
        id: "bleed_effect_son",
        type: EffectType.BLEED,
        intensity: EffectIntensity.WEAK,
        duration: 5000, // 5 seconds
        description: { korean: "출혈 효과", english: "Bleeding effect" },
        stackable: true,
      },
    ],
    properties: ["multi_hit", "pressure_attack"],
  },
  gam_riptide_counter: {
    id: "gam_riptide_counter",
    name: "Gam Riptide Counter",
    koreanName: "수류반격",
    englishName: "Riptide Counter",
    romanized: "Suryu Bangyeok",
    description: {
      korean: "물의 흐름을 이용한 유연한 반격기.",
      english: "A flexible counter-attack using the flow of water.",
    },
    stance: "gam",
    type: CombatAttackType.COUNTER_ATTACK,
    damageType: DamageType.PRESSURE,
    damageRange: { min: 18, max: 25, type: DamageType.PRESSURE },
    range: 1.0, // Added
    kiCost: 18,
    staminaCost: 12,
    accuracy: 0.95, // Counters are often accurate if timed well
    executionTime: 450,
    recoveryTime: 650,
    critChance: 0.2, // Higher crit for successful counters
    critMultiplier: 1.6,
    effects: [
      {
        id: "disorient_effect_gam",
        type: EffectType.DISORIENTED,
        intensity: EffectIntensity.MODERATE,
        duration: 2500,
        description: { korean: "방향 감각 상실", english: "Disorientation" },
        stackable: false,
      },
    ],
    properties: ["defensive_offensive", "timing_critical"],
  },
  gan_immovable_bulwark: {
    id: "gan_immovable_bulwark",
    name: "Gan Immovable Bulwark",
    koreanName: "반석방어",
    englishName: "Immovable Bulwark",
    romanized: "Banseok Bangeo",
    description: {
      korean: "산처럼 굳건한 방어 자세.",
      english: "A defensive posture as solid as a mountain.",
    },
    stance: "gan",
    type: CombatAttackType.BLOCK,
    damageType: DamageType.INTERNAL, // Reflects minor impact/recoil
    damageRange: { min: 3, max: 8, type: DamageType.INTERNAL },
    range: 0.5, // Added
    kiCost: 10,
    staminaCost: 20, // Blocks consume stamina
    accuracy: 1.0, // Blocks are generally "accurate" if active
    executionTime: 200, // Fast to activate
    recoveryTime: 300,
    // No crit chance/multiplier for blocks typically
    effects: [
      {
        id: "stability_boost_gan",
        type: EffectType.STABILITY_BOOST, // Assuming this effect type exists
        intensity: EffectIntensity.STRONG,
        duration: 1000, // While active or slightly after
        description: { korean: "안정성 증가", english: "Increased stability" },
        stackable: false,
      },
    ],
    properties: ["high_defense", "stamina_heavy"],
  },
  gon_earthshatter_throw: {
    id: "gon_earthshatter_throw",
    name: "Gon Earthshatter Throw",
    koreanName: "대지포옹",
    englishName: "Earth-Embracing Throw",
    romanized: "Daeji Poong", // Or Pung
    description: {
      korean: "대지의 힘을 이용한 강력한 던지기 기술.",
      english: "A powerful throw utilizing the strength of the earth.",
    },
    stance: "gon",
    type: CombatAttackType.THROW,
    damageType: DamageType.IMPACT,
    damageRange: { min: 22, max: 32, type: DamageType.IMPACT },
    range: 0.8, // Added
    kiCost: 22,
    staminaCost: 18,
    accuracy: 0.8, // Throws can be hard to land
    executionTime: 700, // Throws often have longer execution
    recoveryTime: 900,
    critChance: 0.05,
    critMultiplier: 1.5,
    effects: [
      {
        id: "knockdown_effect_gon",
        type: EffectType.KNOCKDOWN, // Assuming this effect type exists
        intensity: EffectIntensity.STRONG,
        duration: 3000, // Duration of knockdown state
        description: { korean: "넘어뜨림", english: "Knockdown" },
        stackable: false,
      },
    ],
    properties: ["grappling_required", "high_impact_finish"],
  },
};

export function getTechniqueById(id: string): KoreanTechnique | undefined {
  return TECHNIQUES[id];
}

export function getTechniquesByStance(
  stance: TrigramStance
): KoreanTechnique[] {
  return Object.values(TECHNIQUES).filter((tech) => tech.stance === stance);
}
