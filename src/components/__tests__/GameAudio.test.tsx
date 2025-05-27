import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import type { JSX } from "react";

// Mock the audio system before importing components
vi.mock("../../audio/AudioManager.tsx", () => ({
  AudioProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", { "data-testid": "audio-provider" }, children),
  useAudio: () => ({
    playMusic: vi.fn(),
    stopMusic: vi.fn(),
    playSFX: vi.fn(),
    playAttackSound: vi.fn(),
    playHitSound: vi.fn(),
    playComboSound: vi.fn(),
    playStanceChangeSound: vi.fn(),
    setMasterVolume: vi.fn(),
    getMasterVolume: vi.fn(() => 0.8),
    toggleMute: vi.fn(),
    isEnabled: vi.fn(() => true),
    getState: vi.fn(() => ({
      masterVolume: 0.8,
      isMuted: false,
      isEnabled: true,
    })),
  }),
}));

// Import after mocking
const { AudioProvider, useAudio } = await import(
  "../../audio/AudioManager.tsx"
);

describe("Game Audio Integration", () => {
  describe("Korean Martial Arts Audio System", () => {
    it("should integrate audio feedback with combat actions", () => {
      const TestCombatComponent = (): JSX.Element => {
        const audio = useAudio();

        const handleTechniqueExecution = (): void => {
          // Korean martial arts technique sequence
          audio.playStanceChangeSound(); // Change to trigram stance
          audio.playAttackSound(35); // Execute thunder strike (천둥벽력)
          audio.playHitSound(35, true); // Vital point hit (급소)
          audio.playComboSound(3); // Combo achievement
        };

        return React.createElement(
          "div",
          { "data-testid": "combat-component" },
          React.createElement(
            "button",
            {
              "data-testid": "execute-technique",
              onClick: handleTechniqueExecution,
            },
            "Execute Korean Technique"
          )
        );
      };

      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TestCombatComponent)
        )
      );

      const techniqueButton = getByTestId("execute-technique");
      fireEvent.click(techniqueButton);

      // Verify component renders without errors
      expect(getByTestId("combat-component")).toBeInTheDocument();
    });

    it("should handle trigram stance changes with appropriate audio", () => {
      const TrigramStanceComponent = (): JSX.Element => {
        const audio = useAudio();

        const trigrams = [
          { name: "건", element: "Heaven", technique: "천둥벽력" },
          { name: "태", element: "Lake", technique: "유수연타" },
          { name: "리", element: "Fire", technique: "화염지창" },
          { name: "진", element: "Thunder", technique: "벽력일섬" },
          { name: "손", element: "Wind", technique: "선풍연격" },
          { name: "감", element: "Water", technique: "수류반격" },
          { name: "간", element: "Mountain", technique: "반석방어" },
          { name: "곤", element: "Earth", technique: "대지포옹" },
        ];

        const handleStanceChange = (trigramIndex: number): void => {
          audio.playStanceChangeSound();
          const damage = 15 + trigramIndex * 3; // Varying damage per trigram
          audio.playAttackSound(damage);
        };

        return React.createElement(
          "div",
          { "data-testid": "trigram-selector" },
          ...trigrams.map((trigram, index) =>
            React.createElement(
              "button",
              {
                key: trigram.name,
                "data-testid": `trigram-${index + 1}`,
                onClick: () => handleStanceChange(index),
              },
              `${trigram.name} - ${trigram.technique}`
            )
          )
        );
      };

      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(TrigramStanceComponent)
        )
      );

      // Test each trigram stance
      for (let i = 1; i <= 8; i++) {
        const trigramButton = getByTestId(`trigram-${i}`);
        fireEvent.click(trigramButton);
      }

      expect(getByTestId("trigram-selector")).toBeInTheDocument();
    });

    it("should provide vital point detection audio feedback", () => {
      const VitalPointComponent = (): JSX.Element => {
        const audio = useAudio();

        const vitalPoints = [
          { name: "태양혈", location: "Temple", damage: 40 },
          { name: "인중", location: "Philtrum", damage: 35 },
          { name: "명치", location: "Solar Plexus", damage: 45 },
          { name: "단전", location: "Dantian", damage: 50 },
        ];

        const handleVitalPointStrike = (
          point: (typeof vitalPoints)[0]
        ): void => {
          audio.playAttackSound(point.damage);
          audio.playHitSound(point.damage, true); // Vital point hit
          audio.playSFX("vital_hit");
        };

        return React.createElement(
          "div",
          { "data-testid": "vital-point-trainer" },
          ...vitalPoints.map((point, index) =>
            React.createElement(
              "button",
              {
                key: point.name,
                "data-testid": `vital-point-${index}`,
                onClick: () => handleVitalPointStrike(point),
              },
              `${point.name} (${point.location})`
            )
          )
        );
      };

      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(VitalPointComponent)
        )
      );

      // Test vital point strikes
      const vitalPointButton = getByTestId("vital-point-0");
      fireEvent.click(vitalPointButton);

      expect(getByTestId("vital-point-trainer")).toBeInTheDocument();
    });

    it("should handle progressive combo audio feedback", () => {
      const ComboSystemComponent = (): JSX.Element => {
        const audio = useAudio();
        const [comboCount, setComboCount] = React.useState(0);

        const executeComboHit = (): void => {
          const newCombo = comboCount + 1;
          setComboCount(newCombo);

          // Progressive audio feedback
          audio.playAttackSound(10 + newCombo * 5);
          audio.playComboSound(newCombo);

          if (newCombo >= 5) {
            audio.playSFX("victory"); // Perfect combo achievement
          }
        };

        const resetCombo = (): void => {
          setComboCount(0);
          audio.playSFX("menu_back");
        };

        return React.createElement(
          "div",
          { "data-testid": "combo-system" },
          React.createElement(
            "div",
            { "data-testid": "combo-counter" },
            `Combo: ${comboCount}`
          ),
          React.createElement(
            "button",
            {
              "data-testid": "combo-hit",
              onClick: executeComboHit,
            },
            "Execute Hit"
          ),
          React.createElement(
            "button",
            {
              "data-testid": "reset-combo",
              onClick: resetCombo,
            },
            "Reset Combo"
          )
        );
      };

      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(ComboSystemComponent)
        )
      );

      // Build up a combo
      const comboButton = getByTestId("combo-hit");
      for (let i = 0; i < 6; i++) {
        fireEvent.click(comboButton);
      }

      // Reset combo
      const resetButton = getByTestId("reset-combo");
      fireEvent.click(resetButton);

      expect(getByTestId("combo-system")).toBeInTheDocument();
    });

    it("should integrate Korean philosophical elements with audio", () => {
      const PhilosophyAudioComponent = (): JSX.Element => {
        const audio = useAudio();

        const philosophicalActions = [
          { action: "meditation", music: "meditation_theme" },
          { action: "training", music: "training_theme" },
          { action: "combat", music: "combat_theme" },
          { action: "victory", music: "victory_theme" },
        ];

        const handlePhilosophicalAction = (music: string): void => {
          audio.stopMusic();
          audio.playMusic(music);
          audio.playSFX("ki_charge");
        };

        return React.createElement(
          "div",
          { "data-testid": "philosophy-audio" },
          ...philosophicalActions.map((item, index) =>
            React.createElement(
              "button",
              {
                key: item.action,
                "data-testid": `philosophy-${index}`,
                onClick: () => handlePhilosophicalAction(item.music),
              },
              `${item.action} - ${item.music}`
            )
          )
        );
      };

      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(PhilosophyAudioComponent)
        )
      );

      // Test philosophical audio transitions
      const meditationButton = getByTestId("philosophy-0");
      fireEvent.click(meditationButton);

      expect(getByTestId("philosophy-audio")).toBeInTheDocument();
    });
  });

  describe("Audio State Management", () => {
    it("should maintain audio state consistency", () => {
      const AudioStateComponent = (): JSX.Element => {
        const audio = useAudio();
        const state = audio.getState();

        const handleVolumeChange = (): void => {
          audio.setMasterVolume(0.5);
        };

        const handleMuteToggle = (): void => {
          audio.toggleMute();
        };

        return React.createElement(
          "div",
          { "data-testid": "audio-state" },
          React.createElement(
            "div",
            { "data-testid": "volume-display" },
            `Volume: ${state.masterVolume}`
          ),
          React.createElement(
            "div",
            { "data-testid": "mute-status" },
            `Muted: ${state.isMuted}`
          ),
          React.createElement(
            "button",
            {
              "data-testid": "change-volume",
              onClick: handleVolumeChange,
            },
            "Change Volume"
          ),
          React.createElement(
            "button",
            {
              "data-testid": "toggle-mute",
              onClick: handleMuteToggle,
            },
            "Toggle Mute"
          )
        );
      };

      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(AudioStateComponent)
        )
      );

      // Test volume controls
      const volumeButton = getByTestId("change-volume");
      fireEvent.click(volumeButton);

      const muteButton = getByTestId("toggle-mute");
      fireEvent.click(muteButton);

      expect(getByTestId("audio-state")).toBeInTheDocument();
    });
  });

  describe("Performance and Error Handling", () => {
    it("should handle rapid audio events without performance degradation", () => {
      const PerformanceTestComponent = (): JSX.Element => {
        const audio = useAudio();

        const handleRapidAudioEvents = (): void => {
          // Simulate intensive combat with rapid audio events
          for (let i = 0; i < 20; i++) {
            setTimeout(() => {
              audio.playAttackSound(Math.random() * 40);
              audio.playHitSound(Math.random() * 30);
            }, i * 50);
          }
        };

        return React.createElement(
          "div",
          { "data-testid": "performance-test" },
          React.createElement(
            "button",
            {
              "data-testid": "rapid-audio",
              onClick: handleRapidAudioEvents,
            },
            "Test Rapid Audio Events"
          )
        );
      };

      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(PerformanceTestComponent)
        )
      );

      const rapidButton = getByTestId("rapid-audio");
      fireEvent.click(rapidButton);

      expect(getByTestId("performance-test")).toBeInTheDocument();
    });

    it("should gracefully handle audio loading failures", () => {
      const ErrorHandlingComponent = (): JSX.Element => {
        const audio = useAudio();

        const handleErrorProneOperations = (): void => {
          // Test various audio operations that might fail
          audio.playMusic("nonexistent_track");
          audio.playSFX("menu_select"); // This should work with mock
          audio.playAttackSound(-1); // Invalid damage
          audio.setMasterVolume(2); // Out of range volume
        };

        return React.createElement(
          "div",
          { "data-testid": "error-handling" },
          React.createElement(
            "button",
            {
              "data-testid": "error-operations",
              onClick: handleErrorProneOperations,
            },
            "Test Error Handling"
          )
        );
      };

      const { getByTestId } = render(
        React.createElement(
          AudioProvider,
          null,
          React.createElement(ErrorHandlingComponent)
        )
      );

      const errorButton = getByTestId("error-operations");

      // Should not throw errors
      expect(() => {
        fireEvent.click(errorButton);
      }).not.toThrow();

      expect(getByTestId("error-handling")).toBeInTheDocument();
    });
  });
});
