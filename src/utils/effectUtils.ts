import type {
  HitEffect,
  StatusEffect,
  EffectType,
  EffectIntensity,
} from "../types/effects";
import type { Position, KoreanText } from "../types";
import { HitEffectType } from "../types/effects"; // Fix: Import from effects.ts

/**
 * Create a hit effect for visual feedback
 */
export function createHitEffect(
  id: string,
  type: HitEffectType,
  position: Position,
  intensity: number,
  duration: number = 1000
): HitEffect {
  return {
    id,
    type,
    attackerId: "unknown",
    defenderId: "unknown",
    timestamp: Date.now(),
    duration,
    position,
    intensity,
    lifespan: duration,
    alpha: 1.0,
    size: 1.0,
  };
}

/**
 * Get hit effect color based on type
 */
export function getHitEffectColor(type: HitEffectType): number {
  switch (type) {
    case HitEffectType.CRITICAL_HIT: // Fix: Use correct enum value
      return 0xff6b00; // Orange
    case HitEffectType.VITAL_POINT_STRIKE:
      return 0xff0000; // Red
    case HitEffectType.BLOCK:
      return 0x4a90e2; // Blue
    case HitEffectType.MISS:
      return 0x888888; // Gray
    default:
      return 0xffffff; // White
  }
}

/**
 * Create a status effect
 */
export function createStatusEffect(
  id: string,
  type: EffectType,
  intensity: EffectIntensity,
  duration: number,
  description: KoreanText,
  source: string = "unknown"
): StatusEffect {
  const currentTime = Date.now();
  return {
    id,
    type,
    intensity,
    duration,
    description,
    stackable: false,
    source,
    startTime: currentTime,
    endTime: currentTime + duration,
  };
}

/**
 * Calculate effect intensity based on damage
 */
export function calculateEffectIntensity(damage: number): EffectIntensity {
  if (damage >= 50) return "critical";
  if (damage >= 30) return "severe";
  if (damage >= 15) return "moderate";
  return "minor";
}

/**
 * Get effect duration modifier based on type
 */
export function getEffectDurationModifier(type: EffectType): number {
  switch (type) {
    case "bleed": // Fix: Use string literal instead of enum
      return 1.5;
    case "poison":
      return 2.0;
    case "stun":
      return 0.5;
    case "burn":
      return 1.2;
    default:
      return 1.0;
  }
}

/**
 * Apply effect to player stats
 */
export function applyEffectModifiers(
  baseValue: number,
  effects: readonly StatusEffect[],
  statType: "attack" | "defense" | "speed"
): number {
  let modifier = 1.0;

  effects.forEach((effect) => {
    switch (effect.type) {
      case "bleed": // Fix: Use string literal
        if (statType === "attack") modifier *= 0.9;
        break;
      case "strengthened":
        if (statType === "attack") modifier *= 1.2;
        break;
      case "weakened":
        modifier *= 0.8;
        break;
      case "exhausted":
        if (statType === "speed") modifier *= 0.7;
        break;
    }
  });

  return Math.floor(baseValue * modifier);
}

/**
 * Check if effect is beneficial or harmful
 */
export function isEffectBeneficial(type: EffectType): boolean {
  const beneficialEffects: EffectType[] = [
    "focused",
    "rage",
    "defensive",
    "strengthened",
  ];
  return beneficialEffects.includes(type);
}

/**
 * Get effect description based on type and intensity
 */
