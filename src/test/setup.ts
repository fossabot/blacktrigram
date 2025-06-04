// Test setup for Black Trigram Korean martial arts game

import { beforeEach, vi } from "vitest";
import "@testing-library/jest-dom";

// Mock PIXI.js for testing
beforeEach(() => {
  // Reset PIXI mocks before each test
  vi.clearAllMocks();
});

// Mock PIXI Application and related classes
const mockPixiApp = {
  renderer: {
    background: { color: 0x000000 },
    view: { style: {} },
  },
  stage: { addChild: vi.fn(), removeChild: vi.fn() },
  destroy: vi.fn(),
};

vi.mock("pixi.js", () => ({
  Application: vi.fn(() => mockPixiApp),
  Container: vi.fn(),
  Graphics: vi.fn(),
  Text: vi.fn(),
  TextStyle: vi.fn().mockImplementation((style) => style),
  Sprite: vi.fn(),
  Texture: vi.fn(),
}));

// Mock @pixi/react with proper React component mocks
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

// Mock Audio Context for testing
global.AudioContext = vi.fn(() => ({
  createOscillator: vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    frequency: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
  })),
  createGain: vi.fn(() => ({
    connect: vi.fn(),
    gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
  })),
  destination: {},
  currentTime: 0,
}));
