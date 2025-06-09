import type { Position } from "../../types/common";
import type { VitalPoint, VitalPointHitResult } from "../../types/anatomy";
import type { KoreanTechnique } from "../../types/combat";
// Fix: Remove unused PlayerState import
// Fix: Import enums as values, not types
import {
  VitalPointSeverity,
  VitalPointEffectType,
  EffectIntensity as VitalPointEffectIntensity,
  EffectType,
} from "../../types/enums";
import type { VitalPointEffect } from "../../types/anatomy";
import { StatusEffect } from "@/types";

export class HitDetection {
  /**
   * Convert VitalPointEffect to StatusEffect with required properties
   */
  private static convertVitalPointEffectToStatusEffect(
    vitalPointEffect: VitalPointEffect,
    vitalPointId: string
  ): StatusEffect {
    const currentTime = Date.now();

    // Convert VitalPointEffectType to EffectType using string literals
    const typeMapping: Record<VitalPointEffectType, EffectType> = {
      [VitalPointEffectType.UNCONSCIOUSNESS]: "stun",
      [VitalPointEffectType.BREATHLESSNESS]: "stamina_drain",
      [VitalPointEffectType.PAIN]: "weakened",
      [VitalPointEffectType.PARALYSIS]: "paralysis",
      [VitalPointEffectType.STUN]: "stun",
      [VitalPointEffectType.WEAKNESS]: "weakened",
      [VitalPointEffectType.DISORIENTATION]: "confusion",
      [VitalPointEffectType.BLOOD_FLOW_RESTRICTION]: "bleed",
      [VitalPointEffectType.NERVE_DISRUPTION]: "paralysis",
      [VitalPointEffectType.ORGAN_DISRUPTION]: "vulnerability",
    };

    // Convert VitalPointEffectIntensity to string literals
    const intensityMapping: Record<
      VitalPointEffectIntensity,
      "minor" | "moderate" | "severe" | "critical"
    > = {
      [VitalPointEffectIntensity.WEAK]: "minor",
      [VitalPointEffectIntensity.MEDIUM]: "moderate",
      [VitalPointEffectIntensity.HIGH]: "severe",
      [VitalPointEffectIntensity.EXTREME]: "critical",
    };

    return {
      id: `${vitalPointEffect.id}_${currentTime}`,
      type: typeMapping[vitalPointEffect.type] || "weakened",
      intensity: intensityMapping[vitalPointEffect.intensity] || "moderate",
      duration: vitalPointEffect.duration,
      description: vitalPointEffect.description,
      stackable: vitalPointEffect.stackable,
      source: vitalPointId,
      startTime: currentTime,
      endTime: currentTime + vitalPointEffect.duration,
    };
  }

  processVitalPointHit(
    vitalPoint: VitalPoint,
    hitPosition: Position,
    force: number
  ): VitalPointHitResult {
    // Calculate hit accuracy
    const distance = Math.sqrt(
      Math.pow(hitPosition.x - vitalPoint.position.x, 2) +
        Math.pow(hitPosition.y - vitalPoint.position.y, 2)
    );

    const isHit = distance <= vitalPoint.radius;

    if (!isHit) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: VitalPointSeverity.MINOR,
      };
    }

    // Calculate damage
    const baseDamage = vitalPoint.baseDamage || 15;
    const forceMultiplier = Math.min(force / vitalPoint.requiredForce, 2.0);
    const damage = Math.floor(baseDamage * forceMultiplier);

    // Fix: Convert VitalPointEffect array to StatusEffect array
    const effects = vitalPoint.effects.map((effect) =>
      HitDetection.convertVitalPointEffectToStatusEffect(effect, vitalPoint.id)
    );

    return {
      hit: true,
      vitalPoint,
      damage,
      effects,
      severity: vitalPoint.severity,
    };
  }
}

export default HitDetection;
