// Korean martial arts vital point system

import type {
  VitalPoint,
  VitalPointHitResult,
  PlayerState,
  KoreanTechnique,
  Position,
  VitalPointSystemConfig,
} from "../types";
import {
  VitalPointCategory,
  VitalPointSeverity,
  DamageType,
} from "../types/enums";
import { KOREAN_VITAL_POINTS } from "../types/constants/vital-points";
import { DamageCalculator } from "./vitalpoint/DamageCalculator";

/**
 * Korean vital point system for precise anatomical targeting
 */
export class VitalPointSystem {
  private vitalPoints: readonly VitalPoint[] = KOREAN_VITAL_POINTS;
  private damageCalculator: DamageCalculator;

  constructor(config?: VitalPointSystemConfig) {
    const defaultConfig: VitalPointSystemConfig = {
      damageMultipliers: {
        [VitalPointSeverity.MINOR]: 1.0,
        [VitalPointSeverity.MODERATE]: 1.3,
        [VitalPointSeverity.MAJOR]: 1.6,
        [VitalPointSeverity.CRITICAL]: 2.0,
      },
      effectDurations: {
        stun: 2000,
        pain: 3000,
        unconsciousness: 5000,
        disorientation: 4000,
      },
      hitRadiusModifier: 1.0,
      accuracyThreshold: 0.7,
    };

    this.damageCalculator = new DamageCalculator(config || defaultConfig);
  }

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
    const hitVitalPoint = this.findNearestVitalPoint(targetPosition);

    if (!hitVitalPoint) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: VitalPointSeverity.MINOR,
      };
    }

    // Check accuracy for vital point hit
    const hitChance = this.calculateVitalPointHitChance(
      technique,
      hitVitalPoint
    );
    if (Math.random() > hitChance) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: VitalPointSeverity.MINOR,
      };
    }

    // Calculate damage
    const damage = DamageCalculator.calculateVitalPointDamage(
      hitVitalPoint,
      technique,
      attacker
    );

    // Determine effects
    const isCritical = Math.random() < (technique.critChance || 0.1);
    const effects = this.damageCalculator.determineEffects(
      hitVitalPoint,
      technique,
      isCritical
    );

    return {
      hit: true,
      damage,
      vitalPoint: hitVitalPoint,
      effects,
      severity: hitVitalPoint.severity,
    };
  }

  /**
   * Calculate vital point hit chance
   */
  private calculateVitalPointHitChance(
    technique: KoreanTechnique,
    vitalPoint: VitalPoint
  ): number {
    const baseChance = technique.accuracy * 0.3; // 30% of technique accuracy
    const difficultyModifier = vitalPoint.difficulty
      ? 1 - vitalPoint.difficulty
      : 1.0;
    return baseChance * difficultyModifier;
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

      const hitRadius = vitalPoint.radius || 20;
      if (distance <= hitRadius && distance < minDistance) {
        minDistance = distance;
        nearestPoint = vitalPoint;
      }
    }

    return nearestPoint;
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
   * Get vital points by region
   */
  public getVitalPointsByRegion(region: string): readonly VitalPoint[] {
    return this.vitalPoints.filter((vp) => vp.region === region);
  }

  /**
   * Check if a technique is effective against target region
   */
  public isTechniqueEffective(
    technique: KoreanTechnique,
    targetVitalPoint: VitalPoint
  ): boolean {
    const damageType = technique.damageType;
    const vitalPointCategory = targetVitalPoint.category;

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

  /**
   * Calculate vital point vulnerability based on player state
   */
  public calculateVulnerability(
    vitalPoint: VitalPoint,
    targetPlayer: PlayerState
  ): number {
    let vulnerability = 1.0;

    // Stance affects vulnerability
    const stanceModifier = this.getStanceVulnerabilityModifier(
      targetPlayer.currentStance,
      vitalPoint
    );
    vulnerability *= stanceModifier;

    // Health affects vulnerability
    const healthRatio = targetPlayer.health / targetPlayer.maxHealth;
    const healthModifier = 1 + (1 - healthRatio) * 0.3; // Up to 30% more vulnerable when injured
    vulnerability *= healthModifier;

    // Balance affects vulnerability
    const balanceModifier = targetPlayer.balance / 100;
    vulnerability *= 1 + (1 - balanceModifier) * 0.2; // Up to 20% more vulnerable when off-balance

    return vulnerability;
  }

  /**
   * Get stance vulnerability modifier
   */
  private getStanceVulnerabilityModifier(
    stance: string,
    vitalPoint: VitalPoint
  ): number {
    // Different stances protect different regions
    const stanceProtection: Record<string, Record<string, number>> = {
      geon: { head: 0.8, torso: 1.0, arms: 1.1, legs: 1.2 },
      gan: { head: 1.2, torso: 0.7, arms: 1.0, legs: 1.1 },
      gon: { head: 1.1, torso: 0.8, arms: 1.2, legs: 0.9 },
    };

    const region = vitalPoint.region || "torso";
    return stanceProtection[stance]?.[region] || 1.0;
  }
}
