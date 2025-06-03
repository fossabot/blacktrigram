// Player utility functions for Korean martial arts game

import type {
  PlayerState,
  PlayerArchetype,
  TrigramStance,
  CombatState,
  CombatCondition,
  DamageType,
  EffectIntensity,
  EffectType,
  Position,
  StatusEffect,
} from "../types";
import { PLAYER_ARCHETYPES } from "../types/constants";
import { CombatReadiness } from "../types/enums"; // Import as value, not type

/**
 * Creates a new player state with Korean martial arts defaults
 */
export function createPlayerState(
  name: string,
  archetype: PlayerArchetype,
  stance: TrigramStance,
  overrides: Partial<PlayerState> = {}
): PlayerState {
  const basePosition: Position = { x: 400, y: 300 };

  return {
    id: `${name.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`,
    name,
    archetype,
    position: basePosition,
    stance,
    facing: "right",

    // Health and stamina
    health: 100,
    maxHealth: 100,
    ki: 100,
    maxKi: 100,
    stamina: 100,
    maxStamina: 100,

    // Combat state
    consciousness: 100,
    pain: 0,
    balance: 100,
    bloodLoss: 0,
    lastStanceChangeTime: Date.now(),
    isAttacking: false,
    combatReadiness: 100,
    activeEffects: [],
    combatState: "ready",
    conditions: [],

    // Apply any overrides
    ...overrides,
  };
}

/**
 * Initialize both players for combat
 */
export function initializePlayers(): readonly [PlayerState, PlayerState] {
  return [
    createPlayerState("player1", "musa", "geon"),
    createPlayerState("player2", "amsalja", "tae"),
  ] as const;
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
    combatReadiness: calculateCombatReadiness(newHealth),
  };
}

// Calculate combat readiness based on health percentage
function calculateCombatReadiness(health: number): CombatReadiness {
  if (health <= 0) return CombatReadiness.INCAPACITATED;
  if (health <= 20) return CombatReadiness.CRITICAL_DAMAGE;
  if (health <= 40) return CombatReadiness.HEAVY_DAMAGE;
  if (health <= 60) return CombatReadiness.MODERATE_DAMAGE;
  if (health <= 80) return CombatReadiness.LIGHT_DAMAGE;
  return CombatReadiness.READY;
}

/**
 * Updates player health and adjusts combat state accordingly
 * Includes Korean martial arts realism with consciousness and pain effects
 */
export function updatePlayerHealth(
  player: PlayerState,
  damage: number,
  damageType: DamageType = "blunt"
): PlayerState {
  // Calculate effective damage based on archetype resistance
  const archetypeData = PLAYER_ARCHETYPES[player.archetype];
  const resistance = archetypeData?.bonuses?.damageResistance || 1.0;
  const effectiveDamage = Math.max(0, damage / resistance);

  // Apply damage with minimum health of 0
  const newHealth = Math.max(0, player.health - effectiveDamage);

  // Calculate new pain level (increases with damage taken)
  const painIncrease = effectiveDamage * 0.5;
  const newPain = Math.min(100, player.pain + painIncrease);

  // Calculate consciousness impact
  const consciousnessLoss = effectiveDamage * 0.3;
  const newConsciousness = Math.max(
    0,
    player.consciousness - consciousnessLoss
  );

  // Calculate blood loss for severe damage
  const bloodLossIncrease = effectiveDamage > 25 ? effectiveDamage * 0.2 : 0;
  const newBloodLoss = Math.min(100, player.bloodLoss + bloodLossIncrease);

  return {
    ...player,
    health: newHealth,
    pain: newPain,
    consciousness: newConsciousness,
    bloodLoss: newBloodLoss,
    combatReadiness: calculateCombatReadiness(newHealth), // Now returns correct enum value
  };
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
  actionType: string
): boolean {
  // Check basic incapacitation
  if (player.health <= 0 || player.consciousness <= 0) {
    return false;
  }

  // Check specific action requirements
  switch (actionType) {
    case "attack":
      return player.stamina >= 10 && player.combatState !== "incapacitated";
    case "stance_change":
      return player.ki >= 5 && player.combatState !== "stunned";
    case "block":
      return player.stamina >= 5;
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
 * Checks if the player is incapacitated
 */
export function isPlayerIncapacitated(player: PlayerState): boolean {
  return (
    player.health <= 0 ||
    player.consciousness <= 0 ||
    player.combatReadiness === CombatReadiness.INCAPACITATED
  );
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
