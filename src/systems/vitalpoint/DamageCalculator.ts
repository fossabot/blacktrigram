import type { KoreanTechnique, StatusEffect } from "../../types/GameTypes";
import type { VitalPoint } from "./AnatomicalRegions";
import { KoreanAnatomy } from "./KoreanAnatomy";

/**
 * Korean Martial Arts Damage Calculator System
 * Implements authentic damage calculations based on traditional vital point theory
 * Incorporates meridian flow, elemental relationships, and trigram philosophy
 */

export interface DamageModifiers {
  readonly attacker: {
    readonly skill: number;
    readonly stance: string;
    readonly kiLevel: number;
    readonly fatigue: number;
    readonly element?: string;
  };
  readonly defender: {
    readonly guard: number;
    readonly stance: string;
    readonly resilience: number;
    readonly kiLevel: number;
    readonly element?: string;
  };
  readonly environmental: {
    readonly distance: number;
    readonly timing: number;
    readonly precision: number;
    readonly timeOfDay?: number;
  };
}

export interface DamageResult {
  readonly finalDamage: number;
  readonly damageType:
    | "normal"
    | "vital"
    | "critical"
    | "perfect"
    | "meridian_disruption";
  readonly statusEffects: readonly StatusEffect[];
  readonly description: string;
  readonly korean: string;
  readonly modifierBreakdown: {
    readonly baseDamage: number;
    readonly vitalPointBonus: number;
    readonly meridianMultiplier: number;
    readonly elementalModifier: number;
    readonly skillModifier: number;
    readonly guardReduction: number;
    readonly finalMultiplier: number;
  };
  readonly meridianEffects?: {
    readonly primaryMeridian: string;
    readonly disruptionLevel: number;
    readonly flowReduction: number;
  };
}

export interface CombatContext {
  readonly attackType: "strike" | "pressure" | "manipulation" | "energy";
  readonly bodyRegion: string;
  readonly previousHits: readonly string[];
  readonly combatDuration: number;
  readonly environmentalFactors: {
    readonly terrain: string;
    readonly lighting: number;
    readonly temperature: number;
  };
}

export class KoreanDamageCalculator {
  private static readonly CRITICAL_THRESHOLD = 0.9;
  private static readonly PERFECT_THRESHOLD = 0.95;
  private static readonly MERIDIAN_DISRUPTION_THRESHOLD = 0.85;
  private static readonly GUARD_EFFECTIVENESS = 0.4;
  private static readonly MAX_ELEMENTAL_BONUS = 0.5;

