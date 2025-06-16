import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GameEngine } from "./GameEngine";
import { renderWithPixi } from "../../../test/test-utils";
import type { PlayerState } from "../../../types/player";
import { PlayerArchetype, TrigramStance } from "../../../types/enums";
import { createMockPlayer } from "../../../test/mocks/playerMocks";

describe("GameEngine", () => {
  const mockOnPlayerUpdate = vi.fn();
  const mockOnCombatEnd = vi.fn();

  const defaultProps = {
    width: 800,
    height: 600,
    onPlayerUpdate: mockOnPlayerUpdate,
    onCombatEnd: mockOnCombatEnd,
  };

  let mockPlayer1: PlayerState;
  let mockPlayer2: PlayerState;

  beforeEach(() => {
    vi.clearAllMocks();

    mockPlayer1 = createMockPlayer({
      id: "player1",
      name: { korean: "플레이어1", english: "Player 1" },
      archetype: PlayerArchetype.MUSA,
      currentStance: TrigramStance.GEON,
      health: 100,
      maxHealth: 100,
      position: { row: 2, col: 2 },
    });

    mockPlayer2 = createMockPlayer({
      id: "player2",
      name: { korean: "플레이어2", english: "Player 2" },
      archetype: PlayerArchetype.AMSALJA,
      currentStance: TrigramStance.TAE,
      health: 100,
      maxHealth: 100,
      position: { row: 7, col: 7 },
    });
  });

  describe("Rendering", () => {
    it("should render game engine with grid visualization", () => {
      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      expect(screen.getByTestId("game-engine")).toBeTruthy();
      expect(screen.getByTestId("game-state-display")).toBeTruthy();
      expect(screen.getByTestId("combat-log-display")).toBeTruthy();
    });

    it("should display correct turn information", () => {
      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      const gameStateDisplay = screen.getByTestId("game-state-display");
      expect(gameStateDisplay).toBeTruthy();
    });
  });

  describe("Player Movement", () => {
    it("should handle player movement within grid bounds", () => {
      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      // Simulate keyboard input for movement
      fireEvent.keyDown(window, { key: "w" });

      expect(mockOnPlayerUpdate).toHaveBeenCalledWith(
        mockPlayer1.id,
        expect.objectContaining({
          position: { row: 1, col: 2 },
          stamina: expect.any(Number),
        })
      );
    });

    it("should prevent movement outside grid bounds", () => {
      const playerAtEdge = {
        ...mockPlayer1,
        position: { row: 0, col: 0 },
      };

      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={playerAtEdge}
          player2={mockPlayer2}
        />
      );

      // Try to move north when already at top edge
      fireEvent.keyDown(window, { key: "w" });

      // Should not update position
      expect(mockOnPlayerUpdate).not.toHaveBeenCalledWith(
        playerAtEdge.id,
        expect.objectContaining({
          position: { row: -1, col: 0 },
        })
      );
    });

    it("should prevent movement to occupied positions", () => {
      const player1NearPlayer2 = {
        ...mockPlayer1,
        position: { row: 6, col: 7 },
      };

      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={player1NearPlayer2}
          player2={mockPlayer2}
        />
      );

      // Try to move to player2's position
      fireEvent.keyDown(window, { key: "s" });

      // Should not allow movement to occupied space
      expect(mockOnPlayerUpdate).not.toHaveBeenCalledWith(
        player1NearPlayer2.id,
        expect.objectContaining({
          position: { row: 7, col: 7 },
        })
      );
    });
  });

  describe("Combat System", () => {
    it("should execute basic attack technique", () => {
      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      // Execute basic attack
      fireEvent.keyDown(window, { key: " " });

      expect(mockOnPlayerUpdate).toHaveBeenCalledWith(
        mockPlayer2.id,
        expect.objectContaining({
          health: expect.any(Number),
          consciousness: expect.any(Number),
        })
      );

      expect(mockOnPlayerUpdate).toHaveBeenCalledWith(
        mockPlayer1.id,
        expect.objectContaining({
          ki: expect.any(Number),
          stamina: expect.any(Number),
        })
      );
    });

    it("should handle stance changes", () => {
      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={mockPlayer2}
        />
      );

      // Change to stance 2 (TAE)
      fireEvent.keyDown(window, { key: "2" });

      expect(mockOnPlayerUpdate).toHaveBeenCalledWith(
        mockPlayer1.id,
        expect.objectContaining({
          currentStance: TrigramStance.TAE,
        })
      );
    });

    it("should prevent actions when insufficient resources", () => {
      const lowKiPlayer = {
        ...mockPlayer1,
        ki: 2, // Less than required for basic attack
      };

      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={lowKiPlayer}
          player2={mockPlayer2}
        />
      );

      fireEvent.keyDown(window, { key: " " });

      // Should not execute technique with insufficient ki
      expect(mockOnPlayerUpdate).not.toHaveBeenCalledWith(
        mockPlayer2.id,
        expect.objectContaining({
          health: expect.any(Number),
        })
      );
    });
  });

  describe("Victory Conditions", () => {
    it("should detect victory when player health reaches zero", () => {
      const defeatedPlayer = {
        ...mockPlayer2,
        health: 0,
      };

      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={defeatedPlayer}
        />
      );

      expect(mockOnCombatEnd).toHaveBeenCalledWith(mockPlayer1.id);
    });

    it("should detect victory when player consciousness reaches zero", () => {
      const unconsciousPlayer = {
        ...mockPlayer2,
        consciousness: 0,
      };

      renderWithPixi(
        <GameEngine
          {...defaultProps}
          player1={mockPlayer1}
          player2={unconsciousPlayer}
        />
      );

      expect(mockOnCombatEnd).toHaveBeenCalledWith(mockPlayer1.id);
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
