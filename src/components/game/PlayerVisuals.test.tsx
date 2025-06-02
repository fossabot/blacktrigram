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
    facing: "right", // Add missing property
    health: 80,
    maxHealth: 100,
    ki: 60,
    maxKi: 100,
    stamina: 90,
    maxStamina: 100,
    consciousness: 100,
    pain: 0,
    balance: 100,
    bloodLoss: 0, // Add missing property
    lastStanceChangeTime: Date.now(), // Add missing property
    isAttacking: false, // Add missing property
    combatReadiness: 100, // Add missing property
    activeEffects: [], // Add missing property
    combatState: "ready", // Add missing property
    conditions: [],
  };

  it("renders basic player visuals", () => {
    const { getByTestId } = render(
      <PlayerVisuals playerState={basePlayerState} />
    );
    expect(getByTestId("pixi-container")).toBeInTheDocument();
  });

  it("renders health bar when enabled", () => {
    const { getAllByTestId } = render(
      <PlayerVisuals playerState={basePlayerState} showHealthBar={true} />
    );
    expect(getAllByTestId("pixi-graphics")).toHaveLength(3); // health, stance, ki
  });

  it("renders stance aura when enabled", () => {
    const { getAllByTestId } = render(
      <PlayerVisuals playerState={basePlayerState} showStanceAura={true} />
    );
    expect(getAllByTestId("pixi-graphics")).toHaveLength(3);
  });

  it("handles different stance colors", () => {
    const stances = [
      "geon",
      "tae",
      "li",
      "jin",
      "son",
      "gam",
      "gan",
      "gon",
    ] as const;

    stances.forEach((stance) => {
      const playerWithStance = { ...basePlayerState, stance };
      const { getAllByTestId } = render(
        <PlayerVisuals playerState={playerWithStance} />
      );
      expect(getAllByTestId("pixi-graphics")).toHaveLength(3);
    });
  });

  it("handles player with conditions", () => {
    const playerWithConditions: PlayerState = {
      ...basePlayerState,
      conditions: [
        {
          id: "stun_1",
          name: { korean: "기절", english: "Stunned" },
          type: "stun",
          intensity: "moderate",
          duration: 5000,
          source: "test",
        },
      ],
    };

    const { getByTestId } = render(
      <PlayerVisuals playerState={playerWithConditions} />
    );
    expect(getByTestId("pixi-container")).toBeInTheDocument();
  });
});
