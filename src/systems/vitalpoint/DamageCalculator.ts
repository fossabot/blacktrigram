import {
  VitalPointSeverity,
  EffectIntensity,
  VitalPointEffectType,
  PlayerArchetype,
} from "../../types/enums";
import type { VitalPoint, DamageResult } from "../../types/anatomy";
import type { StatusEffect, EffectType } from "../../types/effects"; // Fix: Import EffectType from effects.ts
import type { PlayerState } from "../../types/player";
import type { KoreanTechnique } from "../../types/combat";

export class DamageCalculator {
  /**
   * Calculate damage with proper attacker integration
   */
  static calculateVitalPointDamage(
    vitalPoint: VitalPoint,
    baseDamage: number,
    attacker: PlayerState, // Fix: Use attacker parameter
    defender?: PlayerState
  ): DamageResult {
    // Base damage from vital point
    let damage = baseDamage;

    // Apply attacker's technique and archetype bonuses
    const attackerBonus = attacker.technique * 0.1;
    damage += attackerBonus;

    // Apply archetype-specific modifiers
    const archetypeModifier = this.getArchetypeVitalPointModifier(
      attacker.archetype,
      vitalPoint
    );
    damage *= archetypeModifier;

    // Apply vital point severity multiplier
    const severityMultiplier = this.getSeverityMultiplier(vitalPoint.severity);
    damage *= severityMultiplier;

    // Apply defender's defense if available
    if (defender) {
      const defenseReduction = defender.defense * 0.05;
      damage = Math.max(1, damage - defenseReduction);
    }

    // Generate status effects
    const effects = this.generateVitalPointEffects(vitalPoint, damage);

    // Determine critical hit
    const isCritical = damage > baseDamage * 1.5;
    const isVitalPoint = true; // Always true for vital point hits

    // Fix: Return proper DamageResult without totalDamage property
    return {
      damage: Math.floor(damage),
      effects,
      isCritical,
      isVitalPoint,
    };
  }

  /**
   * Get archetype-specific vital point damage modifier
   */
  private static getArchetypeVitalPointModifier(
    archetype: PlayerArchetype,
    vitalPoint: VitalPoint
  ): number {
    // Archetype specializations for different vital point categories
    const modifiers: Record<PlayerArchetype, Record<string, number>> = {
      [PlayerArchetype.AMSALJA]: {
        neurological: 1.3, // Shadow assassins excel at nerve strikes
        vascular: 1.2,
      },
      [PlayerArchetype.MUSA]: {
        skeletal: 1.2, // Traditional warriors focus on bone strikes
        muscular: 1.1,
      },
      [PlayerArchetype.HACKER]: {
        neurological: 1.1, // Cyber warriors understand nervous system
        endocrine: 1.1,
      },
      [PlayerArchetype.JEONGBO_YOWON]: {
        pressure: 1.2, // Intelligence operatives know pressure points
        circulatory: 1.1,
      },
      [PlayerArchetype.JOJIK_POKRYEOKBAE]: {
        organ: 1.2, // Street fighters aim for organs
        respiratory: 1.1,
      },
    };

    const archetypeModifiers = modifiers[archetype];
    return archetypeModifiers?.[vitalPoint.category] || 1.0;
  }

  /**
   * Get damage multiplier based on vital point severity
   */
  private static getSeverityMultiplier(severity: VitalPointSeverity): number {
    const multipliers: Record<VitalPointSeverity, number> = {
      [VitalPointSeverity.MINOR]: 1.0,
      [VitalPointSeverity.MODERATE]: 1.2,
      [VitalPointSeverity.MAJOR]: 1.5,
      [VitalPointSeverity.CRITICAL]: 2.0,
      [VitalPointSeverity.LETHAL]: 3.0,
    };

    return multipliers[severity] || 1.0;
  }

