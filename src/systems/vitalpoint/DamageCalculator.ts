import type {
  VitalPoint,
  PlayerArchetype,
  KoreanTechnique,
  VitalPointSystemConfig,
  StatusEffect,
  DamageType,
  VitalPointCategory, // Import VitalPointCategory
  VitalPointEffect, // Import VitalPointEffect
} from "../../types";
import type { DamageResult } from "../../types/anatomy";
import type { PlayerState } from "../../types";
import { VitalPointSeverity } from "../../types/enums";

/**
 * Calculate damage based on vital point targeting
 */

export class DamageCalculator {
  private readonly config: VitalPointSystemConfig;

  constructor(config: VitalPointSystemConfig) {
    this.config = config;
  }

  public static calculateVitalPointDamage(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    attacker: PlayerState
  ): number {
    const baseDamage =
      vitalPoint.baseDamage || vitalPoint.damage?.average || 10;
    const techniqueModifier = technique.damage / 20; // Normalize to base 20 damage
    const severityMultiplier = this.getSeverityMultiplier(vitalPoint.severity);

    return Math.floor(baseDamage * techniqueModifier * severityMultiplier);
  }

  public static calculateTotalDamage(
    baseDamage: number,
    vitalPointHit: boolean,
    vitalPoint?: VitalPoint
  ): DamageResult {
    let totalDamage = baseDamage;
    let vitalPointDamage = 0;
    const effects: any[] = [];

    if (vitalPointHit && vitalPoint) {
      vitalPointDamage =
        vitalPoint.baseDamage || vitalPoint.damage?.average || 0;
      totalDamage += vitalPointDamage;
      effects.push(...vitalPoint.effects);
    }

    return {
      totalDamage,
      vitalPointDamage,
      effects,
    };
  }

  private static getSeverityMultiplier(severity: VitalPointSeverity): number {
    switch (severity) {
      case VitalPointSeverity.MINOR:
        return 1.0;
      case VitalPointSeverity.MODERATE:
        return 1.3;
      case VitalPointSeverity.MAJOR:
        return 1.6;
      case VitalPointSeverity.CRITICAL:
        return 2.0;
      default:
        return 1.0;
    }
  }

  private calculateDamage(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    _attacker: PlayerState // Fix: Mark as unused
  ): number {
    const techniqueModifier = (technique.damage || 20) / 20; // Fix: Add null check
    let totalDamage = vitalPoint.baseDamage || 0;

    // Apply base damage multiplier
    totalDamage *= this.config.damageMultipliers[vitalPoint.severity] ?? 1.0; // Fix: Use correct property

    const vpCategory = vitalPoint.category as VitalPointCategory; // Cast for comparison
    let effectivenessMultiplier = 1.0;

    // Apply damage type modifiers based on vital point and technique
    if (damageType === "nerve" && vpCategory === "nerve") {
      effectivenessMultiplier *= 1.3; // Nerve damage is more effective on nerve points
    } else if (
      damageType === "blunt" &&
      vpCategory === VitalPointCategory.SKELETAL
    ) {
      // Fix: Use enum
      effectivenessMultiplier *= 1.3;
    } else if (
      damageType === "pressure" &&
      (vpCategory === VitalPointCategory.VASCULAR ||
        vpCategory === VitalPointCategory.NEUROLOGICAL)
    ) {
      effectivenessMultiplier *= 1.5;
    } else if (
      damageType === "joint" &&
      vpCategory === VitalPointCategory.SKELETAL
    ) {
      // Fix: Use correct enum
      effectivenessMultiplier *= 1.8;
    }

    totalDamage *= effectivenessMultiplier;

    // Fix severity multiplier
    const severityMultiplier =
      this.config.damageMultipliers[vitalPoint.severity] ?? 1.0;
    totalDamage *= severityMultiplier;

    // Fix critical hit multiplier
    if (isCritical) {
      totalDamage *= 1.5; // Use fixed multiplier instead of non-existent config
    }

    return Math.max(0, Math.round(totalDamage));
  }

  public determineEffects(
    vitalPoint: VitalPoint | null,
    technique: KoreanTechnique,
    isCritical: boolean
  ): StatusEffect[] {
    const effects: StatusEffect[] = [];
    if (technique.effects) {
      effects.push(
        ...technique.effects.map((eff) => ({ ...eff } as StatusEffect))
      ); // Ensure they are StatusEffect
    }
    if (vitalPoint?.effects) {
      // Fix StatusEffect creation
      for (const vpEffect of vitalPoint.effects) {
        if (vpEffect.type && vpEffect.intensity) {
          effects.push({
            id: vpEffect.id || `vp_effect_${Date.now()}`,
            type: vpEffect.type as any,
            intensity: vpEffect.intensity as any,
            duration: this.config.effectDurations[vpEffect.type] ?? 1000,
            description: {
              korean: "급소 타격 효과",
              english: "Vital point strike effect",
            },
            stackable: false,
            source: "vital_point",
            startTime: Date.now(), // Fix: Add required properties
            endTime:
              Date.now() + (this.config.effectDurations[vpEffect.type] ?? 1000),
          } as any);
        }
      }
    }
    if (isCritical) {
      // Fix critical effect creation
      effects.push({
        id: `critical_hit_effect_${Date.now()}`,
        type: "stun" as any,
        intensity: "moderate" as any,
        duration: 2000,
        description: {
          korean: "치명타 효과",
          english: "Critical hit effect",
        },
        stackable: false,
        source: "critical_hit",
        startTime: Date.now(), // Fix: Add required properties
        endTime: Date.now() + 2000,
      } as any);
    }
    return effects;
  }
}
