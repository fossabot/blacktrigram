// Korean martial arts vital point system

import type {
  PlayerState,
  KoreanTechnique,
  VitalPointHitResult,
  VitalPoint,
  VitalPointEffect,
} from "../types";
import {
  VitalPointSeverity,
  VitalPointEffectType,
  EffectIntensity,
} from "../types/enums";
import { KOREAN_VITAL_POINTS } from "../types/constants/vital-points";

export class VitalPointSystem {
  private vitalPoints: readonly VitalPoint[];

  constructor() {
    this.vitalPoints = KOREAN_VITAL_POINTS;
  }

  /**
   * Check if an attack hits a vital point
   */
  checkVitalPointHit(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ): VitalPointHitResult {
    const baseHitChance = technique.accuracy * 0.3;
    const precisionBonus = this.calculatePrecisionBonus(attacker, technique);
    const finalHitChance = baseHitChance * precisionBonus;

    const isHit = Math.random() < finalHitChance;

    if (!isHit) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: VitalPointSeverity.MINOR,
      };
    }

    const targetVitalPoint = this.selectVitalPoint(technique);

    if (!targetVitalPoint) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: VitalPointSeverity.MINOR,
      };
    }

    const vitalPointDamage = this.calculateVitalPointDamage(
      targetVitalPoint,
      technique
    );

    return {
      hit: true,
      damage: vitalPointDamage,
      vitalPoint: targetVitalPoint,
      effects: targetVitalPoint.effects,
      severity: targetVitalPoint.severity,
    };
  }

  /**
   * Calculate precision bonus based on attacker stats and technique
   */
  private calculatePrecisionBonus(
    attacker: PlayerState,
    technique: KoreanTechnique
  ): number {
    // Base precision from technique
    let precision = 1.0;

    // Ki affects precision
    if (attacker.ki > 50) {
      precision *= 1.2;
    } else if (attacker.ki < 20) {
      precision *= 0.8;
    }

    // Consciousness affects precision
    if (attacker.consciousness < 50) {
      precision *= 0.7;
    }

    return precision;
  }

  /**
   * Select which vital point is targeted based on technique
   */
  private selectVitalPoint(technique: KoreanTechnique): VitalPoint | null {
    const availablePoints = this.vitalPoints.filter(
      (vp) => technique.targetAreas?.includes(vp.region || "torso") ?? true
    );

    if (availablePoints.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availablePoints.length);
    return availablePoints[randomIndex];
  }

  /**
   * Calculate damage from hitting a vital point
   */
  private calculateVitalPointDamage(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique
  ): number {
    const baseDamage =
      vitalPoint.baseDamage || vitalPoint.damage?.average || 15;
    const techniqueMultiplier = (technique.damage || 20) / 20; // Normalize to base technique

    return baseDamage * techniqueMultiplier;
  }

  /**
   * Get all vital points in a specific region
   */
  getVitalPointsByRegion(region: string): VitalPoint[] {
    return this.vitalPoints.filter((vp) => vp.region === region);
  }

  /**
   * Get vital point by ID
   */
  getVitalPointById(id: string): VitalPoint | undefined {
    return this.vitalPoints.find((vp) => vp.id === id);
  }
}
