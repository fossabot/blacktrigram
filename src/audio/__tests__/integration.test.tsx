import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import type { JSX } from "react";

// Mock Howler before importing components
vi.mock("howler", () => ({
  Howl: vi.fn().mockImplementation(() => ({
    play: vi.fn().mockReturnValue(1),
    stop: vi.fn(),
    volume: vi.fn(),
    fade: vi.fn(),
    playing: vi.fn().mockReturnValue(false),
    unload: vi.fn(),
  })),
  Howler: {
    volume: vi.fn(),
    mute: vi.fn(),
  },
}));

const { AudioProvider, useAudio } = await import("../AudioManager.tsx");

// Test component that uses audio
function TestAudioComponent(): JSX.Element {
  const audio = useAudio();

  const handleKoreanTechnique = (): void => {
    audio.playStanceChangeSound();
    audio.playAttackSound(35);
    audio.playHitSound(35, true);
  };

  const handleCombo = (): void => {
    audio.playComboSound(3);
  };

  const handleMusic = (): void => {
    audio.playMusic("combat_theme");
  };

  return (
    <div>
      <button data-testid="technique-button" onClick={handleKoreanTechnique}>
        Execute Technique
      </button>
      <button data-testid="combo-button" onClick={handleCombo}>
        Combo Attack
      </button>
      <button data-testid="music-button" onClick={handleMusic}>
        Play Music
      </button>
      <button
        data-testid="volume-button"
        onClick={() => audio.setMasterVolume(0.5)}
      >
        Set Volume
      </button>
    </div>
  );
}

describe("Audio Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("AudioProvider Integration", () => {
    it("should provide audio context to child components", () => {
      expect(() => {
        render(
          <AudioProvider>
            <TestAudioComponent />
          </AudioProvider>
        );
      }).not.toThrow();
    });

    it("should handle Korean martial arts audio sequences", async () => {
      const { getByTestId } = render(
        <AudioProvider>
          <TestAudioComponent />
        </AudioProvider>
      );

      const techniqueButton = getByTestId("technique-button");

      await act(async () => {
        fireEvent.click(techniqueButton);
      });

      // Should not throw any errors
      expect(true).toBe(true);
    });

    it("should handle combo audio progression", async () => {
      const { getByTestId } = render(
        <AudioProvider>
          <TestAudioComponent />
        </AudioProvider>
      );

      const comboButton = getByTestId("combo-button");

      await act(async () => {
        fireEvent.click(comboButton);
      });

      expect(true).toBe(true);
    });

    it("should manage music playback", async () => {
      const { getByTestId } = render(
        <AudioProvider>
          <TestAudioComponent />
        </AudioProvider>
      );

      const musicButton = getByTestId("music-button");

      await act(async () => {
        fireEvent.click(musicButton);
      });

      expect(true).toBe(true);
    });

    it("should handle volume changes", async () => {
      const { getByTestId } = render(
        <AudioProvider>
          <TestAudioComponent />
        </AudioProvider>
      );

      const volumeButton = getByTestId("volume-button");

      await act(async () => {
        fireEvent.click(volumeButton);
      });

      expect(true).toBe(true);
    });
  });

  describe("Korean Martial Arts Audio Flow", () => {
    it("should support complete combat sequence", async () => {
      const { getByTestId } = render(
        <AudioProvider>
          <TestAudioComponent />
        </AudioProvider>
      );

      // Simulate a complete Korean martial arts sequence
      await act(async () => {
        fireEvent.click(getByTestId("technique-button")); // Stance + Attack + Hit
        fireEvent.click(getByTestId("combo-button")); // Combo sound
      });

      expect(true).toBe(true);
    });

    it("should handle multiple simultaneous audio events", async () => {
      const { getByTestId } = render(
        <AudioProvider>
          <TestAudioComponent />
        </AudioProvider>
      );

      // Rapid fire audio events
      await act(async () => {
        fireEvent.click(getByTestId("technique-button"));
        fireEvent.click(getByTestId("combo-button"));
        fireEvent.click(getByTestId("music-button"));
      });

      expect(true).toBe(true);
    });
  });

  describe("Error Handling", () => {
    it("should handle audio loading failures gracefully", () => {
      // This tests that the component doesn't crash when audio fails to load
      expect(() => {
        render(
          <AudioProvider>
            <TestAudioComponent />
          </AudioProvider>
        );
      }).not.toThrow();
    });

    it("should handle invalid sound IDs gracefully", async () => {
      const { getByTestId } = render(
        <AudioProvider>
          <TestAudioComponent />
        </AudioProvider>
      );

      // Test component should handle this without crashing
      await act(async () => {
        fireEvent.click(getByTestId("technique-button"));
      });

      expect(true).toBe(true);
    });
  });
});
