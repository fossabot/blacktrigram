// Korean martial arts vital point system

import type { VitalPoint, VitalPointHitResult } from "../types/anatomy";
import type {
  PlayerState,
  KoreanTechnique,
  Position,
  StatusEffect,
  DamageType,
} from "../types";
import { HitDetection } from "./vitalpoint/HitDetection";
import { DamageCalculator } from "./vitalpoint/DamageCalculator";
import { VITAL_POINTS_DATA } from "../types/constants";

// Add missing configuration interface
export interface VitalPointSystemConfig {
  baseDamageMultiplier: number;
  criticalHitMultiplier: number;
  vitalPointSeverityMultiplier: {
    minor: number;
    moderate: number;
    severe: number;
    critical: number;
  };
  archetypeModifiers: {
    musa: { damageBonus: number; precisionBonus: number };
    amsalja: { damageBonus: number; precisionBonus: number };
    hacker: { damageBonus: number; precisionBonus: number };
    jeongbo_yowon: { damageBonus: number; precisionBonus: number };
    jojik_pokryeokbae: { damageBonus: number; precisionBonus: number };
  };
}

export class VitalPointSystem {
  private hitDetection: HitDetection;
  private damageCalculator: DamageCalculator;
  private config: VitalPointSystemConfig;

  constructor(config?: Partial<VitalPointSystemConfig>) {
    this.config = {
      baseDamageMultiplier: 1.0,
      criticalHitMultiplier: 1.5,
      vitalPointSeverityMultiplier: {
        minor: 1.0,
        moderate: 1.3,
        severe: 1.6,
        critical: 2.0,
      },
      archetypeModifiers: {
        musa: { damageBonus: 0.1, precisionBonus: 1.0 },
        amsalja: { damageBonus: 0.15, precisionBonus: 1.2 },
        hacker: { damageBonus: 0.05, precisionBonus: 1.1 },
        jeongbo_yowon: { damageBonus: 0.08, precisionBonus: 1.15 },
        jojik_pokryeokbae: { damageBonus: 0.12, precisionBonus: 0.9 },
      },
      ...config,
    };

    this.hitDetection = new HitDetection();
    this.damageCalculator = new DamageCalculator(this.config);
  }

  /**
   * Process a hit at a specific position
   */
  async processHit(
    hitPosition: Position,
    target: PlayerState,
    technique: KoreanTechnique,
    targetVitalPointId?: string
  ): Promise<VitalPointHitResult> {
    // If specific vital point is targeted
    if (targetVitalPointId) {
      const vitalPoint = this.getVitalPointById(targetVitalPointId);
      if (vitalPoint) {
        return this.processDirectVitalPointHit(
          vitalPoint,
          technique,
          target,
          hitPosition
        );
      }
    }

    // Detect hit based on position
    const targetDimensions = { width: 100, height: 200 }; // Default dimensions
    const accuracy = target.combatSkills?.precision || 0.8; // Fix: Use combatSkills.precision

    const hitVitalPoint = this.hitDetection.detectVitalPointHit(
      hitPosition,
      targetDimensions,
      accuracy
    );

    if (hitVitalPoint) {
      return this.processDirectVitalPointHit(
        hitVitalPoint,
        technique,
        target,
        hitPosition
      );
    }

    // No vital point hit
    return {
      hit: false,
      damage: 0,
      effects: [],
      vitalPointsHit: [],
      severity: "minor",
      criticalHit: false,
      location: hitPosition,
      effectiveness: 0,
      statusEffectsApplied: [],
      painLevel: 0,
      consciousnessImpact: 0,
    };
  }

  /**
   * Process direct vital point hit
   */
  private processDirectVitalPointHit(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    target: PlayerState,
    hitPosition: Position
  ): VitalPointHitResult {
    const baseDamage = technique.damage || 20;
    const isCritical = Math.random() < (technique.critChance || 0.1);

    const damage = this.damageCalculator.calculateDamage(
      vitalPoint,
      baseDamage,
      target.archetype,
      isCritical,
      (technique.damageType as DamageType) || ("blunt" as DamageType) // Fix: Proper type casting
    );

    const effects = this.damageCalculator.determineEffects(
      vitalPoint,
      technique,
      isCritical
    );

    return {
      hit: true,
      damage,
      effects,
      vitalPointsHit: [vitalPoint],
      vitalPoint,
      severity: vitalPoint.severity,
      criticalHit: isCritical,
      location: hitPosition,
      effectiveness: vitalPoint.damageMultiplier,
      statusEffectsApplied: effects,
      painLevel: damage * (vitalPoint.severity === "critical" ? 1.2 : 0.8),
      consciousnessImpact:
        damage * (vitalPoint.category === "head" ? 0.8 : 0.4),
    };
  }

  /**
   * Get vital point by ID
   */
  getVitalPointById(id: string): VitalPoint | undefined {
    return VITAL_POINTS_DATA.find((vp) => vp.id === id);
  }

  /**
   * Get all vital points in a region
   */
  getVitalPointsByRegion(region: string): VitalPoint[] {
    return VITAL_POINTS_DATA.filter((vp) => vp.location.region === region);
  }

  /**
   * Calculate vital point accessibility
   */
  calculateAccessibility(
    vitalPoint: VitalPoint,
    attackerPosition: Position,
    defenderPosition: Position,
    defenderStance: string
  ): number {
    // Base accessibility
    let accessibility = 1.0;

    // Distance factor
    const distance = Math.sqrt(
      Math.pow(attackerPosition.x - defenderPosition.x, 2) +
        Math.pow(attackerPosition.y - defenderPosition.y, 2)
    );

    if (distance > 2.0) accessibility *= 0.5;
    else if (distance > 1.5) accessibility *= 0.7;

    // Stance protection
    if (defenderStance === "gan" && vitalPoint.category === "head") {
      accessibility *= 0.6; // Mountain stance protects head
    }

    return Math.max(0.1, Math.min(1.0, accessibility));
  }

  /**
   * Apply vital point effects to player
   */
  applyVitalPointEffects(
    target: PlayerState,
    effects: StatusEffect[]
  ): PlayerState {
    const newEffects = [...(target.activeEffects || []), ...effects];

    return {
      ...target,
      activeEffects: newEffects,
    };
  }

  /**
   * Check if vital point targeting is possible
   */
  canTargetVitalPoint(attacker: PlayerState, vitalPointId: string): boolean {
    const vitalPoint = this.getVitalPointById(vitalPointId);
    if (!vitalPoint) return false;

    // Check if attacker has enough focus/precision
    const requiredFocus = vitalPoint.baseAccuracy * 100;
    const attackerFocus = attacker.combatSkills?.focus || 50; // Fix: Use combatSkills.focus

    return attackerFocus >= requiredFocus;
  }
}
