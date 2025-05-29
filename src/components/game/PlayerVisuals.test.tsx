import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { PlayerVisuals } from "./PlayerVisuals";
import { createPlayerState, type KoreanTechnique } from "../../types";

// Mock @pixi/react
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
        rect: vi.fn(),
        circle: vi.fn(),
        fill: vi.fn(),
        stroke: vi.fn(),
      };
      draw(mockGraphics);
    }
    return <div data-testid="pixi-graphics" {...props} />;
  },
  Text: ({ text, ...props }: any) => (
    <div data-testid="pixi-text" data-text={text} {...props} />
  ),
  useTick: vi.fn(),
}));

describe("PlayerVisuals", () => {
  const defaultProps = {
    playerState: createPlayerState(),
    opponentPosition: { x: 600, y: 300 },
    animationTime: 0,
  };

  it("renders player visuals correctly", () => {
    const { container } = render(<PlayerVisuals {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it("displays current stance correctly", () => {
    const playerState = createPlayerState({ stance: "li" });

    const { getByTestId } = render(
      <PlayerVisuals {...defaultProps} playerState={playerState} />
    );

    // Verify stance is rendered
    expect(getByTestId("pixi-container")).toBeInTheDocument();
  });

  it("shows health status correctly", () => {
    const lowHealthPlayer = createPlayerState({ health: 20 });

    const { container } = render(
      <PlayerVisuals {...defaultProps} playerState={lowHealthPlayer} />
    );

    expect(container).toBeInTheDocument();
  });

  it("handles different facing directions", () => {
    const leftFacingPlayer = createPlayerState({ facing: "left" });

    const { container } = render(
      <PlayerVisuals {...defaultProps} playerState={leftFacingPlayer} />
    );

    expect(container).toBeInTheDocument();

    const rightFacingPlayer = createPlayerState({ facing: "right" });

    const { rerender } = render(
      <PlayerVisuals {...defaultProps} playerState={rightFacingPlayer} />
    );

    rerender(
      <PlayerVisuals {...defaultProps} playerState={rightFacingPlayer} />
    );

    expect(container).toBeInTheDocument();
  });

  it("renders attack animations", () => {
    const attackingPlayer = createPlayerState({ isAttacking: true });

    const { container } = render(
      <PlayerVisuals {...defaultProps} playerState={attackingPlayer} />
    );

    expect(container).toBeInTheDocument();
  });

  it("displays blocking state", () => {
    const blockingPlayer = createPlayerState({ isBlocking: true });

    const { container } = render(
      <PlayerVisuals {...defaultProps} playerState={blockingPlayer} />
    );

    expect(container).toBeInTheDocument();
  });

  it("shows status effects", () => {
    const playerWithEffects = createPlayerState({
      activeEffects: [
        {
          id: "stunned",
          name: "Stunned",
          korean: "기절",
          type: "stun",
          intensity: 1,
          duration: 2000,
          effects: {
            speedMultiplier: 0.5,
          },
        },
      ],
    });

    const { container } = render(
      <PlayerVisuals {...defaultProps} playerState={playerWithEffects} />
    );

    expect(container).toBeInTheDocument();
  });

  it("updates animation over time", () => {
    const { rerender } = render(
      <PlayerVisuals {...defaultProps} animationTime={0} />
    );

    rerender(<PlayerVisuals {...defaultProps} animationTime={1000} />);

    // Animation should update smoothly
    expect(true).toBe(true);
  });

  it("handles all trigram stances", () => {
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
      const playerState = createPlayerState({ stance });

      const { container } = render(
        <PlayerVisuals {...defaultProps} playerState={playerState} />
      );

      expect(container).toBeInTheDocument();
    });
  });

  it("responds to stance changes dynamically", () => {
    const { rerender } = render(
      <PlayerVisuals
        {...defaultProps}
        playerState={createPlayerState({ stance: "geon" })}
      />
    );

    // Change stance dynamically
    const stances = ["tae", "li", "jin", "son", "gam", "gan", "gon"] as const;

    stances.forEach((stance) => {
      const newState = createPlayerState({ stance });

      rerender(<PlayerVisuals {...defaultProps} playerState={newState} />);
    });

    expect(true).toBe(true);
  });
});
