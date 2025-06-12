// Test utilities for Black Trigram Korean martial arts game

import { render, RenderOptions } from "@testing-library/react";
import type { PlayerState } from "../types/player";
import { vi } from "vitest";
import React from "react";
import { PlayerArchetype, TrigramStance } from "@/types";
import { CombatState } from "@/types/enums";

// Mock audio manager interface
interface IAudioManager {
  playMusic(trackId: string): Promise<void>;
  playSoundEffect(id: string): Promise<void>;
  stopMusic(): void;
  setMasterVolume(volume: number): void;
  getMasterVolume(): number;
  initialized: boolean;
  isInitialized: boolean;
}

// Create mock audio manager
export function createMockAudioManager(): IAudioManager {
  return {
    playMusic: vi.fn().mockResolvedValue(undefined),
    playSoundEffect: vi.fn().mockResolvedValue(undefined),
    stopMusic: vi.fn(),
    setMasterVolume: vi.fn(),
    getMasterVolume: vi.fn().mockReturnValue(1.0),
    initialized: true,
    isInitialized: true,
  };
}

// Fix: Remove unused parameters to fix TypeScript warnings
export function renderWithPixi(
  ui: React.ReactElement,
  options?: RenderOptions
) {
  return render(ui, { ...options });
}

// Create mock player state
export function createMockPlayerState(): PlayerState {
  return {
    id: "test",
    name: { korean: "테스트", english: "Test" },
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
}

// Enhanced render function with proper options
export function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, {
    ...options,
  });
}

export { customRender as render };
export * from "@testing-library/react";
