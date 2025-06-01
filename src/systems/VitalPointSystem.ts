import type {
  VitalPoint,
  HitResult,
  StatusEffect,
  VitalPointSystemConfig,
  KoreanTechnique, // Added for technique details
  AttackType, // Added for technique type
} from "../types";
import { KOREAN_VITAL_POINTS_DATA } from "./vitalpoint/KoreanVitalPoints";

export const VitalPointSystem = {
  config: {
    // New required fields
    precisionThreshold: 0.9, // Example value, adjust as needed
    criticalHitRange: 0.05, // Example value, adjust as needed
    damageMultiplierCurve: [1.5, 2.0, 2.5], // Example curve, adjust
    meridianBonusFactors: {}, // Default empty

    // Old fields (now optional in the type definition)
    baseAccuracy: 0.8,
    distanceModifier: 0.05, // per unit distance
    targetingDifficulty: 0.75, // general modifier
    // damageMultiplier: 1.5, // This is now handled by damageMultiplierCurve
    effectChance: 0.6, // base chance for status effects
    // angleModifier can be added if there's a default
  } as VitalPointSystemConfig,

  setConfig(newConfig: Partial<VitalPointSystemConfig>): void {
    this.config = { ...this.config, ...newConfig };
  },

  getVitalPointByName(name: string): VitalPoint | undefined {
    return (
      KOREAN_VITAL_POINTS_DATA[name] ||
      Object.values(KOREAN_VITAL_POINTS_DATA).find(
        (vp) =>
          vp.name.english === name ||
          vp.name.korean === name ||
          vp.koreanName === name
      )
    );
  },

  calculateAccuracy(
    // attackerPosition: Position, // Unused parameter
    // targetBodyPosition: Position, // Unused parameter
    vitalPoint: VitalPoint, // The specific vital point being targeted
    technique: KoreanTechnique,
    distanceToTarget: number // Overall distance between attacker and target character
  ): number {
    const baseAccuracy = this.config.baseAccuracy ?? 0.8;
    const distanceModifier = this.config.distanceModifier ?? 0.05;
    const targetingDifficulty = this.config.targetingDifficulty ?? 0.75;

    // Distance penalty: farther away, harder to hit precisely
    let accuracy = baseAccuracy - distanceToTarget * distanceModifier;

    // Technique's inherent accuracy
    accuracy *= technique.accuracy;

    // Vital point's difficulty (higher difficulty means harder to hit)
    accuracy -= (vitalPoint.difficulty ?? 0.5) * (1 - targetingDifficulty); // Example: difficulty reduces accuracy

    // Clamp accuracy between 0 and 1
    return Math.max(0, Math.min(1, accuracy));
  },

  checkVitalPointHit(
    // attackerPosition: Position, // Unused parameter
    // targetBodyPosition: Position, // Position of the target character model - Unused
    vitalPoint: VitalPoint, // The vital point being targeted
    technique: KoreanTechnique,
    distanceToTarget: number, // Distance from attacker to target character
    // Optional: pass a specific config, otherwise uses VitalPointSystem.config
    configOverride?: Partial<VitalPointSystemConfig>
  ): HitResult {
    const currentConfig = configOverride
      ? { ...this.config, ...configOverride }
      : this.config;

    const effectiveAccuracy = this.calculateAccuracy(
      vitalPoint,
      technique,
      distanceToTarget
    );

    const accuracyRoll = Math.random(); // Roll for hit success

    if (accuracyRoll > effectiveAccuracy) {
      // Missed the vital point specifically
      return {
        hit: false,
        damage: 0,
        vitalPoint: null, // Or vitalPoint to indicate what was aimed for but missed
        effects: [],
        hitType: "miss",
        description: `Attempt on ${
          vitalPoint.name.english
        } missed. Required: <${effectiveAccuracy.toFixed(
          2
        )}, Rolled: ${accuracyRoll.toFixed(2)}`,
        accuracy: effectiveAccuracy,
      };
    }

    // If hit, use calculateHitResult to determine specifics
    // attackPosition for calculateHitResult should be the point of impact,
    // which for a vital point hit, we can consider to be the vital point's actual location.
    return this.calculateHitResult(
      vitalPoint,
      // actualVitalPointPosition, // This was unused in calculateHitResult
      accuracyRoll,
      currentConfig,
      technique
    );
  },

  calculateHitResult(
    targetVitalPoint: VitalPoint,
    // attackImpactPosition: Position, // Unused parameter
    accuracyRoll: number, // A value between 0 and 1 representing hit success against this VP
    config?: VitalPointSystemConfig, // Allow passing config, useful for tests
    technique?: KoreanTechnique // Technique is needed for base damage
  ): HitResult {
    const configParams = config || this.config;
    const baseTechDamage = technique?.damage || 10; // Use technique's base damage, or a default

    // precisionThreshold determines if it's a "precise" hit vs a glancing one on the VP
    // criticalHitRange is how much *better* than preciseThreshold the roll needs to be for critical
    // const isPreciseHit = accuracyRoll <= configParams.precisionThreshold; // Unused variable
    // Or, if accuracyRoll is success (0 to effectiveAccuracy)
    // and precisionThreshold is a high part of that success range.
    // Test implies: accuracyRoll > threshold for better hits.
    // Let's stick to test: accuracyRoll > (precisionThreshold - criticalHitRange) for precise
    // accuracyRoll > precisionThreshold for critical.

    let hitQualityFactor = 0; // 0 for normal, 1 for precise, 2 for critical
    if (
      accuracyRoll >
      configParams.precisionThreshold - configParams.criticalHitRange
    ) {
      // Precise hit
      hitQualityFactor = 1;
    }
    if (accuracyRoll > configParams.precisionThreshold) {
      // Critical hit on vital point
      hitQualityFactor = 2;
    }

    // If accuracyRoll didn't even meet the basic hit criteria (implicit from checkVitalPointHit context)
    // This function assumes the accuracyRoll has already passed the general checkVitalPointHit's effectiveAccuracy.
    // The quality factor here is about *how well* the vital point was hit.

    const damageMultiplierFromCurveValue =
      configParams.damageMultiplierCurve[hitQualityFactor];

    // Ensure damageMultiplierCurve is not empty and provide a fallback if the index is out of bounds or curve is malformed.
    const selectedMultiplier =
      damageMultiplierFromCurveValue !== undefined
        ? damageMultiplierFromCurveValue
        : configParams.damageMultiplierCurve[0] !== undefined
        ? configParams.damageMultiplierCurve[0]
        : 1.0;

    const baseDamageOnVP = baseTechDamage * targetVitalPoint.damageMultiplier;
    let finalDamage = baseDamageOnVP * selectedMultiplier;

    const appliedEffects: StatusEffect[] = [];
    if (targetVitalPoint.effects) {
      for (const effect of targetVitalPoint.effects) {
        if (
          Math.random() < (effect.chance ?? configParams.effectChance ?? 0.6)
        ) {
          appliedEffects.push({ ...effect });
        }
      }
    }

    let hitType: HitResult["hitType"] = "normal"; // Default to normal if it's a hit but not special
    if (hitQualityFactor === 2) hitType = "critical";
    else if (hitQualityFactor === 1) hitType = "vital";

    return {
      hit: true, // Assumed hit on the vital point to reach this calculation stage
      damage: Math.round(finalDamage),
      vitalPoint: targetVitalPoint,
      effects: appliedEffects,
      hitType: hitType,
      description: `Hit ${targetVitalPoint.name.english}${
        hitType === "critical"
          ? " (Critical!)"
          : hitType === "vital"
          ? " (Precise!)"
          : ""
      }.`,
      accuracy: accuracyRoll, // The roll that determined this quality of hit
    };
  },

  getTechniqueTypeModifier(
    attackType: AttackType,
    vitalPoint: VitalPoint
  ): number {
    // Stub implementation based on test expectations
    // Real logic would depend on how different attack types interact with vital point categories
    if (vitalPoint.category === "nerve") {
      if (attackType === "pressure_point" || attackType === "strike")
        return 1.2;
      return 0.8;
    }
    if (vitalPoint.category === "joint") {
      if (attackType === "grapple" || attackType === "elbow") return 1.3;
      return 0.9;
    }
    if (attackType === "punch") return 1.0;
    if (attackType === "kick") return 1.1;
    return 1.0; // Default modifier
  },

  getOptimalAngleForTechnique(technique: KoreanTechnique): number {
    // Stub implementation - real logic would depend on technique mechanics
    // Example: strikes are 0 (direct), sweeps might be PI/2 or PI
    if (technique.type === "strike" || technique.type === "punch") {
      return 0; // Straight ahead
    }
    if (technique.type === "kick") {
      // Could vary based on specific kick
      return Math.PI / 4; // 45 degrees
    }
    return Math.random() * Math.PI * 2; // Random angle as a fallback
  },
};
