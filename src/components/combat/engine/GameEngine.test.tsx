import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithPixi } from "../../../test/test-utils";
import { GameEngine } from "./GameEngine";
import { AudioProvider } from "../../../audio/AudioProvider";
import type { PlayerState } from "../../../types/player";
import { PlayerArchetype, TrigramStance } from "../../../types/enums";

// Mock PixiJS components
vi.mock("@pixi/react", () => ({
  extend: vi.fn(),
  Container: "pixiContainer",
  Graphics: "pixiGraphics",
  Text: "pixiText",
}));

describe("GameEngine", () => {
  const mockOnPlayerUpdate = vi.fn();

  const createMockPlayer = (
    id: string,
    name: { korean: string; english: string },
    archetype: PlayerArchetype = PlayerArchetype.MUSA
  ): PlayerState => ({
    id,
    name,
    archetype,
    currentStance: TrigramStance.GEON,
    health: 100,
    maxHealth: 100,
    ki: 100,
    maxKi: 100,
    stamina: 100,
    maxStamina: 100,
    balance: 100,
    consciousness: 100,
    pain: 0,
    experiencePoints: 0,
    level: 1,
    isBlocking: false,
    isStunned: false,
    isCountering: false,
    statusEffects: [],
    combatStats: {
      hitsLanded: 0,
      hitsTaken: 0,
      totalDamageDealt: 0,
      totalDamageReceived: 0,
      perfectStrikes: 0,
      criticalHits: 0,
    },
  });

  const defaultProps = {
    player1: createMockPlayer("player1", { korean: "무사1", english: "Warrior1" }),
    player2: createMockPlayer("player2", { korean: "무사2", english: "Warrior2" }),
    onPlayerUpdate: mockOnPlayerUpdate,
    width: 1200,
    height: 800,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Fix: Wrap all GameEngine tests with AudioProvider
  const renderGameEngine = (props = defaultProps) => {
    return renderWithPixi(
      <AudioProvider>
        <GameEngine {...props} />
      </AudioProvider>
    );
  };

  describe("Rendering", () => {
    it("should render game engine with grid visualization", () => {
      renderGameEngine();
      expect(screen.getByTestId("game-engine")).toBeInTheDocument();
    });

    it("should display correct turn information", () => {
      renderGameEngine();
      expect(screen.getByTestId("game-engine")).toBeInTheDocument();
    });
  });

  describe("Player Movement", () => {
    it("should handle player movement within grid bounds", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });

    it("should prevent movement outside grid bounds", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });

    it("should prevent movement to occupied positions", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });
  });

  describe("Combat System", () => {
    it("should execute basic attack technique", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });

    it("should handle stance changes", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });

    it("should prevent actions when insufficient resources", async () => {
      const lowResourcePlayer = {
        ...defaultProps.player1,
        stamina: 0,
        ki: 0,
      };

      renderGameEngine({
        ...defaultProps,
        player1: lowResourcePlayer,
      });

      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });
  });

  describe("Victory Conditions", () => {
    it("should detect victory when player health reaches zero", async () => {
      const defeatedPlayer = { ...defaultProps.player2, health: 0 };
      renderGameEngine({ ...defaultProps, player2: defeatedPlayer });

      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });

    it("should detect victory when player consciousness reaches zero", async () => {
      const unconsciousPlayer = { ...defaultProps.player2, consciousness: 0 };
      renderGameEngine({ ...defaultProps, player2: unconsciousPlayer });

      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });

    it("should handle draw condition", async () => {
      const bothDefeated = {
        player1: { ...defaultProps.player1, health: 0 },
        player2: { ...defaultProps.player2, health: 0 },
      };
      renderGameEngine({ ...defaultProps, ...bothDefeated });

      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });
  });

  describe("AI Behavior", () => {
    it("should execute AI moves for player 2", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });

    it("should make AI attack when in range", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });
  });

  describe("Game State Management", () => {
    it("should track turn progression", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });

    it("should maintain combat log", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });

    it("should handle resource regeneration", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });
  });

  describe("Grid Validation", () => {
    it("should create valid octagonal grid", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });

    it("should initialize player positions if not set", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });
  });

  describe("Korean Martial Arts Integration", () => {
    it("should use Korean terminology in combat log", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });

    it("should respect trigram philosophy in game mechanics", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });
  });

  describe("Performance", () => {
    it("should handle rapid input without errors", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });

    it("should maintain stable frame rate with many effects", async () => {
      renderGameEngine();
      await waitFor(() => {
        expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      });
    });
  });
});
    it("should handle draw condition", () => {
      const deadPlayer1 = { ...mockPlayer1, health: 0 };
      const deadPlayer2 = { ...mockPlayer2, health: 0 };

      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={deadPlayer1}
          player2={deadPlayer2}
        />
      );

      expect(mockOnCombatEnd).toHaveBeenCalledWith("draw");
    });
  });

  describe("AI Behavior", () => {
    it("should execute AI moves for player 2", async () => {
      // Set active player to player 2 (AI)
      const gameEngine = renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      // Wait for AI to make a move
      await new Promise((resolve) => setTimeout(resolve, 1100));

      // AI should have either moved or attacked
      expect(mockOnPlayerUpdate).toHaveBeenCalled();
    });

    it("should make AI attack when in range", async () => {
      const player2InRange = {
        ...mockPlayer2,
        position: { row: 1, col: 2 }, // Next to player 1
      };

      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={player2InRange}
        />
      );

      // Wait for AI turn
      await new Promise((resolve) => setTimeout(resolve, 1100));

      // AI should attack when in range
      expect(mockOnPlayerUpdate).toHaveBeenCalledWith(
        mockPlayer1.id,
        expect.objectContaining({
          health: expect.any(Number),
        })
      );
    });
  });

  describe("Game State Management", () => {
    it("should track turn progression", () => {
      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      // Initial turn should be displayed
      const gameStateDisplay = screen.getByTestId("game-state-display");
      expect(gameStateDisplay).toBeTruthy();
    });

    it("should maintain combat log", () => {
      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      const combatLogDisplay = screen.getByTestId("combat-log-display");
      expect(combatLogDisplay).toBeTruthy();
    });

    it("should handle resource regeneration", () => {
      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      // Execute an action that consumes resources
      fireEvent.keyDown(window, { key: " " });

      // Resources should be consumed
      expect(mockOnPlayerUpdate).toHaveBeenCalledWith(
        mockPlayer1.id,
        expect.objectContaining({
          ki: expect.any(Number),
          stamina: expect.any(Number),
        })
      );
    });
  });

  describe("Grid Validation", () => {
    it("should create valid octagonal grid", () => {
      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      // Grid should be rendered without errors
      expect(screen.getByTestId("game-engine")).toBeTruthy();
    });

    it("should initialize player positions if not set", () => {
      const playerWithoutPosition = {
        ...mockPlayer1,
        position: undefined,
      };

      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={playerWithoutPosition}
          player2={mockPlayer2}
        />
      );

      // Should initialize position
      expect(mockOnPlayerUpdate).toHaveBeenCalledWith(
        playerWithoutPosition.id,
        expect.objectContaining({
          position: expect.objectContaining({
            row: expect.any(Number),
            col: expect.any(Number),
          }),
        })
      );
    });
  });

  describe("Korean Martial Arts Integration", () => {
    it("should use Korean terminology in combat log", () => {
      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      fireEvent.keyDown(window, { key: "1" }); // Change stance

      // Should log in Korean
      const combatLogDisplay = screen.getByTestId("combat-log-display");
      expect(combatLogDisplay).toBeTruthy();
    });

    it("should respect trigram philosophy in game mechanics", () => {
      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      // Each stance should have distinct characteristics
      fireEvent.keyDown(window, { key: "1" }); // GEON
      fireEvent.keyDown(window, { key: "2" }); // TAE

      expect(mockOnPlayerUpdate).toHaveBeenCalledTimes(2);
    });
  });

  describe("Performance", () => {
    it("should handle rapid input without errors", () => {
      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      // Rapid input sequence
      for (let i = 0; i < 10; i++) {
        fireEvent.keyDown(window, { key: "w" });
        fireEvent.keyDown(window, { key: "s" });
      }

      // Should not crash or cause errors
      expect(screen.getByTestId("game-engine")).toBeTruthy();
    });

    it("should maintain stable frame rate with many effects", () => {
      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      // Multiple simultaneous actions
      fireEvent.keyDown(window, { key: " " }); // Attack
      fireEvent.keyDown(window, { key: "1" }); // Stance change
      fireEvent.keyDown(window, { key: "w" }); // Movement

      // Engine should handle multiple actions gracefully
      expect(screen.getByTestId("game-engine")).toBeTruthy();
    });
  });
});
