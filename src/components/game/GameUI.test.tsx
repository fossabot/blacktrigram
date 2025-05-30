import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { GameUI } from "./GameUI";
import type { GameState, PlayerState } from "../../types";

describe("GameUI", () => {
  const mockPlayerState: PlayerState = {
    playerId: "player1",
    position: { x: 100, y: 300 },
    velocity: { x: 0, y: 0 },
    health: 100,
    maxHealth: 100,
    stamina: 100,
    maxStamina: 100,
    ki: 50,
    maxKi: 100,
    stance: "geon",
    isBlocking: false,
    isMoving: false,
    isAttacking: false,
    facing: "right",
    targetId: null,
    comboCount: 0,
    lastHitTime: 0,
    conditions: [],
  };

  const mockGameState: GameState = {
    players: [
      { ...mockPlayerState, position: { x: 200, y: 300 } },
      { ...mockPlayerState, position: { x: 600, y: 300 } },
    ],
    currentRound: 1,
    timeRemaining: 60,
    winner: null,
    isPaused: false,
    phase: "preparation",
  };

  const mockProps = {
    gameState: mockGameState,
    gameTime: 60,
    combatLog: [],
    onStartMatch: vi.fn(),
    onResetMatch: vi.fn(),
    onStanceChange: vi.fn(),
    onTogglePause: vi.fn(),
  };

  it("should render game UI elements", () => {
    const { container } = render(<GameUI {...mockProps} />);
    expect(
      container.querySelector('[data-testid="pixi-container"]')
    ).toBeInTheDocument();
  });

  it("should display player health information", () => {
    const { container } = render(<GameUI {...mockProps} />);
    expect(container).toBeInTheDocument();
  });

  it("should handle game state updates", () => {
    const { container, rerender } = render(<GameUI {...mockProps} />);

    const updatedState: GameState = {
      ...mockGameState,
      players: [
        { ...mockPlayerState, health: 75, position: { x: 200, y: 300 } },
        { ...mockPlayerState, position: { x: 600, y: 300 } },
      ],
    };

    rerender(<GameUI {...mockProps} gameState={updatedState} />);
    expect(container).toBeInTheDocument();
  });

  it("should show start match button when match not started", () => {
    const { container } = render(
      <GameUI
        {...mockProps}
        gameState={{ ...mockGameState, phase: "preparation" }}
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("should display victory screen", () => {
    const victoryState: GameState = {
      ...mockGameState,
      phase: "victory",
      winner: 0,
    };

    const { container } = render(
      <GameUI {...mockProps} gameState={victoryState} />
    );
    expect(container).toBeInTheDocument();
  });

  it("should show pause indicator when game is paused", () => {
    const { container } = render(
      <GameUI {...mockProps} gameState={{ ...mockGameState, isPaused: true }} />
    );
    expect(container).toBeInTheDocument();
  });
});
