// Korean martial arts vital point system

import type {
  VitalPoint,
  VitalPointHitResult,
  PlayerState,
  KoreanTechnique,
  Position,
} from "../types";
import {
  VitalPointCategory,
  VitalPointSeverity,
  DamageType,
} from "../types/enums";
import { KOREAN_VITAL_POINTS } from "../types/constants/vital-points";

/**
 * Korean vital point system for precise anatomical targeting
 */
export class VitalPointSystem {
  private vitalPoints: readonly VitalPoint[] = KOREAN_VITAL_POINTS;

  /**
   * Get all vital points
   */
  public getVitalPoints(): readonly VitalPoint[] {
    return this.vitalPoints;
  }

  /**
   * Check for vital point hit
   */
  public checkVitalPointHit(
    attacker: PlayerState,
    targetPosition: Position,
    technique: KoreanTechnique
  ): VitalPointHitResult {
    // Find the closest vital point to the target position
    const hitVitalPoint = this.findNearestVitalPoint(targetPosition);

    if (!hitVitalPoint) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: VitalPointSeverity.MINOR,
      };
    }

    // Calculate damage based on vital point and technique
    const damage = this.calculateVitalPointDamage(
      hitVitalPoint,
      technique,
      attacker
    );

    return {
      hit: true,
      damage,
      vitalPoint: hitVitalPoint,
      effects: hitVitalPoint.effects,
      severity: hitVitalPoint.severity,
    };
  }

  /**
   * Find the nearest vital point to a position
   */
  private findNearestVitalPoint(position: Position): VitalPoint | null {
    let nearestPoint: VitalPoint | null = null;
    let minDistance = Infinity;

    for (const vitalPoint of this.vitalPoints) {
      if (!vitalPoint.position) continue;

      const distance = Math.sqrt(
        Math.pow(position.x - vitalPoint.position.x, 2) +
          Math.pow(position.y - vitalPoint.position.y, 2)
      );

      // Check if hit is within vital point radius (default 20 pixels)
      const hitRadius = 20;
      if (distance <= hitRadius && distance < minDistance) {
        minDistance = distance;
        nearestPoint = vitalPoint;
      }
    }

    return nearestPoint;
  }

  /**
   * Calculate damage for vital point hit
   */
  private calculateVitalPointDamage(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    attacker: PlayerState
  ): number {
    const baseDamage = technique.damage || 0;

    // Vital point damage multiplier
    const vitalPointMultiplier = this.getVitalPointMultiplier(vitalPoint);

    // Technique precision bonus
    const precisionBonus = technique.accuracy || 1.0;

    return Math.floor(baseDamage * vitalPointMultiplier * precisionBonus);
  }

  /**
   * Get damage multiplier for vital point severity
   */
  private getVitalPointMultiplier(vitalPoint: VitalPoint): number {
    switch (vitalPoint.severity) {
      case VitalPointSeverity.CRITICAL:
        return 2.5;
      case VitalPointSeverity.MAJOR:
        return 2.0;
      case VitalPointSeverity.MODERATE:
        return 1.5;
      case VitalPointSeverity.MINOR:
        return 1.2;
      default:
        return 1.0;
    }
  }

  /**
   * Get vital points by category
   */
  public getVitalPointsByCategory(
    category: VitalPointCategory
  ): readonly VitalPoint[] {
    return this.vitalPoints.filter((vp) => vp.category === category);
  }

  /**
   * Get vital points by severity
   */
  public getVitalPointsBySeverity(
    severity: VitalPointSeverity
  ): readonly VitalPoint[] {
    return this.vitalPoints.filter((vp) => vp.severity === severity);
  }

  /**
   * Check if a technique is effective against target region
   */
  public isTechniqueEffective(
    technique: KoreanTechnique,
    targetVitalPoint: VitalPoint
  ): boolean {
    // Check damage type compatibility
    const damageType = technique.damageType;
    const vitalPointCategory = targetVitalPoint.category;

    // Simple effectiveness mapping
    const effectiveness: Record<DamageType, VitalPointCategory[]> = {
      [DamageType.BLUNT]: [
        VitalPointCategory.MUSCULAR,
        VitalPointCategory.SKELETAL,
      ],
      [DamageType.PIERCING]: [
        VitalPointCategory.NEUROLOGICAL,
        VitalPointCategory.VASCULAR,
      ],
      [DamageType.PRESSURE]: [
        VitalPointCategory.NEUROLOGICAL,
        VitalPointCategory.RESPIRATORY,
      ],
      [DamageType.NERVE]: [VitalPointCategory.NEUROLOGICAL],
      [DamageType.JOINT]: [VitalPointCategory.SKELETAL],
      [DamageType.INTERNAL]: [VitalPointCategory.ORGAN],
      [DamageType.SLASHING]: [VitalPointCategory.VASCULAR],
      [DamageType.IMPACT]: [VitalPointCategory.MUSCULAR],
      [DamageType.CRUSHING]: [VitalPointCategory.SKELETAL],
      [DamageType.SHARP]: [VitalPointCategory.VASCULAR],
      [DamageType.ELECTRIC]: [VitalPointCategory.NEUROLOGICAL],
      [DamageType.FIRE]: [VitalPointCategory.ORGAN],
      [DamageType.ICE]: [VitalPointCategory.VASCULAR],
      [DamageType.POISON]: [VitalPointCategory.ORGAN],
      [DamageType.PSYCHIC]: [VitalPointCategory.NEUROLOGICAL],
      [DamageType.BLOOD]: [VitalPointCategory.VASCULAR],
    };

    return effectiveness[damageType]?.includes(vitalPointCategory) ?? false;
  }

  /**
   * Get recommended vital points for a technique
   */
  public getRecommendedVitalPoints(
    technique: KoreanTechnique
  ): readonly VitalPoint[] {
    return this.vitalPoints.filter((vp) =>
      this.isTechniqueEffective(technique, vp)
    );
  }
}
