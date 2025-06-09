/**
 * Player state utilities and helper functions
 */

import type {
  PlayerState,
  PlayerCreationData,
  StatusEffect,
  VitalPoint,
  Position,
  KoreanText,
} from "../types";
import { TrigramStance, PlayerArchetype, CombatState } from "../types/enums"; // Import as values
import {
  PLAYER_ARCHETYPES_DATA,
  DEFAULT_PLAYER_STATS,
} from "../types/constants";

/**
 * Creates a new player state from creation data
 */
export function createPlayerState(
  data: PlayerCreationData,
  playerIndex: number = 0
): PlayerState {
  const archetypeData = PLAYER_ARCHETYPES_DATA[data.archetype];
  const startingStance = data.preferredStance || archetypeData.coreStance;

  return {
    id: `player_${playerIndex}`,
    name: data.name,
    archetype: data.archetype,
    currentStance: startingStance,

    // Core stats from archetype
    health: archetypeData.baseHealth,
    maxHealth: archetypeData.baseHealth,
    ki: archetypeData.baseKi,
    maxKi: archetypeData.baseKi,
    stamina: archetypeData.baseStamina,
    maxStamina: archetypeData.baseStamina,
    energy: 100,
    maxEnergy: 100,

    // Combat stats from archetype
    attackPower: archetypeData.stats.attackPower,
    defense: archetypeData.stats.defense,
    speed: archetypeData.stats.speed,
    technique: archetypeData.stats.technique,

    // Physical state
    pain: 0,
    consciousness: 100,
    balance: 100,
    momentum: 0, // Fixed: number not Position

    // Combat state
    combatState: CombatState.IDLE,
    lastActionTime: 0,
    recoveryTime: 500,

    // Position
    position: {
      x: playerIndex === 0 ? 100 : 700,
      y: 400,
    },
    facing: playerIndex === 0 ? "right" : "left",

    // Status and effects
    statusEffects: [],
    vitalPoints: [], // Fixed: Initialize as empty array

    // Combat tracking
    comboCount: 0,
    lastTechniqueUsed: undefined,
    stanceChangeCount: 0,
    totalDamageDealt: 0,
    totalDamageReceived: 0,
  };
}

/**
 * Creates a mock player for testing
 */
export function createMockPlayer(
  stance: TrigramStance = TrigramStance.GEON, // Use enum value
  archetype: PlayerArchetype = PlayerArchetype.MUSA
): PlayerState {
  const mockName: KoreanText = {
    korean: "테스트",
    english: "Test Player",
    romanized: "Test",
  };

  return createPlayerState({
    name: mockName,
    archetype,
    preferredStance: stance,
  });
}

/**
 * Updates player state with partial data
 */
export function updatePlayerState(
  player: PlayerState,
  updates: Partial<PlayerState>
): PlayerState {
  return {
    ...player,
    ...updates,
  };
}

/**
 * Applies damage to a player
 */
export function applyDamage(
  player: PlayerState,
  damage: number,
  damageType?: string
): PlayerState {
  const actualDamage = Math.max(0, damage - player.defense * 0.1);
  const newHealth = Math.max(0, player.health - actualDamage);

  return updatePlayerState(player, {
    health: newHealth,
    totalDamageReceived: player.totalDamageReceived + actualDamage,
  });
}

/**
 * Checks if a vital point exists on the player
 */
export function hasVitalPoint(
  player: PlayerState,
  vitalPointId: string
): boolean {
  return player.vitalPoints.some((vp) => vp.id === vitalPointId);
}

/**
 * Gets a vital point by ID
 */
export function getVitalPoint(
  player: PlayerState,
  vitalPointId: string
): VitalPoint | null {
  return player.vitalPoints.find((vp) => vp.id === vitalPointId) || null;
}

/**
 * Checks if player can perform an action
 */
export function canPerformAction(player: PlayerState): boolean {
  // Can't act if unconscious or stunned
  if (player.combatState === CombatState.STUNNED) return false;
  if (player.combatState === CombatState.UNCONSCIOUS) return false;

  // Check recovery time
  const recoveryTime = player.recoveryTime || 500;
  if (Date.now() - player.lastActionTime < recoveryTime) return false;

  return true;
}

