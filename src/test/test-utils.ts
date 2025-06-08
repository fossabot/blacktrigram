import { render, type RenderOptions } from "@testing-library/react";
import { Stage } from "@pixi/react";
import type { ReactElement } from "react";
import React from "react"; // Add React import for JSX
import type { AudioContextType } from "../types/audio";

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
  return render(React.createElement(Stage, {}, ui)); // Fix: Use React.createElement instead of JSX
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
  const mockAudioContext: AudioContextType = {
    playSFX: jest.fn(),
    playMusic: jest.fn(),
    stopMusic: jest.fn(),
    setMasterVolume: jest.fn(),
    setSFXVolume: jest.fn(),
    setMusicVolume: jest.fn(),
    isMuted: false,
    toggleMute: jest.fn(),
    currentTrack: null,
    isPlaying: false,
  };

  // Mock audio context provider
  return React.createElement(
    "div",
    { "data-testid": "mock-audio-provider" },
    children
  );
};
