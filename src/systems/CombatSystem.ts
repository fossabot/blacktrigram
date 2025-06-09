import type { PlayerState, KoreanTechnique, CombatResult } from "../types";
import { VitalPointSystem } from "./VitalPointSystem";
// Remove unused import
// import { ENHANCED_DAMAGE_CONSTANTS } from "../types/constants";

export class CombatSystem {
  private vitalPointSystem: VitalPointSystem;
  // Remove unused field
  // private trigramSystem: TrigramSystem;

  constructor() {
    this.vitalPointSystem = new VitalPointSystem();
    // Remove unused initialization
    // this.trigramSystem = new TrigramSystem();
  }

  /**
   * Execute an attack between two players
   */
  public executeAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ): CombatResult {
    const vitalPointResult = this.vitalPointSystem.checkVitalPointHit(
      attacker,
      defender.position,
      technique
    );

    // Calculate base damage
    let damage = technique.damage || 0;
    let hit = true;
    let criticalHit = false;
    let vitalPointHit = vitalPointResult.hit;

    // Apply accuracy check
    if (Math.random() > (technique.accuracy || 1.0)) {
      hit = false;
      damage = 0;
    }

    // Apply critical hit
    if (hit && Math.random() < (technique.critChance || 0.1)) {
      criticalHit = true;
      damage *= technique.critMultiplier || 1.5;
    }

    // Apply vital point damage
    if (vitalPointHit) {
      damage += vitalPointResult.damage;
    }

    // Update defender
    const updatedDefender: PlayerState = {
      ...defender,
      health: Math.max(0, defender.health - damage),
    };

    // Update attacker (ki/stamina costs)
    const updatedAttacker: PlayerState = {
      ...attacker,
      ki: Math.max(0, attacker.ki - (technique.kiCost || 0)),
      stamina: Math.max(0, attacker.stamina - (technique.staminaCost || 0)),
    };

    return {
      hit,
      damage,
      criticalHit,
      vitalPointHit,
      updatedAttacker,
      updatedDefender,
      // Fix: Keep effects as StatusEffect[] instead of converting to string[]
      effects: vitalPointResult.effects.map((effect) => ({
        id: effect.id || "unknown",
        type: effect.type,
        intensity: effect.intensity,
        duration: effect.duration,
        description: effect.description,
        stackable: effect.stackable || false,
        source: effect.source || "vital_point",
        startTime: Date.now(),
        endTime: Date.now() + effect.duration,
      })),
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