/**
 * Adds a status effect to a player
 */
export function addStatusEffect(
  player: PlayerState,
  effectType: string,
  duration: number = 3000,
  intensity: number = 1
): PlayerState {
  const newStatusEffect: StatusEffect = {
    id: `${effectType}_${Date.now()}`,
    type: effectType as any, // Type assertion for compatibility
    intensity: intensity as any,
    duration,
    description: {
      korean: effectType,
      english: effectType,
      romanized: effectType,
    },
    stackable: false,
    source: "combat",
    startTime: Date.now(),
    endTime: Date.now() + duration,
  };

  return updatePlayerState(player, {
    statusEffects: [...player.statusEffects, newStatusEffect],
  });
}

/**
 * Removes expired status effects
 */
export function removeExpiredStatusEffects(player: PlayerState): PlayerState {
  const currentTime = Date.now();
  const activeEffects = player.statusEffects.filter(
    (effect) => effect.endTime > currentTime
  );

  return updatePlayerState(player, {
    statusEffects: activeEffects,
  });
}

/**
 * Calculates damage between attacker and defender
 */
export function calculateDamage(
  attacker: PlayerState,
  defender: PlayerState,
  baseDamage: number = 20
): number {
  const attackPower = attacker.attackPower || 50;
  const defense = defender.defense || 50;

  const rawDamage = baseDamage + attackPower * 0.2;
  const damageReduction = defense * 0.1;

  return Math.max(1, rawDamage - damageReduction);
}

/**
 * Creates a default player state for initialization
 */
export function createDefaultPlayerState(playerIndex: number = 0): PlayerState {
  return {
    id: `player_${playerIndex}`,
    name: {
      korean: "플레이어",
      english: "Player",
      romanized: "Player",
    },
    archetype: PlayerArchetype.MUSA,
    currentStance: TrigramStance.GEON,

    ...DEFAULT_PLAYER_STATS,

    // Combat state
    combatState: CombatState.IDLE,

    // Position
    position: { x: playerIndex === 0 ? 100 : 700, y: 400 },
    facing: playerIndex === 0 ? "right" : "left",

    // Collections
    statusEffects: [],
    vitalPoints: [],

    // Combat tracking
    comboCount: 0,
    lastTechniqueUsed: undefined,
    stanceChangeCount: 0,
    totalDamageDealt: 0,
    totalDamageReceived: 0,
  };
}

/**
 * Checks if a player can move
 */
export function canMove(player: PlayerState): boolean {
  if (player.combatState === CombatState.STUNNED) return false;
  if (player.combatState === CombatState.UNCONSCIOUS) return false;

  const recoveryTime = player.recoveryTime || 500;
  if (Date.now() - player.lastActionTime < recoveryTime) return false;

  return player.stamina > 0;
}

/**
 * Updates player position
 */
export function updatePlayerPosition(
  player: PlayerState,
  newPosition: Position
): PlayerState {
  return updatePlayerState(player, {
    position: newPosition,
  });
}

/**
 * Simple player creation function (alias for createPlayerState)
 */
export function createPlayerStateSimple(
  data: PlayerCreationData,
  playerIndex: number = 0
): PlayerState {
  return createPlayerState(data, playerIndex);
}

/**
 * Create player from archetype - standardized to 2 parameters
 */
// Fix: Simplify function signature to only accept archetype and optional playerIndex
export function createPlayerFromArchetype(
  archetype: PlayerArchetype,
  playerIndex: number = 0
): PlayerState {
  const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];

  const playerName: KoreanText = {
    korean: `플레이어 ${playerIndex + 1}`,
    english: `Player ${playerIndex + 1}`,
    romanized: `Player ${playerIndex + 1}`,
  };

  const player = createPlayerState(
    {
      name: playerName,
      archetype,
    },
    playerIndex
  );

  return {
    ...player,
    position: {
      x: playerIndex === 0 ? 100 : 700,
      y: 400,
    },
  };
}
