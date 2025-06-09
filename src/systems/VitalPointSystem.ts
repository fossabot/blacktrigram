// Korean martial arts vital point system

import {
  VitalPoint,
  VitalPointHitResult,
  PlayerState,
  KoreanTechnique,
  Position,
} from "../types";
import {
  VitalPointSeverity,
  VitalPointCategory, // Fix: Add missing import
  DamageType, // Fix: Add missing import
} from "../types/enums";

/**
 * Damage calculation and effect determination
 */
class DamageCalculator {
  static calculateVitalPointDamage(
    baseDamage: number,
    vitalPoint: VitalPoint,
    technique: KoreanTechnique
  ): number {
    let multiplier = 1.0;

    switch (vitalPoint.severity) {
      case VitalPointSeverity.MAJOR:
        multiplier = 2.0;
        break;
      case VitalPointSeverity.MODERATE:
        multiplier = 1.5;
        break;
      case VitalPointSeverity.MINOR:
        multiplier = 1.2;
        break;
    }

    return Math.floor(baseDamage * multiplier);
  }

  static determineEffects(
    vitalPoint: VitalPoint,
    damage: number
  ): readonly any[] {
    // Basic effect determination based on vital point category
    const effects = [];

    switch (vitalPoint.category) {
      case VitalPointCategory.NEUROLOGICAL:
        if (damage > 20) effects.push("stun");
        break;
      case VitalPointCategory.VASCULAR:
        if (damage > 15) effects.push("bleeding");
        break;
      case VitalPointCategory.RESPIRATORY:
        if (damage > 25) effects.push("breathless");
        break;
    }

    return effects;
  }
}

/**
 * Korean vital point system for precise anatomical targeting
 */
export class VitalPointSystem {
  private vitalPoints: VitalPoint[] = [];
  // Fix: Add damageCalculator property
  private damageCalculator = DamageCalculator;

  constructor() {
    // Initialize with basic vital points
    this.initializeVitalPoints();
  }

  private initializeVitalPoints(): void {
    // Basic vital points for the system
    this.vitalPoints = [
      {
        id: "head_temple",
        korean: {
          korean: "태양혈",
          english: "Temple Point",
        },
        english: "Temple Point",
        category: "neurological" as any,
        severity: VitalPointSeverity.MAJOR,
        position: { x: 0, y: -30 },
        radius: 10,
        effects: [],
        description: {
          korean: "머리 측면의 중요 혈점",
          english: "Critical point on side of head",
        },
        difficulty: 0.8,
        requiredForce: 25,
      },
    ];
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
    category: VitalPointCategory // Fix: Use proper enum type
  ): VitalPoint[] {
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

    // Fix: Properly implement damage type effectiveness
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

    const effectiveCategories = effectiveness[damageType] || [];
    return effectiveCategories.includes(vitalPoint.category) ? 1.5 : 1.0;
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

  /**
   * Process a hit on a target position
   */
  processHit(
    targetPosition: Position,
    technique: KoreanTechnique,
    baseDamage: number
  ): VitalPointHitResult {
    const hit = Math.random() < technique.accuracy;

    if (!hit) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: VitalPointSeverity.MINOR,
      };
    }

    const vitalPoint = this.findVitalPointAtPosition(targetPosition);

    let damage = baseDamage;
    if (vitalPoint) {
      // Fix: Use DamageCalculator
      damage = DamageCalculator.calculateVitalPointDamage(
        baseDamage,
        vitalPoint,
        technique
      );
    }

    // Fix: Use damageCalculator property
    const effects = this.damageCalculator.determineEffects(vitalPoint, damage);

    return {
      hit: true,
      vitalPoint,
      damage: Math.floor(damage),
      effects,
      severity: vitalPoint?.severity || VitalPointSeverity.MINOR,
    };
  }

  /**
   * Find a vital point at a specific position
   */
  private findVitalPointAtPosition(
    position: Position,
    targetedVitalPointId?: string | null
  ): VitalPoint | undefined {
    if (targetedVitalPointId) {
      return this.vitalPoints.find((vp) => vp.id === targetedVitalPointId);
    }

    return this.vitalPoints.find((vp) => {
      const distance = Math.sqrt(
        Math.pow(position.x - vp.position.x, 2) +
          Math.pow(position.y - vp.position.y, 2)
      );
      return distance <= vp.radius;
    });
  }

  /**
   * Calculate the accuracy of a vital point attack
   */
  calculateVitalPointAccuracy(
    targetPosition: Position,
    attackAccuracy: number,
    vitalPoint: VitalPoint
  ): number {
    const distance = Math.sqrt(
      Math.pow(targetPosition.x - vitalPoint.position.x, 2) +
        Math.pow(targetPosition.y - vitalPoint.position.y, 2)
    );

    const accuracyModifier = Math.max(0, 1 - distance / vitalPoint.radius);
    return attackAccuracy * accuracyModifier;
  }

  /**
   * Get a vital point by its ID
   */
  getVitalPointById(id: string): VitalPoint | undefined {
    return this.vitalPoints.find((vp) => vp.id === id);
  }

  /**
   * Get all vital points
   */
  getAllVitalPoints(): readonly VitalPoint[] {
    return this.vitalPoints;
  }
}
