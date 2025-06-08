// Player utility functions for Korean martial arts game

import type {
  PlayerState,
  PlayerArchetype,
  KoreanText,
  Position,
  TrigramStance,
  CombatState,
  StatusEffect,
  KoreanTechnique,
  VitalPoint,
} from "../types";
import { PLAYER_ARCHETYPES_DATA, TRIGRAM_DATA } from "../types/constants";

// Export the player update function type
export type PlayerUpdateFunction = (
  playerIndex: number,
  updates: Partial<PlayerState>
) => void;

export function createPlayerState(
  name: KoreanText,
  archetype: PlayerArchetype,
  stance: KoreanText,
  id: string
): PlayerState {
  const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];

  return {
    id,
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
    currentStance: stance.english.toLowerCase() as TrigramStance, // Convert to stance enum
    position: position,
    combatState: "ready" as CombatState,
    isBlocking: false,
    isCountering: false,
    isStunned: false,
    lastActionTime: 0,
    lastStanceChangeTime: 0,
    statusEffects: [],
    vitalPoints: undefined,
    availableTechniques: [
      TRIGRAM_DATA[archetypeData.coreStance]?.technique,
    ].filter(Boolean) as KoreanTechnique[],
    skills: {
      striking: 50,
      grappling: 50,
      defense: 50,
      mobility: 50,
      focus: 50,
      endurance: 50,
    },
    combo: {
      count: 0,
      multiplier: 1.0,
      lastTechniqueTime: 0,
    },
  };
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
