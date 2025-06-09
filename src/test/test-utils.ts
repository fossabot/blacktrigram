import { render, type RenderOptions } from "@testing-library/react";
import { Stage } from "@pixi/react";
import type { ReactElement } from "react";
import React from "react";
import type { AudioConfig } from "../types/audio";
import { vi } from "vitest";
import type { PlayerState } from "../types";
import { createPlayerFromArchetype } from "../utils/playerUtils";
import { PlayerArchetype } from "../types/enums";

// Custom render function for testing Korean martial arts components
export function renderKoreanMartialArtsComponent(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): ReturnType<typeof render> {
  return render(ui, {
    ...options,
  });
}

// Render function for PixiJS Stage components
export function renderInStage(ui: ReactElement): ReturnType<typeof render> {
  return render(React.createElement(Stage, {}, ui));
}

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

// Fix: Use proper AudioConfig structure
export const mockAudioConfig: AudioConfig = {
  enableSpatialAudio: false,
  maxSimultaneousSounds: 10,
  audioFormats: ["mp3", "ogg"],
  fadeTransitionTime: 1000,
  defaultVolume: 0.5,
  masterVolume: 1.0,
  musicVolume: 0.8,
  sfxVolume: 0.9,
};

// Create test player state
export function createTestPlayer(
  archetype: PlayerArchetype = PlayerArchetype.MUSA,
  playerIndex: number = 0
): PlayerState {
  return createPlayerFromArchetype(archetype, playerIndex);
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

// Test wrapper component
export function renderWithTestWrapper(component: React.ReactElement) {
  // Mock rendering setup for tests
  return component;
}

// Mock game state
export function createMockGameState() {
  return {
    mode: "versus" as any,
    phase: "combat" as any,
    players: [
      createTestPlayer(PlayerArchetype.MUSA, 0),
      createTestPlayer(PlayerArchetype.AMSALJA, 1),
    ] as const,
    currentRound: 1,
    maxRounds: 3,
    timeRemaining: 120,
    isPaused: false,
    matchStatistics: {
      totalDamageDealt: 0,
      totalDamageTaken: 0,
      criticalHits: 0,
      vitalPointHits: 0,
      techniquesUsed: 0,
      perfectStrikes: 0,
      consecutiveWins: 0,
      matchDuration: 0,
      totalMatches: 1,
      maxRounds: 3,
      winner: 0,
      totalRounds: 3,
      currentRound: 1,
      timeRemaining: 120,
      combatEvents: [],
      finalScore: { player1: 0, player2: 0 },
      roundsWon: { player1: 0, player2: 0 },
      player1: {
        wins: 0,
        losses: 0,
        hitsTaken: 0,
        hitsLanded: 0,
        totalDamageDealt: 0,
        totalDamageReceived: 0,
        techniques: [],
        perfectStrikes: 0,
        vitalPointHits: 0,
        consecutiveWins: 0,
        matchDuration: 0,
      },
      player2: {
        wins: 0,
        losses: 0,
        hitsTaken: 0,
        hitsLanded: 0,
        totalDamageDealt: 0,
        totalDamageReceived: 0,
        techniques: [],
        perfectStrikes: 0,
        vitalPointHits: 0,
        consecutiveWins: 0,
        matchDuration: 0,
      },
    },
  };
}
