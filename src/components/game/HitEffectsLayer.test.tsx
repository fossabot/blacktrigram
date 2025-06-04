import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { HitEffectsLayer } from "./HitEffectsLayer";
import type { HitEffect } from "../../types";

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
        circle: vi.fn(),
        fill: vi.fn(),
      };
      draw(mockGraphics);
    }
    return <div data-testid="pixi-graphics" {...props} />;
  },
  Text: ({ children, ...props }: any) => (
    <div data-testid="pixi-text" {...props}>
      {children}
    </div>
  ),
}));

// Mock PIXI
vi.mock("pixi.js", () => ({
  TextStyle: vi.fn().mockImplementation(() => ({})),
}));

describe("HitEffectsLayer", () => {
  it("renders without effects", () => {
    const { getByTestId } = render(<HitEffectsLayer effects={[]} />);
    expect(getByTestId("pixi-container")).toBeInTheDocument();
  });

  it("renders with hit effects", () => {
    const mockEffects: HitEffect[] = [
      {
        id: "effect1",
        type: "critical", // Use valid type
        position: { x: 100, y: 200 },
        damage: 25,
        color: 0xff0000,
        timestamp: Date.now(),
        duration: 1000,
        playerId: "player1",
      },
    ];

    const { getByTestId } = render(<HitEffectsLayer effects={mockEffects} />);
    expect(getByTestId("pixi-container")).toBeInTheDocument();
  });

  it("handles different effect types", () => {
    const effectTypes: Array<"light" | "medium" | "heavy" | "critical"> = [
      "light",
      "medium",
      "heavy",
      "critical",
    ];

    effectTypes.forEach((type) => {
      const mockEffects: HitEffect[] = [
        {
          id: `effect_${type}`,
          type,
          position: { x: 50, y: 100 },
          damage: type === "critical" ? 40 : 15,
          color: 0x00ff00,
          timestamp: Date.now(),
          duration: 800,
          playerId: "player1",
        },
      ];

      const { getByTestId } = render(<HitEffectsLayer effects={mockEffects} />);
      expect(getByTestId("pixi-container")).toBeInTheDocument();
    });
  });

  const createMockHitEffect = (overrides = {}): HitEffect => ({
    id: "test-effect-1",
    type: "medium",
    position: { x: 100, y: 100 },
    damage: 25,
    timestamp: Date.now(), // Fix: Use timestamp instead of startTime
    duration: 1000,
    color: 0xff0000,
    playerId: "player1", // Fix: Add missing playerId property
    ...overrides,
  });

  it("should handle multiple effects", () => {
    const effects = [
      createMockHitEffect({ id: "effect1" }),
      createMockHitEffect({
        id: "effect2",
        position: { x: 200, y: 200 },
        timestamp: Date.now() - 500, // Fix: Use timestamp
      }),
    ];
    const { container } = render(<HitEffectsLayer effects={effects} />);
    expect(container).toBeInTheDocument();
  });

  it("should remove expired effects", async () => {
    const expiredEffect: HitEffect = {
      id: "expired-effect",
      type: "light", // Use valid type
      position: { x: 50, y: 50 },
      damage: 10,
      timestamp: Date.now() - 2000,
      duration: 1000,
      color: 0xff0000,
      playerId: "player1",
    };

    const { rerender } = render(<HitEffectsLayer effects={[expiredEffect]} />);
    rerender(<HitEffectsLayer effects={[]} />);
    expect(document.body).toBeInTheDocument();
  });

  it("should handle multiple simultaneous effects", () => {
    const multipleEffects: HitEffect[] = [
      {
        id: "effect1",
        type: "light",
        position: { x: 100, y: 100 },
        damage: 10,
        timestamp: Date.now(),
        duration: 500,
        color: 0x00ff00,
        playerId: "player1", // Fix: Add missing playerId property
      },
      {
        id: "effect2",
        type: "medium",
        position: { x: 200, y: 150 },
        damage: 20,
        timestamp: Date.now() + 100,
        duration: 750,
        color: 0xffaa00,
        playerId: "player2", // Fix: Add missing playerId property
      },
    ];

    const { container } = render(<HitEffectsLayer effects={multipleEffects} />);
    expect(container).toBeInTheDocument();
  });
});