export function getEffectDescription(
  type: EffectType,
  intensity: EffectIntensity
): KoreanText {
  const descriptions: Record<
    EffectType,
    Record<EffectIntensity, KoreanText>
  > = {
    stun: {
      minor: { korean: "가벼운 기절", english: "Light Stun" },
      moderate: { korean: "기절", english: "Stun" },
      severe: { korean: "심한 기절", english: "Heavy Stun" },
      critical: { korean: "완전 기절", english: "Complete Stun" },
    },
    poison: {
      minor: { korean: "경미한 중독", english: "Minor Poison" },
      moderate: { korean: "중독", english: "Poison" },
      severe: { korean: "심한 중독", english: "Severe Poison" },
      critical: { korean: "치명적 중독", english: "Lethal Poison" },
    },
    weakened: {
      minor: { korean: "약간 약화", english: "Slightly Weakened" },
      moderate: { korean: "약화", english: "Weakened" },
      severe: { korean: "심하게 약화", english: "Severely Weakened" },
      critical: { korean: "극도로 약화", english: "Critically Weakened" },
    },
    // Add other effect types as needed
    burn: {
      minor: { korean: "가벼운 화상", english: "Minor Burn" },
      moderate: { korean: "화상", english: "Burn" },
      severe: { korean: "심한 화상", english: "Severe Burn" },
      critical: { korean: "치명적 화상", english: "Critical Burn" },
    },
    bleed: {
      minor: { korean: "가벼운 출혈", english: "Minor Bleeding" },
      moderate: { korean: "출혈", english: "Bleeding" },
      severe: { korean: "심한 출혈", english: "Heavy Bleeding" },
      critical: { korean: "치명적 출혈", english: "Critical Bleeding" },
    },
    exhausted: {
      minor: { korean: "약간 지침", english: "Slightly Tired" },
      moderate: { korean: "지침", english: "Exhausted" },
      severe: { korean: "심하게 지침", english: "Severely Exhausted" },
      critical: { korean: "완전 탈진", english: "Completely Drained" },
    },
    focused: {
      minor: { korean: "약간 집중", english: "Slightly Focused" },
      moderate: { korean: "집중", english: "Focused" },
      severe: { korean: "깊은 집중", english: "Deeply Focused" },
      critical: { korean: "완전 집중", english: "Completely Focused" },
    },
    rage: {
      minor: { korean: "약간 분노", english: "Slightly Enraged" },
      moderate: { korean: "분노", english: "Enraged" },
      severe: { korean: "맹렬한 분노", english: "Furious" },
      critical: { korean: "광분", english: "Berserk" },
    },
    defensive: {
      minor: { korean: "약간 방어적", english: "Slightly Defensive" },
      moderate: { korean: "방어적", english: "Defensive" },
      severe: { korean: "높은 방어", english: "Highly Defensive" },
      critical: { korean: "완벽한 방어", english: "Perfect Defense" },
    },
    strengthened: {
      minor: { korean: "약간 강화", english: "Slightly Strengthened" },
      moderate: { korean: "강화", english: "Strengthened" },
      severe: { korean: "크게 강화", english: "Greatly Strengthened" },
      critical: { korean: "극대 강화", english: "Maximally Strengthened" },
    },
    paralysis: {
      minor: { korean: "가벼운 마비", english: "Minor Paralysis" },
      moderate: { korean: "마비", english: "Paralysis" },
      severe: { korean: "심한 마비", english: "Severe Paralysis" },
      critical: { korean: "완전 마비", english: "Complete Paralysis" },
    },
    confusion: {
      minor: { korean: "약간 혼란", english: "Slight Confusion" },
      moderate: { korean: "혼란", english: "Confusion" },
      severe: { korean: "심한 혼란", english: "Severe Confusion" },
      critical: { korean: "완전 혼란", english: "Complete Confusion" },
    },
    vulnerability: {
      minor: { korean: "약간 취약", english: "Slightly Vulnerable" },
      moderate: { korean: "취약", english: "Vulnerable" },
      severe: { korean: "매우 취약", english: "Very Vulnerable" },
      critical: { korean: "극도로 취약", english: "Extremely Vulnerable" },
    },
    stamina_drain: {
      minor: { korean: "체력 소모", english: "Stamina Drain" },
      moderate: { korean: "체력 고갈", english: "Stamina Depletion" },
      severe: { korean: "심한 체력 고갈", english: "Severe Stamina Loss" },
      critical: { korean: "완전 체력 고갈", english: "Complete Stamina Loss" },
    },
  };

  return (
    descriptions[type]?.[intensity] || {
      korean: `${type} 효과`,
      english: `${type} effect`,
    }
  );
}

/**
 * Update effect over time
 */
export function updateEffect(
  effect: StatusEffect,
  currentTime: number
): StatusEffect | null {
  if (currentTime >= effect.endTime) {
    return null; // Effect has expired
  }

  return effect; // Effect is still active
}

/**
 * Combine multiple effects of same type
 */
export function combineEffects(effects: StatusEffect[]): StatusEffect[] {
  const combinedEffects: StatusEffect[] = [];
  const effectsByType = new Map<EffectType, StatusEffect[]>();

  // Group effects by type
  effects.forEach((effect) => {
    if (!effectsByType.has(effect.type)) {
      effectsByType.set(effect.type, []);
    }
    effectsByType.get(effect.type)!.push(effect);
  });

  // Combine stackable effects, keep latest non-stackable
  effectsByType.forEach((typeEffects, _) => {
    if (typeEffects.length === 0) return;

    const firstEffect = typeEffects[0];
    if (firstEffect.stackable) {
      // Keep all stackable effects
      combinedEffects.push(...typeEffects);
    } else {
      // Keep only the latest non-stackable effect
      const latestEffect = typeEffects.reduce((latest, current) =>
        current.startTime > latest.startTime ? current : latest
      );
      combinedEffects.push(latestEffect);
    }
  });

  return combinedEffects;
}
