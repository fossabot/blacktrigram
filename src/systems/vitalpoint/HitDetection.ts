import type {
  VitalPoint,
  AnatomicalLocation,
  KoreanTechnique,
  Position,
  CombatResult,
  StatusEffect,
} from "../../types";
import { VITAL_POINTS_DATA } from "../../types/constants";

// Placeholder math functions - MOVE THESE TO A DEDICATED utils/math.ts FILE
export class HitDetection {
  private vitalPoints: readonly VitalPoint[];

  constructor(vitalPointsData: readonly VitalPoint[] = VITAL_POINTS_DATA) {
    this.vitalPoints = vitalPointsData;
  }

  public calculateHitChance(
    attackerPosition: Position,
    targetPosition: Position,
    techniqueAccuracy: number,
    targetVitalPoint?: VitalPoint | null,
    distancePenaltyFactor: number = 0.1 // Example: 10% penalty per unit distance
  ): number {
    const distance = Math.sqrt(
      (targetPosition.x - attackerPosition.x) ** 2 +
        (targetPosition.y - attackerPosition.y) ** 2
    );

    let baseAccuracy = techniqueAccuracy;

    if (targetVitalPoint) {
      // Modify accuracy based on vital point accessibility and size (simplified)
      baseAccuracy *= targetVitalPoint.baseAccuracy; // Smaller/harder to hit points reduce accuracy
    }

    // Apply distance penalty
    const distancePenalty = distance * distancePenaltyFactor;
    const finalAccuracy = Math.max(0, baseAccuracy - distancePenalty);

    return finalAccuracy;
  }

  public determineHitLocation(
    // attackerPosition: Position, // Removed unused parameter
    targetPosition: Position,
    intendedTargetLocation?: AnatomicalLocation | null // Can be a specific vital point\'s location or a general area
  ): AnatomicalLocation {
    // Simplified: for now, assume hit is always at the intended target if provided
    // More complex logic would involve scatter based on accuracy, distance, etc.
    if (intendedTargetLocation) {
      return intendedTargetLocation;
    }

    // Default to a generic torso hit if no specific target
    // In a real system, this would be more dynamic
    return {
      x: targetPosition.x, // Simplified, consider character facing and relative positions
      y: targetPosition.y + 0.5, // Approximate center of torso
      region: "torso",
    };
  }

  public resolveHitOnVitalPoint(
    hitLocation: AnatomicalLocation,
    technique: KoreanTechnique
    // targetPlayerArchetype: string // Removed unused parameter
    // Placeholder for defender\'s current state, e.g., stance, active blocks
  ): CombatResult {
    const closestVitalPoint = this.determineClosestVitalPoint(
      hitLocation,
      this.vitalPoints
    );

    let damage = 0;
    let effects: StatusEffect[] = []; // Changed to StatusEffect[]
    const vitalPointsHit: string[] = [];

    // Check if the closest vital point is within the effective radius of the hit
    // This is a simplified check; a real system would use hitboxes and technique properties
    if (closestVitalPoint) {
      const distanceToVitalPoint = Math.sqrt(
        (hitLocation.x - closestVitalPoint.location.x) ** 2 +
          (hitLocation.y - closestVitalPoint.location.y) ** 2
      );

      // Example: effective radius of 0.1 units for a hit to count on a vital point
      if (distanceToVitalPoint <= 0.1) {
        vitalPointsHit.push(closestVitalPoint.id);
        // Apply damage and effects from the vital point
        // This would be calculated by DamageCalculator, considering technique, archetype, etc.
        damage =
          (closestVitalPoint.baseDamage ?? 0) * // Added nullish coalescing
          (technique.damageMultiplier ?? 1) *
          closestVitalPoint.damageMultiplier;
        effects = [...closestVitalPoint.effects] as StatusEffect[]; // Ensure type compatibility

        // TODO: Add archetype-specific modifiers from a constants file or config
        // Example: if (targetPlayerArchetype === "Musa" && closestVitalPoint.category === "head") damage *= 1.1;
      }
    }

    // If no vital point was hit, or if the hit was not precise enough,
    // apply base technique damage (could be to a general body region)
    if (vitalPointsHit.length === 0) {
      const damageRange = technique.damageRange ?? { min: 0, max: 0 }; // Added nullish coalescing
      damage =
        ((damageRange.min + damageRange.max) / 2) *
        (technique.damageMultiplier ?? 1); // Use average of min/max
      // Apply general effects of the technique if any
      effects = [...(technique.effects || [])] as StatusEffect[]; // Ensure type compatibility
    }

    return {
      attacker: "musa" as const, // Placeholder - should be passed as parameter
      defender: "musa" as const, // Placeholder - should be passed as parameter
      hit: damage > 0,
      damage,
      damagePrevented: 0, // Required property
      staminaUsed: technique.staminaCost || 0, // Required property
      kiUsed: technique.kiCost || 0, // Required property
      effects, // Now matches CombatResult
      vitalPointsHit,
      isVitalPoint: vitalPointsHit.length > 0,
      techniqueUsed: technique,
      effectiveness: 1, // Placeholder
      stunDuration: 0, // Placeholder
      bloodLoss: 0, // Placeholder
      painLevel: 0, // Placeholder
      consciousnessImpact: 0, // Placeholder
      balanceEffect: 0, // Placeholder
      statusEffects: effects,
      hitType:
        vitalPointsHit.length > 0 ? "vital" : damage > 0 ? "normal" : "miss",
      defenderDamaged: damage > 0, // Required property
      attackerStance: "geon" as const, // Placeholder - should be passed as parameter
      defenderStance: "geon" as const, // Placeholder - should be passed as parameter
    };
  }

  public determineClosestVitalPoint(
    hitLocation: AnatomicalLocation,
    availableVitalPoints: readonly VitalPoint[]
  ): VitalPoint | null {
    if (!availableVitalPoints || availableVitalPoints.length === 0) {
      return null;
    }

    let closestPoint: VitalPoint | null = null;
    let minDistance = Infinity;

    for (const point of availableVitalPoints) {
      // Ensure point.location is valid
      if (
        point.location &&
        typeof point.location.x === "number" &&
        typeof point.location.y === "number"
      ) {
        const distance = Math.sqrt(
          (hitLocation.x - point.location.x) ** 2 +
            (hitLocation.y - point.location.y) ** 2
        );

        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = point;
        }
      }
    }
    return closestPoint;
  }
}
