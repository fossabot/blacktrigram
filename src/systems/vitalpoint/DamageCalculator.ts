import type {
  PlayerState,
  KoreanTechnique,
  VitalPointHit,
  DamageResult, // Consolidated type from types/index.ts
  Condition,
  DamageType,
  VitalPoint,
} from "../../types";
import { TrigramSystem } from "../TrigramSystem";
import { TRIGRAM_DATA } from "../../types";

// Define DamageModifiers if not already in types/index.ts
// This seems specific to this module's internal calculations.
export interface DamageModifiers {
  multiplier: number;
  messages: string[];
  finalDamage: number; // This is a calculated value within modifiers, not the final DamageResult.damage
  baseDamage: number;
  critMultiplier: number;
  stanceAdvantage: number;
  vitalPointName: string;
}

const damageDescriptions: Record<string, string> = {
  light: "가벼운 타격",
  medium: "보통 타격",
  heavy: "강한 타격",
  critical: "치명타",
  block: "방어됨",
};

export class KoreanDamageCalculator {
  // Example: Define thresholds if they are class constants
  // private static readonly PERFECT_THRESHOLD = 0.95;
  // private static readonly CRITICAL_THRESHOLD = 0.85;
  // private static readonly MERIDIAN_DISRUPTION_THRESHOLD = 1.2;
  // private static readonly MAX_ELEMENTAL_BONUS = 0.5;
  // private static readonly GUARD_EFFECTIVENESS = 0.7;

  public static applyVitalPointModifiers(
    baseDamage: number,
    vitalPoint: VitalPoint | null,
    precision: number,
    _technique?: KoreanTechnique
  ): DamageResult {
    // Returns imported DamageResult
    let vitalPointBonus = 0;
    let meridianMultiplier = 1.0;
    let finalDamageType: DamageType = "light";
    let hitVitalPointNameObj: { english: string; korean: string } | undefined =
      undefined;
    let hitVitalPointKoreanName: string | undefined = undefined;
    let descriptionMessage = "";

    if (vitalPoint) {
      hitVitalPointNameObj = vitalPoint.name;
      hitVitalPointKoreanName = vitalPoint.koreanName;
      vitalPointBonus = (vitalPoint.damageMultiplier - 1) * baseDamage;
      // meridianMultiplier = getMeridianMultiplier(vitalPoint.meridian); // Assuming getMeridianMultiplier exists

      finalDamageType = KoreanDamageCalculator.determineDamageType(
        baseDamage,
        precision,
        vitalPoint
      );
      descriptionMessage = hitVitalPointKoreanName
        ? `${hitVitalPointKoreanName} - ${damageDescriptions[finalDamageType]}`
        : damageDescriptions[finalDamageType];
    } else {
      if (baseDamage > 50 && precision > 0.9) finalDamageType = "critical";
      else if (baseDamage > 30 || precision > 0.7) finalDamageType = "heavy";
      else if (baseDamage > 10) finalDamageType = "medium";
      else finalDamageType = "light";
      descriptionMessage = damageDescriptions[finalDamageType];
    }

    const totalDamage = Math.round(
      (baseDamage + vitalPointBonus) * meridianMultiplier
    );

    const result: DamageResult = {
      damage: totalDamage,
      baseDamage: baseDamage,
      isCritical: finalDamageType === "critical",
      vitalPointHit: vitalPoint
        ? ({
            hit: true, // Example, ensure VitalPointHit is correctly constructed
            vitalPoint: vitalPoint,
            damage: totalDamage, // Or damage specific to VP hit
            critical: finalDamageType === "critical",
            description: descriptionMessage,
            // ... other VitalPointHit properties
          } as VitalPointHit)
        : null,
      modifiers: [],
      description: descriptionMessage,
      vitalPointBonus: vitalPointBonus,
      meridianMultiplier: meridianMultiplier,
      damageType: finalDamageType,
    };
    if (hitVitalPointKoreanName) {
      result.koreanName = hitVitalPointKoreanName;
    }
    if (hitVitalPointNameObj) {
      result.vitalPointName = hitVitalPointNameObj; // Assign the object if that's the type
    } else if (typeof hitVitalPointNameObj === "string") {
      // Or handle if it could be string
      result.vitalPointName = hitVitalPointNameObj;
    }

    return result;
  }

