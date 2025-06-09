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

  public calculateDamage(
    vitalPoint: VitalPoint,
    baseDamage: number,
    archetype: PlayerArchetype,
    isCriticalHit: boolean = false,
    damageType: DamageType
  ): number {
    let totalDamage = baseDamage;

    // Apply base damage multiplier from config
    totalDamage *= this.config.baseDamageMultiplier ?? 1.0;

    const vpCategory = vitalPoint.category as VitalPointCategory; // Cast for comparison

    // Apply damage type modifiers based on vital point and technique
    if (damageType === "nerve" && vpCategory === "nerve") {
      totalDamage *= 1.3; // Nerve damage is more effective on nerve points
    } else if (damageType === "blunt" && vpCategory === "joints") {
      totalDamage *= 1.2; // Blunt damage effective on joints
    } else if (
      damageType === "pressure" &&
      (vpCategory === "vascular" || vpCategory === "pressure_point") // pressure_point is also relevant
    ) {
      totalDamage *= 1.4; // Pressure attacks effective on blood vessels
    } else if (damageType === "joint" && vpCategory === "joints") {
      totalDamage *= 1.5; // Joint techniques very effective on joint targets
    }

    // Apply archetype-specific modifiers
    const archetypeMods = this.config.archetypeModifiers?.[archetype];
    if (archetypeMods) {
      totalDamage *= 1 + (archetypeMods.damageBonus ?? 0);
      // Consider archetype specific damage type bonuses here too
      if (
        archetype === "amsalja" &&
        (damageType === "piercing" || damageType === "nerve")
      ) {
        totalDamage *= archetypeMods.precisionBonus ?? 1.1; // Example precision bonus
      }
    }

    // Apply vital point severity multiplier
    const severityMultiplier =
      this.config.vitalPointSeverityMultiplier?.[vitalPoint.severity];
    if (severityMultiplier) {
      totalDamage *= severityMultiplier;
    }
    totalDamage += vitalPoint.baseDamage || 0; // Add VP base damage

    // Check for critical hit
    if (isCriticalHit) {
      totalDamage *= this.config.criticalHitMultiplier ?? 1.5; // Use config for crit multiplier
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
      vitalPoint.effects.forEach((vpEffect: VitalPointEffect) => {
        // Type vpEffect
        // Convert VitalPointEffect to StatusEffect if their structures differ significantly
        // For now, assuming they are compatible enough or StatusEffect is a superset/compatible
        effects.push({
          id: vpEffect.id,
          type: vpEffect.type,
          intensity: vpEffect.intensity,
          duration: vpEffect.duration,
          description: vpEffect.description,
          stackable: vpEffect.stackable,
          source: vpEffect.source || "vital_point", // Add source
        } as StatusEffect);
      });
    }
    if (isCritical) {
      // Example: Add a generic critical effect or enhance existing ones
      const enhancedEffects = effects.map((effect) => {
        if (effect.duration) {
          return { ...effect, duration: effect.duration * 1.5 }; // Create new object with enhanced duration
        }
        return effect;
      });
      effects.length = 0; // Clear original effects
      effects.push(...enhancedEffects); // Add enhanced effects

      effects.push({
        id: `critical_hit_effect_${Date.now()}`,
        type: "stun", // Example critical effect
        intensity: "moderate",
        duration: 1000,
        description: { korean: "치명타 충격", english: "Critical Hit Impact" },
        stackable: false,
        source: "critical_hit",
      } as StatusEffect);
    }
    return effects;
  }
}
