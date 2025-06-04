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

  public getVitalPointsByRegion(region: string): VitalPoint[] {
    // Fix: Convert Map values to array first, then filter with proper typing
    return Array.from(this.vitalPoints.values()).filter(
      (vp: VitalPoint) => vp.location.region === region
    );
  }

  // Fix: Add missing getVitalPointById method that CombatSystem expects
  public getVitalPointById(id: string): VitalPoint | null {
    return this.vitalPoints.get(id) || null;
  }

  // Fix: Add missing calculateHit method that CombatSystem expects
  public calculateHit(
    technique: KoreanTechnique,
    vitalPoint: VitalPoint,
    accuracyBonus: number,
    attackerPosition: Position
  ): VitalPointHitResult {
    const baseAccuracy = vitalPoint.baseAccuracy * accuracyBonus;
    const hit = Math.random() < baseAccuracy;

    if (!hit) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        vitalPointsHit: [],
        vitalPoint,
        severity: vitalPoint.severity,
        criticalHit: false,
        location: attackerPosition,
        effectiveness: 0,
        statusEffectsApplied: [],
        painLevel: 0,
        consciousnessImpact: 0,
      };
    }

    const damage = this.damageCalculator.calculateDamage(
      vitalPoint,
      technique.damageRange?.min || 10,
      "musa", // Default archetype for now
      false,
      technique.damageType
    );

    return {
      hit: true,
      damage,
      effects: vitalPoint.effects,
      vitalPointsHit: [vitalPoint],
      vitalPoint,
      severity: vitalPoint.severity,
      criticalHit: damage > (technique.damageRange?.max || 20),
      location: attackerPosition,
      effectiveness: vitalPoint.damageMultiplier,
      statusEffectsApplied: vitalPoint.effects,
      painLevel: damage * 0.8,
      consciousnessImpact: damage * 0.6,
    };
  }
}
