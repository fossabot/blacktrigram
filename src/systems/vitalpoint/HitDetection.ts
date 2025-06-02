import type { Position } from "../../types/common";
import {
  AnatomicalLocation,
  CombatResult,
  PlayerState,
  VITAL_POINTS_DATA,
  type KoreanTechnique,
  type VitalPoint,
  type VitalPointSystemConfig,
} from "../../types";

// Placeholder math functions - MOVE THESE TO A DEDICATED utils/math.ts FILE
function calculateDistance(pos1: Position, pos2: Position): number {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// function normalizeAngle(angle: number): number { // Commented out as normalizeAngle is not used
//   let newAngle = angle % (2 * Math.PI);
//   if (newAngle < 0) {
//     newAngle += 2 * Math.PI;
//   }
//   return newAngle;
// }

export class HitDetection {
  private config: VitalPointSystemConfig;

  constructor(config: VitalPointSystemConfig) {
    this.config = config;
  }

  public isHit(
    attackerPosition: Position,
    targetBodyPosition: Position,
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    distanceToTarget: number,
    hitAngle: number // Assuming hitAngle is calculated and passed
  ): boolean {
    const techniqueRange = technique.range || 1.0; // Default range if not specified
    if (distanceToTarget > techniqueRange) {
      return false; // Out of range
    }

    // Angle check (simplified)
    const angleToVitalPoint = Math.atan2(
      targetBodyPosition.y + vitalPoint.location.y - attackerPosition.y,
      targetBodyPosition.x + vitalPoint.location.x - attackerPosition.x
    );
    const angleDifference = Math.abs(hitAngle - angleToVitalPoint);
    const maxAngleDiff = this.config.maxHitAngleDifference ?? Math.PI / 4; // Default if not in config

    if (angleDifference > maxAngleDiff) {
      return false; // Hit angle is too off
    }

    // Add more sophisticated collision detection logic here if needed
    // For example, considering hitboxes, target movement, etc.

    return true; // Placeholder for actual hit detection logic
  }

  public calculateHitChance(
    attackerPosition: Position,
    targetBodyPosition: Position,
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    distanceToTarget: number,
    attacker?: PlayerState, // Made optional or ensure it's always passed
    defender?: PlayerState // Made optional or ensure it's always passed
  ): number {
    let baseHitChance = technique.accuracy ?? 0.8; // Base accuracy from technique

    // Modify by distance
    const optimalRange = technique.range ? technique.range * 0.75 : 0.75;
    const rangeModifier =
      distanceToTarget <= optimalRange
        ? 1.0
        : Math.max(0.5, 1.0 - (distanceToTarget - optimalRange) / optimalRange);
    baseHitChance *= rangeModifier;

    // Modify by vital point's own accuracy
    baseHitChance *= vitalPoint.baseAccuracy || 1.0;

    // Modify by attacker/defender states if provided
    if (attacker) {
      // Example: attacker focus or status effects
      if (attacker.activeEffects.some((e) => e.type === "focused"))
        baseHitChance *= 1.1;
    }
    if (defender) {
      // Example: defender evasiveness or combat state
      if (defender.combatState === "defending") baseHitChance *= 0.7;
      if (defender.activeEffects.some((e) => e.type === "evasion_boost"))
        baseHitChance *= 0.9;
    }

    return Math.max(0, Math.min(1, baseHitChance));
  }

  public determineHitLocation(
    attackerPosition: Position,
    target: PlayerState,
    technique: KoreanTechnique
    // targetLocation: AnatomicalLocation, // Unused
    // allVitalPoints: readonly VitalPoint[], // Unused
    // hitRadius: number // Unused
  ): { vitalPoint: VitalPoint | null; location: AnatomicalLocation } {
    // This is a simplified placeholder.
    // A real system would use target's hitbox, technique's trajectory, etc.
    // It might iterate through VITAL_POINTS_DATA or a spatial data structure.
    console.log(attackerPosition, target, technique); // Use parameters

    // For now, let's assume it might hit the first vital point if the technique is precise.
    if (
      technique.precision &&
      technique.precision > 0.8 &&
      VITAL_POINTS_DATA.length > 0
    ) {
      const vp = VITAL_POINTS_DATA[0];
      return { vitalPoint: vp, location: vp.location };
    }
    // Default to a generic torso hit if no specific vital point
    return {
      vitalPoint: null,
      location: { region: "torso", x: 0.5, y: 0.5 } as AnatomicalLocation,
    };
  }

  public resolveHitOnVitalPoint(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique
    // attacker: PlayerState, // Unused
    // defender: PlayerState // Unused
  ): CombatResult {
    // Placeholder: This should integrate with DamageCalculator
    // For now, returning a simplified CombatResult
    const damage = (technique.damage || 0) + (vitalPoint.baseDamage || 0);
    return {
      hit: true,
      damage: damage,
      isVitalPoint: true,
      vitalPointsHit: [vitalPoint],
      techniqueUsed: technique,
      effectiveness: 1.0,
      stunDuration: vitalPoint.baseStun || 0,
      bloodLoss: 0, // Calculate based on effects
      painLevel: damage / 5,
      consciousnessImpact: (vitalPoint.baseStun || 0) * 5,
      balanceEffect: damage / 10,
      statusEffects: vitalPoint.effects?.map((e) => ({ ...e })) || [], // Map to StatusEffect
      hitType: "vital",
    };
  }

  checkVitalPointHit(
    attackerPosition: Position,
    targetPosition: Position, // This is the intended impact point on the target's body surface
    targetBodyPosition: Position, // This is the origin/center of the target entity
    technique: KoreanTechnique,
    _targetAngle: number, // Angle the target entity is facing
    availableVitalPoints: readonly VitalPoint[]
  ): VitalPoint | null {
    // 1. Check if the technique is within range (basic range check)
    // Assuming technique.damageRange.max can be used as an effective range for simplicity.
    const techniqueEffectiveRange = technique.damageRange.max * 0.1; // Corrected: Was technique.range, now uses damageRange.max
    if (
      calculateDistance(attackerPosition, targetPosition) >
      techniqueEffectiveRange
    ) {
      return null; // Out of range
    }

    for (const vp of availableVitalPoints) {
      const vitalPointGlobalPosition = this.getGlobalVitalPointPosition(
        vp.location,
        targetBodyPosition,
        _targetAngle
      );

      // 2. Check if the vital point is within the technique's area of effect / precision cone
      const distanceToVitalPoint = calculateDistance(
        targetPosition,
        vitalPointGlobalPosition
      );
      // Assuming technique.damageRange.min can be used as a proxy for precision radius.
      const techniquePrecisionRadius = Math.max(
        0.05,
        technique.damageRange.min * 0.01
      ); // Corrected: Was technique.range, now uses damageRange.min
      if (distanceToVitalPoint > techniquePrecisionRadius) {
        continue; // Missed this specific vital point due to precision
      }

      // 3. Check angle of attack relative to vital point exposure (simplified)
      // This requires knowing the attacker's facing angle and the vital point's orientation
      const angleToTarget = Math.atan2(
        vitalPointGlobalPosition.y - attackerPosition.y,
        vitalPointGlobalPosition.x - attackerPosition.x
      );
      // Simplified: assume attackerAngle is derived from attacker's facing direction
      // For now, let's assume a direct hit if within cone for simplicity
      const _attackerAngle = angleToTarget; // Placeholder: should be attacker's actual attack vector angle (prefixed with _ as unused)

      // Angle difference check (optional, can be complex)
      // const angleDiff = Math.abs(normalizeAngle(attackerAngle - vitalPointOrientationAngle));
      // if (angleDiff > (this.config.maxHitAngleDifference ?? Math.PI / 4)) continue;

      // 4. Check if the hit position is close enough to the vital point's global position
      const distanceToVitalPoint = calculateDistance(
        targetPosition, // The actual point of impact from the attack
        vitalPointGlobalPosition
      );

      // Consider a small radius around the vital point for hit detection
      // This radius could be fixed or based on vitalPoint.size or technique.areaOfEffect
      const vitalPointHitRadius = vp.baseAccuracy * 0.1; // Example: baseAccuracy influences hit radius

      if (distanceToVitalPoint <= vitalPointHitRadius) {
        // TODO: Add probability check based on technique.accuracy and vp.baseAccuracy
        // For now, direct hit if within radius
        return vp;
      }
    }
    return null;
  }

  // Method to determine the closest vital point to a given hit location
  public determineClosestVitalPoint(
    hitPosition: Position, // The global coordinates of the impact
    targetBodyPosition: Position, // The global origin/center of the target entity
    availableVitalPoints: readonly VitalPoint[],
    maxDistance: number = 0.1 // Maximum distance to consider a vital point "close"
  ): VitalPoint | null {
    let closestPoint: VitalPoint | null = null;
    let minDistance = Infinity;

    for (const vp of availableVitalPoints) {
      // Calculate the absolute global position of the vital point
      // Assuming vp.location.x and vp.location.y are relative to targetBodyPosition
      // and need to be rotated if the target entity has an orientation.
      // For simplicity, assuming no rotation or targetAngle is already accounted for in vp.location.
      const vitalPointGlobalPosition: Position = {
        x: targetBodyPosition.x + vp.location.x, // This might need adjustment based on how vp.location is defined
        y: targetBodyPosition.y + vp.location.y, // (e.g., if it's already global or needs rotation)
      };

      const distance = calculateDistance(hitPosition, vitalPointGlobalPosition);

      if (distance < minDistance && distance <= maxDistance) {
        minDistance = distance;
        closestPoint = vp;
      }
    }
    return closestPoint;
  }

  // Method to get potential vital points in the path of an attack (e.g., for piercing attacks)
  getPotentialVitalPointsInPath(
    _startPosition: Position,
    _endPosition: Position,
    _targetBodyPosition: Position,
    _technique: KoreanTechnique,
    availableVitalPoints: readonly VitalPoint[]
  ): readonly VitalPoint[] {
    const potentialPoints: VitalPoint[] = [];
    // const techniqueAverageDamage = (_technique.damageRange.min + _technique.damageRange.max) / 2; // Corrected: Was _technique.damage

    for (const vp of availableVitalPoints) {
      // Simplified: Check if vital point is roughly between start and end points
      // This needs a proper line-segment intersection or proximity check.
      // For now, let's assume if it's generally in the area, it's a potential point.
      // This logic is highly placeholder.
      const vpGlobalPos = this.getGlobalVitalPointPosition(
        vp.location,
        _targetBodyPosition,
        0
      ); // Assuming targetAngle 0 for simplicity

      // Example: if vital point is within a certain distance of the attack line
      // This is a very naive check.
      const distToStart = calculateDistance(_startPosition, vpGlobalPos);
      const distToEnd = calculateDistance(_endPosition, vpGlobalPos);
      const attackPathLength = calculateDistance(_startPosition, _endPosition);

      if (
        distToStart + distToEnd <
        attackPathLength + (vp.baseAccuracy ?? 0.1)
      ) {
        // vp.baseAccuracy as a radius proxy
        potentialPoints.push(vp);
      }
    }
    return potentialPoints;
  }

  // Helper to calculate the global position of a vital point
  private getGlobalVitalPointPosition(
    vitalPointLocation: { x: number; y: number; region: string }, // Assuming region is string for now
    targetBodyPosition: Position,
    _targetAngle: number // Prefixed with _ as unused
  ): Position {
    // Simple addition for now, assuming vitalPointLocation is relative to targetBodyPosition
    // and targetAngle is 0 or already incorporated into vitalPointLocation.
    // For rotation:
    // const rotatedX = vitalPointLocation.x * Math.cos(targetAngle) - vitalPointLocation.y * Math.sin(targetAngle);
    // const rotatedY = vitalPointLocation.x * Math.sin(targetAngle) + vitalPointLocation.y * Math.cos(targetAngle);
    // return {
    //   x: targetBodyPosition.x + rotatedX,
    //   y: targetBodyPosition.y + rotatedY,
    // };
    return {
      x: targetBodyPosition.x + vitalPointLocation.x,
      y: targetBodyPosition.y + vitalPointLocation.y,
    };
  }

  // Check if an attack angle is valid for a given vital point
  private isAttackAngleValid(
    _attackerPosition: Position,
    _vitalPointGlobalPosition: Position,
    _vitalPointOrientationAngle: number, // Angle the vital point is "facing" or most vulnerable from
    _attackerAngle: number // Angle of the incoming attack - parameter itself is unused in current simplified logic
  ): boolean {
    // const angleDiff = Math.abs(normalizeAngle(_attackerAngle - _vitalPointOrientationAngle));
    // return angleDiff <= (this.config.maxHitAngleDifference ?? Math.PI / 4); // Example: 45-degree cone
    return true; // Simplified: always valid for now
  }

  public determineHitOnVitalPoint(
    technique: KoreanTechnique,
    vitalPoint: VitalPoint,
    // isAttackAngleValid: boolean, // Unused
    distanceFactor: number // 0-1, how close the hit was to the VP center
  ): { hit: boolean; damageMultiplier: number; appliedEffects: StatusEffect[] } {
    // Basic accuracy check based on technique
    const baseAccuracy = technique.accuracy; // Assuming accuracy is 0-1
    // Check if the attack is within the technique's effective range
    // const distanceToTarget = calculateDistance(attackerPosition, targetBodyPosition);
    // if (distanceToTarget > technique.range) {
    //   return { ...createMissResult(technique), description: "Out of range" };
    // }

    // Simplified damage calculation for now
    let damage = technique.damageRange
      ? (technique.damageRange.min + technique.damageRange.max) / 2
      : 10; // Default damage if not specified

    // if (targetVitalPoint) {
    //   const distanceToVitalPoint = calculateDistance(
    //     { x: attackerPosition.x, y: attackerPosition.y }, // Simplified impact point
    //     mapBodyRegionToWorld(targetVitalPoint.location, targetBodyPosition, targetFacingAngle)
    //   );
    //   // Check distance to vital point for damage modification
    //   damage *= Math.max(0, 1 - distanceToVitalPoint * 0.1); // Closer hits do more damage
    // }

    return {
      hit: true,
      damageMultiplier: damage,
      appliedEffects: vitalPoint.effects?.map((e) => ({ ...e })) || [],
    };
  }

  function isVitalPointAccessible(
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    // _attackerAngle?: number, // Unused
    targetFacingAngle?: number
  ): boolean {
    // Placeholder logic for accessibility based on facing angle
    // This would depend on how vital points are oriented and how techniques interact with those orientations
    return true; // Simplified: always accessible for now
  }

  function getClosestVitalPoint(
    targetPosition: Position, // Point of impact on the target model
    targetVitalPoints: readonly VitalPoint[],
    targetBodyPosition: Position,
    targetFacingAngle: number,
    maxDistance: number = 0.1 // Max distance in normalized body coords to be considered "hit"
  ): VitalPoint | null {
    let closestVP: VitalPoint | null = null;
    let minDistance = Infinity;

    for (const vp of targetVitalPoints) {
      const vpWorldPos = mapBodyRegionToWorld(vp.location, targetBodyPosition, targetFacingAngle);
      const distanceToVitalPointCurrent = calculateDistance(targetPosition, vpWorldPos); // Renamed to avoid conflict

      if (distanceToVitalPointCurrent < minDistance && distanceToVitalPointCurrent <= maxDistance) {
        minDistance = distanceToVitalPointCurrent;
        closestVP = vp;
      }
    }
    return closestVP;
  }
}
