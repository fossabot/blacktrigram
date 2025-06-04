import type {
  VitalPoint,
  VitalPointHitResult,
  VitalPointEffect,
} from "../../types/anatomy"; // Added VitalPointEffect
import type { KoreanTechnique } from "../../types/combat";
import type { Position } from "../../types/common";
import type { StatusEffect } from "../../types/effects"; // Ensure StatusEffect is imported
import { VITAL_POINTS_DATA } from "./KoreanAnatomy"; // Assuming VITAL_POINTS_DATA is from KoreanAnatomy

export class HitDetection {
  private readonly vitalPoints: readonly VitalPoint[];

  constructor() {
    // Ensure VITAL_POINTS_DATA is an array of VitalPoint objects
    this.vitalPoints = VITAL_POINTS_DATA as readonly VitalPoint[];
  }

  public detectVitalPointHit(
    hitPosition: Position, // This should be relative to target origin (0,0) to (width, height)
    _targetDimensions: { width: number; height: number }, // Marked as unused
    accuracy: number // Player's accuracy for this hit (0-1, higher is better)
  ): VitalPoint | null {
    // Convert absolute hitPosition (if it is) to relative coordinates based on target's frame
    // Assuming vitalPoint.location.x and y are relative (e.g., 0-100 or 0-1)
    // If vitalPoint.location is already in the same coordinate system as hitPosition, no conversion needed.
    // For this example, let's assume vitalPoint.location.x/y are % values (0-100)
    // And hitPosition is also in a similar relative system or converted before calling.

    // If hitPosition is absolute screen coordinates, it needs to be made relative to the target.
    // const relativeX = ((hitPosition.x - targetOrigin.x) / targetDimensions.width) * 100;
    // const relativeY = ((hitPosition.y - targetOrigin.y) / targetDimensions.height) * 100;
    // For now, assume hitPosition is already relative to target's top-left (0,0) up to (width, height)
    // and vitalPoint.location.x/y are also in this relative space (e.g. pixels from top-left of target)

    let closestPoint: VitalPoint | null = null;
    let minDistanceSq = Infinity;

    // Accuracy defines a radius. Higher accuracy = smaller radius for a precise hit.
    // Lower accuracy = larger radius, easier to hit something, but maybe not the intended VP.
    // Let's define accuracy as a factor that scales the "hitzone" of a vital point.
    // A vital point might have its own hit radius. If not, use a default.
    const baseHitRadius = 5; // pixels or relative units, example
    const effectiveHitRadius = baseHitRadius / (accuracy + 0.1); // Higher accuracy = smaller effective radius for *precise* targeting

    for (const vitalPoint of this.vitalPoints) {
      // Assuming vitalPoint.location.x and vitalPoint.location.y are the center of the VP
      const dx = vitalPoint.location.x - hitPosition.x;
      const dy = vitalPoint.location.y - hitPosition.y;
      const distanceSq = dx * dx + dy * dy;

      // Check if the hit is within the effective radius of the vital point
      if (distanceSq < effectiveHitRadius * effectiveHitRadius) {
        if (distanceSq < minDistanceSq) {
          minDistanceSq = distanceSq;
          closestPoint = vitalPoint;
        }
      }
    }
    return closestPoint;
  }

  public calculateVitalPointDamage(
    vitalPoint: VitalPoint,
    baseDamage: number,
    technique: KoreanTechnique
  ): number {
    const vitalMultiplier = vitalPoint.damageMultiplier || 1.5;
    const techniqueBonus = this.getTechniqueBonus(technique, vitalPoint);

    return Math.floor(baseDamage * vitalMultiplier * techniqueBonus);
  }

  public processVitalPointHit(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    baseDamage: number, // Base damage from the technique before VP multipliers
    hitPosition: Position // Actual position of the hit
  ): VitalPointHitResult {
    const damage = this.calculateVitalPointDamage(
      vitalPoint,
      baseDamage,
      technique
    );
    // Convert VitalPointEffect[] to StatusEffect[]
    const statusEffectsApplied: StatusEffect[] = this.convertToStatusEffects(
      vitalPoint.effects,
      "vital_point_direct"
    );

    const isCritical =
      damage > baseDamage * (vitalPoint.damageMultiplier || 1.5) * 1.5; // Example critical condition

    return {
      hit: true,
      damage,
      effects: statusEffectsApplied, // Use the converted StatusEffect array
      vitalPointsHit: [vitalPoint],
      vitalPoint, // Keep the specific vital point that was hit
      severity: vitalPoint.severity,
      criticalHit: isCritical, // Determine criticality based on damage or other factors
      location: hitPosition,
      effectiveness: vitalPoint.damageMultiplier, // Or damage / baseDamage if more appropriate
      statusEffectsApplied: statusEffectsApplied, // Redundant if effects is already StatusEffect[]
      painLevel:
        damage *
        (vitalPoint.severity === "critical" || vitalPoint.severity === "severe"
          ? 1.2
          : 0.8), // More pain for severe VPs
      consciousnessImpact:
        damage *
        (vitalPoint.category === "head" || vitalPoint.category === "nerve"
          ? 0.8
          : 0.4), // Higher impact for head/nerve
    };
  }

  private getTechniqueBonus(
    technique: KoreanTechnique,
    vitalPoint: VitalPoint
  ): number {
    // Check if technique is effective against this vital point
    const effectiveTechniques = vitalPoint.techniques || [];

    if (effectiveTechniques.includes(technique.type)) {
      return 1.3; // 30% bonus for effective technique
    }

    return 1.0; // No bonus
  }

  private convertToStatusEffects(
    vitalPointEffects: readonly VitalPointEffect[], // Explicitly type this
    source: string = "vital_point"
  ): StatusEffect[] {
    if (!vitalPointEffects) return [];
    return vitalPointEffects.map((effect: VitalPointEffect) => ({
      // Add type for effect
      id: effect.id || `${source}_${effect.type}_${Date.now()}`,
      type: effect.type,
      intensity: effect.intensity,
      duration: effect.duration,
      description: effect.description,
      stackable: effect.stackable !== undefined ? effect.stackable : false,
      source: effect.source || source, // Add source property
      // Ensure all properties of StatusEffect are covered
      chance: effect.chance,
      modifiers: effect.modifiers,
    }));
  }

  // Remove unused functions that had incomplete implementations
  // calculateHitAccuracy - REMOVED (unused parameters)
  // processHitResult - REMOVED (incomplete implementation)
}
