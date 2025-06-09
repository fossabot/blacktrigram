// Korean martial arts vital point system

import {
  type VitalPoint,
  type AnatomicalRegion,
  type PlayerState,
  type DamageResult,
  type KoreanTechnique,
  type PlayerArchetype,
  EffectIntensity,
  EffectType,
  Position,
  StatusEffect,
  TrigramStance,
  VitalPointEffect,
  VitalPointHitResult,
  VitalPointSeverity,
} from "../types";
import { KOREAN_VITAL_POINTS } from "../types/constants/vital-points";
import { calculateDamage } from "./vitalpoint/DamageCalculator"; // Assuming this exists
import { getTargetedVitalPoints } from "./vitalpoint/HitDetection"; // Assuming this exists

export class VitalPointSystem {
  private static vitalPoints: Map<string, VitalPoint> = new Map();

  static {
    // Initialize vital points system
    KOREAN_VITAL_POINTS.forEach((point) => {
      this.vitalPoints.set(point.id, point);
    });
  }

  constructor(
    _archetypes?: PlayerArchetype[] // private archetypes: PlayerArchetype[] // If needed
  ) {
    // this.config = config || {}; // Initialize with default or provided config
  }

  /**
   * Calculate damage based on vital point targeting
   */
  static calculateVitalPointDamage(
    targetPoint: VitalPoint,
    technique: KoreanTechnique,
    attackerArchetype: PlayerArchetype,
    precision: number = 1.0
  ): DamageResult {
    const baseDamage = technique.damage || 10;
    const pointMultiplier = targetPoint.damageMultiplier || 1.0;
    const archetypeBonus = this.getArchetypeBonus(
      attackerArchetype,
      targetPoint
    );

    const finalDamage = Math.round(
      baseDamage * pointMultiplier * archetypeBonus * precision
    );

    return {
      damage: finalDamage,
      type: targetPoint.effects?.includes("stun") ? "stun" : "normal",
      effects: targetPoint.effects || [],
      critical: precision > 0.9 && Math.random() < 0.2,
      vitalPointHit: true,
      targetPoint: targetPoint.id,
    };
  }

  /**
   * Get archetype-specific bonus for vital point attacks
   */
  private static getArchetypeBonus(
    archetype: PlayerArchetype,
    vitalPoint: VitalPoint
  ): number {
    switch (archetype) {
      case "amsalja": // Assassin - bonus to nerve points
        return vitalPoint.type === "nerve" ? 1.5 : 1.0;
      case "musa": // Traditional warrior - bonus to bone points
        return vitalPoint.type === "bone" ? 1.3 : 1.0;
      case "hacker": // Cyber warrior - bonus to tech precision
        return vitalPoint.precision ? 1.4 : 1.0;
      case "jeongbo_yowon": // Intelligence operative - bonus to pressure points
        return vitalPoint.type === "pressure" ? 1.3 : 1.0;
      case "jojik_pokryeokbae": // Crime fighter - bonus to blood flow
        return vitalPoint.type === "blood" ? 1.3 : 1.0;
      default:
        return 1.0;
    }
  }

  /**
   * Check if attack hits vital point based on position and technique
   */
  static checkVitalPointHit(
    attackPosition: { x: number; y: number },
    targetPosition: { x: number; y: number },
    technique: KoreanTechnique,
    precision: number
  ): { hit: boolean; vitalPoint?: VitalPoint; accuracy: number } {
    const distance = Math.sqrt(
      Math.pow(attackPosition.x - targetPosition.x, 2) +
        Math.pow(attackPosition.y - targetPosition.y, 2)
    );

    const hitRadius = (technique.accuracy || 0.8) * precision * 30;

    if (distance <= hitRadius) {
      // Find relevant vital point based on attack area
      const relevantPoints = Array.from(this.vitalPoints.values()).filter(
        (point) => technique.targetAreas?.includes(point.region)
      );

      if (relevantPoints.length > 0) {
        const selectedPoint =
          relevantPoints[Math.floor(Math.random() * relevantPoints.length)];

        return {
          hit: true,
          vitalPoint: selectedPoint,
          accuracy: Math.max(0, 1 - distance / hitRadius),
        };
      }
    }

    return { hit: false, accuracy: 0 };
  }

  /**
   * Get all vital points for a specific anatomical region
   */
  static getVitalPointsForRegion(region: AnatomicalRegion): VitalPoint[] {
    return Array.from(this.vitalPoints.values()).filter(
      (point) => point.region === region
    );
  }

