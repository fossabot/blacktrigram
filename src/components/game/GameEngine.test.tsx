import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { GameEngine } from "./GameEngine";
import type { PlayerState } from "../../types";
import { createPlayerState } from "../../utils/playerUtils";

// Mock PIXI React components
vi.mock("@pixi/react", () => ({
  Stage: ({ children, ...props }: any) => (
    <div data-testid="pixi-stage" {...props}>
      {children}
    </div>
  ),
  Container: ({ children, ...props }: any) => (
    <div data-testid="pixi-container" {...props}>
      {children}
    </div>
  ),
}));

describe("GameEngine", () => {
  let mockPlayers: [PlayerState, PlayerState];

  beforeEach(() => {
    mockPlayers = [
      createPlayerState("player1", { x: 100, y: 300 }, "geon"), // Fixed: Added stance parameter
      createPlayerState("player2", { x: 200, y: 300 }, "tae"), // Fixed: Added stance parameter
    ];
  });

  it("should render game engine", () => {
    const mockOnPlayerUpdate = vi.fn();
    const mockOnGamePhaseChange = vi.fn();

    const { getByTestId } = render(
      <GameEngine
        players={mockPlayers}
        gamePhase="combat"
        onPlayerUpdate={mockOnPlayerUpdate}
        onGamePhaseChange={mockOnGamePhaseChange}
      />
    );

    expect(getByTestId("pixi-stage")).toBeInTheDocument();
  });
});
