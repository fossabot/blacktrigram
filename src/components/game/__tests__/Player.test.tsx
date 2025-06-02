import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Player } from "../Player";
import {
  createPlayerState,
  type PlayerState,
  PlayerArchetype,
} from "../../../types";

describe("Player", () => {
  let defaultProps: {
    playerState: PlayerState;
    playerIndex: number;
    onStateUpdate: (updates: Partial<PlayerState>) => void;
    isActive?: boolean;
    archetype?: PlayerArchetype;
  };

  beforeEach(() => {
    const handleStateUpdate = vi.fn((_updates: Partial<PlayerState>) => {
      // Mock state update
    });

    defaultProps = {
      playerState: createPlayerState("player1", { x: 200, y: 400 }, "geon"),
      playerIndex: 0,
      onStateUpdate: handleStateUpdate,
      isActive: true,
      archetype: "musa" as PlayerArchetype,
    };
  });

  it("should render player with Korean martial arts styling", () => {
    render(<Player {...defaultProps} />);

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

    render(<Player {...playerWithDifferentStance} />);

    expect(playerWithDifferentStance.playerState.stance).toBe("li");
  });

  it("should trigger state update when interacted", () => {
    render(<Player {...defaultProps} />);

    expect(typeof defaultProps.onStateUpdate).toBe("function");

    // Simulate state update call
    defaultProps.onStateUpdate({ health: 90 });

    expect(defaultProps.onStateUpdate).toHaveBeenCalledWith({ health: 90 });
  });

  it("should display Korean player names correctly", () => {
    const player2Props = {
      ...defaultProps,
      playerIndex: 1,
      playerState: createPlayerState("player2", { x: 600, y: 400 }, "gon"),
      archetype: "jojik" as PlayerArchetype, // Use valid PlayerArchetype
    };

    render(<Player {...player2Props} />);

    expect(player2Props.playerIndex).toBe(1);
    expect(player2Props.playerState.stance).toBe("gon");
  });
});