  public static determineDamageType(
    baseDamage: number,
    precision: number,
    vitalPoint: VitalPoint | null // Uses imported VitalPoint
  ): DamageType {
    if (vitalPoint) {
      // Use damageMultiplier
      if (vitalPoint.damageMultiplier >= 1.8 && precision >= 0.9)
        return "critical";
      if (vitalPoint.damageMultiplier >= 1.5 || precision >= 0.75)
        return "heavy";
      if (vitalPoint.damageMultiplier >= 1.2 || precision >= 0.5)
        return "medium";
    } else {
      // No vital point hit
      if (baseDamage >= 35 && precision >= 0.9) return "critical";
      if (baseDamage >= 25 && precision >= 0.7) return "heavy";
      if (baseDamage >= 15 && precision >= 0.5) return "medium";
    }
    return "light";
  }

  public static calculateBaseDamage(
    technique: KoreanTechnique,
    distance: number,
    precision: number
  ): DamageResult {
    // Returns imported DamageResult
    const basePower = technique.damage;
    const rangeMultiplier = Math.max(
      0.5,
      1 - Math.abs(distance - technique.range * 0.5) / (technique.range * 1.5)
    );
    const baseDmg = basePower * precision * rangeMultiplier;
    const damageType = KoreanDamageCalculator.determineDamageType(
      baseDmg,
      precision,
      null
    );

    return {
      damage: Math.round(baseDmg),
      baseDamage: baseDmg,
      isCritical: damageType === "critical",
      vitalPointHit: null,
      modifiers: [],
      description: "기본 계산된 손상",
      damageType: damageType,
      koreanName: "기본 계산",
    };
  }

  public static calculateDamageOnVitalPoint(
    vitalPoint: VitalPoint, // Uses imported VitalPoint
    precision: number,
    baseDamageFromTechnique: number
  ): DamageResult {
    // Returns imported DamageResult
    const damageType = KoreanDamageCalculator.determineDamageType(
      baseDamageFromTechnique,
      precision,
      vitalPoint
    );
    const vitalPointMultiplier = vitalPoint.damageMultiplier || 1.0;
    const finalDamageValue =
      baseDamageFromTechnique * vitalPointMultiplier * precision;
    const vitalPointBonusValue =
      (vitalPointMultiplier - 1.0) * baseDamageFromTechnique;

    const result: DamageResult = {
      damage: Math.round(finalDamageValue),
      baseDamage: baseDamageFromTechnique,
      isCritical: damageType === "critical",
      vitalPointHit: {
        hit: true, // Example, ensure VitalPointHit is correctly constructed
        vitalPoint: vitalPoint,
        damage: Math.round(finalDamageValue),
        critical: damageType === "critical",
        description: `효과: ${vitalPoint.koreanName}에 ${precision.toFixed(
          2
        )} 정밀도로 타격`,
        // ... other VitalPointHit properties
      } as VitalPointHit,
      modifiers: [],
      description: `효과: ${vitalPoint.koreanName}에 ${precision.toFixed(
        2
      )} 정밀도로 타격`,
      vitalPointBonus: vitalPointBonusValue,
      meridianMultiplier: 1.0,
      damageType: damageType,
      koreanName: vitalPoint.koreanName,
      vitalPointName: vitalPoint.name, // vitalPoint.name is { english: string; korean: string; }
    };
    return result;
  }
}

