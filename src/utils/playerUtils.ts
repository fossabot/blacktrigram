// Player utility functions for Korean martial arts game

import { Position, CombatCondition } from "../types/common";
import { StatusEffect } from "../types/effects";
import { GAME_CONFIG } from "../types/constants";
import {
  type PlayerState,
  type TrigramStance,
  type EffectIntensity,
  type CombatState,
  type EffectType,
  type PlayerArchetype,
  CombatReadiness,
  DamageType,
} from "../types";

/**
 * Initializes two player states for the game.
 */
export function initializePlayers(): readonly [PlayerState, PlayerState] {
  return [
    createPlayerState("player1", { x: 100, y: 300 }, "geon"),
    createPlayerState("player2", { x: 700, y: 300 }, "tae"),
  ];
}

/**
 * Creates a new player state with Korean martial arts defaults
 */
export function createPlayerState(
  id: string,
  position: Position,
  stance: TrigramStance,
  overrides: Partial<PlayerState> = {}
): PlayerState {
  return {
    id,
    name: id === "player1" ? "플레이어 1" : "플레이어 2",
    archetype: "musa" as PlayerArchetype,
    position,
    stance,
    facing: position.x < 400 ? "right" : "left",
    health: GAME_CONFIG.MAX_HEALTH,
    maxHealth: GAME_CONFIG.MAX_HEALTH,
    ki: GAME_CONFIG.MAX_KI,
    maxKi: GAME_CONFIG.MAX_KI,
    stamina: GAME_CONFIG.MAX_STAMINA,
    maxStamina: GAME_CONFIG.MAX_STAMINA,
    consciousness: 100,
    pain: 0,
    balance: 100,
    bloodLoss: 0,
    lastStanceChangeTime: Date.now(),
    isAttacking: false,
    combatReadiness: CombatReadiness.READY,
    activeEffects: [],
    combatState: "ready", // Use string literal that matches CombatState enum
    conditions: [],
    ...overrides,
  };
}

/**
 * Updates two player states for the game.
 */
export function updatePlayerStates(
  player1: PlayerState,
  player2: PlayerState
): [PlayerState, PlayerState] {
  const updatedPlayer1 = {
    ...player1,
    position: { x: player1.position.x, y: player1.position.y },
  };
  const updatedPlayer2 = {
    ...player2,
    position: { x: player2.position.x, y: player2.position.y },
  };

  return [updatedPlayer1, updatedPlayer2];
}

/**
 * Updates player combat state based on damage taken
 */
export function updatePlayerCombatState(
  player: PlayerState,
  damage: number,
  vitalPointHit: boolean = false
): PlayerState {
  const newHealth = Math.max(0, player.health - damage);
  const newPain = Math.min(100, player.pain + damage * 0.8);
  const newConsciousness = vitalPointHit
    ? Math.max(0, player.consciousness - damage * 2)
    : Math.max(0, player.consciousness - damage * 0.5);

  return {
    ...player,
    health: newHealth,
    pain: newPain,
    consciousness: newConsciousness,
    isAttacking: false,
    bloodLoss: player.bloodLoss + (vitalPointHit ? damage * 0.3 : damage * 0.1),
    combatReadiness:
      newHealth > 80
        ? CombatReadiness.READY
        : newHealth > 60
        ? CombatReadiness.LIGHT_DAMAGE
        : newHealth > 40
        ? CombatReadiness.MODERATE_DAMAGE
        : newHealth > 20
        ? CombatReadiness.HEAVY_DAMAGE
        : newHealth > 0
        ? CombatReadiness.CRITICAL_DAMAGE
        : CombatReadiness.INCAPACITATED,
  };
}

/**
 * Updates player health and adjusts combat state accordingly
 * Includes Korean martial arts realism with consciousness and pain effects
 */
