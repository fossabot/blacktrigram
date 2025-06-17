/**
 * @fileoverview Korean Martial Arts Combat System Implementation
 * @description Complete combat system with authentic Korean martial arts mechanics
 */

import type { PlayerState } from "../types/player";
import type { KoreanTechnique, CombatResult } from "../types/combat";
import type { TrigramStance } from "../types/enums";
import { StanceManager } from "./trigram/StanceManager";
import { KoreanVitalPoints } from "./vitalpoint/KoreanVitalPoints";
import { DamageCalculator } from "./vitalpoint/DamageCalculator";

export class CombatSystem {
  private readonly stanceManager: StanceManager;
  private readonly vitalPoints: KoreanVitalPoints;
  private readonly damageCalculator: DamageCalculator;

  constructor() {
    this.stanceManager = new StanceManager();
    this.vitalPoints = new KoreanVitalPoints();
    this.damageCalculator = new DamageCalculator(this.vitalPoints);
  }

  /**
   * Execute Korean martial arts technique with authentic calculations
   */
  public async executeKoreanTechnique(
    attacker: PlayerState,
    technique: KoreanTechnique,
    defender: PlayerState,
    targetPosition?: { x: number; y: number }
  ): Promise<CombatResult> {
    // Validate technique execution
    const validation = this.validateTechnique(attacker, technique);
    if (!validation.valid) {
      return {
        success: false,
        damage: 0,
        hit: false,
        critical: false,
        vitalPointsHit: [],
        message: validation.message,
        effects: [],
      };
    }

    // Calculate stance effectiveness
    const stanceMultiplier = this.stanceManager.getStanceEffectiveness(
      attacker.currentStance,
      defender.currentStance
    );

    // Determine hit success
    const hitChance = this.calculateHitChance(attacker, defender, technique);
    const hitRoll = Math.random();
    const hit = hitRoll <= hitChance;

    if (!hit) {
      return {
        success: true,
        damage: 0,
        hit: false,
        critical: false,
        vitalPointsHit: [],
        message: `${technique.name.korean} 빗나감 - ${technique.name.english} missed`,
        effects: [],
      };
    }

    // Calculate damage with vital point targeting
    const damageResult = await this.damageCalculator.calculateDamage(
      technique,
      attacker,
      defender,
      stanceMultiplier,
      targetPosition
    );

    // Apply Korean martial arts combat effects
    const combatResult: CombatResult = {
      success: true,
      damage: damageResult.totalDamage,
      hit: true,
      critical: damageResult.isCritical,
      vitalPointsHit: damageResult.vitalPointsHit,
      message: this.generateCombatMessage(technique, damageResult),
      effects: damageResult.effects,
      stanceEffectiveness: stanceMultiplier,
      techniqueAccuracy: hitChance,
      ...damageResult,
    };

    return combatResult;
  }

  /**
   * Validate technique execution according to Korean martial arts rules
   */
  public validateTechnique(
    player: PlayerState,
    technique: KoreanTechnique
  ): { valid: boolean; message: string } {
    // Check stance compatibility
    if (technique.stance && technique.stance !== player.currentStance) {
      return {
        valid: false,
        message: `${technique.stance} 자세가 필요합니다 - ${technique.stance} stance required`,
      };
    }

    // Check resource requirements
    if (player.ki < technique.kiCost) {
      return {
        valid: false,
        message: "기력이 부족합니다 - Insufficient Ki",
      };
    }

    if (player.stamina < technique.staminaCost) {
      return {
        valid: false,
        message: "체력이 부족합니다 - Insufficient Stamina",
      };
    }

    // Check if player is in recovery state
    const currentTime = Date.now();
    if (currentTime < player.lastActionTime + player.recoveryTime) {
      return {
        valid: false,
        message: "아직 회복 중입니다 - Still recovering",
      };
    }

    // Check if player is stunned or incapacitated
    if (player.isStunned || player.consciousness <= 10) {
      return {
        valid: false,
        message: "행동할 수 없는 상태입니다 - Unable to act",
      };
    }

    return { valid: true, message: "" };
  }

  /**
   * Calculate hit chance based on Korean martial arts principles
   */
  private calculateHitChance(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ): number {
    let baseHitChance = technique.accuracy || 0.75;

    // Stance bonuses
    const attackerBonuses = this.stanceManager.getStanceBonuses(
      attacker.currentStance
    );
    baseHitChance *= attackerBonuses.speed;

    // Defender's evasion
    const defenderBonuses = this.stanceManager.getStanceBonuses(
      defender.currentStance
    );
    const evasionMultiplier = 1 - (defenderBonuses.defense - 1) * 0.5;
    baseHitChance *= evasionMultiplier;

    // Player condition modifiers
    const attackerCondition = Math.min(
      attacker.stamina / attacker.maxStamina,
      attacker.consciousness / 100
    );
    baseHitChance *= 0.5 + attackerCondition * 0.5;

    // Defender blocking
    if (defender.isBlocking) {
      baseHitChance *= 0.6;
    }

    // Balance affects accuracy
    baseHitChance *= attacker.balance / 100;

    return Math.max(0.05, Math.min(0.95, baseHitChance));
  }