export function calculateBaseDamage(
  technique: KoreanTechnique,
  attacker: PlayerState,
  defender: PlayerState,
  vitalPointHit: VitalPointHit | null
): DamageResult {
  const modifiers = calculateDamageModifiers(
    technique,
    vitalPointHit,
    attacker,
    defender
  );
  const baseDamageValue = technique.damage || 0;
  let finalDamage = baseDamageValue * modifiers.multiplier;

  // Apply critical hit if applicable
  const techniqueCritChance = technique.critChance ?? 0.1;
  if (vitalPointHit?.critical || Math.random() < techniqueCritChance) {
    finalDamage *= modifiers.critMultiplier;
    modifiers.messages.push("Critical Hit!");
  }

  finalDamage = Math.round(finalDamage);

  const hitVitalPointKoreanName = vitalPointHit?.vitalPoint?.koreanName ?? "";
  const hitVitalPointNameEnglish =
    vitalPointHit?.vitalPoint?.name?.english ?? ""; // Example of accessing english name

  // Ensure the description uses a string, e.g., from vitalPoint.koreanName or vitalPoint.name.korean
  const description = hitVitalPointKoreanName
    ? `Hit ${hitVitalPointKoreanName} (${hitVitalPointNameEnglish})`
    : "Hit";

  return {
    damage: finalDamage,
    baseDamage: baseDamageValue, // Included baseDamage as per updated DamageResult
    isCritical: vitalPointHit?.critical || false,
    vitalPointHit: vitalPointHit,
    modifiers: modifiers.messages,
    description: description,
  };
}

export function calculateDamageModifiers(
  technique: KoreanTechnique,
  vitalPointHit: VitalPointHit | null,
  attacker: PlayerState,
  defender: PlayerState
): DamageModifiers {
  let overallMultiplier = 1.0;
  const messages: string[] = [];

  const stanceAdvantage = TrigramSystem.calculateStanceAdvantage(
    attacker.stance,
    defender.stance
  );
  if (stanceAdvantage > 1.0) {
    messages.push(
      `${TRIGRAM_DATA[attacker.stance].koreanName} has advantage over ${
        TRIGRAM_DATA[defender.stance].koreanName
      } (+${((stanceAdvantage - 1.0) * 100).toFixed(0)}%)`
    );
  } else if (stanceAdvantage < 1.0) {
    messages.push(
      `${TRIGRAM_DATA[attacker.stance].koreanName} is at disadvantage against ${
        TRIGRAM_DATA[defender.stance].koreanName
      } (${((1.0 - stanceAdvantage) * 100).toFixed(0)}%)`
    );
  }
  overallMultiplier *= stanceAdvantage;

  if (vitalPointHit?.hit && vitalPointHit.vitalPoint) {
    // Use damageMultiplier instead of baseDamageModifier
    const vpDamageMultiplier = vitalPointHit.vitalPoint.damageMultiplier ?? 1.0;
    overallMultiplier *= vpDamageMultiplier;
    messages.push(
      `Critical hit on ${vitalPointHit.vitalPoint.koreanName}! (x${
        // Access koreanName directly
        vpDamageMultiplier.toFixed(1)
      })`
    );
    vitalPointHit.vitalPoint.effects?.forEach((effect) => {
      messages.push(
        `Applied ${effect.type} due to ${
          vitalPointHit.vitalPoint?.koreanName ?? "vital point"
        } hit.`
      );
    });
  }

  if (technique.properties?.includes("armor_piercing")) {
    overallMultiplier *= 1.2; // Example multiplier
    messages.push(`${technique.koreanName || technique.name} pierces armor!`);
  }

  defender.conditions.forEach((condition: Condition) => {
    if (condition.type === "vulnerable") {
      const magnitude = condition.magnitude ?? 1.5; // Access magnitude from Condition
      overallMultiplier *= magnitude;
      messages.push(
        `Defender is vulnerable! (+${((magnitude - 1.0) * 100).toFixed(0)}%)`
      );
    }
  });

  const techCritChance = technique.critChance ?? 0.1;
  const techCritMultiplier = technique.critMultiplier ?? 1.5;

  return {
    multiplier: overallMultiplier,
    messages: messages,
    finalDamage: Math.round((technique.damage || 0) * overallMultiplier),
    baseDamage: technique.damage || 0, // This is DamageModifiers, not DamageResult
    critMultiplier:
      vitalPointHit?.critical || Math.random() < techCritChance
        ? techCritMultiplier
        : 1.0,
    stanceAdvantage: stanceAdvantage,
    vitalPointName: vitalPointHit?.vitalPoint?.koreanName ?? "", // Ensure string
  };
}
