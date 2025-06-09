// Player utility functions for Korean martial arts game

import type {
  PlayerState,
  PlayerArchetype,
  KoreanText,
  Position,
  TrigramStance,
  CombatState,
} from "../types";
import { PLAYER_ARCHETYPES_DATA, TRIGRAM_DATA } from "../types/constants";

// Export the player update function type
export type PlayerUpdateFunction = (
  playerIndex: number,
  updates: Partial<PlayerState>
) => void;

export function createPlayerState(
  name: KoreanText, // Fix: Accept KoreanText object instead of string
  archetype: PlayerArchetype,
  stance: TrigramStance,
  playerId: string,
  position: Position
): PlayerState {
  const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];
  const initialStance = stance || archetypeData.coreStance; // Use provided stance or default

  return {
    id: playerId,
    name,
    archetype,
    health: archetypeData.baseHealth,
    maxHealth: archetypeData.baseHealth,
    ki: archetypeData.baseKi,
    maxKi: archetypeData.baseKi,
    stamina: archetypeData.baseStamina,
    maxStamina: archetypeData.baseStamina,
    pain: 0,
    consciousness: 100,
    balance: 100,
    currentStance: initialStance,
    position: position, // Use provided position
    isGuarding: false,
    stunDuration: 0,
    comboCount: 0,
    lastActionTime: 0,
    bloodLoss: 0,
    currentTechnique: null,
    activeEffects: [],
    vitalPoints: {}, // Initialize as empty object
    defensiveBonus: 0,
    attackPower: archetypeData.stats.attackPower || 1.0,
    movementSpeed: archetypeData.stats.speed || 1.0,
    reactionTime: 1.0, // Default or derive from archetype
    focusLevel: 100, // Default or derive
    battleExperience: 0,
    injuredLimbs: [],
    statusConditions: [],
  };
}

// Add overload for backward compatibility with tests
export function createPlayerStateSimple(
  id: string,
  name: { korean: string; english: string },
  archetype: PlayerArchetype,
  stance: TrigramStance
): PlayerState {
  return createPlayerState(id, name, archetype, stance, { x: 0, y: 0 });
}

// Fix: Remove or correct executeTechnique if it exists
// export function executeTechnique(
//   attacker: PlayerState,
//   defender: PlayerState
// ): Promise<CombatResult> {
//   // Implementation using CombatSystem
//   return CombatSystem.executeAttack(attacker, defender, attacker.availableTechniques[0]);
// }

export function calculateArchetypeDamage(
  archetype: PlayerArchetype,
  baseDamage: number
): number {
  const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];
  const damageMultiplier = (archetypeData.stats.attackPower || 100) / 100;
  return Math.round(baseDamage * damageMultiplier);
}

export function isPlayerCapacitated(player: PlayerState): boolean {
  return player.health <= 0 || player.consciousness <= 0;
}

/**
 * Update player's vital point status
 */
export function updateVitalPoint(
  player: PlayerState,
  vitalPointId: string,
  damage: number
): PlayerState {
  const vitalPoint = player.vitalPoints[vitalPointId];
  if (!vitalPoint) return player;

  const updatedVitalPoint = {
    ...vitalPoint,
    damage: vitalPoint.damage + damage,
    status:
      vitalPoint.damage + damage > 50
        ? ("critical" as const)
        : vitalPoint.damage + damage > 20
        ? ("damaged" as const)
        : ("normal" as const),
    lastHit: Date.now(),
  };

  return {
    ...player,
    vitalPoints: {
      ...player.vitalPoints,
      [vitalPointId]: updatedVitalPoint,
    },
  };
}

/**
 * Check if player can perform action
 */
export function canPerformAction(
  player: PlayerState,
  actionStaminaCost: number = 10,
  actionKiCost: number = 0
): boolean {
  return (
    player.combatState !== "stunned" &&
    player.stamina >= actionStaminaCost &&
    player.ki >= actionKiCost &&
    player.consciousness > 0 &&
    Date.now() - player.lastActionTime > player.recoveryTime
  );
}

/**
 * Apply status effect to player
 */
export function applyStatusEffect(
  player: PlayerState,
  effect: {
    type: string;
    duration: number;
    intensity: number;
  }
): PlayerState {
  const newStatusEffect = {
    ...effect,
    startTime: Date.now(),
    endTime: Date.now() + effect.duration,
  };

  return {
    ...player,
    statusEffects: [...player.statusEffects, newStatusEffect],
  };
}

/**
 * Remove expired status effects
 */
export function updateStatusEffects(player: PlayerState): PlayerState {
  const currentTime = Date.now();
  const activeEffects = player.statusEffects.filter(
    (effect) => effect.endTime > currentTime
  );

  return {
    ...player,
    statusEffects: activeEffects,
  };
}
