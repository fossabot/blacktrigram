import type { StatusEffect, HitEffect, PlayerState } from "../types";
import { HitEffectType, EffectType } from "../types/enums";

export function createHitEffect(
  type: HitEffectType,
  position: { x: number; y: number },
  damage?: number
): HitEffect {
  return {
    id: `hit_${Date.now()}_${Math.random()}`,
    type,
    attackerId: "player1",
    defenderId: "player2",
    timestamp: Date.now(),
    duration: 1000,
    position,
    intensity: damage ? Math.min(damage / 50, 1) : 0.5,
    damageAmount: damage,
    color: getEffectColor(type),
    size: 1.0,
    alpha: 1.0,
    lifespan: 1000,
  };
}

export function getEffectColor(type: HitEffectType): number {
  switch (type) {
    case HitEffectType.CRITICAL_HIT:
      return 0xff6b00; // Orange
    case HitEffectType.VITAL_POINT_STRIKE:
      return 0xff0040; // Red
    case HitEffectType.BLOCK:
      return 0x00bfff; // Blue
    case HitEffectType.MISS:
      return 0x808080; // Gray
    default:
      return 0xffffff; // White
  }
}

/**
 * Create a status effect
 */
export function createStatusEffect(
  type: EffectType,
  duration: number,
  intensity: "minor" | "moderate" | "severe" = "minor"
): StatusEffect {
  return {
    id: `effect_${Date.now()}_${Math.random()}`,
    type,
    intensity,
    duration,
    description: {
      korean: getEffectKoreanName(type),
      english: getEffectEnglishName(type),
    },
    stackable: false,
    source: "combat",
    startTime: Date.now(),
    endTime: Date.now() + duration,
  };
}

function getEffectKoreanName(type: EffectType): string {
  switch (type) {
    case "stun":
      return "기절";
    case "poison":
      return "중독";
    case "burn":
      return "화상";
    case "bleed":
      return "출혈";
    default:
      return "효과";
  }
}

function getEffectEnglishName(type: EffectType): string {
  switch (type) {
    case "stun":
      return "Stunned";
    case "poison":
      return "Poisoned";
    case "burn":
      return "Burning";
    case "bleed":
      return "Bleeding";
    default:
      return "Effect";
  }
}

export function applyStatusEffect(
  player: PlayerState,
  effect: StatusEffect
): PlayerState {
  const existingEffects = player.statusEffects || [];
  const existingEffect = existingEffects.find((e) => e.type === effect.type);

  // Fix: Remove stackable check since it doesn't exist on StatusEffect
  if (existingEffect) {
    // Replace existing effect with new one
    const updatedEffects = existingEffects.map((e) =>
      e.type === effect.type ? effect : e
    );
    return { ...player, statusEffects: updatedEffects };
  } else {
    // Add new effect
    return { ...player, statusEffects: [...existingEffects, effect] };
  }
}

export function removeExpiredEffects(
  player: PlayerState,
  currentTime: number
): PlayerState {
  return {
    ...player,
    statusEffects: player.statusEffects.filter(
      (effect) => effect.endTime > currentTime
    ),
  };
}

export function calculateEffectDamage(effect: StatusEffect): number {
  switch (effect.type) {
    case "poison":
      return effect.intensity === "severe" ? 10 : 5;
    case "burn":
      return effect.intensity === "severe" ? 8 : 4;
    case "bleed":
      return effect.intensity === "severe" ? 6 : 3;
    default:
      return 0;
  }
}

export function getStatusEffectIntensity(effect: StatusEffect): number {
  // Fix: Use proper type checking for intensity
  switch (effect.type) {
    case "pain":
      return typeof effect.intensity === "number"
        ? effect.intensity
        : effect.intensity === "severe"
        ? 10
        : 5;
    case "stun":
      return typeof effect.intensity === "number"
        ? effect.intensity
        : effect.intensity === "severe"
        ? 8
        : 4;
    case "weakness":
      return typeof effect.intensity === "number"
        ? effect.intensity
        : effect.intensity === "severe"
        ? 6
        : 3;
    default:
      return typeof effect.intensity === "number" ? effect.intensity : 5;
  }
}

export function getStatusEffectDescription(effect: StatusEffect): string {
  // Fix: Remove description property access since it doesn't exist
  return `${effect.type} effect`;
}

export const EffectUtils = {
  createHitEffect,
};
