import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import React, { type ReactElement } from "react";

// Mock extend spy for tracking calls - single declaration
export const extendSpy = vi.fn();

// Mock PixiJS components for testing
vi.mock("@pixi/react", async () => {
  return {
    extend: extendSpy,
    Application: ({ children, ...props }: any): ReactElement => {
      return React.createElement(
        "div",
        {
          "data-testid": "pixi-application",
          "data-width": props.width?.toString(),
          "data-height": props.height?.toString(),
          "data-background-color": props.backgroundColor?.toString(),
          "data-antialias": props.antialias?.toString(),
          ...props,
        },
        children
      );
    },
    Container: ({ children, ...props }: any): ReactElement => {
      return React.createElement(
        "div",
        {
          "data-testid": "pixi-container",
          ...props,
        },
        children
      );
    },
    Graphics: ({ draw, ...props }: any): ReactElement => {
      // Mock graphics drawing with comprehensive mock object
      if (draw) {
        const mockGraphics = {
          clear: vi.fn(),
          setFillStyle: vi.fn(),
          setStrokeStyle: vi.fn(),
          rect: vi.fn(),
          circle: vi.fn(),
          moveTo: vi.fn(),
          lineTo: vi.fn(),
          roundRect: vi.fn(),
          fill: vi.fn(),
          stroke: vi.fn(),
          closePath: vi.fn(),
        };
        try {
          draw(mockGraphics);
        } catch (error) {
          console.warn("Graphics draw function error:", error);
        }
      }

      return React.createElement("div", {
        "data-testid": "pixi-graphics",
        ...props,
      });
    },
    Text: ({ text, style, ...props }: any): ReactElement => {
      return React.createElement("div", {
        "data-testid": "pixi-text",
        "data-text": text,
        "data-font-family": style?.fontFamily,
        "data-font-size": style?.fontSize?.toString(),
        "data-fill": style?.fill?.toString(),
        ...props,
      });
    },
    useTick: vi.fn(),
  };
});

// Create comprehensive Howler mock with all required methods
const mockHowlInstance = {
  play: vi.fn().mockReturnValue(1),
  stop: vi.fn(),
  volume: vi.fn(),
  fade: vi.fn(),
  playing: vi.fn().mockReturnValue(false),
  unload: vi.fn(),
  rate: vi.fn(),
  seek: vi.fn(),
  duration: vi.fn().mockReturnValue(100),
  state: vi.fn().mockReturnValue("loaded"),
};

const mockHowlerGlobal = {
  volume: vi.fn(),
  mute: vi.fn(),
  stop: vi.fn(),
  codecs: vi.fn().mockReturnValue(true),
  state: vi.fn().mockReturnValue("loaded"),
  ctx: {
    createGain: vi.fn().mockReturnValue({
      connect: vi.fn(),
      disconnect: vi.fn(),
      gain: {
        value: 1,
        setValueAtTime: vi.fn(),
      },
    }),
    createGainNode: vi.fn().mockReturnValue({
      connect: vi.fn(),
      disconnect: vi.fn(),
      gain: {
        value: 1,
        setValueAtTime: vi.fn(),
      },
    }),
    destination: {},
    currentTime: 0,
  },
  masterGain: {
    connect: vi.fn(),
    gain: {
      value: 1,
      setValueAtTime: vi.fn(),
    },
  },
  usingWebAudio: false, // Disable WebAudio to avoid complex mocking
  _muted: false,
  _volume: 1,
};

// Mock Howler before any imports
vi.mock("howler", () => ({
  Howl: vi.fn().mockImplementation(() => mockHowlInstance),
  Howler: mockHowlerGlobal,
}));

// Mock AudioContext more thoroughly
const mockAudioContext = {
  createGain: vi.fn().mockReturnValue({
    connect: vi.fn(),
    disconnect: vi.fn(),
    gain: {
      value: 1,
      setValueAtTime: vi.fn(),
    },
  }),
  createGainNode: vi.fn().mockReturnValue({
    connect: vi.fn(),
    disconnect: vi.fn(),
    gain: {
      value: 1,
      setValueAtTime: vi.fn(),
    },
  }),
  createOscillator: vi.fn().mockReturnValue({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    frequency: { value: 440 },
  }),
  destination: {},
  state: "running",
  currentTime: 0,
  resume: vi.fn().mockResolvedValue(undefined),
  suspend: vi.fn().mockResolvedValue(undefined),
  close: vi.fn().mockResolvedValue(undefined),
};

// Override global constructors with proper typing
(globalThis as any).AudioContext = vi
  .fn()
  .mockImplementation(() => mockAudioContext);
Object.defineProperty(window, "webkitAudioContext", {
  writable: true,
  value: vi.fn().mockImplementation(() => mockAudioContext),
});

// Enhanced global test setup
beforeAll(() => {
  // Mock window dimensions for consistent testing
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: 1920,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: 1080,
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

afterAll(() => {
  // Global test cleanup
});

// Export commonly used test utilities
export const mockWindowResize = (width: number, height: number): void => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event("resize"));
};

export const mockKeyboardEvent = (
  key: string,
  type: "keydown" | "keyup" = "keydown"
): void => {
  const event = new KeyboardEvent(type, {
    key,
    code: `Key${key.toUpperCase()}`,
    bubbles: true,
  });
  document.dispatchEvent(event);
};
