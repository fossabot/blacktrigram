import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { GameUI } from "./GameUI";
import type { PlayerState, GamePhase } from "../../types";
import { createPlayerState } from "../../utils/playerUtils";

// Mock PIXI React components
vi.mock("@pixi/react", () => ({
  Stage: ({ children, ...props }: any) => (
    <div data-testid="pixi-stage" {...props}>
      {children}
    </div>
  ),
}));

// Mock GameEngine
vi.mock("./GameEngine", () => ({
  GameEngine: ({ children, ...props }: any) => (
    <div data-testid="game-engine" {...props}>
      {children}
    </div>
  ),
}));

describe("GameUI", () => {
  let mockPlayers: [PlayerState, PlayerState];
  let baseProps: any;

  beforeEach(() => {
    mockPlayers = [
      createPlayerState("Player1", { x: 300, y: 400 }, "geon", {
        health: 80,
        maxHealth: 100,
        ki: 60,
        maxKi: 100,
        stamina: 90,
        maxStamina: 100,
        conditions: [],
      }),
      createPlayerState("Player2", { x: 500, y: 400 }, "li", {
        health: 70,
        maxHealth: 100,
        ki: 40,
        maxKi: 100,
        stamina: 85,
        maxStamina: 100,
        conditions: [
          {
            id: "vulnerable_1",
            name: { korean: "취약", english: "Vulnerable" },
            type: "vulnerable",
            intensity: "moderate",
            duration: 2000,
            source: "Player1",
          },
        ],
      }),
    ];

    baseProps = {
      players: mockPlayers,
      gamePhase: "combat" as GamePhase,
      onGamePhaseChange: vi.fn(),
      gameTime: Date.now(),
      currentRound: 1,
      timeRemaining: 45,
      onStanceChange: vi.fn(),
      combatLog: ["Player1: 천둥벽력 → 25 피해", "Player2: 화염지창 → 빗나감"],
      onStartMatch: vi.fn(),
      onResetMatch: vi.fn(),
      onTogglePause: vi.fn(),
      onPlayerUpdate: vi.fn(),
    };
  });

  it("renders without crashing", () => {
    const { getByTestId } = render(<GameUI {...baseProps} />);
    expect(getByTestId("pixi-stage")).toBeInTheDocument();
  });
});