  /**
   * Calculate comprehensive damage for Korean martial arts techniques
   */
  public static calculateDamage(
    baseDamage: number,
    vitalPoint: VitalPoint | null,
    modifiers: DamageModifiers,
    context?: CombatContext
  ): DamageResult {
    // Validate and clamp input parameters
    const clampedBaseDamage = Math.max(0, Math.min(100, baseDamage));

    // Initialize damage calculation
    let totalDamage = clampedBaseDamage;
    let damageType: DamageResult["damageType"] = "normal";
    const statusEffects: StatusEffect[] = [];
    let description = "기본 공격 (Basic attack)";
    let korean = "일반 타격";

    // Calculate vital point effects
    let vitalPointBonus = 0;
    let meridianMultiplier = 1.0;
    let meridianEffects: DamageResult["meridianEffects"] | undefined;

    if (vitalPoint) {
      const vitalResult = this.calculateVitalPointDamage(
        vitalPoint,
        modifiers.environmental.precision,
        modifiers.attacker.skill,
        modifiers.environmental.timeOfDay
      );

      vitalPointBonus = vitalResult.bonus;
      meridianMultiplier = vitalResult.meridianMultiplier;
      meridianEffects = vitalResult.meridianEffects;

      totalDamage += vitalPointBonus;
      statusEffects.push(...vitalPoint.effects);

      // Determine damage type based on precision and meridian effects
      const precision = modifiers.environmental.precision;
      if (
        meridianEffects &&
        meridianEffects.disruptionLevel > this.MERIDIAN_DISRUPTION_THRESHOLD
      ) {
        damageType = "meridian_disruption";
        description = `${vitalPoint.korean} 경맥 차단! (Meridian disruption!)`;
        korean = "경맥 차단";
      } else if (precision >= this.PERFECT_THRESHOLD) {
        damageType = "perfect";
        description = `완벽한 ${vitalPoint.korean} 급소 공격!`;
        korean = "완벽 급소타";
      } else if (precision >= this.CRITICAL_THRESHOLD) {
        damageType = "critical";
        description = `${vitalPoint.korean} 급소 치명타!`;
        korean = "급소 치명타";
      } else {
        damageType = "vital";
        description = `${vitalPoint.korean} 급소 공격`;
        korean = "급소 공격";
      }

      // Add meridian-specific status effects
      if (meridianEffects) {
        const meridianStatusEffects = KoreanAnatomy.generateMeridianEffects(
          meridianEffects.primaryMeridian,
          meridianEffects.disruptionLevel
        );
        statusEffects.push(...meridianStatusEffects);
      }
    }

    // Apply meridian flow multiplier
    totalDamage *= meridianMultiplier;

    // Calculate elemental interaction effects
    const elementalModifier = this.calculateElementalModifier(
      modifiers.attacker.element,
      modifiers.defender.element
    );
    totalDamage *= elementalModifier;

    // Apply skill modifier with fatigue consideration
    const skillModifier = this.calculateSkillModifier(
      modifiers.attacker.skill,
      modifiers.attacker.fatigue
    );
    totalDamage *= skillModifier;

    // Apply stance interaction multiplier
    const stanceMultiplier = this.calculateStanceMultiplier(
      modifiers.attacker.stance,
      modifiers.defender.stance
    );
    totalDamage *= stanceMultiplier;

    // Apply ki energy effects
    const kiModifier = this.calculateKiModifier(
      modifiers.attacker.kiLevel,
      modifiers.defender.kiLevel
    );
    totalDamage *= kiModifier;

    // Apply guard reduction
    const guardReduction = this.calculateGuardReduction(
      modifiers.defender.guard,
      modifiers.environmental.distance,
      damageType
    );
    totalDamage *= 1 - guardReduction;

    // Apply contextual modifiers if provided
    if (context) {
      const contextualModifier = this.calculateContextualModifier(
        context,
        vitalPoint
      );
      totalDamage *= contextualModifier;
    }

    // Calculate final damage with realistic bounds
    const finalDamage = Math.round(Math.max(1, Math.min(100, totalDamage)));

    // Add bonus effects for exceptional strikes
    if (damageType === "perfect") {
      statusEffects.push({
        type: "damage_boost",
        duration: 3000,
        intensity: 0.5,
        source: "perfect_technique",
      });
    } else if (damageType === "meridian_disruption") {
      statusEffects.push({
        type: "ki_disruption",
        duration: 5000,
        intensity: 0.7,
        source: "meridian_strike",
      });
    }

    return {
      finalDamage,
      damageType,
      statusEffects,
      description: `${vitalPoint.korean} - ${damageDescriptions[damageType]}`,
      korean: vitalPoint.korean,
      meridianEffects: meridianEffects || {
        primaryMeridian: "",
        disruptionLevel: 0,
        flowReduction: 0,
      },
      modifierBreakdown: {
        baseDamage: clampedBaseDamage,
        vitalPointBonus,
        meridianMultiplier,
        elementalModifier,
        skillModifier,
        guardReduction,
        finalMultiplier: stanceMultiplier * kiModifier,
      },
    };
  }

  /**
   * Calculate vital point specific damage bonus with meridian considerations
   */
  public static calculateVitalPointDamage(
    baseDamage: number,
    vitalPoint: VitalPoint | null,
    precision: number,
    technique?: KoreanTechnique
  ): DamageResult {
    if (!vitalPoint) {
      return {
        finalDamage: baseDamage,
        multiplier: 1.0,
        description: "일반 타격 - 급소를 벗어난 공격",
        korean: "일반 타격",
        effectiveness: precision,
        statusEffects: [],
      };
    }

    // Calculate base damage using vulnerability
    const baseDamage2 = vitalPoint.vulnerability * 20;

    // Damage type calculation
    const damageType = this.calculateDamageType(baseDamage, precision);

    // Damage descriptions for each type
    const damageDescriptions: Record<string, string> = {
      light: "가벼운 타격",
      medium: "중간 위력",
      heavy: "강력한 타격",
      critical: "치명적 일격",
    };

    const finalDamage = Math.round(
      baseDamage * vitalPoint.vulnerability * precision
    );

    return {
      finalDamage,
      multiplier: vitalPoint.vulnerability,
      description: `${vitalPoint.korean} - ${
        damageDescriptions[damageType] || "일반 공격"
      }`,
      korean: vitalPoint.korean,
      effectiveness: precision,
      statusEffects: vitalPoint.effects.slice(),
    };
  }

  /**
   * Get associated meridian for a vital point
   */
  private static getMeridianForVitalPoint(
    vitalPoint: VitalPoint
  ): string | null {
    // Map vital points to their associated meridians
    const vitalPointMeridianMap: Record<string, string> = {
      baihui: "bladder",
      taiyang: "bladder",
      yintang: "bladder",
      renying: "stomach",
      tiantu: "lung",
      tanzhong: "heart",
      qihai: "kidney",
      zusanli: "stomach",
      hegu: "large_intestine",
      shenmen: "heart",
      yongquan: "kidney",
    };

    return vitalPointMeridianMap[vitalPoint.id] || null;
  }

