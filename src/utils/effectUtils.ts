import type { HitEffect, HitEffectType } from "../types";
import { KOREAN_COLORS } from "../types/constants";

export function createHitEffect(
  type: HitEffectType,
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

function getDefaultColorForType(type: HitEffectType): number {
  switch (type) {
    case HitEffectType.CriticalHit:
      return KOREAN_COLORS.CRITICAL_HIT || KOREAN_COLORS.ACCENT_RED;
    case HitEffectType.VitalPointStrike:
      return KOREAN_COLORS.VITAL_POINT_HIT || KOREAN_COLORS.ACCENT_ORANGE;
    case HitEffectType.StatusEffect:
      return KOREAN_COLORS.ACCENT_PURPLE;
    case HitEffectType.Miss:
      return KOREAN_COLORS.UI_GRAY;
    case HitEffectType.GeneralDamage:
    default:
      return KOREAN_COLORS.ACCENT_RED;
  }
}

function getDefaultTextForType(type: HitEffectType): string {
  switch (type) {
    case HitEffectType.CriticalHit:
      return "치명타!";
    case HitEffectType.VitalPointStrike:
      return "급소!";
    case HitEffectType.Miss:
      return "빗나감";
    case HitEffectType.StatusEffect:
      return "상태이상";
    case HitEffectType.GeneralDamage:
    default:
      return "";
  }
}

export const EffectUtils = {
  createHitEffect,
};
