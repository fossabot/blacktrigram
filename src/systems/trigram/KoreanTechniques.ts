import type { TrigramStance, KoreanTechnique } from "../../types/GameTypes";

/**
 * Korean Techniques System - Authentic martial arts techniques based on I Ching trigrams
 * Each technique represents traditional Korean martial arts philosophy and combat principles
 */

// Korean technique definitions with cultural authenticity
export const KOREAN_TECHNIQUES: Record<string, KoreanTechnique> = {
  thunder_strike: {
    id: "thunder_strike",
    korean: "천둥벽력",
    english: "Thunder Strike",
    damage: 28,
    range: 60,
    accuracy: 0.85,
    speed: 1.2,
    staminaCost: 15,
    kiCost: 5,
    vitalPointMultiplier: 1.4,
    stance: "geon",
    description:
      "Heaven's thunder manifests as a devastating striking technique",
    effects: [
      {
        type: "damage_boost",
        duration: 1000,
        intensity: 0.3,
      },
      {
        type: "vital_stunning",
        duration: 500,
        intensity: 0.2,
      },
    ],
  },
  flowing_combo: {
    id: "flowing_combo",
    korean: "유수연타",
    english: "Flowing Combo",
    damage: 18,
    range: 45,
    accuracy: 0.9,
    speed: 1.5,
    staminaCost: 12,
    kiCost: 3,
    vitalPointMultiplier: 1.1,
    stance: "tae",
    description: "Lake's gentle flow becomes a series of fluid strikes",
    effects: [
      {
        type: "speed_boost",
        duration: 2000,
        intensity: 0.25,
      },
    ],
  },
  flame_spear: {
    id: "flame_spear",
    korean: "화염지창",
    english: "Flame Spear",
    damage: 35,
    range: 70,
    accuracy: 0.75,
    speed: 0.9,
    staminaCost: 20,
    kiCost: 8,
    vitalPointMultiplier: 1.6,
    stance: "li",
    description: "Fire's intensity concentrated into a piercing spear thrust",
    effects: [
      {
        type: "vital_pressure",
        duration: 3000,
        intensity: 0.4,
      },
      {
        type: "defense_boost",
        duration: 1500,
        intensity: 0.3,
      },
    ],
  },
  lightning_flash: {
    id: "lightning_flash",
    korean: "벽력일섬",
    english: "Lightning Flash",
    damage: 40,
    range: 55,
    accuracy: 0.7,
    speed: 2.0,
    staminaCost: 25,
    kiCost: 10,
    vitalPointMultiplier: 1.8,
    stance: "jin",
    description: "Thunder's explosive power channeled into instant devastation",
    effects: [
      {
        type: "vital_paralysis",
        duration: 2000,
        intensity: 0.6,
      },
      {
        type: "damage_boost",
        duration: 1000,
        intensity: 0.5,
      },
    ],
  },
  whirlwind_strike: {
    id: "whirlwind_strike",
    korean: "선풍연격",
    english: "Whirlwind Strike",
    damage: 15,
    range: 80,
    accuracy: 0.95,
    speed: 1.8,
    staminaCost: 10,
    kiCost: 2,
    vitalPointMultiplier: 0.9,
    stance: "son",
    description:
      "Wind's gentle yet persistent force manifests as rapid strikes",
    effects: [
      {
        type: "speed_boost",
        duration: 4000,
        intensity: 0.4,
      },
      {
        type: "defense_boost",
        duration: 3000,
        intensity: 0.3,
      },
    ],
  },
  water_counter: {
    id: "water_counter",
    korean: "수류반격",
    english: "Water Counter",
    damage: 25,
    range: 50,
    accuracy: 0.8,
    speed: 1.1,
    staminaCost: 18,
    kiCost: 6,
    vitalPointMultiplier: 1.3,
    stance: "gam",
    description:
      "Water's adaptability becomes defensive flowing counter-attack",
    effects: [
      {
        type: "vital_paralysis",
        duration: 2500,
        intensity: 0.7,
      },
      {
        type: "defense_boost",
        duration: 2000,
        intensity: 0.2,
      },
    ],
  },
  mountain_defense: {
    id: "mountain_defense",
    korean: "반석방어",
    english: "Mountain Defense",
    damage: 12,
    range: 30,
    accuracy: 0.98,
    speed: 0.7,
    staminaCost: 8,
    kiCost: 4,
    vitalPointMultiplier: 0.8,
    stance: "gan",
    description: "Mountain's immovable strength becomes impenetrable defense",
    effects: [
      {
        type: "defense_boost",
        duration: 5000,
        intensity: 0.8,
      },
      {
        type: "stamina_drain",
        duration: 4000,
        intensity: 0.9,
      },
    ],
  },
  earth_grapple: {
    id: "earth_grapple",
    korean: "대지포옹",
    english: "Earth Grapple",
    damage: 30,
    range: 35,
    accuracy: 0.85,
    speed: 0.8,
    staminaCost: 22,
    kiCost: 7,
    vitalPointMultiplier: 1.5,
    stance: "gon",
    description:
      "Earth's nurturing embrace becomes controlling grappling technique",
    effects: [
      {
        type: "vital_weakness",
        duration: 3000,
        intensity: 0.8,
      },
      {
        type: "stamina_drain",
        duration: 2000,
        intensity: 0.4,
      },
    ],
  },
};

/**
 * Validate technique data integrity
 */