  /**
   * Generate Korean combat message
   */
  private generateCombatMessage(
    technique: KoreanTechnique,
    damageResult: any
  ): string {
    if (damageResult.isCritical) {
      return `${technique.name.korean} 치명타! ${damageResult.totalDamage} 피해 - ${technique.name.english} Critical! ${damageResult.totalDamage} damage`;
    }

    if (damageResult.vitalPointsHit.length > 0) {
      const vitalPoint = damageResult.vitalPointsHit[0];
      return `${technique.name.korean}로 ${vitalPoint.name.korean} 타격! ${damageResult.totalDamage} 피해`;
    }

    return `${technique.name.korean} 적중! ${damageResult.totalDamage} 피해 - ${technique.name.english} hit! ${damageResult.totalDamage} damage`;
  }

  /**
   * Update combat system state
   */
  public update(deltaTime: number, players: PlayerState[]): void {
    const currentTime = Date.now();

    // Update player recovery and regeneration
    players.forEach((player) => {
      // Ki regeneration (slower in combat)
      if (currentTime > player.lastActionTime + 1000) {
        player.ki = Math.min(player.maxKi, player.ki + deltaTime * 0.5);
      }

      // Stamina regeneration
      if (!player.isBlocking && currentTime > player.lastActionTime + 500) {
        player.stamina = Math.min(
          player.maxStamina,
          player.stamina + deltaTime * 0.8
        );
      }

      // Balance recovery
      if (player.balance < 100) {
        player.balance = Math.min(100, player.balance + deltaTime * 1.2);
      }

      // Consciousness recovery (very slow)
      if (player.consciousness < 100 && player.consciousness > 0) {
        player.consciousness = Math.min(
          100,
          player.consciousness + deltaTime * 0.1
        );
      }
    });
  }

  /**
   * Get available techniques for player's current stance
   */
  public getAvailableTechniques(player: PlayerState): readonly string[] {
    return this.stanceManager.getAvailableTechniques(player.currentStance);
  }

  /**
   * Change player stance
   */
  public changeStance(player: PlayerState, newStance: TrigramStance): boolean {
    const result = this.stanceManager.changeStance(player, newStance);

    if (result.success) {
      player.currentStance = newStance;
      player.ki -= result.cost * 0.6;
      player.stamina -= result.cost * 0.4;
      player.lastActionTime = Date.now();
    }

    return result.success;
  }
}

/**
 * Training-specific combat system for solo practice
 */
export class TrainingCombatSystem extends CombatSystem {
  private trainingDummy: PlayerState;

  constructor() {
    super();
    this.trainingDummy = this.createTrainingDummy();
  }

  private createTrainingDummy(): PlayerState {
    return {
      id: "training_dummy",
      name: { korean: "수련용 허수아비", english: "Training Dummy" },
      archetype: "musa" as any,
      currentStance: "geon" as any,
      health: 1000,
      maxHealth: 1000,
      ki: 100,
      maxKi: 100,
      stamina: 100,
      maxStamina: 100,
      balance: 100,
      consciousness: 100,
      pain: 0,
      experiencePoints: 0,
      level: 1,
      isBlocking: false,
      isStunned: false,
      isCountering: false,
      statusEffects: [],
      position: { x: 5, y: 5 },
      hitsLanded: 0,
      hitsTaken: 0,
      totalDamageDealt: 0,
      totalDamageReceived: 0,
      combatStats: {
        hitsLanded: 0,
        hitsTaken: 0,
        totalDamageDealt: 0,
        totalDamageReceived: 0,
        perfectStrikes: 0,
        criticalHits: 0,
      },
      attackPower: 0,
      defense: 10,
      lastActionTime: 0,
      recoveryTime: 0,
    };
  }

  public async executeTrainingTechnique(
    player: PlayerState,
    technique: KoreanTechnique,
    targetPosition?: { x: number; y: number }
  ): Promise<CombatResult> {
    const result = await this.executeKoreanTechnique(
      player,
      technique,
      this.trainingDummy,
      targetPosition
    );

    // Reset dummy health for continuous training
    if (this.trainingDummy.health <= 0) {
      this.resetTrainingDummy();
    }

    return result;
  }

  public resetTrainingDummy(): void {
    this.trainingDummy.health = this.trainingDummy.maxHealth;
    this.trainingDummy.consciousness = 100;
    this.trainingDummy.balance = 100;
  }

  public getTrainingDummy(): PlayerState {
    return this.trainingDummy;
  }
}

export default CombatSystem;