export function updatePlayerHealth(
  player: PlayerState,
  healthChange: number,
  _damageType: DamageType = "blunt"
): PlayerState {
  // If healthChange is positive, it's healing; if negative, it's damage
  const newHealth = Math.max(
    0,
    Math.min(player.maxHealth, player.health + healthChange)
  );

  // For damage (negative healthChange), calculate additional effects
  if (healthChange < 0) {
    const damage = Math.abs(healthChange);

    // Calculate consciousness based on health and pain
    const healthRatio = newHealth / player.maxHealth;
    let newConsciousness = player.consciousness;

    if (healthRatio < 0.2) {
      newConsciousness = Math.max(0, newConsciousness - 20);
    } else if (healthRatio < 0.5) {
      newConsciousness = Math.max(0, newConsciousness - 10);
    }

    // Determine combat state based on health and consciousness - use valid CombatState values
    let newCombatState: CombatState = "ready";
    if (newHealth <= 0 || newConsciousness <= 0) {
      newCombatState = "incapacitated";
    } else if (healthRatio < 0.3 || newConsciousness < 60) {
      newCombatState = "vulnerable";
    } else if (healthRatio < 0.6) {
      newCombatState = "stunned";
    }

    return {
      ...player,
      health: newHealth,
      consciousness: newConsciousness,
      combatState: newCombatState,
      pain: Math.min(100, player.pain + damage * 0.5),
      bloodLoss: player.bloodLoss + damage * 0.1,
    };
  } else {
    // For healing, just update health and potentially improve combat state
    const newCombatState: CombatState =
      newHealth <= 0
        ? "incapacitated"
        : newHealth <= 20
        ? "vulnerable"
        : newHealth <= 40
        ? "stunned"
        : "ready";

    return {
      ...player,
      health: newHealth,
      combatState: newCombatState,
    };
  }
}

/**
 * Adds a combat condition to the player
 */
export function addCombatCondition(
  player: PlayerState,
  type: EffectType, // Use EffectType from enums
  duration: number,
  intensity: EffectIntensity, // Use EffectIntensity type
  source: string
): PlayerState {
  const newCondition: CombatCondition = {
    id: `${type}_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    name: { korean: type, english: type }, // Default bilingual name
    type,
    duration,
    intensity,
    source,
  };

  return {
    ...player,
    conditions: [...player.conditions, newCondition], // Property now exists
  };
}

/**
 * Calculates movement speed based on player state
 */
export function calculateMovementSpeed(player: PlayerState): number {
  let baseSpeed = 100;

  // Reduce speed based on health
  const healthFactor = player.health / player.maxHealth;
  baseSpeed *= 0.5 + healthFactor * 0.5;

  // Reduce speed if attacking
  if (player.isAttacking) {
    baseSpeed *= 0.3;
  }

  // Apply status effect modifiers
  player.conditions.forEach((condition: CombatCondition) => {
    // Explicitly type condition
    switch (condition.type) {
      case "stun":
        baseSpeed *= 0.1;
        break;
      case "paralysis":
        baseSpeed *= 0.0;
        break;
      case "exhausted":
        baseSpeed *= 0.6;
        break;
    }
  });

  return Math.max(0, baseSpeed);
}

/**
 * Checks if player can perform an action
 */
export function canPerformAction(
  player: PlayerState,
  actionType: string // Consider using a more specific type for actionType
): boolean {
  // Check if incapacitated - use valid enum value
  if (player.combatState === "incapacitated") {
    return false;
  }

  // Check for disabling conditions
  const disablingConditions = player.conditions.filter(
    (c: CombatCondition) => c.type === "stun" || c.type === "paralysis"
  );

  if (disablingConditions.length > 0) {
    return false;
  }

  // Action-specific checks
  switch (actionType) {
    default:
      return true;
  }
}

/**
 * Gets the player's current status as a string
 */
export function getPlayerStatus(player: PlayerState): string {
  if (player.health <= 0) return "기절 (Unconscious)";
  if (player.health <= 20) return "위험 (Critical)";
  if (player.health <= 50) return "부상 (Injured)";
  if (player.health <= 80) return "경상 (Light Damage)";
  return "정상 (Normal)";
}

/**
 * Checks if the player can change stance
 */
export function canChangeStance(
  player: PlayerState,
  cooldownMs: number = 500
): boolean {
  return Date.now() - player.lastStanceChangeTime >= cooldownMs;
}

/**
 * Applies a status effect to the player
 */
export function applyStatusEffect(
  player: PlayerState,
  effect: StatusEffect // This StatusEffect is now from effects.ts
): PlayerState {
  return {
    ...player,
    activeEffects: [...player.activeEffects, effect], // Should now be type-compatible
  };
}

/**
 * Updates the status effects on the player
 */
export function updateStatusEffects(
  player: PlayerState,
  deltaTime: number
): PlayerState {
  const updatedEffects = player.activeEffects
    .map((effect: StatusEffect) => ({
      // Explicitly type effect
      ...effect,
      duration: effect.duration - deltaTime,
    }))
    .filter((effect: StatusEffect) => effect.duration > 0); // Explicitly type effect

  return {
    ...player,
    activeEffects: updatedEffects,
  };
}

/**
 * Checks if the player is defeated
 */
export function isPlayerDefeated(player: PlayerState): boolean {
  return (
    player.health <= 0 ||
    player.combatReadiness === CombatReadiness.INCAPACITATED
  );
}