  /**
   * Convert vital point effect type to status effect type
   */
  private static convertVitalPointEffectToStatusEffect(
    effectType: VitalPointEffectType
  ): EffectType {
    // Fix: Use EffectType from effects.ts (string literals)
    const conversions: Record<VitalPointEffectType, EffectType> = {
      [VitalPointEffectType.UNCONSCIOUSNESS]: "stun",
      [VitalPointEffectType.BREATHLESSNESS]: "stamina_drain",
      [VitalPointEffectType.PAIN]: "weakened",
      [VitalPointEffectType.PARALYSIS]: "paralysis",
      [VitalPointEffectType.STUN]: "stun",
      [VitalPointEffectType.WEAKNESS]: "weakened",
      [VitalPointEffectType.DISORIENTATION]: "confusion",
      [VitalPointEffectType.BLOOD_FLOW_RESTRICTION]: "bleed",
      [VitalPointEffectType.NERVE_DISRUPTION]: "paralysis",
      [VitalPointEffectType.ORGAN_DISRUPTION]: "vulnerability",
    };

    return conversions[effectType] || "weakened";
  }

  /**
   * Generate status effects from vital point hit
   */
  private static generateVitalPointEffects(
    vitalPoint: VitalPoint,
    damage: number
  ): StatusEffect[] {
    const effects: StatusEffect[] = [];
    const currentTime = Date.now();

    vitalPoint.effects.forEach((effect) => {
      // Determine effect intensity based on damage
      let intensity: EffectIntensity;
      if (damage >= 50) {
        intensity = EffectIntensity.EXTREME;
      } else if (damage >= 30) {
        intensity = EffectIntensity.HIGH;
      } else if (damage >= 15) {
        intensity = EffectIntensity.MEDIUM;
      } else {
        intensity = EffectIntensity.WEAK;
      }

      // Create status effect with proper type conversion
      const statusEffect: StatusEffect = {
        id: `${effect.id}_${Date.now()}`,
        type: this.convertVitalPointEffectToStatusEffect(effect.type), // Fix: Use enum conversion
        intensity: intensity as any, // Convert EffectIntensity enum to effects.ts intensity type
        duration: effect.duration,
        description: effect.description,
        stackable: effect.stackable,
        source: vitalPoint.id,
        startTime: currentTime,
        endTime: currentTime + effect.duration,
      };

      effects.push(statusEffect);
    });

    return effects;
  }

  /**
   * Calculate base damage multiplier
   */
  static calculateBaseDamage(
    technique: KoreanTechnique,
    attackerState: PlayerState
  ): number {
    const baseDamage = technique.damage || 15;
    const attackerBonus = attackerState.attackPower * 0.1;
    return baseDamage + attackerBonus;
  }

  /**
   * Calculate critical hit chance
   */
  static calculateCriticalChance(
    technique: KoreanTechnique,
    attackerState: PlayerState,
    vitalPoint?: VitalPoint
  ): number {
    let critChance = technique.critChance;

    // Attacker technique bonus
    critChance += attackerState.technique * 0.01;

    // Vital point bonus
    if (vitalPoint) {
      critChance += 0.1; // 10% bonus for vital point targeting
    }

    return Math.min(1.0, critChance);
  }

  /**
   * Apply damage reduction from defense
   */
  static applyDefenseReduction(
    damage: number,
    defenderState: PlayerState
  ): number {
    const defenseReduction = defenderState.defense * 0.05;
    return Math.max(1, damage - defenseReduction);
  }

  /**
   * Calculate final damage result
   */
  static calculateFinalDamage(
    technique: KoreanTechnique,
    attacker: PlayerState,
    defender: PlayerState,
    vitalPoint?: VitalPoint
  ): DamageResult {
    // Calculate base damage
    let damage = this.calculateBaseDamage(technique, attacker);

    // Apply vital point modifiers if hit
    if (vitalPoint) {
      const vitalPointResult = this.calculateVitalPointDamage(
        vitalPoint,
        damage,
        attacker,
        defender
      );
      return vitalPointResult;
    }

    // Apply defense reduction
    damage = this.applyDefenseReduction(damage, defender);

    // Check for critical hit
    const critChance = this.calculateCriticalChance(technique, attacker);
    const isCritical = Math.random() < critChance;

    if (isCritical) {
      damage *= technique.critMultiplier;
    }

    return {
      damage: Math.floor(damage),
      effects: [...technique.effects],
      isCritical,
      isVitalPoint: false,
    };
  }
}

export default DamageCalculator;
