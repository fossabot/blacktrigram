import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { Player } from "./Player";
import type { PlayerState } from "../../types";

// Mock PIXI React components
vi.mock("@pixi/react", () => ({
  Container: ({ children, ...props }: any) => (
    <div data-testid="pixi-container" {...props}>
      {children}
    </div>
  ),
  Graphics: ({ draw, ...props }: any) => {
    if (draw) {
      const mockGraphics = {
        clear: vi.fn(),
        setFillStyle: vi.fn(),
        setStrokeStyle: vi.fn(),
        circle: vi.fn(),
        rect: vi.fn(),
        fill: vi.fn(),
        stroke: vi.fn(),
      };
      draw(mockGraphics);
    }
    return <div data-testid="pixi-graphics" {...props} />;
  },
}));

describe("Player Component", () => {
  const mockPlayerState: PlayerState = {
    id: "player1",
    name: "Test Player",
    archetype: "musa",
    position: { x: 100, y: 200 },
    stance: "geon",
    health: 80,
    maxHealth: 100,
    ki: 60,
    maxKi: 100,
    stamina: 90,
    maxStamina: 100,
    consciousness: 100,
    pain: 0,
    balance: 100,
    conditions: [],
    equipment: [],
  };

  const mockOnStateUpdate = vi.fn();

  it("should render player component", () => {
    const { getByTestId } = render(
      <Player
        playerState={mockPlayerState}
        playerIndex={0}
        onStateUpdate={mockOnStateUpdate}
        isActive={true}
      />
    );

    expect(getByTestId("pixi-container")).toBeInTheDocument();
    expect(getByTestId("pixi-graphics")).toBeInTheDocument();
  });

  it("should render with Korean stance data", () => {
    const geonPlayer: PlayerState = {
      ...mockPlayerState,
      stance: "geon",
    };

    const { container } = render(
      <Player
        playerState={geonPlayer}
        playerIndex={0}
        onStateUpdate={mockOnStateUpdate}
        isActive={false}
      />
    );

    expect(container).toBeInTheDocument();
  });

  it("should handle different health levels", () => {
    const lowHealthPlayer: PlayerState = {
      ...mockPlayerState,
      health: 25,
    };

    const { getByTestId } = render(
      <Player
        playerState={lowHealthPlayer}
        playerIndex={0}
        onStateUpdate={mockOnStateUpdate}
      />
    );

    expect(getByTestId("pixi-graphics")).toBeInTheDocument();
  });
});