  /**
   * Apply vital point effects to player state
   */
  static applyVitalPointEffects(
    playerState: PlayerState,
    vitalPoint: VitalPoint,
    damage: number
  ): PlayerState {
    let updatedState = { ...playerState };

    // Apply damage
    updatedState.health = Math.max(0, updatedState.health - damage);

    // Apply specific effects
    if (vitalPoint.effects) {
      for (const effect of vitalPoint.effects) {
        switch (effect) {
          case "stun":
            updatedState.stunDuration = Math.max(
              updatedState.stunDuration,
              vitalPoint.stunDuration || 1000
            );
            break;
          case "bleeding":
            // Add bleeding effect (could extend PlayerState for this)
            break;
          case "paralysis":
            updatedState.stamina = Math.max(0, updatedState.stamina - 20);
            break;
          case "unconscious":
            if (updatedState.health <= 10) {
              updatedState.health = 0;
            }
            break;
        }
      }
    }

    return updatedState;
  }

  public processHit(
    targetPosition: Position,
    technique: KoreanTechnique,
    baseDamage: number,
    attackerArchetype: PlayerArchetype,
    targetDimensions: { width: number; height: number },
    targetedVitalPointId?: string | null
  ): VitalPointHitResult {
    const hitVitalPoints = getTargetedVitalPoints(
      targetPosition, // This should be the actual impact point
      targetDimensions,
      technique.range ?? 1, // Example range
      targetedVitalPointId
    );

    let totalDamage = baseDamage;
    const effectsApplied: StatusEffect[] = [];
    const finalVitalPointsHit: VitalPoint[] = [];
    let mostSevereVitalPoint: VitalPoint | undefined = undefined;
    let overallSeverity: VitalPointSeverity | undefined = undefined;
    let isCritical = false;

    if (hitVitalPoints.length > 0) {
      hitVitalPoints.forEach((vp) => {
        finalVitalPointsHit.push(vp);
        const vpDamage = this.calculateVitalPointDamage(
          vp,
          baseDamage,
          attackerArchetype
        );
        totalDamage += vpDamage * (vp.damageMultiplier || 1) - baseDamage; // Add bonus damage

        if (Math.random() < (technique.critChance ?? 0.05)) {
          // Example crit chance
          isCritical = true;
          totalDamage *= technique.critMultiplier ?? 1.5;
        }

        vp.effects.forEach((effect: VitalPointEffect) => {
          // Convert VitalPointEffect to StatusEffect
          effectsApplied.push({
            id: `${effect.id}_${Date.now()}`,
            type: effect.type as EffectType,
            name: effect.description, // Assuming description can serve as name
            description: effect.description,
            duration: effect.duration,
            startTime: Date.now(),
            endTime: Date.now() + effect.duration,
            intensity: effect.intensity as EffectIntensity,
            stackable: effect.stackable,
            source: technique.id,
            // magnitude: effect.intensity, // Or derive from intensity
          });
        });
        if (
          !mostSevereVitalPoint ||
          VITAL_POINTS_SEVERITY_ORDER[vp.severity] >
            VITAL_POINTS_SEVERITY_ORDER[mostSevereVitalPoint.severity]
        ) {
          mostSevereVitalPoint = vp;
          overallSeverity = vp.severity;
        }
      });
    }

    return {
      hit: hitVitalPoints.length > 0,
      damage: Math.round(totalDamage),
      effects: effectsApplied,
      vitalPointsHit: finalVitalPointsHit,
      vitalPoint: mostSevereVitalPoint,
      severity: overallSeverity,
      criticalHit: isCritical,
      location: targetPosition, // This should be the actual hit location
      effectiveness: 1, // Placeholder, could be calculated based on hit quality
      statusEffectsApplied: effectsApplied, // Duplicate for now, consider unifying
      painLevel: mostSevereVitalPoint
        ? VITAL_POINTS_SEVERITY_ORDER[mostSevereVitalPoint.severity] * 10
        : 0, // Example pain
      consciousnessImpact: mostSevereVitalPoint
        ? VITAL_POINTS_SEVERITY_ORDER[mostSevereVitalPoint.severity] * 5
        : 0, // Example impact
    };
  }

  public calculateHit(
    _technique: KoreanTechnique,
    _targetVitalPointId: string | null,
    _accuracyRoll: number,
    _attackerPosition: Position,
    _defenderPosition: Position,
    _defenderStance: TrigramStance
  ): VitalPointHitResult {
    // Placeholder for the other calculateHit signature if needed
    return {
      hit: false,
      damage: 0,
      effects: [],
      vitalPointsHit: [],
      criticalHit: false,
      location: { x: 0, y: 0 },
      effectiveness: 0,
      statusEffectsApplied: [],
      painLevel: 0,
      consciousnessImpact: 0,
    };
  }

  public applyVitalPointEffects(
    player: PlayerState,
    _vitalPoint: VitalPoint,
    _intensityMultiplier?: number
  ): PlayerState {
    // Placeholder
    return player;
  }
}

// Helper for severity comparison
const VITAL_POINTS_SEVERITY_ORDER: Record<VitalPointSeverity, number> = {
  [VitalPointSeverity.MINOR]: 1,
  [VitalPointSeverity.MODERATE]: 2,
  [VitalPointSeverity.SEVERE]: 3,
  [VitalPointSeverity.CRITICAL]: 4,
  [VitalPointSeverity.LETHAL]: 5,
};