export function validateTechnique(technique: KoreanTechnique): boolean {
  // Check required string fields
  if (!technique.id || technique.id.trim().length === 0) return false;
  if (!technique.korean || technique.korean.trim().length === 0) return false;
  if (!technique.english || technique.english.trim().length === 0) return false;

  // Check numeric constraints
  if (technique.damage < 0) return false;
  if (technique.range <= 0) return false;
  if (technique.accuracy <= 0 || technique.accuracy > 1) return false;
  if (technique.speed <= 0) return false;
  if (technique.staminaCost < 0) return false;
  if (technique.kiCost < 0) return false;
  if (technique.vitalPointMultiplier <= 0) return false;

  // Check stance validity
  const validStances: TrigramStance[] = [
    "geon",
    "tae",
    "li",
    "jin",
    "son",
    "gam",
    "gan",
    "gon",
  ];
  if (!validStances.includes(technique.stance)) return false;

  // Check effects array
  if (!Array.isArray(technique.effects) || technique.effects.length === 0)
    return false;

  // Validate each effect
  for (const effect of technique.effects) {
    if (!effect.type || effect.type.trim().length === 0) return false;
    if (effect.duration <= 0) return false;
    if (effect.intensity <= 0) return false;
  }

  return true;
}

/**
 * Validate Korean technique structure
 */
export function validateKoreanTechnique(
  technique: Partial<KoreanTechnique>
): boolean {
  if (!technique.id || typeof technique.id !== "string") return false;
  if (!technique.korean || typeof technique.korean !== "string") return false;
  if (!technique.english || typeof technique.english !== "string") return false;
  if (typeof technique.damage !== "number" || technique.damage <= 0)
    return false;
  if (
    typeof technique.accuracy !== "number" ||
    technique.accuracy <= 0 ||
    technique.accuracy > 1
  )
    return false;
  if (typeof technique.range !== "number" || technique.range <= 0) return false;
  if (typeof technique.staminaCost !== "number" || technique.staminaCost < 0)
    return false;
  return true;
}

/**
 * Get techniques by stance with proper type safety
 */
export function getTechniquesByStance(
  stance: TrigramStance
): KoreanTechnique[] {
  if (!Array.isArray(KOREAN_TECHNIQUES)) {
    console.error("KOREAN_TECHNIQUES is not an array");
    return [];
  }

  return KOREAN_TECHNIQUES.filter(
    (technique: KoreanTechnique) => technique.stance === stance
  );
}

/**
 * Get technique by stance (returns first match)
 */
export function getTechniqueByStance(
  stance: TrigramStance
): KoreanTechnique | null {
  if (!Array.isArray(KOREAN_TECHNIQUES)) {
    console.error("KOREAN_TECHNIQUES is not an array");
    return null;
  }

  return (
    KOREAN_TECHNIQUES.find(
      (technique: KoreanTechnique) => technique.stance === stance
    ) || null
  );
}

/**
 * Get technique damage with modifiers
 */
export function calculateTechniqueDamage(
  technique: KoreanTechnique,
  isVitalPoint: boolean = false,
  distanceModifier: number = 1.0
): number {
  let damage = technique.damage;

  if (isVitalPoint) {
    damage *= technique.vitalPointMultiplier;
  }

  // Apply distance modifier (closer = more damage for most techniques)
  damage *= distanceModifier;

  // Ensure minimum damage of 1
  return Math.max(1, Math.round(damage));
}

/**
 * Get Korean technique names for display
 */
export function getKoreanTechniqueName(techniqueId: string): string {
  const technique = KOREAN_TECHNIQUES[techniqueId];
  if (!technique) return techniqueId;

  return `${technique.korean} (${technique.english})`;
}

/**
 * Get technique effectiveness against target stance
 */
export function getTechniqueEffectiveness(
  attackerTechnique: KoreanTechnique,
  defenderStance: TrigramStance
): number {
  // Trigram effectiveness based on I Ching philosophy
  const effectiveness: Record<TrigramStance, Record<TrigramStance, number>> = {
    geon: {
      son: 1.3,
      gon: 1.2,
      gam: 0.7,
      tae: 1.0,
      li: 1.0,
      jin: 1.0,
      gan: 1.0,
      geon: 1.0,
    },
    tae: {
      geon: 1.2,
      li: 1.3,
      gan: 0.8,
      jin: 1.0,
      son: 1.0,
      gam: 1.0,
      gon: 1.0,
      tae: 1.0,
    },
    li: {
      gam: 1.4,
      gan: 1.2,
      son: 0.6,
      geon: 1.0,
      tae: 1.0,
      jin: 1.0,
      gon: 1.0,
      li: 1.0,
    },
    jin: {
      gam: 1.3,
      li: 1.1,
      gan: 0.7,
      geon: 1.0,
      tae: 1.0,
      son: 1.0,
      gon: 1.0,
      jin: 1.0,
    },
    son: {
      tae: 1.2,
      gam: 1.3,
      geon: 0.8,
      li: 1.0,
      jin: 1.0,
      gan: 1.0,
      gon: 1.0,
      son: 1.0,
    },
    gam: {
      geon: 1.3,
      li: 1.4,
      tae: 0.6,
      jin: 1.0,
      son: 1.0,
      gan: 1.0,
      gon: 1.0,
      gam: 1.0,
    },
    gan: {
      tae: 1.3,
      jin: 1.2,
      son: 0.7,
      geon: 1.0,
      li: 1.0,
      gam: 1.0,
      gon: 1.0,
      gan: 1.0,
    },
    gon: {
      jin: 1.2,
      son: 1.3,
      geon: 0.8,
      tae: 1.0,
      li: 1.0,
      gam: 1.0,
      gan: 1.0,
      gon: 1.0,
    },
  };

  return effectiveness[attackerTechnique.stance]?.[defenderStance] || 1.0;
}
