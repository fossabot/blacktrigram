/**
 * @fileoverview Mock player data for testing Korean martial arts game
 */

import type { PlayerState } from "../../types/player";
import { PlayerArchetype, TrigramStance, CombatState } from "../../types/enums";

/**
 * Create a mock player for testing with sensible defaults
 */
export function createMockPlayer(
  overrides: Partial<PlayerState> = {}
): PlayerState {
  const defaultPlayer: PlayerState = {
    id: "mock-player",
    name: { korean: "테스트 플레이어", english: "Test Player" },
    archetype: PlayerArchetype.MUSA,
    health: 100,
    maxHealth: 100,
    ki: 100,
    maxKi: 100,
    stamina: 100,
    maxStamina: 100,
    energy: 100,
    maxEnergy: 100,
    attackPower: 75,
    defense: 75,
    speed: 75,
    technique: 75,
    pain: 0,
    consciousness: 100,
    balance: 100,
    momentum: 0,
    currentStance: TrigramStance.GEON,
    combatState: CombatState.IDLE,
    position: { x: 0, y: 0 },
    isBlocking: false,
    isStunned: false,
    isCountering: false,
    lastActionTime: 0,
    recoveryTime: 0,
    lastStanceChangeTime: 0,
    statusEffects: [],
    activeEffects: [],
    vitalPoints: [],
    totalDamageReceived: 0,
    totalDamageDealt: 0,
    hitsTaken: 0,
    hitsLanded: 0,
    perfectStrikes: 0,
    vitalPointHits: 0,
    experiencePoints: 0,
  };

  return { ...defaultPlayer, ...overrides };
}

/**
 * Create a pair of mock players for combat testing
 */
export function createMockPlayerPair(): [PlayerState, PlayerState] {
  const player1 = createMockPlayer({
    id: "player1",
    name: { korean: "플레이어1", english: "Player 1" },
    archetype: PlayerArchetype.MUSA,
    currentStance: TrigramStance.GEON,
    position: { x: 100, y: 300 },
  });

  const player2 = createMockPlayer({
    id: "player2",
    name: { korean: "플레이어2", english: "Player 2" },
    archetype: PlayerArchetype.AMSALJA,
    currentStance: TrigramStance.SON,
    position: { x: 700, y: 300 },
  });

  return [player1, player2];
}

/**
 * Create a damaged player for testing victory conditions
 */
export function createDamagedPlayer(healthPercent: number = 0.5): PlayerState {
  return createMockPlayer({
    health: Math.floor(100 * healthPercent),
    consciousness: Math.floor(100 * healthPercent),
    stamina: Math.floor(100 * healthPercent),
  });
}

/**
 * Create a player with specific archetype for testing
 */
export function createArchetypePlayer(archetype: PlayerArchetype): PlayerState {
  const archetypeStances = {
    [PlayerArchetype.MUSA]: TrigramStance.GEON,
    [PlayerArchetype.AMSALJA]: TrigramStance.SON,
    [PlayerArchetype.HACKER]: TrigramStance.LI,
    [PlayerArchetype.JEONGBO_YOWON]: TrigramStance.TAE,
    [PlayerArchetype.JOJIK_POKRYEOKBAE]: TrigramStance.JIN,
  };

  return createMockPlayer({
    archetype,
    currentStance: archetypeStances[archetype],
  });
}

/**
 * Creates a mock player with specific archetype
 */
export function createMockPlayerByArchetype(
  archetype: PlayerArchetype,
  overrides: Partial<PlayerState> = {}
): PlayerState {
  const archetypeData = {
    [PlayerArchetype.MUSA]: {
      name: { korean: "무사", english: "Warrior" },
      health: 120,
      maxHealth: 120,
      ki: 80,
      maxKi: 80,
    },
    [PlayerArchetype.AMSALJA]: {
      name: { korean: "암살자", english: "Assassin" },
      health: 80,
      maxHealth: 80,
      ki: 120,
      maxKi: 120,
    },
    [PlayerArchetype.HACKER]: {
      name: { korean: "해커", english: "Hacker" },
      health: 90,
      maxHealth: 90,
      ki: 110,
      maxKi: 110,
    },
    [PlayerArchetype.JEONGBO_YOWON]: {
      name: { korean: "정보요원", english: "Intelligence Operative" },
      health: 100,
      maxHealth: 100,
      ki: 100,
      maxKi: 100,
    },
    [PlayerArchetype.JOJIK_POKRYEOKBAE]: {
      name: { korean: "조직폭력배", english: "Organized Crime" },
      health: 110,
      maxHealth: 110,
      ki: 90,
      maxKi: 90,
    },
  };

  return createMockPlayer({
    archetype,
    ...archetypeData[archetype],
    ...overrides,
  });
}

/**
 * Creates a wounded mock player for testing combat scenarios
 */
export function createWoundedMockPlayer(
  overrides: Partial<PlayerState> = {}
): PlayerState {
  return createMockPlayer({
    health: 30,
    consciousness: 70,
    pain: 40,
    statusEffects: [
      {
        id: "test-bleed",
        type: "bleed",
        intensity: "medium" as any,
        duration: 5000,
        description: { korean: "출혈", english: "Bleeding" },
        stackable: true,
        source: "test-attack",
        startTime: Date.now(),
        endTime: Date.now() + 5000,
      },
    ],
    ...overrides,
  });
}

/**
 * Creates a defeated mock player for testing victory conditions
 */
export function createDefeatedMockPlayer(
  overrides: Partial<PlayerState> = {}
): PlayerState {
  return createMockPlayer({
    health: 0,
    consciousness: 0,
    isStunned: true,
    ...overrides,
  });
}

export default createMockPlayer;
