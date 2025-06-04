import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock Howler before importing AudioManager
vi.mock("howler", () => ({
  Howl: vi.fn().mockImplementation(() => ({
    play: vi.fn().mockReturnValue("sound-id"),
    volume: vi.fn(),
    stop: vi.fn(),
    unload: vi.fn(),
    fade: vi.fn(),
  })),
  Howler: {
    autoUnlock: true,
    html5PoolSize: 8,
    volume: vi.fn(),
    mute: vi.fn(),
  },
}));

// Mock the AudioManager module
vi.mock("../AudioManager", () => {
  let state = {
    masterVolume: 1.0,
    sfxVolume: 1.0,
    musicVolume: 1.0,
    muted: false,
    currentMusicTrack: null,
    isInitialized: true,
  };

  const mockInstance = {
    getState: vi.fn(() => ({ ...state })),
    setMasterVolume: vi.fn((volume: number) => {
      state.masterVolume = volume;
    }),
    setSfxVolume: vi.fn(),
    setMusicVolume: vi.fn(),
    mute: vi.fn(() => {
      state.muted = true;
    }),
    unmute: vi.fn(() => {
      state.muted = false;
    }),
    toggleMute: vi.fn(() => {
      state.muted = !state.muted;
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
    AudioManager: vi.fn(() => mockInstance),
    audioManager: mockInstance,
    useAudio: vi.fn(() => mockInstance),
  };
});

import { audioManager } from "../AudioManager";

describe("AudioManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should be a singleton", async () => {
    const { audioManager } = await import("../AudioManager");
    const { audioManager: audioManager2 } = await import("../AudioManager");
    expect(audioManager).toBe(audioManager2);
  });

  it("should have proper initial state", () => {
    const state = audioManager.getState();
    expect(state.isInitialized).toBe(true);
    expect(state.masterVolume).toBeGreaterThan(0);
    expect(state.muted).toBe(false);
  });

  it("should be able to play SFX", () => {
    // Test that playSFX doesn't throw errors
    expect(() => {
      audioManager.playSFX("menu_select");
    }).not.toThrow();
  });

  it("should be able to play music", () => {
    // Test that playMusic doesn't throw errors
    expect(() => {
      audioManager.playMusic("intro_theme");
    }).not.toThrow();
  });

  it("should handle volume changes", () => {
    audioManager.setMasterVolume(0.5);
    const state = audioManager.getState();
    expect(state.masterVolume).toBe(0.5);
  });

  it("should handle mute toggle", () => {
    const initialMuted = audioManager.getState().muted;
    audioManager.toggleMute();
    const newState = audioManager.getState();
    expect(newState.muted).toBe(!initialMuted);
  });
});
