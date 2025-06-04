// Test setup for Black Trigram Korean martial arts game

import { beforeEach, vi } from "vitest";

// Mock @pixi/react for Korean martial arts testing
vi.mock("@pixi/react", () => ({
  Stage: vi.fn(({ children, ...props }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "pixi-stage", ...props },
      children
    );
  }),
  Container: vi.fn(({ children, ...props }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "pixi-container", ...props },
      children
    );
  }),
  Graphics: vi.fn(({ children, ...props }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "pixi-graphics", ...props },
      children
    );
  }),
  Text: vi.fn(({ children, text, ...props }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "pixi-text", ...props },
      text || children
    );
  }),
}));

// Mock react-error-boundary for Korean martial arts error handling
vi.mock("react-error-boundary", () => ({
  ErrorBoundary: vi.fn(({ children }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "error-boundary" },
      children
    );
  }),
}));

// Proper AudioContext mock for Korean martial arts audio
class MockAudioContext {
  createOscillator() {
    return {
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      frequency: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
    };
  }

  createGain() {
    return {
      connect: vi.fn(),
      gain: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
      },
    };
  }

  get destination() {
    return {};
  }

  get currentTime() {
    return 0;
  }
}

// Set up global AudioContext mock for Korean martial arts
global.AudioContext = vi.fn(() => new MockAudioContext()) as any;
(global as any).webkitAudioContext = global.AudioContext;

beforeEach(() => {
  // Reset all mocks before each Korean martial arts test
  vi.clearAllMocks();
});
