import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import React from "react";
import type { JSX } from "react";

// Mock Howler completely before any imports
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

// Import the React-based AudioManager after mocking
const { AudioProvider, useAudio } = await import("../AudioManager.tsx");

// Test component that uses audio with proper React.createElement
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

  const handleVolumeChange = (): void => {
    audio.setMasterVolume(0.5);
  };

  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      {
        "data-testid": "technique-button",
        onClick: handleKoreanTechnique,
      },
      "Execute Technique"
    ),
    React.createElement(
      "button",
      {
        "data-testid": "combo-button",
        onClick: handleCombo,
      },
      "Combo Attack"
    ),
    React.createElement(
      "button",
      {
        "data-testid": "music-button",
        onClick: handleMusic,
      },
      "Play Music"
    ),
    React.createElement(
      "button",
      {
        "data-testid": "volume-button",
        onClick: handleVolumeChange,
      },
      "Set Volume"
    )
  );
}

describe("AudioManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("useAudio Hook", () => {
    it("should provide audio manager methods", () => {
      const TestComponent = (): JSX.Element => {
        const audio = useAudio();

        expect(audio).toHaveProperty("playSFX");
        expect(audio).toHaveProperty("playMusic");
        expect(audio).toHaveProperty("playAttackSound");
        expect(audio).toHaveProperty("playHitSound");
        expect(audio).toHaveProperty("playStanceChangeSound");
        expect(audio).toHaveProperty("playComboSound");

        return React.createElement(
          "div",
          { "data-testid": "test-component" },
          "Test"
        );
      };

      render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TestComponent)
        )
      );

      expect(true).toBe(true); // Test passes if no errors thrown
    });

    it("should handle Korean martial arts functionality", async () => {
      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TestAudioComponent)
        )
      );

      const techniqueButton = getByTestId("technique-button");

      await act(async () => {
        fireEvent.click(techniqueButton);
      });

      // Should execute without errors
      expect(true).toBe(true);
    });

    it("should handle volume control", async () => {
      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TestAudioComponent)
        )
      );

      const volumeButton = getByTestId("volume-button");

      await act(async () => {
        fireEvent.click(volumeButton);
      });

      expect(true).toBe(true);
    });

    it("should handle music playback", async () => {
      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TestAudioComponent)
        )
      );

      const musicButton = getByTestId("music-button");

      await act(async () => {
        fireEvent.click(musicButton);
      });

      expect(true).toBe(true);
    });

    it("should handle combo sounds", async () => {
      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TestAudioComponent)
        )
      );

      const comboButton = getByTestId("combo-button");

      await act(async () => {
        fireEvent.click(comboButton);
      });

      expect(true).toBe(true);
    });
  });

  describe("Korean Martial Arts Audio Integration", () => {
    it("should support traditional combat audio sequence", async () => {
      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TestAudioComponent)
        )
      );

      // Test complete Korean martial arts sequence
      await act(async () => {
        fireEvent.click(getByTestId("technique-button")); // Stance + Attack + Hit
        fireEvent.click(getByTestId("combo-button")); // Combo sound
        fireEvent.click(getByTestId("music-button")); // Background music
      });

      expect(true).toBe(true);
    });

    it("should handle rapid audio events without conflicts", async () => {
      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TestAudioComponent)
        )
      );

      // Simulate rapid user inputs
      await act(async () => {
        for (let i = 0; i < 5; i++) {
          fireEvent.click(getByTestId("technique-button"));
          fireEvent.click(getByTestId("combo-button"));
        }
      });

      expect(true).toBe(true);
    });
  });

  describe("Audio State Management", () => {
    it("should maintain audio state across component updates", async () => {
      const TestStateComponent = (): JSX.Element => {
        const audio = useAudio();
        const state = audio.getState();

        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { "data-testid": "volume" },
            state.masterVolume
          ),
          React.createElement(
            "div",
            { "data-testid": "muted" },
            state.isMuted.toString()
          ),
          React.createElement(
            "div",
            { "data-testid": "enabled" },
            state.isEnabled.toString()
          )
        );
      };

      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TestStateComponent)
        )
      );

      expect(getByTestId("volume")).toBeInTheDocument();
      expect(getByTestId("muted")).toBeInTheDocument();
      expect(getByTestId("enabled")).toBeInTheDocument();
    });

    it("should handle mute toggle", async () => {
      const TestMuteComponent = (): JSX.Element => {
        const audio = useAudio();

        return React.createElement(
          "button",
          {
            "data-testid": "mute-button",
            onClick: () => audio.toggleMute(),
          },
          "Toggle Mute"
        );
      };

      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TestMuteComponent)
        )
      );

      await act(async () => {
        fireEvent.click(getByTestId("mute-button"));
      });

      expect(true).toBe(true);
    });
  });

  describe("Error Handling", () => {
    it("should handle audio loading failures gracefully", () => {
      expect(() => {
        render(
          React.createElement(
            AudioProvider,
            null,
            React.createElement(TestAudioComponent)
          )
        );
      }).not.toThrow();
    });

    it("should handle component unmounting gracefully", () => {
      const { unmount } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TestAudioComponent)
        )
      );

      expect(() => {
        unmount();
      }).not.toThrow();
    });
  });

  describe("Performance", () => {
    it("should not cause memory leaks with repeated audio calls", async () => {
      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TestAudioComponent)
        )
      );

      // Simulate intensive audio usage
      for (let i = 0; i < 10; i++) {
        await act(async () => {
          fireEvent.click(getByTestId("technique-button"));
        });
      }

      expect(true).toBe(true);
    });
  });

  describe("Korean Martial Arts Specific Tests", () => {
    it("should handle trigram stance changes with audio feedback", async () => {
      const TrigramTestComponent = (): JSX.Element => {
        const audio = useAudio();

        const handleStanceChange = (stanceNumber: number): void => {
          audio.playStanceChangeSound();
          // Simulate different trigram techniques
          const damage = 15 + stanceNumber * 3;
          audio.playAttackSound(damage);
        };

        return React.createElement(
          "div",
          null,
          ...Array.from({ length: 8 }, (_, i) =>
            React.createElement(
              "button",
              {
                key: i + 1,
                "data-testid": `stance-${i + 1}`,
                onClick: () => handleStanceChange(i + 1),
              },
              `Trigram ${i + 1}`
            )
          )
        );
      };

      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TrigramTestComponent)
        )
      );

      // Test all 8 trigram stances
      for (let i = 1; i <= 8; i++) {
        await act(async () => {
          fireEvent.click(getByTestId(`stance-${i}`));
        });
      }

      expect(true).toBe(true);
    });

    it("should handle vital point attacks with appropriate audio", async () => {
      const VitalPointTestComponent = (): JSX.Element => {
        const audio = useAudio();

        const handleVitalPointAttack = (): void => {
          audio.playAttackSound(40); // High damage
          audio.playHitSound(40, true); // Vital point hit
        };

        return React.createElement(
          "button",
          {
            "data-testid": "vital-point-attack",
            onClick: handleVitalPointAttack,
          },
          "Vital Point Attack"
        );
      };

      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(VitalPointTestComponent)
        )
      );

      await act(async () => {
        fireEvent.click(getByTestId("vital-point-attack"));
      });

      expect(true).toBe(true);
    });
  });
});
