import { describe, it, expect, beforeEach, vi } from "vitest";
import type { SoundEffectId, MusicTrackId } from "../../types/audio";

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

describe("AudioManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should be a singleton", async () => {
    const { audioManager } = await import("../AudioManager");
    const { audioManager: audioManager2 } = await import("../AudioManager");
    expect(audioManager).toBe(audioManager2);
  });

  it("should play SFX", async () => {
    const { audioManager } = await import("../AudioManager");
    const soundId: SoundEffectId = "menu_hover";
    expect(() => audioManager.playSFX(soundId)).not.toThrow();
  });

  it("should play music", async () => {
    const { audioManager } = await import("../AudioManager");
    const musicId: MusicTrackId = "intro_theme";
    expect(() => audioManager.playMusic(musicId)).not.toThrow();
  });

  it("should handle volume changes", async () => {
    const { audioManager } = await import("../AudioManager");
    audioManager.setMasterVolume(0.5);
    expect(audioManager.getState().masterVolume).toBe(0.5);
  });
});
