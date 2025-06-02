import type {
  VitalPoint,
  VitalPointSystemConfig,
  VitalPointSystemInterface,
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

  /**
   * Calculate hit result for combat system integration
   * @param technique The Korean martial arts technique being used
   * @param targetedVitalPointId Optional specific vital point to target
   * @returns Hit result with damage and effects
   */
  calculateHit(
    technique: KoreanTechnique,
    targetedVitalPointId?: string | null
  ): {
    hit: boolean;
    damage: number;
    effects: readonly StatusEffect[];
    vitalPointsHit: readonly string[];
  } {
    // Determine if the hit connects based on technique accuracy
    const hit = Math.random() < technique.accuracy;

    if (!hit) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        vitalPointsHit: [],
      };
    }

    // Calculate base damage from technique range
    const baseDamage = Math.floor(
      Math.random() *
        (technique.damageRange.max - technique.damageRange.min + 1) +
        technique.damageRange.min
    );

    let finalDamage = baseDamage;
    let effects: StatusEffect[] = [];
    let vitalPointsHit: string[] = [];

    // Check if a vital point was hit
    if (targetedVitalPointId) {
      const vitalPoint = this.getVitalPointById(targetedVitalPointId);
      if (vitalPoint && Math.random() < vitalPoint.baseAccuracy) {
        // Vital point hit - apply multiplier and effects
        finalDamage = Math.floor(baseDamage * vitalPoint.damageMultiplier);
        effects = [...vitalPoint.effects];
        vitalPointsHit = [vitalPoint.id];
      }
    } else {
      // Random vital point check (lower chance)
      const allVitalPoints = this.getAllVitalPoints();
      const randomPoint =
        allVitalPoints[Math.floor(Math.random() * allVitalPoints.length)];

      if (Math.random() < 0.1) {
        // 10% chance for random vital point hit
        finalDamage = Math.floor(baseDamage * randomPoint.damageMultiplier);
        effects = [...randomPoint.effects];
        vitalPointsHit = [randomPoint.id];
      }
    }

    return {
      hit: true,
      damage: finalDamage,
      effects: effects as readonly StatusEffect[],
      vitalPointsHit: vitalPointsHit as readonly string[],
    };
  }
}
