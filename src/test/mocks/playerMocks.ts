/**
 * @fileoverview Mock player data for testing Korean martial arts game
 */

import { PlayerState } from "../../types/player";
import { PlayerArchetype, TrigramStance } from "../../types/enums";

/**
 * Creates a mock player with default values for testing
 */
export function createMockPlayer(overrides: Partial<PlayerState> = {}): PlayerState {
  return {
    id: "test-player",
    name: { korean: "테스트 플레이어", english: "Test Player" },
    archetype: PlayerArchetype.MUSA,
    currentStance: TrigramStance.GEON,
    health: 100,
    maxHealth: 100,
    ki: 100,
    maxKi: 100,
    stamina: 100,
    maxStamina: 100,
    balance: 100,
    consciousness: 100,
    pain: 0,
    isBlocking: false,
    isStunned: false,
    isCountering: false,
    statusEffects: [],
    experiencePoints: 0,
    hitsLanded: 0,
    hitsTaken: 0,
    totalDamageDealt: 0,
    totalDamageReceived: 0,
    lastStanceChangeTime: 0,
    position: { row: 3, col: 3 },
    ...overrides,
  };
}

/**
 * Creates a mock player with low resources for testing resource constraints
 */
export function createLowResourceMockPlayer(
  overrides: Partial<PlayerState> = {}
): PlayerState {
  return createMockPlayer({
    ki: 5,
    stamina: 10,
    health: 25,
    ...overrides,
  });
}

/**
 * Creates a high-level mock player for testing advanced scenarios
 */
export function createHighLevelMockPlayer(
  overrides: Partial<PlayerState> = {}
): PlayerState {
  return createMockPlayer({
    experiencePoints: 10000,
    health: 200,
    maxHealth: 200,
    ki: 150,
    maxKi: 150,
    stamina: 150,
    maxStamina: 150,
    ...overrides,
  });
}

/**
 * Creates a mock player with specific archetype
 */
export function createArchetypeMockPlayer(
  archetype: PlayerArchetype,
  overrides: Partial<PlayerState> = {}
): PlayerState {
  return createMockPlayer({
    archetype,
    name: {
      korean: getArchetypeName(archetype),
      english: archetype,
    },
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
    ...overrides,
  });
}

function getArchetypeName(archetype: PlayerArchetype): string {
  switch (archetype) {
    case PlayerArchetype.MUSA:
      return "무사";
    case PlayerArchetype.AMSALJA:
      return "암살자";
    case PlayerArchetype.HACKER:
      return "해커";
    case PlayerArchetype.JEONGBO_YOWON:
      return "정보요원";
    case PlayerArchetype.JOJIK_POKRYEOKBAE:
      return "조직폭력배";
    default:
      return "테스트";
  }
}

export default createMockPlayer;
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
