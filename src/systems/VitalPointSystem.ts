import type {
  VitalPoint,
  VitalPointSystemConfig,
  VitalPointSystemInterface,
  VitalPointEffect, // Make sure this is the correct type for effects
  KoreanTechnique, // Added
  PlayerArchetype, // Added
  StatusEffect, // Added
} from "../types";
import { VITAL_POINTS_DATA } from "../types/constants"; // Assuming VITAL_POINTS_DATA is here

export class VitalPointSystem implements VitalPointSystemInterface {
  private vitalPoints: ReadonlyMap<string, VitalPoint>;
  private config: VitalPointSystemConfig;

  constructor(config?: VitalPointSystemConfig) {
    this.vitalPoints = new Map(VITAL_POINTS_DATA.map((vp) => [vp.id, vp]));
    this.config = {
      baseAccuracyMultiplier: 1.0,
      damageVariance: 0.1,
      baseDamageMultiplier: 1.0,
      vitalPointSeverityMultiplier: {
        minor: 1.1,
        moderate: 1.3,
        severe: 1.6,
        critical: 2.0,
        lethal: 3.0,
      },
      maxHitAngleDifference: 30, // degrees
      baseVitalPointAccuracy: 0.7,
      ...config,
    };
  }

  public setConfig(config: VitalPointSystemConfig): void {
    this.config = { ...this.config, ...config };
  }

  public getVitalPointById(id: string): VitalPoint | undefined {
    return this.vitalPoints.get(id);
  }

  public getAllVitalPoints(): readonly VitalPoint[] {
    return Array.from(this.vitalPoints.values());
  }

  public getVitalPointsByRegion(region: string): readonly VitalPoint[] {
    return Array.from(this.vitalPoints.values()).filter(
      (vp) => vp.location.region === region
    );
  }

  public getVitalPointEffects(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    isCriticalHit: boolean
  ): readonly StatusEffect[] {
    const effects: StatusEffect[] = [];
    if (vitalPoint.effects) {
      vitalPoint.effects.forEach((vpEffect) => {
        // Convert VitalPointEffect to StatusEffect
        // This is a simplified conversion, you might need more logic
        effects.push({
          id: vpEffect.id || `${vitalPoint.id}_${technique.id}_effect`,
          type: vpEffect.type, // Assuming VitalPointEffect.type maps to StatusEffectType
          intensity: vpEffect.intensity,
          duration: vpEffect.duration * (isCriticalHit ? 1.5 : 1), // Example: critical hits extend duration
          description: vpEffect.description,
          stackable:
            vpEffect.stackable !== undefined ? vpEffect.stackable : false,
        });
      });
    }
    // Add technique-specific effects if any, potentially modified by vital point
    if (technique.effects) {
      technique.effects.forEach((techEffect) => {
        effects.push({
          ...techEffect,
          duration: techEffect.duration * (isCriticalHit ? 1.2 : 1), // Example modification
        });
      });
    }
    return effects;
  }

  public calculateVitalPointDamage(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    attackerArchetype: PlayerArchetype, // Added archetype
    isCriticalHit: boolean = false
  ): number {
    let baseDamage =
      (technique.damageRange.min + technique.damageRange.max) / 2;

    // Apply severity multiplier
    const severityMultiplier =
      this.config.vitalPointSeverityMultiplier?.[vitalPoint.severity] || 1.0;
    baseDamage *= severityMultiplier;

    // Apply critical hit multiplier
    if (isCriticalHit) {
      baseDamage *= technique.critMultiplier || 1.5;
    }

    // Apply archetype specific modifiers if available in config
    const archetypeModifier =
      this.config.archetypeModifiers?.[attackerArchetype]?.[
        vitalPoint.category
      ] || 1.0;
    baseDamage *= archetypeModifier;

    baseDamage *= this.config.baseDamageMultiplier || 1.0;

    // Add variance
    const varianceAmount = baseDamage * (this.config.damageVariance || 0.1);
    baseDamage += Math.random() * varianceAmount * 2 - varianceAmount;

    return Math.max(0, Math.round(baseDamage));
  }

  // Add a basic calculateHitResult or similar method if tests depend on it,
  // or adjust tests to use existing/new methods.
  // For now, this is a placeholder structure.
  public calculateHit(
    technique: KoreanTechnique,
    targetVitalPointId?: string | null,
    accuracyRoll?: number // 0-1
  ): {
    hit: boolean;
    isVitalPointHit: boolean;
    vitalPoint?: VitalPoint;
    damageDealt: number;
    effects: readonly StatusEffect[];
  } {
    const vitalPoint = targetVitalPointId
      ? this.getVitalPointById(targetVitalPointId)
      : undefined;
    const baseAccuracy =
      technique.accuracy * (this.config.baseAccuracyMultiplier || 1.0);
    const finalAccuracy = vitalPoint
      ? baseAccuracy *
        (vitalPoint.baseAccuracy || this.config.baseVitalPointAccuracy || 0.7)
      : baseAccuracy;

    const roll = accuracyRoll !== undefined ? accuracyRoll : Math.random();
    const hit = roll <= finalAccuracy;

    if (!hit) {
      return {
        hit: false,
        isVitalPointHit: false,
        damageDealt: 0,
        effects: [],
      };
    }

    const isVitalPointHit = !!vitalPoint;
    const isCritical = Math.random() < (technique.critChance || 0.05);
    let damageDealt =
      (technique.damageRange.min + technique.damageRange.max) / 2;
    let effects: readonly StatusEffect[] = technique.effects || [];

    if (isVitalPointHit && vitalPoint) {
      damageDealt = this.calculateVitalPointDamage(
        vitalPoint,
        technique,
        "musa",
        isCritical
      ); // Placeholder archetype
      effects = this.getVitalPointEffects(vitalPoint, technique, isCritical);
    } else if (isCritical) {
      damageDealt *= technique.critMultiplier || 1.5;
    }

    // Apply variance
    const varianceAmount = damageDealt * (this.config.damageVariance || 0.1);
    damageDealt += Math.random() * varianceAmount * 2 - varianceAmount;
    damageDealt = Math.max(0, Math.round(damageDealt));

    return { hit: true, isVitalPointHit, vitalPoint, damageDealt, effects };
  }
}
