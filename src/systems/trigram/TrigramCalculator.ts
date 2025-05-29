import type {
  TrigramStance,
  TransitionMetrics,
  TransitionResult,
} from "../../types/GameTypes";
import { StanceManager } from "./StanceManager";

/**
 * TrigramCalculator - Core calculations for Korean martial arts trigram system
 * Handles damage, defense, speed, and combat effectiveness calculations
 */
export class TrigramCalculator {
  /**
   * Calculate damage modifier based on trigram stance
   */
  public static getDamageModifier(stance: TrigramStance): number {
    const modifiers: Record<TrigramStance, number> = {
      geon: 1.2, // Heaven - strong and commanding
      tae: 1.0, // Lake - balanced and flowing
      li: 1.3, // Fire - highest damage, aggressive
      jin: 1.1, // Thunder - good damage with speed
      son: 0.9, // Wind - agile but lighter strikes
      gam: 1.0, // Water - adaptable and consistent
      gan: 0.8, // Mountain - defensive, lower attack
      gon: 1.1, // Earth - steady and reliable power
    };
    return modifiers[stance];
  }

  /**
   * Calculate defense modifier based on trigram stance
   */
  public static getDefenseModifier(stance: TrigramStance): number {
    const modifiers: Record<TrigramStance, number> = {
      geon: 1.1, // Heaven - good natural defense
      tae: 1.0, // Lake - balanced defensive stance
      li: 0.8, // Fire - aggressive, less defensive
      jin: 0.9, // Thunder - offensive focus
      son: 1.2, // Wind - evasive defensive style
      gam: 1.1, // Water - adaptive defense
      gan: 1.4, // Mountain - highest defense
      gon: 1.3, // Earth - solid defensive foundation
    };
    return modifiers[stance];
  }

  /**
   * Calculate speed modifier based on trigram stance
   */
  public static getSpeedModifier(stance: TrigramStance): number {
    const modifiers: Record<TrigramStance, number> = {
      geon: 1.0, // Heaven - balanced movement
      tae: 1.1, // Lake - fluid and smooth
      li: 1.2, // Fire - fast and explosive
      jin: 1.3, // Thunder - very fast strikes
      son: 1.4, // Wind - fastest movement
      gam: 1.1, // Water - flowing movement
      gan: 0.7, // Mountain - slow but steady
      gon: 0.8, // Earth - grounded, measured pace
    };
    return modifiers[stance];
  }

  /**
   * Calculate evasion modifier based on trigram stance
   */
  public static getEvasionModifier(stance: TrigramStance): number {
    const modifiers: Record<TrigramStance, number> = {
      geon: 1.0, // Heaven - balanced evasion
      tae: 1.2, // Lake - fluid evasion
      li: 0.9, // Fire - direct, less evasive
      jin: 1.1, // Thunder - quick dodges
      son: 1.4, // Wind - highest evasion
      gam: 1.3, // Water - flowing evasion
      gan: 0.8, // Mountain - sturdy, less mobile
      gon: 0.9, // Earth - grounded movement
    };
    return modifiers[stance];
  }

  /**
   * Calculate transition cost between two stances
   */
  public static calculateTransitionCost(
    from: TrigramStance,
    to: TrigramStance
  ): TransitionMetrics {
    if (from === to) {
      return {
        staminaCost: 0,
        kiCost: 0,
        timeDelay: 0,
        effectiveness: 1.0,
      };
    }

    const distance = StanceManager.calculateStanceDistance(from, to);
    const baseCost = distance * 5;

    return {
      staminaCost: baseCost,
      kiCost: Math.floor(baseCost * 0.5),
      timeDelay: distance * 100,
      effectiveness: Math.max(0.3, 1 - distance * 0.1),
    };
  }

  /**
   * Calculate effective damage considering both attacker and defender stances
   */
  public static calculateEffectiveDamage(
    baseDamage: number,
    attackerStance: TrigramStance,
    defenderStance: TrigramStance,
    distance: number = 1.0
  ): number {
    const damageModifier = this.getDamageModifier(attackerStance);
    const defenseModifier = this.getDefenseModifier(defenderStance);
    const stanceAdvantage = StanceManager.calculateStanceAdvantage(
      attackerStance,
      defenderStance
    );

    let effectiveDamage = baseDamage * damageModifier * stanceAdvantage;
    effectiveDamage /= defenseModifier;
    effectiveDamage *= distance; // Distance modifier

    return Math.max(1, Math.round(effectiveDamage));
  }

  /**
   * Calculate hit chance based on attacker and defender stances
   */
  public static calculateHitChance(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance,
    baseAccuracy: number = 0.8
  ): number {
    const speedModifier = this.getSpeedModifier(attackerStance);
    const evasionModifier = this.getEvasionModifier(defenderStance);

    const hitChance = (baseAccuracy * speedModifier) / evasionModifier;
    return Math.max(0.1, Math.min(0.95, hitChance));
  }

  /**
   * Calculate movement speed based on stance
   */
  public static calculateMovementSpeed(
    stance: TrigramStance,
    baseSpeed: number = 100
  ): number {
    const speedModifier = this.getSpeedModifier(stance);
    return baseSpeed * speedModifier;
  }

  /**
   * Calculate synergy between two stances
   */
  public static calculateStanceSynergy(
    stance1: TrigramStance,
    stance2: TrigramStance
  ): number {
    if (stance1 === stance2) return 1.0;

    const distance = StanceManager.calculateStanceDistance(stance1, stance2);

    // Adjacent stances have good synergy
    if (distance === 1) return 0.8;

    // Opposite stances have poor synergy
    if (distance === 4) return 0.4;

    // Other combinations have moderate synergy
    return 0.6;
  }

  /**
   * Get comprehensive stats for a stance
   */
  public static getStanceStats(stance: TrigramStance): {
    damage: number;
    defense: number;
    speed: number;
    evasion: number;
    overall: number;
  } {
    const damage = this.getDamageModifier(stance);
    const defense = this.getDefenseModifier(stance);
    const speed = this.getSpeedModifier(stance);
    const evasion = this.getEvasionModifier(stance);

    const overall = (damage + defense + speed + evasion) / 4;

    return {
      damage,
      defense,
      speed,
      evasion,
      overall,
    };
  }
}
