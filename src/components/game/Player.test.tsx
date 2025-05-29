import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Player } from "./Player";
import type { PlayerState, Vector2D } from "../../types/GameTypes";
import { createPlayerState } from "../../types";

// Mock the audio system
vi.mock("../../audio/AudioManager", () => ({
  useAudio: () => ({
    playAttackSound: vi.fn(),
    playHitSound: vi.fn(),
    playStanceChangeSound: vi.fn(),
    playSFX: vi.fn(),
  }),
}));

const mockOpponentPosition: Vector2D = { x: 600, y: 300 };

describe("Player Component", () => {
  // Use unified helper function
  const createMockPlayerState = (
    overrides: Partial<PlayerState> = {}
  ): PlayerState => {
    return createPlayerState(overrides);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render player with correct test attributes", () => {
      const playerState = createMockPlayerState();

      render(
        <Player
          playerState={playerState}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      // Check for PIXI container
      expect(screen.getByTestId("pixi-container")).toBeInTheDocument();

      // Check for graphics component
      expect(screen.getByTestId("pixi-graphics")).toBeInTheDocument();

      // Check for trigram symbol text
      const symbolText = screen.getByTestId("pixi-text");
      expect(symbolText).toHaveAttribute("data-text", "☰"); // Heaven symbol
    });

    it("should display Korean stance name correctly", () => {
      const playerState = createMockPlayerState({ currentStance: "li" });

      render(
        <Player
          playerState={playerState}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      // Should contain Fire trigram symbol
      const texts = screen.getAllByTestId("pixi-text");
      const symbolText = texts.find(
        (text) => text.getAttribute("data-text") === "☲"
      );
      expect(symbolText).toBeInTheDocument();
    });

    it("should show combo counter when combo count > 1", () => {
      const playerState = createMockPlayerState({ comboCount: 3 });

      render(
        <Player
          playerState={playerState}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      const texts = screen.getAllByTestId("pixi-text");
      const comboText = texts.find((text) =>
        text.getAttribute("data-text")?.includes("3 HIT COMBO")
      );
      expect(comboText).toBeInTheDocument();
    });

    it("should display status effects", () => {
      const playerState = createMockPlayerState({
        activeEffects: [
          {
            type: "vital_stunning",
            duration: 2000,
            intensity: 0.8,
            source: "vital_point",
          },
        ],
      });

      render(
        <Player
          playerState={playerState}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      const texts = screen.getAllByTestId("pixi-text");
      const effectText = texts.find((text) =>
        text.getAttribute("data-text")?.includes("VITAL_STUNNING")
      );
      expect(effectText).toBeInTheDocument();
    });
  });

  describe("Visual States", () => {
    it("should handle attacking state visually", () => {
      const playerState = createMockPlayerState({ isAttacking: true });

      render(
        <Player
          playerState={playerState}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      // Graphics component should be present (drawing attack effects)
      expect(screen.getByTestId("pixi-graphics")).toBeInTheDocument();
    });

    it("should handle blocking state visually", () => {
      const playerState = createMockPlayerState({ isBlocking: true });

      render(
        <Player
          playerState={playerState}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      // Graphics component should be present (drawing block effects)
      expect(screen.getByTestId("pixi-graphics")).toBeInTheDocument();
    });

    it("should handle stunned state with reduced opacity", () => {
      const playerState = createMockPlayerState({ isStunned: true });

      render(
        <Player
          playerState={playerState}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      // Component should still render but with visual changes
      expect(screen.getByTestId("pixi-graphics")).toBeInTheDocument();
    });

    it("should handle low health warning state", () => {
      const playerState = createMockPlayerState({ health: 25, maxHealth: 100 });

      render(
        <Player
          playerState={playerState}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      // Should render with low health visual effects
      expect(screen.getByTestId("pixi-graphics")).toBeInTheDocument();
    });
  });

  describe("Korean Martial Arts Features", () => {
    it("should display correct trigram symbols for each stance", () => {
      const stances: Array<{ stance: any; symbol: string }> = [
        { stance: "geon", symbol: "☰" },
        { stance: "tae", symbol: "☱" },
        { stance: "li", symbol: "☲" },
        { stance: "jin", symbol: "☳" },
        { stance: "son", symbol: "☴" },
        { stance: "gam", symbol: "☵" },
        { stance: "gan", symbol: "☶" },
        { stance: "gon", symbol: "☷" },
      ];

      stances.forEach(({ stance, symbol }) => {
        const playerState = createMockPlayerState({ currentStance: stance });

        const { unmount } = render(
          <Player
            playerState={playerState}
            isPlayerOne={true}
            opponentPosition={mockOpponentPosition}
          />
        );

        const texts = screen.getAllByTestId("pixi-text");
        const symbolText = texts.find(
          (text) => text.getAttribute("data-text") === symbol
        );
        expect(symbolText).toBeInTheDocument();

        unmount();
      });
    });

    it("should use Korean font family for text elements", () => {
      const playerState = createMockPlayerState();

      render(
        <Player
          playerState={playerState}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      const texts = screen.getAllByTestId("pixi-text");
      const koreanText = texts.find(
        (text) => text.getAttribute("data-font-family") === "Noto Sans KR"
      );
      expect(koreanText).toBeInTheDocument();
    });

    it("should handle player facing direction correctly", () => {
      const leftFacingPlayer = createMockPlayerState({ facing: "left" });

      const { rerender } = render(
        <Player
          playerState={leftFacingPlayer}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      expect(screen.getByTestId("pixi-container")).toBeInTheDocument();

      const rightFacingPlayer = createMockPlayerState({ facing: "right" });

      rerender(
        <Player
          playerState={rightFacingPlayer}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
    });
  });

  describe("Performance and Edge Cases", () => {
    it("should handle zero health state", () => {
      const playerState = createMockPlayerState({ health: 0 });

      render(
        <Player
          playerState={playerState}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
    });

    it("should handle maximum combo count", () => {
      const playerState = createMockPlayerState({ comboCount: 8 });

      render(
        <Player
          playerState={playerState}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      const texts = screen.getAllByTestId("pixi-text");
      const comboText = texts.find((text) =>
        text.getAttribute("data-text")?.includes("8 HIT COMBO")
      );
      expect(comboText).toBeInTheDocument();
    });

    it("should handle multiple active effects", () => {
      const playerState = createMockPlayerState({
        activeEffects: [
          {
            type: "vital_paralysis",
            duration: 1500,
            intensity: 0.6,
            source: "vital_point",
          },
          {
            type: "vital_bleeding",
            duration: 3000,
            intensity: 0.4,
            source: "vital_point",
          },
        ],
      });

      render(
        <Player
          playerState={playerState}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      const texts = screen.getAllByTestId("pixi-text");
      const paralysisText = texts.find((text) =>
        text.getAttribute("data-text")?.includes("VITAL_PARALYSIS")
      );
      const bleedingText = texts.find((text) =>
        text.getAttribute("data-text")?.includes("VITAL_BLEEDING")
      );

      expect(paralysisText).toBeInTheDocument();
      expect(bleedingText).toBeInTheDocument();
    });

    it("should handle rapid stance changes without errors", () => {
      const playerState = createMockPlayerState({ currentStance: "geon" });

      const { rerender } = render(
        <Player
          playerState={playerState}
          isPlayerOne={true}
          opponentPosition={mockOpponentPosition}
        />
      );

      // Simulate rapid stance changes
      const stances = ["tae", "li", "jin", "son", "gam", "gan", "gon"] as const;

      stances.forEach((stance) => {
        const newState = createMockPlayerState({ currentStance: stance });

        expect(() => {
          rerender(
            <Player
              playerState={newState}
              isPlayerOne={true}
              opponentPosition={mockOpponentPosition}
            />
          );
        }).not.toThrow();
      });
    });
  });
});
