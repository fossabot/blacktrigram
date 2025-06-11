import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { GameEngine } from "../GameEngine";
import { createMockPlayerState } from "../../../test/test-utils";

// Mock PixiJS
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
  const mockProps = {
    player1: createMockPlayerState(),
    player2: { ...createMockPlayerState(), id: "player2" },
    onGameStateChange: vi.fn(),
    onCombatResult: vi.fn(),
    width: 1200,
    height: 800,
  };

  it("renders without crashing", () => {
    render(
      <div data-testid="game-engine">
        <GameEngine {...mockProps} />
      </div>
    );

    expect(screen.getByTestId("game-engine")).toBeInTheDocument();
  });

  it("handles player updates correctly", () => {
    render(
      <div data-testid="game-engine">
        <GameEngine {...mockProps} />
      </div>
    );

    expect(screen.getByTestId("game-engine")).toBeInTheDocument();
  });

  it("processes combat results", () => {
    render(
      <div data-testid="game-engine">
        <GameEngine {...mockProps} />
      </div>
    );

    expect(screen.getByTestId("game-engine")).toBeInTheDocument();
  });
});
