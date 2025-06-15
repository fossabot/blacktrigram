// Korean martial arts vital point system

import type {
  VitalPoint,
  VitalPointHitResult,
  PlayerState,
  KoreanTechnique,
  Position,
  PlayerArchetype,
} from "../types";
import type { StatusEffect } from "../types/effects";
import { SAMPLE_VITAL_POINTS } from "./vitalpoint/KoreanAnatomy";
import { DamageCalculator } from "./vitalpoint/DamageCalculator";

export class VitalPointSystem {
  constructor() {
    // Initialize system
  }

  processHit(
    targetPosition: Position,
    _technique: KoreanTechnique | null,
    baseDamage: number,
    attackerArchetype: PlayerArchetype,
    _targetDimensions: { width: number; height: number },
    targetedVitalPointId?: string | null
  ): VitalPointHitResult {
    let targetVitalPoint: VitalPoint | undefined;

    if (targetedVitalPointId) {
      targetVitalPoint = this.getVitalPointById(targetedVitalPointId);
    }

    if (!targetVitalPoint) {
      targetVitalPoint = this.findClosestVitalPoint(targetPosition);
    }

    if (!targetVitalPoint) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: "minor" as any,
      };
    }

    const damageResult = DamageCalculator.calculateVitalPointDamage(
      targetVitalPoint,
      baseDamage,
      { archetype: attackerArchetype } as PlayerState,
      0.85 // Fix: Add missing accuracy parameter
    );

    // Fix: Convert VitalPointEffect to StatusEffect
    const effects: StatusEffect[] = targetVitalPoint.effects.map((effect) => ({
      id: `${effect.id}_${Date.now()}`,
      type: "weakened" as any,
      intensity: "moderate" as any,
      duration: effect.duration,
      description: effect.description,
      stackable: effect.stackable,
      source: targetVitalPoint.id,
      startTime: Date.now(),
      endTime: Date.now() + effect.duration,
    }));

    return {
      hit: true,
      vitalPoint: targetVitalPoint,
      damage: damageResult.damage,
      effects,
      severity: targetVitalPoint.severity,
    };
  }

  getVitalPointById(id: string): VitalPoint | undefined {
    return SAMPLE_VITAL_POINTS.find((vp) => vp.id === id);
  }

  getAllVitalPoints(): readonly VitalPoint[] {
    return SAMPLE_VITAL_POINTS;
  }

  getVitalPointsInRegion(region: string): readonly VitalPoint[] {
    return SAMPLE_VITAL_POINTS.filter((vp) => vp.region === region);
  }

  private findClosestVitalPoint(position: Position): VitalPoint | undefined {
    let closestPoint: VitalPoint | undefined;
    let closestDistance = Infinity;

    for (const vitalPoint of SAMPLE_VITAL_POINTS) {
      const distance = Math.sqrt(
        Math.pow(position.x - vitalPoint.position.x, 2) +
          Math.pow(position.y - vitalPoint.position.y, 2)
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestPoint = vitalPoint;
      }
    }

    return closestPoint;
  }

  calculateHit(
    technique: KoreanTechnique,
    targetVitalPointId: string | null,
    accuracyRoll: number,
    _attackerPosition: Position,
    _defenderPosition: Position,
    _defenderStance: any
  ): VitalPointHitResult {
    const vitalPoint = targetVitalPointId
      ? this.getVitalPointById(targetVitalPointId)
      : undefined;

    if (!vitalPoint) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: "minor" as any,
      };
    }

    const hitChance = accuracyRoll * (1 - vitalPoint.difficulty);
    const isHit = Math.random() < hitChance;

    if (!isHit) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: vitalPoint.severity,
      };
    }

    const baseDamage = technique.damage || 15;
    const damage = Math.floor(baseDamage * (1 + vitalPoint.difficulty));

    // Fix: Convert VitalPointEffect to StatusEffect
    const effects: StatusEffect[] = vitalPoint.effects.map((effect) => ({
      id: `${effect.id}_${Date.now()}`,
      type: "weakened" as any,
      intensity: "moderate" as any,
      duration: effect.duration,
      description: effect.description,
      stackable: effect.stackable,
      source: vitalPoint.id,
      startTime: Date.now(),
      endTime: Date.now() + effect.duration,
    }));

    return {
      hit: true,
      vitalPoint,
      damage,
      effects,
      severity: vitalPoint.severity,
    };
  }
}

export default VitalPointSystem;
