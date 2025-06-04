// Korean martial arts vital point system

import type {
  VitalPoint,
  PlayerArchetype,
  KoreanTechnique,
  StatusEffect,
  DamageType,
  VitalPointHitResult,
  Position,
  TrigramStance,
  BodyRegion,
  VitalPointEffect,
} from "../types";

import {
  ANATOMICAL_REGIONS_DATA,
  RegionData,
} from "./vitalpoint/AnatomicalRegions";
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
  private anatomicalRegions: Readonly<Record<BodyRegion, RegionData>>;

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
    this.anatomicalRegions = ANATOMICAL_REGIONS_DATA;
  }

  public getVitalPointById(id: string): VitalPoint | null {
    const found = this.vitalPoints.find((vp) => vp.id === id);
    return found || null;
  }

  public getVitalPointsInRegion(regionKey: string): readonly VitalPoint[] {
    const region = (this.anatomicalRegions as Record<string, RegionData>)[
      regionKey
    ]; // Cast to allow string key
    if (!region || !region.vitalPoints) return [];

    // If region.vitalPoints are IDs
    if (typeof region.vitalPoints[0] === "string") {
      return (region.vitalPoints as readonly string[])
        .map((id) => this.getVitalPointById(id))
        .filter((vp) => vp !== undefined) as VitalPoint[];
    }
    // If region.vitalPoints are VitalPoint objects
    return region.vitalPoints as readonly VitalPoint[];
  }

  public calculateDamageOnVitalPoint(
    vitalPoint: VitalPoint,
    baseDamage: number,
    archetype: PlayerArchetype, // Made archetype non-optional, ensure it's always passed
    isCriticalHit: boolean = false,
    damageType: DamageType
  ): number {
    // Use archetype in calculation if intended, e.g. pass to damageCalculator
    return this.damageCalculator.calculateDamage(
      vitalPoint,
      baseDamage,
      archetype, // Pass archetype
      isCriticalHit,
      damageType
    );
  }

  public getEffectsForVitalPoint(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique, // Added: technique might influence effects
    isCritical: boolean
  ): readonly VitalPointEffect[] {
    // Changed return type to VitalPointEffect[]
    // Combine technique effects and vital point effects
    const effects: VitalPointEffect[] = [];
    if (technique.effects) {
      effects.push(
        ...technique.effects.map((eff) => ({ ...eff } as VitalPointEffect))
      ); // Ensure they are VitalPointEffect
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

  public calculateHit(
    technique: KoreanTechnique,
    targetVitalPointId: string | null,
    accuracyRoll: number,
    defenderPosition: Position,
    defenderStance: TrigramStance
  ): VitalPointHitResult {
    const baseAccuracy = technique.accuracy ?? 0.8;
    const hitSuccess = accuracyRoll <= baseAccuracy;

    if (!hitSuccess) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        criticalHit: false,
        location: defenderPosition, // Or a "miss" location
        vitalPoint: null,
        vitalPointsHit: [],
      };
    }

    let finalDamage = technique.damageRange
      ? (technique.damageRange.min + technique.damageRange.max) / 2
      : technique.damage || 10;
    let isCritical = Math.random() < (technique.critChance || 0.1);
    let hitVitalPoint: VitalPoint | null = null;
    if (targetVitalPointId) {
      const foundVp = this.getVitalPointById(targetVitalPointId);
      hitVitalPoint = foundVp || null;
    }

    const isCriticalHit = Math.random() < (technique.critChance || 0);

    let damageDealt = finalDamage;
    const effects: VitalPointEffect[] = [];

    // Specific vital point targeted
    if (hitVitalPoint) {
      damageDealt = this.damageCalculator.calculateDamage(
        hitVitalPoint,
        finalDamage,
        "musa",
        isCriticalHit,
        technique.damageType || "blunt" // Provide default for undefined
      );
      effects.push(
        ...this.damageCalculator.determineEffects(
          hitVitalPoint,
          technique,
          isCriticalHit
        )
      );
      if (isCritical) damageDealt *= technique.critMultiplier || 1.5;

      return {
        hit: true,
        damage: Math.round(damageDealt),
        effects: effects,
        criticalHit: isCritical,
        location: hitVitalPoint.location, // Use vital point's defined location or hit processing location
        vitalPoint: hitVitalPoint,
        vitalPointsHit: [hitVitalPoint],
      };
    } else {
      // Standard body hit, no vital point involved
      damageDealt = this.damageCalculator.calculateDamage(
        {
          // Create a generic "body" vital point for calculation if needed
          id: "body_hit",
          name: { korean: "몸통", english: "Body" },
          koreanName: "몸통",
          englishName: "Body",
          category: "general",
          description: {
            korean: "일반적인 신체 부위",
            english: "General body area",
          },
          location: { x: 0, y: 0, region: "torso" },
          effects: [],
          baseDamage: 0,
          damageMultiplier: 1,
          techniques: [],
          severity: "minor",
          baseAccuracy: 0.7,
        },
        finalDamage,
        "musa", // Placeholder: Attacker's archetype should be passed in
        isCriticalHit,
        technique.damageType || "blunt" // Provide default if undefined
      );
      // Add generic hit effects if any
    }

    return {
      hit: true,
      damage: Math.round(damageDealt),
      effects: effects,
      criticalHit: isCritical,
      location: defenderPosition, // General hit location
      vitalPoint: null,
      vitalPointsHit: [],
    };
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
      technique.damageType
    );
    const effects = this.getEffectsForVitalPoint(
      vitalPoint,
      technique,
      isCritical
    );
    return { damage, effects };
  }
}