  /**
   * Calculate elemental interaction modifier
   */
  private static calculateElementalModifier(
    attackerElement?: string,
    defenderElement?: string
  ): number {
    if (!attackerElement || !defenderElement) return 1.0;

    const attackerElementData = KoreanAnatomy.ELEMENTAL_SYSTEM[attackerElement];
    if (!attackerElementData) return 1.0;

    let modifier = 1.0;

    if (attackerElementData.destructive === defenderElement) {
      modifier += this.MAX_ELEMENTAL_BONUS;
    }

    if (attackerElementData.generative === defenderElement) {
      modifier -= this.MAX_ELEMENTAL_BONUS * 0.5;
    }

    if (attackerElementData.weakens.includes(defenderElement)) {
      modifier += this.MAX_ELEMENTAL_BONUS * 0.3;
    }

    if (attackerElementData.supports.includes(defenderElement)) {
      modifier += this.MAX_ELEMENTAL_BONUS * 0.2;
    }

    return Math.max(0.5, Math.min(2.0, modifier));
  }

  /**
   * Calculate skill-based damage modifier with fatigue
   */
  private static calculateSkillModifier(
    skill: number,
    fatigue: number
  ): number {
    const baseSkillModifier = 0.7 + skill * 0.6;
    const fatigueReduction = fatigue * 0.4;

    return Math.max(0.3, baseSkillModifier - fatigueReduction);
  }

  /**
   * Calculate stance interaction multiplier based on trigram theory
   */
  private static calculateStanceMultiplier(
    attackerStance: string,
    defenderStance: string
  ): number {
    const stanceAdvantages: Record<string, readonly string[]> = {
      geon: ["gon", "gan"],
      tae: ["li", "jin"],
      li: ["gan", "gam"],
      jin: ["son", "gam"],
      son: ["geon", "tae"],
      gam: ["li", "son"],
      gan: ["jin", "tae"],
      gon: ["geon", "son"],
    };

    const advantages = stanceAdvantages[attackerStance] || [];

    if (advantages.includes(defenderStance)) {
      return 1.3;
    } else if (stanceAdvantages[defenderStance]?.includes(attackerStance)) {
      return 0.8;
    }

    return 1.0;
  }

  /**
   * Calculate ki energy modifier
   */
  private static calculateKiModifier(
    attackerKi: number,
    defenderKi: number
  ): number {
    const kiDifference = attackerKi - defenderKi;
    const baseModifier = 1.0;
    const kiBonus = kiDifference * 0.25;

    return Math.max(0.5, Math.min(1.8, baseModifier + kiBonus));
  }

  /**
   * Calculate guard effectiveness with vital point considerations
   */
  private static calculateGuardReduction(
    guard: number,
    distance: number,
    damageType: DamageResult["damageType"]
  ): number {
    if (guard <= 0) return 0;

    const distanceModifier = Math.max(0.5, distance / 100);
    let effectiveGuard = Math.min(1.0, guard * distanceModifier);

    if (
      damageType === "vital" ||
      damageType === "critical" ||
      damageType === "perfect"
    ) {
      effectiveGuard *= 0.7;
    }

    if (damageType === "meridian_disruption") {
      effectiveGuard *= 0.3;
    }

    return effectiveGuard * this.GUARD_EFFECTIVENESS;
  }

  /**
   * Calculate contextual combat modifiers
   */
  private static calculateContextualModifier(
    context: CombatContext,
    vitalPoint: VitalPoint | null
  ): number {
    let modifier = 1.0;

    switch (context.attackType) {
      case "pressure":
        modifier *= vitalPoint ? 1.2 : 0.9;
        break;
      case "manipulation":
        modifier *= 1.1;
        break;
      case "energy":
        modifier *= vitalPoint ? 1.3 : 0.8;
        break;
      default:
        break;
    }

    modifier *= Math.max(0.8, context.environmentalFactors.lighting);

    if (context.environmentalFactors.temperature < 0.3) {
      modifier *= 0.9;
    } else if (context.environmentalFactors.temperature > 0.7) {
      modifier *= 0.95;
    }

    const durationFatigue = Math.min(0.3, context.combatDuration / 300);
    modifier *= 1 - durationFatigue;

    return Math.max(0.5, Math.min(1.5, modifier));
  }
}

/**
 * Calculate quick damage for testing and simple scenarios
 */
export function calculateQuickDamage(
  baseDamage: number,
  vitalPoint: VitalPoint | null = null,
  precision: number = 0.8
): DamageResult {
  const defaultModifiers: DamageModifiers = {
    attacker: {
      skill: 0.5,
      stance: "geon",
      kiLevel: 0.5,
      fatigue: 0,
      element: "fire",
    },
    defender: {
      guard: 0,
      stance: "gon",
      resilience: 0.5,
      kiLevel: 0.5,
      element: "earth",
    },
    environmental: {
      distance: 50,
      timing: 0.8,
      precision,
      timeOfDay: 12,
    },
  };

  return KoreanDamageCalculator.calculateDamage(
    baseDamage,
    vitalPoint,
    defaultModifiers
  );
}
