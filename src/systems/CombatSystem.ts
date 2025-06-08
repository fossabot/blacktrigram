import type {
  PlayerState,
  CombatResult,
  KoreanTechnique,
  PlayerArchetype,
  TrigramStance,
  StatusEffect,
} from "../types";
import { VitalPointSystem } from "./VitalPointSystem";
import { TrigramSystem } from "./TrigramSystem";
import {
  STANCE_EFFECTIVENESS_MATRIX,
  PLAYER_ARCHETYPES_DATA,
} from "../types/constants";

export interface WinConditionCheckResult {
  winnerId: string | null;
  reason: string | null;
  isGameOver: boolean;
}

export class CombatSystem {
  private static vitalPointSystem = new VitalPointSystem();
  private static trigramSystem = new TrigramSystem();

  /**
   * Calculate technique damage and effects
   */
  static calculateTechnique(
    technique: KoreanTechnique,
    archetype: PlayerArchetype
  ): CombatResult {
    const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];
    let damage = technique.damage || 20;

    // Apply archetype modifiers if available
    if (archetypeData?.specialization?.damageModifier) {
      damage *= archetypeData.specialization.damageModifier;
    }

    // Check for critical hit
    const isCritical = Math.random() < (technique.critChance || 0.1);
    if (isCritical) {
      damage *= technique.critMultiplier || 1.5;
    }

