// Korean martial arts vital point system

import type {
  VitalPoint,
  PlayerArchetype,
  KoreanTechnique,
  VitalPointHitResult,
  Position,
  DamageType,
  VitalPointEffect,
} from "../types";
import type { BodyRegion } from "../types/enums"; // Remove unused VitalPointSeverity

import { VITAL_POINTS_DATA } from "./vitalpoint/KoreanVitalPoints"; // Assuming this exports all vital points
import { DamageCalculator } from "./vitalpoint/DamageCalculator";

// Configuration for the VitalPointSystem
export interface VitalPointSystemConfig {
  readonly baseAccuracyMultiplier?: number;
  readonly damageVariance?: number;
  readonly archetypeModifiers?: Record<PlayerArchetype, Record<string, number>>;
  readonly baseDamageMultiplier?: number;
  readonly vitalPointSeverityMultiplier?: Record<string, number>;
  readonly maxHitAngleDifference?: number;
  readonly baseVitalPointAccuracy?: number;
  readonly criticalHitMultiplier?: number;
}

export class VitalPointSystem {
  private config: VitalPointSystemConfig;
  private damageCalculator: DamageCalculator;
  private vitalPoints: readonly VitalPoint[];

  constructor(config?: VitalPointSystemConfig) {
    this.config = config || {
      baseDamageMultiplier: 1.0,
      archetypeModifiers: {
        // Ensure all archetypes are present
        musa: {},
        amsalja: {},
        hacker: {},
        jeongbo: {},
        jojik: {},
      },
      vitalPointSeverityMultiplier: {
        minor: 1.1,
        moderate: 1.3,
        severe: 1.6,
        critical: 2.0,
        lethal: 3.0,
      },
      criticalHitMultiplier: 1.5, // Default critical hit multiplier
    };
    this.damageCalculator = new DamageCalculator(this.config);
    // Ensure VITAL_POINTS_DATA is an array of VitalPoint objects
    this.vitalPoints = VITAL_POINTS_DATA;
  }

  public calculateHit(
    technique: KoreanTechnique,
    targetVitalPointId: string | null,
    accuracyRoll: number,
    attackerPosition: Position
  ): VitalPointHitResult {
    if (!targetVitalPointId) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        criticalHit: false,
        location: attackerPosition,
        vitalPoint: undefined,
        vitalPointsHit: [],
        // Add missing properties
        effectiveness: 0,
        statusEffectsApplied: [],
        painLevel: 0,
        consciousnessImpact: 0,
      };
    }

    const vitalPoint = this.getVitalPointById(targetVitalPointId);
    if (!vitalPoint) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        criticalHit: false,
        location: attackerPosition,
        vitalPoint: undefined,
        vitalPointsHit: [],
        effectiveness: 0,
        statusEffectsApplied: [],
        painLevel: 0,
        consciousnessImpact: 0,
      };
    }

    // Calculate damage with actual VitalPoint object
    const damageDealt = this.calculateDamageOnVitalPoint(
      vitalPoint, // Pass VitalPoint object
      technique.damageRange?.min || 10,
      "musa", // Default archetype
      accuracyRoll > 0.9,
      technique.damageType || ("blunt" as DamageType)
    );

    const effects: VitalPointEffect[] = vitalPoint.effects || [];
    const isCritical = accuracyRoll > 0.9;

    return {
      hit: true,
      damage: damageDealt,
      effects,
      criticalHit: isCritical,
      location: attackerPosition,
      vitalPoint,
      vitalPointsHit: [vitalPoint],
      // Add missing properties
      effectiveness: vitalPoint.damageMultiplier || 1.0,
      statusEffectsApplied: effects.map((e) => ({
        id: e.id,
        type: e.type,
        intensity: e.intensity,
        duration: e.duration,
        description: e.description,
        stackable: e.stackable,
        source: "vital_point",
      })),
      painLevel: damageDealt * (vitalPoint.severity === "critical" ? 1.5 : 1.0),
      consciousnessImpact:
        vitalPoint.category === "head" ? damageDealt * 0.8 : damageDealt * 0.2,
    };
  }

  private calculateDamageOnVitalPoint(
    vitalPoint: VitalPoint, // Change parameter type
    baseDamage: number,
    archetype: PlayerArchetype,
    isCritical: boolean,
    damageType: DamageType
  ): number {
    const multiplier = vitalPoint.damageMultiplier || 1.0;
    const critMultiplier = isCritical ? 1.5 : 1.0;
    return Math.floor(baseDamage * multiplier * critMultiplier);
  }

  public getVitalPointById(id: string): VitalPoint | null {
    return this.vitalPoints.find((vp) => vp.id === id) || null;
  }

  public getEffectsForVitalPoint(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    isCritical: boolean
  ): readonly VitalPointEffect[] {
    // Fix return type
    const effects: VitalPointEffect[] = [];
    if (technique.effects) {
      effects.push(
        ...technique.effects.map((eff) => ({ ...eff } as VitalPointEffect))
      );
    }
    if (vitalPoint.effects) {
      effects.push(...vitalPoint.effects);
    }
    if (isCritical) {
      // Add or enhance critical effects
      // Example: enhance duration or intensity
    }
    return effects;
  }

  public calculateVitalPointHitEffects(
    vitalPoint: VitalPoint,
    baseDamage: number,
    archetype: PlayerArchetype,
    technique: KoreanTechnique,
    isCritical: boolean
  ): { damage: number; effects: readonly VitalPointEffect[] } {
    const damage = this.calculateDamageOnVitalPoint(
      vitalPoint,
      baseDamage,
      archetype,
      isCritical,
      technique.damageType || ("blunt" as DamageType) // Provide default
    );
    const effects = this.getEffectsForVitalPoint(
      vitalPoint,
      technique,
      isCritical
    );
    return { damage, effects };
  }

  // Add missing method referenced in tests
  public getVitalPointsInRegion(region: BodyRegion): readonly VitalPoint[] {
    return this.vitalPoints.filter((vp) => vp.location.region === region);
  }
}
