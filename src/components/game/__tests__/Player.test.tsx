import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Player } from "../Player";
import { createPlayerState } from "../../../utils/playerUtils";
import type {
  PlayerArchetype,
  PlayerState,
  TrigramStance,
} from "../../../types";

describe("Player", () => {
  let defaultProps: {
    playerState: PlayerState;
    playerIndex: number;
    onStateUpdate: (updates: Partial<PlayerState>) => void;
    isActive?: boolean;
  };

  beforeEach(() => {
    const handleStateUpdate = vi.fn((_updates: Partial<PlayerState>) => {
      // Mock state update
    });

    const mockPlayerState = createPlayerState("player1", "musa", "geon"); // Fixed parameter order

    defaultProps = {
      playerState: mockPlayerState,
      playerIndex: 0,
      onStateUpdate: handleStateUpdate,
      isActive: true,
      // Add missing required props
      archetype: "musa" as PlayerArchetype,
      stance: "geon" as TrigramStance,
      position: { x: 100, y: 200 },
      facing: "right" as const,
      health: 100,
      maxHealth: 100,
      ki: 100,
      maxKi: 100,
      stamina: 100,
      maxStamina: 100,
    };
  });

  it("should render player with Korean martial arts styling", () => {
    render(<Player {...defaultProps} />);
  });

  it("should handle different archetypes", () => {
    const playerWithDifferentArchetype = {
      ...defaultProps,
      playerState: createPlayerState("player2", "amsalja", "gon"), // Fixed parameter order
    };
    render(<Player {...playerWithDifferentArchetype} />);
  });
});
