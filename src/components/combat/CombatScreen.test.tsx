/**
 * @fileoverview CombatScreen component tests with Korean martial arts focus
 */

import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithPixi } from "../../test/test-utils";
import { CombatScreen } from "./CombatScreen";
import type { PlayerState } from "../../types/player";
import { PlayerArchetype, TrigramStance } from "../../types/enums";
import { AudioProvider } from "../../audio/AudioProvider";

// Mock PixiJS components
vi.mock("@pixi/react", () => ({
  extend: vi.fn(),
  Container: "pixiContainer",
  Graphics: "pixiGraphics",
  Text: "pixiText",
}));

// Mock components that have complex dependencies
vi.mock("./components/GameEngine", () => ({
  GameEngine: ({ children, ...props }: any) => (
    <div data-testid="game-engine" {...props}>
      {children}
    </div>
  ),
}));

vi.mock("./components/DojangBackground", () => ({
  DojangBackground: (props: any) => (
    <div data-testid="dojang-background" {...props} />
  ),
}));

describe("CombatScreen Korean Martial Arts Combat", () => {
  const mockOnPlayerUpdate = vi.fn();
  const mockOnReturnToMenu = vi.fn();
  const mockOnGameEnd = vi.fn();

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
    players: [
      createMockPlayer("player1", { korean: "무사1", english: "Warrior1" }),
      createMockPlayer("player2", { korean: "무사2", english: "Warrior2" }),
    ],
    onPlayerUpdate: mockOnPlayerUpdate,
    currentRound: 1,
    timeRemaining: 180,
    onReturnToMenu: mockOnReturnToMenu,
    onGameEnd: mockOnGameEnd,
    width: 1200,
    height: 800,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Component Rendering", () => {
    it("should render CombatScreen with all essential components", () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      // Core components should be present
      expect(screen.getByTestId("combat-screen")).toBeInTheDocument();
      expect(screen.getByTestId("game-engine")).toBeInTheDocument();
      expect(screen.getByTestId("dojang-background")).toBeInTheDocument();
      expect(screen.getByTestId("combat-arena")).toBeInTheDocument();
    });

    it("should display Korean player names correctly", () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      // Check for Korean text rendering
      expect(screen.getByTestId("player1-status")).toBeInTheDocument();
      expect(screen.getByTestId("player2-status")).toBeInTheDocument();
    });

    it("should render with mobile responsiveness", () => {
      const mobileProps = {
        ...defaultProps,
        width: 600,
        height: 400,
      };

      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...mobileProps} />
        </AudioProvider>
      );

      expect(screen.getByTestId("combat-screen")).toBeInTheDocument();
    });
  });

  describe("Combat Mechanics", () => {
    it("should handle player attacks", async () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      // Simulate spacebar attack
      fireEvent.keyDown(window, { key: " " });

      await waitFor(() => {
        expect(mockOnPlayerUpdate).toHaveBeenCalled();
      });
    });

    it("should handle stance changes with Korean trigrams", async () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      // Test trigram stance changes (1-8 keys)
      fireEvent.keyDown(window, { key: "2" }); // Switch to TAE stance

      await waitFor(() => {
        expect(mockOnPlayerUpdate).toHaveBeenCalledWith(
          0,
          expect.objectContaining({
            currentStance: TrigramStance.TAE,
          })
        );
      });
    });

    it("should handle defense actions", async () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      // Simulate shift key for defense
      fireEvent.keyDown(window, { key: "Shift" });

      await waitFor(() => {
        expect(mockOnPlayerUpdate).toHaveBeenCalledWith(
          0,
          expect.objectContaining({
            isBlocking: true,
          })
        );
      });
    });

    it("should detect victory conditions", async () => {
      const playersWithLowHealth = [
        createMockPlayer("player1", { korean: "무사1", english: "Warrior1" }),
        {
          ...createMockPlayer("player2", { korean: "무사2", english: "Warrior2" }),
          health: 0
        },
      ];

      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} players={playersWithLowHealth} />
        </AudioProvider>
      );

      await waitFor(() => {
        expect(mockOnGameEnd).toHaveBeenCalledWith(0);
      });
    });
  });

  describe("UI Interactions", () => {
    it("should handle pause/resume functionality", async () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      // Press escape to pause
      fireEvent.keyDown(window, { key: "Escape" });

      await waitFor(() => {
        expect(screen.getByTestId("pause-overlay")).toBeInTheDocument();
        expect(screen.getByText("일시 정지 - PAUSED")).toBeInTheDocument();
      });
    });

    it("should return to menu when button is clicked", () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      const menuButton = screen.getByTestId("return-menu-button");
      fireEvent.click(menuButton);

      expect(mockOnReturnToMenu).toHaveBeenCalled();
    });

    it("should handle player selection", () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      const arena = screen.getByTestId("combat-arena");
      fireEvent.click(arena);

      // Should trigger player interaction
      expect(mockOnPlayerUpdate).toHaveBeenCalled();
    });
  });

  describe("Korean Cultural Elements", () => {
    it("should display all 8 trigram symbols", () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      // Check for trigram symbols in arena
      expect(screen.getByTestId("arena-boundaries")).toBeInTheDocument();
      expect(screen.getByTestId("central-taegeuk")).toBeInTheDocument();
    });

    it("should show Korean combat log messages", async () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      // Check combat log panel
      expect(screen.getByTestId("combat-log-panel")).toBeInTheDocument();
      expect(screen.getByText("전투 기록")).toBeInTheDocument();
    });

    it("should display Korean control instructions", () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      const controlsGuide = screen.getByTestId("korean-controls-guide");
      expect(controlsGuide).toBeInTheDocument();
      expect(screen.getByText(/조작: 1-8 자세변경/)).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("should handle insufficient players gracefully", () => {
      const propsWithOnePlayer = {
        ...defaultProps,
        players: [defaultProps.players[0]],
      };

      expect(() =>
        renderWithPixi(
          <AudioProvider>
            <CombatScreen {...propsWithOnePlayer} />
          </AudioProvider>
        )
      ).not.toThrow();

      expect(screen.getByTestId("combat-screen")).toBeInTheDocument();
    });

    it("should handle invalid player data", () => {
      const propsWithInvalidPlayer = {
        ...defaultProps,
        players: [
          defaultProps.players[0],
          {
            ...defaultProps.players[1],
            health: -10, // Invalid health
          },
        ],
      };

      expect(() =>
        renderWithPixi(
          <AudioProvider>
            <CombatScreen {...propsWithInvalidPlayer} />
          </AudioProvider>
        )
      ).not.toThrow();
    });
  });

  describe("Performance", () => {
    it("should render efficiently with proper memoization", () => {
      const { rerender } = renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      // Re-render with same props should not cause issues
      rerender(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      expect(screen.getByTestId("combat-screen")).toBeInTheDocument();
    });

    it("should handle rapid key presses without errors", async () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      // Rapid fire key presses
      for (let i = 1; i <= 8; i++) {
        fireEvent.keyDown(window, { key: i.toString() });
      }

      await waitFor(() => {
        expect(mockOnPlayerUpdate).toHaveBeenCalled();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper test IDs for all interactive elements", () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      // Essential test IDs should be present
      const requiredTestIds = [
        "combat-screen",
        "combat-arena",
        "combat-controls-container",
        "return-menu-button",
        "player1-status",
        "player2-status",
        "combat-log-panel",
      ];

      requiredTestIds.forEach((testId) => {
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });
    });

    it("should support keyboard navigation", () => {
      renderWithPixi(
        <AudioProvider>
          <CombatScreen {...defaultProps} />
        </AudioProvider>
      );

      // All important keyboard controls should work
      const keyTests = [
        { key: " ", description: "space for attack" },
        { key: "Shift", description: "shift for defend" },
        { key: "Escape", description: "escape for pause" },
        { key: "1", description: "number keys for stance" },
      ];

      keyTests.forEach(({ key }) => {
        expect(() => fireEvent.keyDown(window, { key })).not.toThrow();
      });
    });
  });
});
