import {
  PlayerState,
  KoreanTechnique,
  CombatResult,
  VitalPointHitResult,
  VitalPoint,
} from "../types";

import { VitalPointSystem } from "./VitalPointSystem";
import { TrigramSystem } from "./TrigramSystem";

/**
 * Fix: Create DamageCalculator class
 */
class DamageCalculator {
  static calculateVitalPointDamage(
    baseDamage: number,
    vitalPoint: VitalPoint,
    technique: KoreanTechnique
  ): number {
    let multiplier = 1.0;

    // Apply vital point severity multiplier
    switch (vitalPoint.severity) {
      case "major":
        multiplier = 2.0;
        break;
      case "moderate":
        multiplier = 1.5;
        break;
      case "minor":
        multiplier = 1.2;
        break;
    }

    return Math.floor(baseDamage * multiplier);
  }
}

export class CombatSystem {
  private vitalPointSystem: VitalPointSystem;
  private trigramSystem: TrigramSystem;

  constructor() {
    this.vitalPointSystem = new VitalPointSystem();
    this.trigramSystem = new TrigramSystem();
  }

  /**
   * Execute an attack between two players
   */
  public executeAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ): CombatResult {
    // Check if attacker can execute the technique
    if (!this.canExecuteTechnique(attacker, technique)) {
      return this.createFailedResult(attacker, defender);
    }

    // Calculate base hit chance
    const hitChance = this.calculateHitChance(attacker, defender, technique);
    const hit = Math.random() < hitChance;

    if (!hit) {
      return this.createMissResult(attacker, defender);
    }

    // Check for vital point hit
    const vitalPointResult = this.vitalPointSystem.checkVitalPointHit(
      attacker,
      defender.position,
      technique
    );

    // Calculate damage
    let damage = technique.damage || 0;
    let criticalHit = false;
    let vitalPointHit = vitalPointResult.hit;

    // Apply stance effectiveness
    const stanceEffectiveness = this.trigramSystem.getStanceEffectiveness(
      attacker.currentStance,
      defender.currentStance
    );
    damage *= stanceEffectiveness;

    // Check for critical hit
    if (Math.random() < (technique.critChance || 0.1)) {
      criticalHit = true;
      damage *= technique.critMultiplier || 1.5;
    }

    // Apply vital point damage
    if (vitalPointHit && vitalPointResult.vitalPoint) {
      const vpDamage = DamageCalculator.calculateVitalPointDamage(
        vitalPointResult.vitalPoint,
        technique,
        attacker
      );
      damage += vpDamage;
    }

    // Apply damage reduction
    const finalDamage = this.calculateFinalDamage(damage, defender, technique);

    // Update player states
    const updatedDefender = this.applyDamage(
      defender,
      finalDamage,
      vitalPointResult.effects
    );
    const updatedAttacker = this.consumeResources(attacker, technique);

    return {
      hit: true,
      damage: finalDamage,
      criticalHit,
      vitalPointHit,
      updatedAttacker,
      updatedDefender,
      effects: vitalPointResult.effects,
      technique,
      timestamp: Date.now(),
    };
  }

  /**
   * Check if attacker can execute technique
   */
  private canExecuteTechnique(
    attacker: PlayerState,
    technique: KoreanTechnique
  ): boolean {
    return (
      attacker.ki >= technique.kiCost &&
      attacker.stamina >= technique.staminaCost &&
      attacker.currentStance === technique.stance
    );
  }

  /**
   * Calculate hit chance
   */
  private calculateHitChance(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ): number {
    let hitChance = technique.accuracy || 0.8;

    // Factor in attacker's balance and health
    const attackerCondition =
      (attacker.balance / 100) * (attacker.health / attacker.maxHealth);
    hitChance *= attackerCondition;

    // Factor in defender's balance and blocking
    const defenderEvasion =
      (defender.balance / 100) * (defender.isBlocking ? 0.5 : 1.0);
    hitChance *= 1 - defenderEvasion * 0.3;

    return Math.max(0.1, Math.min(0.95, hitChance));
  }

  /**
   * Calculate final damage after all modifiers
   */
  private calculateFinalDamage(
    baseDamage: number,
    defender: PlayerState,
    technique: KoreanTechnique
  ): number {
    let finalDamage = baseDamage;

    // Apply blocking reduction
    if (defender.isBlocking) {
      finalDamage *= 0.5;
    }

    // Apply stance defensive bonus
    const stanceData = this.trigramSystem.getStanceData(defender.currentStance);
    finalDamage *= 1 - (stanceData.defensiveBonus || 0);

    // Apply minimum damage (at least 1 point)
    return Math.max(1, Math.floor(finalDamage));
  }

  /**
   * Apply damage and effects to defender
   */
  private applyDamage(
    defender: PlayerState,
    damage: number,
    effects: any[]
  ): PlayerState {
    return {
      ...defender,
      health: Math.max(0, defender.health - damage),
      statusEffects: [...defender.statusEffects, ...effects],
    };
  }

  /**
   * Consume attacker's resources
   */
  private consumeResources(
    attacker: PlayerState,
    technique: KoreanTechnique
  ): PlayerState {
    return {
      ...attacker,
      ki: Math.max(0, attacker.ki - technique.kiCost),
      stamina: Math.max(0, attacker.stamina - technique.staminaCost),
    };
  }

  /**
   * Create failed attack result
   */
  private createFailedResult(
    attacker: PlayerState,
    defender: PlayerState
  ): CombatResult {
    return {
      hit: false,
      damage: 0,
      criticalHit: false,
      vitalPointHit: false,
      updatedAttacker: attacker,
      updatedDefender: defender,
      effects: [],
      timestamp: Date.now(),
    };
  }

  /**
   * Create miss result
   */
  private createMissResult(
    attacker: PlayerState,
    defender: PlayerState
  ): CombatResult {
    const updatedAttacker = this.consumeResources(attacker, {
      kiCost: 5,
      staminaCost: 3,
    } as KoreanTechnique);

    return {
      hit: false,
      damage: 0,
      criticalHit: false,
      vitalPointHit: false,
      updatedAttacker,
      updatedDefender: defender,
      effects: [],
      timestamp: Date.now(),
    };
  }

  /**
   * Static methods for backwards compatibility
   */
  static resolveAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ): CombatResult {
    const instance = new CombatSystem();
    return instance.executeAttack(attacker, defender, technique);
  }

  static applyCombatResult(
    result: CombatResult,
    defender: PlayerState
  ): { updatedDefender: PlayerState } {
    const updatedDefender: PlayerState = {
      ...defender,
      health: Math.max(0, defender.health - result.damage),
    };

    return { updatedDefender };
  }

  static getAvailableTechniques(player: PlayerState): KoreanTechnique[] {
    const basicTechnique: KoreanTechnique = {
      id: `${player.currentStance}_basic`,
      name: {
        korean: `${player.currentStance} 기본 기법`,
        english: `${player.currentStance} Basic Technique`,
      },
      koreanName: `${player.currentStance} 기본 기법`,
      englishName: `${player.currentStance} Basic Technique`,
      romanized: `${player.currentStance}_gibon_gibeop`,
      description: {
        korean: "기본 공격 기법",
        english: "Basic attack technique",
      },
      stance: player.currentStance,
      type: "strike" as any,
      damageType: "blunt" as any,
      damage: 20,
      damageRange: { min: 15, max: 25 },
      range: 1.0,
      kiCost: 10,
      staminaCost: 15,
      accuracy: 0.8,
      executionTime: 500,
      recoveryTime: 800,
      critChance: 0.1,
      critMultiplier: 1.5,
      effects: [],
    };

    return [basicTechnique];
  }

  /**
   * Check if a player is defeated
   */
  isPlayerDefeated(player: PlayerState): boolean {
    return player.health <= 0 || player.consciousness <= 0;
  }

  /**
   * Update player state over time
   */
  updatePlayerState(player: PlayerState, deltaTime: number): PlayerState {
    return {
      ...player,
      stamina: Math.min(
        player.maxStamina,
        player.stamina + (10 * deltaTime) / 1000
      ),
      ki: Math.min(player.maxKi, player.ki + (5 * deltaTime) / 1000),
      balance: Math.min(100, player.balance + (15 * deltaTime) / 1000),
    };
  }

  /**
   * Get combat statistics
   */
  getCombatStatistics(player: PlayerState): {
    healthPercent: number;
    kiPercent: number;
    staminaPercent: number;
    balancePercent: number;
  } {
    return {
      healthPercent: (player.health / player.maxHealth) * 100,
      kiPercent: (player.ki / player.maxKi) * 100,
      staminaPercent: (player.stamina / player.maxStamina) * 100,
      balancePercent: player.balance,
    };
  }

  /**
   * Calculate damage based on technique, attacker, defender, and vital point result
   */
  calculateDamage(
    technique: KoreanTechnique,
    attacker: PlayerState,
    defender: PlayerState,
    vitalPointResult: VitalPointHitResult
  ): number {
    let baseDamage = technique.damage || 20;

    // Apply vital point multiplier using DamageCalculator
    if (vitalPointResult.hit && vitalPointResult.vitalPoint) {
      const vpDamage = DamageCalculator.calculateVitalPointDamage(
        baseDamage,
        vitalPointResult.vitalPoint,
        technique
      );
      baseDamage = vpDamage;
    }

    // Apply stance effectiveness
    const stanceMultiplier = this.trigramSystem.getStanceEffectiveness(
      attacker.currentStance,
      defender.currentStance
    );

    baseDamage *= stanceMultiplier;

    // Apply attacker/defender stats
    const attackPowerRatio = attacker.attackPower / (defender.defense + 1);
    baseDamage *= attackPowerRatio;

    // Fix: Convert readonly array to mutable array
    const effectsArray = Array.from(vitalPointResult.effects);
    console.log("Applied effects:", effectsArray);

    return Math.floor(baseDamage);
  }

  /**
   * Resolve attack and calculate damage
   */
  resolveAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ): CombatResult {
    // Fix: Use correct method signature (3 parameters, not 5)
    const vitalPointResult = this.vitalPointSystem.processHit(
      defender.position,
      technique,
      technique.damage || 20
    );

    const damage = this.calculateDamage(
      technique,
      attacker,
      defender,
      vitalPointResult
    );

    return {
      hit: vitalPointResult.hit,
      damage,
      criticalHit: Math.random() < technique.critChance,
      vitalPointHit: !!vitalPointResult.vitalPoint,
      attacker,
      defender,
      technique,
      effects: Array.from(vitalPointResult.effects),
      timestamp: Date.now(),
    };
  }
}
