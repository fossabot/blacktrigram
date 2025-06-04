// Korean martial arts vital point system

import type {
  VitalPoint,
  VitalPointHitResult,
  KoreanTechnique,
  Position,
  VitalPointEffect,
} from "../types";
import type { BodyRegion, VitalPointCategory } from "../types/enums";

export class VitalPointSystem {
  private readonly vitalPoints: Map<string, VitalPoint>;

  constructor(vitalPoints: readonly VitalPoint[]) {
    this.vitalPoints = new Map();
    vitalPoints.forEach((vp) => this.vitalPoints.set(vp.id, vp));
  }

  public calculateHit(
    _technique: KoreanTechnique, // Mark unused parameter
    vitalPoint: VitalPoint,
    accuracyRoll: number,
    _attackerPosition: Position
  ): VitalPointHitResult {
    const effects: readonly VitalPointEffect[] = vitalPoint.effects || [];

    return {
      hit: true,
      damage: 0, // Calculate actual damage if needed
      effects,
      criticalHit: accuracyRoll > 0.9,
      location: _attackerPosition,
      vitalPoint,
      vitalPointsHit: [vitalPoint],
      effectiveness: vitalPoint.damageMultiplier || 1.0,
      statusEffectsApplied: [...effects].map((e) => ({
        id: e.id,
        type: e.type,
        intensity: e.intensity,
        duration: e.duration,
        description: e.description,
        stackable: e.stackable,
        source: "vital_point",
      })),
      painLevel: 0, // Calculate actual pain level if needed
      consciousnessImpact: 0, // Calculate actual consciousness impact if needed
    };
  }

  public getVitalPointById(id: string): VitalPoint | undefined {
    return this.vitalPoints.get(id);
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

  // Add missing method referenced in tests
  public getVitalPointsInRegion(region: BodyRegion): readonly VitalPoint[] {
    return this.vitalPoints.filter((vp) => vp.location.region === region);
  }

  public getVitalPointsByCategory(category: VitalPointCategory): VitalPoint[] {
    // Fix: Convert Map values to array first, then filter with proper typing
    return Array.from(this.vitalPoints.values()).filter(
      (vp: VitalPoint) => vp.category === category
    );
  }
}
