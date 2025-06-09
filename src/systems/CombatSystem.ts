import type { PlayerState, KoreanTechnique, CombatResult } from "../types";
import { VitalPointSystem } from "./VitalPointSystem";
import { TrigramSystem } from "./TrigramSystem";
import { ENHANCED_DAMAGE_CONSTANTS } from "../types/constants";

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
  executeAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ): CombatResult {
    // Calculate base damage using attacker and technique data
    const baseDamage = this.calculateBaseDamage(attacker, technique);

    // Check for vital point hits
    const vitalPointHit = this.vitalPointSystem.checkVitalPointHit(
      attacker,
      defender,
      technique
    );

    // Apply stance effectiveness
    const stanceMultiplier = this.trigramSystem.getStanceEffectiveness(
      attacker.currentStance,
      defender.currentStance
    );

    // Calculate final damage
    let finalDamage = baseDamage * stanceMultiplier;

    if (vitalPointHit.hit) {
      finalDamage *= ENHANCED_DAMAGE_CONSTANTS.VITAL_POINT_MULTIPLIER;
    }

    const isCritical = Math.random() < (technique.critChance || 0.1);
    if (isCritical) {
      finalDamage *= ENHANCED_DAMAGE_CONSTANTS.CRITICAL_MULTIPLIER;
    }

    // Apply damage to defender
    const updatedDefender: PlayerState = {
      ...defender,
      health: Math.max(0, defender.health - finalDamage),
      consciousness: vitalPointHit.hit
        ? Math.max(0, defender.consciousness - 20)
        : defender.consciousness,
    };

    // Apply ki/stamina costs to attacker
    const updatedAttacker: PlayerState = {
      ...attacker,
      ki: Math.max(0, attacker.ki - technique.kiCost),
      stamina: Math.max(0, attacker.stamina - technique.staminaCost),
    };

    return {
      success: true,
      damage: finalDamage,
      effects: vitalPointHit.effects.map((e) => e.id || e.type),
      criticalHit: isCritical,
      vitalPointHit: vitalPointHit.hit,
      hit: true,
      updatedAttacker,
      updatedDefender,
      updatedPlayers: [
        updatedAttacker,
        updatedDefender,
      ] as readonly PlayerState[],
      message: {
        korean: `${technique.koreanName} 성공!`,
        english: `${technique.englishName} successful!`,
      },
    };
  }

  /**
   * Calculate base damage using attacker stats and technique
   */
  private calculateBaseDamage(
    attacker: PlayerState,
    technique: KoreanTechnique
  ): number {
    const baseDamage = technique.damage || technique.damageRange?.min || 10;

    // Factor in attacker's ki and stamina
    const attackerBonus =
      (attacker.ki / attacker.maxKi) * 0.2 +
      (attacker.stamina / attacker.maxStamina) * 0.1;

    return baseDamage * (1 + attackerBonus);
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
      romanized: `${player.currentStance} gibon_gibeop`,
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
    };
  }
}
