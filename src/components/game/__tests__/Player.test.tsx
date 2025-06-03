import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Player } from "../Player";
import { createPlayerState } from "../../../utils/playerUtils";
import type { PlayerState } from "../../../types";

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

    defaultProps = {
      playerState: createPlayerState("player1", "musa", "geon"), // Fixed parameter order
      playerIndex: 0,
      onStateUpdate: handleStateUpdate,
      isActive: true,
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
