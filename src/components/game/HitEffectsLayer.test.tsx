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
        type: "critical",
        position: { x: 100, y: 200 },
        damage: 25,
        color: 0xff0000,
        startTime: Date.now(),
        duration: 1000,
        korean: "치명타!", // Add missing korean property
        createdAt: Date.now(), // Add missing createdAt property
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
          startTime: Date.now(),
          duration: 800,
          korean: type === "critical" ? "치명타!" : "타격!", // Add missing korean property
          createdAt: Date.now(), // Add missing createdAt property
        },
      ];

      const { getByTestId } = render(<HitEffectsLayer effects={mockEffects} />);
      expect(getByTestId("pixi-container")).toBeInTheDocument();
    });
  });
});
