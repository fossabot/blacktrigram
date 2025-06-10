import React from "react";
import { Application } from "@pixi/react";
import { render, RenderOptions } from "@testing-library/react";
// Fix: Import missing types
import type { AudioConfig } from "../types/audio";
import type { PlayerState } from "../types/player";
import { PlayerArchetype } from "../types/enums";
import { createPlayerFromArchetype } from "../utils/playerUtils";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  pixiProps?: any;
}

function customRender(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) {
  const { pixiProps = {}, ...renderOptions } = options;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(
      Application,
      { width: 800, height: 600, ...pixiProps },
      children
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Fix: Export proper mock config
export const mockAudioConfig: AudioConfig = {
  enableSpatialAudio: false,
  maxSimultaneousSounds: 16,
  audioFormats: ["audio/mp3", "audio/wav"],
  fadeTransitionTime: 1000,
  defaultVolume: 0.7,
};

// Fix: Create test player function
export function createTestPlayer(
  archetype: PlayerArchetype = PlayerArchetype.MUSA,
  playerIndex: number = 0
): PlayerState {
  return createPlayerFromArchetype(archetype, playerIndex);
}

// Fix: Mock match statistics
export const mockMatchStatistics = {
  totalDamageDealt: 100,
  totalDamageTaken: 50,
  criticalHits: 2,
  vitalPointHits: 1,
  techniquesUsed: 5,
  perfectStrikes: 1,
  consecutiveWins: 1,
  matchDuration: 120,
  totalMatches: 1,
  maxRounds: 3,
  winner: 0,
  totalRounds: 2,
  currentRound: 2,
  timeRemaining: 0,
  combatEvents: [],
  finalScore: { player1: 2, player2: 0 },
  roundsWon: { player1: 2, player2: 0 },
  player1: {
    wins: 1,
    losses: 0,
    hitsTaken: 3,
    hitsLanded: 5,
    totalDamageDealt: 100,
    totalDamageReceived: 50,
    techniques: ["천둥벽력"],
    perfectStrikes: 1,
    vitalPointHits: 1,
    consecutiveWins: 1,
    matchDuration: 120,
  },
  player2: {
    wins: 0,
    losses: 1,
    hitsTaken: 5,
    hitsLanded: 3,
    totalDamageDealt: 50,
    totalDamageReceived: 100,
    techniques: ["유수연타"],
    perfectStrikes: 0,
    vitalPointHits: 0,
    consecutiveWins: 0,
    matchDuration: 120,
  },
};

// Fix: Mock game state
export const mockGameState = {
  players: [
    createTestPlayer(PlayerArchetype.MUSA, 0),
    createTestPlayer(PlayerArchetype.AMSALJA, 1),
  ] as const,
  timeRemaining: 180,
  currentRound: 1,
  maxRounds: 3,
  isPaused: false,
};

export * from "@testing-library/react";
export { customRender as render };

// Test utilities for Korean martial arts game testing
export const TEST_CONSTANTS = {
  MOCK_CANVAS_WIDTH: 800,
  MOCK_CANVAS_HEIGHT: 600,
  MOCK_PLAYER_ID: "test-player",
} as const;

// Mock player state factory
export function createMockPlayerState(overrides?: Partial<any>) {
  return {
    id: TEST_CONSTANTS.MOCK_PLAYER_ID,
    name: { korean: "테스트", english: "Test" },
    health: 100,
    maxHealth: 100,
    currentStance: "geon",
    position: { x: 0, y: 0 },
    ...overrides,
  };
}

// Mock Audio Provider for testing
export const MockAudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Mock audio context provider without the invalid properties
  return React.createElement(
    "div",
    { "data-testid": "mock-audio-provider" },
    children
  );
};

// Mock PIXI.js for testing
export const mockPixiApp = {
  stage: {
    addChild: vi.fn(),
    removeChild: vi.fn(),
    children: [],
  },
  renderer: {
    width: 800,
    height: 600,
    render: vi.fn(),
  },
  ticker: {
    add: vi.fn(),
    remove: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  },
  destroy: vi.fn(),
};

// Mock PIXI components
export const mockPixiContainer = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  addChild: vi.fn(),
  removeChild: vi.fn(),
  children: [],
  visible: true,
  alpha: 1,
};

// Test wrapper component
export function renderWithTestWrapper(component: React.ReactElement) {
  // Mock rendering setup for tests
  return component;
}

// Mock combat result
export function createMockCombatResult() {
  return {
    hit: true,
    damage: 25,
    criticalHit: false,
    vitalPointHit: false,
    effects: [],
    timestamp: Date.now(),
  };
}

// Mock Korean technique
export function createMockTechnique() {
  return {
    id: "test_technique",
    name: { korean: "테스트 기술", english: "Test Technique" },
    koreanName: "테스트 기술",
    englishName: "Test Technique",
    romanized: "teseuteu gisul",
    description: { korean: "테스트용 기술", english: "Test technique" },
    stance: "geon" as any,
    type: "strike" as any,
    damageType: "blunt" as any,
    damage: 15,
    range: 1.0,
    kiCost: 5,
    staminaCost: 10,
    accuracy: 0.85,
    executionTime: 300,
    recoveryTime: 500,
    critChance: 0.1,
    critMultiplier: 1.5,
    effects: [],
  };
}
