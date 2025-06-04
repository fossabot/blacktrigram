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
