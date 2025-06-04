import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { vi } from "vitest";

// Mock graphics context for testing
export const mockGraphicsContext = {
  clear: vi.fn(),
  beginFill: vi.fn(),
  endFill: vi.fn(),
  drawRect: vi.fn(),
  drawCircle: vi.fn(),
  lineStyle: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
};

// Mock audio context
export const mockAudio = {
  playSFX: vi.fn(),
  playAttackSound: vi.fn(),
  playHitSound: vi.fn(),
  playMenuSound: vi.fn(),
  setVolume: vi.fn(),
  getIsInitialized: vi.fn(() => true),
};

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
  return render(ui);
}

// Test utilities for Korean martial arts game testing
export const testUtils = {
  mockGraphicsContext,
  mockAudio,
  renderKoreanMartialArtsComponent,
  renderInStage,
};

export * from "@testing-library/react";
