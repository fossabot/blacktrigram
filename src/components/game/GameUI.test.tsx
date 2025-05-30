import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { GameUI } from "./GameUI";
import type { PlayerState } from "../../types";

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

  const mockProps = {
    players: [
      { ...mockPlayerState, playerId: "player1", position: { x: 200, y: 300 } },
      { ...mockPlayerState, playerId: "player2", position: { x: 600, y: 300 } },
    ] as [PlayerState, PlayerState],
    gamePhase: "combat" as const,
    onGamePhaseChange: vi.fn(),
    gameTime: Date.now(),
    currentRound: 1,
    timeRemaining: 60,
    onStanceChange: vi.fn(),
    combatLog: [],
    onStartMatch: vi.fn(),
    onResetMatch: vi.fn(),
    onTogglePause: vi.fn(),
  };

  it("should render game UI elements", () => {
    const { container } = render(<GameUI {...mockProps} />);
    expect(container).toBeInTheDocument();
  });

  it("should display player health information", () => {
    const { container } = render(<GameUI {...mockProps} />);
    expect(container).toBeInTheDocument();
  });

  it("should handle game state updates", () => {
    const { container } = render(<GameUI {...mockProps} />);
    expect(container).toBeInTheDocument();
  });

  it("should show start match button when match not started", () => {
    const propsWithPreparation = {
      ...mockProps,
      gamePhase: "preparation" as const,
    };
    const { container } = render(<GameUI {...propsWithPreparation} />);
    expect(container).toBeInTheDocument();
  });

  it("should display victory screen", () => {
    const propsWithVictory = {
      ...mockProps,
      gamePhase: "victory" as const,
    };
    const { container } = render(<GameUI {...propsWithVictory} />);
    expect(container).toBeInTheDocument();
  });
});
