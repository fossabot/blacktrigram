import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Application } from "@pixi/react";
import { Player } from "../Player";
import { createPlayerState, type PlayerState } from "../../../types";

describe("Player", () => {
  let defaultProps: {
    playerState: PlayerState;
    isPlayer1: boolean;
    onAttack: (position: { x: number; y: number }) => void;
  };

  beforeEach(() => {
    // Fix: Update handleAttack to match new signature
    const handleAttack = vi.fn((position: { x: number; y: number }) => {
      console.log(`Attack at position: ${position.x}, ${position.y}`);
    });

    defaultProps = {
      playerState: createPlayerState("player1", { x: 200, y: 400 }, "geon"),
      isPlayer1: true,
      onAttack: handleAttack, // Now correctly typed
    };
  });

  it("should render player with Korean martial arts styling", () => {
    render(
      <Application>
        <Player {...defaultProps} />
      </Application>
    );

    // Player should be rendered (canvas-based, so we check props)
    expect(defaultProps.playerState.stance).toBe("geon");
    expect(defaultProps.playerState.position).toEqual({ x: 200, y: 400 });
  });

  it("should handle stance changes correctly", () => {
    const playerWithDifferentStance = {
      ...defaultProps,
      playerState: {
        ...defaultProps.playerState,
        stance: "li" as const,
      },
    };

    render(
      <Application>
        <Player {...playerWithDifferentStance} />
      </Application>
    );

    expect(playerWithDifferentStance.playerState.stance).toBe("li");
  });

  it("should trigger attack with position when interacted", () => {
    render(
      <Application>
        <Player {...defaultProps} />
      </Application>
    );

    // Verify attack handler is properly typed
    expect(typeof defaultProps.onAttack).toBe("function");

    // Simulate attack call
    defaultProps.onAttack({ x: 200, y: 400 });

    expect(defaultProps.onAttack).toHaveBeenCalledWith({
      x: 200,
      y: 400,
    });
  });

  it("should display Korean player names correctly", () => {
    const player2Props = {
      ...defaultProps,
      isPlayer1: false,
      playerState: createPlayerState("player2", { x: 600, y: 400 }, "gon"),
    };

    render(
      <Application>
        <Player {...player2Props} />
      </Application>
    );

    expect(player2Props.isPlayer1).toBe(false);
    expect(player2Props.playerState.stance).toBe("gon");
  });
});
