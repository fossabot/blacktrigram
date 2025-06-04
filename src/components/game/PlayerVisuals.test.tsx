import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { PlayerVisuals } from "./PlayerVisuals";
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

describe("PlayerVisuals", () => {
  const basePlayerState: PlayerState = {
    id: "player1",
    name: "Test Player",
    archetype: "musa",
    position: { x: 100, y: 200 },
    stance: "geon",
    facing: "right",
    health: 80,
    maxHealth: 100,
    ki: 60,
    maxKi: 100,
    stamina: 90,
    maxStamina: 100,
    consciousness: 100,
    pain: 0,
    balance: 100,
    bloodLoss: 0,
    lastStanceChangeTime: Date.now(),
    isAttacking: false,
    combatReadiness: 100,
    activeEffects: [],
    combatState: "ready",
    conditions: [],
  };

  const mockPlayerState = {
    ...basePlayerState,
    id: "mockPlayer",
  };

  const props = {
    player: mockPlayerState,
    playerState: mockPlayerState,
    playerIndex: 0,
    onStateUpdate: vi.fn(),
  };

  it("renders basic player visuals", () => {
    const { getByTestId } = render(<PlayerVisuals {...props} />);
    expect(getByTestId("pixi-container")).toBeDefined();
  });

  it("renders with different health levels", () => {
    render(<PlayerVisuals {...props} />);
  });

  it("renders stance-specific visuals", () => {
    render(<PlayerVisuals {...props} />);
  });

  it("renders different stances correctly", () => {
    const stances = ["geon", "tae", "li", "jin", "son", "gam", "gan", "gon"];

    stances.forEach((stance) => {
      const playerWithStance = {
        ...basePlayerState,
        stance: stance as any,
      };

      const props = {
        player: playerWithStance,
        playerState: playerWithStance,
        playerIndex: 0,
        onStateUpdate: vi.fn(),
      };

      render(<PlayerVisuals {...props} />);
    });
  });

  it("renders combat conditions", () => {
    const playerWithConditions = {
      ...basePlayerState,
      conditions: [
        {
          id: "test-condition",
          name: { korean: "테스트", english: "Test" },
          type: "vulnerable" as const,
          intensity: "medium" as const,
          duration: 1000,
        },
      ],
    };

    const props = {
      player: playerWithConditions,
      playerState: playerWithConditions,
      playerIndex: 0,
      onStateUpdate: vi.fn(),
    };

    render(<PlayerVisuals {...props} />);
  });
});
