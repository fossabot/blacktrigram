import type {
  PlayerState,
  KoreanTechnique,
  CombatResult,
  VitalPointHitResult,
} from "../types";
import { DamageCalculator } from "./vitalpoint/DamageCalculator";
import { VitalPointSystem } from "./VitalPointSystem";
import { TrigramSystem } from "./TrigramSystem";

export class CombatSystem {
  private vitalPointSystem: VitalPointSystem;
  private trigramSystem: TrigramSystem;

  constructor() {
    this.vitalPointSystem = new VitalPointSystem();
    this.trigramSystem = new TrigramSystem();
  }

  resolveAttack(
    attacker: PlayerState,
    defender: PlayerState,
    targetedVitalPointId?: string
  ): CombatResult {
    const baseDamage = attacker.attackPower;

    const vitalPointResult = this.vitalPointSystem.processHit(
      defender.position,
      null,
      baseDamage,
      attacker.archetype,
      { width: 100, height: 200 },
      targetedVitalPointId
    );

    const stanceEffectiveness = this.trigramSystem.calculateStanceEffectiveness(
      attacker.currentStance,
      defender.currentStance
    );

    const finalDamage = Math.floor(
      vitalPointResult.damage * stanceEffectiveness
    );

    let totalDamage = finalDamage;
    totalDamage += Math.floor(baseDamage * 0.1); // Add base damage bonus

    return {
      hit: vitalPointResult.hit,
      damage: totalDamage,
      criticalHit: totalDamage > baseDamage * 1.5,
      vitalPointHit: !!vitalPointResult.vitalPoint,
      effects: [...vitalPointResult.effects],
      timestamp: Date.now(),
    };
  }

  /**
   * Check if attacker can execute technique
   */
  private canExecuteTechnique(
    player: PlayerState,
    technique: KoreanTechnique
  ): boolean {
    return (
      player.ki >= technique.kiCost &&
      player.stamina >= technique.staminaCost &&
      player.currentStance === technique.stance
    );
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

  private processVitalPointHit(
    vitalPointId: string,
    baseDamage: number,
    attacker: PlayerState
  ): VitalPointHitResult {
    const vitalPoint = this.vitalPointSystem.getVitalPointById(vitalPointId);
    if (!vitalPoint) {
      return {
        hit: false,
        damage: 0,
        effects: [],
        severity: "minor" as any,
      };
    }

    const damageResult = DamageCalculator.calculateVitalPointDamage(
      vitalPoint,
      baseDamage,
      attacker
    );

    return {
      hit: true,
      vitalPoint,
      damage: damageResult.damage,
      effects: damageResult.effects,
      severity: vitalPoint.severity,
    };
  }

  /**
   * Execute attack with technique
   */
  private executeAttack(
    attacker: PlayerState,
    defender: PlayerState,
    _technique: KoreanTechnique // Fix: Add underscore for unused parameter
  ): CombatResult {
    return this.resolveAttack(attacker, defender);
  }

  getAvailableTechniques(player: PlayerState): readonly KoreanTechnique[] {
    const stanceData = this.trigramSystem.getCurrentStanceData(
      player.currentStance
    );
    if (!stanceData) return [];

    return [];
  }

  executeTechnique(
    attacker: PlayerState,
    _defender: PlayerState, // Fix: Add underscore for unused parameter
    technique: KoreanTechnique,
    targetedVitalPointId?: string
  ): CombatResult {
    if (!this.canExecuteTechnique(attacker, technique)) {
      return {
        hit: false,
        damage: 0,
        criticalHit: false,
        vitalPointHit: false,
        technique: technique,
        effects: [],
        timestamp: Date.now(),
      };
    }

    const baseDamage = technique.damage || attacker.attackPower;
    const isCritical = this.calculateCriticalHit(technique, attacker);
    const finalDamage = isCritical
      ? baseDamage * technique.critMultiplier
      : baseDamage;

    let vitalPointHit = false;
    if (targetedVitalPointId) {
      const vitalPointResult = this.processVitalPointHit(
        targetedVitalPointId,
        finalDamage,
        attacker
      );
      vitalPointHit = vitalPointResult.hit;
    }

    return {
      hit: true,
      damage: finalDamage,
      criticalHit: isCritical,
      vitalPointHit,
      technique: technique,
      effects: [...technique.effects],
      timestamp: Date.now(),
      updatedAttacker: this.applyTechniqueCosts(attacker, technique),
    };
  }

  private calculateCriticalHit(
    technique: KoreanTechnique,
    attacker: PlayerState
  ): boolean {
    const critChance = technique.critChance + attacker.technique * 0.01;
    return Math.random() < critChance;
  }

  private applyTechniqueCosts(
    player: PlayerState,
    technique: KoreanTechnique
  ): PlayerState {
    return {
      ...player,
      ki: Math.max(0, player.ki - technique.kiCost),
      stamina: Math.max(0, player.stamina - technique.staminaCost),
    };
  }
}

export default CombatSystem;