    return {
      hit: true,
      damage: Math.round(damage),
      critical: isCritical,
      technique: technique.id,
      timestamp: Date.now(),
    };
  }

  /**
   * Calculate damage for direct application
   */
  static calculateDamage(
    baseDamage: number,
    attackerArchetype: PlayerArchetype,
    targetState: PlayerState,
    isCritical: boolean = false
  ): number {
    const archetypeData = PLAYER_ARCHETYPES_DATA[attackerArchetype];
    let finalDamage = baseDamage;

    // Apply archetype damage modifier
    if (archetypeData?.specialization?.damageModifier) {
      finalDamage *= archetypeData.specialization.damageModifier;
    }

    // Apply critical hit multiplier
    if (isCritical) {
      finalDamage *= 1.5;
    }

    // Apply target defense (simplified)
    const defenseReduction = Math.min(
      0.5,
      (targetState.stamina / targetState.maxStamina) * 0.2
    );
    finalDamage *= 1 - defenseReduction;

    return Math.round(Math.max(1, finalDamage));
  }

  /**
   * Execute attack between players - Fix: Return complete PlayerState objects
   */
  static async executeAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique,
    targetVitalPoint?: string
  ): Promise<CombatResult> {
    // Calculate hit chance based on technique and stance
    const hitChance = this.calculateHitChance(attacker, defender, technique);
    const isHit = Math.random() < hitChance;

    if (!isHit) {
      return {
        hit: false,
        damage: 0,
        critical: false,
        updatedAttacker: {
          ...attacker,
          stamina: Math.max(0, attacker.stamina - 5),
        },
        updatedDefender: { ...defender },
        effects: [],
        message: `${technique.korean} missed`,
      };
    }

    // Calculate damage
    const baseDamage = this.calculateBaseDamage(technique, attacker.archetype);
    const vitalPointMultiplier = targetVitalPoint ? 1.5 : 1.0;
    const actualDamage = Math.floor(baseDamage * vitalPointMultiplier);
    const isCritical = Math.random() < 0.1; // 10% critical chance

    // Fix: Return complete PlayerState objects with all required properties
    return {
      hit: true,
      damage: actualDamage,
      critical: isCritical,
      updatedAttacker: {
        ...attacker,
        stamina: Math.max(0, attacker.stamina - 10),
        id: attacker.id, // Fix: Ensure id is always present
      },
      updatedDefender: {
        ...defender,
        health: Math.max(0, defender.health - actualDamage),
        id: defender.id, // Fix: Ensure id is always present
      },
      effects: [],
      message: `${technique.korean} hit for ${actualDamage} damage${
        isCritical ? " (Critical!)" : ""
      }`,
    };
  }

  private static calculateBaseDamage(
    technique: KoreanTechnique,
    archetype: PlayerArchetype
  ): number {
    // Base damage calculation
    return 20 + Math.floor(Math.random() * 10);
  }

  /**
   * Check win conditions for combat
   */
  static checkWinCondition(players: PlayerState[]): WinConditionCheckResult {
    if (players.length < 2) {
      return {
        winnerId: null,
        reason: "Insufficient players",
        isGameOver: false,
      };
    }

    const [player1, player2] = players;

    // Check health conditions
    if (player1.health <= 0) {
      return {
        winnerId: player2.id,
        reason: "opponent_ko",
        isGameOver: true,
      };
    }

    if (player2.health <= 0) {
      return {
        winnerId: player1.id,
        reason: "opponent_ko",
        isGameOver: true,
      };
    }

    // Check consciousness conditions
    if (player1.consciousness <= 0) {
      return {
        winnerId: player2.id,
        reason: "opponent_unconscious",
        isGameOver: true,
      };
    }

    if (player2.consciousness <= 0) {
      return {
        winnerId: player1.id,
        reason: "opponent_unconscious",
        isGameOver: true,
      };
    }

    return {
      winnerId: null,
      reason: null,
      isGameOver: false,
    };
  }

  /**
   * Check win condition when time runs up
   */
  static checkWinConditionOnTimeUp(
    players: PlayerState[]
  ): WinConditionCheckResult {
    if (players.length < 2) {
      return {
        winnerId: null,
        reason: "Insufficient players",
        isGameOver: true,
      };
    }

    const [player1, player2] = players;

    // Winner determined by health percentage
    const player1HealthPercent = player1.health / player1.maxHealth;
    const player2HealthPercent = player2.health / player2.maxHealth;

    if (player1HealthPercent > player2HealthPercent) {
      return {
        winnerId: player1.id,
        reason: "time_up_health_advantage",
        isGameOver: true,
      };
    } else if (player2HealthPercent > player1HealthPercent) {
      return {
        winnerId: player2.id,
        reason: "time_up_health_advantage",
        isGameOver: true,
      };
    }

    return {
      winnerId: null,
      reason: "time_up_draw",
      isGameOver: true,
    };
  }

  /**
   * Determine winner from win condition result
   */
  static determineWinner(players: PlayerState[]): string | null {
    const result = this.checkWinCondition(players);
    return result.winnerId;
  }

  /**
   * Calculate stance effectiveness matrix
   */
  static calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    const stanceKey =
      attackerStance.toLowerCase() as keyof typeof STANCE_EFFECTIVENESS_MATRIX;
    const defenderKey = defenderStance.toLowerCase();

    const stanceMatrix = STANCE_EFFECTIVENESS_MATRIX[stanceKey];
    if (stanceMatrix && typeof stanceMatrix === "object") {
      return (stanceMatrix as any)[defenderKey] || 1.0;
    }

    return 1.0;
  }

  /**
   * Apply damage to player
   */
  static applyDamage(
    player: PlayerState,
    damage: number,
    effects: StatusEffect[] = []
  ): PlayerState {
    const newHealth = Math.max(0, player.health - damage);
    const newConsciousness = Math.max(0, player.consciousness - damage * 0.3);

    return {
      ...player,
      health: newHealth,
      consciousness: newConsciousness,
      activeEffects: [...(player.activeEffects || []), ...effects],
    };
  }

  /**
   * Process combat round
   */
  static async processCombatRound(
    attacker: PlayerState,
    defender: PlayerState,
    attackerTechnique: KoreanTechnique,
    defenderTechnique?: KoreanTechnique,
    attackerTargetVP?: string,
    defenderTargetVP?: string
  ): Promise<{
    attackerResult: CombatResult;
    defenderResult?: CombatResult;
    newAttackerState: PlayerState;
    newDefenderState: PlayerState;
    winner: string | null;
  }> {
    // Execute attacker's technique
    const attackerResult = await this.executeAttack(
      attacker,
      defender,
      attackerTechnique,
      attackerTargetVP
    );

    // Apply damage to defender
    let newDefenderState = this.applyDamage(
      defender,
      attackerResult.damage,
      []
    );

    let defenderResult: CombatResult | undefined;
    let newAttackerState = attacker;

    // Execute defender's counter if they have one and are still conscious
    if (defenderTechnique && newDefenderState.consciousness > 0) {
      defenderResult = await this.executeAttack(
        newDefenderState,
        attacker,
        defenderTechnique,
        defenderTargetVP
      );

      newAttackerState = this.applyDamage(attacker, defenderResult.damage, []);
    }

    // Check for winner
    const winner = this.determineWinner([newAttackerState, newDefenderState]);

    return {
      attackerResult,
      defenderResult,
      newAttackerState,
      newDefenderState,
      winner,
    };
  }
}
