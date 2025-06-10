// Test setup for Black Trigram Korean martial arts game

import { beforeEach, vi } from "vitest";

// Mock @pixi/react for Korean martial arts testing
vi.mock("@pixi/react", () => ({
  Application: vi.fn(({ children, ...props }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "pixi-application", ...props },
      children
    );
  }),
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
  Sprite: vi.fn(({ children, ...props }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "pixi-sprite", ...props },
      children
    );
  }),
  extend: vi.fn(),
  useApplication: vi.fn(() => ({
    app: {
      stage: {},
      renderer: { width: 1200, height: 800 },
      ticker: { add: vi.fn(), remove: vi.fn() },
    },
  })),
  useTick: vi.fn(),
}));

// Mock PIXI.js globals
vi.mock("pixi.js", () => ({
  Application: vi.fn(),
  Container: vi.fn(),
  Graphics: vi.fn(),
  Text: vi.fn(),
  TextStyle: vi.fn(),
  Sprite: vi.fn(),
  Texture: {
    from: vi.fn(() => ({})),
    EMPTY: {},
  },
  Assets: {
    load: vi.fn(() => Promise.resolve({})),
  },
}));

// Mock audio context for Korean martial arts audio
Object.defineProperty(window, "AudioContext", {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    createGain: vi.fn(() => ({
      gain: { value: 1 },
      connect: vi.fn(),
    })),
    createOscillator: vi.fn(() => ({
      frequency: { value: 440 },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    })),
    destination: {},
    state: "running",
    resume: vi.fn(() => Promise.resolve()),
  })),
});

// Mock Korean text rendering
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock canvas for PixiJS
(HTMLCanvasElement.prototype as any).getContext = vi.fn((contextId: string) => {
  if (contextId === "2d") {
    // Fix: Create proper mock with correct types
    const mockContext: Partial<CanvasRenderingContext2D> = {
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      getImageData: vi.fn(() => ({
        data: new Uint8ClampedArray(4),
        width: 1,
        height: 1,
        colorSpace: "srgb" as PredefinedColorSpace,
      })),
      putImageData: vi.fn(),
      // Fix: Correct createImageData method signature to match Canvas API
      createImageData: vi.fn(
        (swOrImagedata: number | ImageData, sh?: number) => {
          if (typeof swOrImagedata === "number" && typeof sh === "number") {
            // createImageData(width, height)
            return {
              data: new Uint8ClampedArray(swOrImagedata * sh * 4),
              width: swOrImagedata,
              height: sh,
              colorSpace: "srgb" as PredefinedColorSpace,
            };
          } else if (swOrImagedata && typeof swOrImagedata === "object") {
            // createImageData(imagedata)
            const imageData = swOrImagedata as ImageData;
            return {
              data: new Uint8ClampedArray(
                imageData.width * imageData.height * 4
              ),
              width: imageData.width,
              height: imageData.height,
              colorSpace: "srgb" as PredefinedColorSpace,
            };
          }
          // Fallback
          return {
            data: new Uint8ClampedArray(4),
            width: 1,
            height: 1,
            colorSpace: "srgb" as PredefinedColorSpace,
          };
        }
      ),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      stroke: vi.fn(),
      fill: vi.fn(),
      // Add missing CanvasRenderingContext2D properties with proper types
      canvas: {} as HTMLCanvasElement,
      globalAlpha: 1,
      globalCompositeOperation: "source-over" as GlobalCompositeOperation,
      // Add additional required properties for complete mock
      fillStyle: "#000000",
      strokeStyle: "#000000",
      lineWidth: 1,
      lineCap: "butt" as CanvasLineCap,
      lineJoin: "miter" as CanvasLineJoin,
      miterLimit: 10,
      lineDashOffset: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      shadowColor: "rgba(0, 0, 0, 0)",
      font: "10px sans-serif",
      textAlign: "start" as CanvasTextAlign,
      textBaseline: "alphabetic" as CanvasTextBaseline,
      direction: "inherit" as CanvasDirection,
      imageSmoothingEnabled: true,
    };

    return mockContext;
  }
  return null;
});

// Set up global test environment
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks();

  // Reset global state for Korean martial arts game
  (global as any).requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
    setTimeout(cb, 16);
    return 1; // Return a number as expected
  });
  global.cancelAnimationFrame = vi.fn();
});

// Mock Korean fonts for testing
Object.defineProperty(document, "fonts", {
  value: {
    ready: Promise.resolve(),
    load: vi.fn(() => Promise.resolve()),
    check: vi.fn(() => true),
  },
});

// Mock Web Audio API for Korean martial arts sound effects
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  })
) as any;

// Mock AudioManager for Korean martial arts audio system
vi.mock("../audio/AudioManager", () => {
  const mockAudioManager = {
    getState: vi.fn(() => ({
      masterVolume: 1.0,
      sfxVolume: 1.0,
      musicVolume: 1.0,
      muted: false,
      currentMusicTrack: null,
      isInitialized: true,
    })),
    setVolume: vi.fn(),
    setMasterVolume: vi.fn().mockImplementation((volume) => {
      mockAudioManager.getState = vi.fn(() => ({
        masterVolume: volume,
        sfxVolume: 1.0,
        musicVolume: 1.0,
        muted: false,
        currentMusicTrack: null,
        isInitialized: true,
      }));
    }),
    setSfxVolume: vi.fn(),
    setMusicVolume: vi.fn(),
    mute: vi.fn(),
    unmute: vi.fn(),
    toggleMute: vi.fn().mockImplementation(() => {
      const currentState = mockAudioManager.getState();
      mockAudioManager.getState = vi.fn(() => ({
        ...currentState,
        muted: !currentState.muted,
      }));
    }),
    initialize: vi.fn(), // Remove parameter
    playSFX: vi.fn(),
    playSoundEffect: vi.fn(), // Add missing method
    playMusic: vi.fn(),
    stopMusic: vi.fn(),
    stopAllSounds: vi.fn(),
    playAttackSound: vi.fn(),
    playHitSound: vi.fn(),
    playTechniqueSound: vi.fn(),
    playStanceChangeSound: vi.fn(),
    playVitalPointHit: vi.fn(),
    playEnvironmentalSound: vi.fn(),
    loadAudioAsset: vi.fn(), // Add missing method
  };

  return {
    AudioManager: vi.fn(() => mockAudioManager),
    audioManager: mockAudioManager,
    useAudio: vi.fn(() => mockAudioManager),
  };
});

// Mock AudioProvider
vi.mock("../audio/AudioProvider", () => ({
  AudioProvider: vi.fn(({ children }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "audio-provider" },
      children
    );
  }),
  useAudio: vi.fn(() => ({
    getState: vi.fn(() => ({
      masterVolume: 1.0,
      sfxVolume: 1.0,
      musicVolume: 1.0,
      muted: false,
      currentMusicTrack: null,
      isInitialized: true,
    })),
    setVolume: vi.fn(),
    setMasterVolume: vi.fn(),
    setSfxVolume: vi.fn(),
    setMusicVolume: vi.fn(),
    mute: vi.fn(),
    unmute: vi.fn(),
    initialize: vi.fn(),
    playSFX: vi.fn(),
    playMusic: vi.fn(),
    stopMusic: vi.fn(),
    stopAllSounds: vi.fn(),
    playAttackSound: vi.fn(),
    playHitSound: vi.fn(),
    playTechniqueSound: vi.fn(),
    playStanceChangeSound: vi.fn(),
    playVitalPointHit: vi.fn(),
    playEnvironmentalSound: vi.fn(),
  })),
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
