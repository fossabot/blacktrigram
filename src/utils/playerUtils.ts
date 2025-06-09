// Player utility functions for Korean martial arts game

import type {
  PlayerState,
  PlayerArchetype,
  KoreanText,
  Position,
  TrigramStance,
  CombatState,
} from "../types";
import {
  DEFAULT_PLAYER_NAME,
  PLAYER_ARCHETYPES_DATA,
  TRIGRAM_DATA,
} from "../types/constants";

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

/**
 * Creates a simple player state with basic values
 * Fix: Make stance parameter required with default value
 */
export function createPlayerStateSimple(
  id: string,
  name: string,
  archetype: PlayerArchetype,
  stance: TrigramStance = TrigramStance.GEON // Fix: Provide default value
): PlayerState {
  const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];

  return {
    id,
    name: { korean: name, english: name },
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
    currentStance: stance, // Fix: Use provided stance
    position: { x: 0, y: 0 },
    direction: "right",
    isAlive: true,
    isActive: true,
    wins: 0,
    losses: 0,
    stats: archetypeData.stats,
    techniques: [],
    effects: [],
    combo: 0,
    lastTechniqueUsed: null,
    stanceChangeTime: 0,
    lastActionTime: 0,
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

export function getArchetypeColor(archetype: PlayerArchetype): number {
  switch (archetype) {
    case "musa":
      return 0xffd700; // Gold
    case "amsalja":
      return 0x9400d3; // Dark violet
    case "hacker":
      return 0x00ffff; // Cyan
    case "jeongbo_yowon":
      return 0x4169e1; // Royal blue
    case "jojik_pokryeokbae":
      return 0xdc143c; // Crimson
    default:
      return 0xffffff; // White
  }
}

export function updatePlayerStats(
  player: PlayerState,
  updates: Partial<PlayerState>
): PlayerState {
  return {
    ...player,
    ...updates,
  };
}

export function isPlayerDefeated(player: PlayerState): boolean {
  return player.health <= 0 || player.consciousness <= 0;
}

export function calculateDamage(
  attacker: PlayerState,
  defender: PlayerState,
  baseDamage: number
): number {
  const attackPower = attacker.attackPower;
  const defense = defender.defensiveBonus;
  const damage = baseDamage * attackPower * (2 - defense);
  return Math.max(1, Math.floor(damage));
}

export function createDefaultPlayerState(
  archetype: PlayerArchetype,
  name?: KoreanText
): PlayerState {
  const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];

  return {
    id: `player_${Date.now()}`,
    name: name || DEFAULT_PLAYER_NAME,
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
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    facing: "right",
    currentStance: archetypeData.coreStance,
    combatState: CombatState.IDLE,
    // Fix: Add missing required props
    isBlocking: false,
    lastTechniqueUsed: null,
    statusEffects: [],
    speed: 100,
    lastActionTime: 0,
    recoveryTime: 500,
    momentum: 0,
    comboCount: 0,
    techniques: [],
    equipment: [],
    statusConditions: [],
  };
}

export function canPlayerAct(player: PlayerState): boolean {
  if (player.consciousness <= 0) return false;
  if (player.stamina <= 0) return false;
  if (player.combatState === CombatState.STUNNED) return false;
  if (player.combatState === CombatState.UNCONSCIOUS) return false;

  // Fix: Add null check for recoveryTime
  const recoveryTime = player.recoveryTime || 500;
  if (Date.now() - player.lastActionTime < recoveryTime) return false;

  return true;
}

// Fix: Add createCompletePlayerState for tests and game initialization
export const createCompletePlayerState = (
  id: string,
  name: KoreanText,
  archetype: PlayerArchetype,
  position: Position,
  overrides: Partial<PlayerState> = {}
): PlayerState => {
  const basePlayerData = PLAYER_ARCHETYPES_DATA[archetype];

  return {
    id,
    name,
    archetype,
    position,
    health: basePlayerData.baseHealth,
    maxHealth: basePlayerData.baseHealth,
    ki: basePlayerData.baseKi,
    maxKi: basePlayerData.baseKi,
    stamina: basePlayerData.baseStamina,
    maxStamina: basePlayerData.baseStamina,
    currentStance: basePlayerData.coreStance as TrigramStance,
    pain: 0,
    consciousness: 100,
    balance: 100,
    isBlocking: false,
    statusEffects: [],
    // Fix: Add missing properties with default values
    activeEffects: [],
    vitalPoints: [],
    combatModifiers: {
      damageMultiplier: 1.0,
      accuracyModifier: 1.0,
      speedModifier: 1.0,
      defenseMultiplier: 1.0,
    },
    momentum: 0,
    lastActionTime: 0,
    combo: 0,
    direction: id.includes("1") ? "right" : "left",
    grounded: true,
    invulnerable: false,
    combatState: {
      state: "idle",
      frameData: {
        startup: 0,
        active: 0,
        recovery: 0,
        currentFrame: 0,
      },
      hitboxActive: false,
      invulnerabilityFrames: 0,
    },
    // Apply any overrides
    ...overrides,
  };
};

// Update existing createPlayerFromArchetype to use complete state
export const createPlayerFromArchetype = (
  archetype: PlayerArchetype,
  playerName: string,
  position: Position
): PlayerState => {
  return createCompletePlayerState(
    `player_${Date.now()}`,
    { korean: playerName, english: playerName },
    archetype,
    position
  );
};
