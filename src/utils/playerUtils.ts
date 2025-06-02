// Player utility functions for Korean martial arts game

import {
  type PlayerState,
  type TrigramStance,
  type Position,
  type StatusEffect, // Will now resolve to effects.ts#StatusEffect via index.ts
  CombatReadiness, // Import as value
  type EffectIntensity, // Import as type from enums via index.ts
  type CombatState, // Import CombatState type from enums via index.ts
  type StatusEffectType, // Import StatusEffectType from enums via index.ts
  type CombatCondition, // Import CombatCondition from common.ts via index.ts
} from "../types";

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
    archetype: "musa",
    position,
    stance,
    facing: position.x < 400 ? "right" : "left",
    health: 100,
    maxHealth: 100,
    ki: 50,
    maxKi: 100,
    stamina: 100,
    maxStamina: 100,
    consciousness: 100,
    pain: 0,
    balance: 100,
    bloodLoss: 0,
    lastStanceChangeTime: Date.now(),
    isAttacking: false,
    combatReadiness: CombatReadiness.READY,
    activeEffects: [],
    combatState: "ready" as CombatState, // Initialize new property
    conditions: [], // Initialize new property
    ...overrides,
  };
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
        ? CombatReadiness.MODERATE
        : newHealth > 20
        ? CombatReadiness.HEAVY
        : newHealth > 0
        ? CombatReadiness.CRITICAL
        : CombatReadiness.INCAPACITATED,
  };
}

/**
 * Updates player health and adjusts combat state accordingly
 */
export function updatePlayerHealth(
  player: PlayerState,
  healthChange: number
): PlayerState {
  const newHealth = Math.max(
    0,
    Math.min(player.maxHealth, player.health + healthChange)
  );

  const newCombatState: CombatState = // Use CombatState type
    newHealth <= 0
      ? "helpless"
      : newHealth <= 20
      ? "helpless" // Consider a "critical" or "downed" state if distinct from helpless
      : newHealth <= 40
      ? "shaken"
      : "ready";

  return {
    ...player,
    health: newHealth,
    combatState: newCombatState, // Property now exists
  };
}

/**
 * Adds a combat condition to the player
 */
export function addCombatCondition(
  player: PlayerState,
  type: StatusEffectType, // Changed parameter type
  duration: number,
  intensity: EffectIntensity, // Use EffectIntensity type
  source: string
): PlayerState {
  const newCondition: CombatCondition = {
    // Explicitly type newCondition
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
  // Check if helpless
  if (player.combatState === "helpless") {
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
