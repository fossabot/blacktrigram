import type { StatusEffect, HitEffect, PlayerState } from "../types";
import { EffectType } from "../types/enums"; // Fix: Use EffectType instead of HitEffectType
import { KOREAN_COLORS } from "../types/constants";

export function createHitEffect(
  type: EffectType,
  attackerId: string,
  defenderId: string,
  options: Partial<HitEffect> = {}
): HitEffect {
  const defaultEffect: HitEffect = {
    id: `effect_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    attackerId,
    defenderId,
    timestamp: Date.now(),
    duration: 1000,
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: -50 },
    color: getDefaultColorForType(type),
    size: 10,
    alpha: 1.0,
    lifespan: 1000,
    text: getDefaultTextForType(type),
    ...options,
  };

  return defaultEffect;
}

export function getHitEffectColor(type: EffectType): number {
  switch (type) {
    case EffectType.CRITICAL_HIT: // Fix: Use proper enum values
      return KOREAN_COLORS.CRITICAL_HIT;
    case EffectType.VITAL_POINT_STRIKE:
      return KOREAN_COLORS.VITAL_POINT_HIT;
    case EffectType.STATUS_EFFECT:
      return KOREAN_COLORS.WARNING_ORANGE;
    case EffectType.MISS:
      return KOREAN_COLORS.UI_GRAY;
    default:
    case EffectType.GENERAL_DAMAGE:
      return KOREAN_COLORS.TEXT_PRIMARY;
  }
}

export function getHitEffectSize(type: EffectType): number {
  switch (type) {
    case EffectType.CRITICAL_HIT:
      return 32;
    case EffectType.VITAL_POINT_STRIKE:
      return 28;
    case EffectType.MISS:
      return 20;
    case EffectType.STATUS_EFFECT:
      return 24;
    default:
    case EffectType.GENERAL_DAMAGE:
      return 22;
  }
}

function getDefaultColorForType(type: EffectType): number {
  switch (type) {
    case EffectType.CriticalHit:
      return KOREAN_COLORS.CRITICAL_HIT || KOREAN_COLORS.ACCENT_RED;
    case EffectType.VitalPointStrike:
      return KOREAN_COLORS.VITAL_POINT_HIT || KOREAN_COLORS.ACCENT_ORANGE;
    case EffectType.StatusEffect:
      return KOREAN_COLORS.ACCENT_PURPLE;
    case EffectType.Miss:
      return KOREAN_COLORS.UI_GRAY;
    case EffectType.GeneralDamage:
    default:
      return KOREAN_COLORS.ACCENT_RED;
  }
}

function getDefaultTextForType(type: EffectType): string {
  switch (type) {
    case EffectType.CriticalHit:
      return "치명타!";
    case EffectType.VitalPointStrike:
      return "급소!";
    case EffectType.Miss:
      return "빗나감";
    case EffectType.StatusEffect:
      return "상태이상";
    case EffectType.GeneralDamage:
    default:
      return "";
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
